import {
  BookMarked,
  CalendarClock,
  ClipboardList,
  FileText,
  Globe2,
  MonitorPlay,
} from "lucide-react";
import { Section } from "@/components/section";

const items = [
  {
    icon: MonitorPlay,
    title: "画面共有 × ライブ解説",
    body: "問題用紙と図を画面共有し、力の取り方・座標の置き方・立式の順序を一緒になぞりながら進めます。",
    tone: "brand",
  },
  {
    icon: BookMarked,
    title: "オリジナル教材で本質から理解",
    body: "授業の軸は、講師（森祐太）自身が執筆した『考える力を育てる』シリーズ。公式の暗記ではなく、現象と原理から立式できる状態を目指して組み立てます。",
    tone: "warm",
  },
  {
    icon: Globe2,
    title: "全国・海外から受講可能",
    body: "地方在住・海外在住の受験生も、都市部の生徒と同じ指導をそのまま受けられます。",
    tone: "forest",
  },
  {
    icon: CalendarClock,
    title: "柔軟な時間割",
    body: "部活・定期試験・遠征など、生活のリズムに合わせて授業時間を柔軟に調整できます。",
    tone: "brand",
  },
  {
    icon: ClipboardList,
    title: "毎回の宿題と次回フィードバック",
    body: "授業の最後に、次回までに解く問題を指定。次の授業で立式の手順までさかのぼって添削します。",
    tone: "warm",
  },
  {
    icon: FileText,
    title: "AI復習プリント (REMが補助)",
    body: "授業で解けなかった問題に近い類題と解答・解説を AI（REM）が下書きし、講師が確認したうえで復習PDFとしてお渡しします。",
    tone: "forest",
  },
] as const;

const toneMap = {
  brand: "ring-brand/20 bg-brand-bg text-brand-deep",
  warm: "ring-warm/20 bg-warm-bg text-warm-deep",
  forest: "ring-forest/20 bg-forest-bg text-forest-deep",
};

export function OnlineSection() {
  return (
    <Section
      eyebrow="ONLINE ADVANTAGE"
      title={<>Solvora × オンライン、<br className="sm:hidden" />だからできること。</>}
      description="移動時間を学習時間に変え、解けなかった問題は AI 復習プリントに整える。高校物理・理系個別指導は、オンラインのほうが加速します。"
      className="bg-paper"
    >
      <div className="grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-ink-900/[0.07] bg-white/85 p-5 sm:p-8 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.12] hover:shadow-card"
          >
            <div
              className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl ring-1 ${toneMap[item.tone]}`}
            >
              <item.icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" aria-hidden strokeWidth={1.6} />
            </div>
            <h3 className="mt-4 sm:mt-7 font-serif text-[1.05rem] sm:text-[1.15rem] leading-[1.45] sm:leading-snug tracking-[-0.008em] text-ink-900">
              {item.title}
            </h3>
            <p className="mt-2.5 sm:mt-3 text-[13px] sm:text-[13.5px] leading-[1.75] sm:leading-[1.75] text-ink-600">
              {item.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 sm:mt-14 overflow-hidden rounded-2xl sm:rounded-3xl border border-ink-900/[0.07] bg-white/85 shadow-soft backdrop-blur-sm">
        <div className="grid grid-cols-2 divide-y divide-ink-900/[0.06] md:grid-cols-4 md:divide-x md:divide-y-0">
          {[
            { k: "通塾時間の削減", v: "週 3〜6h", sub: "演習に転用" },
            { k: "対応時間帯", v: "10:00–22:00", sub: "前後要相談" },
            { k: "授業教材", v: "森祐太の自作", sub: "『考える力を育てる』" },
            { k: "授業形式", v: "完全1対1", sub: "振替可" },
          ].map((x) => (
            <div key={x.k} className="p-4 sm:p-7 text-center">
              <p className="text-[10px] sm:text-[10px] font-medium tracking-[0.18em] sm:tracking-[0.28em] uppercase text-ink-500">
                {x.k}
              </p>
              <p className="mt-2.5 sm:mt-3.5 font-serif text-[1.1rem] sm:text-[1.55rem] tracking-[-0.012em] text-brand-deep">
                {x.v}
              </p>
              <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-[12px] leading-tight sm:leading-relaxed text-ink-600">{x.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
