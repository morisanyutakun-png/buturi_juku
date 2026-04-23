import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href: string };

type Props = {
  items: Crumb[];
};

export function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="パンくずリスト" className="text-xs text-ink-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink-800">
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-brand transition">
                  {c.label}
                </Link>
              )}
              {!last && (
                <ChevronRight
                  className="h-3 w-3 text-ink-400"
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
