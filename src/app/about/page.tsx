import type { Metadata } from "next";
import { Section } from "@/components/section";
import { CtaBlock } from "@/components/cta-block";
import { Breadcrumb } from "@/components/breadcrumb";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { PhilosophySection } from "@/components/philosophy-section";
import { ForEveryoneSection } from "@/components/for-everyone-section";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "高校物理専門塾「物理の森」とは — 塾について",
  description:
    "高校物理専門塾「物理の森」の理念・指導思想・総合塾との違いをまとめたページです。なぜ高校物理専門塾なのか、物理を『わかる』まで追いかける高校物理専門塾の姿勢を解説します。",
  path: "/about",
  keywords: [
    "高校物理専門塾",
    "高校物理専門塾 とは",
    "高校物理専門塾 オンライン",
    "高校物理 個別指導",
    "高校物理 総合塾 違い",
    "高校物理 苦手 克服",
  ],
  category: "education",
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
        title={<>高校物理を『わかる』まで、<br className="sm:hidden" />追いかける高校物理専門塾。</>}
        description="高校物理は、わかったふりで止まると最も損をする科目です。高校物理専門塾「物理の森」は『わかったふり』を許さず、あなたの手が勝手に動くところまで伴走します。"
        className="bg-paper"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-ink-900/10 bg-white p-7 sm:p-8 shadow-soft">
            <p className="text-[12px] sm:text-xs tracking-[0.24em] sm:tracking-[0.28em] uppercase text-brand-deep font-medium">
              OUR MISSION
            </p>
            <h3 className="mt-4 font-serif text-[1.55rem] sm:text-2xl leading-[1.45] text-ink-900">
              物理を、暗記ではなく理解へ。
            </h3>
            <p className="mt-5 sm:mt-6 text-[15.5px] sm:text-base leading-[2] sm:leading-relaxed text-ink-700">
              公式に当てはめる学習は、問題の前提が少しずれた瞬間に崩れます。私たちは物理を『現象を数式に翻訳する営み』として捉え直し、原理からの立式ができる状態を作ることを使命としています。
            </p>
          </div>
          <div className="rounded-2xl border border-warm/30 bg-gradient-to-br from-warm-bg via-white to-paper-soft p-7 sm:p-8 shadow-soft">
            <p className="text-[12px] sm:text-xs tracking-[0.24em] sm:tracking-[0.28em] uppercase text-warm-deep font-medium">
              OUR PROMISE
            </p>
            <h3 className="mt-4 font-serif text-[1.55rem] sm:text-2xl leading-[1.45] text-ink-900">
              物理だけを、深く、丁寧に。
            </h3>
            <p className="mt-5 sm:mt-6 text-[15.5px] sm:text-base leading-[2] sm:leading-relaxed text-ink-700">
              私たちは物理しか扱いません。だからこそ、あらゆる分野のあらゆる問題を『なぜそう立式するのか』のレベルまで解きほぐすことができます。
            </p>
          </div>
        </div>
      </Section>

      <ForEveryoneSection />

      <PhilosophySection />

      <Section
        eyebrow="WHY PHYSICS-ONLY"
        title="なぜ高校物理専門塾なのか"
        description="総合塾ではなく高校物理専門塾であることに、はっきりとした意味があります。高校物理専門塾だからこそ提供できる価値を3点でお伝えします。"
        className="bg-paper-soft"
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
              className="rounded-2xl border border-ink-900/10 bg-white p-7 sm:p-8 shadow-soft"
            >
              <h3 className="font-serif text-[1.3rem] sm:text-xl leading-[1.55] sm:leading-normal text-ink-900">{x.title}</h3>
              <p className="mt-4 text-[15px] sm:text-sm leading-[2] sm:leading-relaxed text-ink-700">
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
        className="bg-paper"
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
              className="rounded-2xl border border-ink-900/10 bg-white p-7 sm:p-8 shadow-soft"
            >
              <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-start">
                <p className="font-mono text-[12.5px] sm:text-xs text-warm-deep md:pt-1 tracking-wider">
                  STEP {x.step}
                </p>
                <div>
                  <h3 className="font-serif text-[1.3rem] sm:text-xl leading-[1.5] sm:leading-normal text-ink-900">{x.title}</h3>
                  <p className="mt-3 text-[15px] sm:text-sm leading-[2] sm:leading-relaxed text-ink-700">
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
      <JsonLd
        id="ld-webpage-about"
        data={webPageJsonLd({
          name: "高校物理専門塾「物理の森」とは — 塾について",
          description:
            "高校物理専門塾「物理の森」の理念、高校物理専門塾としての指導方針、総合塾との違いをまとめたページです。",
          path: "/about",
        })}
      />
    </>
  );
}
