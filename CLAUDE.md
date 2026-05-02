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

Two HTML pages share one stylesheet and one JS file:

| File | Purpose |
|---|---|
| `index.html` | Full single-page site (hero → services → about → loans & savings → calculators → news → gallery → CTA → contact → footer) |
| `team.html` | Standalone page: management team + board of directors |
| `css/styles.css` | All styles — CSS custom properties, responsive layout, gallery/lightbox, team page |
| `js/main.js` | All JS — hero slider, scroll spy, loan eligibility calculator, FD calculator, gallery/lightbox, contact form |

### CSS Variables (defined in `:root`)
The primary palette lives in `css/styles.css`. Use `var(--primary)`, `var(--primary-dark)`, `var(--accent)`, etc. **Note:** `team.html`'s footer references `var(--dark)`, which is undefined — the correct variable is `var(--primary-dark)`.

### JS Data Objects (top of `js/main.js`)
- `loanRules` — 10 loan products, each with `monthly_rate`, `method` (`reducing_balance` or `straight_line`), `maxTenor`, and eligibility logic
- `fdTiers` — Fixed Deposit rates tiered by principal amount × term (91/182/365 days)

Update these objects when rates change; the calculator UI derives everything from them.

### Contact Form
Uses [Formspree](https://formspree.io) with form ID `mzdalber`. No backend required.

### External Dependencies (CDN only)
- Google Fonts: DM Sans + Playfair Display
- Font Awesome 6.5.1

### Gallery / Lightbox
The gallery section in `index.html` uses a masonry grid. All 48 photos in `images/Yaase Community Outreach/` are wired into the lightbox via `data-album="community-outreach"`. The lightbox `<div id="lightbox">` is placed immediately before `<script src="js/main.js">`.

## Content Update Guide

### Loan / FD Rates
Edit `loanRules` and `fdTiers` at the top of `js/main.js`.

### Team Photos
In `team.html`, replace `<div class="team-photo-placeholder">` with `<img src="images/..." alt="...">` inside the `.team-photo` wrapper. The CEO card uses `.ceo-card` for a special gold-border style.

### Gallery Photos
Add `<img>` tags inside `.gallery-item` divs in `index.html`. Set `data-album` to match the filter tab value.
