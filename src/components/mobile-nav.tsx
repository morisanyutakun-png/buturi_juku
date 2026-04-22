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
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper/10 text-paper hover:border-accent/60 hover:text-accent transition"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-md transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
      />

      <nav
        aria-label="モバイルメニュー"
        className={cn(
          "fixed inset-x-0 top-[72px] z-50 origin-top bg-ink-950/95 backdrop-blur-md border-t border-paper/10 transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "-translate-y-4 pointer-events-none opacity-0",
        )}
      >
        <div className="container py-8">
          <ul className="flex flex-col divide-y divide-paper/10">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-serif text-lg text-paper hover:text-accent transition"
                >
                  {item.label}
                  <span aria-hidden className="text-paper/40">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <Link
              href="/trial"
              onClick={() => setOpen(false)}
              className="rounded-full border border-paper/20 px-4 py-3 text-center text-sm text-paper hover:border-accent"
            >
              体験授業
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-accent px-4 py-3 text-center text-sm font-medium text-ink-950 hover:bg-accent-soft"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
