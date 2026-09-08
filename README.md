# St. Martin De Porres Co-operative Credit Union - Website

## Project Structure

```
smdpccu-website/
├── index.html          # Main single-page site (inline styles + scripts)
├── team.html           # Management team + board of directors
├── join.html           # Open-an-account page
├── images/             # Logo, staff/board photos, branch & event photos
├── robots.txt
├── sitemap.xml
└── README.md           # This file
```

## Features

- **Home** — Hero section with stats and social links
- **Services** — Core service cards
- **About Us** — Mission & Vision statements
- **Loans & Savings** — Loan products + savings products with tabbed view
- **Financial Tools** — Loan Eligibility Checker & Fixed Deposit Calculator (real rates)
- **News & Announcements** — Latest updates
- **Branches** — Branch list, working hours
- **Contact** — Contact form, Google Maps, working hours
- **Floating WhatsApp button** and **Tawk.to live chat widget** on every page
- **Team page** (`team.html`) — Management team + Board of Directors, with a click-to-enlarge photo modal
- **Join page** (`join.html`) — Full membership application form (individual, business, and joint/group accounts)

## How to Update Content

### Add/Replace Team Photos
In `team.html`, replace the placeholder inside `.team-photo`:
```html
<!-- Replace this: -->
<div class="team-photo-placeholder"><i class="fas fa-user-tie"></i><span>Photo</span></div>

<!-- With this (data-name enables the click-to-enlarge modal): -->
<div class="team-photo" data-name="Full Name">
  <img src="images/person.jpg" alt="Full Name">
  <div class="photo-hover"><i class="fas fa-expand"></i></div>
</div>
```

### Update Loan Rates or FD Rates
Edit the data objects in the inline `<script>` in `index.html`:
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
