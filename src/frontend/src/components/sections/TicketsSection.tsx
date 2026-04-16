import { CheckCircle2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  badge: string | null;
  description: string;
  features: string[];
  ctaText: string;
  accentColor: string;
}

const plans: Plan[] = [
  {
    id: "day",
    name: "Day Pass",
    price: 49,
    period: "per person",
    badge: null,
    description: "Perfect for a full day of fun",
    features: [
      "All 45+ rides included",
      "Park entry all day",
      "Free parking",
      "Kids under 3 free",
    ],
    ctaText: "Get Day Pass",
    accentColor: "#5B21B6",
  },
  {
    id: "weekend",
    name: "Weekend Bundle",
    price: 89,
    period: "per person",
    badge: "MOST POPULAR",
    description: "Two full days of non-stop adventure",
    features: [
      "All 45+ rides included",
      "2-day access (Sat+Sun)",
      "Free parking both days",
      "Priority queue access",
      "10% off food & drinks",
      "Free locker for 1 day",
    ],
    ctaText: "Book Weekend",
    accentColor: "#F97316",
  },
  {
    id: "annual",
    name: "Annual Pass",
    price: 199,
    period: "per year",
    badge: "BEST VALUE",
    description: "Unlimited thrills for the whole year",
    features: [
      "Unlimited park visits",
      "All 45+ rides every visit",
      "Free parking always",
      "Priority queue always",
      "20% off food & drinks",
      "Free locker always",
      "Exclusive member events",
      "Bring a friend free (4x/yr)",
    ],
    ctaText: "Get Annual Pass",
    accentColor: "#FFD600",
  },
];

interface TiltState {
  rotateX: number;
  rotateY: number;
}

function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ rotateX: -dy * 8, rotateY: dx * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  const isPopular = plan.id === "weekend";
  const isBestValue = plan.id === "annual";
  const glowColor = plan.accentColor;

  const badgeTextColor = isBestValue ? "#1C1C2E" : "#1C1C2E";

  return (
    <div
      ref={cardRef}
      data-ocid={`tickets.card.${index + 1}`}
      className="relative flex-1 min-w-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(${isPopular ? "-8px" : "0"})`
          : "perspective(1000px) translateY(40px)",
        transition: isHovered
          ? "transform 0.1s ease, opacity 0.6s ease"
          : `transform 0.5s ease, opacity 0.6s ease ${index * 0.15}s`,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow:
            isHovered || isPopular
              ? `0 0 40px ${glowColor}35, 0 0 80px ${glowColor}18`
              : "0 4px 20px rgba(0,0,0,0.06)",
          transition: "box-shadow 0.4s ease",
          borderRadius: "1rem",
        }}
      />

      <div
        className="relative h-full rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "#FFFFFF",
          border: `1.5px solid ${glowColor}${isPopular ? "80" : "35"}`,
        }}
      >
        {/* Badge */}
        {plan.badge && (
          <div className="absolute -top-px left-1/2 -translate-x-1/2 z-10">
            <span
              className="inline-block px-4 py-1 rounded-b-lg text-xs font-bold tracking-widest"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                background: glowColor,
                color: badgeTextColor,
              }}
            >
              {plan.badge}
            </span>
          </div>
        )}

        <div className="p-8 flex flex-col flex-1 gap-6">
          {/* Header */}
          <div className="pt-4">
            <h3
              className="text-2xl font-semibold mb-1"
              style={{ fontFamily: "Sora, sans-serif", color: glowColor }}
            >
              {plan.name}
            </h3>
            <p
              className="text-sm"
              style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
            >
              {plan.description}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-end gap-2">
            <span
              className="text-7xl leading-none"
              style={{ fontFamily: "Bebas Neue, sans-serif", color: "#1C1C2E" }}
            >
              {`$${plan.price}`}
            </span>
            <span
              className="text-sm pb-2"
              style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
            >
              {plan.period}
            </span>
          </div>

          {/* Divider */}
          <div
            className="h-px w-full"
            style={{ background: `${glowColor}25` }}
          />

          {/* Features */}
          <ul className="flex flex-col gap-3 flex-1">
            {plan.features.map((feat) => (
              <li key={feat} className="flex items-start gap-3">
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0"
                  style={{ color: glowColor }}
                />
                <span
                  className="text-sm leading-snug"
                  style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}
                >
                  {feat}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            type="button"
            data-ocid={`tickets.cta_button.${index + 1}`}
            className="w-full py-3.5 rounded-xl font-semibold tracking-wide transition-all duration-200 text-sm"
            style={
              isPopular
                ? {
                    fontFamily: "Sora, sans-serif",
                    background: glowColor,
                    color: "#1C1C2E",
                    boxShadow: `0 0 20px ${glowColor}50`,
                  }
                : {
                    fontFamily: "Sora, sans-serif",
                    background: "transparent",
                    color: glowColor,
                    border: `1.5px solid ${glowColor}`,
                  }
            }
            onMouseEnter={(e) => {
              if (!isPopular) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  `${glowColor}18`;
              } else {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  `0 0 30px ${glowColor}80`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isPopular) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
              } else {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  `0 0 20px ${glowColor}50`;
              }
            }}
          >
            {plan.ctaText}
          </button>

          {/* Countdown for Weekend Bundle */}
          {plan.id === "weekend" && <WeekendCountdown />}
        </div>
      </div>
    </div>
  );
}

function WeekendCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const end = Date.now() + 23 * 60 * 60 * 1000;
    return Math.max(0, Math.floor((end - Date.now()) / 1000));
  });

  useEffect(() => {
    const endTime = Date.now() + 23 * 60 * 60 * 1000;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const h = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const m = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const s = String(timeLeft % 60).padStart(2, "0");

  return (
    <div
      data-ocid="tickets.countdown"
      className="text-center text-xs py-2 px-3 rounded-lg"
      style={{
        fontFamily: "JetBrains Mono, monospace",
        background: "rgba(249,115,22,0.08)",
        border: "1px solid rgba(249,115,22,0.25)",
        color: "#F97316",
      }}
    >
      <span className="opacity-80">Limited time offer ends in: </span>
      <span className="font-bold tracking-widest">
        {h}:{m}:{s}
      </span>
    </div>
  );
}

function StickyBar({
  sectionRef,
}: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <div
      data-ocid="tickets.sticky_bar"
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
      style={{
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(91,33,182,0.15)",
        boxShadow: "0 -4px 24px rgba(91,33,182,0.1)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div>
        <span
          className="text-base font-semibold"
          style={{ fontFamily: "Sora, sans-serif", color: "#F97316" }}
        >
          Weekend Bundle
        </span>
        <span
          className="ml-2 text-sm"
          style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
        >
          — $89/person
        </span>
      </div>
      <button
        type="button"
        data-ocid="tickets.sticky_book_button"
        className="px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200"
        style={{
          fontFamily: "Sora, sans-serif",
          background: "linear-gradient(135deg, #5B21B6, #7C3AED)",
          color: "#ffffff",
          boxShadow: "0 0 20px rgba(91,33,182,0.35)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 0 30px rgba(91,33,182,0.6)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 0 20px rgba(91,33,182,0.35)";
        }}
        onClick={() => {
          document
            .getElementById("pricing")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        BOOK NOW
      </button>
    </div>
  );
}

export default function TicketsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="pricing"
        ref={sectionRef}
        className="relative py-24 overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #F3F0FF 0%, #FAFAF5 100%)",
        }}
      >
        {/* Background dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(91,33,182,0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.8,
          }}
        />

        {/* Ambient glows */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(91,33,182,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div
            ref={headerRef}
            className="text-center mb-16"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <span
              className="inline-block text-xs tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                color: "#F97316",
                background: "rgba(249,115,22,0.08)",
                border: "1px solid rgba(249,115,22,0.25)",
              }}
            >
              TICKETS &amp; PRICING
            </span>
            <h2
              className="text-5xl md:text-7xl font-normal leading-none mb-4"
              style={{ fontFamily: "Bebas Neue, sans-serif", color: "#1C1C2E" }}
            >
              CHOOSE YOUR{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #5B21B6, #F97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ADVENTURE
              </span>
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "#6B7280", fontFamily: "Inter, sans-serif" }}
            >
              Every pass includes unlimited rides all day long
            </p>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center">
            {plans.map((plan, i) => (
              <PricingCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>

          <p
            className="text-center text-xs mt-10"
            style={{ color: "#9ca3af", fontFamily: "Inter, sans-serif" }}
          >
            Prices shown in USD. All passes are non-transferable. Valid ID
            required at entry.
          </p>
        </div>
      </section>

      <StickyBar sectionRef={sectionRef} />
    </>
  );
}
