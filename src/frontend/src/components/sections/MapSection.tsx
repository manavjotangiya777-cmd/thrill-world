import { useEffect, useRef, useState } from "react";

interface Zone {
  id: string;
  name: string;
  color: string;
  hoverColor: string;
  description: string;
  rides: string[];
  position: { x: string; y: string; width: string; height: string };
}

const zones: Zone[] = [
  {
    id: "thrill",
    name: "Thrill Zone",
    color: "#EF4444",
    hoverColor: "#F87171",
    description:
      "Heart-pounding rides for the bravest visitors. Experience speed, drops, and inversions.",
    rides: ["Thunder Bolt X", "Sky Rider 360", "Mega Drop", "Viper Twist"],
    position: { x: "15%", y: "20%", width: "35%", height: "40%" },
  },
  {
    id: "family",
    name: "Family Land",
    color: "#0EA5E9",
    hoverColor: "#38BDF8",
    description:
      "Fun for everyone! Classic rides and attractions the whole family will love.",
    rides: [
      "Haunted Manor",
      "Family Coaster",
      "Carousel Classic",
      "Bumper Cars",
    ],
    position: { x: "55%", y: "15%", width: "30%", height: "35%" },
  },
  {
    id: "kids",
    name: "Kids Kingdom",
    color: "#F97316",
    hoverColor: "#FB923C",
    description: "A magical world designed just for our youngest adventurers.",
    rides: [
      "Little Rockets",
      "Mini Ferris Wheel",
      "Teacup Spin",
      "Dragon Train",
    ],
    position: { x: "55%", y: "55%", width: "30%", height: "30%" },
  },
  {
    id: "water",
    name: "Splash World",
    color: "#5B21B6",
    hoverColor: "#7C3AED",
    description: "Stay cool and have a blast in our tropical water paradise.",
    rides: ["Aqua Surge", "Splash Zone", "Wave Pool", "Lazy River"],
    position: { x: "15%", y: "65%", width: "35%", height: "25%" },
  },
];

function pctToSvg(pos: Zone["position"]): {
  x: number;
  y: number;
  w: number;
  h: number;
} {
  return {
    x: Number.parseFloat(pos.x) * 8,
    y: Number.parseFloat(pos.y) * 6,
    w: Number.parseFloat(pos.width) * 8,
    h: Number.parseFloat(pos.height) * 6,
  };
}

const zoneIcons: Record<string, React.ReactNode> = {
  thrill: (
    <>
      <path
        d="M0,-14 C6,-14 12,-8 12,0 C12,8 6,14 0,14 C-6,14 -12,8 -12,0 C-12,-6 -8,-12 0,-14 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.7"
      />
      <line
        x1="-10"
        y1="0"
        x2="10"
        y2="0"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.5"
      />
    </>
  ),
  family: (
    <>
      <circle
        cx="0"
        cy="0"
        r="11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.7"
      />
      <line
        x1="0"
        y1="-11"
        x2="0"
        y2="11"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <line
        x1="-11"
        y1="0"
        x2="11"
        y2="0"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <line
        x1="-8"
        y1="-8"
        x2="8"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <line
        x1="8"
        y1="-8"
        x2="-8"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <circle cx="0" cy="0" r="3" fill="currentColor" opacity="0.8" />
    </>
  ),
  kids: (
    <>
      <polygon
        points="0,-12 3,-5 10,-5 5,1 7,9 0,4 -7,9 -5,1 -10,-5 -3,-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.7"
      />
    </>
  ),
  water: (
    <>
      <path
        d="M-10,0 Q-5,-5 0,0 Q5,5 10,0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.8"
      />
      <path
        d="M-10,6 Q-5,1 0,6 Q5,11 10,6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.6"
      />
      <path
        d="M-10,-6 Q-5,-11 0,-6 Q5,-1 10,-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.4"
      />
    </>
  ),
};

function ZoneRect({
  zone,
  isSelected,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: {
  zone: Zone;
  isSelected: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const { x, y, w, h } = pctToSvg(zone.position);
  const cx = x + w / 2;
  const cy = y + h / 2;
  const active = isSelected || isHovered;

  return (
    <g
      style={{ cursor: "pointer" }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {active && (
        <rect
          x={x - 4}
          y={y - 4}
          width={w + 8}
          height={h + 8}
          rx={14}
          fill="none"
          stroke={zone.color}
          strokeWidth={3}
          opacity={0.35}
          style={{ filter: `drop-shadow(0 0 12px ${zone.color})` }}
        />
      )}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={zone.color}
        fillOpacity={active ? 0.45 : 0.18}
        stroke={zone.color}
        strokeWidth={active ? 2.5 : 1.5}
        strokeOpacity={active ? 1 : 0.7}
        style={{
          transition: "fill-opacity 0.3s, stroke-width 0.3s",
          filter: active ? `drop-shadow(0 0 8px ${zone.color}80)` : undefined,
        }}
      />
      <g
        transform={`translate(${cx}, ${cy - 16})`}
        style={{ color: active ? zone.hoverColor : zone.color }}
        fill={active ? zone.hoverColor : zone.color}
        stroke={active ? zone.hoverColor : zone.color}
      >
        {zoneIcons[zone.id]}
      </g>
      <text
        x={cx}
        y={cy + 20}
        textAnchor="middle"
        fill={active ? zone.hoverColor : "#1C1C2E"}
        fontSize="13"
        fontFamily="'Bebas Neue', cursive"
        letterSpacing="2"
        style={{
          filter: active ? `drop-shadow(0 0 6px ${zone.color})` : undefined,
          transition: "fill 0.3s",
        }}
      >
        {zone.name.toUpperCase()}
      </text>
    </g>
  );
}

function ZoneModal({
  zone,
  onClose,
}: { zone: Zone | null; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!zone) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(28,28,46,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      data-ocid="map.modal"
      aria-modal="true"
      aria-label={`${zone.name} info`}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-6 animate-scale-in"
        style={{
          background: "#FFFFFF",
          border: `1.5px solid ${zone.color}40`,
          boxShadow: `0 0 40px ${zone.color}20, 0 20px 60px rgba(0,0,0,0.15)`,
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        data-ocid="map.dialog"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-smooth hover:opacity-80"
          style={{
            background: `${zone.color}18`,
            color: zone.color,
            border: `1px solid ${zone.color}40`,
          }}
          aria-label="Close zone info"
          data-ocid="map.close_button"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-5 h-5 rounded-full flex-shrink-0"
            style={{
              background: zone.color,
              boxShadow: `0 0 12px ${zone.color}80`,
            }}
          />
          <h3
            className="text-3xl tracking-wider"
            style={{ fontFamily: "'Bebas Neue', cursive", color: zone.color }}
          >
            {zone.name}
          </h3>
        </div>

        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: "#6B7280" }}
        >
          {zone.description}
        </p>

        <div className="h-px mb-5" style={{ background: `${zone.color}25` }} />

        <p
          className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: zone.color,
          }}
        >
          Rides in this zone
        </p>
        <ul className="space-y-2">
          {zone.rides.map((ride) => (
            <li
              key={ride}
              className="flex items-center gap-2 text-sm"
              style={{ color: "#1C1C2E" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  background: zone.color,
                  boxShadow: `0 0 6px ${zone.color}`,
                }}
              />
              {ride}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function MapSection() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            for (const el of entry.target.querySelectorAll(
              ".reveal, .reveal-left, .reveal-right",
            )) {
              el.classList.add("visible");
            }
          }
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const activeZone = zones.find((z) => z.id === selectedZone) ?? null;

  return (
    <>
      <section
        id="map"
        ref={sectionRef}
        className="py-24 relative overflow-hidden"
        style={{ background: "#F3F0FF" }}
        data-ocid="map.section"
      >
        {/* Background grid decoration */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(91,33,182,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(91,33,182,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(91,33,182,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-14 reveal">
            <p
              className="text-xs font-bold tracking-[0.3em] uppercase mb-4"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "#F97316",
              }}
            >
              PARK MAP
            </p>
            <h2
              className="text-5xl md:text-7xl tracking-wider mb-4"
              style={{ fontFamily: "'Bebas Neue', cursive", color: "#1C1C2E" }}
            >
              EXPLORE THE PARK
            </h2>
            <p
              className="text-sm md:text-base max-w-xl mx-auto"
              style={{ color: "#6B7280" }}
            >
              Tap any zone to discover the rides and attractions waiting for you
            </p>
          </div>

          {/* SVG Map */}
          <div
            className="relative reveal mx-auto"
            style={{ maxWidth: "860px" }}
          >
            <div
              className="rounded-2xl p-1"
              style={{
                background:
                  "linear-gradient(135deg, rgba(91,33,182,0.35) 0%, rgba(249,115,22,0.2) 50%, rgba(91,33,182,0.1) 100%)",
              }}
            >
              <div
                className="rounded-xl overflow-hidden"
                style={{ background: "#F8F5FF" }}
              >
                <svg
                  viewBox="0 0 800 600"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: "block" }}
                  aria-label="Thrill World park map"
                  role="img"
                >
                  <rect width="800" height="600" fill="#F8F5FF" />
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="#5B21B6"
                        strokeWidth="0.5"
                        opacity="0.08"
                      />
                    </pattern>
                    <radialGradient id="plazaGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#e8e0ff" />
                      <stop offset="100%" stopColor="#F8F5FF" />
                    </radialGradient>
                    <filter id="softGlow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <rect width="800" height="600" fill="url(#grid)" />

                  {/* Pathways */}
                  <path
                    d="M 120 300 Q 280 280 400 310 Q 520 340 660 290"
                    stroke="#d8d0f0"
                    strokeWidth="18"
                    fill="none"
                    opacity="0.8"
                  />
                  <path
                    d="M 400 100 Q 390 250 400 310 Q 410 400 400 490"
                    stroke="#d8d0f0"
                    strokeWidth="18"
                    fill="none"
                    opacity="0.8"
                  />
                  <path
                    d="M 120 300 Q 280 280 400 310 Q 520 340 660 290"
                    stroke="#b8a8e0"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.5"
                    strokeDasharray="8 5"
                  />
                  <path
                    d="M 400 100 Q 390 250 400 310 Q 410 400 400 490"
                    stroke="#b8a8e0"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.5"
                    strokeDasharray="8 5"
                  />

                  {/* Central plaza */}
                  <circle
                    cx="400"
                    cy="310"
                    r="38"
                    fill="url(#plazaGrad)"
                    opacity="0.9"
                  />
                  <circle
                    cx="400"
                    cy="310"
                    r="38"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                  <circle
                    cx="400"
                    cy="310"
                    r="22"
                    fill="none"
                    stroke="#5B21B6"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                  <circle
                    cx="400"
                    cy="310"
                    r="6"
                    fill="#5B21B6"
                    opacity="0.7"
                  />
                  <text
                    x="400"
                    y="362"
                    textAnchor="middle"
                    fill="#5B21B6"
                    fontSize="9"
                    fontFamily="'JetBrains Mono', monospace"
                    letterSpacing="1.5"
                    opacity="0.7"
                  >
                    PLAZA
                  </text>

                  {/* Zones */}
                  {zones.map((zone) => (
                    <ZoneRect
                      key={zone.id}
                      zone={zone}
                      isSelected={selectedZone === zone.id}
                      isHovered={hoveredZone === zone.id}
                      onHover={() => setHoveredZone(zone.id)}
                      onLeave={() => setHoveredZone(null)}
                      onClick={() => setSelectedZone(zone.id)}
                    />
                  ))}

                  {/* Park title */}
                  <text
                    x="400"
                    y="30"
                    textAnchor="middle"
                    fill="#1C1C2E"
                    fontSize="20"
                    fontFamily="'Bebas Neue', cursive"
                    letterSpacing="6"
                    filter="url(#softGlow)"
                    opacity="0.8"
                  >
                    THRILL WORLD
                  </text>
                  <line
                    x1="280"
                    y1="36"
                    x2="360"
                    y2="36"
                    stroke="#5B21B6"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                  <line
                    x1="440"
                    y1="36"
                    x2="520"
                    y2="36"
                    stroke="#5B21B6"
                    strokeWidth="1"
                    opacity="0.4"
                  />

                  {/* Entrance marker */}
                  <g transform="translate(400, 565)">
                    <polygon
                      points="0,-10 8,4 -8,4"
                      fill="#F97316"
                      opacity="0.9"
                    />
                    <circle
                      cx="0"
                      cy="-10"
                      r="6"
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="1.5"
                      opacity="0.7"
                    />
                    <text
                      x="0"
                      y="16"
                      textAnchor="middle"
                      fill="#F97316"
                      fontSize="8"
                      fontFamily="'JetBrains Mono', monospace"
                      letterSpacing="1"
                      opacity="0.9"
                    >
                      YOU ARE HERE
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 reveal">
            {zones.map((zone) => (
              <button
                key={zone.id}
                type="button"
                onClick={() =>
                  setSelectedZone(selectedZone === zone.id ? null : zone.id)
                }
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-smooth"
                style={{
                  background:
                    selectedZone === zone.id
                      ? `${zone.color}15`
                      : "rgba(255,255,255,0.8)",
                  border: `1px solid ${selectedZone === zone.id ? zone.color : "rgba(91,33,182,0.15)"}`,
                  color: selectedZone === zone.id ? zone.hoverColor : "#6B7280",
                  boxShadow:
                    selectedZone === zone.id
                      ? `0 0 14px ${zone.color}35`
                      : "0 2px 8px rgba(0,0,0,0.06)",
                  fontFamily: "'Sora', sans-serif",
                }}
                aria-label={`${zone.name} zone filter`}
                data-ocid={`map.legend.${zone.id}`}
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    background: zone.color,
                    boxShadow: `0 0 8px ${zone.color}80`,
                  }}
                />
                {zone.name}
              </button>
            ))}
          </div>

          <p
            className="text-center mt-4 text-xs reveal"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#9ca3af",
            }}
          >
            Click a zone on the map or use the legend above
          </p>
        </div>
      </section>

      {selectedZone && (
        <ZoneModal zone={activeZone} onClose={() => setSelectedZone(null)} />
      )}
    </>
  );
}
