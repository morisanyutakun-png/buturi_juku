"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  HelpCircle,
  Mail,
  Sparkles,
  UserSquare,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { mainNav, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * MobileNavDrawer — モバイルメニューの中身。
 *
 * パフォーマンス目的で `mobile-nav.tsx` 本体から分離。トリガーボタンは
 * 初期バンドルに入れたまま、この中身（mainNav・アイコンマップ等）は
 * `next/dynamic` で初回クリック時に遅延ロードする。
 *
 * これにより、ホーム初回読み込み時に下記が削減される:
 *   - 多数の lucide アイコンの import 解析
 *   - mainNav / siteConfig / cn の参照と評価
 *   - portal / createPortal のクライアント側初期化
 */

const navMeta: Record<
  string,
  { icon: LucideIcon; tone: "brand" | "warm" | "forest" | "gold"; sub: string }
> = {
  "/about": { icon: Sparkles, tone: "brand", sub: "コンセプト・指導方針" },
  "/teacher": { icon: UserSquare, tone: "warm", sub: "森祐太のプロフィール" },
  "/courses": {
    icon: GraduationCap,
    tone: "forest",
    sub: "電磁気集中 / 分野別 / テスト対策",
  },
  "/articles": { icon: BookOpen, tone: "brand", sub: "物理学習コラム" },
  "/faq": { icon: HelpCircle, tone: "gold", sub: "よくある質問" },
  "/contact": { icon: Mail, tone: "warm", sub: "お問い合わせ・相談" },
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

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileNavDrawer({ open, onClose }: Props) {
  const pathname = usePathname();

  // Lock body scroll while the drawer is open so the menu IS the screen.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Close on Escape — common a11y expectation for sheets.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const drawer = (
    <div
      id="mobile-nav-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="モバイルメニュー"
      className={cn(
        "fixed inset-0 z-[100] flex flex-col bg-paper md:hidden",
        "transition-[opacity,transform] duration-200 ease-out",
        open
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0",
      )}
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="relative flex h-16 shrink-0 items-center justify-between border-b border-ink-900/[0.06] px-[1.15rem]">
        <span className="flex flex-col leading-none">
          <span className="text-[8.5px] font-medium tracking-[0.3em] uppercase text-brand">
            {siteConfig.nameEn}
          </span>
          <span className="mt-1.5 font-serif text-[1.05rem] tracking-[-0.005em] text-ink-900">
            {siteConfig.name}
          </span>
        </span>
        <button
          type="button"
          aria-label="メニューを閉じる"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/15 bg-white text-ink-800 transition active:scale-[0.95] hover:border-brand hover:text-brand"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto w-full max-w-md px-[1.15rem] py-6">
          <p className="px-1 text-[10.5px] font-medium tracking-[0.24em] uppercase text-brand-deep">
            MENU
          </p>

          <ul className="mt-4 grid gap-2.5">
            {mainNav.map((item) => {
              const meta = navMeta[item.href] ?? {
                icon: ArrowRight,
                tone: "brand" as const,
                sub: "",
              };
              const Icon = meta.icon;
              const t = toneClass[meta.tone];
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative flex min-h-[68px] items-center gap-4 rounded-2xl border bg-white px-4 py-3.5 shadow-soft transition active:scale-[0.99]",
                      isActive
                        ? "border-ink-900/25 ring-1 ring-ink-900/10"
                        : "border-ink-900/10 hover:border-ink-900/20",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1",
                        t.ring,
                        t.bg,
                        t.text,
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden strokeWidth={1.6} />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="font-serif text-[1.05rem] leading-tight tracking-[-0.005em] text-ink-900">
                        {item.label}
                      </span>
                      {meta.sub && (
                        <span className="mt-1 truncate text-[12px] tracking-[0.04em] text-ink-500">
                          {meta.sub}
                        </span>
                      )}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-7 px-1 text-[10.5px] font-medium tracking-[0.24em] uppercase text-brand-deep">
            ACTION
          </p>
          <div className="mt-3 grid gap-2.5">
            <Link
              href="/contact?topic=trial#contact-form"
              onClick={onClose}
              className="group inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium text-white shadow-warm transition active:scale-[0.99]"
              style={{
                background:
                  "linear-gradient(120deg, #b35f27 0%, #e28040 60%, #f3a86c 100%)",
              }}
            >
              体験授業を申し込む
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/prints"
              onClick={onClose}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-warm/35 bg-warm-bg/70 px-5 text-[14px] text-warm-deep transition hover:bg-warm-bg"
            >
              <FileText className="h-3.5 w-3.5 opacity-70" aria-hidden />
              演習プリントを試し読み
              <ArrowRight className="h-3.5 w-3.5 opacity-60" />
            </Link>
            <Link
              href="/online"
              onClick={onClose}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-ink-900/15 bg-white px-5 text-[14px] text-ink-800 transition hover:border-brand hover:text-brand"
            >
              オンライン受講について
              <ArrowRight className="h-3.5 w-3.5 opacity-50" />
            </Link>
          </div>

          <p className="mt-8 text-center text-[11px] tracking-[0.18em] text-ink-500">
            {siteConfig.contact.hours}
          </p>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(drawer, document.body);
}
