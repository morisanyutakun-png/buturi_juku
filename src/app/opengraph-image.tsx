import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.ogImageAlt;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          fontFamily: "serif",
          background:
            "linear-gradient(135deg, #fefcf6 0%, #f3e9ff 22%, #fde0c5 55%, #fff5e0 82%, #fbf5e6 100%)",
          position: "relative",
        }}
      >
        {/* warm wash top-right */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(closest-side at 88% 18%, rgba(255,200,148,0.55), transparent 70%)",
          }}
        />
        {/* brand wash top-left */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(closest-side at 8% 18%, rgba(155,188,255,0.45), transparent 65%)",
          }}
        />
        {/* gold halo bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(closest-side at 50% 110%, rgba(243,228,182,0.6), transparent 75%)",
          }}
        />

        {/* large numeral watermark — replaces the legacy 森 kanji.
            Hints at the H1 「解けなかった1問を…」without leaning on the
            old forest motif. */}
        <div
          style={{
            position: "absolute",
            right: -30,
            bottom: -240,
            fontSize: 720,
            color: "rgba(31,90,166,0.08)",
            lineHeight: 0.8,
            display: "flex",
          }}
        >
          1
        </div>

        {/* top: brand mark + label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background:
                "linear-gradient(135deg, rgba(59,124,217,0.18), rgba(71,85,105,0.18))",
              border: "1px solid rgba(20,35,65,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 32 32">
              <ellipse cx="16" cy="16" rx="12" ry="4.5" fill="none" stroke="#3b7cd9" strokeWidth="1.6" />
              <ellipse cx="16" cy="16" rx="12" ry="4.5" fill="none" stroke="#475569" strokeWidth="1.6" transform="rotate(60 16 16)" />
              <ellipse cx="16" cy="16" rx="12" ry="4.5" fill="none" stroke="#e28040" strokeWidth="1.6" transform="rotate(-60 16 16)" />
              <circle cx="16" cy="16" r="2.4" fill="#caa34b" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                fontSize: 22,
                letterSpacing: 4,
                color: "#142341",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              SOLVORA LEARNING LAB
            </div>
            <div
              style={{
                fontSize: 18,
                color: "#36456a",
                letterSpacing: 2,
                display: "flex",
              }}
            >
              AI復習プリント付き 高校物理・理系個別指導
            </div>
          </div>
        </div>

        {/* center: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#1f5aa6",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            REPAIR EVERY MISSED PROBLEM
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 88,
              color: "#142341",
              lineHeight: 1.18,
              letterSpacing: -2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>
              解けなかった
              <span style={{ color: "#1f5aa6" }}>1問</span>
              を、
            </div>
            <div style={{ display: "flex" }}>
              その子専用の
              <span style={{ color: "#b35f27" }}>復習プリント</span>
              に。
            </div>
          </div>
        </div>

        {/* bottom: tagline + chips */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              maxWidth: 760,
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: "#36456a",
                lineHeight: 1.55,
                display: "flex",
              }}
            >
              講師がつまずきを確認し、AI（REM）で類題・解答・復習PDFを作成します。
            </div>
            <div
              style={{
                fontSize: 18,
                color: "#8e6c2a",
                letterSpacing: 4,
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              全国オンライン対応 / 1対1個別指導 / 入塾金0円
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 8,
            }}
          >
            <div
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(20,35,65,0.10)",
                fontSize: 18,
                color: "#1f5aa6",
                letterSpacing: 3,
                display: "flex",
              }}
            >
              FREE TRIAL · 60 MIN
            </div>
            <div
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                background: "#fef4eb",
                border: "1px solid rgba(226,128,64,0.35)",
                fontSize: 18,
                color: "#b35f27",
                letterSpacing: 3,
                display: "flex",
              }}
            >
              月 ¥38,000〜
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
