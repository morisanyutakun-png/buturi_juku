import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Orbital physics illustration — electron orbits + nucleus + faint waveform.
 * Pure SVG, no image assets required.
 */
export function PhysicsOrbital({ className }: Props) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      <defs>
        <radialGradient id="nucleus" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f2d99a" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#e8c57a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#b88a3e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="orbit-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6ea8ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6ea8ff" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <g transform="translate(200 200)">
        <ellipse
          cx="0"
          cy="0"
          rx="180"
          ry="70"
          fill="none"
          stroke="url(#orbit-stroke)"
          strokeWidth="0.8"
          transform="rotate(15)"
        />
        <ellipse
          cx="0"
          cy="0"
          rx="160"
          ry="60"
          fill="none"
          stroke="url(#orbit-stroke)"
          strokeWidth="0.8"
          transform="rotate(-30)"
        />
        <ellipse
          cx="0"
          cy="0"
          rx="140"
          ry="80"
          fill="none"
          stroke="url(#orbit-stroke)"
          strokeWidth="0.8"
          transform="rotate(75)"
        />

        <circle cx="0" cy="0" r="36" fill="url(#nucleus)" />
        <circle cx="0" cy="0" r="5" fill="#f2d99a" />

        <circle cx="180" cy="0" r="4" fill="#6ea8ff" transform="rotate(15)">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="22s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="160" cy="0" r="3" fill="#a4c3ff" transform="rotate(-30)">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360"
            to="0"
            dur="16s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="140" cy="0" r="3.5" fill="#e8c57a" transform="rotate(75)">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="28s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}

export function PhysicsWave({ className }: Props) {
  return (
    <svg
      viewBox="0 0 1200 120"
      className={cn("h-full w-full", className)}
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="wave-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6ea8ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#6ea8ff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#6ea8ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,60 C150,20 250,100 400,60 C550,20 650,100 800,60 C950,20 1050,100 1200,60"
        fill="none"
        stroke="url(#wave-stroke)"
        strokeWidth="1.2"
      />
      <path
        d="M0,70 C150,40 250,110 400,70 C550,40 650,110 800,70 C950,40 1050,110 1200,70"
        fill="none"
        stroke="url(#wave-stroke)"
        strokeWidth="0.8"
        opacity="0.5"
      />
    </svg>
  );
}

export function PhysicsFormula({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none select-none font-serif text-paper/[0.04] leading-none",
        className,
      )}
    >
      <p>F = ma</p>
      <p>E = mc²</p>
      <p>∮ E · dA = Q/ε₀</p>
      <p>∇ × B = μ₀J</p>
      <p>λf = v</p>
    </div>
  );
}
