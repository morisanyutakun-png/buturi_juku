"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";

/**
 * MobileNav — モバイルナビゲーションのトグルボタン。
 *
 * パフォーマンス設計:
 *   - 初期バンドルにはトグルボタンと state だけを残す
 *   - ドロワー本体（mainNav リスト、各 lucide アイコン、portal 処理）は
 *     `next/dynamic` で **クリック後に初めてロード**
 *   - これによりホーム初回ロード時のクライアント JS パース時間と
 *     Total Blocking Time を削減
 *
 * Drawer の `ssr: false` は SSR で空のままにしておき、クライアントで
 * インタラクションが発生してから初めて hydrate するための設定。
 */
const MobileNavDrawer = dynamic(() => import("./mobile-nav-drawer"), {
  ssr: false,
});

export function MobileNav() {
  const [open, setOpen] = useState(false);
  /** 一度でも開いたら以降は drawer モジュールを保持する。閉じても再ロードしない。 */
  const [everOpened, setEverOpened] = useState(false);
  const pathname = usePathname();

  // Close menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleToggle = () => {
    setOpen((v) => {
      if (!v) setEverOpened(true);
      return !v;
    });
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        onClick={handleToggle}
        className="inline-flex h-11 items-center gap-1.5 rounded-full border border-ink-900/15 bg-white px-3.5 text-ink-800 transition active:scale-[0.97] hover:border-brand hover:text-brand"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span className="text-[12.5px] font-medium tracking-[0.18em]">
          {open ? "CLOSE" : "MENU"}
        </span>
      </button>

      {everOpened && (
        <MobileNavDrawer open={open} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
