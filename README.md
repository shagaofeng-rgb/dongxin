# Dongxin Machinery website

Next.js App Router website and Chinese-language operations dashboard for qzdxrv.com.

## Local development

```sh
pnpm install
pnpm dev
pnpm typecheck
pnpm build
```

Set the values described in `.env.example` in a local `.env.local` file. Never commit live credentials. The public website can render without the operations backend; analytics and inquiry submission require Supabase configuration.

## Main areas

- `app/`: public pages, metadata, sitemap, robots, API routes and administration routes.
- `components/site-header.tsx`, `site-footer.tsx`, `app/globals.css`: shared public navigation, responsive layout and styling.
- `lib/catalogue.ts` and `lib/product-technical-data.ts`: published product, industry, option and article data. These files are the current source of truth for the read-only content views in the dashboard.
- `lib/analytics.ts`, `components/analytics-tracker.tsx`, `app/api/analytics/event/route.ts`: anonymous visit, page-duration and WhatsApp-click collection.
- `app/api/inquiries/route.ts`: contact and quote submissions stored in Supabase. Email addresses displayed on the site are for direct contact; form submission does not send email.
- `app/admin/`: protected dashboard with date filters, paginated inquiries and visitor records, visit detail, and read-only content lists.
- `supabase/migrations/`: operations database schema and access grants.

The gallery contains product images, not interactive 3D files. Video, technical-document and career content is shown as unavailable or directs visitors to the team when an approved asset is not published. Do not present an unavailable file as a download.

## Verification

```sh
pnpm typecheck
pnpm build
node scripts/audit-public-site.mjs https://qzdxrv.com
```

The site audit checks sitemap pages, page metadata, headings and internal link status. Browser inspection is still required for interaction and responsive visual checks. See `docs/audit-2026-10-24.md` for the latest audit record.

## Deployment

The repository is connected to Vercel; production runs at https://qzdxrv.com. Deploy a tested build, verify it, and promote it to the production domain. Supabase operations data is stored in the dedicated project configured through server-side environment variables.
