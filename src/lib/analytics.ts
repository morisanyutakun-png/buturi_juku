/**
 * GA4 (Google Analytics 4) 計測ヘルパ。
 *
 * 設計方針:
 *   - 計測 ID は環境変数 `NEXT_PUBLIC_GA_ID` を優先し、未設定時はハードコード値にフォールバック。
 *     Vercel 等で env を切り替えれば preview/staging で計測を分離できる。
 *   - クライアント以外（SSR / build-time）でも安全に呼べるよう、window/gtag の存在を毎回確認。
 *   - 主要コンバージョンには「カスタムイベント名」と「GA4 推奨イベント名」の両方を発火させ、
 *     GA4 admin → 「コンバージョンとしてマーク」で柔軟にマッピングできるようにする。
 */

export const GA_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? "G-WT6BZVH9YJ";

type GtagFn = (
  command: "event" | "config" | "set" | "consent" | "js",
  ...args: unknown[]
) => void;

type WindowWithGtag = Window & {
  gtag?: GtagFn;
  dataLayer?: unknown[];
};

/**
 * 任意の GA4 イベントを送る。gtag が未ロードでも黙って no-op。
 *
 * @example
 *   trackEvent("trial_payment_click", { course: "electromagnetism" });
 */
export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  const w = window as WindowWithGtag;
  if (typeof w.gtag !== "function") {
    // gtag 未読み込み（広告ブロッカ / 開発環境 / Script 失敗）でもアプリは継続。
    return;
  }
  w.gtag("event", eventName, params);
}

/**
 * 体験申し込みフォームから Stripe 決済画面へ遷移する瞬間に発火。
 *
 * 二重計測:
 *   - `trial_payment_click` カスタムイベント（GA4 admin で "conversion" としてマーク推奨）
 *   - GA4 推奨イベント `generate_lead`（リード獲得を意味するセマンティック名）
 */
export function trackTrialPaymentClick(payload: {
  course?: string | null;
  email?: string | null;
}): void {
  const params = {
    course: payload.course ?? "未定",
    method: "stripe_checkout",
  };
  trackEvent("trial_payment_click", params);
  // GA4 推奨イベント — 体験申込はリード獲得イベントに相当
  trackEvent("generate_lead", {
    currency: "JPY",
    value: 0,
    ...params,
  });
}

/**
 * Stripe 決済完了 → /thanks ページに到達した瞬間に発火。
 *
 * 二重計測:
 *   - `trial_application_complete` カスタムイベント（GA4 admin で "conversion" としてマーク推奨）
 *   - GA4 推奨イベント `purchase`（決済完了 = 申し込み確定）
 *
 * @param transactionId Stripe success_url から拾える `session_id` があれば渡す。
 *                      重複発火防止に GA4 側で利用される。
 */
export function trackTrialApplicationComplete(payload: {
  course?: string | null;
  transactionId?: string | null;
}): void {
  const params = {
    course: payload.course ?? "未定",
  };
  trackEvent("trial_application_complete", params);
  trackEvent("purchase", {
    transaction_id: payload.transactionId ?? `trial_${Date.now()}`,
    currency: "JPY",
    value: 0,
    ...params,
  });
}
