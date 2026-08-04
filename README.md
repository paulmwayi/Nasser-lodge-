# Nasser Lodge Website

"Where luxury feels like home" — Mongu, Western Province, Zambia

A responsive, brand-aligned marketing website built per the Nasser Lodge 3D Website PRD (v1.0, August 2026).

## Quick Start

Open `index.html` in a browser, or serve locally:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve .
```

Then visit `http://localhost:8000`

## File Structure

```
nasser-lodge/
├── index.html              # Main landing page (single-page scroll narrative)
├── pages/
│   ├── gallery.html        # Photo gallery (grid layout)
│   └── about.html          # About, directions, story
├── css/
│   └── style.css           # Global stylesheet (design system + responsive)
├── js/
│   └── main.js             # Navigation, animations, form submission
└── images/                 # (Placeholder — add actual photos here)
```

## Design System

| Attribute | Value |
|---|---|
| **Palette** | Dark charcoal/warm tones — "golden hour over the Zambezi floodplain" |
| **Primary accent** | `#c8944a` (Gold) |
| **Background** | `#0d0d0d` (Deep charcoal) → `#1e1b16` (Warm dark) alternating |
| **Display font** | Playfair Display |
| **Body font** | Inter |
| **Spacing philosophy** | Generous negative space, one idea per section |

## Key Features (Current)

- Scroll-driven narrative chapters matching the PRD story arc
- Mobile-responsive with hamburger navigation
- Scroll-triggered animations (Intersection Observer)
- Room cards with rates, amenities, and glass-tag styling
- Enquiry form with WhatsApp fallback submission
- Direct WhatsApp, Call, and Email CTAs
- Social proof section (Google 4.2★, guest testimonials)
- Location/culture section (Kuomboka, Liuwa Plain, Barotse Floodplain)
- Structured data (Schema.org LodgingBusiness) for SEO
- Open Graph meta tags

## Contact

- **Phone/WhatsApp**: +260 976 327 007
- **Email**: nasserlodges49@gmail.com
- **Address**: P4HQ+W93, Lusaka Road, Mongu, Western Province, Zambia

*Built as a living document — designed to evolve with the lodge's needs.*
