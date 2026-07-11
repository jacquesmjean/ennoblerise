# EnnobleRise Global Trust™ — ennoblerise.org

Production Next.js site + operations platform for EnnobleRise Global Trust.

## Stack
- Next.js 15 (App Router) · TypeScript · Tailwind CSS
- Supabase (Postgres + Auth + RLS) — project `ennoblerise` (fghafljvnucxqtxrbrwy)
- Multilingual: `/en` `/fr` `/es` with automatic browser-language detection
- Fonts: Fraunces (display) + Karla (body)

## Public site
Home · About (founder story) · Programs (3 pillars) · Insights (blog, 5 migrated essays) · Donate (pledge flow, payment processor pluggable) · Join (volunteer / ambassador / partner / country) · Contact · Concierge widget (multilingual front-desk assistant) · Full SEO/GEO: JSON-LD (NGO, Person, Article), sitemap, robots, llms.txt, hreflang, 301s from legacy GoHighLevel URLs.

## Operations portal — `/portal`
Staff sign-in via Supabase Auth. Modules: Dashboard, Front Desk (inquiries), Applications, Donations, Grants (+ grant-writing workbench: LOI & full narratives), Contracts (+ generator: NDA, partnership, third-party services, scholarship), Partners & Country Chapters (onboarding pipeline), Staff.

## Develop
```bash
npm install
cp .env.example .env.local   # already contains the public keys
npm run dev
```

## Deploy (Vercel)
Import this repo in Vercel and set env vars from `.env.example`:
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`.

## First admin user
Supabase Dashboard → Authentication → Add user (email + password). A profile row is created automatically; set its role to `admin` in the `profiles` table.
