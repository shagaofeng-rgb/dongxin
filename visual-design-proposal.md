# Dongxin Machinery Visual Design Proposal

## Purpose and decision

Turn the current content-rich industrial catalogue into a distinctive, credible B2B experience for engineers, project managers and purchasing teams. Preserve the existing route structure and discovery tools, but replace the reference-like presentation with a Dongxin-owned visual system.

**Recommended direction: Precision Industrial.** The character is calm, exact and engineered: deep ink-blue foundations, clean white technical surfaces, restrained electric blue for interaction, and one warm safety-orange action colour. Product photography and technical visuals carry the personality; decoration stays minimal.

This specification is approved and its shared visual system has been implemented in the Next.js project. The final production deployment and browser-level visual QA are recorded separately.

## Audit basis and limits

- Reviewed current production HTML and component/route structure for home, catalogue, product and option detail, industry, resources, about, blog, support, quote, contact, model gallery, sizing and privacy routes.
- Confirmed shared patterns: sticky header, dropdown navigation, search, filters, product cards, dialogs, accordions, forms, carousel tabs and mobile menu.
- The in-app browser screenshot connection failed during this review. Therefore this remains a structural and content-led design plan, rather than a completed pixel-level visual audit. The implementation is validated by type checking, production build and route HTTP checks; capture desktop and mobile screenshots when the browser bridge is available to complete visual QA.

## Design principles

1. **Make selection easy.** Visitors should understand what to choose in seconds: material, application, product family, then quote or technical data.
2. **Make engineering evidence visible.** Specifications, models, drawings, dimensions, materials and compatibility should look like evidence, not marketing copy.
3. **Make custom work feel controlled.** Every configuration route should explain the next input required and show a confident path to an engineer.
4. **Use visual hierarchy, not more text.** A strong page title, one primary action, structured data blocks and generous space outperform repeated sales sections.
5. **Use Dongxin-owned assets.** Replace temporary machine imagery with approved product shots, plant photography, cutaways and diagrams before launch.

## Visual system

### Color

| Role | Color | Use |
|---|---|---|
| Ink | `#102736` | Header, key headings, dark panels |
| Engineering blue | `#176EAA` | Links, active tabs, primary secondary actions |
| Safety orange | `#F26B32` | One primary conversion action, warnings and key markers |
| Steel surface | `#E8EEF1` | Technical panels, filter areas, grouped content |
| Mist | `#F7F9FA` | Main page background |
| Line | `#CDD9DE` | Tables, dividers, inactive controls |
| Text | `#354B58` | Long-form reading text |

Orange is reserved for the page's most important conversion action. Blue supports navigation and discovery. This removes the current competition between multiple bright controls.

### Typography and data language

- **Headlines:** Manrope or IBM Plex Sans, 700 weight. Short, compact and measured.
- **Body/UI:** Manrope or IBM Plex Sans, 400–600 weight.
- **Technical values:** IBM Plex Mono or a restrained monospaced face only for dimensions, model numbers and capability values.
- **Desktop scale:** H1 56/60, H2 38/44, H3 24/30, body 17/28, technical label 12/16.
- **Mobile scale:** H1 36/40, H2 30/36, H3 21/28, body 16/25.

### Layout and surfaces

- 12-column desktop grid, 1280px content maximum, 24px outer gutter; 4-column mobile grid with 16px gutter.
- Use an 8px spacing scale. Primary sections use 96px desktop and 64px mobile vertical rhythm.
- Cards have 1px steel borders, 4px corner radius and almost no floating shadow. The result should feel like equipment documentation, not consumer retail.
- Keep product images on clean neutral backgrounds. Use dark ink panels only for high-value conversion or visual proof.
- Motion: 160–220ms transitions, no automatic hero carousel; respect reduced-motion preferences.

### Core components

| Component | Visual behavior |
|---|---|
| Header | 80px desktop sticky header; compact wordmark; one orange `Request a quote` button; simplified utility row; open mega-menu shows image, short category explanation and links. |
| Buttons | Primary orange filled; secondary blue outline; tertiary text + arrow. Do not use multiple filled button colours in one section. |
| Product card | 4:3 image field, family/model label, 2–3 capability tags, one clear next action. Hover raises image 4px and reveals `View configuration`. |
| Specification table | Pale steel header, monospaced values, horizontal scroll only on mobile, downloadable drawing clearly adjacent. |
| Filter | Desktop left rail; mobile bottom sheet/drawer with `Apply` and active-count. Active filters are removable chips. |
| Accordion | Technical title, short plain-language teaser, plus/minus target at least 44px. |
| Forms | White fields on mist surface; one question group per visual block; persistent step/progress label; inline error text. |
| Resource card | Strong document type badge, title, file metadata, direct action; no fake download if a file is not ready. |

## Page-by-page design plan

### 1. Home `/`

| Block | Recommended design | Primary action |
|---|---|---|
| Hero | Single full-width factory/product scene, dark left gradient, one claim, two actions. Remove autoplaying content rotation from the visual priority path. | `Browse valves` and secondary `Talk to an engineer` |
| Credibility strip | Directly below hero: configurable product, engineering support, drawings/3D, global delivery only when evidence is available. Use icon + short proof. | None |
| Product finder | Four selectable entry cards: material, application, industry, product family. The selected path updates a concise result/CTA. | `Find my valve` |
| Featured families | Six product-family cards in a horizontal grid, each with image, 2 tags and family link. | `View all valves` |
| Industry solutions | Image-led tab panel; selected industry shows challenge, recommended valve families and materials. | `Explore [industry]` |
| Configuration | Split panel showing rotor, housing, seals, drive as four technical chips around a product render. | `Configure a valve` |
| Tools | Two equal visual cards for 3D Gallery and Sizing Tool; state the real capability honestly. | Tool-specific |
| Knowledge | Three editorial cards with category, reading time and one consistent image treatment. | `View resources` |
| Final conversion | Dark ink contact panel with a brief project prompt and quote CTA; newsletter becomes secondary or is removed until genuinely connected. | `Request a quote` |

### 2. Product catalogue `/products`

- Replace the large introductory text block with a concise catalogue masthead: title, one-sentence qualifier and result count.
- Place search, industry/system filters and `Compare` in one rail; reserve the grid for products.
- Product cards show only model, category, 2 key qualifiers and an engineering-blue link. Avoid repeated generic descriptions.
- Add an optional compare tray only after real technical data is available; otherwise do not show the affordance.
- Desktop: 4-column grid; tablet: 3; mobile: 2 compact cards with a fixed `Filters (n)` trigger.

### 3. Product detail `/products/[slug]`

| Block | Recommended design |
|---|---|
| Product hero | Large product render on pale steel; model family, one-sentence application statement, 3 capability labels and quote CTA in a fixed right column. |
| Quick facts | Four compact data cells for material, discharge type, pressure/temperature and configuration availability. Do not invent values; show `Confirm with engineering` where incomplete. |
| Sticky subnav | `Overview · Configurations · Specifications · Downloads · Support` once content has real anchors. |
| Benefits | Alternating image/diagram and concise outcome statements rather than long unordered lists. |
| Options | Visual configuration matrix for rotor, seals, housing and drive; each card links to an actual option detail page. |
| Specifications | Structured technical table with unit handling, tooltips, printable/downloadable drawing beside it. |
| Related equipment | Three cards selected by application, not a generic carousel. |
| Inquiry | Dark engineering-assistance banner with selected product preserved in the quote form. |

### 4. Industry solution pages `/solutions/[slug]`

Use a repeatable `Material → Process challenge → Recommended configuration → Evidence → Quote` story:

1. Hero with an industry material texture or real application image, material chips and an application statement.
2. Three challenge cards: flow behavior, cleanliness/wear, installation constraints.
3. Recommended valves in a compact comparison row.
4. Configuration callouts with real component diagrams.
5. Materials/process resource list.
6. Industry-specific quote CTA that carries the industry into the form.

This applies separately to Chemical, Construction, Food, Pet Food, Pharmaceutical & Cosmetics and Plastics. Keep the template identical; change imagery, material chips, proof and recommended models.

### 5. Options catalogue and option detail `/options`, `/options/[slug]`

- Treat options as an **engineering configurator library**, not another product catalogue.
- The catalogue header contains category tabs: Rotors, Kits, Accessories, Conveying. A selected tab receives a blue rule and description.
- Option cards use isolated component renders with a `Compatible valve families` count.
- On details, use a component close-up, what-it-solves panel, compatibility matrix, material/finish data, industry use and related products.
- Reserve 3D as an action only when the model exists; otherwise show `Model available on request`, never a non-working promise.

### 6. Resources, video, glossary `/resources`, `/resources/[kind]`

- Create a dark ink resource masthead with a search field and file-type chips.
- Feature one approved video or guide. Use a real thumbnail, duration and transcript/status; do not show a play affordance for absent media.
- Organize resources into cards with type, product family, language, revision/date and file size when real data exists.
- Technical drawings become a filterable table on desktop and collapsible list on mobile.
- Glossary becomes an alphabet rail with short, highly readable definitions.

### 7. About `/about`

- Replace generic company storytelling with an evidence-led company page: manufacturing capability, engineering process, quality practices and service model.
- Use one authentic facility image, one team/process image and one minimal timeline only after the facts are approved.
- Keep values as icon-and-copy cards; avoid stock portraits or certification marks without proof.
- End with a `Talk to applications engineering` call to action rather than a blog dump.

### 8. Blog and article `/blog`, `/blog/[slug]`

- Blog index: editorial masthead, category filter, featured article and a 3-column grid with topic + read time.
- Article: 760px reading column, clear author/review/date only when genuine, sticky table of contents on desktop and in-flow technical diagrams.
- Place one contextual product/resource CTA after the second content section, not a product pitch in every paragraph.
- Standardize article visual language around line illustrations, sectional product photos and pull-out engineering notes.

### 9. Support `/support`

- Lead with task choice, not a generic support title: `Find documentation`, `Maintenance guidance`, `Replacement help`, `Talk to support`.
- Use four large task cards before any resource list.
- Support items show product family, problem type and document/video status.
- Present contact methods in a distinct high-contrast side panel, with response expectations only if approved.

### 10. Quote and contact `/quote`, `/contact`, `/contact/[purpose]`

- Quote is the most important conversion page: make it a calm multi-step project intake, not one intimidating form wall.
- Step 1: contact + project location. Step 2: material/process. Step 3: valve/application. Step 4: review and supporting files.
- Keep a right-side `Your project brief` summary on desktop and a compact expandable summary on mobile.
- Contact page uses three entry cards: new project, application help, existing equipment/support. Map/address appears only when real details are approved.
- Representative, consulting, design assistance and replacement pages share the same visual shell with a task-specific opening prompt.

### 11. 3D gallery `/models`

- Use a dark neutral gallery, large product tile, clear filter/search, and a visible status label: `Interactive model`, `Preview`, or `Available on request`.
- When 3D is later connected, open a full-screen viewer with model name, hotspot legend, drawings and quote CTA. Until then, do not simulate a viewer.

### 12. Sizing tool `/sizing`

- Make this a focused wizard: a side explanation panel and one input step at a time.
- Use an engineering-blue progress line, input units inline, contextual helper copy and an explicit `Estimate only — confirm with engineering` result label.
- Results show formula inputs, estimated displacement and next actions: save project, compare families, request engineering review. These actions remain disabled/hidden until backed by a real workflow.

### 13. Privacy and 404 `/privacy`, not found`

- Privacy should become the approved legal content page with a readable 720px column and date/version metadata.
- 404 should use a small technical line illustration and direct visitors to Products, Support and Contact; do not leave it as an isolated dead end.

## Functional experience plan

| Function | Proposed visual/interaction treatment | Launch requirement |
|---|---|---|
| Search | Global quick search overlay with product/resource grouping and keyboard focus. | Real indexed content or keep product-only search. |
| Navigation | Desktop mega-menu + accessible mobile accordion; current path visible. | Keyboard and focus testing. |
| Filters | Instant filter counts; mobile filter drawer; URL reflects choices. | Product taxonomy reviewed. |
| Downloads | File type, revision, size, preview and direct delivery. | Actual approved files. |
| Quote | Progressive form, validation, confirmation, selected product context. | CRM/email endpoint and privacy copy. |
| 3D models | Fullscreen viewer only for actual models; otherwise explicit status. | Hosted model files or external viewer. |
| Sizing | Guided estimate, unit handling and result summary. | Engineering-approved calculation assumptions. |
| Content | Tags, related product/resource links, reading time. | Reviewed editorial content. |

## Responsive and accessibility requirements

- Mobile has one primary action visible per screen and a 44px minimum touch target.
- Tables convert to a scrollable technical region with an explicit scroll hint; do not shrink data below readability.
- All product imagery needs specific alternative text. Decorative images use empty alt text.
- Maintain 4.5:1 body-text contrast; ensure orange is not the sole indicator of errors or selection.
- Every menu, filter, modal, accordion and wizard step needs keyboard operation, visible focus and announced state changes.
- No automatic carousel/motion unless the visitor requests it; reduced-motion support is mandatory.

## Asset and content checklist before implementation

- Approved logo package: horizontal, compact and monochrome versions.
- Real product imagery: hero, isolated renders, detail/cutaway and application installation images.
- Product technical data, compatible options, datasheets and drawings.
- Confirmed company facts, contact information, support process and compliance claims.
- Article author/date/review policy and approved content.
- Working destination for quote, file upload, downloads, model viewer and sizing review.

## Delivery sequence after approval

1. Approve this design direction, tokens and homepage/product-detail wireframe.
2. Build shared system: header, footer, buttons, forms, cards, filters, tables and responsive states.
3. Redesign Home, Product catalogue and Product detail first; test conversion path to Quote.
4. Apply templates to Industry, Options, Resources, Blog, Support and Contact.
5. Connect actual files, models, analytics and quote handling.
6. Capture desktop/mobile visual QA, content QA, accessibility pass and only then redeploy production.

## Approval decisions needed

1. Approve the **Precision Industrial** direction or request a different mood (for example: more premium/minimal, more technical/catalogue-like, or more bold/manufacturing-heavy).
2. Confirm whether the homepage should use a single conversion-led hero instead of the current rotating content treatment.
3. Confirm whether Quote should become a multi-step project intake form.
4. Supply or approve the Dongxin logo, product images and technical documents before visual implementation.
