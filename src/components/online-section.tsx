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
    title: "Zoom + 手書きボード",
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
  brand: "border-brand/30 bg-brand-bg text-brand-deep",
  warm: "border-warm/30 bg-warm-bg text-warm-deep",
  forest: "border-forest/30 bg-forest-bg text-forest-deep",
};

export function OnlineSection() {
  return (
    <Section
      eyebrow="ONLINE ADVANTAGE"
      title={<>通塾ではなく、<br className="sm:hidden" />オンラインだからできること。</>}
      description="『オンラインは対面の代替』ではありません。移動時間を学習時間に変え、録画で復習し、チャットで質問する。物理の学習は、オンラインのほうが加速します。"
      className="bg-paper"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="group relative overflow-hidden rounded-2xl border border-ink-900/10 bg-white p-7 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${toneMap[item.tone]}`}>
              <item.icon className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="mt-6 font-serif text-lg text-ink-900">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              {item.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-soft">
        <div className="grid divide-ink-900/10 md:grid-cols-4 md:divide-x">
          {[
            { k: "通塾時間の削減", v: "週 3〜6h", sub: "その分を演習に転用" },
            { k: "対応時間帯", v: "10:00–22:00", sub: "前後要相談" },
            { k: "録画の視聴期限", v: "無期限", sub: "在籍中いつでも" },
            { k: "質問チャット", v: "24h 投稿可", sub: "24–48h 内に回答" },
          ].map((x) => (
            <div key={x.k} className="p-6 text-center">
              <p className="text-[10px] tracking-[0.28em] uppercase text-ink-500">
                {x.k}
              </p>
              <p className="mt-3 font-serif text-2xl text-brand-deep">{x.v}</p>
              <p className="mt-2 text-xs text-ink-600">{x.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
