import { Check, Minus, X } from "lucide-react";
import { Section } from "@/components/section";

type Cell = "good" | "bad" | "mid";

const rows: {
  criterion: string;
  specialty: { mark: Cell; note: string };
  general: { mark: Cell; note: string };
  solo: { mark: Cell; note: string };
}[] = [
  {
    criterion: "物理の専門性",
    specialty: { mark: "good", note: "物理だけを扱う講師が指導" },
    general: { mark: "mid", note: "科目ごとに担当が分かれる" },
    solo: { mark: "bad", note: "専門家の介入なし" },
  },
  {
    criterion: "あなた専用のカリキュラム",
    specialty: { mark: "good", note: "志望校・現状から逆算設計" },
    general: { mark: "mid", note: "学年・クラス単位で標準化" },
    solo: { mark: "bad", note: "独自の試行錯誤が必要" },
  },
  {
    criterion: "わからない瞬間への対応",
    specialty: { mark: "good", note: "授業内+チャットで即解消" },
    general: { mark: "mid", note: "質問時間が限定的" },
    solo: { mark: "bad", note: "解決できず放置されやすい" },
  },
  {
    criterion: "物理5分野の体系性",
    specialty: { mark: "good", note: "分野横断の構造から指導" },
    general: { mark: "mid", note: "単元ごとの点取り重視" },
    solo: { mark: "mid", note: "教材の良し悪しに依存" },
  },
  {
    criterion: "時間・場所の自由度",
    specialty: { mark: "good", note: "完全オンライン・時間柔軟" },
    general: { mark: "bad", note: "通塾が必須" },
    solo: { mark: "good", note: "完全に自由" },
  },
];

function Mark({ type }: { type: Cell }) {
  if (type === "good")
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
        <Check className="h-4 w-4" aria-hidden />
      </span>
    );
  if (type === "bad")
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-paper/10 bg-paper/5 text-paper/40">
        <X className="h-4 w-4" aria-hidden />
      </span>
    );
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-paper/10 bg-paper/5 text-paper/50">
      <Minus className="h-4 w-4" aria-hidden />
    </span>
  );
}

export function ComparisonTable() {
  return (
    <Section
      eyebrow="COMPARISON"
      title="物理専門塾と、他の選択肢との違い"
      description="総合塾・独学・映像授業とは何が違うのか。比較表でご確認ください。"
    >
      <div className="overflow-hidden rounded-2xl border border-paper/10 bg-ink-900/60">
        <div className="hidden grid-cols-[1.6fr_1fr_1fr_1fr] divide-x divide-paper/10 border-b border-paper/10 bg-ink-900 text-xs tracking-[0.2em] uppercase text-paper/50 md:grid">
          <div className="p-5">比較項目</div>
          <div className="p-5 text-center text-accent">物理専門塾</div>
          <div className="p-5 text-center">総合塾</div>
          <div className="p-5 text-center">独学</div>
        </div>

        {/* mobile: stacked */}
        <div className="divide-y divide-paper/10 md:hidden">
          {rows.map((r) => (
            <div key={r.criterion} className="p-5">
              <p className="text-xs tracking-[0.22em] uppercase text-paper/50">
                {r.criterion}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-[11px]">
                <MobileCell label="物理専門塾" cell={r.specialty} highlight />
                <MobileCell label="総合塾" cell={r.general} />
                <MobileCell label="独学" cell={r.solo} />
              </div>
            </div>
          ))}
        </div>

        {/* desktop: grid */}
        <div className="hidden divide-y divide-paper/10 md:block">
          {rows.map((r) => (
            <div
              key={r.criterion}
              className="grid grid-cols-[1.6fr_1fr_1fr_1fr] items-start divide-x divide-paper/10"
            >
              <div className="p-6">
                <p className="font-serif text-paper">{r.criterion}</p>
              </div>
              <Cell cell={r.specialty} highlight />
              <Cell cell={r.general} />
              <Cell cell={r.solo} />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-paper/40">
        ※ 比較は一般論であり、すべての塾・環境に当てはまるものではありません。
      </p>
    </Section>
  );
}

function Cell({
  cell,
  highlight,
}: {
  cell: { mark: Cell; note: string };
  highlight?: boolean;
}) {
  return (
    <div className={`p-6 text-center ${highlight ? "bg-accent/5" : ""}`}>
      <div className="flex justify-center">
        <Mark type={cell.mark} />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-paper/70">{cell.note}</p>
    </div>
  );
}

function MobileCell({
  label,
  cell,
  highlight,
}: {
  label: string;
  cell: { mark: Cell; note: string };
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border border-paper/10 p-3 text-center ${
        highlight ? "border-accent/30 bg-accent/5" : "bg-ink-950/30"
      }`}
    >
      <p className="text-[9px] tracking-[0.2em] uppercase text-paper/40">
        {label}
      </p>
      <div className="mt-2 flex justify-center">
        <Mark type={cell.mark} />
      </div>
      <p className="mt-2 text-[10px] leading-snug text-paper/60">{cell.note}</p>
    </div>
  );
}
