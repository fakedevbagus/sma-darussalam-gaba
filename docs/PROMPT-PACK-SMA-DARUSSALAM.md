# SMA Darussalam — Website Hardening Prompt Pack

**Target agent:** Cline / Roo Code
**Project:** `sma-biru-ceria` — Next.js 14.2.13 App Router + Tailwind + framer-motion
**Language of prompts:** English. **Language of all user-facing copy in the app: Indonesian.**
**Scope:** Waves 0–5. Cleanup, honesty, feel polish, then layout. No CMS, no backend, no redesign.

---

## 0. How to use this file

1. Open the project folder in VS Code with Cline/Roo.
2. Work **one wave at a time, in order**. Do not jump ahead.
3. For each step, paste the fenced `PROMPT` block into Cline as-is.
4. After each wave: `npm run build` → fix errors → deploy → **open the site on a phone** → only then continue.
5. If a step's acceptance criteria fail, run its Rollback and stop. Do not improvise a fix.

### Line numbers

Line numbers in this file were read from the current source. **They are accurate for Wave 0 and Wave 1.** After Waves 1–2 edit files, later line numbers shift.

**Rule for the agent:** always locate code by searching for the quoted anchor string, and treat the line number as a hint only. If the anchor string is not found, **stop and report** — do not guess a nearby location.

### Effort legend

| Label | Meaning |
| --- | --- |
| 🟢 Low | One file, safe, visually invisible or near-invisible |
| 🟡 Medium | Multiple files or visible content change, still reversible in one commit |
| 🟠 High | Changes visible layout. One step per deploy, no batching |

---

## 1. Project facts — read before touching anything

```
Root:        next.config.mjs, tailwind.config.ts, tsconfig.json, package.json
App:         app/ (43 files, ~30 routes), app/globals.css (652 lines)
Components:  components/ (19 files)
Data:        config/school.ts (221 L), config/navigation.ts (73 L)
             lib/demo-data.ts (255 L), lib/utils.ts
Public:      public/logo.png (571x585), logo-white.png, favicon.png (64x64)
```

**All user-facing copy lives in `config/` and `lib/`.** Page components read from there.

**Deployed URL (live):** `https://sma-darussalam-glm53.vercel.app`
**`SCHOOL.url` currently points to a dead host** — fixed in step G1-1.

**Tailwind design tokens (LOCKED — never change these values):**
```
primary.500 #2735F5   navy #141a5e   royal #1a2170   deepsea #0b0d38
accent #22c8e6        pale #f6f8fe   sun #f5a623     mint #10b981   coral #ef4444
shadow-card  shadow-3d  shadow-float  shadow-yellow  shadow-blue-glow
border-[#ece4d4]   rounded-[28px]   card-warm   card-3d   glass-dark   gradient-text
Fonts: display = Fredoka, body = Plus Jakarta Sans
```

---

## 2. Global rules — NEVER violate

These come from the site owner directly. Breaking one of these is a failed task even if the code works.

### 2.1 Do not touch

| Area | Rule |
| --- | --- |
| **Colors & fonts** | Never change a Tailwind color value, font family, or font size scale. |
| **Navbar** | Do not restructure `components/Navbar.tsx`. Do not add underline/indicator animations to it. |
| **Navbar hide-on-scroll** | `components/Navbar.tsx` line ~25 `setHidden(window.scrollY > 150)` is **intended behavior**. Never "fix" it. |
| **Homepage overlay nav** | `overlay = pathname === "/"` in Navbar is intended. Do not change. |
| **`.btn` base class** | `app/globals.css` line ~525. The owner has explicitly excluded this from scope. Do not modify `.btn`, `.btn-navy`, `.btn-gold`, `.btn-outline`, `.btn-white`, or their call sites. |
| **Hero section** | `components/Hero.tsx` — layout, logo, slogans, stats, and button positions are frozen. |
| **News ticker shape** | `components/NewsTicker.tsx` — visual shape frozen. Only the hover-pause rule in G3-4 may be added. |
| **Principal section on homepage** | Frozen. |
| **Teacher/staff marquee on homepage** | Frozen. `{children}{children}` duplication in `components/Marquee.tsx` is intentional (seamless loop) — never "deduplicate" it. |
| **Alumni testimonial slider on homepage** | Slider mechanics, card shape and layout frozen. Only its *data* changes (G2-4). |
| **"Lokasi Kami" section on homepage** | Frozen, except the one banner removed in G1-5. |
| **WhatsApp CTA buttons** | Do not remove or hide them, even though the number is a placeholder. They sit inside frozen areas. |

### 2.2 Do not add

- **No "demo" / "sample" / "dummy" badges, banners, watermarks or labels anywhere.** The owner explicitly rejected this. Fabricated content is *removed or neutralised*, never labelled.
- No page-transition animation library (see G5-13 — recommended skipped).
- No analytics beyond the two named in G1-11 and G2-2.

### 2.3 Must maintain

- **Never hardcode user-facing text inside a page component.** All copy stays in `config/school.ts`, `config/navigation.ts`, or `lib/demo-data.ts`. This is what makes a CMS possible later. If a step needs new copy, add it to a config/data file and import it.
- **Mobile first.** The owner's primary device is a phone. Verify every visual step at 390px width before desktop.
- `tsconfig.json` has `strict: true`. Keep it. Do not add `any` to silence errors.

---

# WAVE 0 — Safety net

> The project is not under version control. This wave is the only one that must not be skipped.
> Run all three tasks in the order given below (gitignore before the first commit).

````
PROMPT — WAVE 0 (G0-3, G0-1, G0-2) · 🟢 Low

Set up a safety net for this project before any code changes.

TASK 1 — create .gitignore in the project root:

node_modules/
.next/
out/
build/
.DS_Store
*.pem
.env
.env*.local
.vercel
next-env.d.ts
*.tsbuildinfo
backup-*.zip

TASK 2 — create .env.example in the project root:

# GoatCounter site code (see step G2-2). Leave empty to hide the footer counter.
NEXT_PUBLIC_GOATCOUNTER_CODE=

TASK 3 — initialise git and record a baseline:

git init
git add -A
git commit -m "chore: baseline before Wave 1 hardening"
git tag baseline-w0

TASK 4 — create a zip backup next to the project folder named
backup-before-W1.zip containing the whole project EXCLUDING node_modules,
.next and .git.

ACCEPTANCE CRITERIA
- `git log --oneline` shows exactly one commit.
- `git status` is clean.
- `git ls-files | grep node_modules` returns nothing.
- backup-before-W1.zip exists and is under 10 MB.

DO NOT
- Do not change any application source file in this wave.
- Do not run `npm install` or add dependencies in this wave.

ROLLBACK
Not applicable — this wave only adds files.
````

**Repeat TASK 4 before every later wave**, renaming to `backup-before-W2.zip`, `backup-before-W3.zip`, etc. And commit at the end of every wave:
```
git add -A && git commit -m "feat: wave N complete" && git tag wave-N
```

---

# WAVE 1 — Cleanup and correctness

> All 🟢 Low. Nothing changes visually except G1-5, which is a deliberate removal.
> These 12 steps are independent of each other and may be batched 3–4 at a time.

## G1-1 · Point the site at its real domain · 🟢 Low

````
PROMPT — G1-1 · 🟢 Low

GOAL
`SCHOOL.url` points at a domain that does not exist, which breaks Open Graph
images, canonical URLs, robots.txt sitemap reference and sitemap.xml entries.

FILE
config/school.ts — line 129

ANCHOR (find this exact line)
  url: "https://www.smadarussalamsimpangmesir.sch.id",

CHANGE
Replace with the live deployment URL:
  url: "https://sma-darussalam-glm53.vercel.app",

Add a comment directly above it:
  /* Ganti ke domain .sch.id resmi begitu domain sudah aktif. */

WHY ONE LINE IS ENOUGH
Verify (do not change) that these consumers all read SCHOOL.url:
  app/layout.tsx line 9   metadataBase: new URL(SCHOOL.url)
  app/layout.tsx line 32  url: SCHOOL.url          (JSON-LD)
  app/layout.tsx line 33  logo: `${SCHOOL.url}${SCHOOL.logoUrl}`
  app/robots.ts line 11   sitemap: `${SCHOOL.url}/sitemap.xml`
  app/sitemap.ts line 5   const BASE = SCHOOL.url

DO NOT TOUCH
- Do not edit layout.tsx, robots.ts or sitemap.ts in this step.
- Do not add a trailing slash to the URL (new URL() will reject inconsistencies).

ACCEPTANCE CRITERIA
- `npm run build` succeeds with no metadataBase warning.
- Visiting /robots.txt shows the vercel.app sitemap URL.
- Visiting /sitemap.xml shows vercel.app URLs, not .sch.id.
- grep for "smadarussalamsimpangmesir.sch.id" returns only config/school.ts:105
  (the email address) and nothing else.

ROLLBACK
git checkout config/school.ts
````

## G1-2 · Fix the wrong founding year · 🟢 Low

````
PROMPT — G1-2 · 🟢 Low

GOAL
The navigation menu claims the school's history starts in 2005. The verified
founding year (Dapodik NPSN 70000262, SK Pendirian dated 30 Oct 2019) is 2019.

FILE
config/navigation.ts — line 23

ANCHOR
      { label: "Sejarah Singkat", href: "/profil/sejarah", desc: "Perjalanan sejak 2005" },

CHANGE
      { label: "Sejarah Singkat", href: "/profil/sejarah", desc: "Perjalanan sejak 2019" },

ACCEPTANCE CRITERIA
- grep -rn "2005" app components config lib  → returns nothing.
- The dropdown under "Profil" reads "Perjalanan sejak 2019".

ROLLBACK
git checkout config/navigation.ts
````

## G1-3 · Unify PPDB naming and academic year · 🟢 Low

````
PROMPT — G1-3 · 🟢 Low

GOAL
The site uses two different names for the same admissions programme ("PPDB"
and "PSPDB") and two different years ("2026/2027" and "2027"). Pick one:
"PPDB" and "2026/2027".

EXACTLY THREE OCCURRENCES — change only these:

1. app/page.tsx line 328
   FIND:  PSPDB 2027 GELOMBANG 1
   REPLACE: PPDB 2026/2027 GELOMBANG 1

2. app/page.tsx line 334
   FIND:  >Hubungi CS PSPDB<
   REPLACE: >Hubungi CS PPDB<

3. components/Hero.tsx line 95
   FIND:  Daftar PSPDB 2027
   REPLACE: Daftar PPDB 2026/2027

DO NOT TOUCH
- Do not change the surrounding className strings, icons, or element structure.
- Do not change the Hero button's size, position or style — only its text.
- Leave "PPDB 2026/2027" strings that are already correct alone
  (app/page.tsx:301, app/ppdb/page.tsx:76).

ACCEPTANCE CRITERIA
- grep -rn "PSPDB" app components config lib  → returns nothing.
- Homepage CTA badge, homepage CTA button and Hero button all read "PPDB".
- The Hero button occupies the same space as before (text length differs;
  confirm at 390px width that it does not wrap into a third line).

ROLLBACK
git checkout app/page.tsx components/Hero.tsx
````

## G1-4 · Hide dead social links and the fake phone number · 🟢 Low

````
PROMPT — G1-4 · 🟢 Low

GOAL
Four social icons in the footer link to "#" (they go nowhere), and the footer
prints a raw unformatted placeholder phone number "6281234567890". Hide what
is not real, without deleting the code, so it reappears automatically once real
values are filled in.

STEP 1 — config/school.ts, append at the end of the file:

/* ═══════════════════════════════════════════════════════════════
   PENJAGA DATA PLACEHOLDER
   Selama nilai kontak masih contoh, elemen terkait disembunyikan.
   Begitu diisi data asli, elemen muncul kembali otomatis.
   ═══════════════════════════════════════════════════════════════ */

/** Nomor WhatsApp contoh yang masih terpasang di config. */
export const PLACEHOLDER_WHATSAPP = "6281234567890";

/** true = nomor WhatsApp sudah diganti data asli. */
export const WHATSAPP_READY = SCHOOL.whatsapp !== PLACEHOLDER_WHATSAPP;

/** true = tautan sosial media sudah diisi (bukan "#" atau kosong). */
export function isLiveLink(href?: string) {
  const s = (href ?? "").trim();
  return s !== "" && s !== "#";
}

STEP 2 — components/SocialLinks.tsx

ANCHOR (line 23):
  const list = whatsapp ? ITEMS : ITEMS.filter(i => i.key !== "whatsapp");

REPLACE WITH:
  const base = whatsapp ? ITEMS : ITEMS.filter(i => i.key !== "whatsapp");
  const list = base.filter(i => isLiveLink(i.href));

Add isLiveLink to the existing import on line 2:
  import { SCHOOL, isLiveLink } from "@/config/school";

Also change line 29 from  href={href || "#"}  to  href={href}
(the filter above guarantees href is a real URL).

If `list` is empty, return null instead of rendering an empty flex row.

STEP 3 — components/Footer.tsx

ANCHOR (line 49):
              <a href={SCHOOL.social.whatsapp} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white transition"><Phone className="w-4 h-4 text-accent shrink-0" /> {SCHOOL.whatsapp}</a>

REPLACE WITH (wrap in the readiness guard AND use the formatted display value):
              {WHATSAPP_READY && (
                <a href={SCHOOL.social.whatsapp} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white transition"><Phone className="w-4 h-4 text-accent shrink-0" /> {SCHOOL.whatsappDisplay}</a>
              )}

Add WHATSAPP_READY to the import on line 6.

STEP 4 — check SCHOOL.phone
Run: grep -rn "SCHOOL.phone" app components
Its value is the placeholder "(+62) xxx-xxxx-xxxx". For every render site found,
wrap it in the same WHATSAPP_READY guard, or hide that single line. Report what
you found and what you did.

DO NOT TOUCH
- Do NOT hide or remove any WhatsApp CTA button (homepage CTA, Hero, floating
  WhatsApp button, PPDB page). Those are in frozen areas and must stay visible.
- Do not delete the ITEMS array entries — they must remain so real URLs work later.
- Do not change icon colors, sizes or spacing.

ACCEPTANCE CRITERIA
- Footer shows only the WhatsApp icon in the social row (facebook, instagram,
  tiktok, youtube are gone because they are "#").
- Footer "Hubungi Kami" block shows address and email, no phone line.
- Setting SCHOOL.social.instagram to a real URL makes the Instagram icon
  reappear with no other code change. Test this, then revert the test value.
- Floating WhatsApp button and homepage green WhatsApp CTA are still present.

ROLLBACK
git checkout config/school.ts components/SocialLinks.tsx components/Footer.tsx
````

## G1-5 · Remove the Dapodik verification banner below the homepage map · 🟢 Low

> Explicitly requested by the owner. This is the only intentional visual removal in Wave 1.

````
PROMPT — G1-5 · 🟢 Low

GOAL
Delete the full-width "Data sekolah terverifikasi Dapodik Kemendikdasmen"
banner that sits below the map section at the bottom of the homepage.

FILE
app/page.tsx — lines 363 to 373 (the last section before the closing </div>)

ANCHOR — delete this entire block, from the comment through the closing </section>:

      {/* ══════ BANNER VERIFIKASI DAPODIK ══════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-16">
        <Reveal>
          <a href={DAPO_URL} target="_blank" rel="noopener noreferrer"
            className="group flex flex-wrap items-center justify-center gap-x-3 gap-y-2 bg-gradient-to-r from-navy via-primary-800 to-primary-700 text-white rounded-[28px] px-6 py-5 shadow-3d hover:shadow-glow transition text-center">
            <ShieldCheck className="w-5 h-5 text-mint shrink-0" />
            <span className="text-sm font-semibold">Data sekolah terverifikasi <b>Dapodik Kemendikdasmen</b> — NPSN {SCHOOL.npsn}</span>
            <span className="chip bg-sun text-navy group-hover:scale-105 transition">Verifikasi ↗</span>
          </a>
        </Reveal>
      </section>

THEN clean up now-unused imports in app/page.tsx:
- Check whether ShieldCheck is still used anywhere in the file. If not, remove it
  from the lucide-react import.
- Check whether DAPO_URL is still used. It IS still used (the "Verifikasi Dapodik"
  pill inside the map card, around line 353) — so KEEP the DAPO_URL import.
- Run `npx tsc --noEmit` to confirm no unused-import or missing-symbol errors.

DO NOT TOUCH
- Do NOT remove the map section above it (the "Lokasi Kami" block, ~lines 340-361).
- Do NOT remove the "Verifikasi Dapodik" pill link inside the map card.
- Do not remove the Dapodik links in the footer.

ACCEPTANCE CRITERIA
- The homepage ends with the map / "Lokasi Kami" section.
- The dark gradient verification bar is gone.
- The map section and its "Verifikasi Dapodik" pill still work.
- No extra blank gap at the bottom of the page (check on a phone).
- `npm run build` succeeds.

ROLLBACK
git checkout app/page.tsx
````

## G1-6 · Fix the declared app icon size · 🟢 Low

````
PROMPT — G1-6 · 🟢 Low

GOAL
The web manifest declares /logo.png as 512x512, but the actual file is 571x585.
Browsers reject mismatched icons, so "add to home screen" gets no proper icon.

FILE
app/manifest.ts — line 16

ANCHOR
      { src: "/logo.png", sizes: "512x512", type: "image/png", purpose: "any" },

CHANGE (zero-risk option — declare the truth)
      { src: "/logo.png", sizes: "571x585", type: "image/png", purpose: "any" },

ACCEPTANCE CRITERIA
- Chrome DevTools > Application > Manifest shows no icon size error.
- `npm run build` succeeds.

OPTIONAL FOLLOW-UP (only if the owner asks)
Generate a true 512x512 public/logo-512.png from public/logo.png using the
already-installed `sharp` package, and declare that instead. Do not do this now.

ROLLBACK
git checkout app/manifest.ts
````

## G1-7 · Delete dead weight · 🟢 Low

````
PROMPT — G1-7 · 🟢 Low

GOAL
Remove a stray 478 KB screenshot, two installed-but-unused packages, their
leftover CSS, and dead code. Nothing here is referenced by the running app —
verify each with grep before deleting.

TASK 1 — delete the stray file
  rm bug.png
  Verify first: grep -rn "bug.png" app components config lib public → must be empty.

TASK 2 — remove unused dependencies
  Verify each is unreferenced:
    grep -rn "lenis" app components config lib      (expect: only globals.css)
    grep -rn "gray-matter" app components config lib (expect: nothing)
  Then:
    npm uninstall lenis gray-matter

TASK 3 — remove the orphaned Lenis CSS
  FILE app/globals.css — lines 221-225
  ANCHOR (delete these five lines including the comment):

/* ===== Lenis smooth scroll ===== */
html.lenis { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }

TASK 4 — remove the unused VISITOR_STATS export
  FILE lib/demo-data.ts — line 235
  ANCHOR:  export const VISITOR_STATS = { online: 3, today: 82, total: "11.044" };
  Verify first: grep -rn "VISITOR_STATS" app components → must be empty.
  Then delete the line.

TASK 5 — remove the no-op destructuring in Hero
  FILE components/Hero.tsx — line 37
  ANCHOR:  const { SCHOOL: S } = { SCHOOL };
  FIRST run: grep -n "\bS\." components/Hero.tsx
  - If there are NO matches, delete line 37.
  - If there ARE matches, leave line 37 alone and report that it is in use.
  Do not rewrite the rest of Hero.tsx either way.

DO NOT TOUCH
- Do not remove the `@media (prefers-reduced-motion: reduce)` block at
  globals.css lines 217-219. It is correct and needed.
- Do not remove sharp, swiper, framer-motion, lucide-react, clsx or tailwind-merge.
- Do not run `npm audit fix` or upgrade any package version.

ACCEPTANCE CRITERIA
- bug.png is gone; repo size drops by ~478 KB.
- package.json no longer lists lenis or gray-matter.
- grep -rn "lenis" returns nothing across the whole project (excluding node_modules).
- `npm run build` succeeds and `npx tsc --noEmit` is clean.
- The site looks pixel-identical to before. Scrolling behaviour unchanged.

ROLLBACK
git checkout . && npm install
````

## G1-8 · Register the avatar image host · 🟢 Low

> **Required before G4-9.** Without it, moving avatars to `next/image` throws a runtime error.

````
PROMPT — G1-8 · 🟢 Low

GOAL
lib/demo-data.ts uses i.pravatar.cc for staff and alumni photos, but that host
is not in next.config.mjs remotePatterns. Any future next/image usage on those
URLs will crash.

FILE
next.config.mjs — lines 4-7

ANCHOR
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' }
    ]

CHANGE
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'i.pravatar.cc' }
    ]

DO NOT TOUCH
- Do not modify the headers() or redirects() blocks in this file.
- Do not add any other image host.

ACCEPTANCE CRITERIA
- `npm run build` succeeds.
- No visual change (nothing uses next/image yet — that is G4-9).

ROLLBACK
git checkout next.config.mjs
````

## G1-9 · Give the PPDB form fields names · 🟢 Low

> **Required before G2-7.** Inputs without a `name` are invisible to `FormData`, so their values cannot be forwarded to WhatsApp.

````
PROMPT — G1-9 · 🟢 Low

GOAL
Seven required fields in the PPDB form have no `name` attribute, so their values
are silently dropped on submit. Add names. Change nothing else.

FILE
app/ppdb/page.tsx — lines 204-213

Apply exactly these seven additions. Keep every existing attribute, the order of
attributes, and every className string byte-identical.

Line 204  <input required placeholder="Tempat Lahir *" className="input" />
  ADD     name="tempat_lahir"

Line 205  <input required type="date" className="border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500" />
  ADD     name="tanggal_lahir"

Line 206  <input required inputMode="numeric" maxLength={10} placeholder="NISN (10 digit) *" className="input" />
  ADD     name="nisn"

Line 207  <input required placeholder="Asal SMP *" className="input" />
  ADD     name="asal_smp"

Line 208  <select value={jalur} onChange={e=>setJalur(e.target.value)} className="sm:col-span-2 input">
  ADD     name="jalur"

Line 211  <input required placeholder="Nama Orang Tua/Wali *" className="input" />
  ADD     name="nama_orangtua"

Line 212  <input required placeholder="No. HP Orang Tua *" className="input" />
  ADD     name="hp_orangtua"

Line 213  <textarea required rows={3} placeholder="Alamat Lengkap *" className="sm:col-span-2 resize-none input" />
  ADD     name="alamat"

DO NOT TOUCH
- Line 202: the honeypot input name="website" — leave exactly as is.
- Line 203: already has name="nama" — leave as is.
- Do not add labels in this step (that is a later accessibility item).
- Do not change the submit() function in this step (that is G2-7).
- Do not change any className.

ACCEPTANCE CRITERIA
- In the browser: fill the form, and in DevTools console run
  `new FormData(document.querySelector('form'))` then inspect entries —
  all nine fields (nama, tempat_lahir, tanggal_lahir, nisn, asal_smp, jalur,
  nama_orangtua, hp_orangtua, alamat) must be present with the typed values.
- The form looks and behaves exactly as before.
- `npm run build` succeeds.

ROLLBACK
git checkout app/ppdb/page.tsx
````

## G1-10 · Keep /e-raport public but out of Google · 🟢 Low

````
PROMPT — G1-10 · 🟢 Low

GOAL
robots.txt currently disallows /e-raport, but that page is linked from the main
navigation and the footer. A crawl-blocked but internally linked page is a
conflicting signal. The owner wants the page reachable by humans but not indexed.
The correct tool is a per-page noindex tag, not robots.txt.

STEP 1 — app/robots.ts, lines 5-11

ANCHOR
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/e-raport"],
    },
    sitemap: `${SCHOOL.url}/sitemap.xml`,
  };

CHANGE (remove the disallow line only)
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SCHOOL.url}/sitemap.xml`,
  };

STEP 2 — app/e-raport/page.tsx, the existing metadata export at lines 8-11

ANCHOR
export const metadata: Metadata = {
  title: "Portal Akademik — Dalam Pengembangan",
  description: `Portal akademik ${SCHOOL.name} (e-raport, jadwal, pengumuman kelas) sedang dalam tahap pengembangan.`,
};

CHANGE (add the robots field)
export const metadata: Metadata = {
  title: "Portal Akademik — Dalam Pengembangan",
  description: `Portal akademik ${SCHOOL.name} (e-raport, jadwal, pengumuman kelas) sedang dalam tahap pengembangan.`,
  robots: { index: false, follow: true },
};

STEP 3 — app/sitemap.ts
Check whether /e-raport is listed. If it is, remove that single entry.
Do not restructure the rest of the file.

DO NOT TOUCH
- Do not remove /e-raport from config/navigation.ts or FOOTER_QUICK.
  The page must stay reachable.
- Do not add noindex to any other page.

ACCEPTANCE CRITERIA
- /robots.txt no longer contains "Disallow: /e-raport".
- View source on /e-raport shows: <meta name="robots" content="noindex, follow">
- /e-raport still opens normally from the navbar and footer.
- /sitemap.xml does not list /e-raport.

ROLLBACK
git checkout app/robots.ts app/e-raport/page.tsx app/sitemap.ts
````

## G1-11 · Install Vercel Analytics · 🟢 Low

````
PROMPT — G1-11 · 🟢 Low

GOAL
Start collecting real traffic data in the owner's private Vercel dashboard.
This is separate from the public footer counter (G2-2) and they do not conflict.

STEP 1
  npm install @vercel/analytics

STEP 2 — app/layout.tsx

Add to the imports at the top:
  import { Analytics } from "@vercel/analytics/react";

ANCHOR (line 66, inside <body>, at the very end):
        <WhatsAppFloat />
      </body>

CHANGE
        <WhatsAppFloat />
        <Analytics />
      </body>

DO NOT TOUCH
- Do not reorder or modify Navbar, main, Footer, ScrollToTop or WhatsAppFloat.
- Do not modify the metadata export or the jsonLd object.
- Do not add @vercel/speed-insights (not requested).

ACCEPTANCE CRITERIA
- `npm run build` succeeds.
- After deploying, DevTools > Network shows a request to /_vercel/insights/*.
- No visual change of any kind.
- After ~30 minutes, the Vercel project dashboard > Analytics shows pageviews.

ROLLBACK
npm uninstall @vercel/analytics && git checkout app/layout.tsx
````

## G1-12 · Mobile grid re-check · 🟢 Low (inspection, not a code change)

````
PROMPT — G1-12 · 🟢 Low

GOAL
The owner's primary device is a phone. Verify every grid collapses cleanly at
390px before Wave 2 starts. This step is an audit: report findings, and fix ONLY
real overflow bugs.

METHOD
For each route below, open at 390x844 and check:
  (a) no horizontal scrollbar on <body>
  (b) no text clipped or overlapping
  (c) no card narrower than ~280px
  (d) tap targets at least 40px tall

ROUTES (in priority order)
  /  /prestasi  /berita  /agenda  /guru  /galeri  /ppdb  /kontak
  /profil  /profil/identitas  /profil/sejarah  /fasilitas  /ekskul
  /jurusan  /unduhan  /cari  /alumni  /osis  /faq

KNOWN INTENTIONAL BEHAVIOURS — do not report these as bugs
- The navbar hides when scrolling down. Intended.
- The homepage shows only a hamburger, no desktop nav links. Intended.
- The teacher marquee shows the staff list twice in a row. Intended (seamless loop).
- app/profil/identitas/page.tsx has a table with min-w-[420px] that scrolls
  horizontally inside its own container. Intended.

ALLOWED FIXES
Only add or correct a Tailwind responsive prefix (e.g. `grid-cols-1 sm:grid-cols-2`)
where a grid genuinely fails to collapse. Nothing else.

FORBIDDEN
- Do not change any color, font, radius, shadow or spacing token.
- Do not restructure any component.
- Do not "improve" a layout that merely looks tight but works. Layout changes
  belong to Wave 5.

DELIVERABLE
A short report: route → issue → the one-line fix applied, or "OK".
If you find zero real issues, say so — that is a valid and likely result.

ROLLBACK
git checkout .
````

### ✅ End of Wave 1

```
npm run build && npx tsc --noEmit
git add -A && git commit -m "feat: wave 1 cleanup" && git tag wave-1
```
Deploy → open on a phone → confirm the site looks unchanged except the removed banner.

---

# WAVE 2 — Make the content honest (no "demo" labels)

> The owner refused demo badges. So fabricated numbers and invented people are
> **removed or replaced with neutral copy**, never labelled. The site must still
> look finished and professional afterwards.

## G2-1 · Remove fabricated PPDB money and quota figures · 🟢 Low

````
PROMPT — G2-1 · 🟢 Low

GOAL
The PPDB page shows invented fees, discounts, a cashback offer, a scholarship
promise and a live quota counter. None of these are real school policy. Replace
them with neutral "contact the committee" copy. Keep every card shape, gradient,
border radius and grid position exactly as it is — only the text inside changes.

FILE
app/ppdb/page.tsx

--- CHANGE 1 — the cashback pill (line 119) ---
ANCHOR
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3"><Gift className="w-5 h-5 text-amber-600 shrink-0" /> <span><b>Cashback</b> 500rb ajak teman</span></div>
REPLACE the <span> content only:
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3"><Gift className="w-5 h-5 text-amber-600 shrink-0" /> <span>Informasi <b>keringanan biaya</b> via panitia</span></div>

Also review lines 117-118 in the same grid:
  "Gratis trial class 1 minggu"  → is this real school policy? If unverified,
     change to: <span><b>Konsultasi</b> gratis dengan panitia</span>
  "Pengumuman 3 hari setelah tes" → keep only if the PPDB schedule in
     lib/demo-data.ts ANNOUNCEMENTS ann-001 supports it; otherwise change to:
     <span>Pengumuman sesuai <b>jadwal PPDB</b></span>
Report which of the two you changed and why.

--- CHANGE 2 — the whole fee card (lines 124-138) ---
ANCHOR: the block starting
            <div className="bg-gradient-to-br from-navy to-primary-800 text-white rounded-[36px] p-8 relative overflow-hidden">
and ending with the matching closing </div> before line 139.

KEEP: the outer div and its className, the absolute blur circle div, the inner
  relative div, the Wallet icon header row.
REPLACE the numbers block (lines 128-136) with:

                <div className="mt-3">
                  <div className="text-2xl font-extrabold leading-tight">Informasi biaya menyusul</div>
                  <p className="text-sm text-white/70 mt-2 leading-6">Rincian biaya pendidikan tahun ajaran 2026/2027 sedang difinalisasi. Hubungi panitia PPDB untuk keterangan resmi.</p>
                </div>
                <a href={SCHOOL.social.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 bg-white text-navy px-5 py-3 rounded-full text-sm font-extrabold hover:scale-[1.02] transition">Tanya Panitia PPDB</a>

Delete: the line-through "Rp12.000.000", the "Rp8,4 Jt / diskon 30%" figure,
  the "HEMAT 3,6 JT • G1" chip, and the SPP / Seragam rows.

--- CHANGE 3 — the scholarship card (lines 139-147) ---
ANCHOR
              <h4 className="font-bold text-navy flex items-center gap-2"><Gift className="w-4 h-4 text-amber-600" /> Beasiswa Hingga 100%</h4>
REPLACE the heading text only (keep the h4, icon and classes):
              <h4 className="font-bold text-navy flex items-center gap-2"><Gift className="w-4 h-4 text-amber-600" /> Program Beasiswa</h4>
And change the intro of the list so it does not promise an amount. Replace the
<ul> (lines 141-146) with:
              <p className="mt-3 text-sm text-slate-600 leading-6">Sekolah menyediakan jalur bantuan biaya pendidikan. Kategori dan besaran ditetapkan setiap tahun ajaran — tanyakan ke panitia PPDB.</p>

--- CHANGE 4 — the fake live quota (lines 179-183) ---
ANCHOR
                <div className="mt-6 bg-white/15 backdrop-blur rounded-2xl p-4 border border-white/20 relative">
                  <div className="text-xs font-bold">SISA KUOTA GELOMBANG 1</div>
                  <div className="text-2xl font-extrabold mt-1">37 / 180</div>
                  <div className="h-2 bg-white/20 rounded-full mt-3 overflow-hidden"><div className="h-full w-[21%] bg-amber-400" /></div>
                </div>
REPLACE (same container, real Dapodik-backed content instead of a fake counter):
                <div className="mt-6 bg-white/15 backdrop-blur rounded-2xl p-4 border border-white/20 relative">
                  <div className="text-xs font-bold">DAYA TAMPUNG</div>
                  <div className="text-sm mt-2 leading-6 text-white/85">Kuota per jalur tercantum di bagian atas halaman. Ketersediaan terkini dikonfirmasi oleh panitia.</div>
                </div>

--- CHANGE 5 — the invented contact person (line 176) ---
ANCHOR
                  <div className="flex gap-3"><Phone className="w-4 h-4 mt-0.5" /> 0812-3456-7890 (Bu Sari)</div>
REPLACE
                  <div className="flex gap-3"><Phone className="w-4 h-4 mt-0.5" /> Kontak panitia via WhatsApp</div>

--- CHANGE 6 — the scholarship claim in the FAQ (line 39) ---
ANCHOR
  { q: "Apakah ada beasiswa?", a: "Ya! Beasiswa prestasi akademik, tahfidz & ekonomi hingga 100% uang pangkal + SPP." },
REPLACE
  { q: "Apakah ada beasiswa?", a: "Sekolah menyediakan jalur bantuan biaya pendidikan. Kategori dan besarannya ditetapkan setiap tahun ajaran — silakan tanyakan ke panitia PPDB." },

DO NOT TOUCH
- Do NOT add any "demo", "contoh" or "sample" label anywhere.
- Do not change the JALUR quota numbers (40/20/15/5) — those are plausible
  policy numbers, not fabricated money.
- Do not change any className, gradient, radius or grid span.
- Do not touch the STEPS, REQUIREMENTS arrays or the form itself.

ACCEPTANCE CRITERIA
- grep -n "Rp12.000.000\|Rp8,4\|Rp1,2\|Rp1,1\|Cashback\|500rb\|37 / 180\|HEMAT\|Hingga 100%\|Bu Sari" app/ppdb/page.tsx  → returns nothing.
- The fee card is still a dark navy gradient card in the same grid position and
  roughly the same height. The page has no empty hole where numbers used to be.
- No text on the page contains the word "demo".
- `npm run build` succeeds.

ROLLBACK
git checkout app/ppdb/page.tsx
````

## G2-2 · Replace the fake visitor counter with real GoatCounter numbers · 🟡 Medium

> **Owner decision #3 = b (real third-party counter).**
> **Two manual steps the owner must do first** — sign up at goatcounter.com, and in Settings enable **"Allow adding visitor counts on your website"** (off by default). Without that setting the numbers never appear.

````
PROMPT — G2-2 · 🟡 Medium

GOAL
components/VisitorStats.tsx currently invents its numbers: BASE_TOTAL = 11044,
BASE_DAILY = 62, Math.random() for "online", and a fake 7-day sparkline. Replace
with real counts from GoatCounter's free public counter endpoint.

Keep the footer's visual language identical: same <h3>, same <ul>, same
"flex justify-between bg-white/5 rounded-xl px-4 py-2.5 border border-white/10"
row styling, same tabular-nums bold value. Only the number of rows and the data
source change.

ROWS: after this change there are exactly two rows — "Bulan Ini" and
"Total Kunjungan". The "Sedang Online" row and the 7-day bar chart are DELETED,
because no free service provides that data honestly.

STEP 1 — environment variable
Add to .env.example (created in Wave 0) and to Vercel project env vars:
  NEXT_PUBLIC_GOATCOUNTER_CODE=
Leave it empty for now. The component must render nothing when it is empty,
so the footer degrades cleanly until the owner supplies the code.

STEP 2 — load the tracking script. FILE app/layout.tsx

Add import:
  import Script from "next/script";

ANCHOR (inside <body>, right before the closing </body>, after <Analytics />):
        <Analytics />
      </body>

CHANGE
        <Analytics />
        {process.env.NEXT_PUBLIC_GOATCOUNTER_CODE && (
          <Script
            data-goatcounter={`https://${process.env.NEXT_PUBLIC_GOATCOUNTER_CODE}.goatcounter.com/count`}
            src="https://gc.zgo.at/count.js"
            strategy="afterInteractive"
          />
        )}
      </body>

STEP 3 — rewrite components/VisitorStats.tsx completely with this file:

"use client";
import { useEffect, useState } from "react";

/**
 * Statistik pengunjung ASLI via GoatCounter (paket gratis).
 *
 * Prasyarat:
 *  1. NEXT_PUBLIC_GOATCOUNTER_CODE terisi kode situs GoatCounter.
 *  2. Di GoatCounter > Settings, opsi "Allow adding visitor counts on your
 *     website" HARUS dinyalakan (bawaannya mati).
 *
 * Catatan: GoatCounter men-cache angka counter hingga 4 jam, jadi kunjungan
 * baru tidak langsung terlihat. Ini normal.
 */
const GC = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE || "";

/** GoatCounter mengembalikan angka sebagai teks berformat; jadikan format id-ID. */
function toIdNumber(raw: string) {
  const n = parseInt(raw.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n.toLocaleString("id-ID") : raw;
}

async function fetchCount(start?: string): Promise<string | null> {
  try {
    const q = start ? `?start=${encodeURIComponent(start)}` : "";
    const res = await fetch(`https://${GC}.goatcounter.com/counter/TOTAL.json${q}`);
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data?.count === "string" ? toIdNumber(data.count) : null;
  } catch {
    return null;
  }
}

export default function VisitorStats() {
  const [total, setTotal] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);

  useEffect(() => {
    if (!GC) return;
    let alive = true;
    (async () => {
      const [t, m] = await Promise.all([fetchCount(), fetchCount("month")]);
      if (!alive) return;
      setTotal(t);
      setMonth(m);
    })();
    return () => {
      alive = false;
    };
  }, []);

  /* Belum dikonfigurasi atau layanan tidak menjawab → jangan tampilkan apa pun. */
  if (!GC || (total === null && month === null)) return null;

  return (
    <div>
      <h3 className="font-bold text-sm mb-4">Statistik Pengunjung</h3>
      <ul className="space-y-2 text-sm">
        {month !== null && (
          <li className="flex justify-between bg-white/5 rounded-xl px-4 py-2.5 border border-white/10">
            <span className="text-white/70">Bulan Ini</span>
            <b className="tabular-nums">{month}</b>
          </li>
        )}
        {total !== null && (
          <li className="flex justify-between bg-white/5 rounded-xl px-4 py-2.5 border border-white/10">
            <span className="text-white/70">Total Kunjungan</span>
            <b className="tabular-nums">{total}</b>
          </li>
        )}
      </ul>
    </div>
  );
}

STEP 4 — components/Footer.tsx
No change needed: line 55 already renders <VisitorStats />, and the component
now returns null when unconfigured. Verify the footer's 4-column grid still
looks balanced when the component renders nothing — if the 4th column collapses
awkwardly at desktop width, report it but DO NOT restructure the footer grid.

DO NOT TOUCH
- Do not change the footer grid, wave svg, watermark logo, quick links, or the
  "Hubungi Kami" block.
- Do not change the row styling classes quoted above — copy them byte for byte.
- Do not add a third counter service.
- Do not re-add a "Sedang Online" row using any invented or randomised value.

CSP NOTE
next.config.mjs currently sets no default-src / script-src / connect-src, so the
external script and fetch are allowed. If a stricter CSP is added later, it must
whitelist gc.zgo.at (script-src) and *.goatcounter.com (connect-src).

ACCEPTANCE CRITERIA
- With NEXT_PUBLIC_GOATCOUNTER_CODE empty: the footer renders with no
  "Statistik Pengunjung" block at all, and no console error.
- With a valid code set and the GoatCounter setting enabled: exactly two rows
  appear, both showing real numbers formatted Indonesian style (e.g. "1.204").
- grep -n "BASE_TOTAL\|BASE_DAILY\|Math.random\|sd_visit_count\|sparkline\|week" components/VisitorStats.tsx  → returns nothing.
- DevTools > Network shows a request to gc.zgo.at/count.js and to
  <code>.goatcounter.com/counter/TOTAL.json.
- `npx tsc --noEmit` is clean.

ROLLBACK
git checkout components/VisitorStats.tsx app/layout.tsx
````

## G2-3 · Build the empty-state card · 🟢 Low

> **Must be done before G2-4.** Emptying data arrays without this leaves visible holes.

````
PROMPT — G2-3 · 🟢 Low

GOAL
Create one reusable, on-brand "no data yet" card so that any section whose data
array is empty still looks designed rather than broken.

CREATE components/EmptyState.tsx

Requirements:
- Server component (no "use client" needed).
- Props: { title?: string; desc?: string; icon?: LucideIcon; className?: string }
- Defaults: title = "Segera hadir", desc = "Informasi ini sedang kami siapkan."
- Visual language must match existing cards on this site — reuse these exact
  tokens: rounded-[28px], border border-dashed border-[#ece4d4], bg-white,
  shadow-card, p-10 or p-12, text-center. Icon in a w-12 h-12 rounded-2xl
  bg-primary-50 text-primary-700 circle, centered above the title.
- Title: font-bold text-navy. Desc: text-sm text-slate-500 mt-2 max-w-sm mx-auto.
- Must look correct at 390px width.

REFERENCE — an empty state already exists in app/prestasi/page.tsx using
"rounded-2xl p-12 text-center border border-dashed". Match its spirit but use
rounded-[28px] and the icon treatment above. Do NOT modify that existing block
in this step.

FORBIDDEN COPY
Never use the words "demo", "dummy", "contoh", "sample", "placeholder" or
"belum diisi" in the default strings or in any usage.

ACCEPTANCE CRITERIA
- The component compiles and `npx tsc --noEmit` is clean.
- Rendering <EmptyState /> with no props shows the default Indonesian copy.
- It is not yet used anywhere (that happens in G2-4).

ROLLBACK
rm components/EmptyState.tsx
````

## G2-4 · Remove invented people · 🟡 Medium

> **Owner decision #2 = setuju.** The homepage testimonial slider keeps its
> shape, mechanics and layout; only its content is emptied.

````
PROMPT — G2-4 · 🟡 Medium

GOAL
lib/demo-data.ts contains invented named individuals with invented quotes and
achievements, and these are already publicly deployed. Remove the invented
people. Where a whole section becomes empty, show <EmptyState /> from G2-3.

IMPORTANT DISTINCTION
- The 11 STAFF entries (lines 93-105) are REAL people from Dapodik and must be
  KEPT. Only their photoUrl values are stock avatars — that is acceptable for
  now and is handled later when real photos arrive.
- Everything else listed below is invented.

--- CHANGE 1 — TESTIMONI (lines 228-233): empty the array ---
Replace the four objects with an empty array, keeping the export and a comment:

/** Testimoni alumni — diisi setelah ada kutipan asli + izin dari alumni. */
export const TESTIMONI: { name: string; year: string; kelas: string; text: string }[] = [];

Then open components/TestimoniSlider.tsx and add an early return:
  if (TESTIMONI.length === 0) return <EmptyState title="Testimoni alumni segera hadir" desc="Kami sedang mengumpulkan cerita dari para alumni." />;

CRITICAL: do NOT change the slider's markup, Swiper config, card classNames,
autoplay, breakpoints or the homepage section that wraps it. Only add the guard.

--- CHANGE 2 — ALUMNI (lines 158-165): empty the array ---
/** Data alumni — diisi setelah ada data & izin dari alumni. */
export const ALUMNI: { id: string; name: string; graduationYear: number; university: string; major: string; quote: string; currentStatus: string; photoUrl: string }[] = [];

Then app/alumni/page.tsx: the stats grid (line ~17) and the card grid (line ~29)
must handle length 0. Wrap the card grid so that when ALUMNI is empty it renders
<EmptyState title="Data alumni segera hadir" />. For the stats grid, either hide
it entirely when empty or show "—" instead of 0. Choose hiding it — a row of
zeros looks like a bug.

--- CHANGE 3 — ACHIEVEMENTS (lines 84-91): keep entries, strip invented names ---
Do NOT empty this array. The /prestasi page layout work in Wave 5 needs data to
verify against. Instead remove the invented student names from `description`:

  ach-01 description: "Rizky Pratama XII MIPA 1 — OSN Jakarta."
    → "Perwakilan sekolah pada Olimpiade Sains Nasional bidang Matematika."
  ach-02 "Tim futsal putra — 32 sekolah."
    → "Tim futsal putra sekolah pada kejuaraan tingkat kota."
  ach-03 "Tim robotik — KRI Bandung."
    → "Tim robotik sekolah pada Kontes Robot Indonesia regional."
  ach-04 keep as is (no personal name).
  ach-05 keep as is (no personal name).
  ach-06 "2 siswa terpilih Paskibraka Kota."
    → "Siswa terpilih sebagai anggota Paskibraka tingkat kota."

Leave title, category, year and rank untouched.

--- CHANGE 4 — ANNOUNCEMENTS ann-002 (line 25): strip the named student ---
FIND:  "Muhammad Rizky Pratama (XII MIPA 1) meraih emas OSN Matematika di Jakarta. Pembinaan intensif tim olimpiade + lab modern."
REPLACE: "Perwakilan SMA Darussalam meraih medali emas OSN Matematika. Hasil ini didukung pembinaan intensif tim olimpiade sekolah."
Also change the title on line 23 from
  "Siswa SMA Darussalam Raih Medali Emas OSN Matematika 2025"
to keep it (no name in the title) — leave the title as is.

--- CHANGE 5 — EXTRACURRICULARS coach names (lines 72-81): neutralise ---
All ten `coach` values are invented people ("Kak Rina Amalia, S.Pd.",
"Kapten Bambang S.", etc.). Replace every coach value with:
  coach: "Pembina: menyusul"
EXCEPT where the coach matches a real STAFF member from Dapodik — check each
against the STAFF array. "Andi Firmansyah, S.Or." (ek-03) and
"Denny Kurniawan" (ek-07) DO match real staff; keep those two, but correct
ek-07 from "S.T." to "S.Kom." to match STAFF stf-07. Report your matches.

--- CHANGE 6 — OSIS_DATA.structure (lines 172-177): empty it ---
  structure: [] as { name: string; position: string; year: string; photoUrl: string }[],
Then app/osis/page.tsx must render <EmptyState title="Struktur OSIS segera hadir" />
where the structure grid was. Also review OSIS_DATA.activities (lines 184-187):
"Perayaan HUT ke-20" is impossible for a school founded in 2019 — change to
"Perayaan HUT sekolah".

DO NOT TOUCH
- The STAFF array (11 real people from Dapodik).
- Any slider mechanics, card className, grid definition or section ordering.
- The homepage testimonial section wrapper.
- Do not add any "demo" label. Empty states say "Segera hadir", nothing more.

ACCEPTANCE CRITERIA
- grep -rn "Nabila Yesy\|Alya Putri\|Melani Selviana\|Wahyu Agung\|Ahmad Fadillah\|Siti Nurhaliza\|Rizky Pratama\|Dewi Anggraini\|Andi Prasetyo\|Maya Sari\|Nayla Putri\|Bima Saputra\|Aisyah K\|Rafi H\|Rina Amalia\|Aisyah Rahmadani\|Bagas Prakoso\|Citra Ayu" lib config app components  → returns nothing.
- Homepage testimonial section shows one EmptyState card, and the slider
  container/section spacing is visually unchanged around it.
- /alumni shows an EmptyState, no row of zeros.
- /osis shows an EmptyState for the structure, other sections intact.
- /prestasi still lists 6 achievements with no personal names.
- /ekskul still lists 10 activities.
- No page shows the word "demo" or an empty white gap.
- `npm run build` succeeds.

ROLLBACK
git checkout lib/demo-data.ts app/alumni/page.tsx app/osis/page.tsx components/TestimoniSlider.tsx
````

## G2-5 · Align the facilities list with reality · 🟡 Medium

````
PROMPT — G2-5 · 🟡 Medium

GOAL
lib/demo-data.ts FACILITIES (lines 58-69) makes specific claims that are not
supported by the school's own Dapodik record: "12.000+ buku", "60 PC +
3D printing", "Masjid 2 lantai", "Kapasitas 800 orang", "ber-AC", "trek lari".

Verified Dapodik sarana (NPSN 70000262):
  Ruang Kelas 8 · Ruang Perpustakaan 1 · Ruang Kepala Sekolah 1 ·
  Laboratorium Komputer 1 · Toilet Siswa 2 · Toilet Guru 2  (all "Sedang")

IMPORTANT NUANCE — do not simply delete everything not in that list.
The same Dapodik record reports data freshness for "Ruang" at 0% and overall
validity at 71.58%, i.e. the room inventory is stale. Absence from Dapodik does
NOT prove a facility does not exist. So:

RULE
- KEEP every facility entry.
- REMOVE every specific quantity, capacity, and superlative that cannot be
  verified. Describe function, not scale.

REWRITE the `description` of each entry as follows (keep id, image, name,
category, icon completely unchanged):

  fac-01 Perpustakaan Digital
    → "Ruang perpustakaan dengan koleksi buku pelajaran dan bacaan umum."
  fac-02 Lab IPA Terpadu
    → "Ruang praktikum untuk mata pelajaran sains."
  fac-03 Lab Komputer & Robotik
    → "Laboratorium komputer untuk pembelajaran Informatika dan kegiatan robotik."
  fac-04 Studio Musik & Seni
    → "Ruang kegiatan seni musik dan seni rupa."
  fac-05 Masjid & Ruang Ibadah
    → "Tempat ibadah dan pembinaan karakter religius."
  fac-06 Aula Serbaguna
    → "Ruang serbaguna untuk kegiatan sekolah, seminar, dan pentas."
  fac-07 Lapangan Olahraga
    → "Lapangan untuk kegiatan olahraga dan upacara."
  fac-08 Kantin Sehat
    → "Kantin sekolah dengan menu bergizi dan halal."
  fac-09 UKS
    → "Unit Kesehatan Sekolah untuk pertolongan pertama dan layanan kesehatan."
  fac-10 Green House Edukasi
    → "Kebun edukasi untuk pembelajaran biologi dan lingkungan."

ALSO FIX the same claims where they are duplicated elsewhere:
  lib/demo-data.ts line 152, PROGRAMS "teknologi-robotik":
    "60 PC, 3D printing, robotik — informatika & kompetisi."
    → "Laboratorium komputer, robotik, dan kompetisi informatika."
  Then run: grep -rn "12.000\|60 PC\|3D printing\|2 lantai\|800 orang\|ber-AC\|trek lari" app components config lib
  and neutralise every remaining hit the same way. Report each one.

DELIVERABLE — REPORT FOR THE OWNER
List the 7 facilities NOT present in the Dapodik sarana record:
  Lab IPA Terpadu, Studio Musik & Seni, Masjid & Ruang Ibadah, Aula Serbaguna,
  Lapangan Olahraga, Kantin Sehat, UKS, Green House Edukasi
and ask the owner to confirm which actually exist so the non-existent ones can
be deleted later. Do not delete any of them yourself.

DO NOT TOUCH
- Do not change the `image` URLs (stock photos are replaced later, with real photos).
- Do not change FACILITIES array length or ordering.
- Do not change the DAPODIK object in config/school.ts — it is verified data.
- Do not restructure app/fasilitas/page.tsx (that is G5-6, and it must come after this).

ACCEPTANCE CRITERIA
- grep -rn "12.000\|60 PC\|3D printing\|2 lantai\|800 orang" app components config lib → returns nothing.
- /fasilitas still shows 10 cards in the same grid with the same images.
- No description contains a number that is not in the Dapodik record.
- The written report listing the 7 unconfirmed facilities is delivered.

ROLLBACK
git checkout lib/demo-data.ts
````

## G2-6 · Stop dates from freezing at build time · 🟡 Medium

````
PROMPT — G2-6 · 🟡 Medium

GOAL
lib/demo-data.ts lines 6-11 define iso(daysAgo) and isoFuture(daysFromNow) which
call new Date() at MODULE LOAD. On a statically generated Next.js site that
means every news date and every agenda date is frozen at the moment of the last
build. Weeks later the site claims news is "1 day ago" when it is months old.

FIX — replace relative helpers with fixed ISO dates.
This is the honest fix: real content has real dates, and real dates arrive with
the real content.

STEP 1 — ANNOUNCEMENTS (lines 13-56)
Replace each `createdAt: iso(N)` with a literal ISO string. Use dates that keep
the existing relative ordering and are consistent with the content:
  ann-001 iso(1)  → "2026-09-01T08:00:00+07:00"
  ann-002 iso(4)  → "2026-08-29T09:00:00+07:00"
  ann-003 iso(6)  → "2026-08-27T10:00:00+07:00"
  ann-004 iso(9)  → "2026-08-24T09:00:00+07:00"
  ann-005 iso(12) → "2026-08-21T09:00:00+07:00"
  ann-006 iso(15) → "2026-08-18T09:00:00+07:00"

STEP 2 — EVENTS (lines 107-114)
Replace each isoFuture(N) with a literal ISO string, preserving order and any
start/end relationship:
  evt-01 → start & end "2026-09-07T07:00:00+07:00"
  evt-02 → start & end "2026-09-10T09:00:00+07:00"
  evt-03 → start "2026-09-17T08:00:00+07:00", end "2026-09-19T15:00:00+07:00"
  evt-04 → start & end "2026-09-25T08:00:00+07:00"
  evt-05 → start "2026-10-09T07:30:00+07:00", end "2026-10-20T12:00:00+07:00"
  evt-06 → start & end "2026-10-25T08:00:00+07:00"

STEP 3 — DOWNLOADS (lines 132-136)
Replace each `updatedAt: iso(N)` with a literal ISO date, same approach.

STEP 4 — delete the now-unused helpers (lines 6-11)
First verify: grep -n "iso(\|isoFuture(" lib/demo-data.ts app components
must return nothing. Then delete both function declarations.

STEP 5 — verify consumers still work
  formatDateId() at line 201 parses the string with new Date() — literal ISO
  strings with an explicit +07:00 offset parse correctly. Confirm no page shows
  "Invalid Date".
  app/agenda/page.tsx splits upcoming vs past by comparing to now. With fixed
  dates, events will progressively become "past". That is CORRECT and expected —
  do not add logic to keep them artificially in the future.

DO NOT TOUCH
- Do not add `export const dynamic = "force-dynamic"` or `revalidate` anywhere.
  That would trade the whole site's static performance for fake freshness.
- Do not change the shape of any data object, only date values.
- Do not change formatDateId().

ACCEPTANCE CRITERIA
- grep -n "function iso\|isoFuture" lib/demo-data.ts → returns nothing.
- /berita shows six items with stable Indonesian-formatted dates that do not
  change between two consecutive builds. Verify by building twice and diffing
  the rendered date text.
- /agenda renders without error and its mini calendar still highlights event days.
- No "Invalid Date" text anywhere.
- `npx tsc --noEmit` is clean.

ROLLBACK
git checkout lib/demo-data.ts
````

## G2-7 · Turn the PPDB form into a WhatsApp handoff · 🟡 Medium

> **Owner decision G2=d.** No storage, no backend, no cost. The form collects, then hands the values to WhatsApp.
> **Depends on G1-9** (fields must have `name` attributes).

````
PROMPT — G2-7 · 🟡 Medium

GOAL
app/ppdb/page.tsx currently fabricates a registration number with Math.random()
and sends the form nowhere, then offers a "check status" box backed by a
hardcoded 3-entry map. A visitor can complete the form and believe they are
registered when nothing was recorded. Fix by forwarding the filled values to the
committee's WhatsApp.

--- CHANGE 1 — rewrite submit() (lines 51-59) ---

REPLACE the whole function with:

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) { setSent(true); return; } // honeypot anti-spam

    const jalurLabel = JALUR.find(j => j.value === f.get("jalur"))?.label ?? String(f.get("jalur") ?? "-");
    const val = (k: string) => String(f.get(k) ?? "-").trim() || "-";

    setNama(val("nama"));

    const lines = [
      "Halo panitia PPDB SMA Darussalam.",
      "Saya ingin mendaftar dengan data berikut:",
      "",
      `Nama calon siswa: ${val("nama")}`,
      `Tempat/tanggal lahir: ${val("tempat_lahir")}, ${val("tanggal_lahir")}`,
      `NISN: ${val("nisn")}`,
      `Asal SMP: ${val("asal_smp")}`,
      `Jalur: ${jalurLabel}`,
      `Nama orang tua/wali: ${val("nama_orangtua")}`,
      `No. HP orang tua: ${val("hp_orangtua")}`,
      `Alamat: ${val("alamat")}`,
      "",
      "Mohon informasi langkah selanjutnya. Terima kasih.",
    ];

    const url = `https://wa.me/${SCHOOL.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  }

--- CHANGE 2 — delete checkStatus() (lines 61-71) entirely ---
Also delete the now-unused state: regNumber, setRegNumber, statusNo, setStatusNo,
statusResult, setStatusResult (lines 45, 48, 49).
Keep: jalur, sent, nama, openFaq.

--- CHANGE 3 — rewrite the success panel (lines 187-198) ---
The fake registration number must go. Replace the inner content of the
`sent ? (...)` branch with:

                  <div className="py-14 text-center">
                    <span className="w-16 h-16 mx-auto rounded-full bg-primary-50 text-primary-700 flex items-center justify-center"><PartyPopper className="w-8 h-8" /></span>
                    <h2 className="font-display font-extrabold text-2xl text-navy mt-5">Data terkirim ke WhatsApp panitia</h2>
                    <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">Terima kasih, {nama}. Jendela WhatsApp sudah terbuka dengan data pendaftaranmu — tekan kirim di WhatsApp agar panitia menerimanya. Pendaftaran dianggap masuk setelah panitia membalas.</p>
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                      <a href={SCHOOL.social.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold">Buka WhatsApp Panitia</a>
                      <Link href="/" className="btn-navy">Kembali ke Beranda</Link>
                    </div>
                  </div>

Remove the third button ("Cek Status Sekarang") — the feature no longer exists.
Keep the .btn-gold and .btn-navy classNames exactly as written (the .btn base
class is out of scope and must not be touched).

--- CHANGE 4 — delete the whole "Cek Status" section (lines 224-248) ---
Delete from `<section id="cek-status" className="mt-12">` through its closing
`</section>`. A status checker that only knows three invented names is worse than
none.

Then update the two places that reference it:
  app/ppdb/page.tsx line 38 (FAQS):
    { q: "Bagaimana cek status?", a: "Gunakan kolom Cek Status di bagian bawah halaman ini, masukkan nomor registrasi Anda." }
    → { q: "Bagaimana cek status?", a: "Panitia menghubungi setiap pendaftar langsung melalui WhatsApp. Balas pesan pendaftaranmu untuk menanyakan perkembangan." }
  lib/demo-data.ts FAQS line 142 (faq-03):
    "Di halaman PPDB → Cek Status → masukkan nomor registrasi."
    → "Panitia menghubungi pendaftar via WhatsApp. Balas pesan pendaftaranmu untuk menanyakan perkembangan."

--- CHANGE 5 — fix the footnote under the form (line 215) ---
ANCHOR
                    <p className="sm:col-span-2 text-xs text-slate-500 text-center flex gap-2 justify-center items-start"><CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" /> Data demo — tidak dikirim ke server. Dengan mendaftar, Anda menyetujui syarat & ketentuan PPDB.</p>
REPLACE (removes the word "demo", states what actually happens)
                    <p className="sm:col-span-2 text-xs text-slate-500 text-center flex gap-2 justify-center items-start"><CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" /> Setelah dikirim, data akan diteruskan ke WhatsApp panitia PPDB untuk diverifikasi. Dengan mendaftar, Anda menyetujui syarat & ketentuan PPDB.</p>

--- CHANGE 6 — clean unused imports ---
Run `npx tsc --noEmit` and remove any lucide-react icon that is now unused
(likely Search and BadgeCheck). Do not remove icons still in use.

DO NOT TOUCH
- The form's grid, input classNames, JALUR selector cards, STEPS, REQUIREMENTS.
- The honeypot input.
- The .btn / .btn-gold / .btn-navy CSS definitions.
- Do not add a database, API route, email service, or any paid service.

KNOWN LIMITATION TO REPORT
SCHOOL.whatsapp is still the placeholder "6281234567890", so the generated
wa.me link goes to a number the school does not own. State clearly in your report
that this step is functionally complete but requires the real WhatsApp number in
config/school.ts line 103 before the PPDB form can be published to parents.

ACCEPTANCE CRITERIA
- grep -n "Math.random\|PPDB-2026-\|checkStatus\|statusResult\|cek-status" app/ppdb/page.tsx → returns nothing.
- Filling and submitting the form opens a WhatsApp window whose prefilled
  message contains all nine field values on separate labelled lines.
- The "Cek Status" section is gone; no dead link or empty anchor remains.
- No text on the page contains "demo".
- `npm run build` succeeds and `npx tsc --noEmit` is clean.

ROLLBACK
git checkout app/ppdb/page.tsx lib/demo-data.ts
````

### ✅ End of Wave 2

```
npm run build && npx tsc --noEmit
git add -A && git commit -m "feat: wave 2 honest content" && git tag wave-2
```
Deploy → phone check. The site must contain **zero** occurrences of "demo", and no empty gaps.

---

# WAVE 3 — Feel polish (safe) ⭐ THE "STABLE" LINE

> All 🟢 Low. No layout, color, font or size changes. Only motion and feedback.
> **When this wave is deployed and verified, the project is at its stable target.** Stop here and let it run before starting Wave 4.

## Two things already exist — do not rebuild them

Before starting, verify these and skip the corresponding work:

| Already in the code | Location |
| --- | --- |
| Marquee pause-on-hover | `app/globals.css:158` — `.marquee:hover .marquee-track { animation-play-state: paused; }` |
| `prefers-reduced-motion` guard | `app/globals.css:217-219` |
| Scroll reveal component | `components/Reveal.tsx` (framer-motion, `whileInView`, `once: true`) |
| Count-up component | `components/CountUp.tsx`, currently used only at `app/page.tsx:65` |

## G3-1 · Staggered card reveal · 🟢 Low  ← the single most noticeable step

````
PROMPT — G3-1 · 🟢 Low

GOAL
components/Reveal.tsx already fades content in on scroll and accepts a `delay`
prop, but list grids currently reveal all cards simultaneously. Make cards in a
grid arrive one after another.

METHOD
For each grid listed below, wrap each mapped card in <Reveal> and pass an
index-based delay. Cap the delay so long lists do not feel slow:

  <Reveal key={item.id} delay={Math.min(i * 0.06, 0.4)}>
    ...existing card JSX, completely unchanged...
  </Reveal>

Rules:
- The card's own className, structure and content must not change at all.
- Move the existing `key` onto the <Reveal>; do not leave a duplicate key.
- Use the map's index parameter; add `, i` to the map signature if absent.
- If a grid already wraps cards in <Reveal> without a delay, only add the delay.

APPLY TO these grids (search for the grid className to locate each):
  app/prestasi/page.tsx      achievement card list  ("mt-6 grid gap-4 max-w-4xl mx-auto")
  app/guru/page.tsx          teacher card grid
  app/berita/page.tsx        news card grid  ("mt-8 grid md:grid-cols-3 gap-6")
  app/galeri/page.tsx        gallery grid
  app/ekskul/page.tsx        extracurricular grid
  app/fasilitas/page.tsx     facilities grid
  app/unduhan/page.tsx       downloads grid
  app/alumni/page.tsx        alumni grid (skip if EmptyState renders)

DO NOT APPLY TO
- The homepage teacher/staff marquee (frozen, and it scrolls continuously).
- The news ticker.
- The homepage Hero and its stats.
- Navbar or Footer.
- app/profil/identitas/page.tsx (Wave 5 restructures it; avoid double work).

PERFORMANCE NOTE
Reveal is a client component. Wrapping many items adds client boundaries. If a
grid renders more than ~30 items, apply the stagger only to the first 12 and
render the rest without a wrapper. Report where you did this.

ACCEPTANCE CRITERIA
- Scrolling /prestasi, /berita and /galeri on a phone shows cards arriving in
  sequence, roughly 60ms apart, not all at once.
- Each card's final position and appearance is pixel-identical to before.
- Reveal fires once per card and does not replay on scroll back up.
- With OS "reduce motion" enabled, content still appears (does not stay invisible).
- `npm run build` succeeds; no duplicate-key warnings in the console.

ROLLBACK
git checkout app/prestasi/page.tsx app/guru/page.tsx app/berita/page.tsx app/galeri/page.tsx app/ekskul/page.tsx app/fasilitas/page.tsx app/unduhan/page.tsx app/alumni/page.tsx
````

## G3-2 · Tactile button press · 🟢 Low

````
PROMPT — G3-2 · 🟢 Low

GOAL
Make buttons feel physically pressed. A press transform already exists at
app/globals.css:537 (`.btn:active { transform: translateY(-1px) scale(.98) }`).
Extend the same feel to the many Tailwind-only buttons that do not use .btn.

FILE
app/globals.css — add a NEW rule block near the end of the file.
DO NOT edit the existing .btn rules (lines ~525-604). They are out of scope.

ADD

/* ===== M7 — umpan balik tekan untuk semua tombol & link tombol ===== */
@media (hover: hover) {
  button:not(:disabled):active,
  a[role="button"]:active {
    transform: scale(0.97);
  }
}
button, a[role="button"] {
  transition: transform 0.12s cubic-bezier(0.22, 1, 0.36, 1);
}
button:disabled { transform: none !important; }

DO NOT TOUCH
- .btn, .btn-navy, .btn-gold, .btn-outline, .btn-white and their existing rules.
- The duplicated .btn-outline / .btn-white blocks at lines ~593-604. Leave the
  duplication alone; it is a known, deliberately out-of-scope item.
- Do not add a JS ripple library.

ACCEPTANCE CRITERIA
- Pressing and holding any button (filter chips, FAQ toggles, form submit,
  gallery controls) visibly shrinks it slightly, and it springs back on release.
- Disabled buttons (e.g. the PPDB "Cek" button before this wave, any disabled
  submit) do not move.
- No button changes its resting size, color or position.
- Navbar buttons are unaffected in resting state (a press effect on them is
  acceptable; a layout change is not).

ROLLBACK
git checkout app/globals.css
````

## G3-3 · Numbers that count up · 🟢 Low

````
PROMPT — G3-3 · 🟢 Low

GOAL
components/CountUp.tsx exists but is used in only one place (app/page.tsx:65).
Apply it to the other statistic displays.

APPLY TO
1. app/prestasi/page.tsx — the stats bar
   ("bg-white rounded-[28px] p-4 shadow-card border border-[#ece4d4] flex flex-wrap justify-center gap-6").
   Wrap each numeric value, including the computed `juara1` count.
2. app/profil/identitas/page.tsx — the three Dapodik stat cards in Blok 03
   (Peserta Didik, Rombel, PTK). Wrap the large numbers only.
3. app/alumni/page.tsx — the stats grid, ONLY if it still renders (it may be
   hidden by G2-4). Skip if hidden.

METHOD
Replace the raw value with <CountUp value={String(theValue)} />, preserving the
surrounding element and all classNames. CountUp takes a string `value` and an
optional className — read components/CountUp.tsx first and match its API exactly.

DO NOT TOUCH
- The Hero stats on the homepage (already using CountUp — leave as is).
- Any font size, weight or color.
- The percentage bars in profil/identitas (the Bar helper at line 17) — those
  animate differently and are out of scope.
- Do not animate the year "2019" as a counted number if it reads oddly; leave
  year values static and report that choice.

ACCEPTANCE CRITERIA
- Opening /prestasi animates the achievement counts from 0 to their value once.
- Opening /profil/identitas animates 246, 7 and 11.
- Numbers land on exactly the correct final value (no off-by-one, no "NaN").
- Layout does not shift while counting (the container must not resize).
- Counting happens once, not on every scroll.

ROLLBACK
git checkout app/prestasi/page.tsx app/profil/identitas/page.tsx app/alumni/page.tsx
````

## G3-4 · Pause the news ticker on hover · 🟢 Low

````
PROMPT — G3-4 · 🟢 Low

GOAL
The scrolling announcement ticker cannot be read or clicked reliably because it
never stops. Add pause-on-hover.

IMPORTANT — HALF OF THIS IS ALREADY DONE
app/globals.css:158 already contains:
  .marquee:hover .marquee-track { animation-play-state: paused; }
So the homepage teacher marquee already pauses. Verify this in the browser and
do NOT duplicate that rule.

WHAT IS MISSING
components/NewsTicker.tsx uses the Tailwind utility `animate-ticker`
(keyframes at app/globals.css:408), which has no pause rule.

CHANGE — components/NewsTicker.tsx, line 17
ANCHOR
          <div className="flex whitespace-nowrap gap-10 text-xs font-bold animate-ticker">
REPLACE
          <div className="flex whitespace-nowrap gap-10 text-xs font-bold animate-ticker ticker-track">

THEN add to app/globals.css (new rule, near the ticker keyframes):

/* ===== M10 — ticker berhenti saat disentuh agar bisa dibaca & diklik ===== */
.ticker-track:hover,
.ticker-track:focus-within {
  animation-play-state: paused;
}

DO NOT TOUCH
- The ticker's gradient background, height, padding, "Info" badge, or the
  Megaphone icon.
- The `doubled` array on line 9 — that duplication creates the seamless loop.
- The existing .marquee:hover rule at line 158.
- Do not change the animation duration.

ACCEPTANCE CRITERIA
- Hovering the ticker stops it; moving away resumes it from the same position.
- Tabbing into a ticker link with the keyboard also pauses it (focus-within).
- Ticker links are clickable while paused.
- The homepage teacher marquee still pauses on hover (unchanged behaviour).
- Ticker appearance and speed are otherwise identical.

ROLLBACK
git checkout components/NewsTicker.tsx app/globals.css
````

## G3-5 · Proper keyboard focus rings · 🟢 Low

````
PROMPT — G3-5 · 🟢 Low

GOAL
Keyboard users currently get the browser's default focus outline, which clashes
with the design and is invisible on dark backgrounds (footer, navy CTA sections).
Replace with a branded, always-visible focus ring.

FILE
app/globals.css — add a new rule block. Do not modify existing rules.

ADD

/* ===== P1 — cincin fokus keyboard (tidak muncul saat diklik mouse) ===== */
:focus-visible {
  outline: 2px solid #2735F5;
  outline-offset: 3px;
  border-radius: 6px;
}
/* Di atas latar gelap, gunakan cincin terang agar tetap terlihat. */
.bg-navy :focus-visible,
.bg-deepsea :focus-visible,
footer :focus-visible {
  outline-color: #ffffff;
}
/* Matikan outline bawaan yang muncul saat klik mouse. */
:focus:not(:focus-visible) {
  outline: none;
}

ALSO — the skip link
app/globals.css defines .skip-link at lines ~28 and ~40, but no element uses it
and <main> has no id. Complete it:
  1. app/layout.tsx line 63: change
       <main className="min-h-screen">{children}</main>
     to
       <main id="konten-utama" className="min-h-screen">{children}</main>
  2. app/layout.tsx: add as the FIRST child inside <body>, before the jsonLd script:
       <a href="#konten-utama" className="skip-link">Lewati ke konten utama</a>
  3. Read the existing .skip-link CSS first and confirm it hides off-screen until
     focused. If it does not, fix only that rule.

DO NOT TOUCH
- Do not use `outline: none` globally without a :focus-visible replacement.
- Do not change the primary color value; #2735F5 is the existing primary.500.
- Do not reorder Navbar / main / Footer.

ACCEPTANCE CRITERIA
- Pressing Tab from the top of any page reveals "Lewati ke konten utama" first,
  and activating it jumps focus to the main content.
- Tabbing through the navbar, cards and footer shows a clear blue ring on light
  backgrounds and a white ring in the footer.
- Clicking a button with the mouse shows NO ring.
- No visual change when not using the keyboard.

ROLLBACK
git checkout app/globals.css app/layout.tsx
````

## G3-6 · Subtle shine on first-place badges · 🟢 Low

````
PROMPT — G3-6 · 🟢 Low

GOAL
Give the "Juara 1" rank badge a slow moving sheen so top achievements read as
special, without changing its size, color or position.

CONTEXT
app/prestasi/page.tsx renders the rank badge with
  bg-gradient-to-r from-sun to-amber-500   for "Juara 1"
  bg-primary-500                            for others

STEP 1 — app/globals.css, add:

/* ===== P2 — kilau lembut pada badge juara 1 ===== */
.shine {
  position: relative;
  overflow: hidden;
}
.shine::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    transparent 30%,
    rgba(255, 255, 255, 0.55) 50%,
    transparent 70%
  );
  transform: translateX(-120%);
  animation: shineSweep 4.5s ease-in-out infinite;
  pointer-events: none;
}
@keyframes shineSweep {
  0%, 60% { transform: translateX(-120%); }
  100%    { transform: translateX(120%); }
}
@media (prefers-reduced-motion: reduce) {
  .shine::after { animation: none; }
}

STEP 2 — app/prestasi/page.tsx
Add the `shine` class to the rank badge element ONLY when the rank is "Juara 1".
Append it to the existing className string; change nothing else.

DO NOT TOUCH
- Badge padding, font size, border radius, gradient colors or position.
- Badges for other ranks (Juara 2, Finalis, Terpilih) — no shine on those.
- The card border treatment (`border-amber-200` on top cards) — leave as is.

ACCEPTANCE CRITERIA
- "Juara 1" badges show a soft light sweep roughly every 4.5 seconds.
- Non-first-place badges are completely unchanged.
- The sheen stays inside the badge (no bleed over the card).
- With OS reduce-motion on, the sheen is static.
- No layout shift, no scrollbar appearing.

ROLLBACK
git checkout app/globals.css app/prestasi/page.tsx
````

## G3-7 · Unify card hover elevation · 🟢 Low

````
PROMPT — G3-7 · 🟢 Low

GOAL
Make hover elevation consistent. Today cards use several different hover effects
(hover:shadow-3d, hover:-translate-y-1, hover:-translate-y-0.5,
hover:scale-[1.02], or nothing), so the site feels slightly inconsistent.

STEP 1 — AUDIT FIRST, DO NOT EDIT YET
Run and record the output:
  grep -rn "hover:shadow-3d\|hover:-translate-y\|hover:scale-\[" app components
Produce a table: file → line → current effect. Count how many use each pattern.

STEP 2 — adopt the existing MAJORITY pattern as the single standard.
Do NOT invent a new effect. The most common combination in this codebase is:
  hover:shadow-3d hover:-translate-y-0.5 transition
Use whatever the audit actually shows as the majority; report your choice.

STEP 3 — normalise ONLY content cards to that standard:
  prestasi cards, berita cards, guru cards, fasilitas cards, ekskul cards,
  unduhan cards, galeri tiles, agenda list items, jurusan cards, program cards.

DO NOT NORMALISE (leave exactly as they are)
- Hero buttons and Hero stat cards.
- Navbar items.
- Footer links.
- The PPDB "Pilih Jalur" selector cards (they use a border-color state, which is
  a selection affordance, not hover elevation).
- The homepage marquee cards (they move continuously).
- Anything using .btn* classes.

STEP 4 — make sure the transition duration matches G3-8's variable once that
step is done. If G3-8 is already applied, use var(--dur-fast).

DO NOT TOUCH
- Shadow token definitions in tailwind.config.ts.
- Any border, radius, padding or background.
- Do not add hover effects to cards that intentionally have none inside frozen
  sections (homepage principal block, testimonial slider).

ACCEPTANCE CRITERIA
- Every content card across the site lifts by the same amount with the same
  shadow on hover.
- Resting appearance of every card is byte-identical to before (diff the
  className strings: only hover: utilities may differ).
- On a touch device nothing looks stuck in a hover state.
- The audit table is delivered in your report.

ROLLBACK
git checkout app components
````

## G3-8 · One animation speed scale · 🟢 Low

````
PROMPT — G3-8 · 🟢 Low

GOAL
Transition durations are currently ad hoc (0.12s, 150ms, 0.6s, 700ms, 4.5s...).
Define one scale and use it, so motion across the site feels like one product.

STEP 1 — app/globals.css, add near the top of the file inside the existing
:root block if one exists, otherwise create one:

:root {
  /* ===== P4 — skala kecepatan animasi (satu sumber kebenaran) ===== */
  --dur-fast: 150ms;   /* tekan tombol, hover kecil */
  --dur-base: 250ms;   /* hover kartu, buka tutup */
  --dur-slow: 600ms;   /* muncul saat scroll */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}

STEP 2 — replace hardcoded durations in app/globals.css ONLY.
Map them: anything <= 200ms → var(--dur-fast); 200-400ms → var(--dur-base);
> 400ms → var(--dur-slow). Use var(--ease-out) for easing.

EXCLUDE from this replacement (they are long-running loops, not transitions):
  marquee animation duration (--marquee-duration, 70s/90s)
  ticker keyframes duration
  shineSweep 4.5s from G3-6
  animate-ping / blur / blob animations

STEP 3 — components/Reveal.tsx line 22
ANCHOR
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
LEAVE THIS AS IS. framer-motion cannot read CSS variables here, and 0.6s already
equals --dur-slow. Just add a comment above it:
      /* 0.6s = --dur-slow di globals.css — ubah keduanya bersamaan. */

DO NOT TOUCH
- Do not change .btn transition values (out of scope).
- Do not change any duration you cannot map confidently — report it instead.
- Do not add a JS animation config file.

ACCEPTANCE CRITERIA
- grep -n "transition:.*[0-9]\+m\?s" app/globals.css shows only the excluded
  long-loop animations still using literal durations.
- Hover, press and reveal timings feel uniform when clicking through
  / → /prestasi → /berita → /guru.
- Nothing became noticeably slower or faster than before (the values chosen are
  close to the previous majority).

ROLLBACK
git checkout app/globals.css components/Reveal.tsx
````

## G3-9 · Brand-consistent text selection colour · 🟢 Low

````
PROMPT — G3-9 · 🟢 Low

GOAL
Make selected text use the school palette instead of the browser default blue.

CONTEXT
app/layout.tsx line 59 already sets this on <body> via Tailwind:
  selection:bg-primary-200 selection:text-primary-900
That covers most content but NOT ::selection inside elements that set their own
color (dark sections), and not the footer.

CHANGE — app/globals.css, add:

/* ===== P5 — warna sorot teks mengikuti warna sekolah ===== */
::selection {
  background: #c7d2fe;
  color: #141a5e;
}
/* Di area gelap, gunakan sorot terang agar teks tetap terbaca. */
.bg-navy ::selection,
.bg-deepsea ::selection,
footer ::selection {
  background: #f5a623;
  color: #141a5e;
}

DO NOT TOUCH
- Do not remove the Tailwind selection: utilities from app/layout.tsx line 59.
  The CSS above complements them.
- Do not change any palette value in tailwind.config.ts. The hex values above are
  existing tokens (primary-200 range, navy, sun).

ACCEPTANCE CRITERIA
- Selecting a paragraph on any light page shows a soft indigo highlight with
  navy text.
- Selecting text in the footer or a navy CTA shows a gold highlight with navy
  text, and stays readable.
- No other visual change.

ROLLBACK
git checkout app/globals.css
````

## G3-10 · Copy phone and email in one tap · 🟢 Low

````
PROMPT — G3-10 · 🟢 Low

GOAL
On a phone, copying an email or number from a link is awkward. Add a copy button
that confirms visually.

STEP 1 — create components/CopyButton.tsx

"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

/** Tombol salin kecil dengan umpan balik centang selama 2 detik. */
export default function CopyButton({
  value,
  label = "Salin",
  className = "",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard tidak tersedia — abaikan tanpa error */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Tersalin" : `${label} ${value}`}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition shrink-0 ${className}`}
    >
      {copied ? <Check className="w-4 h-4 text-mint" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

STEP 2 — use it in app/kontak/page.tsx next to the email and, if the real number
is present (WHATSAPP_READY from G1-4), next to the phone number. Place it AFTER
the existing text, inside the same flex row. Do not restructure the contact card.

STEP 3 — optionally add it to the footer email line. Only do this if it does not
disturb the footer's spacing at 390px. If it does, skip and report.

DO NOT TOUCH
- Do not replace the existing mailto: / wa.me links. The copy button is additive.
- Do not add a toast library (that is G4-1).
- Do not use the deprecated document.execCommand fallback.

ACCEPTANCE CRITERIA
- Tapping the button copies the value; the icon becomes a green check for ~2s,
  then returns to the copy icon.
- The existing mailto / WhatsApp links still work when tapped.
- Keyboard: the button is reachable by Tab and activates with Enter and Space.
- On a browser without clipboard permission, tapping does nothing and throws no
  console error.
- Contact card layout is unchanged at 390px.

ROLLBACK
rm components/CopyButton.tsx && git checkout app/kontak/page.tsx components/Footer.tsx
````

## G3-11 · Submit buttons that cannot be double-clicked · 🟢 Low

````
PROMPT — G3-11 · 🟢 Low

GOAL
Form submit buttons give no feedback and can be pressed repeatedly. Add a
pending state with a spinner and disable the button while it runs.

APPLY TO
1. app/ppdb/page.tsx — the submit button (line ~214,
   "sm:col-span-2 inline-flex justify-center items-center gap-2 bg-navy ...")
2. app/kontak/page.tsx — the send button (which opens WhatsApp, line ~63 area)

METHOD
- Add `const [pending, setPending] = useState(false);`
- In the submit handler: setPending(true) at the start; after window.open(...)
  and setSent(true), setPending(false).
- Button: add `disabled={pending}` and swap its content:
    {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send2 />}
  keeping the existing label text next to it.
- Import Loader2 from lucide-react.
- Add `disabled:opacity-60 disabled:cursor-not-allowed` to the existing className.
  Do not remove or reorder any existing class.

NOTE ON TIMING
These handlers are synchronous (they open WhatsApp), so `pending` will be visible
only briefly. That is fine and correct — do NOT add an artificial setTimeout to
fake a longer loading state.

DO NOT TOUCH
- The button's background color, padding, radius, font weight or grid span.
- The honeypot logic.
- Do not add form validation beyond the existing `required` attributes.

ACCEPTANCE CRITERIA
- Clicking submit disables the button and shows a spinning icon.
- Rapid double-clicking triggers the WhatsApp window exactly once.
- The button returns to normal after the handler completes.
- Button dimensions do not change between states (no layout jump).
- Keyboard submit (Enter inside a field) behaves the same way.

ROLLBACK
git checkout app/ppdb/page.tsx app/kontak/page.tsx
````

---

## ⭐ END OF WAVE 3 — THIS IS THE STABLE TARGET

```
npm run build && npx tsc --noEmit
git add -A && git commit -m "feat: wave 3 feel polish" && git tag wave-3-STABLE
```

**Full acceptance review before stopping:**

| Check | Expected |
| --- | --- |
| `grep -rin "demo" app components config lib` | No user-facing occurrence (code comments about GoatCounter etc. are fine) |
| `grep -rn "Math.random"` | Only in places unrelated to fake data |
| Phone at 390px, every route | No horizontal scroll, no clipped text |
| Keyboard Tab from page top | Skip link appears first, focus rings visible everywhere |
| Scroll /prestasi, /berita | Cards arrive staggered, once only |
| Hover the ticker and the teacher marquee | Both pause |
| Footer | No fabricated visitor numbers |
| PPDB form | Opens WhatsApp with all fields filled |
| Lighthouse mobile (optional) | Accessibility score should improve vs baseline |

**Then stop.** Let the site run for a while before Wave 4. Waves 4 and 5 change how things look, and the owner asked to reach stability first.

---

# WAVE 4 — Feel polish that is visible

> 🟡 Medium unless noted. Each step changes something the owner will notice once,
> then get used to. **Deploy and check on a phone after every 2 steps.**
>
> Line numbers are no longer reliable here. **Locate everything by searching the
> quoted anchor strings.** If an anchor is missing, stop and report.

## G4-1 · Replace browser alerts with in-page toasts · 🟡 Medium

````
PROMPT — G4-1 · 🟡 Medium

GOAL
Any remaining native alert() / confirm() popups look like errors and break the
design. Replace with a small branded toast in the corner.

STEP 1 — AUDIT
  grep -rn "alert(\|confirm(\|window.alert\|window.confirm" app components
If this returns nothing, SKIP this step entirely and report "no alerts found".
Do not build a toast system nobody needs.

STEP 2 — only if alerts exist: create components/Toast.tsx
- Client component. A minimal context + hook (useToast) or a tiny local state
  provider mounted in app/layout.tsx.
- No external library. framer-motion is already installed — use it for the
  enter/exit animation.
- Visual: fixed bottom-right on desktop, bottom-center on mobile,
  bg-white rounded-2xl shadow-3d border border-[#ece4d4] px-5 py-4,
  icon + text, auto-dismiss after 4s, dismissible by tap.
- Variants: success (mint icon), error (coral icon), info (primary icon).
- Respect prefers-reduced-motion: fade only, no slide.

STEP 3 — replace each alert() call site with a toast call.

DO NOT TOUCH
- Do not install react-hot-toast, sonner, or any toast package. D3=a allows new
  packages, but a 30-line component is smaller than a dependency here.
- Do not convert form validation messages to toasts — native `required` messages
  stay as they are.
- Do not place the toast container where it covers the floating WhatsApp button.

ACCEPTANCE CRITERIA
- No native alert dialog can be triggered anywhere in the app.
- A toast appears, is readable at 390px, auto-dismisses, and can be dismissed early.
- The toast never overlaps the floating WhatsApp button or the navbar.
- Screen readers announce it (use role="status" aria-live="polite").

ROLLBACK
rm components/Toast.tsx && git checkout app components
````

## G4-2 · Skeleton placeholders while filtering · 🟡 Medium

````
PROMPT — G4-2 · 🟡 Medium

GOAL
On /prestasi, /berita, /galeri and /unduhan, changing a filter or typing in the
search box swaps the results instantly with a hard jump. Add a brief skeleton
state so the change reads as deliberate.

IMPORTANT CONTEXT — these pages filter in memory with useMemo, so there is no
real loading time. Do NOT fake a delay longer than one animation frame. The goal
is a smooth crossfade, not a fake spinner.

RECOMMENDED APPROACH (simpler and better than skeletons here)
Use framer-motion's AnimatePresence to crossfade the results grid when the
filter key changes:

  <AnimatePresence mode="wait">
    <motion.div
      key={`${q}-${cat}-${year}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      ...existing grid, unchanged...
    </motion.div>
  </AnimatePresence>

Only build actual skeleton cards if the owner later adds real async data.
Report that you chose the crossfade and why.

APPLY TO
  app/prestasi/page.tsx  (state: q, cat, year)
  app/berita/page.tsx    (state: q, filter)
  app/galeri/page.tsx    (whatever filter state exists)
  app/unduhan/page.tsx   (state: q, cat)

DO NOT TOUCH
- The filter controls themselves (chips, selects, search inputs).
- The grid className or card markup.
- The existing empty state blocks — they must still appear when there are no
  results, and should crossfade the same way.
- Do not add a debounce to the search input unless typing feels laggy; if you do,
  keep it at 120ms maximum and report it.

ACCEPTANCE CRITERIA
- Typing in the search box or tapping a filter chip crossfades the results
  instead of hard-swapping them.
- The transition is under 200ms and never blocks typing.
- Result counts stay correct.
- The empty state still appears for a no-match query.
- No layout shift of the filter bar while results change.

ROLLBACK
git checkout app/prestasi/page.tsx app/berita/page.tsx app/galeri/page.tsx app/unduhan/page.tsx
````

## G4-3 · Smooth FAQ accordions · 🟡 Medium

````
PROMPT — G4-3 · 🟡 Medium

GOAL
FAQ accordions currently appear and disappear instantly, and they are not
accessible — the toggle has no aria-expanded / aria-controls.

FILES
  app/ppdb/page.tsx  (FAQ section, openFaq state, ChevronDown rotate)
  app/faq/page.tsx   (audit first — it may use a `▾` text character instead of
                      an icon; if so, replace with ChevronDown for consistency)

CHANGE 1 — animate the panel
Wrap the conditional panel in framer-motion AnimatePresence:

  <AnimatePresence initial={false}>
    {openFaq === i && (
      <motion.div
        key="panel"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 text-sm leading-6 text-slate-600">{f.a}</div>
      </motion.div>
    )}
  </AnimatePresence>

Keep the inner div's classNames exactly as they are today.

CHANGE 2 — accessibility on the toggle button
Add to each accordion trigger:
  aria-expanded={openFaq === i}
  aria-controls={`faq-panel-${i}`}
and add id={`faq-panel-${i}`} plus role="region" to the motion.div.

DO NOT TOUCH
- The card wrapper classNames (bg-white rounded-2xl border border-[#ece4d4]).
- The ChevronDown rotate-180 behaviour — keep it.
- The single-open behaviour (opening one closes the other). Do not change it to
  multi-open.

ACCEPTANCE CRITERIA
- Opening and closing an FAQ animates the height smoothly with no content clipping.
- No layout jump of items below during the animation.
- Screen reader announces expanded/collapsed state.
- Keyboard: Tab to a question, Enter/Space toggles it.
- With reduce-motion on, panels still open and close (instantly is acceptable).

ROLLBACK
git checkout app/ppdb/page.tsx app/faq/page.tsx
````

## G4-4 · Sticky filter bar · 🟡 Medium

````
PROMPT — G4-4 · 🟡 Medium

GOAL
On long list pages the filter controls scroll out of view, forcing a scroll back
to the top to change a filter. Make the filter bar stick below the navbar and
shrink slightly when stuck.

APPLY TO
  app/prestasi/page.tsx  (the stats bar + filter row)
  app/berita/page.tsx    (search + filter chips row)
  app/galeri/page.tsx    (category filter row)
  app/unduhan/page.tsx   (search + category row)
  app/agenda/page.tsx    (category filter, only if it scrolls out of view)

METHOD
- Wrap the filter row in a sticky container:
    sticky top-[64px] z-20 -mx-5 px-5 py-3 bg-pale/85 backdrop-blur
    supports-[backdrop-filter]:bg-pale/70
  Adjust top-[Npx] to the actual navbar height — measure it, do not guess.
- Add a subtle bottom border only when stuck. Use a CSS-only approach if
  possible; if you need JS, use a single IntersectionObserver, not a scroll listener.

CRITICAL INTERACTION WITH THE NAVBAR
The navbar hides on scroll down (intended behaviour, must not change). That means
when the navbar is hidden, a filter bar stuck at top-[64px] will float with a gap
above it. Two acceptable resolutions — pick one and report it:
  (a) Use top-0 so the filter bar sits flush at the viewport top. Simpler, and
      works with the hiding navbar. RECOMMENDED.
  (b) Read the navbar's hidden state via a shared context. More correct, more
      code, more risk. Only if (a) looks wrong.
Do NOT modify components/Navbar.tsx either way.

DO NOT TOUCH
- components/Navbar.tsx.
- The filter controls' own styling, order or behaviour.
- z-index of the navbar (must stay above the filter bar).

ACCEPTANCE CRITERIA
- Scrolling down /prestasi keeps the filter row visible and usable.
- The filter bar never covers the navbar, and the navbar never covers the filters.
- No content jumps when the bar becomes stuck (reserve its height).
- At 390px the sticky bar takes no more than ~15% of viewport height.
- Tapping a filter while stuck works and does not scroll the page unexpectedly.

ROLLBACK
git checkout app/prestasi/page.tsx app/berita/page.tsx app/galeri/page.tsx app/unduhan/page.tsx app/agenda/page.tsx
````

## G4-5 · Make breadcrumbs real links · 🟡 Medium

````
PROMPT — G4-5 · 🟡 Medium

GOAL
components/PageHeader.tsx takes a `breadcrumb` string prop such as
"Profil Kami / Guru dan Tendik" and renders it as plain dead text. Turn it into
a working navigation trail.

STEP 1 — AUDIT
  grep -rn 'breadcrumb=' app | sort
List every value in use. Expect around 20 pages.

STEP 2 — components/PageHeader.tsx
Change the breadcrumb prop to accept EITHER the current string (for backward
compatibility) OR an array of segments:

  type Crumb = { label: string; href?: string };
  breadcrumb?: string | Crumb[];

- If a string is passed, keep rendering it exactly as today (no regression).
- If an array is passed, render:
    Beranda / [segment links] / [current page, not a link]
  Separator: the existing "/" styling.
  Wrap in <nav aria-label="Breadcrumb"> with an <ol>, each item an <li>.
  Links use next/link. The last item gets aria-current="page".

STEP 3 — migrate pages one at a time, starting with the deepest routes:
  /profil/identitas   → [{label:"Profil",href:"/profil"},{label:"Identitas"}]
  /profil/sejarah     → [{label:"Profil",href:"/profil"},{label:"Sejarah"}]
  /profil/visi-misi, /profil/kepala-sekolah → same pattern
  /guru               → [{label:"Profil",href:"/profil"},{label:"Guru & Tendik"}]
  /ppdb               → [{label:"Layanan"},{label:"PPDB Online"}]  (no href for
                          "Layanan" — there is no /layanan route; verify before
                          adding any href)
VERIFY every href you add actually resolves to an existing route. A breadcrumb
link to a 404 is worse than dead text. Report any segment you left unlinked.

DO NOT TOUCH
- PageHeader's badge, title, accent, desc or img props and their styling.
- The breadcrumb's font size, color, letter-spacing or position.
- Do not add breadcrumbs to pages that currently have none.

ACCEPTANCE CRITERIA
- Every breadcrumb segment that looks like a link IS a link and navigates correctly.
- No breadcrumb link produces a 404.
- The trail looks visually identical to before (same size, color, spacing).
- Pages still passing a plain string render unchanged.
- Screen reader announces "Breadcrumb" navigation and the current page.

ROLLBACK
git checkout components/PageHeader.tsx app
````

## G4-6 · Sliding indicator on tabs and filters — NOT the navbar · 🟡 Medium

````
PROMPT — G4-6 · 🟡 Medium

GOAL
Give tab rows and category filter rows a sliding underline/pill that glides
between the active item.

⚠️ HARD CONSTRAINT — READ THIS FIRST
The site owner has explicitly frozen the navbar. DO NOT apply this to
components/Navbar.tsx, the mobile menu, or the footer. Applying it there is a
failed task even if it looks good.

APPLY ONLY TO
  app/prestasi/page.tsx  — category and year filter chips
  app/berita/page.tsx    — the three filter chips (all / berita / pengumuman)
  app/galeri/page.tsx    — category chips
  app/unduhan/page.tsx   — category chips
  app/agenda/page.tsx    — category chips
  app/ekskul/page.tsx    — category chips, if G5-7 has added them

METHOD
Use framer-motion's shared layout animation, which is the least invasive option:

  {options.map(opt => (
    <button key={opt} onClick={() => setCat(opt)} className="relative px-4 py-2 text-sm font-bold rounded-full transition">
      {cat === opt && (
        <motion.span
          layoutId="filter-pill-<UNIQUE_PER_PAGE>"
          className="absolute inset-0 rounded-full bg-primary-600"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className={`relative z-10 ${cat === opt ? "text-white" : "text-slate-600"}`}>{opt}</span>
    </button>
  ))}

Rules:
- layoutId must be UNIQUE PER PAGE, otherwise pills teleport between unrelated
  filter rows.
- Reuse the page's existing active/inactive colors. Do not introduce new colors.
- The chip's size, padding and radius must not change.

DO NOT TOUCH
- components/Navbar.tsx — absolutely not.
- The PPDB "Pilih Jalur" cards (they are a form control, not a tab row).
- Any chip row inside a frozen homepage section.

ACCEPTANCE CRITERIA
- Tapping a different filter glides the highlight across; it does not blink.
- Active and inactive chip colors are identical to before.
- Chip row height and spacing unchanged.
- No pill animates between two different pages or two different rows.
- The navbar has no new indicator of any kind. Verify by diffing Navbar.tsx:
  `git diff --stat components/Navbar.tsx` must show no changes.

ROLLBACK
git checkout app
````

## G4-7 · Soft cursor glow on cards · 🟡 Medium

````
PROMPT — G4-7 · 🟡 Medium

GOAL
Add a faint light that follows the pointer across a card, so hovering feels
responsive on desktop.

METHOD — CSS variables driven by one pointer handler, no per-card React state.

STEP 1 — app/globals.css add:

/* ===== M4 — cahaya lembut mengikuti kursor ===== */
.glow {
  position: relative;
}
.glow::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    220px circle at var(--gx, 50%) var(--gy, 50%),
    rgba(39, 53, 245, 0.10),
    transparent 65%
  );
  opacity: 0;
  transition: opacity var(--dur-base, 250ms) ease;
  pointer-events: none;
}
@media (hover: hover) {
  .glow:hover::before { opacity: 1; }
}

STEP 2 — create components/GlowCard.tsx: a thin client wrapper that sets
--gx / --gy on pointermove and adds the `glow` class. It must accept and forward
className and children so existing card markup is unchanged inside it.

Use a single onPointerMove that writes to the element's style directly
(e.currentTarget.style.setProperty), NOT React state — state would re-render on
every mouse move.

STEP 3 — apply to content cards on /prestasi, /guru, /fasilitas, /ekskul,
/jurusan, /program. Keep the existing card element and its classNames intact;
GlowCard wraps it or adds the class to it.

DO NOT TOUCH
- Any card inside frozen homepage sections.
- Card background, border or shadow.
- Do not apply on touch devices — the @media (hover: hover) guard handles this,
  so verify it actually works on a phone (no stuck glow).

PERFORMANCE REQUIREMENT
No layout thrash: the handler may only set CSS custom properties. Verify in
DevTools Performance that moving the mouse across a grid of cards does not cause
recalculate-style storms above ~2ms per frame.

ACCEPTANCE CRITERIA
- On desktop, moving the pointer over a card shows a soft blue glow that tracks it.
- On a phone, no glow appears and no card looks permanently highlighted.
- Card resting appearance unchanged.
- Scrolling a page full of these cards stays smooth on a mid-range phone.

ROLLBACK
rm components/GlowCard.tsx && git checkout app/globals.css app
````

## G4-8 · Gentle 3D tilt · 🟡 Medium

````
PROMPT — G4-8 · 🟡 Medium

GOAL
Let feature cards tilt very slightly toward the pointer.

IMPORTANT — A CLASS ALREADY EXISTS
app/globals.css already defines `.card-3d`, and it is already used in
app/ppdb/page.tsx (the JALUR quota cards) and app/profil/sejarah/page.tsx.
READ the existing .card-3d rule first and report what it currently does.
- If it already tilts, only extend where it is applied. Do not redefine it.
- If it only does a static transform, enhance it, keeping the class name.

MAXIMUM TILT: 6 degrees. Anything more looks like a gimmick and the owner asked
for restraint (J3: "jangan berlebihan").

APPLY TO (additionally)
  /jurusan cards, /program cards, homepage feature cards that are NOT in a
  frozen section, /fasilitas cards.

COMBINE WITH G4-7
A card may have both glow and tilt, but verify the combination does not feel
heavy. If it does, prefer glow only and report that decision.

DO NOT TOUCH
- Cards in frozen sections.
- The existing .card-3d call sites' other classNames.
- Do not add a tilt library (vanilla-tilt, react-parallax-tilt).

ACCEPTANCE CRITERIA
- Tilt is at most 6deg and returns smoothly to flat when the pointer leaves.
- No tilt on touch devices.
- Text inside tilted cards stays crisp (use transform-style: preserve-3d and
  will-change: transform only while hovering).
- No card overlaps its neighbour while tilted.
- Existing .card-3d usages still look correct.

ROLLBACK
git checkout app/globals.css app components
````

## G4-9 · Blur-up images and move to next/image · 🟠 High — ONE SECTION PER DEPLOY

````
PROMPT — G4-9 · 🟠 High

GOAL
The project has 27 raw <img> tags and zero next/image usages, despite `sharp`
being installed and remotePatterns being configured. Migrate to next/image and
add a blur-up placeholder. This makes the site markedly lighter on a phone with
a weak connection — the biggest real performance win available.

⚠️ THIS IS THE MOST DISRUPTIVE STEP IN THE ENTIRE PACK.
next/image requires explicit sizing and changes how images fill their container.
Done in bulk it will shift image positions across the whole site.

MANDATORY PROCESS — ONE GROUP PER COMMIT PER DEPLOY.
Do not proceed to the next group until the owner confirms the previous one.

PREREQUISITE
G1-8 must be done (i.pravatar.cc registered in next.config.mjs). Verify first:
  grep -n "pravatar" next.config.mjs
If absent, STOP and do G1-8.

GROUP ORDER (strict)
  1. components/Hero.tsx                 — hero background / poster
  2. app/berita + components news cards  — article cover images
  3. app/prestasi/page.tsx               — achievement thumbnails
  4. app/guru/page.tsx + STAFF avatars   — i.pravatar.cc images
  5. app/fasilitas + app/ekskul          — unsplash images
  6. components/GaleriSlider + app/galeri + components/KenanganGrid
  7. components/PageHeader.tsx           — header images (~20 pages at once,
                                            so treat as its own careful group)
  8. components/Footer.tsx watermark + components/Logo.tsx

FOR EACH IMAGE
- Replace <img src=... alt=... className=...> with <Image ... />.
- Fill mode for images that cover a sized container:
    <Image src={url} alt="..." fill sizes="(max-width: 768px) 100vw, 33vw"
           className="object-cover" />
  The PARENT must have position: relative and a definite height. Most already do
  (e.g. "relative sm:w-48 h-40"). Verify each one; if the parent lacks relative,
  add it — that is the only structural change allowed.
- Fixed-size images: pass explicit width and height instead of fill.
- Add placeholder="blur" ONLY where you can supply blurDataURL. For remote URLs
  Next cannot generate one automatically, so either:
    (a) omit placeholder and instead add a CSS background color to the wrapper
        (bg-slate-100) so there is no white flash — SIMPLER, RECOMMENDED, or
    (b) generate a tiny base64 blurDataURL per image and store it in
        lib/demo-data.ts next to the URL.
  Choose (a) for stock images now; (b) becomes worthwhile when real photos arrive.
  Report which you used.
- Add priority to the Hero image only. Every other image must lazy-load (default).
- Remove any `{/* eslint-disable-next-line @next/next/no-img-element */}` comment
  that becomes unnecessary.

SET sizes CORRECTLY
A wrong `sizes` makes Next serve oversized images and silently wastes the gain.
For a 3-column grid: sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
For an avatar: sizes="96px" (match the rendered size).

DO NOT TOUCH
- Do not change any image URL.
- Do not change aspect ratios, object-position, or container dimensions.
- Do not convert the footer watermark to priority.
- Do not add a CDN or image proxy.

ACCEPTANCE CRITERIA (per group)
- Every migrated image renders at exactly the same size and crop as before.
  Compare screenshots at 390px and 1280px before/after.
- DevTools Network shows the images served from /_next/image with a width
  parameter appropriate to the viewport.
- No console warnings about missing sizes, or about fill without a positioned parent.
- No layout shift when images load (measure CLS — it should not get worse).
- `npm run build` succeeds with no image-related warnings.

AFTER ALL 8 GROUPS
- grep -c "<img" across app and components should be 0 or only intentional
  exceptions (report them).
- Run Lighthouse mobile before and after; report the LCP change.

ROLLBACK (per group)
git checkout <the files in that group only>
````

### ✅ End of Wave 4

```
npm run build && npx tsc --noEmit
git add -A && git commit -m "feat: wave 4 visible polish" && git tag wave-4
```

---

# WAVE 5 — Layout changes

> These steps deliberately change how pages look. **One step per commit, per deploy,
> per phone check.** No batching, no exceptions.
>
> Ordered from safest-and-most-valuable to riskiest.
>
> **G5-4 (bento layout for /prestasi) is deliberately NOT in this pack.**
> The owner chose the staged approach: ship G5-3 first, look at it on a phone,
> and only then decide whether the bigger bento layout is needed. Do not build it.

## G5-1 · Declutter /profil/identitas · 🟡 Medium

````
PROMPT — G5-1 · 🟡 Medium

GOAL
app/profil/identitas/page.tsx stacks about 18 cards down one long page, and
almost every card has the same shape (white box, rounded corner, icon on the
left). Ten of those cards contain a single line of text each. The eye has nowhere
to rest. Reduce the number of boxes without removing any information.

READ THE FILE FIRST and confirm this structure (217 lines):
  Bar({value,color}) helper           ~line 17
  percentages                         ~lines 27-30
  items[] — 10 entries                ~lines 32-43
  legal[] — 2 entries                 ~lines 45-48
  Blok 01 · Data Resmi Lembaga        ~lines 56-64   → 10 cards
  Blok 02 · Dokumen Resmi             ~lines 67-81   → 2 cards
  Blok 03 · Rekap Dapodik             ~lines 84-189  → 3 stat cards + sarana
                                                        table + indicator panel
                                                        containing 3 sub-cards
  Blok 04 · Peta & Verifikasi         ~lines 192-214

CHANGE 1 — Blok 01: ten cards become one definition list
ANCHOR the grid:
  className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto"
REPLACE the ten individual cards with ONE card containing a two-column
definition list:

  <div className="mt-8 max-w-4xl mx-auto bg-white rounded-[28px] border border-[#ece4d4] shadow-card overflow-hidden">
    <dl className="divide-y divide-[#f2ece0]">
      {items.map(it => (
        <div key={it.label} className="grid sm:grid-cols-[220px_1fr] gap-1 sm:gap-4 px-6 py-4">
          <dt className="flex items-center gap-2.5 text-sm font-bold text-slate-500">
            <it.icon className="w-4 h-4 text-primary-600 shrink-0" />
            {it.label}
          </dt>
          <dd className="text-sm font-semibold text-navy break-words">{it.value}</dd>
        </div>
      ))}
    </dl>
  </div>

Keep the SAME icons, labels and values from items[]. Keep the outer card's
existing design tokens (rounded-[28px], border-[#ece4d4], shadow-card).
At 390px each row stacks label above value — verify this.

CHANGE 2 — Blok 02: two cards become one card with two rows
ANCHOR the grid: className="mt-6 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto"
Use the same one-card-with-divided-rows pattern, keeping the gradient treatment
(bg-gradient-to-br from-primary-50/70 to-white, border-primary-100) on the single
outer card instead of on two inner cards.

CHANGE 3 — Blok 03 indicator panel: three sub-cards become one row
ANCHOR: className="mt-5 grid sm:grid-cols-3 gap-6"  (inside the navy panel)
Replace the three sub-cards with a single row of three labelled values separated
by a thin vertical divider on desktop, stacked on mobile. Keep the Bar() bars,
the percentages, the labels and the navy gradient panel itself.

KEEP EXACTLY AS THEY ARE
- The three big Dapodik stat cards (bg-primary-600 + shadow-blue-glow, bg-mint,
  bg-sun + shadow-yellow). These are the best part of the page.
- The sarana table including min-w-[420px] horizontal scroll and the
  bg-amber-100 text-amber-700 condition pill.
- Blok 04 entirely (map iframe height 340, MapPinned icon, the two pills, the
  "Link href=/profil" at mt-auto).
- The page's metadata export.
- SectionHeading numbers ("01", "02", "03", "04") and their text.

DO NOT
- Do not delete any label or value. Card count goes down; information does not.
- Do not change colors, fonts, radii or shadow tokens.
- Do not merge Blok 01 and Blok 02 into one section.

ACCEPTANCE CRITERIA
- Visible box count on the page drops from ~18 to ~6.
- Every one of the 10 items[] labels and values is still present and readable.
- Every one of the 2 legal[] entries is still present.
- At 390px: no horizontal scroll except the intentional sarana table; labels sit
  above values; no text truncated with ellipsis.
- At 1280px: labels align in a neat left column.
- Page height drops noticeably (measure and report before/after scroll height).
- `npm run build` succeeds.

ROLLBACK
git checkout app/profil/identitas/page.tsx
````

## G5-2 · Tighten /profil/sejarah and remove the triplicated stats · 🟡 Medium

````
PROMPT — G5-2 · 🟡 Medium

GOAL
app/profil/sejarah/page.tsx (52 lines) has a good timeline, but two problems:
  1. Each of the 5 MILESTONES has a 2-3 line paragraph including full SK numbers
     that are already listed on /profil/identitas.
  2. Below the timeline, a "Statistik Sekolah" section shows 4 cards built from
     SCHOOL.stats — the SAME numbers already shown in the homepage Hero AND on
     /profil/identitas. The visitor sees them for the third time.

CHANGE 1 — condense the milestone descriptions
MILESTONES is at ~lines 6-12. Shorten each `desc` to one sentence and move SK
numbers out:

  2019 SK Pendirian    → "Yayasan Darussalam Simpang Mesir resmi mendirikan SMA Darussalam."
  2020 SK Izin         → "Izin operasional terbit dan kegiatan belajar dimulai."
  2021 Pembangunan     → "Penambahan ruang kelas, perpustakaan, dan laboratorium komputer."
  2024 Tumbuh          → "Jumlah peserta didik dan rombongan belajar terus bertambah."
  2026 Transformasi    → "Sekolah mulai membangun kehadiran digital dan layanan online."

Then add ONE line below the timeline (not per milestone):
  <p className="mt-6 text-center text-sm text-slate-500">
    Nomor SK pendirian dan izin operasional tercantum lengkap di{" "}
    <Link href="/profil/identitas" className="link-more">halaman Identitas Sekolah</Link>.
  </p>
Reuse the existing .link-more class (already defined in globals.css).

CHANGE 2 — remove the duplicated statistics section
ANCHOR: the section starting with SectionHeading number="02" and the grid
  className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
Delete the whole section, including its SectionHeading.

IF THE OWNER WANTS TO KEEP SOMETHING THERE, use this single thin row instead of
four cards (ask before choosing this):
  <p className="mt-8 text-center text-sm text-slate-600">
    Sejak 2019: {SCHOOL.stats...} — selengkapnya di halaman Identitas.
  </p>
Default action: delete. Report which you did.

CHANGE 3 — tighten the timeline for phones
The rail is `left-6 top-0 bottom-0 w-0.5`, bubbles are `w-12 h-12`, cards are
`p-5`. On a 390px screen this is taller than necessary. Reduce ONLY vertical
rhythm: card padding p-5 → p-4 on mobile (`p-4 sm:p-5`), and the gap between
milestones by one step. Do NOT change the rail position, bubble size, border-sun
treatment, or any color.

CHANGE 4 — add the missing metadata export
This page has NO metadata export. Add one, matching the style of other pages:

export const metadata: Metadata = {
  title: "Sejarah Singkat",
  description: `Perjalanan ${SCHOOL.name} sejak ${SCHOOL.founded} — pendirian, izin operasional, dan perkembangan sarana.`,
};

DO NOT TOUCH
- The timeline structure, rail gradient, bubble borders or icons.
- The 5 milestone years or their icons (Calendar, Award, Lightbulb, Target, Trophy).
- PageHeader props.

ACCEPTANCE CRITERIA
- Each milestone shows one sentence, not a paragraph.
- No SK number appears on this page; the link to /profil/identitas works.
- The "Statistik Sekolah" 4-card section is gone.
- The same numbers no longer appear three times across the site (Hero + Identitas
  only).
- View source shows a <title> of "Sejarah Singkat • SMA Darussalam".
- Page scroll height at 390px drops by at least 25%.

ROLLBACK
git checkout app/profil/sejarah/page.tsx
````

## G5-3 · Two-column achievement list · 🟢 Low  ← owner decision #1

> **This is the chosen option.** The bento variant is parked. Ship this, look at it on a phone, then decide.

````
PROMPT — G5-3 · 🟢 Low

GOAL
app/prestasi/page.tsx renders achievements as a single narrow column
("mt-6 grid gap-4 max-w-4xl mx-auto"), so on a laptop there is a lot of empty
space on both sides and a lot of scrolling. Make it two columns on wider screens.
The card itself must not change at all.

CHANGE — exactly one className
ANCHOR
            <div className="mt-6 grid gap-4 max-w-4xl mx-auto">
REPLACE
            <div className="mt-6 grid gap-4 lg:grid-cols-2 max-w-6xl mx-auto">

WHY max-w-6xl: two of the existing cards side by side need more width than
max-w-4xl, otherwise each card's internal `sm:flex-row` image + text split gets
cramped. Verify at 1280px that the image block (sm:w-48) still looks proportional.

THEN CHECK, and only fix if actually broken:
- The card is `flex flex-col sm:flex-row`. Inside a narrower two-column cell at
  the lg breakpoint, the horizontal split may feel tight. If it does, change the
  card's internal breakpoint from `sm:flex-row` to `md:flex-row` so it stacks a
  little longer. Report if you made this change.
- The stats bar above stays full width — do not put it in the grid.
- The empty state must span both columns: add `lg:col-span-2` to it.

DO NOT TOUCH
- The card's classNames: bg-white rounded-[28px] shadow-card border
  overflow-hidden, the border-amber-200 on top cards, the image block's
  group-hover/img:scale-110 duration-700, the rank badge gradients.
- The filter controls or the stats bar.
- The PageHeader.
- Do NOT build a bento / spanning layout. That is G5-4 and it is parked.

ACCEPTANCE CRITERIA
- At 390px: exactly one column, identical to before this change.
- At 768px: one column (lg: has not kicked in yet) — confirm nothing changed.
- At 1280px: two columns, cards evenly sized, no card taller than its neighbour
  by more than a normal content difference.
- Card appearance is pixel-identical to before at every width.
- Filtering to a single result shows one card in the left column, not stretched.
- Filtering to zero results shows the empty state centred across both columns.
- Page scroll height at 1280px roughly halves.

ROLLBACK
git checkout app/prestasi/page.tsx
````

## G5-4 · PARKED — do not build

```
STATUS: parked by owner decision on 1 Sep 2026.

The bento layout for /prestasi (first-place cards spanning two columns, mixed
card sizes) is NOT part of this pack. Ship G5-3, review it on a phone, and only
then decide whether this is still wanted.

If an agent encounters a reference to "L1-D" or "bento prestasi", skip it.
```

## G5-5 · Featured news card · 🟡 Medium

````
PROMPT — G5-5 · 🟡 Medium

GOAL
On app/berita/page.tsx every article gets an identical card, so nothing signals
which story matters. Make the newest (or pinned) article a wide featured card.

CONTEXT — read the file first (77 lines). It already has:
  filter state, q search state, a pinned section (~line 41), a 3-column grid
  (~line 55), and an empty state (~line 69).

CHANGE
- In the results grid, render the FIRST item as a featured card spanning two
  columns with a horizontal layout (image left, text right on desktop; stacked on
  mobile), and the rest as the existing cards.
- Implement with `md:col-span-2` on the first item's wrapper. Do not restructure
  the grid definition beyond that.
- The featured card reuses the SAME design tokens as the normal card
  (rounded-[28px], shadow-card, border-[#ece4d4]); only its proportions differ.
- Featured card shows: image, category chip, title (one size larger), date, and
  a 2-line excerpt. Normal cards keep exactly their current content.

INTERACTION WITH THE EXISTING PINNED SECTION
There is already a separate pinned block. Do NOT create a second "featured"
concept that competes with it. Choose ONE of these and report your choice:
  (a) If a pinned article exists, that becomes the featured card and the separate
      pinned block is removed. RECOMMENDED — avoids showing the same article twice.
  (b) Keep the pinned block and feature the newest non-pinned article.
Option (a) is cleaner. Verify the pinned article does not then appear twice.

CHANGE ALSO
- When a filter or search reduces results to fewer than 3 items, do NOT feature
  anything — render all as normal cards. A featured card with only one sibling
  looks broken.
- The empty state must span the full grid width.

DO NOT TOUCH
- The search input, the three filter chips, or their behaviour.
- Article data or dates.
- The homepage news section (frozen).

ACCEPTANCE CRITERIA
- At 1280px with no filter: one wide card on top, then a 3-column grid below.
- At 390px: everything is one column and the featured card is simply taller —
  no cramped side-by-side layout.
- No article renders twice.
- Searching for a term that matches 1 or 2 articles shows normal cards only.
- Zero results shows the empty state across the full width.
- Card design tokens identical to the existing cards.

ROLLBACK
git checkout app/berita/page.tsx
````

## G5-6 · Facilities bento · 🟡 Medium · requires G2-5 first

````
PROMPT — G5-6 · 🟡 Medium

PREREQUISITE — VERIFY BEFORE STARTING
G2-5 must be complete. Check:
  grep -n "12.000\|60 PC\|2 lantai\|800 orang" lib/demo-data.ts
If anything is found, STOP — do G2-5 first. Building a layout around descriptions
that are about to be rewritten means doing the work twice.

GOAL
app/fasilitas/page.tsx renders 10 equal cards in a 3-column grid. Give the page a
focal point by making one or two entries larger.

CHANGE
- Grid becomes a bento: `grid md:grid-cols-3 gap-5 auto-rows-[minmax(200px,auto)]`
- First entry: `md:col-span-2 md:row-span-2` — big hero tile with a larger image.
- One mid-list entry: `md:col-span-2` — wide tile.
- All others keep single-cell size.
- Add the span classes as a per-index lookup array at the top of the component so
  the pattern is readable and easy to change:
    const SPANS = ["md:col-span-2 md:row-span-2", "", "", "", "md:col-span-2", "", "", "", "", ""];

CONSTRAINTS
- Images use object-cover so the aspect change must not distort them. Verify the
  large tile's image still crops sensibly.
- Card design tokens stay identical; only the grid span and image height change.
- At 390px ALL tiles are single column and equal — the bento is a desktop-only
  arrangement. Verify no span class applies below md.
- If FACILITIES length changes later, SPANS must not throw. Use
  `SPANS[i] ?? ""`.

DO NOT TOUCH
- The facility data (that was G2-5).
- Category chips or filters if present.
- Card border, radius, shadow, or the icon treatment.

ACCEPTANCE CRITERIA
- At 1280px: a clear visual hierarchy, no gaps or orphaned cells in the grid.
- At 768px: layout is still coherent (check the md breakpoint specifically —
  bento grids commonly break here).
- At 390px: 10 equal single-column cards, identical to before this change.
- No image looks stretched or badly cropped in the large tile.
- Adding or removing a facility from the data does not break the grid.

ROLLBACK
git checkout app/fasilitas/page.tsx
````

## G5-7 · Extracurricular category filter · 🟡 Medium

````
PROMPT — G5-7 · 🟡 Medium

GOAL
app/ekskul/page.tsx lists all 10 activities with no way to narrow them. Add a
category filter matching the pattern already used on /berita and /prestasi, plus
a gentle icon animation on hover.

STEP 1 — read lib/demo-data.ts EXTRACURRICULARS and list the distinct `category`
values. Build the chip row from the data, never hardcode the categories.

STEP 2 — convert the page to a client component ONLY if it is not already one.
If it is currently a server component, adding "use client" is acceptable here;
report that you did it.

STEP 3 — add the filter row using the SAME markup and classes as the filter chips
on app/berita/page.tsx. Copy that pattern; do not invent a new chip style.
Include an "Semua" option that is active by default, and show a result count
("10 kegiatan") like /unduhan does.

STEP 4 — icon hover motion. Each card has a lucide icon. Add:
  group on the card, and on the icon: `group-hover:scale-110 group-hover:rotate-3
  transition duration-300`
Maximum rotation 3 degrees, maximum scale 1.1. Restraint per J3.

STEP 5 — empty state: when a filter matches nothing, render <EmptyState /> from
G2-3 spanning the full grid width.

DO NOT TOUCH
- Card layout, colors, radius or the coach/schedule text.
- The EXTRACURRICULARS data (coach names were handled in G2-4).
- Do not add search — only category filtering was requested.

ACCEPTANCE CRITERIA
- Chips are generated from the data; adding a new category in the data adds a chip
  automatically.
- Chip styling is visually identical to the /berita chips.
- Filtering updates the grid and the count correctly.
- "Semua" restores all 10.
- Icons animate subtly on hover, not at all on touch devices.
- At 390px the chip row wraps cleanly and does not overflow horizontally.

ROLLBACK
git checkout app/ekskul/page.tsx
````

## G5-8 · Teacher directory filter — /guru page only · 🟡 Medium

````
PROMPT — G5-8 · 🟡 Medium

⚠️ HARD CONSTRAINT
This applies ONLY to app/guru/page.tsx. The teacher marquee on the homepage is
frozen by the owner and must not be touched. Verify at the end:
  git diff --stat app/page.tsx components/Marquee.tsx
must show no changes.

GOAL
app/guru/page.tsx shows all 11 staff in one grid. Add a subject filter and a
short detail reveal on hover.

STEP 1 — build the filter from STAFF data. The STAFF array has 11 real people
with a subject field (Biologi, Sejarah, Matematika, Fisika, B. Inggris,
Informatika, PJOK) plus non-teaching roles (Kepala Sekolah, Ka. TU, Tenaga
Teknis). Group sensibly:
  "Semua" | one chip per subject | "Tenaga Kependidikan" for non-teaching roles.
Derive groups from the data; do not hardcode names.

STEP 2 — reuse the /berita chip pattern exactly, as in G5-7.

STEP 3 — hover reveal on the card: show the subject and role in a small overlay
or an expanding footer inside the existing card. Constraints:
  - The card's resting appearance must not change.
  - The reveal must not change the card's height (no grid reflow on hover).
  - On touch devices the extra info must be visible WITHOUT hover — either always
    shown at small sizes, or revealed on tap. Do not hide information from phone
    users; the owner's primary device is a phone.

STEP 4 — keep the Kepala Sekolah card first regardless of the active filter, or
give it a distinct treatment if it already has one. Check the current code first.

DO NOT TOUCH
- The STAFF data (real people from Dapodik).
- app/page.tsx or components/Marquee.tsx.
- Avatar image URLs.
- The PageHeader breadcrumb text "Profil Kami / Guru dan Tendik".

ACCEPTANCE CRITERIA
- Filtering by a subject shows only matching staff; "Semua" shows all 11.
- No staff member disappears from every filter (verify all 11 are reachable).
- Card resting appearance unchanged; no height change on hover.
- On a phone, every staff member's subject and role is readable without hovering.
- Homepage marquee is byte-identical (verify with git diff).

ROLLBACK
git checkout app/guru/page.tsx
````

## G5-9 · Alumni page slider — not the homepage · 🟡 Medium

````
PROMPT — G5-9 · 🟡 Medium

⚠️ HARD CONSTRAINT
This applies ONLY to app/alumni/page.tsx. The alumni testimonial slider on the
HOMEPAGE (components/TestimoniSlider.tsx and its homepage section) is frozen.
Verify at the end: git diff --stat components/TestimoniSlider.tsx app/page.tsx
must show no changes.

PREREQUISITE CHECK
G2-4 emptied the ALUMNI array, so this page currently renders an EmptyState.
Building a slider for an empty array is not useful yet.

DECISION REQUIRED — ask the owner before starting:
  (a) SKIP this step until real alumni data exists. RECOMMENDED.
  (b) Build the slider now so it is ready when data arrives, verifying it with
      temporary local data that is deleted before committing.

If (b) is chosen:
- Use the already-installed `swiper` package (v11), the same one
  TestimoniSlider.tsx uses. Read that file for the established config style
  (breakpoints, autoplay, pagination) and match it — do not introduce a
  different slider approach.
- The slider must render the EmptyState when ALUMNI.length === 0.
- Do not commit any temporary test data. Verify with:
    grep -n "ALUMNI" lib/demo-data.ts   → must still show an empty array.

DO NOT TOUCH
- components/TestimoniSlider.tsx.
- The homepage testimonial section.
- The stats grid handling from G2-4.

ACCEPTANCE CRITERIA
- With ALUMNI empty: the page shows the EmptyState, no broken slider shell, no
  console error from swiper.
- With temporary data: slides advance, pagination works, touch swipe works at
  390px, and it matches the homepage slider's visual language.
- No temporary data remains in the committed diff.
- Homepage slider files unchanged.

ROLLBACK
git checkout app/alumni/page.tsx lib/demo-data.ts
````

## G5-10 · Better location map · 🟡 Medium

````
PROMPT — G5-10 · 🟡 Medium

GOAL
The map is currently a plain Google Maps iframe. Make it more useful without
adding a paid API.

CONTEXT — verified data already in config/school.ts:
  SCHOOL.mapEmbedUrl   (iframe src)
  SCHOOL.mapOpenUrl    (opens in Google Maps)
  DAPODIK.koordinat    { lat: -4.2199, lng: 105.5949 }
  SCHOOL.address, SCHOOL.kabupaten, SCHOOL.provinsi, SCHOOL.kodePos "34596"

APPLY TO
  app/kontak/page.tsx  and  app/profil/identitas/page.tsx Blok 04
  (The homepage "Lokasi Kami" section is FROZEN — do not touch it.)

CHANGES
1. Lazy-load the iframe: add loading="lazy" and an explicit title attribute
   (title="Peta lokasi SMA Darussalam") for accessibility. Currently a
   title-less iframe is an accessibility failure.
2. Add an action row below the map with three buttons, all free:
   - "Buka di Google Maps" → SCHOOL.mapOpenUrl
   - "Petunjuk Arah" → https://www.google.com/maps/dir/?api=1&destination=LAT,LNG
     built from DAPODIK.koordinat
   - "Salin Alamat" → the CopyButton from G3-10 with the full address string
   Use existing chip / pill styling from the page. Do not use .btn* classes.
3. Show the coordinates as text below (they are already shown on identitas —
   match that formatting rather than inventing a new one).

DO NOT
- Do not add Leaflet, Mapbox, react-map-gl, or the Google Maps JS API. All cost
  money or add significant weight, and G5=a requires free solutions.
- Do not replace the iframe with a static image.
- Do not touch the homepage map section.

ACCEPTANCE CRITERIA
- The iframe has a title and loads lazily (verify in DevTools that it is not
  requested until scrolled near).
- "Petunjuk Arah" opens Google Maps directions to -4.2199,105.5949.
- "Salin Alamat" copies the full address including kodePos.
- All three actions work on a phone.
- Homepage map section unchanged (git diff app/page.tsx shows nothing).
- Page weight does not increase measurably.

ROLLBACK
git checkout app/kontak/page.tsx app/profil/identitas/page.tsx
````

## G5-11 · Masonry gallery with lightbox · 🟠 High

````
PROMPT — G5-11 · 🟠 High

GOAL
app/galeri/page.tsx uses a fixed grid, so every photo is cropped to the same
shape. Switch to a masonry layout that respects each photo's real proportions,
and let a tap open it full screen.

ORDER OF WORK — TWO SEPARATE COMMITS AND DEPLOYS
  Commit A: masonry layout only.
  Commit B: lightbox only.
Do not combine them. If A looks wrong, B is wasted work.

PART A — MASONRY
- Use CSS columns, not a JS masonry library:
    columns-2 md:columns-3 gap-4  with each item  mb-4 break-inside-avoid
- 4 of the 12 GALLERY entries are YouTube embeds
  (youtube.com/embed/dQw4w9WgXcQ). Those have a fixed 16:9 aspect and must NOT
  be distorted by the masonry flow. Give video items a fixed aspect-video
  wrapper. Verify all four still play.
- CSS columns reflow items in column order, not reading order. Confirm with the
  owner that this is acceptable; if strict chronological order matters, report it
  and stop before proceeding.

PART B — LIGHTBOX
- Build a small client component; do not add a lightbox package.
- Requirements: open on click, close on Escape / backdrop click / close button,
  arrow-key and swipe navigation between images, focus trapped inside while open,
  focus returned to the triggering thumbnail on close, body scroll locked,
  aria-modal="true" role="dialog".
- Videos open in the lightbox as an embedded player, or simply link out — choose
  the simpler one and report it.
- Respect prefers-reduced-motion: fade only.

DO NOT
- Do not add react-photo-album, yet-another-react-lightbox, photoswipe, or
  similar.
- Do not change the gallery data or image URLs.
- Do not touch components/GaleriSlider.tsx (the homepage slider) or
  components/KenanganGrid.tsx unless the owner asks.

ACCEPTANCE CRITERIA (Part A)
- Photos display at their natural aspect ratios with no letterboxing.
- No item is split across two columns.
- All 4 video embeds keep a 16:9 shape and still play.
- At 390px: two columns, no horizontal scroll.

ACCEPTANCE CRITERIA (Part B)
- Escape, backdrop click and the close button all close it.
- Arrow keys and touch swipe move between images.
- Tab cycles only inside the dialog while open.
- Focus returns to the thumbnail that opened it.
- Background does not scroll while open.
- Works at 390px with the image fully visible.

ROLLBACK
git checkout app/galeri/page.tsx  (and rm the lightbox component for Part B)
````

## G5-12 · Compare MIPA vs IPS · 🟠 High

````
PROMPT — G5-12 · 🟠 High

GOAL
The school has exactly two study programmes, which makes a side-by-side
comparison genuinely useful for parents choosing between them.

CONTEXT
lib/demo-data.ts JURUSAN (~lines 207-226) has two entries: mipa and ips.
Read their full shape first and list every field. The comparison can only show
fields that BOTH entries actually have — do not invent fields.

CHANGE — app/jurusan/page.tsx
Add a comparison table below the existing two cards (do not replace the cards):
- Two data columns (MIPA, IPS) and one row per comparable field.
- Desktop: a real <table> with <caption>, <th scope="col"> headers and
  <th scope="row"> row labels.
- Mobile (390px): a table with two columns and long text does not work. Switch to
  stacked cards — one card per field showing both values — or make the table
  horizontally scrollable in its own container like the sarana table on
  /profil/identitas already does. Choose the scrollable table for consistency
  with the existing pattern, and report your choice.
- Reuse existing table styling from app/profil/identitas/page.tsx (the sarana
  table) rather than creating a new table style.

HONESTY REQUIREMENT
If a field's value is not real school policy (for example an invented career
prospect list), do not display it. Verify each field against what the school has
actually published. Report any field you excluded and why.

DO NOT
- Do not add a toggle/tab widget that hides one programme — the point is
  side-by-side comparison.
- Do not change the existing two jurusan cards or app/jurusan/[slug]/page.tsx.
- Do not invent subject lists, quotas, or career outcomes.

ACCEPTANCE CRITERIA
- Every row shows a real value for both programmes, or the row is omitted.
- Desktop: a readable two-column comparison.
- 390px: no horizontal page scroll; the table scrolls inside its own container.
- Screen reader reads row and column headers correctly.
- The two existing jurusan cards are unchanged.
- Links to /jurusan/mipa and /jurusan/ips still work.

ROLLBACK
git checkout app/jurusan/page.tsx
````

## G5-13 · Page transitions · 🟠 High — RECOMMENDED: SKIP

````
PROMPT — G5-13 · 🟠 High — READ THE WARNING FIRST

⚠️ RECOMMENDATION: DO NOT IMPLEMENT THIS.

The owner selected it, so it is documented here, but the honest engineering
assessment is that the cost outweighs the benefit on this stack:

- Next.js 14 App Router has no stable, supported page-transition primitive.
  Every available approach (framer-motion AnimatePresence in a template.tsx,
  next-view-transitions, custom route-change hooks) fights the router.
- Known failure modes: scroll position restored to the wrong place, a flash of
  unstyled or duplicated content, the browser Back button feeling laggy or
  double-firing, and server components losing streaming benefits.
- The site currently has 30 routes and a hiding navbar; both amplify these issues.
- The perceived benefit is small: users spend far more time scrolling within a
  page than moving between pages.

IF THE OWNER STILL WANTS IT, these are the hard requirements:

PREREQUISITES
- Every other wave complete, deployed, and stable for at least a week.
- A git tag to return to: git tag before-page-transitions

IMPLEMENTATION CONSTRAINTS
- Use app/template.tsx with framer-motion, fade only (no slide, no scale).
- Duration must be at most 200ms. Longer makes navigation feel slower, not nicer.
- Must not convert any server component to a client component.
- Must not break scroll restoration. Test: scroll halfway down /prestasi, click
  an achievement, press Back — you must return to the same scroll position.
- Must respect prefers-reduced-motion (no animation at all).
- Must not animate on the initial page load.

STOP CONDITIONS — revert immediately if any of these occur:
- Any flash of blank or duplicated content between routes.
- Scroll position wrong after Back.
- Navigation feels slower than before.
- Lighthouse mobile performance drops by more than 2 points.
- Any hydration warning appears in the console.

ACCEPTANCE CRITERIA
- All six stop conditions verified absent, on a real phone, on all of:
  / → /prestasi → /berita → /berita/[slug] → Back → Back
- If you cannot verify all six, revert and report that the step failed. That is
  the expected and acceptable outcome.

ROLLBACK
git reset --hard before-page-transitions
````

### ✅ End of Wave 5

```
npm run build && npx tsc --noEmit
git add -A && git commit -m "feat: wave 5 layout" && git tag wave-5
```

**Then stop.** The next phase (real content, then CMS) is planned separately.

---

# Appendix A — Verified school data

Everything in this table is confirmed from the school's own Dapodik record
(NPSN **70000262**) and is already correct in `config/school.ts`.
**Never overwrite these values with invented ones.**

| Field | Verified value |
| --- | --- |
| Name | SMA Darussalam |
| Foundation | Yayasan Darussalam Simpang Mesir |
| Status | Swasta / Yayasan |
| Address | Desa Simpang Mesir, Kec. Gedung Aji Baru, Kab. Tulang Bawang, Lampung |
| Postcode | 34596 |
| Coordinates | −4.2199, 105.5949 |
| NPSN | 70000262 |
| Principal | Muzaki Ariffin Affandi |
| SK Pendirian | 118.4/YSDM/SMA-DS/X/2019 · 30 Oktober 2019 |
| SK Izin Operasional | 463/1370/V.16/2020 · 10 Februari 2020 |
| Founded | 2019 |
| Students | 246 (112 L / 134 P) |
| Rombel | 7 |
| Staff | 11 total — 8 guru, 3 tendik |
| Accreditation | Belum terdata di Dapodik |
| Sarana | Ruang Kelas 8 · Perpustakaan 1 · Ruang Kepsek 1 · Lab Komputer 1 · Toilet Siswa 2 · Toilet Guru 2 (all condition "Sedang") |
| Data quality | Skor 77.49 · Kelengkapan 91.42 · Validitas 71.58 · Kemutakhiran 71.43 |

**Important caveat used in G2-5:** within the quality breakdown, `Ruang` scores
**0%** for freshness. The room inventory in Dapodik is stale, so a facility being
absent from the sarana list is **not** proof it does not exist. That is why G2-5
neutralises unverifiable claims instead of deleting facilities.

**The 11 real staff members** (keep these, they are not fabricated):
Muzaki Ariffin Affandi S.Pd. (Kepala Sekolah) · Fitri Handayani S.Pd. (Biologi) ·
Bambang Sutrisno S.Pd. (Sejarah) · Ratna Wulandari S.Pd. (Matematika) ·
Budi Santoso S.Pd. (Fisika) · Sari Dewi S.Pd. (B. Inggris) ·
Denny Kurniawan S.Kom. (Informatika) · Andi Firmansyah S.Or. (PJOK) ·
Kholil Fawaid S.Sos.I. (Ka. TU) · Hasib Fawaid S.Kom. (Tenaga Teknis) ·
Riza Ainur Rofiq S.Kom. (Tenaga Teknis)

---

# Appendix B — Manual steps only the owner can do

These are not coding tasks. The agent cannot complete them.

| # | Task | Blocks |
| --- | --- | --- |
| 1 | Sign up free at **goatcounter.com**, choose a site code | G2-2 |
| 2 | In GoatCounter **Settings**, enable **"Allow adding visitor counts on your website"** — it is **OFF by default**; without it the footer numbers never appear | G2-2 |
| 3 | Set `NEXT_PUBLIC_GOATCOUNTER_CODE` in Vercel project environment variables, then redeploy | G2-2 |
| 4 | Provide the **real WhatsApp number** for `config/school.ts` → `whatsapp`, `whatsappDisplay`, `social.whatsapp` | G2-7 is not publishable without it |
| 5 | Provide real Instagram / TikTok / Facebook / YouTube URLs | The 4 hidden social icons reappear automatically (G1-4) |
| 6 | Provide the real phone number and school email | Footer + Kontak |
| 7 | Confirm which of these 8 facilities actually exist: Lab IPA Terpadu, Studio Musik & Seni, Masjid & Ruang Ibadah, Aula Serbaguna, Lapangan Olahraga, Kantin Sehat, UKS, Green House Edukasi | G2-5 follow-up |
| 8 | Supply real PDFs for `/unduhan` | H1-c |
| 9 | Supply real school photos to replace Unsplash / picsum / pravatar images | G4-9 blur-up gets much better |
| 10 | Supply official PPDB fee figures if the fee card should show numbers again | G2-1 reversal |
| 11 | Run `npm run build` locally once and share the output — **the build has never been verified in this analysis** (the audit sandbox had no network access, so dependencies could not be installed) | Everything |

---

# Appendix C — Known and deliberate non-issues

An agent auditing this codebase will likely flag these. **They are all intentional.
Do not "fix" them.**

| Observation | Verdict |
| --- | --- |
| Navbar disappears when scrolling down | Intended by the owner |
| Homepage shows only a hamburger, no desktop nav links | Intended (`overlay = pathname === "/"`) |
| Teacher marquee renders the staff list twice | Intended — `{children}{children}` creates the seamless loop |
| `.btn-outline` and `.btn-white` are each defined twice in globals.css (~556-568 and ~593-604) | Known. **Explicitly out of scope** by owner request |
| One button on the homepage and one on /kontak have a broken class combination | Known. **Explicitly out of scope** by owner request |
| `IS_DEMO = false` in config/school.ts while content is still sample content | Deliberate — the owner rejected demo labelling. Waves 2 removes the fabricated content instead |
| Google Fonts loaded via CSS `@import` rather than `next/font` | Known performance item, not in this pack. Do not migrate without asking — it changes font loading behaviour |
| Only 5 of ~30 routes export `metadata`; no `generateMetadata` on dynamic routes | Known SEO gap. The owner deprioritised SEO (A1=a). Only G1-10 and G5-2 touch metadata |
| CSP header sets no `default-src` / `script-src` | Known. Tightening it would break the GoatCounter script added in G2-2 — coordinate before changing |
| `sitemap.ts` uses `new Date()` for every `lastModified` | Known minor issue, not in scope |
| Stock photos from Unsplash / picsum / pravatar | Placeholder until real photos exist (Appendix B #9) |

---

# Appendix D — Quick step index

| Wave | Steps | Effort | Deploy cadence |
| --- | --- | --- | --- |
| 0 | Safety net (3 tasks) | 🟢 | once |
| 1 | G1-1 … G1-12 | all 🟢 | batch 3–4, one deploy per batch |
| 2 | G2-1 … G2-7 | 🟢×2 🟡×5 | batch 2, deploy between |
| 3 | G3-1 … G3-11 | all 🟢 | batch 3–4 · **⭐ STABLE after this** |
| 4 | G4-1 … G4-8 | 🟡 | batch 2 |
| 4 | G4-9 | 🟠 | 8 groups, one deploy each |
| 5 | G5-1 … G5-3, G5-5 … G5-12 | 🟡 / 🟠 | one step per deploy |
| 5 | G5-4 | — | **parked, do not build** |
| 5 | G5-13 | 🟠 | **recommended: skip** |

**Total: 52 executable steps** (55 planned, minus G5-4 parked, minus G5-13
recommended-skip, minus G1-12 which is an inspection).

---

*Prompt pack generated 1 September 2026. Line numbers verified against the
uploaded source archive. Build not verified — see Appendix B #11.*
