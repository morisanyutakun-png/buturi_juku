import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.ogImageAlt;

/** Inline the Solvora brand mark as a data URI so Satori can render it at build time. */
const brandIconDataUri = (() => {
  try {
    const buf = fs.readFileSync(
      path.join(process.cwd(), "public/brand/solvora-icon-512.png"),
    );
    return `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
})();

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
            「1」は最初の 1 単元・1 冊のニュアンスを残す。 */}
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
              width: 76,
              height: 76,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {brandIconDataUri ? (
              // Satori が PNG をそのまま埋め込めるよう data URI を使用。
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={brandIconDataUri}
                alt=""
                width={76}
                height={76}
                style={{ width: 76, height: 76, objectFit: "contain" }}
              />
            ) : (
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 38,
                  background:
                    "linear-gradient(135deg, rgba(59,124,217,0.18), rgba(71,85,105,0.18))",
                  border: "1px solid rgba(20,35,65,0.10)",
                  display: "flex",
                }}
              />
            )}
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
              高校物理 演習プリント・解説 PDF・参考書
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
            FREE PRINTS — まず 1 単元から
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
              公式は覚えた。
            </div>
            <div style={{ display: "flex" }}>
              それなのに、
              <span style={{ color: "#b35f27" }}>解けない</span>。
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
              力学・電磁気・波動・熱・原子の演習プリントと解説 PDF を、Web プレビュー＋印刷向け PDF で無料公開。参考書 6 冊と合わせて、自分のペースで読み通せます。
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
              FREE / WEB & PDF / 参考書 6冊 / 必要な人だけ学習サポート
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
              PRINTS · FREE
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
              無料 / Web で読める
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
