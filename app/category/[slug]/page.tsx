import { tools, categories } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return categories.slice(1).map((cat) => ({ slug: cat.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat) return {};
  return {
    title: `${cat.label} AI Tools — AI Tools Directory`,
    description: `Browse the best AI tools for ${cat.label.toLowerCase()}.`,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat || cat.slug === "all") return notFound();

  const categoryTools = tools.filter((t) => t.category === params.slug);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-28 pb-20">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-cream/40 hover:text-cream transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          All Categories
        </Link>

        <div className="mb-10">
          <div className="text-5xl mb-3">{cat.icon}</div>
          <h1
            className="text-4xl font-bold text-cream mb-2"
            style={{ fontFamily: "var(--font-clash, serif)" }}
          >
            {cat.label} Tools
          </h1>
          <p className="text-cream/40">
            {categoryTools.length} tool{categoryTools.length !== 1 ? "s" : ""} in this category
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 cards-grid">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {categoryTools.length === 0 && (
          <div className="text-center py-20 text-cream/40">
            No tools in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
