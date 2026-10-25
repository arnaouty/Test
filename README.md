# Restaurant Table QR Codes

Static QR codes for restaurant tables. Scanning opens one page with **Menu**, **Location** and **Payment methods**.

The printed QR code never changes. It points to `index.html`, which reads `restaurant.json`.
To change the menu link, address or payment methods later, edit `restaurant.json`. You don't need to reprint anything.

## Setup
1. Edit `restaurant.json` with your name, menu URL, Google Maps link, payment methods, phone and number of tables.
2. Host the site. For example, enable GitHub Pages (Settings → Pages → branch `main`, folder `/`).
   Put the resulting URL in `base_url`.
3. Generate the codes:
   ```bash
   pip install qrcode pillow
   python3 generate_qr.py
   ```
4. Open `qr/table-cards.html` in a browser and print it (4 cards per A4 page).

## What the QR codes open
| QR file | Opens |
|---|---|
| `qr/table-XX.png` | Landing page showing "Table XX" with Menu / Location / Payment |
| `qr/menu.png` | Goes straight to the menu |
| `qr/location.png` | Goes straight to Google Maps |
| `qr/pay.png` | Landing page with the payment methods open |
