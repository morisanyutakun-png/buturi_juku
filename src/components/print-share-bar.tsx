import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

type Props = {
  /** 共有対象ページのサイト相対パス。例: `/prints/foo` */
  path: string;
  title: string;
};

/**
 * SNS シェア用の純粋リンク列。Server Component で完結させるため、
 * クリップボードコピーなどの JS API は使わず、Web Share Intent（X / LINE / はてブ）に
 * 頼る。リンクは新規タブで開く。
 */
export function PrintShareBar({ path, title }: Props) {
  const url = absoluteUrl(path, siteConfig.url);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const intentText = encodeURIComponent(`${title} ｜ ${siteConfig.name}`);

  const links: { label: string; href: string; bg: string }[] = [
    {
      label: "X で共有",
      href: `https://twitter.com/intent/tweet?text=${intentText}&url=${encodedUrl}`,
      bg: "bg-ink-900 text-paper hover:bg-ink-800",
    },
    {
      label: "LINE で共有",
      href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      bg: "bg-[#06C755] text-white hover:opacity-90",
    },
    {
      label: "はてブで保存",
      href: `https://b.hatena.ne.jp/entry?url=${encodedUrl}&title=${encodedTitle}`,
      bg: "bg-[#00A4DE] text-white hover:opacity-90",
    },
    {
      label: "Facebook で共有",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bg: "bg-[#1877F2] text-white hover:opacity-90",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-ink-900/[0.08] bg-white/85 px-5 py-4 sm:px-6 sm:py-5 shadow-soft backdrop-blur-sm">
        <p className="text-[10px] tracking-[0.28em] uppercase text-ink-500">
          SHARE — このプリントを共有する
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition ${l.bg}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
