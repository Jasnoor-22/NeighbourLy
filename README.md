# Neighbourly (MVP)

**Local skills. Real opportunities.** A local skill/service marketplace built as a
learning-friendly React + Vite MVP — no backend, no database, no real auth or payments.

## How to run it

You'll need [Node.js](https://nodejs.org) (18+) installed on your own machine —
this project was written in a sandbox with no internet access, so it hasn't been
`npm install`-ed or run yet. On your machine:

```bash
cd neighbourly
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build a static production bundle: `npm run build` (output goes to `dist/`).

## Files to understand first

1. `src/App.jsx` — route list, wraps the app in the two Context providers.
2. `src/data/*.js` — all mock data (services, providers, reviews, messages, orders,
   notifications, categories). Start here to see the shape of the data.
3. `src/context/FavoritesContext.jsx` and `src/context/ServicesContext.jsx` — the two
   places state is shared across pages and saved to `localStorage`.
4. `src/components/ServiceCard.jsx` — the most reused component; a good example of
   how a component reads from data + context.
5. `src/pages/Browse.jsx` — shows filtering/sorting logic with `useMemo`.
6. `src/pages/BecomeSeller.jsx` — the multi-step form; look at how `step` state
   controls which fields render, and how `addService` writes to context/localStorage.
7. `src/index.css` — one global stylesheet with CSS variables for the whole design
   system (colors, radii, shadows) instead of styling scattered across files.

## What's currently mocked

- **All data** (services, providers, reviews, conversations, orders, notifications)
  lives in `src/data/*.js` as hardcoded arrays — nothing comes from a server.
- **"Login"/profile** is a single local profile stored in `localStorage`
  (`neighbourly_profile`) — there's no real multi-user auth.
- **Posted services** ("Become a Seller") are saved to `localStorage`
  (`neighbourly_posted_services`) and merged with the mock services at runtime.
- **Favorites** are saved to `localStorage` (`neighbourly_favorites`).
- **Booking** just shows a confirmation modal — no real order is created against
  the mock `orders` list (it doesn't persist).
- **Messaging** is a local, single-session mock chat — messages you send are not
  persisted after a refresh, and there's no real-time delivery.
- **Location** is all fixed mock strings/distances (no GPS, no maps API).
- **Payments/commission** are described in the "How Neighbourly works" section
  but not implemented — no real money moves anywhere.

## What a real production version would need

- A backend + database (e.g. Node/Express or similar + Postgres) for services,
  users, orders and messages, replacing the `src/data/*.js` mock arrays.
- Real authentication (e.g. email/OTP or an auth provider) instead of a single
  local "profile."
- Real-time messaging (WebSockets or a service like Pusher/Firebase) instead of
  the local mock chat state.
- Image uploads (e.g. S3/Cloudinary) instead of the emoji stand-ins.
- A real maps/location API (with user consent) instead of fixed mock distances.
- Payments/escrow integration (e.g. Razorpay/Stripe) to actually take the
  commission described on the Home page.
- Real verification/moderation flows for the "Verified," "Report," and "Block"
  safety features, which are currently just UI.

## Notes on scope

This MVP deliberately avoids positioning any "academic" service as help with
assignments — those categories are limited to tutoring, proofreading, and
presentation/design help, per the original brief.
