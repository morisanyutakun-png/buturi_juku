import type { ArticleSection } from "@/data/articles";

type Props = {
  sections: ArticleSection[];
};

export function ArticleToc({ sections }: Props) {
  return (
    <aside
      aria-label="目次"
      className="rounded-2xl border border-ink-900/10 bg-white p-6 text-sm shadow-soft"
    >
      <p className="text-[10px] tracking-[0.28em] uppercase text-brand-deep">
        Table of contents
      </p>
      <ol className="mt-4 space-y-2 text-ink-700">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="flex gap-3 py-1 leading-relaxed hover:text-brand transition"
            >
              <span className="shrink-0 font-mono text-ink-400">
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
