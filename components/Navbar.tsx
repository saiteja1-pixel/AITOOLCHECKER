"use client";
import { useState, useEffect } from "react";
import { Sparkles, Menu, X, Github } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-accent flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-clash, serif)" }}
            >
              <span className="text-cream">AI</span>
              <span className="text-electric">Tools</span>
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#tools" className="text-sm text-cream/60 hover:text-cream transition-colors">
              Browse
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-cream/60 hover:text-cream transition-colors"
            >
              <Github size={14} />
              GitHub
            </a>
            <a
              href="#submit"
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-electric/10 text-electric border border-electric/20 hover:bg-electric/20 transition-all duration-200"
            >
              Submit Tool
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-cream/60 hover:text-cream transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-ink-soft/95 backdrop-blur-xl border-b border-white/5 px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-3">
            <a
              href="#tools"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-cream/70 hover:text-cream transition-colors py-1"
            >
              Browse Tools
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cream/70 hover:text-cream transition-colors py-1"
            >
              GitHub
            </a>
            <a
              href="#submit"
              className="text-sm font-medium text-electric py-1"
            >
              Submit a Tool
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
