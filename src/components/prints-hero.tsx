import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/breadcrumb";
import type { Print } from "@/data/prints";
import { printThumbPath, PRINT_BLUR_DATA_URL } from "@/data/prints";

type Props = {
  /** ヒーロー右側の浮遊カードに使う 1〜3 件の Print。 */
  cards: readonly Print[];
  /** 「全 N 教材」表示用。 */
  total: number;
};

/**
 * /prints 専用のグラスモーフィズム・ヒーロー。
 *
 * デザイン意図:
 * - 既存の PageHero は和紙質感 + 巨大透かし漢字 だが、教材アーカイブ系には
 *   柔らかいブロブ + フローティングカードのほうが「中身が複数ある」感を出せる。
 * - 左側は backdrop-blur の半透明ガラスパネルに H1 と説明文を載せる。
 * - 右側（lg+）で page-1 サムネを使った A4 カードを 3 枚、わずかに重ねて傾ける。
 *   タブレットでは小さめ、モバイルではガラスパネルのみ表示してカードは隠す。
 * - H1 は「読む。解く。理解する。」の 3 動詞構成で、参考デザイン
 *   （Study. Understand. Master.）の縦リズムを日本語で再現する。
 *   "、" を行末に置く構成は viewport によって "、" だけの行が生まれるため避けた。
 */
export function PrintsHero({ cards, total }: Props) {
  // 中央を最前面に置く Z 順 + 重ね位置。少しオーバーラップさせて雑誌の表紙写真風に。
  const tilts: { rotate: number; top: number; left: number; z: number }[] = [
    { rotate: -7, top: 70, left: 0, z: 20 },
    { rotate: 3, top: 0, left: 175, z: 30 },
    { rotate: -3, top: 110, left: 320, z: 10 },
  ];

  return (
    <section className="relative isolate overflow-hidden border-b border-ink-900/[0.06]">
      {/* base wash — site の paper トーンに合わせた淡いグラデ */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #fefcf6 0%, #f3ecd3 55%, #ede1bd 100%)",
        }}
      />

      {/* organic color blobs — 控えめな 2 つだけ */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[8%] top-[6%] h-[50%] w-[50%] rounded-full opacity-55"
        style={{
          background:
            "radial-gradient(closest-side, rgba(155,188,255,0.55), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[2%] top-[4%] h-[50%] w-[45%] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(243,228,182,0.7), transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <Container className="relative pt-6 sm:pt-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "演習プリント", href: "/prints" },
          ]}
        />
      </Container>

      <Container className="relative pb-12 pt-6 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* LEFT — glassmorphism panel */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-[1.5rem] border border-white/55 p-7 sm:p-9 shadow-card"
              style={{
                background:
                  "linear-gradient(140deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.28) 100%)",
                backdropFilter: "blur(24px) saturate(140%)",
                WebkitBackdropFilter: "blur(24px) saturate(140%)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/60"
              />

              <p className="relative text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.26em] sm:tracking-[0.3em] text-warm-deep">
                演習プリント
              </p>

              <h1
                className="relative mt-4 sm:mt-5 font-serif text-[2.4rem] sm:text-[2.9rem] lg:text-[3.2rem] leading-[1.1] tracking-[-0.022em] text-ink-900"
                style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
              >
                Web で読める、<br />
                <span className="text-warm-deep">高校物理 演習集。</span>
              </h1>

              <p
                className="relative mt-5 sm:mt-6 text-[14px] sm:text-[15px] leading-[1.9] text-ink-700"
                style={{ lineBreak: "strict", wordBreak: "normal", overflowWrap: "anywhere" }}
              >
                典型問題を、PDF と Web プレビューのセットで公開しています。授業・自習・直前演習にそのまま使えます。
              </p>

              <div className="relative mt-6 sm:mt-7 flex items-end justify-between gap-3">
                <p className="font-mono text-[11px] tracking-[0.18em] text-ink-500">
                  全 {total} 教材 / 順次追加
                </p>
                <a
                  href="#materials"
                  className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-800 transition hover:text-warm-deep"
                >
                  教材を見る
                  <span aria-hidden>↓</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — floating tilted print cards (lg+ のみ) */}
          <div
            className="relative hidden lg:block"
            style={{ height: 540 }}
            aria-hidden
          >
            {cards.slice(0, 3).map((p, i) => {
              const t = tilts[i] ?? tilts[0];
              return (
                <FloatingPrintCard
                  key={p.slug}
                  print={p}
                  index={i}
                  rotate={t.rotate}
                  top={t.top}
                  left={t.left}
                  z={t.z}
                />
              );
            })}
          </div>

          {/* TABLET — md でだけ小さめの 3 枚を 1 行で（lg では非表示） */}
          <div
            className="relative hidden md:flex lg:hidden items-end justify-center gap-3"
            aria-hidden
          >
            {cards.slice(0, 3).map((p, i) => (
              <div
                key={p.slug}
                className="relative w-[150px] overflow-hidden rounded-xl border border-white/70 bg-white shadow-card"
                style={{
                  transform: `rotate(${i === 1 ? 0 : i === 0 ? -5 : 4}deg) translateY(${i === 1 ? "-12px" : "0"})`,
                }}
              >
                <div className="relative aspect-[210/297] w-full bg-paper-soft">
                  <Image
                    src={printThumbPath(p)}
                    alt=""
                    fill
                    sizes="150px"
                    quality={65}
                    loading="lazy"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FloatingPrintCard({
  print,
  index,
  rotate,
  top,
  left,
  z,
}: {
  print: Print;
  index: number;
  rotate: number;
  top: number;
  left: number;
  z: number;
}) {
  return (
    <Link
      href={`/prints/${print.slug}`}
      className="group absolute block transition-all duration-500 ease-out hover:!rotate-0 hover:!translate-y-[-6px] hover:z-50"
      style={{
        top: `${top}px`,
        left: `${left}px`,
        transform: `rotate(${rotate}deg)`,
        zIndex: z,
      }}
      aria-label={`${print.title} を開く`}
    >
      <div className="relative w-[230px] overflow-hidden rounded-2xl border border-white/70 bg-white shadow-elevate">
        <div className="relative aspect-[210/297] w-full bg-paper-soft">
          <Image
            src={printThumbPath(print)}
            alt={print.title}
            fill
            sizes="230px"
            quality={70}
            priority={index === 1}
            loading={index === 1 ? undefined : "lazy"}
            placeholder="blur"
            blurDataURL={PRINT_BLUR_DATA_URL}
            className="object-cover object-top"
          />
          <span className="absolute left-2.5 top-2.5 inline-flex rounded-full bg-white/95 px-2 py-0.5 font-mono text-[9.5px] tracking-[0.18em] text-ink-700 shadow-soft">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute right-2.5 top-2.5 inline-flex rounded-full bg-ink-900/85 px-2 py-0.5 font-mono text-[9.5px] tracking-[0.14em] text-paper">
            {print.subject}
          </span>
        </div>
        <div className="px-3.5 py-3">
          <p className="font-serif text-[12px] leading-[1.5] text-ink-900 line-clamp-2 min-h-[2.4em]">
            {print.title}
          </p>
          <p className="mt-1 text-[10.5px] text-ink-500">
            {print.topic} ／ 全 {print.pageCount} ページ
          </p>
        </div>
      </div>
    </Link>
  );
}
