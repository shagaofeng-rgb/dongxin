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
