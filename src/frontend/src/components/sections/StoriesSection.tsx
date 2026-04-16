import { Camera, Star, Video } from "lucide-react";
import { useEffect, useRef } from "react";

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    quote:
      "Thunder Bolt X literally changed my life. The 0-80mph launch is unreal. We drove 4 hours just to come back!",
    date: "March 2024",
    avatar: "SM",
  },
  {
    id: 2,
    name: "Jake & Lily T.",
    rating: 5,
    quote:
      "Brought the whole family — kids LOVED Little Rockets, we adored Haunted Manor. Perfect day for all ages!",
    date: "February 2024",
    avatar: "JL",
  },
  {
    id: 3,
    name: "Marcus R.",
    rating: 5,
    quote:
      "Sky Rider 360 is the most insane thing I've ever experienced. My hands were shaking for an hour after!",
    date: "January 2024",
    avatar: "MR",
  },
  {
    id: 4,
    name: "Priya K.",
    rating: 4,
    quote:
      "Splash World was a lifesaver on a hot July day. The lazy river is so relaxing after the big rides.",
    date: "July 2023",
    avatar: "PK",
  },
  {
    id: 5,
    name: "Tom & Dana W.",
    rating: 5,
    quote:
      "Annual pass worth every penny. We've been 8 times this year already. The staff is incredibly friendly.",
    date: "December 2023",
    avatar: "TD",
  },
  {
    id: 6,
    name: "Aisha B.",
    rating: 5,
    quote:
      "The park is immaculate! Clean, organized, and the food is actually really good. Mega Drop = pure terror 😂",
    date: "October 2023",
    avatar: "AB",
  },
  {
    id: 7,
    name: "Carlos & Elena M.",
    rating: 4,
    quote:
      "Amazing experience! The interactive map on the website helped us plan our day perfectly. Zero wasted time.",
    date: "August 2023",
    avatar: "CE",
  },
  {
    id: 8,
    name: "Zoe F.",
    rating: 5,
    quote:
      "I came alone for my birthday and made friends in the queue! The atmosphere here is unlike anywhere else.",
    date: "September 2023",
    avatar: "ZF",
  },
];

const marqueeQuotes = [
  "Zero to 80mph in 2.8 seconds 🔥",
  "Best park on the East Coast!",
  "Came back 8 times this year ⚡",
  "The kids haven't stopped talking about it!",
  "Sky Rider 360 = INSANE 🎢",
  "Clean, fast, friendly staff 💯",
  "Worth every penny of the annual pass",
];

const avatarColors = [
  "#5B21B6",
  "#0EA5E9",
  "#EF4444",
  "#F97316",
  "#10B981",
  "#7C3AED",
  "#EC4899",
  "#0284C7",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          fill={i <= rating ? "#F97316" : "none"}
          stroke={i <= rating ? "#F97316" : "#d1d5db"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  index,
}: { review: (typeof reviews)[0]; index: number }) {
  return (
    <div
      className="break-inside-avoid mb-4 rounded-xl p-6 transition-smooth hover:-translate-y-1"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(91,33,182,0.1)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
      }}
      data-ocid={`stories.item.${index + 1}`}
    >
      {/* Header: avatar + name + date */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold"
          style={{
            background: `${avatarColors[index % avatarColors.length]}15`,
            border: `1.5px solid ${avatarColors[index % avatarColors.length]}50`,
            color: avatarColors[index % avatarColors.length],
          }}
          aria-hidden="true"
        >
          {review.avatar}
        </div>
        <div className="min-w-0">
          <p
            className="font-heading font-bold text-sm truncate"
            style={{ color: "#1C1C2E" }}
          >
            {review.name}
          </p>
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            {review.date}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <StarRating rating={review.rating} />
      </div>

      <p
        className="text-sm italic leading-relaxed line-clamp-4"
        style={{ color: "#4B5563" }}
      >
        &ldquo;{review.quote}&rdquo;
      </p>
    </div>
  );
}

export default function StoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 },
    );

    for (const el of section.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right",
    )) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const allMarqueeQuotes = [
    ...marqueeQuotes.map((q, i) => ({ text: q, uid: `a-${i}` })),
    ...marqueeQuotes.map((q, i) => ({ text: q, uid: `b-${i}` })),
  ];

  return (
    <section
      ref={sectionRef}
      id="stories"
      className="py-24 relative overflow-hidden"
      style={{ background: "#FAFAF5" }}
      data-ocid="stories.section"
    >
      {/* Warm ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(249,115,22,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6 reveal">
          <p
            className="font-mono text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "#F97316" }}
          >
            GUEST STORIES
          </p>
          <h2
            className="font-display text-5xl md:text-7xl tracking-wider mb-8"
            style={{ color: "#1C1C2E" }}
          >
            REAL THRILLS, REAL PEOPLE
          </h2>

          {/* Overall Rating */}
          <div className="inline-flex flex-col items-center gap-2">
            <div className="flex items-baseline gap-3">
              <span
                className="font-display text-6xl md:text-7xl"
                style={{
                  color: "#F97316",
                  textShadow: "0 0 20px rgba(249,115,22,0.3)",
                }}
              >
                4.9
              </span>
              <span
                className="font-display text-3xl md:text-4xl"
                style={{ color: "#d1d5db" }}
              >
                / 5.0
              </span>
            </div>
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={22}
                  fill="#F97316"
                  stroke="#F97316"
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <p
              className="font-mono text-xs tracking-wide"
              style={{ color: "#9ca3af" }}
            >
              Based on 12,847 reviews
            </p>
          </div>
        </div>

        {/* Marquee Strip */}
        <div
          className="relative mb-14 reveal"
          style={{ animationDelay: "0.15s" }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, #FAFAF5, transparent)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, #FAFAF5, transparent)",
            }}
            aria-hidden="true"
          />

          <div
            className="overflow-hidden py-3"
            style={{
              borderTop: "1px solid rgba(249,115,22,0.25)",
              borderBottom: "1px solid rgba(249,115,22,0.25)",
            }}
            aria-label="Guest quote highlights"
          >
            <div
              className="animate-marquee whitespace-nowrap inline-block"
              aria-hidden="true"
            >
              {allMarqueeQuotes.map((item) => (
                <span
                  key={item.uid}
                  className="inline-flex items-center gap-2 mr-12"
                >
                  <span
                    className="font-mono text-xs font-semibold tracking-wide"
                    style={{ color: "#F97316" }}
                  >
                    ★
                  </span>
                  <span
                    className="text-sm font-body"
                    style={{ color: "#4B5563" }}
                  >
                    {item.text}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Masonry Grid */}
        <div
          className="columns-1 md:columns-2 lg:columns-3 gap-4 mb-14"
          data-ocid="stories.list"
        >
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Social Proof CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal">
          <button
            type="button"
            className="group flex items-center gap-3 px-6 py-3.5 rounded-xl font-heading font-semibold text-sm transition-smooth hover:scale-105 active:scale-95"
            style={{
              background: "rgba(236,72,153,0.06)",
              border: "1px solid rgba(236,72,153,0.3)",
              color: "#DB2777",
              boxShadow: "0 2px 12px rgba(236,72,153,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 24px rgba(236,72,153,0.25)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(236,72,153,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 2px 12px rgba(236,72,153,0.08)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(236,72,153,0.3)";
            }}
            aria-label="Follow ThrillWorldPark on Instagram"
            data-ocid="stories.instagram_button"
          >
            <Camera size={18} strokeWidth={2} />
            Follow @ThrillWorldPark on Instagram
          </button>

          <button
            type="button"
            className="group flex items-center gap-3 px-6 py-3.5 rounded-xl font-heading font-semibold text-sm transition-smooth hover:scale-105 active:scale-95"
            style={{
              background: "rgba(14,165,233,0.06)",
              border: "1px solid rgba(14,165,233,0.3)",
              color: "#0284C7",
              boxShadow: "0 2px 12px rgba(14,165,233,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(14,165,233,0.12)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(14,165,233,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(14,165,233,0.06)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(14,165,233,0.3)";
            }}
            aria-label="Watch ride videos on TikTok"
            data-ocid="stories.tiktok_button"
          >
            <Video size={18} strokeWidth={2} />
            Watch Ride Videos on TikTok
          </button>
        </div>
      </div>
    </section>
  );
}
