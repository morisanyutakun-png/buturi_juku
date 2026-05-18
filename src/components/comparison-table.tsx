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
    criterion: "高校物理の専門性",
    specialty: { mark: "good", note: "高校物理を主軸に扱う専門講師が指導" },
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
    specialty: { mark: "good", note: "次回授業の冒頭で立式手順までさかのぼって添削" },
    general: { mark: "mid", note: "質問時間が限定的" },
    solo: { mark: "bad", note: "解決できず放置されやすい" },
  },
  {
    criterion: "解けなかった問題の扱い",
    specialty: { mark: "good", note: "AI（REM）と一緒に類題・解答・解説を作成し、講師確認のうえ復習プリント化" },
    general: { mark: "mid", note: "各自で復習教材を探す必要" },
    solo: { mark: "bad", note: "そのまま放置になりがち" },
  },
  {
    criterion: "単元ごとの考察の深さ",
    specialty: { mark: "good", note: "電磁気が特に強く、全分野を自作の書籍ベースで深堀り" },
    general: { mark: "mid", note: "単元ごとの点取り重視で深さは限定的" },
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
  const base =
    "inline-flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border";
  const icon = "h-3.5 w-3.5 sm:h-4 sm:w-4";
  if (type === "good")
    return (
      <span className={`${base} border-forest/30 bg-forest-bg text-forest-deep`}>
        <Check className={icon} aria-hidden />
      </span>
    );
  if (type === "bad")
    return (
      <span className={`${base} border-ink-900/10 bg-paper-soft text-ink-400`}>
        <X className={icon} aria-hidden />
      </span>
    );
  return (
    <span className={`${base} border-ink-900/10 bg-paper-soft text-ink-500`}>
      <Minus className={icon} aria-hidden />
    </span>
  );
}

export function ComparisonTable() {
  return (
    <Section
      eyebrow="COMPARISON"
      title="Solvora Learning Lab と、他の選択肢との違い"
      description="教材棚（無料プリント＋参考書 6 冊）を主軸に、必要な人だけ個別サポートを使う Solvora 流の学び方を、総合塾・独学・映像授業と並べて比較します。"
      className="bg-paper-soft"
    >
      <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-soft">
        <div className="hidden grid-cols-[1.6fr_1fr_1fr_1fr] divide-x divide-ink-900/10 border-b border-ink-900/10 bg-paper-soft text-xs tracking-[0.2em] uppercase text-ink-500 md:grid">
          <div className="p-5">比較項目</div>
          <div className="p-5 text-center text-brand-deep">Solvora Learning Lab</div>
          <div className="p-5 text-center">総合塾</div>
          <div className="p-5 text-center">独学</div>
        </div>

        {/* mobile: stacked — specialty card on top, alternatives in a 2-up row */}
        <div className="divide-y divide-ink-900/10 md:hidden">
          {rows.map((r) => (
            <div key={r.criterion} className="p-4">
              <p className="text-[10.5px] tracking-[0.14em] uppercase text-ink-500 font-medium">
                {r.criterion}
              </p>
              <div className="mt-3 rounded-xl border border-brand/30 bg-brand-bg p-3">
                <div className="flex items-center gap-2.5">
                  <Mark type={r.specialty.mark} />
                  <p className="text-[10px] tracking-[0.14em] uppercase text-brand-deep font-medium">
                    Solvora
                  </p>
                </div>
                <p className="mt-2 text-[12px] leading-[1.7] text-ink-800">
                  {r.specialty.note}
                </p>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <MobileCellLite label="総合塾" cell={r.general} />
                <MobileCellLite label="独学" cell={r.solo} />
              </div>
            </div>
          ))}
        </div>

        {/* desktop: grid */}
        <div className="hidden divide-y divide-ink-900/10 md:block">
          {rows.map((r) => (
            <div
              key={r.criterion}
              className="grid grid-cols-[1.6fr_1fr_1fr_1fr] items-start divide-x divide-ink-900/10"
            >
              <div className="p-6">
                <p className="font-serif text-ink-900">{r.criterion}</p>
              </div>
              <Cell cell={r.specialty} highlight />
              <Cell cell={r.general} />
              <Cell cell={r.solo} />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-ink-500">
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
    <div className={`p-6 text-center ${highlight ? "bg-brand-bg" : ""}`}>
      <div className="flex justify-center">
        <Mark type={cell.mark} />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-700">{cell.note}</p>
    </div>
  );
}

function MobileCellLite({
  label,
  cell,
}: {
  label: string;
  cell: { mark: Cell; note: string };
}) {
  return (
    <div className="rounded-xl border border-ink-900/10 bg-paper-soft px-2.5 py-2.5">
      <div className="flex items-center gap-1.5">
        <Mark type={cell.mark} />
        <p className="text-[9.5px] tracking-[0.12em] uppercase text-ink-500 leading-tight">
          {label}
        </p>
      </div>
      <p className="mt-1.5 text-[11px] leading-[1.55] text-ink-700">
        {cell.note}
      </p>
    </div>
  );
}
