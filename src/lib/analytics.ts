/**
 * GA4 (Google Analytics 4) + Google Ads 計測ヘルパ。
 *
 * 設計方針:
 *   - 計測 ID は環境変数を優先し、未設定時はハードコード値にフォールバック。
 *     Vercel 等で env を切り替えれば preview/staging で計測を分離できる。
 *   - クライアント以外（SSR / build-time）でも安全に呼べるよう、window/gtag の存在を毎回確認。
 *   - 主要コンバージョンは GA4 / Google Ads の両方に送る。
 *
 * Google Ads の「個別コンバージョンアクション」を計測するには、
 * Google Ads ダッシュボードで コンバージョン アクションを作成し、
 * 発行された **コンバージョン ラベル**（例: `AbCdEfGhIj_kLmNoPqR`）を
 * `GADS_CONVERSION_LABELS` に登録する。ラベル未設定の状態でも、
 * `gtag('config', GADS_ID)` によるページビュー型コンバージョンは
 * Google Ads 側でターゲット URL を指定すれば計測可能。
 */

/** GA4 計測 ID。 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-WT6BZVH9YJ";

/** Google Ads コンバージョン ID。 */
export const GADS_ID =
  process.env.NEXT_PUBLIC_GADS_ID ?? "AW-17966887751";

/**
 * Google Ads の各コンバージョンアクションのラベル。
 * Google Ads ダッシュボードで「コンバージョン アクションを作成」した後に
 * 発行されるラベル文字列をここに貼り付ける。
 *
 * 未設定（null）の状態では、Google Ads 側ではページビュー型の
 * コンバージョン（URL マッチング）として計測する形になる。
 */
export const GADS_CONVERSION_LABELS = {
  /** 体験申込フォームの決済ボタンクリック（Stripe redirect 直前）。 */
  trialPaymentClick: process.env.NEXT_PUBLIC_GADS_LABEL_TRIAL_CLICK ?? null,
  /** 決済完了 → /thanks ページ到達。 */
  trialApplicationComplete:
    process.env.NEXT_PUBLIC_GADS_LABEL_TRIAL_COMPLETE ?? null,
} as const;

type GtagFn = (
  command: "event" | "config" | "set" | "consent" | "js",
  ...args: unknown[]
) => void;

type WindowWithGtag = Window & {
  gtag?: GtagFn;
  dataLayer?: unknown[];
};

/**
 * gtag 未ロード時でも安全にイベントをキューに積む。
 *
 * 競合パターン:
 *   `/thanks` などマウント直後の useEffect で trackEvent が呼ばれると、
 *   layout.tsx の `gtag-init` Script (afterInteractive) よりも先に走り、
 *   `window.gtag` が未定義になる場合がある。
 *
 * 解決:
 *   gtag が未定義なら **gtag-init Script と同形式の関数を自前で定義**し、
 *   それ経由で push する。gtag は内部で `dataLayer.push(arguments)` する仕様で、
 *   gtag.js は `arguments` オブジェクトのみを正しく処理するため、配列を直接
 *   push してはいけない。後から gtag-init Script が走っても、定義済みの
 *   gtag を上書きするだけでキューは保持される。
 */
function ensureGtag(): void {
  if (typeof window === "undefined") return;
  const w = window as WindowWithGtag;

  if (!Array.isArray(w.dataLayer)) {
    w.dataLayer = [];
  }
  if (typeof w.gtag !== "function") {
    // Google 公式スニペットと等価:
    //   function gtag(){dataLayer.push(arguments);}
    // arguments オブジェクトで push することが gtag.js の処理対象になるための条件。
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      (w.dataLayer as unknown[]).push(arguments);
    } as GtagFn;
  }
}

function pushToDataLayer(args: unknown[]): void {
  if (typeof window === "undefined") return;
  ensureGtag();
  const w = window as WindowWithGtag;
  // ensureGtag() の後なので gtag は必ず存在する。
  (w.gtag as (...a: unknown[]) => void)(...args);
}

/**
 * 任意の GA4 イベントを送る。gtag が未ロードでも dataLayer に積んで
 * gtag.js のロード完了後に届くようにする。
 *
 * @example
 *   trackEvent("trial_payment_click", { course: "electromagnetism" });
 */
export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {},
): void {
  pushToDataLayer(["event", eventName, params]);
}

/**
 * Google Ads のコンバージョンを送る。
 * `label` が未指定（null）の場合は ID 単独で送り、
 * Google Ads 側で URL マッチング型コンバージョンに頼る。
 */
export function trackGoogleAdsConversion(
  label: string | null,
  params: Record<string, unknown> = {},
): void {
  const sendTo = label ? `${GADS_ID}/${label}` : GADS_ID;
  pushToDataLayer([
    "event",
    "conversion",
    {
      send_to: sendTo,
      ...params,
    },
  ]);
}

/**
 * 体験申し込みフォームから Stripe 決済画面へ遷移する瞬間に発火。
 *
 * 二重計測:
 *   - GA4: `trial_payment_click` カスタムイベント + `generate_lead` 推奨イベント
 *   - Google Ads: `conversion` イベント (ラベルがあれば)
 */
export function trackTrialPaymentClick(payload: {
  course?: string | null;
  email?: string | null;
}): void {
  const params = {
    course: payload.course ?? "未定",
    method: "stripe_checkout",
  };
  // GA4
  trackEvent("trial_payment_click", params);
  trackEvent("generate_lead", {
    currency: "JPY",
    value: 0,
    ...params,
  });
  // Google Ads
  trackGoogleAdsConversion(GADS_CONVERSION_LABELS.trialPaymentClick, {
    currency: "JPY",
    value: 0,
  });
}

/**
 * Stripe 決済完了 → /thanks ページに到達した瞬間に発火。
 *
 * 二重計測:
 *   - GA4: `trial_application_complete` カスタム + `purchase` 推奨
 *   - Google Ads: `conversion` イベント (ラベルがあれば)
 *
 * @param transactionId Stripe success_url から拾える `session_id` があれば渡す。
 *                      重複発火防止に GA4 / Google Ads 双方で利用される。
 */
export function trackTrialApplicationComplete(payload: {
  course?: string | null;
  transactionId?: string | null;
}): void {
  const params = {
    course: payload.course ?? "未定",
  };
  const txnId = payload.transactionId ?? `trial_${Date.now()}`;
  // GA4
  trackEvent("trial_application_complete", params);
  trackEvent("purchase", {
    transaction_id: txnId,
    currency: "JPY",
    value: 0,
    ...params,
  });
  // Google Ads
  trackGoogleAdsConversion(
    GADS_CONVERSION_LABELS.trialApplicationComplete,
    {
      transaction_id: txnId,
      currency: "JPY",
      value: 0,
    },
  );
}
