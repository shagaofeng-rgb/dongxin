# Design QA

Date: 2026-09-12. Target: local Next.js preview on port 3000.
Source URL is in the task conversation; it is not embedded in production code.

## Result

final result: blocked

The previous browser connection failure is resolved. This status now means the **all-page 1:1 completion gate is not satisfied**, not that the local site cannot run. The work should be presented as a progress preview, not a completed clone.

## Evidence

- Source desktop: 1280 × 720. Source mobile: 390 × 844.
- Local desktop: 1280 × 720. Local mobile: 390 × 844; document layout width 375 with the browser scrollbar.
- Source and local catalogue first-screen screenshots were emitted together for comparison.
- Source/local product detail, homepage, quote and mobile states were inspected in the connected browser during the task.
- Evidence images are in the task tool history, not exported as a screenshot archive.
- Full-page source captures with unloaded images support section order only.
- Font comparison: catalogue source heading measured 44.16 px, weight 700. Local heading corrected from 48 px and a two-line wrap to a comparable single-line layout.

## Verified implementation behavior

- TypeScript no-emit check passed.
- Production build passed again after the final navigation and sitemap changes.
- Sitemap HTTP check: 79 canonical pages return 200 and include an h1.
- Twelve mobile templates checked: home, options, option detail, food industry, resources, about, blog, support, quote, models, sizing, contact. No document-level horizontal overflow or Next.js error overlay in those checks.
- Product detail mobile document width corrected from 741 to 375 px. The intentionally wide specification table scrolls inside its own container.
- Search with no matching term gives zero cards and an empty state; clearing restores products.
- Plastics filter gives 24 results based on preview data; alphabetical sorting changes the first card. This is NOT validation of reference catalogue classifications.
- Mobile filter panel expands; navigation and a separately toggleable submenu open; choosing Rotors navigates and closes the menu.
- Download placeholder opens a native dialog and closes correctly.
- Quote form blocks empty required fields; synthetic local data passes validation and produces explicit unsent status.
- Three-step sizing demonstration gives 33.33 ft³/hour for 1000 PPH, 50 lb/ft³, 60% filling efficiency.
- Model search narrows to one rotor; its explicit missing-model dialog opens.
- Browser console logs were not exhaustively checked. Absence of an error overlay is not a complete console audit.

## Open gate issues

| Priority | Finding | Next work |
|---|---|---|
| P1 | Complete source route inventory and archive not migrated; only 6 preview articles. | Capture every in-scope route and populate real entries. |
| P1 | Several paragraphs and detail bodies are generic preview copy. User requested unchanged English copy apart from branding. | Resolve content rights and restore approved text, then compare line wrapping. |
| P1 | Every template/state has not received paired desktop and mobile visual comparison. | Complete fixed-viewport captures and interaction matrix; compare all sections. |
| P1 | Models, files, videos and external form services are unconnected. | Supply approved assets and service configuration; verify the intended flows. |
| P2 | Commercial reference font is replaced by Montserrat; some line breaks differ. | Provide licensed font or approve substitute and adjust metrics. |
| P2 | Branded imagery removed; several slots share neutral placeholders. Generated hero replaces original footage. | Replace with approved media in preserved layout slots. |
| P2 | Product specifications, classification tags and sizing behavior are preview data. | Verify with source evidence and approved engineering data. |
| P2 | Some reference secondary pages and lower-page states remain incompletely captured. | Continue source capture before claiming those templates faithful. |

## Fixed during QA

- Narrow-grid intrinsic sizing no longer widens the entire mobile product detail.
- Industry FAQ percentage columns now account for their gutter.
- Catalogue title size, guide-card icon size and search/result spacing corrected.
- Separate mobile submenu controls added and tested.
- Legacy contact URL aliases now resolve before the dynamic contact template returns 404.
- Original company footage, marked product renders and certification badges removed from public assets.
- Production source contains no hardcoded original manufacturer name, original contact endpoints or original tracking code.

## Final build

Final next build passed: compiled successfully, TypeScript passed, 83 generated build entries. The sitemap contains 79 canonical content routes. No all-page fidelity pass is claimed.
