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
      className={cn("relative py-20 sm:py-28", className)}
      {...props}
    >
      <Container>
        {(eyebrow || title || description) && (
          <div
            className={cn(
              "mb-12 sm:mb-16 max-w-3xl",
              align === "center" && "mx-auto text-center",
            )}
          >
            {eyebrow && (
              <p className="mb-4 text-xs tracking-[0.28em] uppercase text-brand-deep">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-serif text-display-md text-ink-900">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-ink-700 leading-relaxed">
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
