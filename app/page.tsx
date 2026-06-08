"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import { tools, categories } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import Navbar from "@/components/Navbar";
import StatsBar from "@/components/StatsBar";
import { Sparkles, SlidersHorizontal, X } from "lucide-react";

type SortOption = "default" | "free-first" | "featured" | "name";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("default");
  const [freeOnly, setFreeOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut ⌘K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>(".search-input");
        input?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const cat of categories.slice(1)) {
      map[cat.slug] = tools.filter((t) => {
        if (freeOnly && !t.free) return false;
        return t.category === cat.slug;
      }).length;
    }
    return map;
  }, [freeOnly]);

  const filtered = useMemo(() => {
    let result = tools.filter((tool) => {
      const matchCat = category === "all" || tool.category === category;
      const matchFree = !freeOnly || tool.free;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some((t) => t.includes(q)) ||
        tool.category.includes(q);
      return matchCat && matchFree && matchSearch;
    });

    if (sort === "free-first") result = [...result].sort((a, b) => (b.free ? 1 : 0) - (a.free ? 1 : 0));
    else if (sort === "featured") result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    else if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [search, category, sort, freeOnly]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setCategory("all");
    setSort("default");
    setFreeOnly(false);
  }, []);

  const hasActiveFilters = search || category !== "all" || sort !== "default" || freeOnly;

  const featuredTools = useMemo(() => tools.filter((t) => t.featured), []);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-20 px-4 hero-grid">
        {/* Ambient orbs */}
        <div className="orb w-96 h-96 bg-electric/20 top-[-80px] left-[-80px]" style={{ animationDelay: "0s" }} />
        <div className="orb w-80 h-80 bg-accent/15 top-20 right-[-60px]" style={{ animationDelay: "2s" }} />
        <div className="orb w-64 h-64 bg-accent-cool/10 bottom-[-40px] left-1/3" style={{ animationDelay: "4s" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric/10 border border-electric/20 text-electric text-xs font-medium mb-6 animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <Sparkles size={12} />
            <span>28 Curated AI Tools — Updated 2024</span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up"
            style={{
              fontFamily: "var(--font-clash, serif)",
              animationDelay: "80ms",
            }}
          >
            <span className="text-cream">Discover the</span>
            <br />
            <span className="gradient-text">Best AI Tools</span>
          </h1>

          <p
            className="text-cream/50 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            Every AI tool worth knowing — curated across images, video, writing,
            code, audio, and beyond. Find exactly what you need, fast.
          </p>

          {/* Search */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {/* Quick filters */}
          <div
            className="flex items-center justify-center gap-2 mt-5 flex-wrap animate-fade-up"
            style={{ animationDelay: "320ms" }}
          >
            {["image", "video", "code", "music", "chat"].map((q) => (
              <button
                key={q}
                onClick={() => setSearch(q)}
                className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-cream/50 hover:text-cream hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-4xl mx-auto px-4 -mt-2 mb-10">
        {mounted && <StatsBar />}
      </section>

      {/* ── FEATURED ── */}
      {!search && category === "all" && (
        <section className="max-w-7xl mx-auto px-4 mb-12">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-gold text-sm">★</span>
            <h2
              className="text-sm font-semibold text-cream/70 uppercase tracking-widest"
              style={{ fontFamily: "var(--font-clash, serif)" }}
            >
              Featured Tools
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 cards-grid">
            {featuredTools.slice(0, 8).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* ── FILTERS BAR ── */}
      <section
        id="tools"
        className="sticky top-16 z-40 bg-ink/80 backdrop-blur-xl border-y border-white/5 px-4 py-3"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          {/* Category scroll */}
          <CategoryFilter
            active={category}
            onChange={setCategory}
            counts={counts}
          />

          {/* Sort / filter controls */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Free toggle */}
              <button
                onClick={() => setFreeOnly(!freeOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                  freeOnly
                    ? "badge-free border-accent-cool/30"
                    : "bg-white/5 border-white/10 text-cream/50 hover:text-cream hover:bg-white/10"
                }`}
              >
                <span>✦</span> Free Only
              </button>

              {/* Sort select */}
              <div className="relative">
                <SlidersHorizontal
                  size={12}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-cream/40 pointer-events-none"
                />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="pl-7 pr-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 text-cream/60 focus:outline-none focus:border-electric/40 appearance-none cursor-pointer hover:bg-white/10 transition-all"
                >
                  <option value="default">Sort: Default</option>
                  <option value="featured">Sort: Featured</option>
                  <option value="free-first">Sort: Free First</option>
                  <option value="name">Sort: A–Z</option>
                </select>
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all duration-200"
                >
                  <X size={10} /> Clear
                </button>
              )}
            </div>

            <span className="text-xs text-cream/30">
              {filtered.length} tool{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* ── TOOLS GRID ── */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-24 animate-fade-in">
            <div className="text-5xl mb-4">🔍</div>
            <h3
              className="text-xl font-semibold text-cream mb-2"
              style={{ fontFamily: "var(--font-clash, serif)" }}
            >
              No tools found
            </h3>
            <p className="text-cream/40 mb-6">Try a different search or category</p>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-full bg-electric/10 border border-electric/20 text-electric text-sm hover:bg-electric/20 transition-all"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 cards-grid">
            {filtered.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>

      {/* ── SUBMIT SECTION ── */}
      <section
        id="submit"
        className="max-w-3xl mx-auto px-4 pb-24 text-center"
      >
        <div className="bg-gradient-to-br from-electric/10 via-ink-soft to-accent/10 border border-white/10 rounded-3xl p-10">
          <div className="text-4xl mb-4">🚀</div>
          <h2
            className="text-2xl font-bold text-cream mb-3"
            style={{ fontFamily: "var(--font-clash, serif)" }}
          >
            Know a great AI tool?
          </h2>
          <p className="text-cream/50 mb-6 text-sm leading-relaxed">
            Help the community discover it. Submit your favorite AI tool and
            we&apos;ll review it for inclusion in the directory.
          </p>
          <a
            href="mailto:submit@aitoolsdirectory.com?subject=Submit AI Tool"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-electric to-accent text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-electric/25"
          >
            <Sparkles size={16} />
            Submit a Tool
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-electric to-accent flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
            <span
              className="text-sm text-cream/50"
              style={{ fontFamily: "var(--font-clash, serif)" }}
            >
              AITools Directory
            </span>
          </div>
          <p className="text-xs text-cream/30">
            Built with Next.js · Deployed on Vercel · {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4 text-xs text-cream/40">
            <a href="#" className="hover:text-cream transition-colors">Privacy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
