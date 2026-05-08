import { NextResponse } from "next/server";
import { Resend } from "resend";
import { courses } from "@/data/courses";

/**
 * /api/contact — お問い合わせ / 体験申込のメール送信エンドポイント。
 *
 * 設計方針:
 *   - サーバーサイドで再度バリデーション（クライアント検証は破壊可能なため）。
 *   - Resend (https://resend.com) を使い `morisan.yutakun@gmail.com` 宛に送信。
 *   - HTML / プレーンテキスト 両方で送り、迷惑メール扱いを下げる。
 *   - エラー時はエラー詳細を**ログだけ**に残し、レスポンスでは汎用文言に丸める。
 *
 * 必要な環境変数:
 *   RESEND_API_KEY        Resend ダッシュボードで発行（必須）
 *   CONTACT_EMAIL_FROM    例: "Solvora <noreply@yuta-eng.com>" (Resend で domain verify 必要)
 *                         未設定時は "onboarding@resend.dev"（Resend のデフォルト送信元、テスト用）
 *   CONTACT_EMAIL_TO      受信先。未設定時は "morisan.yutakun@gmail.com"
 */
export const runtime = "nodejs";

const FROM = process.env.CONTACT_EMAIL_FROM ?? "Solvora <onboarding@resend.dev>";
const TO = process.env.CONTACT_EMAIL_TO ?? "morisan.yutakun@gmail.com";

type ContactPayload = {
  name?: string;
  email?: string;
  grade?: string;
  topic?: string;
  course?: string;
  message?: string;
  agree?: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isEmail(v: string): boolean {
  // 簡易検証。Stripe・GA4 と同じ「ザル + 後で人間が確認」スタンス。
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function courseLabel(slug: string | undefined): string {
  if (!slug || slug === "未定") return "決まっていない / まずは体験したい";
  const course = courses.find((c) => c.slug === slug);
  return course ? course.title : slug;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "INVALID_JSON" },
      { status: 400 },
    );
  }

  // === サーバーサイド・バリデーション ===
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const grade = (body.grade ?? "").trim();
  const topic = (body.topic ?? "").trim();
  const message = (body.message ?? "").trim();
  const course = (body.course ?? "").trim();
  const agree = body.agree;

  const errors: Record<string, string> = {};
  if (!name) errors.name = "お名前を入力してください。";
  if (!email) errors.email = "メールアドレスを入力してください。";
  else if (!isEmail(email))
    errors.email = "メールアドレスの形式が正しくありません。";
  if (!grade) errors.grade = "学年を選択してください。";
  if (!topic) errors.topic = "ご相談内容の種類を選択してください。";
  if (!message) errors.message = "ご相談内容を入力してください。";
  if (!agree)
    errors.agree = "プライバシーポリシーへの同意が必要です。";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_FAILED", errors },
      { status: 400 },
    );
  }

  // === Resend で送信 ===
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // 環境変数未設定 — 開発環境では console に出すだけで成功扱い
    console.warn(
      "[/api/contact] RESEND_API_KEY 未設定。メール送信をスキップして console 出力のみ。",
    );
    console.info("[/api/contact] payload", {
      name,
      email,
      grade,
      topic,
      course,
      message,
    });
    return NextResponse.json({
      ok: true,
      mode: "dev_log_only",
      note: "RESEND_API_KEY が未設定のため、メールは送信されませんでした。Vercel の環境変数に設定してください。",
    });
  }

  const resend = new Resend(apiKey);
  const courseDisplay = courseLabel(course);
  const isTrialApplication = topic.includes("体験");
  const subject = isTrialApplication
    ? `【Solvora】体験申込 — ${name}様（${grade}）`
    : `【Solvora】お問い合わせ — ${name}様（${topic}）`;

  const text = [
    `Solvora Learning Lab — フォーム送信通知`,
    ``,
    `▼ 受付内容`,
    `お名前       : ${name}`,
    `メール       : ${email}`,
    `学年         : ${grade}`,
    `ご相談内容種類: ${topic}`,
    `受講希望講座 : ${courseDisplay}`,
    ``,
    `▼ ご相談内容`,
    message,
    ``,
    `------`,
    isTrialApplication
      ? `※ 体験申込です。Stripe 決済の状況を別途ご確認ください。`
      : `※ 一般のお問い合わせです。`,
    `送信日時: ${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}`,
  ].join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif; line-height: 1.7; color: #142341; max-width: 600px;">
      <h2 style="font-size: 18px; border-bottom: 2px solid #1f5aa6; padding-bottom: 8px;">
        Solvora Learning Lab — フォーム送信通知
      </h2>
      <table style="border-collapse: collapse; margin-top: 20px; font-size: 14px;">
        <tr><td style="padding: 6px 16px 6px 0; color: #586780; vertical-align: top;">お名前</td><td style="padding: 6px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 6px 16px 6px 0; color: #586780; vertical-align: top;">メール</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #1f5aa6;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 6px 16px 6px 0; color: #586780; vertical-align: top;">学年</td><td style="padding: 6px 0;">${escapeHtml(grade)}</td></tr>
        <tr><td style="padding: 6px 16px 6px 0; color: #586780; vertical-align: top;">相談内容種類</td><td style="padding: 6px 0;">${escapeHtml(topic)}</td></tr>
        <tr><td style="padding: 6px 16px 6px 0; color: #586780; vertical-align: top;">受講希望講座</td><td style="padding: 6px 0;">${escapeHtml(courseDisplay)}</td></tr>
      </table>
      <h3 style="margin-top: 28px; font-size: 14px; color: #586780;">▼ ご相談内容</h3>
      <div style="background: #f6f2e8; border-left: 3px solid #e28040; padding: 12px 16px; white-space: pre-wrap; font-size: 14px;">${escapeHtml(message)}</div>
      <p style="margin-top: 28px; font-size: 12px; color: #697792;">
        ${
          isTrialApplication
            ? "※ 体験申込です。Stripe 決済の状況を別途ご確認ください。"
            : "※ 一般のお問い合わせです。"
        }<br>
        送信日時: ${escapeHtml(new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }))}
      </p>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[/api/contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "EMAIL_SEND_FAILED" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("[/api/contact] unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR" },
      { status: 500 },
    );
  }
}
