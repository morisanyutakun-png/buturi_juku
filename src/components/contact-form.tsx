"use client";

import { useMemo, useState } from "react";
import { Loader2, Check, CreditCard, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackTrialPaymentClick } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const grades = [
  "高校1年生",
  "高校2年生",
  "高校3年生",
  "既卒生",
  "その他",
];

const WEAK_UNITS = ["力学", "熱", "波", "電磁気", "原子"] as const;

/**
 * Solvora の動線ルール:
 *   1. LP / 講座カードの「体験授業を申し込む」ボタン → /contact?topic=trial#contact-form
 *      に直接飛ばし、ヒーロー部分を経由せず最初からフォームに視点を合わせる。
 *   2. フォームは「体験授業の申し込み」一本に絞る（他の問い合わせは aside のメール導線へ）。
 *   3. 受講のスタートは必ず体験授業（¥3,000）。決済完了で申し込み確定。
 *   4. 送信フロー:
 *        a. クライアントで必須+同意を検証
 *        b. /api/contact に POST してメール送信
 *        c. 成功で GA / Google Ads タグを発火
 *        d. Stripe 決済ページへリダイレクト（success_url で /thanks に戻る）
 *
 * 「決済が走る前にメールを送る」順序にしている理由:
 *   - 万一決済前にユーザーがブラウザを閉じても、講師に問い合わせ内容は届いている。
 *   - メール送信は数百ms で終わるので、Stripe への遷移体感は変わらない。
 *   - メール送信が失敗したら Stripe には飛ばさない（タグも撃たない）= 整合性が保たれる。
 */

const STRIPE_PAYMENT_URL = "https://buy.stripe.com/28EaEX2kG3X8cWEa9Q3Ru06";

const PENDING_KEY = "solvora-pending-application";

function isEmailLike(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [weakUnit, setWeakUnit] = useState("");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const isComplete = useMemo(() => {
    return (
      name.trim().length > 0 &&
      isEmailLike(email.trim()) &&
      grade.trim().length > 0 &&
      weakUnit.trim().length > 0 &&
      message.trim().length > 0 &&
      agree
    );
  }, [name, email, grade, weakUnit, message, agree]);

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
      weakUnit,
      message: message.trim(),
      agree: agree ? "1" : "",
    };

    try {
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

      trackTrialPaymentClick({
        course: "trial",
        email: payload.email,
      });

      const stripeUrl = payload.email
        ? `${STRIPE_PAYMENT_URL}?prefilled_email=${encodeURIComponent(payload.email)}`
        : STRIPE_PAYMENT_URL;
      window.location.href = stripeUrl;
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

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Field
        label="氏名（生徒）"
        htmlFor="name"
        required
        helper="受講される生徒さまのお名前をご記入ください。"
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
          label="体験してみたい分野"
          htmlFor="weakUnit"
          required
          helper="苦手 / これから強化したい分野を1つ選んでください。当日の診断ミニ授業のテーマになります。"
          error={fieldErrors.weakUnit}
        >
          <select
            id="weakUnit"
            name="weakUnit"
            required
            className={inputClass}
            value={weakUnit}
            onChange={(e) => setWeakUnit(e.target.value)}
            aria-invalid={!!fieldErrors.weakUnit}
          >
            <option value="">選択してください</option>
            {WEAK_UNITS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="ご相談内容 / 現状"
        htmlFor="message"
        required
        helper="現在の学習状況・志望校・つまずきなど、わかる範囲でご記入ください。"
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
          placeholder="例）高2、共通テストで6割で頭打ち。電磁気が特に苦手で…"
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
            送信中…
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4" aria-hidden />
            決済画面へ進んで申し込みを確定する
          </>
        )}
      </button>

      {!isComplete && (
        <p className="text-[12px] sm:text-[11.5px] leading-[1.7] text-ink-500">
          ※ 必須項目（*）の入力と、プライバシーポリシーへの同意で送信ボタンが有効になります。
        </p>
      )}

      <p className="text-[12px] sm:text-[11.5px] leading-[1.7] text-ink-500">
        ※ 決済はすべて Stripe を通じて行われます。Solvora Learning Lab はカード番号を保持しません。
        決済が完了しなかった場合、申し込みは確定しません。
      </p>
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
