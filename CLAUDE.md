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

Three self-contained HTML pages — each has its own inline `<style>` and `<script>` (no shared `css/` or `js/` files):

| File | Purpose |
|---|---|
| `index.html` | Full single-page site (hero → services → about → loans & savings → calculators → news → gallery → CTA → contact → footer) |
| `team.html` | Standalone page: management team + board of directors |
| `join.html` | Standalone page: open-an-account flow |

### CSS Variables (defined in `:root`, duplicated per page)
Each page defines its own `:root` block with the same palette: `var(--green)`, `var(--green-dark)`, `var(--gold)`, `var(--dark)`, `var(--text)`, `var(--muted)`, etc. Since the block is duplicated, a palette change must be applied to all three files.

### JS Data Objects (inline `<script>` in `index.html`)
- `loanRules` — loan products, each with `monthly_rate`, `method` (`reducing_balance` or `straight_line`), `maxTenor`, and eligibility logic
- `fdTiers` — Fixed Deposit rates tiered by principal amount × term (91/182/365 days)

Update these objects when rates change; the calculator UI derives everything from them.

### Contact Form
Uses [Formspree](https://formspree.io) with form ID `mzdalber`. No backend required.

### External Dependencies (CDN only)
- Google Fonts: DM Sans + Playfair Display
- Font Awesome 6.5.1 (`team.html`, `join.html`)

### Gallery / Lightbox
The gallery section in `index.html` uses a masonry grid. Photos in `images/Yaase Community Outreach/` are wired into the lightbox via `data-album="community-outreach"`.

### SEO / Metadata
Each page's `<head>` carries its own `<meta name="description">`, Open Graph/Twitter tags, canonical URL, and favicon/`apple-touch-icon` (all pointing at `images/logo.jpg`). `robots.txt` and `sitemap.xml` live at the repo root and assume the site is served from `https://stmartindeporresccu.com/` — update all three if the domain changes.

## Content Update Guide

### Loan / FD Rates
Edit `loanRules` and `fdTiers` in the inline `<script>` in `index.html`.

### Team Photos
In `team.html`, replace `<div class="team-photo-placeholder">` with `<img src="images/..." alt="...">` inside the `.team-photo` wrapper. The CEO card uses `.ceo-card` for a special gold-border style.

### Gallery Photos
Add `<img>` tags inside `.gallery-item` divs in `index.html`. Set `data-album` to match the filter tab value.
