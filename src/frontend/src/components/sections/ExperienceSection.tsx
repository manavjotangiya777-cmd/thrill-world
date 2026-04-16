import { PlayCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: 45, suffix: "+", label: "Rides & Attractions" },
  { value: 3, suffix: "M+", label: "Annual Visitors" },
  { value: 25, suffix: "+", label: "Years of Thrills" },
  { value: 150, suffix: "+", label: "Acres of Fun" },
];

const ANIMATION_DURATION = 1800;
const INTERVAL_MS = 20;
const STEPS = ANIMATION_DURATION / INTERVAL_MS;

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentValues, setCurrentValues] = useState<number[]>(
    STATS.map(() => 0),
  );
  const [clipExpanded, setClipExpanded] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setClipExpanded(true);

            let step = 0;
            const interval = setInterval(() => {
              step++;
              const progress = Math.min(step / STEPS, 1);
              const eased = 1 - (1 - progress) ** 3;
              setCurrentValues(STATS.map((s) => Math.round(s.value * eased)));

              if (step >= STEPS) {
                clearInterval(interval);
                setCurrentValues(STATS.map((s) => s.value));
              }
            }, INTERVAL_MS);

            return () => clearInterval(interval);
          }
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "#FAFAF5" }}
    >
      {/* Decorative radial blob */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
          clipPath: clipExpanded
            ? "circle(60% at 50% 50%)"
            : "circle(30% at 50% 50%)",
          transition: "clip-path 1.5s ease",
          zIndex: 0,
        }}
      />

      {/* Violet blob opposite corner */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(91,33,182,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center gap-16">
        {/* Section header */}
        <div className="text-center">
          <p
            className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "var(--font-mono)", color: "#F97316" }}
          >
            THE NUMBERS
          </p>
          <h2
            className="text-5xl md:text-7xl leading-none tracking-wide"
            style={{ fontFamily: "var(--font-display)", color: "#1C1C2E" }}
          >
            FEEL THE SCALE
          </h2>
          <div
            className="mt-3 mx-auto h-[3px] w-20 rounded-full"
            style={{ background: "linear-gradient(90deg, #5B21B6, #F97316)" }}
          />
        </div>

        {/* Animated stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 w-full text-center">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              data-ocid={`experience.stat.item.${i + 1}`}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-full py-6 rounded-2xl flex flex-col items-center"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(91,33,182,0.1)",
                  boxShadow: "0 4px 20px rgba(91,33,182,0.08)",
                }}
              >
                <span
                  className="leading-none tabular-nums"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.5rem, 7vw, 5rem)",
                    color: "#F97316",
                    textShadow: "0 0 20px rgba(249,115,22,0.3)",
                  }}
                >
                  {currentValues[i]}
                  {stat.suffix}
                </span>
                <span
                  className="text-xs tracking-wide uppercase mt-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "#6B7280",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <button
          type="button"
          data-ocid="experience.watch_experience_button"
          onClick={() => alert("Full experience video coming soon!")}
          className="flex items-center gap-3 px-10 py-4 text-base tracking-[0.2em] uppercase transition-all duration-300 active:scale-95 rounded-xl"
          style={{
            fontFamily: "var(--font-display)",
            border: "2px solid #5B21B6",
            color: "#5B21B6",
            background: "transparent",
            letterSpacing: "0.2em",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(91,33,182,0.08)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 30px rgba(91,33,182,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          <PlayCircle className="w-5 h-5 shrink-0" />
          WATCH THE FULL EXPERIENCE
        </button>
      </div>
    </section>
  );
}
