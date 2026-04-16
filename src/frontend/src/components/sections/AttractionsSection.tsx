import { ChevronLeft, ChevronRight, Clock, Ruler, Star } from "lucide-react";
import { useRef, useState } from "react";

type Category = "All" | "Thrill" | "Family" | "Kids" | "Water";

interface Ride {
  id: number;
  name: string;
  category: Exclude<Category, "All">;
  thrillLevel: number;
  height: string;
  duration: string;
  description: string;
  gradient: string;
}

const rides: Ride[] = [
  {
    id: 1,
    name: "Thunder Bolt X",
    category: "Thrill",
    thrillLevel: 5,
    height: '48"',
    duration: "2 min",
    description: "The fastest coaster in the park — 0 to 80mph in 2.8 seconds.",
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: 2,
    name: "Aqua Surge",
    category: "Water",
    thrillLevel: 3,
    height: '42"',
    duration: "4 min",
    description: "A thrilling river rapids adventure through volcanic caves.",
    gradient: "from-sky-500 to-cyan-400",
  },
  {
    id: 3,
    name: "Sky Rider 360",
    category: "Thrill",
    thrillLevel: 4,
    height: '54"',
    duration: "3 min",
    description: "360° spinning coaster with inverted loops at 250 feet.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: 4,
    name: "Haunted Manor",
    category: "Family",
    thrillLevel: 2,
    height: '36"',
    duration: "6 min",
    description: "Dark ride journey through a haunted Victorian mansion.",
    gradient: "from-slate-500 to-slate-400",
  },
  {
    id: 5,
    name: "Family Coaster",
    category: "Family",
    thrillLevel: 2,
    height: '36"',
    duration: "3 min",
    description: "A smooth, fun coaster perfect for the whole family.",
    gradient: "from-emerald-500 to-green-400",
  },
  {
    id: 6,
    name: "Splash Zone",
    category: "Water",
    thrillLevel: 2,
    height: "Any",
    duration: "Open",
    description: "Interactive water play zone — no height requirement!",
    gradient: "from-cyan-500 to-teal-400",
  },
  {
    id: 7,
    name: "Little Rockets",
    category: "Kids",
    thrillLevel: 1,
    height: "Any",
    duration: "2 min",
    description: "Mini rocket ships for our youngest thrill seekers!",
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    id: 8,
    name: "Mega Drop",
    category: "Thrill",
    thrillLevel: 5,
    height: '52"',
    duration: "1 min",
    description: "200-foot free-fall drop tower — pure adrenaline.",
    gradient: "from-orange-500 to-red-500",
  },
];

const FILTERS: Category[] = ["All", "Thrill", "Family", "Kids", "Water"];

const CATEGORY_COLORS: Record<Exclude<Category, "All">, string> = {
  Thrill: "#ef4444",
  Family: "#10b981",
  Kids: "#F97316",
  Water: "#0EA5E9",
};

const CATEGORY_BG: Record<Exclude<Category, "All">, string> = {
  Thrill: "rgba(239,68,68,0.12)",
  Family: "rgba(16,185,129,0.12)",
  Kids: "rgba(249,115,22,0.12)",
  Water: "rgba(14,165,233,0.12)",
};

function ThrillStars({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={13}
          fill={n <= level ? "#F97316" : "transparent"}
          stroke={n <= level ? "#F97316" : "#d1d5db"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function RideCard({ ride }: { ride: Ride }) {
  const [hovered, setHovered] = useState(false);
  const categoryColor = CATEGORY_COLORS[ride.category];
  const categoryBg = CATEGORY_BG[ride.category];

  return (
    <div
      data-ocid={`attractions.item.${ride.id}`}
      className="scroll-snap-align-start flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        minWidth: "300px",
        width: "300px",
        height: "420px",
        position: "relative",
        background: "#FFFFFF",
        border: "1px solid rgba(91,33,182,0.1)",
        boxShadow: hovered
          ? "0 12px 40px rgba(91,33,182,0.18), 0 4px 16px rgba(0,0,0,0.08)"
          : "0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        transform: hovered ? "scale(1.02) translateY(-4px)" : "scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Colored top band */}
      <div
        className={`relative h-40 w-full bg-gradient-to-br ${ride.gradient} flex items-end p-4`}
        style={{ overflow: "hidden" }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <span
          className="relative z-10 font-display text-4xl text-white/25 leading-none select-none tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {ride.name.toUpperCase()}
        </span>
        <span
          className="absolute top-3 right-3 z-10 text-xs font-semibold px-2.5 py-1 rounded-full tracking-wider uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            color: categoryColor,
            background: categoryBg,
            border: `1px solid ${categoryColor}`,
            letterSpacing: "0.08em",
          }}
        >
          {ride.category}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-3 h-[calc(420px-160px)]">
        <h3
          className="text-xl font-bold leading-tight"
          style={{ fontFamily: "var(--font-heading)", color: "#1C1C2E" }}
        >
          {ride.name}
        </h3>

        <div className="flex items-center justify-between">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)", color: "#6B7280" }}
          >
            Thrill Level
          </span>
          <ThrillStars level={ride.thrillLevel} />
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <Ruler size={13} color="#9ca3af" />
            <span
              className="text-xs"
              style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}
            >
              {ride.height}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={13} color="#9ca3af" />
            <span
              className="text-xs"
              style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}
            >
              {ride.duration}
            </span>
          </div>
        </div>

        <p
          className="text-xs leading-relaxed flex-1"
          style={{
            color: "#6B7280",
            fontFamily: "var(--font-body)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {ride.description}
        </p>

        <button
          type="button"
          data-ocid={`attractions.learn_more.${ride.id}`}
          className="text-sm font-semibold transition-colors duration-200 text-left"
          style={{
            fontFamily: "var(--font-body)",
            color: hovered ? "#5B21B6" : "#7C3AED",
          }}
        >
          Learn More →
        </button>
      </div>
    </div>
  );
}

export default function AttractionsSection() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredRides =
    activeFilter === "All"
      ? rides
      : rides.filter((r) => r.category === activeFilter);

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  }

  return (
    <section
      id="attractions"
      data-ocid="attractions.section"
      className="py-24 relative overflow-hidden"
      style={{ background: "#FAFAF5" }}
    >
      {/* Background glow blobs */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "#7C3AED" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{ background: "#F97316", opacity: 0.12 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-10 text-center">
          <span
            className="text-xs uppercase tracking-[0.25em] mb-3 block"
            style={{ fontFamily: "var(--font-mono)", color: "#F97316" }}
          >
            Attractions
          </span>
          <h2
            className="text-5xl md:text-7xl leading-none mb-4"
            style={{ fontFamily: "var(--font-display)", color: "#1C1C2E" }}
          >
            RIDE THE IMPOSSIBLE
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-body)", color: "#6B7280" }}
          >
            Eight signature experiences — from white-knuckle free falls to
            family adventures. Every ride engineered for maximum adrenaline.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          data-ocid="attractions.filter.tabs"
          className="flex items-center gap-2 mb-8 flex-wrap justify-center"
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                data-ocid={`attractions.filter.${filter.toLowerCase()}`}
                onClick={() => setActiveFilter(filter)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)",
                  background: isActive ? "#5B21B6" : "transparent",
                  color: isActive ? "#ffffff" : "#6B7280",
                  border: isActive
                    ? "1px solid #5B21B6"
                    : "1px solid rgba(91,33,182,0.2)",
                  boxShadow: isActive
                    ? "0 0 16px rgba(91,33,182,0.35)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "#F97316";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "#F97316";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(91,33,182,0.2)";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "#6B7280";
                  }
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Left arrow */}
          <button
            type="button"
            data-ocid="attractions.carousel.prev"
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center transition-all duration-200"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(91,33,182,0.25)",
              color: "#6B7280",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#5B21B6";
              (e.currentTarget as HTMLButtonElement).style.color = "#5B21B6";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(91,33,182,0.25)";
              (e.currentTarget as HTMLButtonElement).style.color = "#6B7280";
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Right arrow */}
          <button
            type="button"
            data-ocid="attractions.carousel.next"
            onClick={scrollRight}
            aria-label="Scroll right"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center transition-all duration-200"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(91,33,182,0.25)",
              color: "#6B7280",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#5B21B6";
              (e.currentTarget as HTMLButtonElement).style.color = "#5B21B6";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(91,33,182,0.25)";
              (e.currentTarget as HTMLButtonElement).style.color = "#6B7280";
            }}
          >
            <ChevronRight size={18} />
          </button>

          {/* Carousel scroll container */}
          <div
            ref={scrollRef}
            data-ocid="attractions.carousel"
            className="flex gap-6 pb-4 overflow-x-auto"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {filteredRides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))}

            {filteredRides.length === 0 && (
              <div
                data-ocid="attractions.empty_state"
                className="w-full py-20 flex flex-col items-center justify-center gap-3"
              >
                <span className="text-4xl">🎢</span>
                <p
                  className="text-base"
                  style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}
                >
                  No rides in this category yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
