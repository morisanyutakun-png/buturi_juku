"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Check, CreditCard, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { visibleCourses } from "@/data/courses";
import { trackTrialPaymentClick } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const grades = [
  "高校1年生",
  "高校2年生",
  "高校3年生",
  "既卒生",
  "保護者",
  "その他",
];

const TRIAL_TOPIC = "体験授業の申し込み";

const topics = [
  TRIAL_TOPIC,
  "講座内容について",
  "料金について",
  "学習相談",
  "その他",
];

const TOPIC_PARAM_TO_LABEL: Record<string, (typeof topics)[number]> = {
  trial: TRIAL_TOPIC,
  course: "講座内容について",
  price: "料金について",
  consult: "学習相談",
};

/**
 * Solvora の動線ルール:
 *   1. 講座カードの「申し込む」ボタン → /contact?course=<slug>&topic=trial に飛ぶ
 *   2. 受講希望講座が自動入力される
 *   3. 受講のスタートは必ず体験授業（¥3,000）から
 *   4. 「体験授業の申し込み」を選んだ場合：
 *        a. クライアント側でフォームを検証（必須+同意チェック）
 *        b. /api/contact に POST してメール送信を確定
 *        c. 成功したら GA / Google Ads タグを発火
 *        d. Stripe 決済ページへリダイレクト（success_url で /thanks に戻る）
 *   5. それ以外の問い合わせは a → b までで完了し、success 画面を出す。
 *
 * 「決済が走る前にメールを送る」順序にしている理由:
 *   - 万一決済前にユーザーがブラウザを閉じても、講師に問い合わせ内容は届いている。
 *   - メール送信は数百ms で終わるので、Stripe への遷移体感は変わらない。
 *   - メール送信が失敗したら Stripe には飛ばさない（タグも撃たない）= 整合性が保たれる。
 */

const STRIPE_PAYMENT_URL = "https://buy.stripe.com/28EaEX2kG3X8cWEa9Q3Ru06";

const PENDING_KEY = "solvora-pending-application";

const courseOptions: { value: string; label: string }[] = [
  { value: "未定", label: "決まっていない / まずは体験したい" },
  ...visibleCourses().map((c) => ({
    value: c.slug,
    label: `${c.title}${c.slug === "electromagnetism" ? "（おすすめ）" : ""}`,
  })),
];

function isEmailLike(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const courseParam = searchParams.get("course");
  const topicParam = searchParams.get("topic");

  const initialCourse = (() => {
    if (!courseParam) return "未定";
    if (courseParam === "未定") return "未定";
    return visibleCourses().some((c) => c.slug === courseParam) ? courseParam : "未定";
  })();
  const initialTopic =
    (topicParam && TOPIC_PARAM_TO_LABEL[topicParam]) ?? TRIAL_TOPIC;

  // 制御コンポーネント化することで、リアルタイム検証 + 送信ボタン disable を
  // 自然に実装できる。FormData でも値は読めるが、状態を一箇所に集めた方が
  // 「同意せずにボタン押せちゃった」系のミスを構造的に潰せる。
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [topic, setTopic] = useState<string>(initialTopic);
  const [course, setCourse] = useState(initialCourse);
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  // フィールド単位のサーバー検証エラー（API 側からの 400 をそのまま反映）。
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (courseParam && visibleCourses().some((c) => c.slug === courseParam)) {
      setCourse(courseParam);
    }
  }, [courseParam]);
  useEffect(() => {
    if (topicParam && TOPIC_PARAM_TO_LABEL[topicParam]) {
      setTopic(TOPIC_PARAM_TO_LABEL[topicParam]);
    }
  }, [topicParam]);

  const requiresStripe = topic === TRIAL_TOPIC;

  // すべての必須項目が満たされ、かつ同意もある状態でだけボタンが押せる。
  // ここを通らないと API もタグも走らない = 二重防御。
  const isComplete = useMemo(() => {
    return (
      name.trim().length > 0 &&
      isEmailLike(email.trim()) &&
      grade.trim().length > 0 &&
      topic.trim().length > 0 &&
      message.trim().length > 0 &&
      agree
    );
  }, [name, email, grade, topic, message, agree]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isComplete || status === "submitting") return;

    setStatus("submitting");
    setError(null);
    setFieldErrors({});

    const payload = {
      name: name.trim(),
      email: email.trim(),
      grade,
      topic,
      course,
      message: message.trim(),
      agree: agree ? "1" : "",
    };

    try {
      // /thanks ページが復元するための控えを先に保存。
      // API 失敗時は Stripe に飛ばさないので、復元されない=問題ない。
      try {
        localStorage.setItem(
          PENDING_KEY,
          JSON.stringify({
            ...payload,
            submittedAt: new Date().toISOString(),
          }),
        );
      } catch {
        /* localStorage 不可でも続行。 */
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        errors?: Record<string, string>;
      };

      if (!res.ok || !json.ok) {
        if (json.errors) setFieldErrors(json.errors);
        setStatus("error");
        setError(
          json.errors
            ? "入力内容に不備があります。赤字の項目を確認してください。"
            : "送信に失敗しました。時間をおいて再度お試しください。",
        );
        return;
      }

      // ここまで来たら API は成功 = メールは送信済み（または dev_log_only）。
      if (requiresStripe) {
        // GA4 / Google Ads にリード獲得イベントを発火。
        // analytics.ts 側で gtag 未ロードでも dataLayer に積む実装にしているので
        // ここで配列形式に直接 push するなどはしない。
        trackTrialPaymentClick({
          course: payload.course || "未定",
          email: payload.email,
        });

        const stripeUrl = payload.email
          ? `${STRIPE_PAYMENT_URL}?prefilled_email=${encodeURIComponent(payload.email)}`
          : STRIPE_PAYMENT_URL;
        window.location.href = stripeUrl;
        return;
      }

      // 体験以外（学習相談・料金問い合わせ等）は success 画面を出して終わり。
      setStatus("success");
    } catch (e) {
      console.error("[contact-form] submit error", e);
      setStatus("error");
      setError(
        "通信に失敗しました。電波状況を確認のうえ、再度お試しください。",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-forest/30 bg-forest-bg p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-forest/40 bg-forest/10 text-forest-deep">
          <Check className="h-5 w-5" />
        </div>
        <h3 className="mt-6 font-serif text-xl text-ink-900">
          送信ありがとうございました。
        </h3>
        <p className="mt-3 text-sm text-ink-700">
          2営業日以内にご入力のメールアドレスへ担当よりご連絡いたします。
        </p>
      </div>
    );
  }

  const isCoursePreselected = course !== "未定";
  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Field
        label="お名前"
        htmlFor="name"
        required
        error={fieldErrors.name}
      >
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="山田 太郎"
          aria-invalid={!!fieldErrors.name}
        />
      </Field>

      <Field
        label="メールアドレス"
        htmlFor="email"
        required
        error={fieldErrors.email}
      >
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="example@mail.com"
          aria-invalid={!!fieldErrors.email}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="学年"
          htmlFor="grade"
          required
          error={fieldErrors.grade}
        >
          <select
            id="grade"
            name="grade"
            required
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className={inputClass}
            aria-invalid={!!fieldErrors.grade}
          >
            <option value="">選択してください</option>
            {grades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="ご相談内容の種類"
          htmlFor="topic"
          required
          error={fieldErrors.topic}
        >
          <select
            id="topic"
            name="topic"
            required
            className={inputClass}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            aria-invalid={!!fieldErrors.topic}
          >
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="受講希望講座（任意）"
        htmlFor="course"
        helper={
          isCoursePreselected
            ? "押した講座を自動でセットしました。変更可能です。なお、受講のスタートは必ず体験授業（60分・¥3,000）からです。"
            : "迷っている場合は『決まっていない / まずは体験したい』のままで大丈夫です。"
        }
      >
        <select
          id="course"
          name="course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className={inputClass}
        >
          {courseOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="ご相談内容"
        htmlFor="message"
        required
        error={fieldErrors.message}
      >
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(inputClass, "resize-y")}
          placeholder="現在の学習状況・ご質問などをご記入ください。"
          aria-invalid={!!fieldErrors.message}
        />
      </Field>

      <label
        className={cn(
          "flex items-start gap-3 text-[14px] sm:text-xs leading-[1.7]",
          fieldErrors.agree ? "text-red-600" : "text-ink-600",
        )}
      >
        <input
          type="checkbox"
          name="agree"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-1.5 h-5 w-5 sm:h-4 sm:w-4 accent-brand"
          aria-invalid={!!fieldErrors.agree}
        />
        <span>
          <a href="/privacy" className="text-brand hover:underline">
            プライバシーポリシー
          </a>
          に同意の上、送信します。
        </span>
      </label>

      {requiresStripe && (
        <div className="rounded-2xl border border-brand/30 bg-brand-bg/50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-deep">
              <ShieldCheck className="h-4 w-4" aria-hidden />
            </span>
            <div className="text-[14px] sm:text-[13.5px] leading-[1.85] text-ink-800">
              <p className="font-medium text-ink-900">
                体験授業の申し込みは、決済画面での確認が必要です。
              </p>
              <p className="mt-2 text-ink-700">
                送信ボタンを押すと、まず申し込み内容を講師に送信し、続いて安全な決済ページ（Stripe）に移動します。
                <strong className="text-ink-900 font-medium">
                  決済の完了をもって、正式に申し込み確定
                </strong>
                となります。決済画面ではメールアドレスが自動入力され、決済完了後は申し込み完了ページに自動で戻ります。
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-[15px] sm:text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!isComplete || submitting}
        aria-disabled={!isComplete || submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-warm px-6 py-4 sm:py-3.5 text-[15px] sm:text-sm font-medium text-white shadow-warm transition hover:bg-warm-deep disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto min-h-[52px] sm:min-h-0"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {requiresStripe ? "送信中…" : "送信中…"}
          </>
        ) : requiresStripe ? (
          <>
            <CreditCard className="h-4 w-4" aria-hidden />
            決済画面へ進んで申し込みを確定する
          </>
        ) : (
          "送信する"
        )}
      </button>

      {!isComplete && (
        <p className="text-[12px] sm:text-[11.5px] leading-[1.7] text-ink-500">
          ※ 必須項目（*）の入力と、プライバシーポリシーへの同意で送信ボタンが有効になります。
        </p>
      )}

      {requiresStripe && (
        <p className="text-[12px] sm:text-[11.5px] leading-[1.7] text-ink-500">
          ※ 決済はすべて Stripe を通じて行われます。Solvora Learning Lab はカード番号を保持しません。
          決済が完了しなかった場合、申し込みは確定しません。
        </p>
      )}
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3.5 sm:py-3 text-[16px] sm:text-sm text-ink-900 placeholder:text-ink-400 outline-none focus:border-brand focus:ring-1 focus:ring-brand/60 transition aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-300";

function Field({
  label,
  htmlFor,
  required,
  helper,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2.5 sm:mb-2 block text-[12px] sm:text-xs tracking-[0.18em] sm:tracking-widest uppercase text-ink-600 font-medium"
      >
        {label}
        {required && <span className="ml-1 text-warm">*</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-2 text-[12px] sm:text-[11px] leading-[1.6] text-red-600">
          {error}
        </p>
      ) : (
        helper && (
          <p className="mt-2 text-[12px] sm:text-[11px] leading-[1.6] text-ink-500">
            {helper}
          </p>
        )
      )}
    </div>
  );
}
