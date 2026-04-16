import { ArrowUp, Camera, Music, Play, Share2 } from "lucide-react";
import { useState } from "react";

const QUICK_LINKS = [
  { label: "Attractions", id: "attractions" },
  { label: "Park Map", id: "map" },
  { label: "Pricing", id: "pricing" },
  { label: "Guest Stories", id: "stories" },
  { label: "Plan Your Visit", id: "visit" },
];

const SOCIALS = [
  { label: "Instagram", Icon: Camera, hoverColor: "#E1306C" },
  { label: "TikTok", Icon: Music, hoverColor: "#EE1D52" },
  { label: "YouTube", Icon: Play, hoverColor: "#FF0000" },
  { label: "Facebook", Icon: Share2, hoverColor: "#1877F2" },
];

const LIGHTS = [
  {
    left: "5.0%",
    top: "20%",
    color: "#5B21B6",
    size: "2px",
    dur: "1.5s",
    delay: "0s",
  },
  {
    left: "9.7%",
    top: "32%",
    color: "#5B21B6",
    size: "2px",
    dur: "2.1s",
    delay: "0.15s",
  },
  {
    left: "14.4%",
    top: "44%",
    color: "#F97316",
    size: "3px",
    dur: "1.5s",
    delay: "0.3s",
  },
  {
    left: "19.1%",
    top: "56%",
    color: "#5B21B6",
    size: "2px",
    dur: "2.7s",
    delay: "0.45s",
  },
  {
    left: "23.8%",
    top: "68%",
    color: "#5B21B6",
    size: "2px",
    dur: "1.5s",
    delay: "0.6s",
  },
  {
    left: "28.5%",
    top: "20%",
    color: "#5B21B6",
    size: "2px",
    dur: "2.1s",
    delay: "0.75s",
  },
  {
    left: "33.2%",
    top: "32%",
    color: "#7C3AED",
    size: "2px",
    dur: "2.7s",
    delay: "0.9s",
  },
  {
    left: "37.9%",
    top: "44%",
    color: "#F97316",
    size: "3px",
    dur: "1.5s",
    delay: "1.05s",
  },
  {
    left: "42.6%",
    top: "56%",
    color: "#FFD600",
    size: "2px",
    dur: "2.1s",
    delay: "1.2s",
  },
  {
    left: "47.3%",
    top: "68%",
    color: "#5B21B6",
    size: "2px",
    dur: "2.7s",
    delay: "1.35s",
  },
  {
    left: "52.0%",
    top: "20%",
    color: "#5B21B6",
    size: "2px",
    dur: "1.5s",
    delay: "1.5s",
  },
  {
    left: "56.7%",
    top: "32%",
    color: "#F97316",
    size: "3px",
    dur: "2.1s",
    delay: "1.65s",
  },
  {
    left: "61.4%",
    top: "44%",
    color: "#7C3AED",
    size: "2px",
    dur: "2.7s",
    delay: "1.8s",
  },
  {
    left: "66.1%",
    top: "56%",
    color: "#FFD600",
    size: "2px",
    dur: "1.5s",
    delay: "1.95s",
  },
  {
    left: "70.8%",
    top: "68%",
    color: "#5B21B6",
    size: "2px",
    dur: "2.1s",
    delay: "2.1s",
  },
  {
    left: "75.5%",
    top: "20%",
    color: "#F97316",
    size: "3px",
    dur: "2.7s",
    delay: "2.25s",
  },
  {
    left: "80.2%",
    top: "32%",
    color: "#5B21B6",
    size: "2px",
    dur: "1.5s",
    delay: "2.4s",
  },
  {
    left: "84.9%",
    top: "44%",
    color: "#7C3AED",
    size: "2px",
    dur: "2.1s",
    delay: "2.55s",
  },
  {
    left: "89.6%",
    top: "56%",
    color: "#FFD600",
    size: "2px",
    dur: "2.7s",
    delay: "2.7s",
  },
  {
    left: "94.3%",
    top: "68%",
    color: "#F97316",
    size: "3px",
    dur: "1.5s",
    delay: "2.85s",
  },
];

const LEGAL = [
  { label: "Privacy Policy", key: "privacy" },
  { label: "Terms of Service", key: "terms" },
  { label: "Cookie Policy", key: "cookies" },
];

function SkylineSilhouette() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "96px", background: "#FAFAF5" }}
    >
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "100%" }}
        aria-hidden="true"
      >
        <rect x="0" y="80" width="1440" height="16" fill="#EDE9FE" />
        <rect x="0" y="50" width="40" height="30" fill="#EDE9FE" />
        <rect x="10" y="40" width="20" height="40" fill="#EDE9FE" />
        <rect x="45" y="60" width="55" height="20" fill="#EDE9FE" />
        <rect x="55" y="45" width="15" height="35" fill="#EDE9FE" />
        <rect x="100" y="35" width="60" height="45" fill="#EDE9FE" />
        <rect x="115" y="25" width="12" height="55" fill="#EDE9FE" />
        <rect x="165" y="55" width="45" height="25" fill="#EDE9FE" />
        <rect x="175" y="42" width="10" height="38" fill="#EDE9FE" />
        <rect x="215" y="30" width="50" height="50" fill="#EDE9FE" />
        <rect x="230" y="18" width="10" height="62" fill="#EDE9FE" />
        <rect x="270" y="50" width="35" height="30" fill="#EDE9FE" />
        <rect x="278" y="40" width="8" height="40" fill="#EDE9FE" />
        <rect x="310" y="40" width="70" height="40" fill="#EDE9FE" />
        <rect x="325" y="28" width="15" height="52" fill="#EDE9FE" />
        <rect x="385" y="55" width="50" height="25" fill="#EDE9FE" />
        <rect x="440" y="38" width="80" height="42" fill="#EDE9FE" />
        <rect x="460" y="22" width="18" height="58" fill="#EDE9FE" />
        <rect x="525" y="48" width="45" height="32" fill="#EDE9FE" />
        <rect x="575" y="32" width="60" height="48" fill="#EDE9FE" />
        <rect x="590" y="18" width="14" height="62" fill="#EDE9FE" />
        <rect x="640" y="50" width="50" height="30" fill="#EDE9FE" />
        <rect x="650" y="38" width="10" height="42" fill="#EDE9FE" />
        <rect x="695" y="42" width="70" height="38" fill="#EDE9FE" />
        <rect x="715" y="28" width="14" height="52" fill="#EDE9FE" />
        <rect x="770" y="55" width="40" height="25" fill="#EDE9FE" />
        <rect x="815" y="45" width="55" height="35" fill="#EDE9FE" />
        <rect x="830" y="30" width="12" height="50" fill="#EDE9FE" />
        <rect x="875" y="60" width="45" height="20" fill="#EDE9FE" />
        <path
          d="M950 80 Q970 40 1000 55 Q1020 30 1050 50 Q1070 20 1100 45 Q1120 60 1140 55 Q1160 35 1180 50 L1200 80 Z"
          fill="#EDE9FE"
        />
        <circle
          cx="1300"
          cy="55"
          r="30"
          fill="none"
          stroke="#EDE9FE"
          strokeWidth="8"
        />
        <circle cx="1300" cy="55" r="3" fill="#EDE9FE" />
        <line
          x1="1300"
          y1="25"
          x2="1300"
          y2="85"
          stroke="#EDE9FE"
          strokeWidth="3"
        />
        <line
          x1="1270"
          y1="55"
          x2="1330"
          y2="55"
          stroke="#EDE9FE"
          strokeWidth="3"
        />
        <line
          x1="1279"
          y1="34"
          x2="1321"
          y2="76"
          stroke="#EDE9FE"
          strokeWidth="3"
        />
        <line
          x1="1279"
          y1="76"
          x2="1321"
          y2="34"
          stroke="#EDE9FE"
          strokeWidth="3"
        />
        <line
          x1="1285"
          y1="85"
          x2="1270"
          y2="96"
          stroke="#EDE9FE"
          strokeWidth="4"
        />
        <line
          x1="1315"
          y1="85"
          x2="1330"
          y2="96"
          stroke="#EDE9FE"
          strokeWidth="4"
        />
        <rect x="1270" y="88" width="60" height="8" fill="#EDE9FE" />
        <rect x="1200" y="58" width="45" height="22" fill="#EDE9FE" />
        <rect x="1210" y="45" width="10" height="35" fill="#EDE9FE" />
        <rect x="1380" y="52" width="60" height="28" fill="#EDE9FE" />
        <rect x="1395" y="40" width="10" height="40" fill="#EDE9FE" />
        <defs>
          <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FAFAF5" stopOpacity="1" />
            <stop offset="40%" stopColor="#FAFAF5" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="1440" height="96" fill="url(#skyFade)" />
      </svg>

      {LIGHTS.map((l) => (
        <span
          key={l.left}
          className="absolute rounded-full"
          style={{
            width: l.size,
            height: l.size,
            left: l.left,
            top: l.top,
            background: l.color,
            animation: `skyPulse ${l.dur} ease-in-out ${l.delay} infinite alternate`,
            opacity: 0.6,
          }}
        />
      ))}

      <style>{`
        @keyframes skyPulse {
          from { opacity: 0.2; transform: scale(0.8); }
          to   { opacity: 0.9; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer style={{ background: "#EDE9FE" }} className="pt-0 pb-8">
      <SkylineSilhouette />

      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* 3-column grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Column 1 — Brand */}
          <div>
            <div
              className="text-4xl leading-none mb-3"
              style={{ fontFamily: "Bebas Neue, cursive", color: "#5B21B6" }}
            >
              THRILL WORLD
            </div>
            <p
              className="text-sm mb-6"
              style={{ fontFamily: "Sora, sans-serif", color: "#6B7280" }}
            >
              Where every ride rewrites reality
            </p>
            <p
              className="text-xs"
              style={{ fontFamily: "Inter, sans-serif", color: "#9ca3af" }}
            >
              © {currentYear} Thrill World. All rights reserved.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4
              className="font-semibold mb-5 uppercase tracking-widest"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "0.7rem",
                color: "#6B7280",
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    data-ocid={`footer.nav.${link.id}`}
                    onClick={() => scrollTo(link.id)}
                    className="text-sm"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: "#6B7280",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "color 0.2s",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#5B21B6";
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#5B21B6";
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#6B7280";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#6B7280";
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Newsletter */}
          <div>
            <h4
              className="font-semibold mb-2"
              style={{ fontFamily: "Sora, sans-serif", color: "#1C1C2E" }}
            >
              Stay In the Loop
            </h4>
            <p
              className="text-xs mb-4"
              style={{ fontFamily: "Inter, sans-serif", color: "#6B7280" }}
            >
              Get exclusive deals and park news
            </p>
            {subscribed ? (
              <p
                className="text-sm px-4 py-3 rounded-lg"
                data-ocid="footer.subscribe_success"
                style={{
                  background: "rgba(91,33,182,0.08)",
                  color: "#5B21B6",
                  border: "1px solid rgba(91,33,182,0.2)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Thanks! You&apos;re on the list. 🎢
              </p>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  data-ocid="footer.email_input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubscribe();
                  }}
                  placeholder="your@email.com"
                  className="flex-1 rounded-lg px-3 py-2.5 text-sm outline-none min-w-0"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(91,33,182,0.2)",
                    fontFamily: "Inter, sans-serif",
                    color: "#1C1C2E",
                  }}
                />
                <button
                  type="button"
                  data-ocid="footer.subscribe_button"
                  onClick={handleSubscribe}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #5B21B6, #7C3AED)",
                    color: "#ffffff",
                    fontFamily: "Sora, sans-serif",
                    cursor: "pointer",
                    border: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity =
                      "0.8";
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity =
                      "0.8";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  }}
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-10"
          style={{ background: "rgba(91,33,182,0.12)" }}
        />

        {/* Social row */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <p
            className="text-xs tracking-widest uppercase"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              color: "#9ca3af",
            }}
          >
            Follow Us
          </p>
          <div className="flex gap-3">
            {SOCIALS.map(({ label, Icon, hoverColor }) => {
              const isHov = hoveredSocial === label;
              return (
                <button
                  key={label}
                  type="button"
                  data-ocid={`footer.social.${label.toLowerCase()}`}
                  aria-label={label}
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{
                    border: `1px solid ${isHov ? hoverColor : "rgba(91,33,182,0.2)"}`,
                    background: isHov
                      ? `${hoverColor}15`
                      : "rgba(255,255,255,0.6)",
                    color: isHov ? hoverColor : "#6B7280",
                    cursor: "pointer",
                    boxShadow: isHov ? `0 0 16px ${hoverColor}40` : "none",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={() => setHoveredSocial(label)}
                  onFocus={() => setHoveredSocial(label)}
                  onMouseOut={() => setHoveredSocial(null)}
                  onBlur={() => setHoveredSocial(null)}
                >
                  <Icon size={16} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(91,33,182,0.12)" }}
        >
          <div className="flex items-center gap-1 flex-wrap justify-center">
            {LEGAL.map(({ label, key }, i) => (
              <span key={key} className="flex items-center gap-1">
                {i > 0 && (
                  <span
                    style={{
                      color: "rgba(91,33,182,0.25)",
                      fontSize: "0.6rem",
                    }}
                  >
                    |
                  </span>
                )}
                <button
                  type="button"
                  data-ocid={`footer.legal.${key}`}
                  className="text-xs"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: "#9ca3af",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 2px",
                    transition: "color 0.2s",
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "#5B21B6";
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "#5B21B6";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "#9ca3af";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "#9ca3af";
                  }}
                >
                  {label}
                </button>
              </span>
            ))}
          </div>

          <p
            className="text-xs"
            style={{ fontFamily: "Inter, sans-serif", color: "#9ca3af" }}
          >
            © {currentYear} Thrill World. All rights reserved.{" · "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#9ca3af", transition: "color 0.2s" }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#5B21B6";
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#5B21B6";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af";
              }}
            >
              Built with caffeine.ai
            </a>
          </p>

          {/* Back to top */}
          <button
            type="button"
            data-ocid="footer.back_to_top_button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold"
            style={{
              fontFamily: "Sora, sans-serif",
              border: "1px solid rgba(91,33,182,0.3)",
              color: "#5B21B6",
              background: "transparent",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseOver={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "#5B21B6";
              btn.style.color = "#ffffff";
            }}
            onFocus={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "#5B21B6";
              btn.style.color = "#ffffff";
            }}
            onMouseOut={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "transparent";
              btn.style.color = "#5B21B6";
            }}
            onBlur={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "transparent";
              btn.style.color = "#5B21B6";
            }}
          >
            <ArrowUp size={12} />
            TOP
          </button>
        </div>
      </div>
    </footer>
  );
}
