"use client";
import { categories } from "@/data/tools";
import clsx from "clsx";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoryFilter({
  active,
  onChange,
  counts,
}: {
  active: string;
  onChange: (slug: string) => void;
  counts: Record<string, number>;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex items-center gap-2 w-full">
      {/* Scroll left */}
      <button
        onClick={() => scroll("left")}
        className="hidden sm:flex flex-shrink-0 w-8 h-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-cream/50 hover:text-cream transition-all"
        aria-label="Scroll left"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Scrollable pills */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto scrollbar-hide scroll-smooth flex-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => {
          const count = cat.slug === "all" ? Object.values(counts).reduce((a, b) => a + b, 0) : (counts[cat.slug] ?? 0);
          const isActive = active === cat.slug;

          return (
            <button
              key={cat.slug}
              onClick={() => onChange(cat.slug)}
              className={clsx(
                "flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                isActive
                  ? "cat-active text-white"
                  : "bg-white/5 text-cream/60 border border-white/10 hover:bg-white/10 hover:text-cream hover:border-white/20"
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              {count > 0 && (
                <span
                  className={clsx(
                    "text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center",
                    isActive ? "bg-white/20" : "bg-white/10 text-cream/40"
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Scroll right */}
      <button
        onClick={() => scroll("right")}
        className="hidden sm:flex flex-shrink-0 w-8 h-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-cream/50 hover:text-cream transition-all"
        aria-label="Scroll right"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
