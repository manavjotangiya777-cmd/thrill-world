import { Calendar, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";

const HOURS = [
  {
    day: "Monday – Friday",
    open: "10:00 AM",
    close: "9:00 PM",
    dayIndex: [1, 2, 3, 4, 5],
  },
  { day: "Saturday", open: "9:00 AM", close: "11:00 PM", dayIndex: [6] },
  { day: "Sunday", open: "9:00 AM", close: "10:00 PM", dayIndex: [0] },
  { day: "Holidays", open: "8:00 AM", close: "12:00 AM", dayIndex: [] },
];

const FAQS = [
  {
    q: "What's the minimum height requirement for rides?",
    a: 'Height requirements differ for each ride (36"–54"). Check the ride listing page for specific requirements before your visit.',
  },
  {
    q: "Can I re-enter the park if I leave?",
    a: "Yes! Your wristband allows unlimited re-entry on the same day. Just make sure to keep it on at all times.",
  },
  {
    q: "Is outside food allowed?",
    a: "Small snacks and water bottles are welcome, but no full meals from outside. We have 20+ dining options inside the park!",
  },
  {
    q: "What happens if it rains?",
    a: "The park stays open rain or shine! Most rides operate in light rain. Severe weather may cause temporary closures for safety — we'll notify guests via our app.",
  },
  {
    q: "Is there parking on-site?",
    a: "Yes, free parking is included with all ticket purchases. Premium spots closer to the entrance are available for $15/day.",
  },
  {
    q: "Are there lockers available?",
    a: "Yes! Lockers are available at ride entrances for small personal items. Annual pass holders enjoy one complimentary locker per visit.",
  },
];

export default function VisitSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visitDate, setVisitDate] = useState("");
  const [dateMsg, setDateMsg] = useState("");

  const todayIdx = new Date().getDay();

  const handleCheckAvailability = () => {
    if (!visitDate) return;
    const d = new Date(visitDate);
    const day = d.getDay();
    const isWeekend = day === 0 || day === 6;
    setDateMsg(
      isWeekend
        ? "Peak day selected — arrive early for shorter queues!"
        : "Great choice! Weekday visits are typically quieter. Enjoy shorter lines!",
    );
  };

  return (
    <section
      id="visit"
      className="relative py-24 px-4"
      style={{
        background: "linear-gradient(180deg, #F3F0FF 0%, #FAFAF5 100%)",
      }}
    >
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(91,33,182,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(91,33,182,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-[0.3em] mb-3 uppercase"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              color: "#F97316",
            }}
          >
            PLAN YOUR VISIT
          </p>
          <h2
            className="text-5xl md:text-7xl leading-none"
            style={{ fontFamily: "Bebas Neue, cursive", color: "#1C1C2E" }}
          >
            WE&apos;RE OPEN ALL YEAR
          </h2>
          <div
            className="mt-3 mx-auto h-[3px] w-24 rounded-full"
            style={{ background: "linear-gradient(90deg, #5B21B6, #F97316)" }}
          />
        </div>

        {/* Opening Hours Table */}
        <div className="mb-16">
          <h3
            className="font-semibold mb-4 uppercase tracking-widest"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "0.75rem",
              color: "#6B7280",
            }}
          >
            Park Hours
          </h3>
          <div
            className="rounded-xl overflow-hidden"
            style={{
              border: "1px solid rgba(91,33,182,0.12)",
              background: "#FFFFFF",
              boxShadow: "0 4px 20px rgba(91,33,182,0.07)",
            }}
          >
            {HOURS.map((row, i) => {
              const isToday = row.dayIndex.includes(todayIdx);
              return (
                <div
                  key={row.day}
                  className="flex items-center justify-between px-6 py-4"
                  style={{
                    background: isToday
                      ? "rgba(91, 33, 182, 0.06)"
                      : i % 2 === 0
                        ? "rgba(0,0,0,0.01)"
                        : "transparent",
                    borderBottom:
                      i < HOURS.length - 1
                        ? "1px solid rgba(91,33,182,0.07)"
                        : "none",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="font-medium"
                      style={{
                        fontFamily: "Sora, sans-serif",
                        color: "#1C1C2E",
                      }}
                    >
                      {row.day}
                    </span>
                    {isToday && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-bold tracking-wider"
                        style={{
                          background: "rgba(249,115,22,0.12)",
                          color: "#F97316",
                          fontFamily: "JetBrains Mono, monospace",
                          border: "1px solid rgba(249,115,22,0.25)",
                        }}
                      >
                        TODAY
                      </span>
                    )}
                  </div>
                  <div
                    className="text-sm font-mono"
                    style={{ color: isToday ? "#5B21B6" : "#6B7280" }}
                  >
                    {row.open} – {row.close}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mb-16">
          <h3
            className="font-semibold mb-6 uppercase tracking-widest"
            style={{
              fontFamily: "Sora, sans-serif",
              color: "#6B7280",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
            }}
          >
            Frequently Asked Questions
          </h3>
          <div className="space-y-2">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    border: isOpen
                      ? "1px solid rgba(91,33,182,0.3)"
                      : "1px solid rgba(91,33,182,0.1)",
                    background: isOpen ? "rgba(91,33,182,0.03)" : "#FFFFFF",
                    boxShadow: isOpen
                      ? "0 4px 16px rgba(91,33,182,0.1)"
                      : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <button
                    type="button"
                    data-ocid={`faq.item.${i + 1}`}
                    className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-200 group"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{ cursor: "pointer" }}
                  >
                    <span
                      className="font-semibold text-sm md:text-base pr-4"
                      style={{
                        fontFamily: "Sora, sans-serif",
                        color: isOpen ? "#5B21B6" : "#1C1C2E",
                        transition: "color 0.2s",
                      }}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className="flex-shrink-0 transition-transform duration-300"
                      style={{
                        color: isOpen ? "#5B21B6" : "#9ca3af",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? "200px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p
                      className="px-6 pb-5 text-sm leading-relaxed"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        color: "#6B7280",
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Date Picker + Directions Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Date Picker Card */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(91,33,182,0.12)",
              boxShadow: "0 4px 20px rgba(91,33,182,0.08)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={18} style={{ color: "#5B21B6" }} />
              <h4
                className="font-semibold"
                style={{ fontFamily: "Sora, sans-serif", color: "#1C1C2E" }}
              >
                Plan Your Visit Date
              </h4>
            </div>
            <input
              type="date"
              data-ocid="visit.date_input"
              value={visitDate}
              onChange={(e) => {
                setVisitDate(e.target.value);
                setDateMsg("");
              }}
              className="w-full rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2"
              style={{
                background: "rgba(91,33,182,0.04)",
                border: "1px solid rgba(91,33,182,0.15)",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
                color: "#1C1C2E",
                colorScheme: "light",
              }}
            />
            <button
              type="button"
              data-ocid="visit.check_availability_button"
              onClick={handleCheckAvailability}
              className="w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #5B21B6, #7C3AED)",
                color: "#ffffff",
                fontFamily: "Sora, sans-serif",
                border: "none",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              }}
            >
              Check Availability
            </button>
            {dateMsg && (
              <p
                className="mt-3 text-xs px-3 py-2 rounded-lg"
                data-ocid="visit.availability_result"
                style={{
                  background: "rgba(91,33,182,0.06)",
                  color: "#5B21B6",
                  fontFamily: "Inter, sans-serif",
                  border: "1px solid rgba(91,33,182,0.2)",
                }}
              >
                {dateMsg}
              </p>
            )}
            <p
              className="mt-4 text-xs"
              style={{ color: "#9ca3af", fontFamily: "Inter, sans-serif" }}
            >
              Peak days: Weekends &amp; Holidays. Weekday visits are typically
              quieter.
            </p>
          </div>

          {/* Directions Card */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(91,33,182,0.12)",
              boxShadow: "0 4px 20px rgba(91,33,182,0.08)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={18} style={{ color: "#F97316" }} />
              <h4
                className="font-semibold"
                style={{ fontFamily: "Sora, sans-serif", color: "#1C1C2E" }}
              >
                Getting Here
              </h4>
            </div>
            <address
              className="not-italic mb-2 text-sm font-medium"
              style={{ color: "#374151", fontFamily: "Inter, sans-serif" }}
            >
              1 Thrill World Blvd
              <br />
              Adventure City, CA 90210
            </address>
            <p
              className="text-xs mb-6"
              style={{ color: "#9ca3af", fontFamily: "Inter, sans-serif" }}
            >
              Open Daily · 9:00 AM – 11:00 PM (weekends)
            </p>
            <button
              type="button"
              data-ocid="visit.directions_button"
              className="w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200"
              style={{
                background: "transparent",
                color: "#5B21B6",
                fontFamily: "Sora, sans-serif",
                border: "1.5px solid rgba(91,33,182,0.4)",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(91,33,182,0.06)";
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(91,33,182,0.06)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
              }}
            >
              Get Directions
            </button>
            <p
              className="mt-4 text-xs text-center"
              style={{ color: "#9ca3af", fontFamily: "Inter, sans-serif" }}
            >
              ~2 hours from downtown · Free parking on site
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
