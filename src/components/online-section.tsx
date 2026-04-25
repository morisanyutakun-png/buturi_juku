import {
  CalendarClock,
  Globe2,
  History,
  MessageSquareText,
  MonitorPlay,
  Waves,
} from "lucide-react";
import { Section } from "@/components/section";

const items = [
  {
    icon: MonitorPlay,
    title: "ライブ授業 + 手書きボード",
    body: "画面共有とリアルタイムの手書き板書で、対面と遜色ない双方向授業を実現します。",
    tone: "brand",
  },
  {
    icon: History,
    title: "録画で何度でも復習",
    body: "授業はすべて録画データでお渡し。わからなかった瞬間を、当日のうちに見直せます。",
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
    icon: MessageSquareText,
    title: "質問チャット常設",
    body: "授業外でも疑問をその場で投げられる専用チャットを用意。学習のテンポが止まりません。",
    tone: "warm",
  },
  {
    icon: Waves,
    title: "移動ゼロ・集中MAX",
    body: "通塾の往復時間がそのまま学習時間に変わります。睡眠時間を削らず、演習量を増やせます。",
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
      title={<>高校物理専門塾 × オンライン、<br className="sm:hidden" />だからできること。</>}
      description="高校物理専門塾「物理の森」のオンライン授業は、対面の代替ではありません。移動時間を学習時間に変え、録画で復習し、チャットで質問する。高校物理の学習は、オンラインの高校物理専門塾のほうが加速します。"
      className="bg-paper"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="group relative overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-white/85 p-8 shadow-soft backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-ink-900/[0.12] hover:shadow-card"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${toneMap[item.tone]}`}
            >
              <item.icon className="h-[18px] w-[18px]" aria-hidden strokeWidth={1.6} />
            </div>
            <h3 className="mt-7 font-serif text-[1.15rem] leading-snug tracking-[-0.008em] text-ink-900">
              {item.title}
            </h3>
            <p className="mt-3 text-[13.5px] leading-[1.75] text-ink-600">
              {item.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-14 overflow-hidden rounded-3xl border border-ink-900/[0.07] bg-white/85 shadow-soft backdrop-blur-sm">
        <div className="grid divide-y divide-ink-900/[0.06] md:grid-cols-4 md:divide-x md:divide-y-0">
          {[
            { k: "通塾時間の削減", v: "週 3〜6h", sub: "その分を演習に転用" },
            { k: "対応時間帯", v: "10:00–22:00", sub: "前後要相談" },
            { k: "録画の視聴期限", v: "無期限", sub: "在籍中いつでも" },
            { k: "質問チャット", v: "24h 投稿可", sub: "24–48h 内に回答" },
          ].map((x) => (
            <div key={x.k} className="p-7 text-center">
              <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-ink-500">
                {x.k}
              </p>
              <p className="mt-3.5 font-serif text-[1.55rem] tracking-[-0.012em] text-brand-deep">
                {x.v}
              </p>
              <p className="mt-2 text-[12px] text-ink-600">{x.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
