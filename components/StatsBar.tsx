import { tools, categories } from "@/data/tools";

export default function StatsBar() {
  const total = tools.length;
  const freeCount = tools.filter((t) => t.free).length;
  const catCount = categories.length - 1; // exclude "all"

  const stats = [
    { value: total, label: "Total Tools", suffix: "+" },
    { value: freeCount, label: "Free Tier", suffix: "+" },
    { value: catCount, label: "Categories", suffix: "" },
    { value: "100", label: "Curated Quality", suffix: "%" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-ink-soft px-6 py-5 text-center hover:bg-white/5 transition-colors"
        >
          <div
            className="text-2xl font-bold text-cream stat-number"
            style={{ fontFamily: "var(--font-clash, serif)" }}
          >
            <span className="gradient-text">{s.value}</span>
            <span className="text-cream/50">{s.suffix}</span>
          </div>
          <div className="text-xs text-cream/40 mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
