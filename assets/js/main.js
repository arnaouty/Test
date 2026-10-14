/* =========================================================
   EDIT YOUR CONTACT DETAILS HERE
   Leave a value empty ("") to hide that button / icon.
   ========================================================= */
const CONTACT = {
  whatsapp: "",   // international format, digits only, e.g. "201001234567"
  phone: "",      // e.g. "+20 100 123 4567"
  email: "",      // e.g. "hello@platform-agency.com"
  instagram: "",  // full URL
  facebook: "",   // full URL
  linkedin: "",   // full URL
  tiktok: "",     // full URL
};

/* Client logos (assets/img/clients/client-XX.png) in portfolio order */
const CLIENTS = [
  "Vodafone", "Travel Express", "Explora Traveler", "Total Tours", "Musta Travel", "Creators Tourism",
  "Volvo", "Expert Inner Circle", "EliteHR Partners", "Tawray for Supplies", "Tshatib", "Egypt Holidays",
  "Chili's", "Dunas Travel", "Egypt Travel VIP", "Strong Limousine", "Plata Tours", "Escala Viagens",
  "Rafaheya", "Tawy Tours", "Client logo", "CWR", "Bravo Tours", "VOIS",
  "Travel Center", "El Beit El Mamour", "Little Learning Steps", "The Cruise", "Layaly Bo5arest", "Sassy & Classy",
];

/* ---------- Contact buttons ---------- */
(function setupContact() {
  const links = {
    whatsapp: CONTACT.whatsapp && `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`,
    phone: CONTACT.phone && `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`,
    email: CONTACT.email && `mailto:${CONTACT.email}`,
  };
  document.querySelectorAll("[data-contact]").forEach((el) => {
    const key = el.dataset.contact;
    if (!links[key]) { el.hidden = true; return; }
    el.href = links[key];
    const label = el.querySelector("[data-contact-label]");
    if (label) label.textContent = CONTACT[key];
  });

  const icons = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>',
    facebook: '<path fill="currentColor" d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z"/>',
    linkedin: '<path fill="currentColor" d="M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h4v1.7A4.3 4.3 0 0 1 17.8 9C21 9 21 11.6 21 14.3V21h-4v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H10z"/>',
    tiktok: '<path fill="currentColor" d="M16 3c.3 2.3 1.8 3.9 4 4.1v3.3a7 7 0 0 1-4-1.3v6.4A5.6 5.6 0 1 1 10.4 10v3.4a2.3 2.3 0 1 0 2.3 2.3V3z"/>',
  };
  const socials = document.getElementById("socials");
  Object.keys(icons).forEach((key) => {
    if (!CONTACT[key]) return;
    const a = document.createElement("a");
    a.href = CONTACT[key];
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", key);
    a.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[key]}</svg>`;
    socials.appendChild(a);
  });
})();

/* ---------- Client marquees (two rows, each duplicated for a seamless loop) ---------- */
(function setupClients() {
  const half = Math.ceil(CLIENTS.length / 2);
  const rows = [
    [document.getElementById("clientsTrack"), CLIENTS.slice(0, half), 0],
    [document.getElementById("clientsTrack2"), CLIENTS.slice(half), half],
  ];
  rows.forEach(([track, names, offset]) => {
    const html = names.map((name, i) => {
      const n = String(offset + i + 1).padStart(2, "0");
      return `<img src="assets/img/clients/client-${n}.png" alt="${name}">`;
    }).join("");
    track.innerHTML = html + html.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"');
  });
})();

/* ---------- Header: scrolled state + mobile menu ---------- */
const header = document.querySelector(".header");
const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");

const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const setMenu = (open) => {
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* ---------- Reveal on scroll + active nav link ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach((el) => {
  // stagger siblings in the same grid
  const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
  el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 6) * 80}ms`;
  revealObserver.observe(el);
});

const navLinks = [...nav.querySelectorAll('a[href^="#"]:not(.btn)')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

/* ---------- Card spotlight follows the cursor ---------- */
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
