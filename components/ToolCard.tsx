import { Tool } from "@/data/tools";
import { ExternalLink, Star } from "lucide-react";

export default function ToolCard({ tool }: { tool: Tool }) {
  const categoryColors: Record<string, string> = {
    "image-editing": "from-pink-500/20 to-rose-600/10 border-pink-500/20",
    "video-generation": "from-purple-500/20 to-indigo-600/10 border-purple-500/20",
    writing: "from-amber-500/20 to-yellow-600/10 border-amber-500/20",
    code: "from-cyan-500/20 to-blue-600/10 border-cyan-500/20",
    audio: "from-green-500/20 to-emerald-600/10 border-green-500/20",
    chatbot: "from-blue-500/20 to-sky-600/10 border-blue-500/20",
    research: "from-violet-500/20 to-purple-600/10 border-violet-500/20",
    design: "from-orange-500/20 to-red-600/10 border-orange-500/20",
    productivity: "from-teal-500/20 to-cyan-600/10 border-teal-500/20",
  };

  const gradientClass =
    categoryColors[tool.category] || "from-white/5 to-white/0 border-white/10";

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="tool-card group block relative bg-ink-soft rounded-2xl border border-white/8 overflow-hidden cursor-pointer animate-fade-up"
      style={{ textDecoration: "none" }}
    >
      {/* Gradient top accent */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Card shine */}
      <div className="absolute inset-0 bg-card-shine opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
              {tool.logo}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3
                  className="font-semibold text-cream text-[15px] leading-tight"
                  style={{ fontFamily: "var(--font-clash, serif)" }}
                >
                  {tool.name}
                </h3>
                {tool.featured && (
                  <Star
                    size={12}
                    className="text-gold fill-gold flex-shrink-0"
                    aria-label="Featured"
                  />
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${tool.free ? "badge-free" : "badge-paid"}`}>
                  {tool.free ? "Free tier" : "Paid"}
                </span>
              </div>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 flex-shrink-0">
            <ExternalLink size={12} className="text-cream/70" />
          </div>
        </div>

        {/* Description */}
        <p className="text-cream/50 text-[13px] leading-relaxed mb-4 line-clamp-2">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="tag-pill text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-cream/40 border border-white/8"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom border accent on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-electric via-accent to-accent-cool scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </a>
  );
}
