# St. Martin De Porres Co-operative Credit Union - Website

## Project Structure

```
smdpccu-website/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # All JavaScript (calculators, gallery, interactions)
├── images/
│   └── logo.jpg        # SMDPCCU logo
└── README.md           # This file
```

## Features

- **Home** — Hero section with stats and social links
- **About Us** — Mission & Vision statements
- **Management Team** — 10 team members with photo placeholders
- **Services** — 6 core service cards
- **Loans & Savings** — 8 loan products + 4 savings products with tabbed view
- **Financial Tools** — Loan Eligibility Checker & Fixed Deposit Calculator (real rates)
- **Gallery** — Filterable photo/video gallery with lightbox viewer
- **News & Blog** — Latest announcements
- **Contact** — Contact form, Google Maps, branch list, working hours
- **Floating WhatsApp** — Always-visible chat button

## How to Update Content

### Add Team Photos
Replace the placeholder divs in `index.html` inside each `.team-photo`:
```html
<!-- Replace this: -->
<div class="team-photo-placeholder">...</div>

<!-- With this: -->
<img src="images/team/ceo.jpg" alt="Mr. Justice Apenkwah">
```

### Add Gallery Photos/Videos
Replace placeholder divs inside `.gallery-item`:
```html
<!-- For photos: -->
<img src="images/gallery/agm-2025.jpg" alt="AGM 2025">

<!-- For videos: -->
<video src="videos/agm-highlights.mp4" poster="images/gallery/agm-poster.jpg"></video>
```

### Update Loan Rates or FD Rates
Edit the data objects at the top of `js/main.js`:
- `loanRules` — loan products and rates
- `fdTiers` — fixed deposit tiered rates

## Hosting Options

### Netlify (Free & Easy)
1. Zip this folder
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag and drop the zip file
4. Your site is live!

### GitHub Pages (Free)
1. Create a GitHub repository
2. Push this folder to the repo
3. Go to Settings → Pages → Deploy from main branch

### cPanel / Shared Hosting
1. Zip this folder
2. Upload via File Manager to `public_html`
3. Extract the zip

### Any Static Hosting
This is a static website (no server needed). It works on any hosting platform that serves HTML files.

## Contact Details (Current)

- **Phone:** 020 229 0588
- **Email:** enquiries@stmartindeporresccu.com
- **WhatsApp:** https://wa.me/message/YMKPBDBY4DVIL1
- **Location:** Atonsu, Monaco Junction, Kumasi
- **Facebook:** https://web.facebook.com/profile.php?id=61584511884792
- **Instagram:** @stmartindeporresccu
- **TikTok:** @stmartindeporresccu

## Built For
St. Martin De Porres Co-operative Credit Union Ltd. — *The Happy Family*
