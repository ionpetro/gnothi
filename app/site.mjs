// Public website for Vercel: the app at "/", a crawlable «Λεξικό» page with every word, an about
// page, sitemap, robots, 404, web manifest, icons and og image. Greek lang tags throughout. PostHog analytics when POSTHOG_KEY is set.
import { writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { loadUnits } = require("./src/course.js");

export const SITE = "https://gnothi-greek.vercel.app";
export const REPO = "https://github.com/ionpetro/gnothi";

// The family of free, open-source learning apps. Keep this list the same in Skepsis, Carpe, Gnothi and Objection (app.js and site.mjs).
const FAMILY = [
  { id: "skepsis", name: "Skepsis", url: "https://skepsis-greek.vercel.app", repo: "https://github.com/ionpetro/skepsis", en: "the Greek hiding in everyday English", el: "οι ελληνικές ρίζες που κρύβονται στα αγγλικά" },
  { id: "carpe", name: "Carpe", url: "https://carpe-latin.vercel.app", repo: "https://github.com/ionpetro/carpe", en: "Latin for Greece's national exams", el: "Λατινικά για τις Πανελλαδικές" },
  { id: "gnothi", name: "Gnothi", url: "https://gnothi-greek.vercel.app", repo: "https://github.com/ionpetro/gnothi", en: "Ancient Greek for Greece's national exams", el: "Αρχαία Ελληνικά για τις Πανελλαδικές" },
  { id: "objection", name: "Objection", url: "https://objection-bar.vercel.app", repo: "https://github.com/ionpetro/objection", en: "prep for the US bar exam", el: "προετοιμασία για τις εξετάσεις δικηγόρων των ΗΠΑ" },
];
const SISTERS = FAMILY.filter((a) => a.id !== "gnothi");
const sisterHref = (a) => `${a.url}/?utm_source=gnothi&amp;utm_medium=sister_link`;
// PostHog (optional): set POSTHOG_KEY in app/.env. Without it no analytics code ships at all.
const POSTHOG_KEY = process.env.POSTHOG_KEY || "";
const POSTHOG_HOST = process.env.POSTHOG_HOST || "https://us.i.posthog.com";
function analytics() {
  if (!POSTHOG_KEY) return "";
  if (!/^phc_[A-Za-z0-9]+$/.test(POSTHOG_KEY)) throw new Error("POSTHOG_KEY must be a PostHog project key (phc_...)");
  // Official PostHog loader. Anonymous visitors only (no person profiles), inputs masked in replays.
  return `<script>!function(t,e){var o,n,p,r;e.__SV||(window.posthog&&window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags identify setPersonProperties group resetGroups reset get_distinct_id get_session_id alias set_config startSessionRecording stopSessionRecording captureException opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init(${JSON.stringify(POSTHOG_KEY)},{api_host:${JSON.stringify(POSTHOG_HOST)},defaults:"2025-05-24",person_profiles:"identified_only",session_recording:{maskAllInputs:true}});
posthog.register({app:"gnothi",surface:"web"});</script>`;
}

const NAME = "Gnothi";
const TAGLINE = "Γνῶθι σαυτόν. Γνῶθι το 20.";
const DESC = "Αρχαία Ελληνικά για τις Πανελλαδικές (Γ΄ Λυκείου, Ανθρωπιστικές Σπουδές) σαν παιχνίδι: τα 19 κείμενα του Φακέλου, ετυμολογία, Εισαγωγή, τύποι, συντακτικό και αδίδακτο με τις εκφωνήσεις των εξετάσεων, σε μαθήματα των τεσσάρων λεπτών. Χωρίς καρδιές, χωρίς τιμωρίες.";
const THEME = "#1f5fa8";

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&family=GFS+Didot&display=swap">';
const ICONS = `<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/icon.svg"><link rel="manifest" href="/manifest.webmanifest"><meta name="theme-color" content="${THEME}">`;
const hasOgPng = existsSync(new URL("./brand/og.png", import.meta.url));
const OG_IMAGE = hasOgPng ? "/og.png" : "/og.svg";

function head({ title, desc, path, type = "website", jsonld = [] }) {
  const url = SITE + path;
  return `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${type}"><meta property="og:site_name" content="${NAME}"><meta property="og:locale" content="el_GR"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}${OG_IMAGE}"><meta property="og:image:width" content="1600"><meta property="og:image:height" content="900"><meta property="og:image:alt" content="${esc(NAME)}: ${esc(TAGLINE)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${SITE}${OG_IMAGE}">
${ICONS}${FONTS}${analytics()}
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`).join("\n")}`;
}

const PAGE_CSS = `:root{--bg:#f6f3ec;--surface:#fffdf8;--ink:#1f2430;--muted:#646b78;--line:#e1dbcd;--brand:#1f5fa8;--brand-deep:#143f72;--brand-soft:#e3edf9;--gold:#c8961e;--gold-soft:#faefd0;--olive:#5f8f3a;--on:#fff;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#121826;--surface:#1a2232;--ink:#eef1f6;--muted:#a3acbb;--line:#2f3a4e;--brand:#7fb2ef;--brand-deep:#3d79c4;--brand-soft:#1f3250;--gold:#e6b84a;--gold-soft:#3a3017;--olive:#8cc766;--on:#121826;color-scheme:dark}}
*{box-sizing:border-box}body{margin:0;font-feature-settings:"lnum";background:var(--bg);color:var(--ink);font:17px/1.6 Nunito,system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
.wrap{max-width:760px;margin:0 auto;padding:24px max(16px,env(safe-area-inset-right,0px)) 64px max(16px,env(safe-area-inset-left,0px))}
a{color:var(--brand);font-weight:800}nav.top{display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding-bottom:16px;border-bottom:1px solid var(--line)}
nav.top .brand{font-family:"GFS Didot","Noto Serif",Georgia,serif;font-weight:700;font-size:28px;text-decoration:none;margin-right:auto}nav.top a{text-decoration:none;font-size:15px}
h1{font-size:clamp(32px,7vw,48px);line-height:1.05;margin:18px 0 6px;font-weight:900;text-wrap:balance}h2{font-size:22px;margin:32px 0 8px;font-weight:900}h3{margin:18px 0 6px}
.grc{font-family:"Noto Serif","GFS Didot","Palatino Linotype",Palatino,Georgia,serif;font-weight:600}
.say{font-size:19px;font-weight:700}.card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:16px 18px;margin:12px 0}
.cta{display:inline-flex;align-items:center;gap:8px;margin-top:20px;background:var(--brand);color:var(--on);text-decoration:none;font-weight:900;padding:14px 22px;border-radius:14px;box-shadow:0 4px 0 var(--brand-deep)}
table{width:100%;border-collapse:collapse;font-size:15px}td,th{padding:8px 6px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}th{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}td.grc{font-size:19px}
.pill{display:inline-block;font-size:11px;font-weight:900;letter-spacing:.05em;text-transform:uppercase;padding:2px 7px;border-radius:999px;background:var(--brand-soft);color:var(--brand)}
footer{margin-top:48px;padding-top:16px;border-top:1px solid var(--line);font-size:14px;color:var(--muted)}footer a{font-weight:700}`;

const nav = () => `<nav class="top" aria-label="Ιστότοπος"><a class="brand" href="/">Γνῶθι</a><a href="/lexiko">Λεξικό</a><a href="/about">Τι είναι</a><a href="${REPO}">GitHub</a></nav>`;
const foot = () => `<footer><p>${NAME}: ${TAGLINE} Οι τύποι ελέγχονται στη Γραμματική της Αρχαίας Ελληνικής (Οικονόμου), στο Συντακτικό (Μουμτζάκης) και στον Φάκελο Υλικού. Τα αρχαία κείμενα είναι κοινό κτήμα· οι μεταφράσεις και τα σχόλια είναι δικά μας, όχι του σχολικού βιβλίου (© ΙΤΥΕ «Διόφαντος»). Το ${NAME} είναι δωρεάν και θα μείνει πάντα δωρεάν· ο κώδικας είναι ανοιχτός (MIT): <a href="${REPO}">GitHub</a>. Το μόνο που κάνουμε είναι να μετράμε με το PostHog πώς χρησιμοποιείται, για να το βελτιώνουμε. Χωρίς λογαριασμό, χωρίς διαφημίσεις. <a href="${REPO}">GitHub</a> (ένα αστέρι βοηθά κι άλλους να το βρουν). Κι άλλες δωρεάν εφαρμογές ανοιχτού κώδικα σαν αυτή: ${SISTERS.map((a) => `<a href="${sisterHref(a)}">${a.name}</a> (${a.el})`).join(" · ")}</p></footer>`;
const page = ({ title, desc, path, body, jsonld, type }) => `<!doctype html><html lang="el"><head>${head({ title, desc, path, jsonld, type })}<style>${PAGE_CSS}</style></head><body><div class="wrap">${nav()}${body}${foot()}</div></body></html>`;

/** Every word, with its unit and lesson, for the lexicon page. */
export function lexicon(units) {
  const out = [];
  const seen = new Set(); // a headword taught in several units is listed once, where it first appears
  const key = (w) => w.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/^(ὁ|ἡ|τό|οἱ|αἱ|τά)\s+/u, "").trim();
  for (const u of units) for (const l of u.lessons) for (const it of l.items) if (it.kind === "word" && !seen.has(key(it.grc))) { seen.add(key(it.grc)); out.push({ it, unit: u, lesson: l }); }
  return out;
}

const GENDERS = { m: "αρσ.", f: "θηλ.", n: "ουδ.", "m/f": "αρσ./θηλ." };
function lexPage(units) {
  const words = lexicon(units);
  const body = `<h1>Λεξικό</h1><p class="say">${words.length ? `${words.length} λέξεις των κειμένων αναφοράς και του αδιδάκτου όπως τις διδάσκει το Gnothi: λημματικός τύπος, γένος ή αρχικοί χρόνοι, σημασία και ένα γαντζάκι μνήμης.` : "Το λεξικό γεμίζει καθώς γράφονται οι μονάδες."}</p>
    ${units.filter((u) => words.some((w) => w.unit.id === u.id)).map((u) => `<h2>${esc(u.title)}</h2><table><thead><tr><th>Λέξη</th><th>Τύποι</th><th>Σημασία</th><th>Γαντζάκι</th></tr></thead><tbody>${words.filter((w) => w.unit.id === u.id).map(({ it }) => `<tr><td class="grc" lang="grc">${esc(it.grc)}</td><td lang="grc">${esc(it.forms)}${it.gender ? ` <span class="pill">${GENDERS[it.gender]}</span>` : ""}</td><td>${esc(it.el)}</td><td style="color:var(--muted)">${esc(it.hook || "")}</td></tr>`).join("")}</tbody></table>`).join("")}
    <a class="cta" href="/">Παίξε με τις λέξεις στο Gnothi</a>`;
  const jsonld = [{ "@context": "https://schema.org", "@type": "DefinedTermSet", name: "Gnothi: λεξικό Αρχαίων Ελληνικών Γ΄ Λυκείου", inLanguage: "el", url: `${SITE}/lexiko`, hasDefinedTerm: words.map(({ it }) => ({ "@type": "DefinedTerm", name: it.grc, description: it.el, inLanguage: "grc" })) }];
  return page({ title: `Λεξικό Αρχαίων Ελληνικών για τις Πανελλαδικές | ${NAME}`, desc: `Όλες οι λέξεις των κειμένων αναφοράς και του αδιδάκτου που διδάσκει το Gnothi, με γένος, αρχικούς χρόνους, σημασία και γαντζάκι μνήμης.`, path: "/lexiko", body, jsonld });
}

function aboutPage(units) {
  const items = units.reduce((a, u) => a + u.lessons.reduce((b, l) => b + l.items.length, 0), 0);
  const body = `<h1>Τι είναι το Gnothi</h1><p class="say">Ένα παιχνίδι για τα Αρχαία Ελληνικά της Γ΄ Λυκείου, φτιαγμένο για μία μαθήτρια που δίνει Πανελλαδικές τον Μάιο του 2027. Κάθε ερώτηση έχει τη μορφή και τη διατύπωση που χρησιμοποιούν τα θέματα: «τον ίδιο τύπο στον άλλο αριθμό», «να χαρακτηρίσετε πλήρως συντακτικά», «να τον μετατρέψετε στο προσδοκώμενο», «σε ποια λέξη αναφέρεται η αντωνυμία».</p>
    <h2>Τι περιέχει</h2><p>${units.length} μονάδες και ${items} κάρτες: τα 19 κείμενα αναφοράς του Φακέλου (Α1, Β1, Β2), ετυμολογία (Β3), Εισαγωγή (Β4), λεξιλόγιο και μετάφραση του αδιδάκτου (Γ1, Γ2), τύποι ονομάτων και ρημάτων (Γ3), συντακτικοί ρόλοι, δευτερεύουσες και μετατροπές (Γ4), και οι παγίδες της εκφώνησης.</p>
    <h2>Πώς διδάσκει</h2><ul>
      <li><b>Μάντεψε πρώτα.</b> Κάθε μάθημα ανοίγει με κάτι που δεν έχεις μάθει. Το να μαντεύεις πριν σου το πουν βοηθάει να κολλήσει.</li>
      <li><b>Εφάρμοσε τον κανόνα σε κάτι καινούργιο.</b> Μετά το περιῴκουν, σε ρωτάει το ἐπεσκόπει.</li>
      <li><b>Επανάληψη σε αποστάσεις.</b> Οι κάρτες ξανάρχονται σε 1, 3, 7, 14, 30 και 60 μέρες· από τον Μάιο όλες πριν την εξέταση.</li>
      <li><b>Θέμα της ημέρας.</b> Κάθε μέρα ένα Θέμα των Πανελλαδικών, βαθμολογημένο με τις μονάδες του.</li>
      <li><b>Χωρίς τιμωρία.</b> Ούτε καρδιές ούτε ζωές. Τα Σαββατοκύριακα δεν σπάνε το σερί.</li></ul>
    <h2>Ακρίβεια</h2><p>Κάθε κάρτα δηλώνει πού ελέγχθηκε: στη Γραμματική Οικονόμου, στο Συντακτικό Μουμτζάκη, στον Φάκελο Υλικού ή σε θέμα και κλειδί Πανελλαδικών (με τη χρονιά). Όσα δεν έχουν ελεγχθεί σημειώνονται «προς έλεγχο». Δεν λέμε «πιθανότητες»: λέμε μόνο τι ζητήθηκε στα διαγωνίσματα 2021-2026.</p>
    <h2>Δωρεάν, ανοιχτό, και τι μετράμε</h2><p>Το ${NAME} είναι δωρεάν και θα μείνει πάντα δωρεάν. Ο κώδικας είναι ανοιχτός με άδεια MIT: <a href="${REPO}">${REPO.replace("https://", "")}</a>. Χωρίς λογαριασμό, χωρίς διαφημίσεις. Το μόνο που κάνουμε είναι να μετράμε ανώνυμα με το <a href="https://posthog.com">PostHog</a> πώς χρησιμοποιείται η εφαρμογή (ποια μαθήματα ξεκινάς και τελειώνεις, πού δυσκολεύεσαι) και να βλέπουμε καταγραφές συνεδριών όπου ό,τι πληκτρολογείς είναι κρυμμένο. Έτσι βρίσκουμε τι να διορθώσουμε. Η πρόοδός σου μένει στον περιηγητή σου.</p>
    <h2>Η οικογένεια</h2><p>${NAME} είναι μία από τέσσερις δωρεάν εφαρμογές ανοιχτού κώδικα, η καθεμία ένα σύντομο καθημερινό παιχνίδι:</p><ul>${FAMILY.map((a) => `<li>${a.id === "gnothi" ? `<b>${a.name}</b>` : `<a href="${sisterHref(a)}">${a.name}</a>`}: ${a.el} (<a href="${a.repo}">κώδικας</a>)</li>`).join("")}</ul><p>Αν κάποια σε βοηθά, ένα αστέρι στο GitHub βοηθά κι άλλους να τη βρουν.</p>
    <a class="cta" href="/">Ξεκίνα</a>`;
  return page({ title: `Τι είναι το ${NAME}`, desc: DESC, path: "/about", body, jsonld: [{ "@context": "https://schema.org", "@type": "AboutPage", name: `Τι είναι το ${NAME}`, inLanguage: "el", url: `${SITE}/about` }] });
}

const notFound = () => page({ title: `Δεν βρέθηκε | ${NAME}`, desc: DESC, path: "/404", body: `<h1>Οὐκ ἔστιν</h1><p class="say">Αυτή η σελίδα δεν υπάρχει. Πίσω στην Ιερά Οδό.</p><a class="cta" href="/">Αρχική</a>`, jsonld: [] });

function appPage(appMarkup, units) {
  const jsonld = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: NAME, url: `${SITE}/`, description: DESC, applicationCategory: "EducationalApplication", operatingSystem: "Any (web browser)", inLanguage: "el", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" } },
    { "@context": "https://schema.org", "@type": "Course", name: `${NAME}: Αρχαία Ελληνικά Γ΄ Λυκείου για τις Πανελλαδικές`, description: DESC, isAccessibleForFree: true, inLanguage: "el", educationalLevel: "Γ΄ Λυκείου", hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT4M" }, offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", category: "Free" } },
  ];
  // The app markup carries its own head bits; drop them so the SEO head wins.
  const app = appMarkup.replace(/<title>[^<]*<\/title>\s*/, "").replace(/<meta (charset|name="(description|viewport)")[^>]*>\s*/g, "").replace(/<link rel="(preconnect|stylesheet)"[^>]*>\s*/g, "");
  const words = lexicon(units).length;
  const fallback = `<noscript><div style="max-width:640px;margin:24px auto;padding:0 16px;font-family:system-ui"><h1>${NAME}: ${TAGLINE}</h1><p>${esc(DESC)}</p><p><a href="/lexiko">Λεξικό (${words} λέξεις)</a> · <a href="/about">Τι είναι</a></p></div></noscript>`;
  const footer = `<footer class="site-foot" aria-label="Περισσότερα"><a href="/lexiko">Λεξικό</a><a href="/about">Τι είναι το Gnothi</a><a href="${REPO}">Δωρεάν για πάντα · ανοιχτός κώδικας στο GitHub</a>${SISTERS.map((a) => `<a href="${sisterHref(a)}">Αδελφή εφαρμογή: ${a.name}</a>`).join("")}</footer>`;
  return `<!doctype html><html lang="el"><head>${head({ title: `${NAME}: Αρχαία Ελληνικά για τις Πανελλαδικές, 4 λεπτά τη μέρα`, desc: DESC, path: "/", jsonld })}
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}img{max-width:100%}
.site-foot{max-width:560px;margin:-8px auto 0;display:flex;flex-wrap:wrap;gap:6px 16px;justify-content:center;font:700 13px/1.4 Nunito,system-ui,sans-serif;padding:0 max(16px,env(safe-area-inset-right,0px)) calc(96px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px))}
.site-foot a{color:var(--muted,#646b78);text-decoration:none}.site-foot a:hover{color:var(--brand,${THEME})}body:has(.lesson,.onboard) .site-foot{display:none}</style>
</head><body>${fallback}${app}${footer}</body></html>`;
}

/** Γλαύκη the owl, as a square icon. */
function owlSvg(x = 0, y = 0, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
<path d="M32 72q0-40 33-40t33 40v18q0 20-33 20T32 90z" fill="#8c7b66"/>
<path d="M30 70q-8 18 4 32" stroke="#5b4d3f" stroke-width="10" stroke-linecap="round" fill="none"/><path d="M100 70q8 18-4 32" stroke="#5b4d3f" stroke-width="10" stroke-linecap="round" fill="none"/>
<ellipse cx="65" cy="92" rx="22" ry="18" fill="#f1e8d6"/>
<path d="M38 36 28 8l20 22z" fill="#5b4d3f"/><path d="M92 36l10-28-20 22z" fill="#5b4d3f"/>
<path d="M36 42q29-14 58 0" stroke="#5b4d3f" stroke-width="5" fill="none" stroke-linecap="round"/>
<circle cx="52" cy="58" r="15" fill="#f1e8d6"/><circle cx="78" cy="58" r="15" fill="#f1e8d6"/>
<circle cx="52" cy="58" r="12" fill="#f2b826"/><circle cx="78" cy="58" r="12" fill="#f2b826"/>
<circle cx="52" cy="59" r="6" fill="#2b2a33"/><circle cx="78" cy="59" r="6" fill="#2b2a33"/><circle cx="54.2" cy="56.5" r="2" fill="#fff"/><circle cx="80.2" cy="56.5" r="2" fill="#fff"/>
<path d="M60 68l5 8 5-8z" fill="#d98c2b"/></g>`;
}
function iconSvg(size = 512) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130" width="${size}" height="${size}"><rect width="130" height="130" rx="28" fill="${THEME}"/>${owlSvg(0, -2, 0.92)}<text x="65" y="124" text-anchor="middle" font-family="GFS Didot, Noto Serif, Georgia, serif" font-weight="700" font-size="22" fill="#fff">Γνῶθι</text></svg>`;
}
function ogSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630"><rect width="1200" height="630" fill="${THEME}"/><rect x="40" y="40" width="1120" height="550" rx="36" fill="none" stroke="#c8961e" stroke-width="6"/>
<text x="110" y="300" font-family="GFS Didot, Noto Serif, Georgia, serif" font-weight="700" font-size="150" fill="#fff">Γνῶθι</text>
<text x="110" y="390" font-family="GFS Didot, Noto Serif, Georgia, serif" font-weight="600" font-size="54" fill="#faefd0">Γνῶθι σαυτόν. Γνῶθι το 20.</text>
<text x="110" y="470" font-family="Nunito, system-ui, sans-serif" font-weight="700" font-size="34" fill="#e3edf9">Αρχαία Ελληνικά για τις Πανελλαδικές, 4 λεπτά τη μέρα</text>
${owlSvg(800, 130, 2.6)}</svg>`;
}

export function buildSite(appMarkup, outDir) {
  const units = loadUnits({ example: false });
  const w = (rel, s) => { const f = new URL(rel, outDir); mkdirSync(new URL(".", f), { recursive: true }); writeFileSync(f, s); };
  w("index.html", appPage(appMarkup, units));
  w("lexiko.html", lexPage(units));
  w("about.html", aboutPage(units));
  w("404.html", notFound());
  const today = new Date().toISOString().slice(0, 10);
  w("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${["/", "/lexiko", "/about"].map((u) => `  <url><loc>${SITE}${u === "/" ? "/" : u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
  w("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
  w("favicon.svg", iconSvg(64));
  w("icon.svg", iconSvg(512));
  w("og.svg", ogSvg());
  // X and most chat apps ignore SVG previews: ship the rendered PNG from brand/og.html when it exists
  if (hasOgPng) copyFileSync(new URL("./brand/og.png", import.meta.url), new URL("og.png", outDir));
  w("manifest.webmanifest", JSON.stringify({ name: `${NAME}: ${TAGLINE}`, short_name: NAME, lang: "el", description: DESC, start_url: "/", display: "standalone", background_color: "#f6f3ec", theme_color: THEME, icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" }] }, null, 2));
  w("vercel.json", JSON.stringify({
    cleanUrls: true, trailingSlash: false,
    headers: [
      { source: "/(.*)", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }, { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }] },
      { source: "/(.*)\\.(svg|webmanifest)", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] },
    ],
  }, null, 2));
  return lexicon(units).length;
}
