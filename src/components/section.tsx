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
      className={cn("relative py-16 sm:py-32", className)}
      {...props}
    >
      <Container>
        {(eyebrow || title || description) && (
          <div
            className={cn(
              "mb-10 sm:mb-20 max-w-3xl",
              align === "center" && "mx-auto text-center",
            )}
          >
            {eyebrow && (
              <p
                className={cn(
                  "mb-4 sm:mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10.5px] sm:text-[10px] font-medium uppercase tracking-[0.22em] sm:tracking-[0.32em] text-brand-deep",
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
