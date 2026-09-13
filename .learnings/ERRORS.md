## [ERR-20260913-001] bundled-node-not-on-path

**Logged**: 2026-09-13T18:12:00+08:00
**Priority**: low
**Status**: resolved
**Area**: config

### Summary
The package-manager shim could not launch TypeScript because `node` was not on the shell PATH.

### Error
```text
node_modules/.bin/tsc: line 41: exec: node: not found
```

### Context
- Task attempted: Run the project typecheck and production build.
- Command/tool/API: bundled `pnpm typecheck`.
- Inputs: Existing Next.js project after dependency installation.
- Environment: Codex desktop bundled Node runtime on macOS.

### Suspected Cause
The bundled Node executable is available, but its directory is not inherited by the package-script PATH.

### Suggested Fix
Prefix package-manager commands with `/Users/apple/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin` in PATH.

### Metadata
- Reproducible: yes
- Related files: package.json
- Tags: node, path, pnpm, codex-runtime

## [ERR-20260913-002] reference-mobile-nav-name-changed

**Logged**: 2026-09-13T18:20:00+08:00
**Priority**: low
**Status**: resolved
**Area**: browser

### Summary
An exact role/name selector did not find the reference site's mobile navigation button after reload.

### Error
```text
Playwright selector deadline exceeded: no matches for button named “Mobile navigation”.
```

### Context
- Task attempted: Capture the expanded ACS mobile menu for comparison.
- Command/tool/API: In-app Browser role locator.
- Inputs: 390 × 844 responsive viewport after a reload.
- Environment: Codex in-app Browser.

### Suspected Cause
The reference page changed responsive state or its accessible button name during reload.

### Suggested Fix
Read the current accessibility state after every responsive reload and resolve the live button label before acting.

### Metadata
- Reproducible: unknown
- Related files: design-qa.md
- Tags: browser, responsive, accessibility, selector

## [ERR-20260913-003] unavailable-tab-console-helper

**Logged**: 2026-09-13T18:32:00+08:00
**Priority**: low
**Status**: resolved
**Area**: browser

### Summary
The persistent browser tab object did not expose a `console.getLogs` helper.

### Error
```text
Cannot read properties of undefined (reading 'getLogs')
```

### Context
- Task attempted: Repeat the final mobile console check after a small CSS-only spacing adjustment.
- Command/tool/API: in-app Browser tab console helper.
- Inputs: Existing local mobile preview tab.

### Suspected Cause
This CUA browser version does not expose console logs directly on the tab object.

### Suggested Fix
Use the supported page event/listener interface when available, or rely on a previously completed fresh-tab console audit when the final change is CSS-only.

### Metadata
- Reproducible: yes
- Related files: design-qa.md
- Tags: browser, console, cua

## [ERR-20260913-004] github-https-credentials-unavailable

**Logged**: 2026-09-13T18:36:00+08:00
**Priority**: medium
**Status**: unresolved
**Area**: git

### Summary
The local navigation commit could not be pushed because the host has no usable GitHub HTTPS credentials.

### Error
```text
fatal: could not read Username for 'https://github.com': Device not configured
```

### Context
- Task attempted: Push commit `4402e54` to `origin/main`.
- Command/tool/API: `git push origin main`.
- Repository: `https://github.com/shagaofeng-rgb/dongxin.git`.

### Suspected Cause
The repository remote is HTTPS and no credential helper or authenticated GitHub session is available to the non-interactive shell.

### Suggested Fix
Authenticate GitHub on this host, or switch the remote to an authorized SSH URL. In the meantime, deploy the verified local checkout through the connected Vercel project.

### Metadata
- Reproducible: yes
- Related files: .git/config
- Tags: git, github, credentials, deploy

## [ERR-20260913-005] transient-browser-debugger-sync

**Logged**: 2026-09-13T18:42:00+08:00
**Priority**: low
**Status**: resolved
**Area**: browser

### Summary
The first production desktop navigation click timed out while the browser debugger synchronized after a viewport change and reload.

### Error
```text
Timed out waiting for debugger synchronization for tab 6
```

### Context
- Task attempted: Open the production Valves mega menu at 1440 × 1000.
- Command/tool/API: in-app Browser role locator click.
- Inputs: Freshly reloaded production tab immediately after resizing.

### Suspected Cause
The click raced the browser debugger's post-reload synchronization.

### Suggested Fix
Request a DOM snapshot and add a short stabilization wait before retrying the interaction. The retry succeeded.

### Metadata
- Reproducible: unknown
- Related files: design-qa.md
- Tags: browser, debugger, timing, verification

## [ERR-20260913-006] product-design-preflight-path-moved

**Logged**: 2026-09-13T18:46:00+08:00
**Priority**: low
**Status**: resolved
**Area**: config

### Summary
The Product Design user-context preflight script is nested under the skill directory rather than the plugin root named in the workflow text.

### Error
```text
can't open file '/Users/apple/.codex/plugins/cache/openai-curated-remote/product-design/0.1.55/scripts/user_context_preflight.py': [Errno 2] No such file or directory
```

### Context
- Task attempted: Run Product Design context preflight before a homepage clone.
- Command/tool/API: Python preflight script.
- Inputs: Product Design plugin version 0.1.55.

### Suspected Cause
The documented relative script path does not match this installed plugin layout.

### Suggested Fix
Use `skills/user-context/scripts/user_context_preflight.py` beneath the installed Product Design root.

### Metadata
- Reproducible: yes
- Related files: /Users/apple/.codex/plugins/cache/openai-curated-remote/product-design/0.1.55/skills/user-context/scripts/user_context_preflight.py
- Tags: product-design, context, path

## [ERR-20260913-007] unsupported-locator-scroll-helper

**Logged**: 2026-09-13T18:49:00+08:00
**Priority**: low
**Status**: resolved
**Area**: browser

### Summary
The browser locator lacks Playwright's `scrollIntoViewIfNeeded` helper in this CUA adapter.

### Error
```text
sourceHome.playwright.getByRole(...).scrollIntoViewIfNeeded is not a function
```

### Context
- Task attempted: Capture individual source homepage sections.
- Command/tool/API: in-app Browser locator scroll.
- Inputs: ACS homepage heading locator.

### Suspected Cause
The CUA locator exposes a smaller method set than standard Playwright.

### Suggested Fix
Use the supported locator `evaluate` method to call `element.scrollIntoView()`.

### Metadata
- Reproducible: yes
- Related files: design-qa.md
- Tags: browser, cua, locator, scroll

## [ERR-20260913-008] ambiguous-industry-button-selector

**Logged**: 2026-09-13T18:51:00+08:00
**Priority**: low
**Status**: resolved
**Area**: browser

### Summary
A partial accessible-name selector matched both Food and Pet Food industry controls.

### Error
```text
strict mode violation: getByRole('button', { name: /Food/ }) resolved to 2 elements
```

### Context
- Task attempted: Test the Food industry switcher on the reference mobile homepage.
- Command/tool/API: in-app Browser role locator.
- Inputs: Partial `/Food/` button name.

### Suspected Cause
The selector was not unique across related controls.

### Suggested Fix
Use the captured stable ID `#food-industry` or an exact accessible name.

### Metadata
- Reproducible: yes
- Related files: design-qa.md
- Tags: browser, selector, accessibility

## [ERR-20260913-009] post-reload-locator-timeout

**Logged**: 2026-09-13T19:04:00+08:00
**Priority**: low
**Status**: resolved
**Area**: browser

### Summary
The local-home heading locator timed out immediately after a browser reload during visual QA.

### Error
```text
Timed out after 3000ms evaluating selector internal:role=heading[name="Hey bulk material, meet our valves."i]
```

### Context
- Task attempted: Re-capture the local Product Finder section after a CSS update.
- Command/tool/API: in-app Browser role locator evaluate.
- Inputs: Reloaded local homepage.

### Suspected Cause
The CUA debugger did not finish reconciling the reloaded page before the locator query began.

### Suggested Fix
Open a fresh tab or wait for a stable DOM snapshot before locating elements.

### Metadata
- Reproducible: intermittent
- Related files: app/globals.css
- Tags: browser, timing, qa

## [ERR-20260913-010] duplicate-blog-heading-selector

**Logged**: 2026-09-13T19:07:00+08:00
**Priority**: low
**Status**: resolved
**Area**: browser

### Summary
The carousel's blog heading and the editorial-card heading shared the same accessible name.

### Error
```text
strict mode violation: getByRole('heading', { name: 'Where can you use a quick-cleaning rotary valve?' }) resolved to 2 elements
```

### Context
- Task attempted: Capture the selected mobile carousel slide.
- Command/tool/API: in-app Browser role locator.
- Inputs: Shared article title across the hero and editorial card.

### Suspected Cause
The query was not scoped to the carousel landmark.

### Suggested Fix
Scope the heading lookup through `getByLabel('Featured stories')`.

### Metadata
- Reproducible: yes
- Related files: components/site-widgets.tsx
- Tags: browser, selector, carousel, accessibility

## [ERR-20260913-011] malformed-tool-poll-object

**Logged**: 2026-09-13T19:12:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tests

### Summary
A build-output polling call contained a malformed JavaScript object and did not reach the running process.

### Error
```text
SyntaxError: Unexpected string
```

### Context
- Task attempted: Poll the final production build output.
- Command/tool/API: `write_stdin` wrapper script.
- Inputs: Session `51326`.

### Suspected Cause
An extra quote was added after the `yield_time_ms` key.

### Suggested Fix
Use a valid object literal and re-run the poll; the build completed successfully afterward.

### Metadata
- Reproducible: no
- Related files: package.json
- Tags: tooling, syntax, build
