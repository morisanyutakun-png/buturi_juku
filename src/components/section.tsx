import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/container";

type SectionProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  bleed?: boolean;
};

export function Section({
  eyebrow,
  title,
  description,
  align = "left",
  bleed = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative py-20 sm:py-32", className)}
      {...props}
    >
      <Container>
        {(eyebrow || title || description) && (
          <div
            className={cn(
              "mb-12 sm:mb-20 max-w-3xl",
              align === "center" && "mx-auto text-center",
            )}
          >
            {eyebrow && (
              <p
                className={cn(
                  "mb-5 inline-flex items-center gap-2.5 text-[11px] sm:text-[10px] font-medium uppercase tracking-[0.28em] sm:tracking-[0.32em] text-brand-deep",
                  align === "left" && "before:inline-block before:h-px before:w-5 before:bg-current before:opacity-50",
                )}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-serif text-display-md text-ink-900 tracking-[-0.012em]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-[16px] sm:text-[15px] leading-[2] sm:leading-[1.8] text-ink-700 sm:text-ink-600">
                {description}
              </p>
            )}
          </div>
        )}
        {bleed ? children : <div>{children}</div>}
      </Container>
    </section>
  );
}
