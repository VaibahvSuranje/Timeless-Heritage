# Timeless Heritage — GitHub Pages website

A responsive, static heritage-travel website built with HTML, CSS and vanilla JavaScript. No build step, server, database, paid hosting or ZIP file is required. Package content is maintained centrally in `assets/js/packages.js`.

## Repository structure

- `index.html` — homepage, featured journeys, FAQs and WhatsApp enquiry form.
- `packages.html` — searchable/filterable package collection.
- `packages/*.html` — 11 independently accessible package detail pages.
- `about.html`, `contact.html` — brand and contact pages.
- `privacy-policy.html`, `terms-and-conditions.html`, `cancellation-refund-policy.html`, `booking-information.html` — policy and booking pages.
- `404.html` — GitHub Pages not-found page.
- `assets/css/style.css` — responsive editorial design system.
- `assets/js/config.js` — WhatsApp number, email placeholder and canonical URL base.
- `assets/js/packages.js` — central package content, price, duration, route, itinerary, inclusions, exclusions and related IDs.
- `assets/js/main.js` — cards, filters, search, sorting, accordions, WhatsApp forms and menu.
- `assets/icons/whatsapp.svg` — locally stored WhatsApp icon.
- `assets/images/` — brand mark and your destination photos.

## Publish to GitHub Pages (no ZIP)

1. Sign in to GitHub and choose **New repository**. Name it, for example, `timeless-heritage`. For a public website, choose **Public**.
2. Open the repository and choose **Add file → Upload files**.
3. Upload the individual files and folders from this project, preserving the exact structure. Upload the contents of the `timeless-heritage` folder, not the folder nested inside another folder. Do not upload a ZIP.
4. Commit the files to the `main` branch.
5. Open **Settings → Pages**. Under Build and deployment, select **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
6. GitHub will display the published URL, usually `https://YOUR-USERNAME.github.io/timeless-heritage/`. Wait for the Pages deployment to finish.
7. In `assets/js/config.js`, replace `canonicalBase` with your final website URL. Update canonical URLs in each HTML file too if you want explicit per-page canonical paths; the current value is a placeholder.
8. Test the homepage, collection filters, every package page, the mobile menu, enquiry form and WhatsApp links on desktop and mobile.

All internal links are relative, so the website supports a project repository path such as `/timeless-heritage/` on GitHub Pages.

## Configure the brand

### Logo

The included `assets/images/timeless-heritage-logo.png` is cropped from the logo displayed on page 1 of the supplied Gujarat Heritage Journey PDF. Replace it with a higher-resolution official logo if available. Keep the filename the same, or update the image `src` in the header and footer. Preserve the original proportions.

### WhatsApp number and email

Edit `assets/js/config.js`:
- `whatsapp`: digits only, including country code, no plus sign or spaces.
- `displayPhone`: the visible phone number.
- `email`: your approved business email.

The header/footer currently show the supplied WhatsApp number `+91 93711 31975`. The footer email link reads from `assets/js/config.js` when a real email is supplied. Replace the `email` value with the approved business email before publication; do not publish the placeholder.

### Change package prices, duration, itinerary and departures

Edit the relevant object in `assets/js/packages.js`. Find the package by its `id` or `slug`.
- `price`: numeric amount in rupees. Use `0` only for an unconfirmed placeholder; it displays as `₹0000`.
- `priceNote`: optional condition or note displayed on the package page.
- `durationDays` and `durationNights`: package duration.
- `departure`, `start`, `departureNote`: only use when supplied and current.
- `route`, `description`, `highlights`, `itinerary`: package copy.
- `inclusions`, `exclusions`: only list supported items.
- `related`: array of package IDs used for related-journey cards.

The four unpriced packages intentionally show **₹0000 / person** until the central `price` field is updated:
1. Aurangabad Heritage & Ellora Caves — `id: "aurangabad"`.
2. Pancha Bhoota & Temple Heritage Tour — `id: "pancha-bhoota"`.
3. Gwalior, Orchha & Khajuraho Heritage Journey — `id: "gwalior"`.
4. Gwalior, Orchha & Khajuraho: Forts, Temples & Jain Heritage — `id: "gwalior-jain"`.

Prices with source conditions should retain the condition in `priceNote`. The Varanasi–Ayodhya–Prayagraj package price is subject to four people travelling together. GST notes are preserved in the relevant package data.

### Update the canonical URL

In every HTML file, replace `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY` in the canonical link and Open Graph URL with the final URL. In `assets/js/config.js`, update `canonicalBase` as well.

## Image replacement guide

No destination photographs are bundled. The site uses styled empty frames, and it remains usable when a photograph is missing. Add your own appropriately licensed images to `assets/images/` using the filenames below. Images are displayed with `object-fit: cover`; keep the focal subject away from extreme edges.

| Filename | Placement | Recommended ratio | Suggested dimensions |
|---|---|---:|---:|
| `homepage-hero.jpg` | Homepage hero | 4:5 | 1200 × 1500 px |
| `about-heritage.jpg` | About page | 4:5 | 1000 × 1250 px |
| `gujarat-heritage-hero.jpg` | Home strip and Gujarat package | 4:3 | 1400 × 1050 px |
| `gujarat-heritage-day-01.jpg` … `gujarat-heritage-day-05.jpg` | Gujarat day timeline | 4:3 | 1000 × 750 px each |
| `odisha-heritage-hero.jpg` | Odisha package | 4:3 | 1400 × 1050 px |
| `odisha-heritage-day-01.jpg` … `odisha-heritage-day-06.jpg` | Odisha day timeline | 4:3 | 1000 × 750 px each |
| `tungnath-chandrashila-hero.jpg` | Tungnath package | 4:3 | 1400 × 1050 px |
| `tungnath-chandrashila-day-01.jpg` … `day-05.jpg` | Tungnath day timeline | 4:3 | 1000 × 750 px each |
| `kedarnath-badrinath-hero.jpg` | Kedarnath package and home strip | 4:3 | 1400 × 1050 px |
| `kedarnath-badrinath-day-01.jpg` … `day-09.jpg` | Kedarnath day timeline | 4:3 | 1000 × 750 px each |
| `hampi-heritage-hero.jpg` | Hampi package | 4:3 | 1400 × 1050 px |
| `hampi-heritage-day-01.jpg` … `day-04.jpg` | Hampi day timeline | 4:3 | 1000 × 750 px each |
| `varanasi-hero.jpg` | Varanasi package and home strip | 4:3 | 1400 × 1050 px |
| `varanasi-day-01.jpg` … `day-05.jpg` | Varanasi day timeline | 4:3 | 1000 × 750 px each |
| `varanasi-ayodhya-prayagraj-hero.jpg` | Varanasi–Ayodhya package | 4:3 | 1400 × 1050 px |
| `varanasi-ayodhya-prayagraj-day-01.jpg` … `day-07.jpg` | Varanasi–Ayodhya day timeline | 4:3 | 1000 × 750 px each |
| `aurangabad-heritage-hero.jpg` | Aurangabad package | 4:3 | 1400 × 1050 px |
| `aurangabad-heritage-day-01.jpg` … `day-04.jpg` | Aurangabad day timeline | 4:3 | 1000 × 750 px each |
| `pancha-bhoota-temple-heritage-hero.jpg` | Pancha Bhoota package | 4:3 | 1400 × 1050 px |
| `pancha-bhoota-temple-heritage-day-01.jpg` … `day-06.jpg` | Pancha Bhoota day timeline | 4:3 | 1000 × 750 px each |
| `gwalior-orchha-khajuraho-hero.jpg` | Gwalior–Orchha package | 4:3 | 1400 × 1050 px |
| `gwalior-orchha-khajuraho-day-01.jpg` … `day-06.jpg` | Gwalior–Orchha day timeline | 4:3 | 1000 × 750 px each |
| `gwalior-orchha-khajuraho-jain-heritage-hero.jpg` | Gwalior Jain package | 4:3 | 1400 × 1050 px |
| `gwalior-orchha-khajuraho-jain-heritage-day-01.jpg` … `day-07.jpg` | Gwalior Jain day timeline | 4:3 | 1000 × 750 px each |

The code derives day-image names from the package slug (`<slug>-day-01.jpg`, etc.). Package-card and package-hero images use each package’s `image` field in `assets/js/packages.js`. Add only real image files; do not create empty `.jpg` files because they will be treated as broken images. If you rename a file, update the package `image` field or the corresponding `data-file` in the HTML.

## Legal pages requiring review

These pages contain clearly labelled draft wording and require business review before publication:
- `privacy-policy.html`
- `terms-and-conditions.html`
- `cancellation-refund-policy.html`
- `booking-information.html`

No company policies were supplied for privacy handling beyond the website’s client-side form behaviour, payment, cancellation, refund, liability, disputes or governing law. Replace draft sections with the company’s approved terms and obtain legal advice where appropriate.

## Troubleshooting

- **Homepage loads but package links fail:** upload the `packages/` folder at repository root and preserve filenames exactly.
- **Site works locally but not on GitHub Pages:** check that Pages uses branch `main` and folder `/ (root)`. Use relative links; do not start paths with `/`.
- **Images remain placeholders:** confirm that the actual file exists under `assets/images/` and that spelling, hyphens and file extension match exactly. GitHub Pages paths are case-sensitive.
- **WhatsApp message does not appear:** confirm that `whatsapp` is the country code plus digits only in `assets/js/config.js` and that JavaScript is enabled.
- **Filters show no results:** select `All` or clear the search. Categories are based on the `category` value in `assets/js/packages.js`.
- **Email placeholder is visible:** replace `[Add business email]` and `CHANGE-ME@example.com` before launch.
- **Logo differs from the supplied PDF:** replace the included placeholder brand mark with the official logo asset and keep its proportions.

## Quality and source notes

The site is a static frontend. Enquiry forms open WhatsApp; no enquiry database or payment gateway is implemented. No testimonials, ratings, awards, business address, company credentials, current availability or unprovided prices have been invented. Package details were transcribed from the supplied PDFs and written itinerary descriptions. The Gujarat itinerary includes the PDF’s listed subject-matter expert, Neha Kulkarni, as a trip-specific detail only. The old Tungnath and Hampi dates are not advertised as upcoming departures.
