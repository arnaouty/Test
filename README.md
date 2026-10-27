# Platform Advertising Agency — Website

A simple static website (HTML + CSS + JS, no build step) for Platform Advertising Agency.

Brand colours (from `color.pdf`): cyan `#02e9eb`, navy `#04253f`. Font: Poppins.

## Structure

```
index.html               – the whole one-page site
assets/css/style.css     – all styling (colours are CSS variables at the top)
assets/js/main.js        – contact details, client list, animations
assets/img/logo.png      – full logo (transparent)
assets/img/mark.svg      – "P" icon (vector)
assets/img/clients/      – 30 client logos (white, transparent)
```

## Editing

- **Contact details / social links:** open `assets/js/main.js` and fill in the `CONTACT` block at the top.
  Any value left empty hides that button.
- **Text:** edit `index.html` directly.
- **Client logos:** add a white transparent PNG to `assets/img/clients/` named `client-31.png`, etc.,
  and add its name to the `CLIENTS` list in `assets/js/main.js`.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.

## Publish on GitHub Pages

1. Merge this branch into `main`.
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pick `main` and `/ (root)`, then **Save**.
3. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.
4. Later you can attach your own domain under **Settings → Pages → Custom domain**.
