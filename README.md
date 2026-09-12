# Dongxin Machinery — local layout preview

English Next.js App Router site, prepared for a future GitHub repository and Vercel deployment. No repository has been pushed and no production deployment has been made.

## Current status

This is a working, source-observed layout implementation, **not a completed all-page 1:1 reproduction**. There are 79 canonical pages in the local sitemap: 26 products, 21 options, 6 industries, 6 sample articles, and supporting pages. The reference site's complete article archive and every interaction state have not been migrated or compared.

Some English paragraphs are generic preview copy, NOT a verbatim migration of the reference copy. Product specifications and category assignments are placeholders requiring review. This does not yet satisfy the requested unchanged-copy requirement. Brand-specific history, personnel, certifications and contact information have intentionally not been adopted as this company's claims.

## Run

```sh
pnpm install
pnpm dev
```

Local preview: http://localhost:3000

```sh
pnpm typecheck
pnpm build
node scripts/check-local.mjs
```

The route check requires a running dev server. It tests HTTP status and page headings, not visual fidelity.

## Where to edit

- `lib/catalogue.ts`: brand name, product names, product images, industry data, options, article entries.
- `public/media/`: local images and font files.
- `components/site-header.tsx` and `site-footer.tsx`: shared navigation.
- `app/globals.css` and `app/tools.css`: responsive layout and shared styling.
- `components/quote-form.tsx`: quote fields and local validation.
- `app/`: page templates and canonical routes.
- `reference-layout.md`: capture evidence and known source gaps.
- `design-qa.md`: checks performed and outstanding fidelity issues.
- `asset-notes.md`: temporary media, provenance and generated hero prompt.

## Preview behavior

Search, filters, sorting, mobile navigation, submenus, tabs, accordions, modal placeholders and local form validation work. Quote/contact/newsletter forms do not transmit or store information. Downloads and 3D models show explicit placeholders. The sizing flow demonstrates volume calculation; it does not select or certify an engineering configuration.

## Media and branding

A new text wordmark is centralized in the catalogue configuration. Images with observed original manufacturer marks and certification badges were removed from the public directory. Some product slots deliberately reuse unmarked placeholder renders. These pictures are not a verified inventory of Dongxin products.

The homepage and About hero use a generated industrial illustration, not an actual company facility photograph. The open-source Montserrat font substitutes for the reference's commercial typeface. Replace reference imagery and verify its use rights before publishing.

## GitHub and Vercel preparation

Push to a repository you control, then import that repository into Vercel with the Next.js framework preset. Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS domain for metadata and sitemap generation. The current fallback is example.com.

Before launch: approve copy and specifications; replace images; supply real contact details, documents and models; connect form handling; complete the privacy policy; verify content rights; finish whole-site desktop/mobile visual QA.
