import { Menu, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Attractions", href: "#attractions" },
  { label: "Map", href: "#map" },
  { label: "Pricing", href: "#pricing" },
  { label: "Stories", href: "#stories" },
  { label: "Visit", href: "#visit" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      data-ocid="navbar"
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255, 255, 255, 0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(91, 33, 182, 0.15)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px rgba(91,33,182,0.12)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            data-ocid="navbar.logo_link"
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2 group bg-transparent border-0 p-0 cursor-pointer"
            aria-label="Thrill World — scroll to top"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-smooth group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #5B21B6, #F97316)",
                boxShadow: "0 0 16px rgba(91,33,182,0.45)",
              }}
            >
              <Zap size={16} fill="#fff" color="#fff" />
            </div>
            <span
              className="font-display text-2xl md:text-3xl tracking-widest"
              style={{ color: "#5B21B6" }}
            >
              THRILL WORLD
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                data-ocid={`navbar.${link.label.toLowerCase()}_link`}
                onClick={() => handleNavClick(link.href)}
                className="relative px-4 py-2 font-heading text-sm font-medium tracking-wide transition-smooth group bg-transparent border-0 cursor-pointer"
                style={{ color: "rgba(28, 28, 46, 0.7)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#5B21B6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(28, 28, 46, 0.7)";
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{
                    background: "#F97316",
                    boxShadow: "0 0 8px #F97316",
                  }}
                />
              </button>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-ocid="navbar.book_now_button"
              onClick={() => handleNavClick("#pricing")}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading text-sm font-semibold tracking-wide transition-smooth hover:scale-105 active:scale-95 cursor-pointer border-0"
              style={{
                background: "linear-gradient(135deg, #5B21B6, #7C3AED)",
                color: "#ffffff",
                boxShadow: "0 0 20px rgba(91,33,182,0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(91,33,182,0.65)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(91,33,182,0.4)";
              }}
            >
              <Zap size={14} />
              Book Now
            </button>

            <button
              type="button"
              data-ocid="navbar.mobile_menu_toggle"
              className="md:hidden p-2 rounded-lg transition-smooth bg-transparent border-0 cursor-pointer"
              style={{ color: "rgba(28,28,46,0.8)" }}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        data-ocid="navbar.mobile_menu"
        className="md:hidden overflow-hidden transition-all duration-400"
        style={{
          maxHeight: mobileOpen ? "400px" : "0",
          opacity: mobileOpen ? 1 : 0,
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(16px)",
          borderTop: mobileOpen ? "1px solid rgba(91, 33, 182, 0.15)" : "none",
          boxShadow: mobileOpen ? "0 8px 32px rgba(91,33,182,0.12)" : "none",
        }}
        aria-hidden={!mobileOpen}
      >
        <div className="px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              data-ocid={`navbar.mobile_${link.label.toLowerCase()}_link`}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left px-4 py-3 rounded-lg font-heading font-medium transition-smooth bg-transparent border-0 cursor-pointer"
              style={{ color: "rgba(28,28,46,0.8)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#5B21B6";
                e.currentTarget.style.background = "rgba(91,33,182,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(28,28,46,0.8)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 pb-1">
            <button
              type="button"
              data-ocid="navbar.mobile_book_now_button"
              onClick={() => handleNavClick("#pricing")}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full font-heading font-semibold transition-smooth border-0 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #5B21B6, #7C3AED)",
                color: "#ffffff",
                boxShadow: "0 0 20px rgba(91,33,182,0.35)",
              }}
            >
              <Zap size={16} />
              Book Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
