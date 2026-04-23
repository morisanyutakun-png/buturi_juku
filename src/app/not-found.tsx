import Link from "next/link";
import { Container } from "@/components/container";
import { BackgroundGrid } from "@/components/background-grid";

export default function NotFound() {
  return (
    <div className="relative isolate overflow-hidden">
      <BackgroundGrid variant="hero" />
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-brand-deep">
          404 — not found
        </p>
        <h1 className="mt-6 font-serif text-display-lg text-ink-900">
          そのページは、<br className="sm:hidden" />宇宙のどこかに消えたようです。
        </h1>
        <p className="mt-6 max-w-lg text-ink-700">
          URLが変更されたか、一時的にアクセスできない可能性があります。
          下のリンクから、主要なページへお戻りください。
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-warm px-6 py-3 text-sm font-medium text-white hover:bg-warm-deep transition"
          >
            トップへ戻る
          </Link>
          <Link
            href="/articles"
            className="rounded-full border border-ink-900/15 px-6 py-3 text-sm text-ink-900 hover:border-brand hover:text-brand transition"
          >
            物理学習コラムを読む
          </Link>
        </div>
      </Container>
    </div>
  );
}
