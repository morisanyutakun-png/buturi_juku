"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const grades = [
  "高校1年生",
  "高校2年生",
  "高校3年生",
  "既卒生",
  "保護者",
  "その他",
];

const topics = [
  "体験授業の申し込み",
  "講座内容について",
  "料金について",
  "学習相談",
  "その他",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      // 将来的にここを `/api/contact` のRoute Handlerへ差し替え
      await new Promise((resolve) => setTimeout(resolve, 900));
      console.info("[contact-form] payload", payload);
      setStatus("success");
    } catch (e) {
      console.error(e);
      setStatus("error");
      setError("送信に失敗しました。時間をおいて再度お試しください。");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
          <Check className="h-5 w-5" />
        </div>
        <h3 className="mt-6 font-serif text-xl text-paper">
          送信ありがとうございました。
        </h3>
        <p className="mt-3 text-sm text-paper/70">
          2営業日以内にご入力のメールアドレスへ担当よりご連絡いたします。
        </p>
      </div>
    );
  }

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
          <select id="topic" name="topic" required className={inputClass}>
            <option value="">選択してください</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

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

      <label className="flex items-start gap-3 text-xs text-paper/60">
        <input
          type="checkbox"
          name="agree"
          required
          className="mt-1 accent-accent"
        />
        <span>
          <a href="/privacy" className="text-accent hover:underline">
            プライバシーポリシー
          </a>
          に同意の上、送信します。
        </span>
      </label>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink-950 transition hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            送信中…
          </>
        ) : (
          "送信する"
        )}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-paper/10 bg-ink-900/60 px-4 py-3 text-sm text-paper placeholder:text-paper/30 outline-none focus:border-accent focus:ring-1 focus:ring-accent/60 transition";

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs tracking-widest uppercase text-paper/60"
      >
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}
