# Storefront

A clothing e-commerce storefront built with Next.js 15 (App Router) and React 19. Plain CSS, no other dependencies.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## What's included

- Home page: hero, category tiles, product grid
- Collection pages (`/collections/all`, `/collections/tops`, …) with sort and an "In stock only" filter
- Product pages with color swatches, size picker, quantity, sale and sold-out states, related products
- Slide-out cart drawer (saved in the browser), free-delivery progress
- Search overlay (by name, category, or color)
- Checkout with an Egypt delivery form and cash on delivery
- Exchange policy and contact pages; responsive down to phone width

## Customize

- **Brand, hero, delivery fee, contact info:** `src/config/site.js`
- **Products and categories:** `src/data/products.js`
- **Colors and fonts:** CSS variables at the top of `src/app/globals.css`
- **Product images:** `src/components/ProductImage.js` draws placeholder garments tinted per color. Replace with real photos.

## Not done yet

- Orders aren't saved anywhere. Checkout only shows a confirmation (see the `TODO` in `src/app/checkout/page.js`).
- No online payments (Paymob, Fawry, Kashier), no admin panel, no customer accounts.
