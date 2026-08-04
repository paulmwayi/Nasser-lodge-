# Nasser Lodge Website — PRD

**Version:** 2.0
**Status:** Active development spec
**Last updated:** August 4, 2026

---

## 1. Summary

A booking-first website for Nasser Lodge (Mongu, Western Province, Zambia). No 3D/WebGL — a cinematic but conventional luxury-hotel site, modeled on booking-first sites like Rosewood Hotels. The booking widget is front and center on the homepage, not buried at the bottom, and the reservation flow includes a payment step (mobile money + card).

**Business goal:** convert visitors into direct paid reservations, reduce OTA (Tripadvisor/Expedia/Agoda) dependency, and present Nasser Lodge as the premium option in Mongu.

---

## 2. Success Metrics

| Metric | Target (first 3 months) |
|---|---|
| Booking widget engagement | > 30% of visitors |
| Completed reservations (deposit paid) | 30+ / month |
| Booking abandonment rate | < 50% |
| Time to first widget interaction | < 10 seconds |
| Mobile Lighthouse performance | > 85 |

---

## 3. Homepage Structure

1. **Hero** — full-bleed photo/video, logo, tagline ("Where luxury feels like home").
2. **Booking widget** — embedded in/under hero: check-in / check-out / guests / room type → "Check Availability." Visible above the fold, desktop and mobile.
3. **Sticky mini booking bar** — condensed version persists at top on scroll.
4. **Rooms overview** — card grid, price-from, "Book This Room" per card (pre-fills booking flow).
5. **Dining & Amenities** — photo-led section.
6. **Location** — map, distance from Mongu town, nearby attractions (Barotse Plain, Kuomboka).
7. **Reviews** — Google rating (4.2★/41 reviews), paraphrased guest feedback, Facebook link.
8. **Contact / Footer** — phone, WhatsApp, email, address, policies.

---

## 4. Functional Requirements

### Must-have (MVP)
- **FR1** Homepage booking widget (dates, guests, room type, CTA) — above the fold.
- **FR2** Sticky booking bar on scroll.
- **FR3** Availability engine — admin-managed calendar is enough for v1 (no full PMS needed).
- **FR4** Room selection with transparent pricing (per-night rate, total, fees) before payment.
- **FR5** Guest details form (name, phone, email, guests, requests).
- **FR6** Payment step:
  - Airtel Money + MTN MoMo (primary Zambian rails)
  - Card via Flutterwave or DPO Group
  - Deposit option (e.g. 20–50%, configurable) instead of forcing full payment
- **FR7** Booking confirmation — on-screen + email + WhatsApp with reference number.
- **FR8** Admin/CMS — staff update rooms, rates, block dates, view reservations without a developer.
- **FR9** WhatsApp/Call fallback CTA visible at every step of the flow.
- **FR10** Google Maps embed + directions link (P4HQ+W93, Mongu).
- **FR11** Reviews section with paraphrased highlights + Facebook link.
- **FR12** SEO — SSR/SSG pages, LocalBusiness/Lodging structured data, sitemap.
- **FR13** Analytics — track widget interaction, funnel drop-off, completed reservations.

### Should-have (Phase 2)
- FR14 Self-service cancellation/refund via booking reference lookup.
- FR15 Multi-room/group booking (events, weddings).
- FR16 Returning-guest auto-fill.
- FR17 Multi-currency display (ZMW default, USD toggle).

### Out of scope (v1)
- OTA channel-manager sync (manual inventory management is fine at launch).
- Guest login/account system beyond reference lookup.

---

## 5. Booking Flow

1. Home hero → guest sets dates/guests → "Check Availability."
2. Availability results → room cards (photo, rate, "Select Room").
3. Guest details form.
4. Payment → Airtel Money / MTN MoMo / Card → full or deposit → confirm.
5. Confirmation → on-screen + email + WhatsApp, reference number, directions.
6. Lodge notified — new reservation appears in admin panel + internal alert.

---

## 6. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (React) |
| Styling | Tailwind CSS |
| Booking widget | Custom React component (date picker + guest selector) |
| Payment | Flutterwave or DPO Group (Airtel Money, MTN MoMo, card) |
| CMS | Sanity.io or lightweight custom admin panel |
| Notifications | Resend/SendGrid (email) + WhatsApp Business API or `wa.me` deep link |
| Hosting | Vercel |
| Analytics | Plausible or GA4 |

---

## 7. Non-Functional Requirements

- LCP < 2s — optimize/lazy-load photography (WebP/AVIF).
- Mobile-first booking widget — full-width component, not a shrunk desktop version.
- Payment security — never store card data directly; use gateway-hosted fields; mobile money via official provider API/USSD-push confirmation.
- Graceful failure — if a mobile money push times out, fall back to WhatsApp/call rather than losing the guest.
- WCAG 2.1 AA on the booking flow specifically.

---

## 8. Content Needed Before Build

- Professional photos/video: exterior, each room type, restaurant/bar, grounds.
- Confirmed room inventory: names, descriptions, capacity, amenities, nightly rates.
- Deposit and cancellation policy (legal + FR6 dependency).
- Payment gateway merchant account (business registration docs — start this early, longest lead time).
- Logo, brand palette.
- Homepage copy per section.

---

## 9. Open Questions

1. Which gateway (Flutterwave / DPO / local bank aggregator) can onboard fastest?
2. Deposit percentage — fixed or configurable per room/season?
3. Manual OTA sync acceptable long-term, or worth a channel manager later?
4. Confirmed room tiers and rates (v1 assumes illustrative Standard/Deluxe/Suite pending confirmation).
5. Who owns CMS/admin day-to-day post-launch?
