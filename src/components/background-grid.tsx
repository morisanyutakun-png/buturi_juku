import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "hero" | "subtle";
};

export function BackgroundGrid({ className, variant = "subtle" }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-paper/40"
            />
          </pattern>
          <radialGradient id="grid-fade" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid-pattern)"
          mask="url(#grid-mask)"
        />
      </svg>
      {variant === "hero" && (
        <>
          <div className="absolute left-1/2 top-[-30%] h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(110,168,255,0.18),transparent_60%)]" />
          <div className="absolute bottom-[-20%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(27,45,91,0.35),transparent_60%)]" />
        </>
      )}
    </div>
  );
}
