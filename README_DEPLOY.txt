# Keepswagalive — Rebuild (Full-quality images, CSS-controlled sizes)

## Quick notes
- Images are **kept at full quality** in `assets/`. CSS controls their size/fit.
- Edit `merch.json` to add/remove merch items (no JS editing required).
- Payments: Netlify functions in `netlify/functions/` are placeholders and use env vars:
  STRIPE_SECRET_KEY, PAYSTACK_SECRET_KEY, PAYPAL_CLIENT_ID, PAYPAL_SECRET, SITE_URL
- Fan signup form uses `data-netlify="true"`. Check Netlify Dashboard -> Forms for submissions (export CSV).

## How to edit merch
- Open `merch.json` and add objects with: id, name, price, imgFront, imgBack.

## Deploy
1. Push to GitHub.
2. On Netlify, Add new site -> Import project from Git -> choose repo.
3. Publish directory: `.`. Build command: leave empty.
4. Add environment vars (as above) in Site settings -> Build & deploy -> Environment.
