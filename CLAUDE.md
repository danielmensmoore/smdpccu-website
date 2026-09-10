# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **St. Martin De Porres Co-operative Credit Union Ltd.** ("The Happy Family"), Kumasi, Ghana. No build system — pure HTML/CSS/JS, deployable by dropping files onto any static host (Netlify, GitHub Pages, cPanel).

## Development

No build step. Open `index.html` directly in a browser, or use any static file server:

```bash
# Python (if available)
python -m http.server 8080

# Node (if available)
npx serve .
```

There are no linters, test runners, or package managers configured.

## Architecture

Six HTML pages sharing one stylesheet and one script, plus page-specific inline `<style>`/`<script>`:

| File | Purpose |
|---|---|
| `index.html` | Full single-page site (hero → services → about → loans & savings → calculators → news → branches → contact → footer) |
| `team.html` | Standalone page: management team + board of directors |
| `join.html` | Standalone page: open-an-account flow |
| `privacy.html`, `terms.html` | Legal pages |
| `404.html` | Minimal not-found page (overrides a few shared header/footer styles inline) |
| `css/styles.css` | Shared CSS: reset, `:root` palette, top bar, main nav, ticker, sub nav, section labels/titles, `.page-hero`, `.btn-hero`, footer, `.sf` scroll fade, cookie banner, shared mobile breakpoints (960px / 640px) |
| `js/main.js` | Shared JS: `.sf` scroll fade-in, `loadTawkTo()`, cookie consent (skipped on pages without `#cookieBanner`) |

Every page links `css/styles.css` **before** its inline `<style>` and loads `js/main.js` at the end of `<body>`, after any inline page script. Put rules used by more than one page in the shared files; keep page-only rules inline.

**Cascade gotcha:** because the shared sheet loads first, an inline rule with equal specificity now beats a shared rule — including shared `@media` rules and `.sf`/`.sf.in`. Don't re-declare a shared selector inline with properties the shared mobile rules change (e.g. padding on `.subnav-links a`), and when a page component also carries `.sf`, use a more specific selector (see `.team-card.sf` in `team.html`).

### CSS Variables (defined once in `css/styles.css`)
The `:root` palette — `var(--green)`, `var(--green-dark)`, `var(--gold)`, `var(--dark)`, `var(--text)`, `var(--muted)`, etc. — lives only in `css/styles.css`, so a palette change is a single edit.

### JS Data Objects (inline `<script>` in `index.html`)
- `loanRules` — loan products, each with `monthly_rate`, `method` (`reducing_balance` or `straight_line`), `maxTenor`, and eligibility logic
- `fdTiers` — Fixed Deposit rates tiered by principal amount × term (91/182/365 days)

Update these objects when rates change; the calculator UI derives everything from them.

### Contact Form
Uses [Formspree](https://formspree.io) with form ID `mzdalber`. No backend required.

### External Dependencies (CDN only)
- Google Fonts: DM Sans + Playfair Display
- Font Awesome 6.5.1 (`team.html`, `join.html`)
- Tawk.to live chat widget (loaded by `js/main.js` only after the cookie banner is accepted)

### Team Photos & Lightbox
In `team.html`, each `.team-photo` with a `data-name` attribute wraps a real `<img>` and is clickable — a small inline script opens `#photoModal` with that image and name. Cards without `data-name` still show the `.team-photo-placeholder` icon (no photo yet).

### SEO / Metadata
Each page's `<head>` carries its own `<meta name="description">`, Open Graph/Twitter tags, canonical URL, and favicon/`apple-touch-icon` (all pointing at `images/logo.jpg`). `robots.txt` and `sitemap.xml` live at the repo root and assume the site is served from `https://stmartindeporresccu.com/` — update all three if the domain changes.

## Content Update Guide

### Loan / FD Rates
Edit `loanRules` and `fdTiers` in the inline `<script>` in `index.html`.

### Team Photos
In `team.html`, replace `<div class="team-photo-placeholder">` with `<img src="images/..." alt="...">` inside the `.team-photo` wrapper, and add a `data-name="..."` attribute to the `.team-photo` div so the photo-modal click handler and lightbox pick it up. The CEO card uses `.ceo-card` for a special gold-border style. Several management/board cards still show the placeholder pending real photos.
