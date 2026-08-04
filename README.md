# Nasser Lodge Website

Booking-first website for Nasser Lodge, Mongu, Zambia. See `PRD.md` for the
full product spec.

## Run locally (in Termux or anywhere with Node.js)

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Deploy

Push to GitHub, then import the repo at vercel.com — it auto-detects Next.js.

## What's built so far

- Homepage: hero, floating booking widget, sticky booking bar on scroll,
  rooms grid, amenities, location map, reviews, contact footer.
- `/book`: placeholder reservation page (reads dates/guests/room from the
  widget) — payment integration (Airtel Money, MTN MoMo, card) is the next
  piece to build here, per PRD section 6.

## Next steps

1. Replace placeholder room data in `data/rooms.ts` with confirmed
   inventory and rates.
2. Replace the gradient placeholders in `app/page.tsx` and
   `components/RoomCard.tsx` with real photography.
3. Build the actual availability + payment API routes and wire them into
   `app/book/page.tsx`.
4. Set up a CMS (or simple admin panel) so staff can manage rooms/rates.
