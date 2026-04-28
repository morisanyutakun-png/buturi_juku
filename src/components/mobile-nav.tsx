"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  HelpCircle,
  Mail,
  Menu,
  Sparkles,
  UserSquare,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { mainNav } from "@/data/site";
import { cn } from "@/lib/utils";

// Map nav hrefs to icons + accent tones so each item reads as a real button.
const navMeta: Record<
  string,
  { icon: LucideIcon; tone: "brand" | "warm" | "forest" | "gold" }
> = {
  "/about": { icon: Sparkles, tone: "brand" },
  "/teacher": { icon: UserSquare, tone: "warm" },
  "/courses": { icon: GraduationCap, tone: "forest" },
  "/articles": { icon: BookOpen, tone: "brand" },
  "/faq": { icon: HelpCircle, tone: "gold" },
  "/contact": { icon: Mail, tone: "warm" },
};

const toneClass: Record<
  "brand" | "warm" | "forest" | "gold",
  { ring: string; bg: string; text: string }
> = {
  brand: { ring: "ring-brand/25", bg: "bg-brand-bg", text: "text-brand-deep" },
  warm: { ring: "ring-warm/25", bg: "bg-warm-bg", text: "text-warm-deep" },
  forest: {
    ring: "ring-forest/25",
    bg: "bg-forest-bg",
    text: "text-forest-deep",
  },
  gold: { ring: "ring-gold/30", bg: "bg-gold-soft/60", text: "text-gold-deep" },
};

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Close menu when route changes (defensive — Link clicks already call setOpen).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/15 bg-white text-ink-800 transition hover:border-brand hover:text-brand"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink-950/30 backdrop-blur-md transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
      />

      <nav
        aria-label="モバイルメニュー"
        className={cn(
          "fixed inset-x-0 top-[64px] z-50 origin-top border-t border-ink-900/10 bg-paper/98 backdrop-blur-md",
          "max-h-[calc(100dvh-64px)] overflow-y-auto",
          "transition-all duration-300 ease-out",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        )}
      >
        <div className="container mx-auto py-5 pb-8">
          <p className="px-1 text-[10.5px] font-medium tracking-[0.24em] uppercase text-brand-deep">
            MENU
          </p>

          {/* Each nav item is a tappable card — icon + label + chevron.
              `grid-cols-2` keeps the list compact and visually balanced. */}
          <ul className="mt-4 grid grid-cols-2 gap-2.5">
            {mainNav.map((item) => {
              const meta = navMeta[item.href] ?? {
                icon: ArrowRight,
                tone: "brand" as const,
              };
              const Icon = meta.icon;
              const t = toneClass[meta.tone];
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative flex h-full min-h-[92px] flex-col justify-between rounded-2xl border bg-white px-4 py-3.5 shadow-soft transition active:scale-[0.98]",
                      isActive
                        ? "border-ink-900/25 ring-1 ring-ink-900/10"
                        : "border-ink-900/10 hover:border-ink-900/20",
                    )}
                  >
                    <div
                      className={cn(
                        "inline-flex h-9 w-9 items-center justify-center rounded-xl ring-1",
                        t.ring,
                        t.bg,
                        t.text,
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden strokeWidth={1.7} />
                    </div>
                    <div className="mt-2.5 flex items-end justify-between gap-2">
                      <span className="font-serif text-[15px] leading-[1.3] tracking-[-0.005em] text-ink-900">
                        {item.label}
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Primary CTAs — full-width, clearly the priority actions. */}
          <div className="mt-5 grid grid-cols-1 gap-2.5">
            <Link
              href="/trial"
              onClick={() => setOpen(false)}
              className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium text-white shadow-warm transition active:scale-[0.99]"
              style={{
                background:
                  "linear-gradient(120deg, #b35f27 0%, #e28040 60%, #f3a86c 100%)",
              }}
            >
              無料体験授業を申し込む
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/online"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-ink-900/15 bg-white px-5 text-[14px] text-ink-800 transition hover:border-brand hover:text-brand"
            >
              オンライン受講について
              <ArrowRight className="h-3.5 w-3.5 opacity-50" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
