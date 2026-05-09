"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Mail, CalendarClock } from "lucide-react";
import { trackTrialApplicationComplete } from "@/lib/analytics";

const PENDING_KEY = "solvora-pending-application";
/** 同じセッションで複数回 GA4 イベントを発火させないための flag。 */
const FIRED_KEY = "solvora-thanks-event-fired";

type Recovered = {
  name?: string;
  email?: string;
  grade?: string;
  weakUnit?: string;
  submittedAt?: string;
};

/**
 * Stripe 決済完了後にユーザーが戻ってくるサンクスページの本体。
 * フォーム送信時に localStorage に保存された値を復元し、
 * 「お申し込みを確認しました」UI を出す。
 *
 * Stripe の Payment Link 側で `success_url` を
 * `https://<本番ドメイン>/thanks` に設定しておく必要がある（Stripe Dashboard）。
 */
export function ThanksConfirmation() {
  const [recovered, setRecovered] = useState<Recovered | null>(null);

  useEffect(() => {
    let recoveredData: Recovered | null = null;
    try {
      const data = localStorage.getItem(PENDING_KEY);
      if (data) {
        recoveredData = JSON.parse(data) as Recovered;
        setRecovered(recoveredData);
        // 取得後に消す（同じ申込で再表示されないように）
        localStorage.removeItem(PENDING_KEY);
      }
    } catch {
      // localStorage が使えない / JSON 不正 — 黙ってフォールバック表示。
    }

    // GA4 計測：申込完了。Stripe success_url の `?session_id=` があれば
    // transaction_id として送り、ブラウザ更新時の重複発火を sessionStorage で防ぐ。
    //
    // gtag.js が `afterInteractive` で読み込まれるため、本 useEffect の方が
    // 先に走るケースがある（race condition）。analytics.ts の trackEvent は
    // gtag 未ロード時でも dataLayer に直接 push する設計なので、この時点で
    // 呼んでも遅延配信される。
    try {
      const alreadyFired = sessionStorage.getItem(FIRED_KEY);
      if (!alreadyFired) {
        const url = new URL(window.location.href);
        const sessionId =
          url.searchParams.get("session_id") ??
          url.searchParams.get("checkout_session_id");
        trackTrialApplicationComplete({
          course: recoveredData?.weakUnit ?? null,
          transactionId: sessionId,
        });
        sessionStorage.setItem(FIRED_KEY, "1");
        // 開発時の確認用ログ。本番でも害なし。
        if (typeof console !== "undefined") {
          console.info(
            "[analytics] trial_application_complete fired",
            { weakUnit: recoveredData?.weakUnit, sessionId },
          );
        }
      }
    } catch {
      // sessionStorage / window.location が使えない場合も計測スキップで継続。
    }
  }, []);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-forest/30 bg-forest-bg/40 p-8 sm:p-10">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-forest/40 bg-white text-forest-deep shadow-soft">
            <Check className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <p className="text-[10.5px] font-medium tracking-[0.28em] uppercase text-forest-deep">
              APPLICATION RECEIVED
            </p>
            <h2 className="mt-3 font-serif text-[1.45rem] sm:text-[1.6rem] leading-[1.5] tracking-[-0.008em] text-ink-900">
              決済完了 — 申し込みを正式に受け付けました。
            </h2>
            <p className="mt-4 text-[14.5px] sm:text-[14px] leading-[1.95] text-ink-700">
              ご決済ありがとうございました。担当の森祐太より、
              <strong className="text-ink-900 font-medium">2営業日以内</strong>
              にご入力のメールアドレスへ、体験授業の日程候補をお送りします。
            </p>
          </div>
        </div>

        {recovered && (
          <div className="mt-8 rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-6">
            <p className="text-[10.5px] font-medium tracking-[0.24em] uppercase text-ink-500">
              受付内容（控え）
            </p>
            <dl className="mt-4 grid gap-3 text-[13.5px] leading-[1.7] text-ink-800 sm:grid-cols-[8rem_1fr] sm:gap-x-6 sm:gap-y-2.5">
              {recovered.name && (
                <>
                  <dt className="text-ink-500">氏名（生徒）</dt>
                  <dd>{recovered.name}</dd>
                </>
              )}
              {recovered.email && (
                <>
                  <dt className="text-ink-500">メールアドレス</dt>
                  <dd className="break-all">{recovered.email}</dd>
                </>
              )}
              {recovered.grade && (
                <>
                  <dt className="text-ink-500">学年</dt>
                  <dd>{recovered.grade}</dd>
                </>
              )}
              {recovered.weakUnit && (
                <>
                  <dt className="text-ink-500">体験したい分野</dt>
                  <dd>{recovered.weakUnit}</dd>
                </>
              )}
            </dl>
            <p className="mt-4 text-[12px] leading-[1.7] text-ink-500">
              ※ この控えはこの画面でのみ表示されます。担当からの返信メールでも内容をご確認いただけます。
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-ink-900/10 bg-white p-5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-bg text-brand-deep">
              <Mail className="h-4 w-4" aria-hidden />
            </span>
            <p className="mt-3 font-serif text-[1rem] text-ink-900">
              担当より返信
            </p>
            <p className="mt-2 text-[13px] leading-[1.7] text-ink-600">
              2営業日以内に、日程調整のメールをお送りします。
            </p>
          </div>
          <div className="rounded-xl border border-ink-900/10 bg-white p-5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-warm-bg text-warm-deep">
              <CalendarClock className="h-4 w-4" aria-hidden />
            </span>
            <p className="mt-3 font-serif text-[1rem] text-ink-900">
              体験授業当日
            </p>
            <p className="mt-2 text-[13px] leading-[1.7] text-ink-600">
              60分で現状診断 + 学習戦略 + おすすめコースをご提案します。
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-ink-900/15 bg-white px-5 py-3 text-[14px] text-ink-800 transition hover:border-ink-900/30 hover:bg-paper-soft"
          >
            ホームに戻る
          </Link>
          <Link
            href="/courses/electromagnetism"
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-brand/30 bg-brand-bg/60 px-5 py-3 text-[14px] text-brand-deep transition hover:bg-brand-bg"
          >
            おすすめの電磁気集中講座を見る
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
