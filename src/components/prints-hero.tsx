import Link from "next/link";
import Image from "next/image";
import { BookOpen, Download, Sparkles, type LucideIcon } from "lucide-react";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/breadcrumb";
import { cn } from "@/lib/utils";
import type { Print } from "@/data/prints";
import { printThumbPath } from "@/data/prints";

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

      {/* organic color blobs — 参考画像のオーロラ感を、サイト配色（warm/brand/gold）で再現 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[8%] top-[6%] h-[55%] w-[55%] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(155,188,255,0.7), transparent 70%)",
          filter: "blur(72px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[2%] top-[4%] h-[55%] w-[48%] rounded-full opacity-75"
        style={{
          background:
            "radial-gradient(closest-side, rgba(243,228,182,0.85), transparent 70%)",
          filter: "blur(86px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[28%] bottom-[2%] h-[45%] w-[45%] rounded-full opacity-65"
        style={{
          background:
            "radial-gradient(closest-side, rgba(251,221,196,0.75), transparent 70%)",
          filter: "blur(96px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[28%] bottom-[12%] h-[28%] w-[28%] rounded-full opacity-55"
        style={{
          background:
            "radial-gradient(closest-side, rgba(199,166,243,0.55), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* small decorative spheres */}
      <DecorativeSphere className="left-[7%] top-[14%] h-7 w-7" />
      <DecorativeSphere className="left-[46%] bottom-[12%] h-4 w-4" />
      <DecorativeSphere className="right-[8%] bottom-[18%] h-9 w-9" />
      <DecorativeSphere className="right-[42%] top-[10%] hidden h-3.5 w-3.5 sm:block" />

      {/* floating formula chips — 参考画像の「公式が並ぶ」感をサイト配色で再現。
          カード本体（z=10〜30）の "上" に z=40 で重ね、紙束に挟まった付箋のように見せる。 */}
      <FormulaChip
        className="hidden xl:flex right-[5%] top-[10%]"
        rotate={-5}
        index="01"
        topic="Electromagnetism"
        formula={<><span className="italic">F</span> = q<span className="italic">v</span> × <span className="italic">B</span></>}
      />
      <FormulaChip
        className="hidden xl:flex right-[34%] top-[4%]"
        rotate={4}
        index="07"
        topic="Mechanics"
        formula={<><span className="italic">T</span> = 2π√(<span className="italic">L/g</span>)</>}
      />
      <FormulaChip
        className="hidden xl:flex right-[6%] bottom-[10%]"
        rotate={6}
        index="12"
        topic="Waves"
        formula={<><span className="italic">v</span> = <span className="italic">f</span>λ</>}
      />

      <Container className="relative pt-6 sm:pt-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "演習プリント", href: "/prints" },
          ]}
        />
      </Container>

      <Container className="relative pb-14 pt-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* LEFT — glassmorphism panel */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-[1.75rem] border border-white/55 p-7 sm:p-10 shadow-card"
              style={{
                background:
                  "linear-gradient(140deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.28) 100%)",
                backdropFilter: "blur(24px) saturate(140%)",
                WebkitBackdropFilter: "blur(24px) saturate(140%)",
              }}
            >
              {/* inner highlight ring（ガラスのエッジ感） */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/60"
              />

              <p className="relative flex flex-wrap items-center gap-x-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.3em] text-warm-deep before:inline-block before:h-px before:w-5 before:bg-current before:opacity-50">
                MATERIALS — 演習プリント アーカイブ
              </p>

              {/* H1 — 「読む。解く。理解する。」の3動詞構成。
                  参考画像 "Study. Understand. Master." の縦リズムを和訳。
                  各行は単独で短く、viewport が狭くても "、" 単独行が生まれない。 */}
              <h1
                className="relative mt-5 sm:mt-7 font-serif text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem] leading-[1.05] tracking-[-0.022em] text-ink-900"
                style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
              >
                <span className="block">読む。</span>
                <span className="block">解く。</span>
                <span className="block text-warm-deep">理解する。</span>
              </h1>

              <div className="relative mt-6 sm:mt-8 flex items-center gap-3" aria-hidden>
                <span className="h-px w-10 sm:w-12 bg-ink-900/20" />
                <span className="h-1.5 w-1.5 rounded-full bg-warm" />
                <span className="h-px w-24 sm:w-32 bg-gradient-to-r from-warm/55 via-brand/30 to-transparent" />
              </div>

              <p
                className="relative mt-5 sm:mt-6 text-[14.5px] sm:text-[15.5px] leading-[1.9] text-ink-700"
                style={{ lineBreak: "strict", wordBreak: "normal", overflowWrap: "anywhere" }}
              >
                高校物理の典型問題を Web でそのまま読める、演習プリントのアーカイブです。印刷向け PDF も配布可。
              </p>
              <p
                className="relative mt-3 text-[13.5px] sm:text-[14.5px] leading-[1.9] text-ink-600"
                style={{ lineBreak: "strict", wordBreak: "normal", overflowWrap: "anywhere" }}
              >
                森祐太の物理専門塾が授業で使う REM 製プリントを、単元別に順次公開しています。
              </p>

              <ul className="relative mt-6 sm:mt-7 flex flex-wrap gap-2 sm:gap-2.5">
                <Chip icon={BookOpen} tone="warm">Web で読める</Chip>
                <Chip icon={Download} tone="brand">PDF も配布可</Chip>
                <Chip icon={Sparkles} tone="forest">問題＋解答解説</Chip>
              </ul>

              <div className="relative mt-7 sm:mt-8 flex items-end justify-between gap-3">
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

function Chip({
  icon: Icon,
  tone,
  children,
}: {
  icon: LucideIcon;
  tone: "warm" | "brand" | "forest";
  children: React.ReactNode;
}) {
  const tones = {
    warm: "text-warm-deep",
    brand: "text-brand-deep",
    forest: "text-forest-deep",
  };
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-white/65 bg-white/65 px-3 py-1.5 text-[12px] sm:text-[12.5px] text-ink-800 backdrop-blur-sm">
      <Icon className={cn("h-3 w-3", tones[tone])} aria-hidden strokeWidth={1.8} />
      {children}
    </li>
  );
}

function FormulaChip({
  className,
  rotate,
  index,
  topic,
  formula,
}: {
  className?: string;
  rotate: number;
  index: string;
  topic: string;
  formula: React.ReactNode;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-40 flex-col gap-1 rounded-xl border border-white/65 bg-white/75 px-3 py-2 shadow-soft backdrop-blur-md",
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="flex items-center gap-2">
        <span className="font-mono text-[9.5px] tracking-[0.18em] text-ink-500">{index}</span>
        <span className="text-[9.5px] tracking-[0.18em] uppercase text-warm-deep">{topic}</span>
      </div>
      <p className="font-serif text-[13px] leading-none text-ink-800">{formula}</p>
    </div>
  );
}

function DecorativeSphere({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full bg-gradient-to-br from-white/95 via-white/70 to-white/30",
        className,
      )}
      style={{
        boxShadow:
          "0 4px 16px rgba(10,21,40,0.06), inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -3px 6px rgba(155,188,255,0.18)",
      }}
    />
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
