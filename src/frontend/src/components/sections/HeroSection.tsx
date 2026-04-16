import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Particle system ────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

const PARTICLE_COLORS = [
  "rgba(255,255,255,0.7)",
  "rgba(255,255,255,0.5)",
  "rgba(255,255,255,0.55)",
  "rgba(255,255,255,0.4)",
];

function initParticles(w: number, h: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.4,
      color:
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    });
  }
  return particles;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;

      // Subtle connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[2]" />;
}

// ─── Ferris Wheel SVG ────────────────────────────────────────────────────────
function FerrisWheel() {
  const cx = 200;
  const cy = 200;
  const outerR = 150;
  const spokeCount = 8;

  const spokes: { id: string; x2: number; y2: number }[] = [];
  for (let i = 0; i < spokeCount; i++) {
    const angle = (i * Math.PI * 2) / spokeCount;
    const x2 = cx + outerR * Math.cos(angle);
    const y2 = cy + outerR * Math.sin(angle);
    spokes.push({ id: `spoke-${i}`, x2, y2 });
  }

  const gondolas = spokes.map(({ id, x2, y2 }) => ({
    id: `gondola-${id}`,
    cx: x2,
    cy: y2,
  }));

  return (
    <svg
      viewBox="0 0 400 480"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-[-5%] top-[10%] w-[400px] h-[400px] hidden md:block z-10"
      style={{ animation: "spin 20s linear infinite", opacity: 0.55 }}
      role="img"
      aria-label="Decorative ferris wheel"
    >
      {/* A-frame support */}
      <line
        x1={cx}
        y1={cy + outerR}
        x2={cx - 80}
        y2={400}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="4"
      />
      <line
        x1={cx}
        y1={cy + outerR}
        x2={cx + 80}
        y2={400}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="4"
      />
      <line
        x1={cx - 60}
        y1={400}
        x2={cx + 60}
        y2={400}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="3"
      />

      {/* Outer ring */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR}
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="3"
      />
      {/* Inner decorative ring */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR * 0.65}
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
        strokeDasharray="8 6"
      />

      {/* Spokes */}
      {spokes.map(({ id, x2, y2 }) => (
        <line
          key={id}
          x1={cx}
          y1={cy}
          x2={x2}
          y2={y2}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
        />
      ))}

      {/* Gondolas */}
      {gondolas.map(({ id, cx: gx, cy: gy }) => (
        <g key={id}>
          <circle
            cx={gx}
            cy={gy}
            r={12}
            fill="rgba(249,115,22,0.2)"
            stroke="#F97316"
            strokeWidth="1.5"
          />
          <circle cx={gx} cy={gy} r={4} fill="rgba(249,115,22,0.6)" />
        </g>
      ))}

      {/* Center hub */}
      <circle
        cx={cx}
        cy={cy}
        r={14}
        fill="rgba(255,255,255,0.15)"
        stroke="#F97316"
        strokeWidth="2.5"
      />
      <circle cx={cx} cy={cy} r={6} fill="#F97316" />
    </svg>
  );
}

// ─── Typewriter hook ─────────────────────────────────────────────────────────
const TYPEWRITER_STRINGS = [
  "100+ Acres of Pure Adrenaline",
  "45+ Rides That Defy Gravity",
  "Open 7 Days • Rain or Shine",
  "3 Million Visitors Can't Be Wrong",
];

function useTypewriter() {
  const [displayedText, setDisplayedText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TYPEWRITER_STRINGS[stringIndex];

    if (!isDeleting && charIndex < current.length) {
      const id = setTimeout(() => setCharIndex((c) => c + 1), 55);
      return () => clearTimeout(id);
    }

    if (!isDeleting && charIndex === current.length) {
      const id = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(id);
    }

    if (isDeleting && charIndex > 0) {
      const id = setTimeout(() => setCharIndex((c) => c - 1), 30);
      return () => clearTimeout(id);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setStringIndex((s) => (s + 1) % TYPEWRITER_STRINGS.length);
    }
  }, [charIndex, isDeleting, stringIndex]);

  useEffect(() => {
    setDisplayedText(TYPEWRITER_STRINGS[stringIndex].slice(0, charIndex));
  }, [charIndex, stringIndex]);

  return displayedText;
}

// ─── Hero Section ────────────────────────────────────────────────────────────
export default function HeroSection() {
  const typewriterText = useTypewriter();
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // 3D parallax scroll effect on the video layer
  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      const rotateX = progress * 8; // 0–8 degrees
      const translateY = scrollY * 0.4; // move slower than content

      container.style.transform = `perspective(900px) rotateX(${rotateX}deg) translateY(-${translateY}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToAttractions = () => {
    document
      .getElementById("attractions")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollDown = () => {
    document
      .getElementById("attractions")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden h-screen flex items-center justify-center"
    >
      {/* ── Layer 0: 3D Parallax video container ── */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 z-0"
        style={{
          willChange: "transform",
          transformStyle: "preserve-3d",
          transformOrigin: "50% 0%",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "scale(1.15)" }}
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-aerial-view-of-roller-coaster-4734/1080p.mp4"
            type="video/mp4"
          />
          {/* CSS animated gradient fallback */}
        </video>

        {/* Animated gradient fallback (shows while video loads or fails) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #5B21B6 0%, #7C3AED 25%, #F97316 55%, #FFD600 80%, #0EA5E9 100%)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 8s ease infinite",
            zIndex: -1,
          }}
        />
      </div>

      {/* CSS keyframes for gradient fallback */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* ── Layer 1: Dark overlay for text readability ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,5,25,0.55) 0%, rgba(20,8,45,0.62) 60%, rgba(10,5,25,0.75) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Layer 1b: Warm violet radial glow ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(91,33,182,0.22) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Layer 2: Particle canvas (above overlay) ── */}
      <ParticleCanvas />

      {/* ── Layer 2b: Ferris wheel ── */}
      <FerrisWheel />

      {/* ── Layer 3: Hero content ── */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        {/* Label */}
        <p
          className="font-mono text-xs tracking-[0.35em] uppercase mb-6 animate-fade-in"
          style={{
            color: "#F97316",
            textShadow: "0 0 12px rgba(249,115,22,0.6)",
            animationDelay: "0.1s",
          }}
          data-ocid="hero.label"
        >
          WELCOME TO THE FUTURE OF FUN
        </p>

        {/* Main headline */}
        <h1
          className="font-display leading-none mb-4 animate-fade-up"
          style={{ animationDelay: "0.25s" }}
          data-ocid="hero.headline"
        >
          <span
            className="block text-7xl md:text-9xl text-white"
            style={{
              letterSpacing: "0.04em",
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            }}
          >
            WHERE EVERY RIDE
          </span>
          <span className="block mt-1" style={{ letterSpacing: "0.04em" }}>
            <span
              className="text-7xl md:text-9xl"
              style={{
                background: "linear-gradient(90deg, #F97316 0%, #FFD600 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 20px rgba(249,115,22,0.6))",
              }}
            >
              REWRITES{" "}
            </span>
            <span
              className="text-7xl md:text-9xl"
              style={{
                color: "#ffffff",
                textShadow:
                  "0 0 30px rgba(255,255,255,0.3), 0 2px 20px rgba(0,0,0,0.4)",
              }}
            >
              REALITY
            </span>
          </span>
        </h1>

        {/* Typewriter subheadline */}
        <div
          className="h-8 flex items-center mb-8 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
          data-ocid="hero.typewriter"
        >
          <p
            className="font-mono text-base md:text-lg"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            {typewriterText}
            <span
              className="inline-block w-[2px] h-[1.1em] ml-[2px] align-middle"
              style={{
                background: "#F97316",
                animation: "blink-caret 1s step-end infinite",
              }}
            />
          </p>
        </div>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 animate-fade-up"
          style={{ animationDelay: "0.65s" }}
          data-ocid="hero.cta_group"
        >
          <button
            type="button"
            onClick={scrollToPricing}
            className="font-display text-xl rounded-lg px-8 py-4 transition-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background: "linear-gradient(135deg, #F97316, #FFD600)",
              color: "#1C1C2E",
              boxShadow: "0 0 24px rgba(249,115,22,0.55)",
              letterSpacing: "0.08em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 40px rgba(249,115,22,0.8)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 24px rgba(249,115,22,0.55)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
            }}
            data-ocid="hero.book_tickets_button"
          >
            BOOK TICKETS
          </button>

          <button
            type="button"
            onClick={scrollToAttractions}
            className="font-display text-xl rounded-lg px-8 py-4 transition-smooth border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              borderColor: "rgba(255,255,255,0.7)",
              color: "#ffffff",
              background: "rgba(255,255,255,0.08)",
              letterSpacing: "0.08em",
              backdropFilter: "blur(4px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.18)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.7)";
            }}
            data-ocid="hero.explore_park_button"
          >
            EXPLORE PARK
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20"
        data-ocid="hero.scroll_hint"
      >
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          SCROLL
        </span>
        <button
          type="button"
          onClick={scrollDown}
          aria-label="Scroll down"
          className="transition-smooth hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
          style={{ color: "rgba(255,255,255,0.5)" }}
          data-ocid="hero.scroll_down_button"
        >
          <ChevronDown size={24} className="animate-bounce" />
        </button>
      </div>

      {/* Bottom gradient fade — matches page bg */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #FAFAF5, transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
