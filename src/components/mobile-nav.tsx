"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/data/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/15 bg-white text-ink-800 hover:border-brand hover:text-brand transition"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-paper/90 backdrop-blur-md transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
      />

      <nav
        aria-label="モバイルメニュー"
        className={cn(
          "fixed inset-x-0 top-[68px] z-50 origin-top bg-paper/95 backdrop-blur-md border-t border-ink-900/10 transition-transform duration-300 ease-out max-h-[calc(100vh-68px)] overflow-y-auto",
          open ? "translate-y-0" : "-translate-y-4 pointer-events-none opacity-0",
        )}
      >
        <div className="container py-6 pb-10">
          <ul className="flex flex-col divide-y divide-ink-900/10">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[56px] items-center justify-between py-4 font-serif text-[1.15rem] text-ink-900 hover:text-brand transition"
                >
                  {item.label}
                  <span aria-hidden className="text-ink-400 text-lg">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link
              href="/trial"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-ink-900/15 bg-white px-4 py-3 text-center text-[15px] text-ink-800 hover:border-brand hover:text-brand"
            >
              体験授業
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-warm px-4 py-3 text-center text-[15px] font-medium text-white hover:bg-warm-deep"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
