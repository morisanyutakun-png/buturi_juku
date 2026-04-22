import type { Metadata } from "next";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { PhilosophySection } from "@/components/philosophy-section";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "塾について",
  description:
    "森祐太 物理専門塾の理念、学習思想、なぜ物理専門塾なのか、総合塾との違いについて。物理を『わかる』まで追いかける塾の姿勢を解説します。",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Container className="pt-10">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "塾について", href: "/about" },
          ]}
        />
      </Container>

      <Section
        eyebrow="ABOUT US"
        title={<>物理を『わかる』まで、<br className="sm:hidden" />追いかける塾。</>}
        description="高校物理は、わかったふりで止まると最も損をする科目です。私たちは『わかったふり』を許さず、あなたの手が勝手に動くところまで伴走します。"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-paper/10 bg-ink-900/60 p-8">
            <p className="text-xs tracking-[0.28em] uppercase text-accent">
              OUR MISSION
            </p>
            <h3 className="mt-4 font-serif text-2xl text-paper">
              物理を、暗記ではなく理解へ。
            </h3>
            <p className="mt-6 text-paper/70 leading-relaxed">
              公式に当てはめる学習は、問題の前提が少しずれた瞬間に崩れます。私たちは物理を『現象を数式に翻訳する営み』として捉え直し、原理からの立式ができる状態を作ることを使命としています。
            </p>
          </div>
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 via-ink-900/80 to-ink-900 p-8">
            <p className="text-xs tracking-[0.28em] uppercase text-gold">
              OUR PROMISE
            </p>
            <h3 className="mt-4 font-serif text-2xl text-paper">
              物理だけを、深く、丁寧に。
            </h3>
            <p className="mt-6 text-paper/70 leading-relaxed">
              私たちは物理しか扱いません。だからこそ、あらゆる分野のあらゆる問題を『なぜそう立式するのか』のレベルまで解きほぐすことができます。
            </p>
          </div>
        </div>
      </Section>

      <PhilosophySection />

      <Section
        eyebrow="WHY PHYSICS-ONLY"
        title="なぜ物理専門塾なのか"
        description="総合塾ではなく物理専門塾であることに、はっきりとした意味があります。"
        className="bg-ink-900/40"
      >
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "分野横断の視点を持てる",
              body: "力学で培った運動量の考え方が、電磁気や波動の理解を支えます。物理専門だからこそ、分野をまたいだ『同じ構造』を授業で示せます。",
            },
            {
              title: "教材・テストの取捨選択ができる",
              body: "物理に限った膨大な教材と出題傾向の中から、あなたに本当に必要なものだけを提示できます。勉強時間を浪費しません。",
            },
            {
              title: "講師の専門性が深い",
              body: "物理以外を教えないからこそ、毎年の入試動向を追い続けられます。物理の最新出題にキャッチアップし続ける体制があります。",
            },
          ].map((x) => (
            <div
              key={x.title}
              className="rounded-2xl border border-paper/10 bg-ink-900/60 p-8"
            >
              <h3 className="font-serif text-xl text-paper">{x.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-paper/70">
                {x.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="TEACHING ORDER"
        title="授業の進行順序"
        description="私たちの授業には、明確な順序があります。"
      >
        <ol className="space-y-4">
          {[
            {
              step: "01",
              title: "現象を日本語で語らせる",
              body: "式を書くのは、その後です。現象を自分の言葉で説明できない段階では、まだ式を書かせません。",
            },
            {
              step: "02",
              title: "立式の順序を体に入れる",
              body: "『物体を選ぶ → 座標を取る → 力を列挙する → 立式する』。手順として再現できるようになるまで反復します。",
            },
            {
              step: "03",
              title: "つまずきの瞬間を潰す",
              body: "『なんとなくわかった』を許しません。毎回、つまずいた瞬間の思考を言葉にしてもらいます。",
            },
            {
              step: "04",
              title: "演習で型を定着させる",
              body: "理解ができた分野から、演習で型を固定します。ここで初めて、いわゆる受験物理の速度が出てきます。",
            },
          ].map((x) => (
            <li
              key={x.step}
              className="rounded-2xl border border-paper/10 bg-ink-900/60 p-8"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <p className="font-mono text-xs text-accent md:pt-1">
                  STEP {x.step}
                </p>
                <div>
                  <h3 className="font-serif text-xl text-paper">{x.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/70">
                    {x.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBlock
        title="あなたの物理を、60分で診断します。"
        description="体験授業では、現状のヒアリングから学習戦略の提案までを行います。入塾前提ではありません。"
      />

      <JsonLd
        id="ld-breadcrumb-about"
        data={breadcrumbJsonLd([
          { name: "ホーム", href: "/" },
          { name: "塾について", href: "/about" },
        ])}
      />
    </>
  );
}
