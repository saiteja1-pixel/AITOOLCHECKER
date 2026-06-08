# 🤖 AI Tools Directory

A stunning, production-ready Next.js app that lists the best AI tools with search, filter, and category browsing.

## ✨ Features

- **28 curated AI tools** across 10 categories
- **Live search** with keyboard shortcut (⌘K)
- **Category filtering** with scrollable pill nav
- **Sort** by featured / free-first / A–Z
- **Free-only filter** toggle
- **Featured tools** section
- **Responsive** — mobile-first design
- **Dark theme** with smooth animations
- **Ready to deploy** on Vercel

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev
# → Open http://localhost:3000
```

## 📦 Deploy to Vercel

### Option A — Vercel CLI (fastest)
```bash
npm install -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit: AI Tools Directory"
git remote add origin https://github.com/YOUR_USERNAME/ai-tools-directory.git
git push -u origin main
```
Then go to [vercel.com](https://vercel.com) → Import Git Repository → select your repo → Deploy.

No configuration needed — Vercel auto-detects Next.js.

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Fonts | Clash Display + Satoshi |
| Icons | Lucide React |
| Data | Static TypeScript |
| Deploy | Vercel |

## 📂 Project Structure

```
ai-tools-directory/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Main page (client component)
│   ├── globals.css         # Custom styles + animations
│   └── category/[slug]/
│       └── page.tsx        # Category detail pages
├── components/
│   ├── Navbar.tsx          # Sticky transparent navbar
│   ├── ToolCard.tsx        # Animated tool cards
│   ├── CategoryFilter.tsx  # Scrollable category pills
│   ├── SearchBar.tsx       # Search with glow effect
│   └── StatsBar.tsx        # Animated stats row
├── data/
│   └── tools.ts            # All tool data + categories
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## ➕ Adding More Tools

Edit `data/tools.ts` and add entries to the `tools` array:

```ts
{
  id: "29",
  name: "Your Tool",
  description: "What it does.",
  url: "https://yourtool.com",
  category: "code",           // see categories list
  tags: ["tag1", "tag2"],
  logo: "🛠️",               // emoji or letter
  free: true,
  featured: false,
}
```

## 🔮 Enhancement Ideas

- Add Supabase / PlanetScale for dynamic data
- Tool submission form with Airtable or Resend
- User ratings and bookmarks
- Weekly newsletter
- Dark/light mode toggle
