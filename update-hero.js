const fs = require('fs');
let code = fs.readFileSync('src/components/hero.tsx', 'utf-8');

code = code.replace(
  'import { RemPrintCard } from "@/components/rem-print-card";',
  'import { HeroBooksVisual } from "@/components/hero-books-visual";'
);

const oldVisualSection = `          {/* REM print mockup — モバイル/PC を 1 つの DOM に統合。
              旧構成: モバイル用と PC 用を別々にマウントしていたため、SVG/HTML を含む
              RemPrintCard が SSR HTML 内に 2 回シリアライズされ、RSC ペイロードを
              ~15KB 余計に増やしていた。1 マウントに統合し、ラッパー側のクラスで
              モバイル横位置 / PC 縦右配置を切り替える。 */}
          <div className="relative mx-auto mt-8 w-full max-w-[360px] sm:mt-10 sm:max-w-[420px] lg:mx-0 lg:mt-0 lg:max-w-[460px]">
            {/* halo — モバイル弱め / PC 強め */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 lg:-inset-10"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,200,148,0.35), transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 hidden lg:block"
              style={{
                background:
                  "radial-gradient(closest-side at 30% 80%, rgba(155,188,255,0.4), transparent 70%)",
              }}
            />

            <RemPrintCard />

            {/* floating chips — PC のみ表示（モバイルでは混み合うので非表示） */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-4 top-[42%] hidden lg:inline-flex items-center gap-2 rounded-2xl border border-ink-900/[0.10] bg-white/95 px-3.5 py-2 text-[11px] text-ink-800 shadow-soft"
              style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
            >
              <span className="text-[9.5px] tracking-[0.22em] text-warm-deep">
                類題
              </span>
              <span className="h-3 w-px bg-ink-900/20" />
              <span className="text-[9.5px] tracking-[0.22em] text-warm-deep">
                解答
              </span>
              <span className="h-3 w-px bg-ink-900/20" />
              <span className="text-[9.5px] tracking-[0.22em] text-warm-deep">
                解説
              </span>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-2 -bottom-3 hidden lg:inline-flex items-center gap-2 rounded-full border border-warm/40 bg-warm-bg/95 px-3.5 py-2 text-[11px] tracking-[0.22em] text-warm-deep shadow-soft"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-warm/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warm" />
              </span>
              FREE / PDF & WEB
            </div>
          </div>`;

const newVisualSection = `          {/* FV Books Visual — シリーズ全6冊があることを一枚絵で伝える */}
          <HeroBooksVisual className="mt-12 sm:mt-14 lg:mt-0 max-w-[300px] sm:max-w-[340px] lg:max-w-[420px]" />`;

code = code.replace(oldVisualSection, newVisualSection);

fs.writeFileSync('src/components/hero.tsx', code);
