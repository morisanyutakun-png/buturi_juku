"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Check, CreditCard, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { courses } from "@/data/courses";
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
 *   3. 受講のスタートは必ず無料体験から
 *   4. 「体験授業の申し込み」を選んだ場合のみ、送信ボタンは Stripe 決済ページに遷移する。
 *      決済完了をもって申し込み確定（Stripe 側で `success_url` を /thanks に設定）。
 *   5. それ以外の問い合わせ（学習相談・料金など）は、決済ゲートなしでそのまま送信。
 */

/** Stripe 決済リンク。本人確認・申込確定の手続きとして決済を必須にする。 */
const STRIPE_PAYMENT_URL = "https://buy.stripe.com/28EaEX2kG3X8cWEa9Q3Ru06";

/** 決済前にフォーム値を保存しておく localStorage キー（/thanks ページが読み出す）。 */
const PENDING_KEY = "solvora-pending-application";

const courseOptions: { value: string; label: string }[] = [
  { value: "未定", label: "決まっていない / まずは体験したい" },
  ...courses.map((c) => ({
    value: c.slug,
    label: `${c.title}${c.slug === "electromagnetism" ? "（おすすめ）" : ""}`,
  })),
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const courseParam = searchParams.get("course");
  const topicParam = searchParams.get("topic");

  // クエリパラメータから受講希望講座 / トピックを初期化。
  const initialCourse = (() => {
    if (!courseParam) return "未定";
    if (courseParam === "未定") return "未定";
    return courses.some((c) => c.slug === courseParam) ? courseParam : "未定";
  })();
  const initialTopic =
    (topicParam && TOPIC_PARAM_TO_LABEL[topicParam]) ?? TRIAL_TOPIC;

  const [course, setCourse] = useState(initialCourse);
  const [topic, setTopic] = useState<string>(initialTopic);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  // クエリパラメータが後から変わった場合（クライアント遷移）にも追随する。
  useEffect(() => {
    if (courseParam && courses.some((c) => c.slug === courseParam)) {
      setCourse(courseParam);
    }
  }, [courseParam]);
  useEffect(() => {
    if (topicParam && TOPIC_PARAM_TO_LABEL[topicParam]) {
      setTopic(TOPIC_PARAM_TO_LABEL[topicParam]);
    }
  }, [topicParam]);

  const requiresStripe = topic === TRIAL_TOPIC;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      // 将来的にここを `/api/contact` のRoute Handlerへ差し替え（実 API 化）。
      // いまは console に残す + localStorage に保存して /thanks で復元できるように。
      console.info("[contact-form] payload", payload);
      try {
        localStorage.setItem(
          PENDING_KEY,
          JSON.stringify({
            ...payload,
            submittedAt: new Date().toISOString(),
          }),
        );
      } catch {
        // ローカルストレージが使えなくても続行（Stripe には飛ばす）。
      }

      if (requiresStripe) {
        // GA4 計測：体験申込の決済ボタンクリック（リード獲得）。
        trackTrialPaymentClick({
          course: (payload.course as string) ?? "未定",
          email: (payload.email as string) ?? null,
        });
        // Stripe 決済ページへリダイレクト。
        // メールアドレスを prefill して、決済完了後に /thanks へ戻る前提。
        const email = (payload.email as string) ?? "";
        const stripeUrl = email
          ? `${STRIPE_PAYMENT_URL}?prefilled_email=${encodeURIComponent(email)}`
          : STRIPE_PAYMENT_URL;
        window.location.href = stripeUrl;
        return;
      }

      // 体験以外（学習相談・料金問い合わせ等）はそのまま送信完了扱い。
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("success");
    } catch (e) {
      console.error(e);
      setStatus("error");
      setError("送信に失敗しました。時間をおいて再度お試しください。");
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Field label="お名前" htmlFor="name" required>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={inputClass}
          placeholder="山田 太郎"
        />
      </Field>

      <Field label="メールアドレス" htmlFor="email" required>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder="example@mail.com"
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="学年" htmlFor="grade" required>
          <select id="grade" name="grade" required className={inputClass}>
            <option value="">選択してください</option>
            {grades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </Field>
        <Field label="ご相談内容の種類" htmlFor="topic" required>
          <select
            id="topic"
            name="topic"
            required
            className={inputClass}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
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
            ? "押した講座を自動でセットしました。変更可能です。なお、受講のスタートは必ず無料体験からです。"
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

      <Field label="ご相談内容" htmlFor="message" required>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={cn(inputClass, "resize-y")}
          placeholder="現在の学習状況・ご質問などをご記入ください。"
        />
      </Field>

      <label className="flex items-start gap-3 text-[14px] sm:text-xs leading-[1.7] text-ink-600">
        <input
          type="checkbox"
          name="agree"
          required
          className="mt-1.5 h-5 w-5 sm:h-4 sm:w-4 accent-brand"
        />
        <span>
          <a href="/privacy" className="text-brand hover:underline">
            プライバシーポリシー
          </a>
          に同意の上、送信します。
        </span>
      </label>

      {/* 体験申込の場合のみ表示する Stripe 決済ガイダンス */}
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
                送信ボタンを押すと、安全な決済ページ（Stripe）に移動します。
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
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-warm px-6 py-4 sm:py-3.5 text-[15px] sm:text-sm font-medium text-white shadow-warm transition hover:bg-warm-deep disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto min-h-[52px] sm:min-h-0"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {requiresStripe ? "決済画面へ移動しています…" : "送信中…"}
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
  "w-full rounded-xl border border-ink-900/15 bg-white px-4 py-3.5 sm:py-3 text-[16px] sm:text-sm text-ink-900 placeholder:text-ink-400 outline-none focus:border-brand focus:ring-1 focus:ring-brand/60 transition";

function Field({
  label,
  htmlFor,
  required,
  helper,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  helper?: string;
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
      {helper && (
        <p className="mt-2 text-[12px] sm:text-[11px] leading-[1.6] text-ink-500">
          {helper}
        </p>
      )}
    </div>
  );
}
