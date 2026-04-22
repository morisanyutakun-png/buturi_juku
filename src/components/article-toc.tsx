import type { ArticleSection } from "@/data/articles";

type Props = {
  sections: ArticleSection[];
};

export function ArticleToc({ sections }: Props) {
  return (
    <aside
      aria-label="目次"
      className="rounded-2xl border border-paper/10 bg-ink-900/60 p-6 text-sm"
    >
      <p className="text-[10px] tracking-[0.28em] uppercase text-accent">
        Table of contents
      </p>
      <ol className="mt-4 space-y-2 text-paper/70">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="flex gap-3 py-1 leading-relaxed hover:text-accent transition"
            >
              <span className="shrink-0 font-mono text-paper/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{s.heading}</span>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
