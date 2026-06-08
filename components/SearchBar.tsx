"use client";
import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative max-w-2xl mx-auto w-full group">
      {/* Glow ring on focus */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-electric via-accent to-accent-cool rounded-2xl opacity-0 group-focus-within:opacity-60 blur transition duration-500" />

      <div className="relative bg-ink-soft border border-white/10 rounded-2xl flex items-center overflow-hidden">
        <Search
          className="ml-5 text-cream/30 group-focus-within:text-electric transition-colors duration-200 flex-shrink-0"
          size={18}
        />
        <input
          type="text"
          placeholder="Search tools, categories, tags..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input flex-1 px-4 py-4 bg-transparent text-cream placeholder-cream/30 text-sm focus:outline-none"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="mr-4 text-cream/30 hover:text-cream transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
        <div className="mr-4 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg hidden sm:block">
          <kbd className="text-xs text-cream/30 font-mono">⌘K</kbd>
        </div>
      </div>
    </div>
  );
}
