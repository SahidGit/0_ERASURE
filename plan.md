# 0_ERASURE — Complete Website Build Plan

### A Privacy & Security Intelligence Platform

*Detailed architectural prompt for AI-assisted development*

---

## 0. PROJECT OVERVIEW

Build a full-featured, single-page (or multi-page) **privacy and cybersecurity intelligence website** called **0_ERASURE**. The site educates users on digital privacy, tracks live breaches, reviews privacy tools (browsers, VPNs, email services), publishes security news, and features an interactive threat dashboard. The aesthetic is **dark, industrial, surveillance-era brutalism** — think redacted government documents, CCTV monitors, amber warning lights, and terminal readouts. Every visual decision should feel deliberate, urgent, and slightly ominous.

---

## 1. TECH STACK

### Frontend Framework

- **Next.js 14** (App Router) — for SSR/SSG on news/blog pages and fast static pages
- **React 18** — component-based architecture
- **TypeScript** — strict type safety throughout
- **Tailwind CSS** — utility-first styling with custom design tokens defined in `tailwind.config.ts`

### Animation & Motion

- **Framer Motion** — page transitions, scroll-triggered reveals, counter animations
- **GSAP (GreenSock)** — complex timeline animations (hero glitch effect, ticker tape, scan line)
- **Lottie** — for any looping icon animations (shield pulse, lock spinning)

### Data & CMS

- **Sanity.io** — headless CMS for news articles, tool reviews, incident reports
- **SWR or React Query** — client-side data fetching for live breach numbers (from a mock API or HaveIBeenPwned)
- **JSON flat files** — for static data like tool comparison tables, country surveillance index

### Charting & Visualization

- **Recharts** or **D3.js** — for surveillance index bar charts, country scorecards
- **Canvas API** (custom) — world map with animated breach blips, like in the reference designs
- **SVG animations** — encryption flow diagram (Section 04), fingerprint scanner animation

### Utilities

- **date-fns** — for formatting timestamps on incident timeline
- **clsx / cn** — conditional class merging
- **next/font** — Google Fonts optimization (Bebas Neue, Space Mono, Rajdhani)

### Deployment

- **Vercel** — zero-config Next.js deployment
- **GitHub Actions** — CI/CD pipeline

---

## 2. DESIGN SYSTEM

### 2.1 Color Palette

```css
:root {
  /* Backgrounds */
  --black: #020202; /* page background */
  --dark: #080808; /* section alternate */
  --panel: #0e0e0e; /* card/panel fill */
  --panel-2: #141414; /* nested panel, terminal */
  --panel-3: #1a1a1a; /* hover states */

  /* Borders */
  --border: #1e1e1e; /* standard divider */
  --border-lit: #2a2a2a; /* highlighted border on hover */

  /* Brand / Accent */
  --orange: #d4560a; /* PRIMARY accent — CTAs, highlights */
  --orange-bright: #f06a1a; /* hover state orange */
  --orange-dim: #6b2a05; /* muted orange for borders */
  --orange-glow: rgba(212, 86, 10, 0.15); /* ambient glow */

  /* Status Colors */
  --red: #cc2200; /* CRITICAL / danger */
  --red-dim: #5a1000; /* muted red */
  --amber: #d97706; /* WARNING / medium threat */
  --green: #22c55e; /* OK / secure / low threat */
  --green-dim: #0a3a1a; /* muted green */
  --cyan: #00fff0; /* glitch second color */

  /* Typography */
  --text: #c8c8c8; /* body text */
  --text-dim: #666666; /* secondary/muted text */
  --text-muted: #333333; /* barely visible labels */
  --white: #f0f0f0; /* headings */
}
```

### 2.2 Typography


| Role          | Font                | Weight  | Size     | Notes                                            |
| ------------- | ------------------- | ------- | -------- | ------------------------------------------------ |
| Hero Display  | **Bebas Neue**      | 400     | 72–120px | ALL CAPS, tight leading 0.9                      |
| Section Heads | **Bebas Neue**      | 400     | 40–64px  | Letter-spacing 0.02em                            |
| Sub-heads     | **Rajdhani**        | 700     | 18–24px  | ALL CAPS, ls 0.08em                              |
| Body Copy     | **Rajdhani**        | 300–400 | 13–15px  | Line-height 1.75                                 |
| Mono / Labels | **Share Tech Mono** | 400     | 9–12px   | ALL CAPS, ls 0.15em — for stats, timestamps, nav |
| Terminal      | **Space Mono**      | 400     | 12px     | Used exclusively in terminal section             |


Import from Google Fonts:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=Space+Mono:wght@400;700&family=Rajdhani:wght@300;400;600;700&display=swap"
  rel="stylesheet"
/>
```

### 2.3 Visual Effects

1. **Scanlines overlay** — a fixed `::before` on `<body>` with `repeating-linear-gradient` at 4px intervals, `opacity: 0.025`, `pointer-events: none`, `z-index: 9999`
2. **Noise texture** — SVG `feTurbulence` filter as a fixed overlay, `opacity: 0.03`
3. **Glitch animation** — pseudo-elements on `<h1>` using `clip-path` slices shifting ±3px in red/cyan, triggered every ~4 seconds
4. **Scan line sweep** — a horizontal amber line sweeps across the world map canvas every 3 seconds
5. **Ambient glow** — `radial-gradient` orange glow behind hero text, subtle
6. **Panel borders** — 1px solid `var(--border)` on all cards; left border accent 2px `var(--orange)` on active/hovered items
7. **CRT monitor effect** — on the CCTV hero image: `filter: contrast(1.1) brightness(0.85) sepia(0.3)` + scanlines
8. **Custom cursor** — `cursor: crosshair` globally; change to `cursor: pointer` on interactive elements

### 2.4 Grid System

- Use CSS Grid, **12-column** base
- Main content max-width: **1400px**, centered, no padding on edge — let border lines bleed full width
- Sections separated by full-width 1px `var(--border)` lines — no vertical padding gaps, everything is **edge-to-edge panels**
- Use `display: grid; grid-template-columns: repeat(12, 1fr)` then span appropriately per section

---

## 3. GLOBAL COMPONENTS

### 3.1 Top Info Strip (Ticker Bar)

**Position:** Fixed at very top, `z-index: 1100`, height: 28px
**Background:** Pure `#000`
**Border-bottom:** 1px `var(--border)`

**Left side (scrolling ticker):**

- Animated marquee of live stats separated by `|` dividers:
  - `● LIVE — GLOBAL PRIVACY INDEX UPDATED`
  - `18M PASSWORDS LEAKED TODAY`
  - `END-TO-END ENCRYPTION ACTIVE`
  - `TRACKERS BLOCKED: 4,203`
  - `LAST BREACH: 09:14 GMT`
  - `CURRENT THREAT LEVEL: ELEVATED`
- Values in orange, labels in `--text-dim`
- Infinite CSS animation: `animation: ticker 40s linear infinite`
- Duplicate the items array to avoid gaps

**Right side (fixed):**

- `● LIVE` pulsing red dot + `THREAT: HIGH` in amber
- Font: Share Tech Mono, 9px, letter-spacing 0.15em

**Interaction:** Pause on hover (`animation-play-state: paused`)

---

### 3.2 Navigation Bar

**Position:** Sticky below info strip, `top: 28px`, full width
**Height:** 56px
**Background:** `rgba(2,2,2,0.96)` with `backdrop-filter: blur(8px)`
**Border-bottom:** 1px `var(--border)`

**Left — Logo:**

```
[🛡 PRIVACY WATCH]
```

Shield SVG icon (outlined, orange stroke) + wordmark in Bebas Neue 22px.
Clicking scrolls to top.

**Center — Nav Links:**
`SURVEILLANCE` | `PRIVACY TOOLS` | `BREACH TRACKER` | `ENCRYPTION` | `DIGITAL RIGHTS` | `MANIFESTO`

Style:

- Font: Share Tech Mono, 10px, ls 0.12em, ALL CAPS
- Default: `--text-dim`
- Hover: `--orange` + bottom border 1px `--orange`
- Active: same
- Separated by 1px `--border` vertical lines, not by margin

**Right — CTA Button:**

```
[REPORT INCIDENT →]
```

Background `--orange`, color white, font Share Tech Mono 10px, padding `10px 20px`, NO border-radius (sharp corners), hover → `--orange-bright` + glow shadow

**Mobile:** Hamburger icon → full-screen overlay menu, same dark background

---

## 4. SECTIONS — DETAILED SPECIFICATION

---

### SECTION 01 — HERO

**Layout:** 2-column grid. Left ~55%, Right ~45%.
**Full viewport height** minus top strip + nav (calc 100vh - 84px)
**Background:** `--black` with subtle orange radial glow bottom-left

#### LEFT COLUMN

**Coordinates line (top):**

```
37.7749° N, 122.4194° W
YOU ARE BEING OBSERVED
```

Font: Share Tech Mono, 10px, `--text-dim`. Animate in on load with typewriter effect (reveal character by character over 1.5s).

**Headline:**

```
Privacy
is not
a feature.
```

Font: Bebas Neue, `clamp(64px, 9vw, 120px)`, line-height 0.88, color `--white`.
Word **"feature."** in `--orange`.

**Glitch effect on headline:**

- `::before` pseudo — same text, `clip-path: polygon(0 20%, 100% 20%, 100% 45%, 0 45%)`, `color: var(--red)`, `transform: translateX(-3px)`, triggers every 4s via animation
- `::after` pseudo — `clip-path: polygon(0 65%, 100% 65%, 100% 80%, 0 80%)`, `color: var(--cyan)`, `transform: translateX(3px)`
- Both have `opacity: 0` most of the time, flash for 80ms during glitch window

**Subheadline:**

```
It's a fundamental human right.
Take control. Protect your data.
Reclaim your digital identity.
```

Font: Rajdhani 300, 15px, `--text-dim`, line-height 1.8, max-width 400px. Fade in 0.3s delay after headline.

**CTAs (side by side):**

- `[PROTECT YOURSELF →]` — solid `--orange` button, Bebas Neue or Share Tech Mono, no radius
- `[READ THE MANIFESTO]` — transparent, 1px `--border`, `--text-dim` text, hover → `--orange` border + text

**Stats row (bottom of left column, above fold):**
Horizontal rule 1px `--border` then 3 stats:

```
YOUR SESSION EXPIRES IN     PRIVACY SCORE ▾     THREAT LEVEL
00 : 23 : 47 : 12          62 / 100            HIGH ●
DAYS  HRS  MIN  SEC         [======    ]        GLOBAL SURVEILLANCE ACTIVE
```

- Countdown: JavaScript `setInterval`, counts down from a randomized "session window"
- Privacy Score: static 62, with a thin orange progress bar beneath it
- Threat Level: "HIGH" in `--amber`, pulsing dot
- Font: Share Tech Mono throughout. Dividers: 1px `--border` vertical lines

#### RIGHT COLUMN

**CCTV / Camera Feed Panel:**

- Background: near-black textured image (use a grainy, desaturated CCTV-style photo or SVG/canvas-generated)
- Apply CSS filter: `contrast(1.2) brightness(0.7) sepia(0.2) saturate(0.4)`
- Overlay scanlines via `::after` pseudo
- Top-left corner: `CAM 031` in Share Tech Mono, orange — blinks every 2s
- Top-right: `● REC` blinking red indicator + `E:R` label
- Camera bracket corners: CSS borders on `::before`/`::after` of inner div — like targeting reticle corners

**HOW TO GENERATE THE CCTV IMAGE:**
Either use a royalty-free CCTV/surveillance image, or generate with canvas:

- Dark gray noise background
- Draw a blurred ellipse (face/silhouette outline) in center
- Apply canvas `filter: blur(2px)` + noise pattern
- Draw targeting crosshair circles in orange at low opacity

**Live Breach Feed box (overlapping bottom-right of camera):**
Absolute positioned panel:

```
● LIVE BREACH FEED
18,249,104        1,203
PASSWORDS LEAKED TODAY  DATA BREACHES TODAY

4.7B
RECORDS EXPOSED TODAY
```

Background: `rgba(14,14,14,0.92)`, border: 1px `--border`, border-left: 2px `--orange`
Numbers animate up from 0 on load (counter animation, 1.5s ease-out)
Font: numbers in Bebas Neue 32px `--white`, labels in Share Tech Mono 9px `--text-dim`

---

### SECTION 02 — LIVE BREACH TRACKER

**Section label:** `02 LIVE BREACH TRACKER` — Share Tech Mono, top-left, `--orange`
**Sub-label:** `REAL-TIME GLOBAL BREACH FEED — UPDATED EVERY 30 SECONDS`

**Layout:** 2-column. Left: stats + list. Right: world map canvas.

#### LEFT — Stats Panel

```
TOTAL BREACHES (24H):   1,203
RECORDS EXPOSED:    4,761,231,809
COMPROMISED ACCOUNTS:   2,981,902
DATA LEAKS DETECTED:        553
```

Each stat:

- Label: Share Tech Mono 9px `--text-dim`
- Value: Bebas Neue 42px `--white`
- Animated counter on scroll into view

Below stats: Scrollable list of **Recent Breaches:**

```
10:42  HealthCare DB     — 54M records    [CRITICAL]
10:37  FinTech Corp      — 8.1M records   [HIGH]
10:20  Social Network    — 3.4M records   [HIGH]
10:15  Government Portal — 901K records   [MEDIUM]
10:05  E-commerce Site   — 440K records   [MEDIUM]
```

Each row: grid `time | name | count | badge`

- Time: Share Tech Mono, `--orange`
- Badge colors: CRITICAL=`--red`, HIGH=`--orange`, MEDIUM=`--amber`
- Hover: left border 2px `--orange`, background `rgba(212,86,10,0.05)`
- Click → modal with full incident details

**[VIEW FULL BREACH TRACKER →]** link at bottom, Share Tech Mono 10px `--orange`

#### RIGHT — World Map Canvas

- `<canvas>` element, draws simplified continent outlines as filled polygons (dark orange fill, orange stroke)
- CSS grid overlay
- Animated **breach blips**: circles at coordinates for major cities, pulsing with `box-shadow` glow
  - Red blips = active breaches
  - Orange blips = monitored regions
  - Green blips = secure nodes
- Horizontal scan line sweeps every 4s
- `[SCAN AGAIN →]` button re-triggers scan animation

---

### SECTION 03 — DIGITAL FOOTPRINT MAP

**Section label:** `03 DIGITAL FOOTPRINT MAP`
**Sub-label:** `SEE WHO'S TRACKING YOU`

**Layout:** 2-column. Left: fingerprint/radar visualization. Right: tracker category list.

#### LEFT — Fingerprint Radar

- SVG or Canvas drawing of a **fingerprint** or **radar circle** in center
- Concentric rings in `--border` color, center dot in `--orange`
- Thin radial lines like a radar sweep
- Animated sweep line rotates continuously
- Silhouette of a person in the center (SVG path, filled `--text-muted`)
- Small dots orbit the figure representing trackers

#### RIGHT — Tracker Categories

```
[icon] AD TRACKERS              124
[icon] ANALYTICS SCRIPTS         35
[icon] SOCIAL PLUGINS            18
[icon] FINGERPRINT ATTEMPTS       7
[icon] GEO TRACKERS              11
```

Each row: flex between label and count

- Icons: simple SVG outlined icons (eye, chart, puzzle piece, finger, map pin)
- Count: Bebas Neue 24px `--white`
- Label: Share Tech Mono 10px `--text-dim`
- Hover: item highlights orange

**[SCAN AGAIN →]** button: triggers a re-randomize of the counts with counter animation, resets radar sweep

---

### SECTION 04 — ENCRYPTION EXPLAINER

**Section label:** `04 ENCRYPTION EXPLAINER`
**Layout:** 3-column. Left: headline + body. Center: animated diagram. Right: encrypted data visualization.

#### LEFT

```
Encryption
is your shield.
```

Bebas Neue 56px. Subtext explains in Rajdhani 13px what encryption does.
`[LEARN MORE →]` link.

#### CENTER — Encryption Flow Diagram

Animated SVG diagram:

```
[YOUR DATA 📄]  ──→  [ENCRYPTION 🔒]  ──→  [ENCRYPTED DATA]
                           ↑
                      [YOUR KEY 🔑]
```

Then below: Decryption flow in reverse.

- Dashed animated lines (CSS `stroke-dashoffset` animation)
- Lock icon pulses orange
- Arrows animate left-to-right on scroll into view

#### RIGHT — Encrypted Data Block

Monospace block of hex/base64 gibberish text in `--text-dim`, slowly scrolling upward on loop:

```
a3 f7 9c 2d
40 8e 1a 6f
7c 3b 2e 5a
0f 18 4c 80
...
```

Font: Share Tech Mono 11px. Background: `--panel-2`. Title: `ENCRYPTED DATA` in orange.
Below: `DECRYPTION KEY` with a key SVG and redacted bar.

---

### SECTION 05 — PRIVACY MANIFESTO

**Section label:** `05 PRIVACY MANIFESTO`
**Sub-label:** `OUR BELIEFS`

**Layout:** 2-column split.

#### LEFT — Manifesto Text

```
The right to privacy
is the right to liberty.
```

Bebas Neue 52px, `--white`.

Body paragraphs in Rajdhani 14px `--text-dim`, line-height 1.8:

> We believe in a world where technology serves people, not the other way around. A world where privacy is the default, not a luxury.
>
> We fight surveillance. We expose exploitation. We build tools. We educate. We resist. Because a private world is a free world.

`[READ THE FULL MANIFESTO →]`

#### RIGHT — Protest Poster Visual

Styled like a rough-printed propaganda poster:

- Background: grunge texture (CSS SVG noise filter + sepia)
- Bold text (Bebas Neue):

```
PRIVACY
IS POWER.
PROTECT IT.

NO SURVEILLANCE.
NO EXPLOITATION.
NO EXCEPTIONS.
```

- Eye SVG illustration (watching eye, drawn in CSS/SVG)
- Border: rough 3px solid `--orange-dim` with slight rotation `transform: rotate(-1deg)`

---

### SECTION 06 — SECURITY PROTOCOLS

**Section label:** `06 SECURITY PROTOCOLS`
**Sub-label:** `PRACTICAL STEPS. REAL PROTECTION.`

**Layout:** 5-column icon grid of protocols, full width.

Each card:

```
[🔑]
STRONG PASSWORDS
Use unique, long passwords. Use a password manager.
```

Cards:

1. **Strong Passwords** — key icon. Tip: 20+ chars, unique per site, use password manager (Bitwarden, 1Password).
2. **Two-Factor Authentication** — shield + lock. Tip: Use authenticator app (Aegis, Authy), NOT SMS.
3. **Encrypt Your Communications** — chat bubble + lock. Tip: Signal for messages, ProtonMail for email.
4. **Keep Software Updated** — arrows circle. Tip: Updates patch vulnerabilities, enable auto-update.
5. **Limit Data Sharing** — hand stop. Tip: Share only what's necessary. Always question app permissions.

Style per card:

- Icon: 32px SVG, `--orange`, centered top
- Title: Rajdhani 700, 13px, `--white`, ALL CAPS, ls 0.08em
- Body: Rajdhani 300, 12px, `--text-dim`
- Border: 1px `--border` right, none on last
- Hover: background shifts to `rgba(212,86,10,0.04)`, icon glows

`[VIEW ALL PROTOCOLS →]` full-width link row beneath

---

### SECTION 07 — SURVEILLANCE INDEX / COUNTRY SCORECARD

**Section label:** `07 SURVEILLANCE INDEX`
**Sub-label:** `GLOBAL PRIVACY SCORECARD`

**Layout:** Full-width table with 5 columns.

**Table Headers:**
`COUNTRY | PRIVACY SCORE | SURVEILLANCE LEVEL | DATA PROTECTION | NOTES`

**Rows (at least 8 countries):**


| Country        | Score  | Level      | Data Protection | Notes                                            |
| -------------- | ------ | ---------- | --------------- | ------------------------------------------------ |
| Iceland        | 91/100 | 🟢 LOW     | STRONG          | Best-in-class privacy laws, no mass surveillance |
| Switzerland    | 85/100 | 🟢 LOW     | STRONG          | Strict banking/data secrecy laws                 |
| Germany        | 78/100 | 🟡 MEDIUM  | STRONG          | GDPR leader, some surveillance concerns          |
| Norway         | 75/100 | 🟡 MEDIUM  | STRONG          | Good laws, 5 Eyes-adjacent (partner)             |
| United States  | 42/100 | 🔴 HIGH    | WEAK            | NSA mass surveillance, PATRIOT Act, FISA         |
| United Kingdom | 38/100 | 🔴 HIGH    | WEAK            | 5 Eyes, Investigatory Powers Act, CCTV density   |
| India          | 34/100 | 🔴 HIGH    | WEAK            | Expanded surveillance, limited data law          |
| China          | 12/100 | 🔴 EXTREME | VERY WEAK       | Social credit system, total state surveillance   |


Style:

- Header row: Share Tech Mono 9px `--text-dim`, `--border` bottom
- Data rows: alternating `--panel` / `--panel-2` backgrounds, 1px `--border` bottom
- Score: color-coded number (green 70+, amber 40-69, red <40)
- Level badge: colored pill (no border-radius — use 2px)
- Country name: Rajdhani 700, `--white`
- Hover: row highlight orange left border 2px

`[VIEW FULL INDEX →]` row beneath table

---

### SECTION 08 — BEST TOOLS / TOOLKIT

**Section label:** `08 TOOLKIT`
**Sub-label:** `PRIVACY TOOLS WE TRUST`

**Layout:** 5-column tool card grid.

Each tool card:

```
[Logo/Icon]
SIGNAL
Encrypted messaging
for everyone.
[VISIT SITE →]
```

Tools to feature:

1. **Signal** — messaging. Icon: speech bubble. "Gold standard for private communication. Open source, no metadata."
2. **Bitwarden** — passwords. Icon: shield key. "Open-source password manager. Self-hostable. Free."
3. **DuckDuckGo** — search. Icon: duck. "Private search. No tracking. No profile building."
4. **ProtonMail** — email. Icon: envelope shield. "Swiss-based, end-to-end encrypted email. Free tier available."
5. **Tor Browser** — browsing. Icon: onion. "Anonymize your web traffic. Route through multiple nodes."

Style: Same as Section 06 cards. Hover → card lifts slightly (`transform: translateY(-2px)`).

`[VIEW ALL TOOLS →]`

---

### SECTION 09 — BROWSER COMPARISON TABLE

**Section label:** `09 BROWSER COMPARISON`
**Sub-label:** `WHICH BROWSER ACTUALLY PROTECTS YOU?`

This is a **rich comparison table** — one of the most important sections.

**Table columns:**
`BROWSER | PRIVACY SCORE | DEFAULT TRACKING | FINGERPRINTING PROTECTION | TELEMETRY | OPEN SOURCE | RECOMMENDED EXTENSIONS | VERDICT`

**Rows:**


| Browser                | Privacy Score | Default Tracking | Fingerprint Protection | Telemetry         | Open Source | Extensions               | Verdict                      |
| ---------------------- | ------------- | ---------------- | ---------------------- | ----------------- | ----------- | ------------------------ | ---------------------------- |
| **Tor Browser**        | 98/100        | ✅ None           | ✅ Excellent            | ✅ None            | ✅ Yes       | Limited                  | 🟢 BEST FOR ANONYMITY        |
| **Librewolf**          | 92/100        | ✅ None           | ✅ Strong               | ✅ None            | ✅ Yes       | Full Firefox support     | 🟢 BEST FOR DAILY USE        |
| **Firefox** (hardened) | 82/100        | ⚠️ Some          | ✅ Good                 | ⚠️ Opt-out        | ✅ Yes       | uBlock, Privacy Badger   | 🟢 GOOD — NEEDS TWEAKS       |
| **Brave**              | 78/100        | ✅ Blocked        | ✅ Good                 | ⚠️ Some           | ✅ Yes       | Limited need             | 🟡 GOOD — CRYPTO CONCERNS    |
| **Safari**             | 55/100        | ⚠️ Some          | ✅ ITP                  | ⚠️ Apple collects | ❌ No        | Very limited             | 🟡 PASSABLE ON APPLE         |
| **Chrome**             | 18/100        | ❌ Heavy          | ❌ None                 | ❌ Extensive       | ❌ No        | uBlock helps but limited | 🔴 AVOID — GOOGLE TRACKS ALL |
| **Edge**               | 22/100        | ❌ Heavy          | ❌ None                 | ❌ Microsoft       | ❌ No        | Some Chrome extensions   | 🔴 AVOID                     |
| **Opera**              | 15/100        | ❌ Heavy          | ❌ None                 | ❌ Chinese-owned   | ❌ No        | N/A                      | 🔴 DANGEROUS — DO NOT USE    |


**Table Style:**

- Full-width, no border-radius
- Header: `--panel-2` bg, Share Tech Mono 9px `--text-dim`
- Each row: 1px `--border` bottom, hover → orange left border 2px + bg `rgba(212,86,10,0.04)`
- Score: color-coded (same as Section 07)
- Verdict cell: colored badge `BEST` (green), `GOOD` (amber), `AVOID` (red)
- ✅/⚠️/❌ in cells are colored accordingly (green/amber/red)
- Column `BROWSER` is left-pinned (sticky left) for mobile scroll

Below table: paragraph explaining methodology.

---

### SECTION 10 — VPN COMPARISON

**Section label:** `10 VPN COMPARISON`
**Sub-label:** `NOT ALL VPNS ARE EQUAL — SOME ARE THE THREAT`

Same table format as browsers.

**Columns:** `VPN | Jurisdiction | Logs Policy | Open Source | Audited | Price | Best For | Verdict`


| VPN            | Jurisdiction           | Logs                   | Open Source | Audited    | Price       | Best For                              | Verdict                     |
| -------------- | ---------------------- | ---------------------- | ----------- | ---------- | ----------- | ------------------------------------- | --------------------------- |
| **Mullvad**    | Sweden                 | ✅ Zero                 | ✅ Yes       | ✅ Yes      | €5/mo flat  | Maximum anonymity (no account needed) | 🟢 BEST OVERALL             |
| **ProtonVPN**  | Switzerland            | ✅ Zero                 | ✅ Yes       | ✅ Yes      | Free–$10/mo | Free option, solid privacy            | 🟢 EXCELLENT                |
| **IVPN**       | Gibraltar              | ✅ Zero                 | ✅ Yes       | ✅ Yes      | $6/mo       | Privacy-focused users                 | 🟢 EXCELLENT                |
| **ExpressVPN** | British Virgin Islands | ⚠️ Claims zero         | ❌ No        | ⚠️ Partial | $13/mo      | Speed                                 | 🟡 ACCEPTABLE               |
| **NordVPN**    | Panama                 | ⚠️ Claims zero         | ❌ No        | ⚠️ Partial | $13/mo      | Mainstream                            | 🟡 ACCEPTABLE — PAST BREACH |
| **Surfshark**  | Netherlands            | ⚠️ Claims zero         | ❌ No        | ❌ No       | $2.5/mo     | Budget                                | 🟡 USE WITH CAUTION         |
| **PureVPN**    | Hong Kong              | ❌ Logged + gave to FBI | ❌ No        | ❌ No       | $3/mo       | —                                     | 🔴 AVOID                    |
| **Hola VPN**   | Israel                 | ❌ Sells bandwidth      | ❌ No        | ❌ No       | Free        | —                                     | 🔴 DANGEROUS — BOTNET       |


---

### SECTION 11 — EMAIL SERVICE COMPARISON

**Section label:** `11 EMAIL SERVICES`
**Sub-label:** `YOUR INBOX IS A SURVEILLANCE MACHINE — UNLESS YOU SWITCH`


| Service         | Jurisdiction | E2E Encryption | Open Source | Metadata             | Free Tier | Best For                      | Verdict                   |
| --------------- | ------------ | -------------- | ----------- | -------------------- | --------- | ----------------------------- | ------------------------- |
| **ProtonMail**  | Switzerland  | ✅ Always       | ✅ Yes       | ✅ Minimal            | ✅ Yes     | Best all-around private email | 🟢 BEST                   |
| **Tutanota**    | Germany      | ✅ Always       | ✅ Yes       | ✅ Minimal            | ✅ Yes     | Open-source alternative       | 🟢 EXCELLENT              |
| **Skiff Mail**  | USA          | ✅ Yes          | ✅ Yes       | ✅ Minimal            | ✅ Yes     | Newer, collaborative          | 🟢 GOOD                   |
| **Fastmail**    | Australia    | ❌ No E2E       | ❌ No        | ⚠️ Some              | ❌ No      | Convenience                   | 🟡 PASSABLE               |
| **iCloud Mail** | USA          | ❌ No E2E       | ❌ No        | ⚠️ Apple sees it     | ❌ No      | Apple ecosystem               | 🟡 ACCEPTABLE             |
| **Outlook**     | USA          | ❌ No E2E       | ❌ No        | ❌ Microsoft scans    | ❌ No      | Enterprise legacy             | 🔴 AVOID                  |
| **Gmail**       | USA          | ❌ No E2E       | ❌ No        | ❌ Google reads + ads | ✅ Yes     | —                             | 🔴 AVOID — TOTAL EXPOSURE |
| **Yahoo Mail**  | USA          | ❌ No           | ❌ No        | ❌ Sold to Verizon    | ✅ Yes     | —                             | 🔴 DO NOT USE             |


---

### SECTION 12 — NEWS / INCIDENT TIMELINE

**Section label:** `12 INCIDENT TIMELINE`
**Sub-label:** `MAJOR DIGITAL RIGHTS INCIDENTS`

**Layout:** Horizontal scroll timeline (on desktop). Cards per incident.

Each card:

```
[MAY 2024]
🔴 CRITICAL
Banking trojans discovered
targeting mobile users worldwide.
[READ MORE →]
```

Incidents to populate (use real or fictional, clearly labeled):

- Jan 2026 — AI facial recognition deployed in 40+ US airports
- Nov 2025 — Major health data breach: 120M records from hospital network
- Sep 2025 — EU passes controversial chat-scanning law (CSAM scanning, affects encryption)
- Jul 2025 — Password manager breach exposes 25M vaults
- May 2025 — Social media platform sells DMs to advertisers
- Mar 2025 — Government surveillance program exposed via leaked documents
- Jan 2025 — New zero-day exploit affects all major browsers
- Nov 2024 — Data broker aggregator leaks 3.8B records on dark web

Cards style: `--panel` bg, 1px `--border`, left: 2px color-coded, Hover → lift 3px

**Navigation:** Left/right arrows, keyboard arrow keys, touch swipe

`[VIEW FULL TIMELINE →]`

---

### SECTION 13 — SECURITY TIPS BLOG / NEWS FEED

**Section label:** `13 LATEST SECURITY NEWS`
**Sub-label:** `STAY INFORMED — UPDATED DAILY`

**Layout:** 3-column grid of article cards.

Each card:

```
[CATEGORY BADGE]     [DATE]
Article Headline in
Bebas Neue, 2 Lines
Short excerpt text in Rajdhani...
[READ MORE →]
```

Categories (with colored badges):

- `BREACH` — red
- `TOOL REVIEW` — orange
- `GUIDE` — amber
- `LEGISLATION` — cyan
- `THREAT ALERT` — red pulsing

Article topics to include:

1. "How to Disappear From the Internet: A Step-by-Step Guide"
2. "The 10 Worst Password Habits That Get People Hacked"
3. "What Does Your ISP Actually Know About You?"
4. "Why You Should Never Use Public WiFi Without a VPN"
5. "Signal vs. WhatsApp vs. Telegram: Privacy Compared"
6. "How Advertisers Build a Shadow Profile Without Cookies"
7. "The Best Way to Secure Your Email in 2026"
8. "Browser Fingerprinting: The Tracking You Can't Block With Cookies"
9. "What Happens to Your Data After a Company Gets Acquired"

Cards: hover → orange top border 2px, text shifts slightly

---

### SECTION 14 — INTERACTIVE TERMINAL

**Section label:** `14 SECURE TERMINAL`
**Sub-label:** `TRY IT — EXPLORE YOUR DIGITAL EXPOSURE`

Terminal window UI with macOS-style dots (red/amber/green circles at top-left).

Pre-seeded with startup output, then user types commands:

**Available commands:**


| Command          | Output                                                                |
| ---------------- | --------------------------------------------------------------------- |
| `help`           | Lists all commands                                                    |
| `scan`           | Simulates network scan, shows results after 2s delay                  |
| `whoami`         | Reveals actual browser `navigator` data (platform, languages, screen) |
| `trackers`       | Lists recently blocked tracker domains                                |
| `breach`         | Shows last 5 breaches                                                 |
| `encrypt <text>` | "Encrypts" text (base64 encode visually)                              |
| `decrypt <text>` | Reverses the above                                                    |
| `status`         | Shows all system statuses                                             |
| `manifesto`      | Prints manifesto articles                                             |
| `vpn`            | Explains VPN usage                                                    |
| `score`          | Gives the user a "Privacy Score" quiz via prompts                     |
| `clear`          | Clears terminal                                                       |


Terminal output styles:

- `[OK]` — green
- `[WARN]` — amber
- `[ERR]` — red
- `[INFO]` — orange
- Prompt: `root@privacywatch:~$` in orange

---

### SECTION 15 — PRIVACY SCORE QUIZ (Interactive)

**Trigger:** From terminal `score` command OR standalone "CHECK YOUR SCORE" button in hero.

A series of 10 yes/no questions that calculate a **Privacy Score out of 100**:

1. Do you use the same password on multiple sites? (-15)
2. Is your browser Chrome or Edge? (-10)
3. Do you use Gmail as your primary email? (-10)
4. Do you use a VPN regularly? (+10)
5. Do you use 2FA on your most important accounts? (+10)
6. Do you use an ad blocker? (+8)
7. Do you review app permissions regularly? (+7)
8. Do you use end-to-end encrypted messaging (Signal)? (+10)
9. Is your device disk encrypted? (+8)
10. Do you use a private search engine? (+7)

Score display:

- 0-30: `CRITICAL — YOU ARE EXPOSED` in red
- 31-60: `HIGH RISK — TAKE ACTION` in amber
- 61-80: `MODERATE — ROOM TO IMPROVE` in orange
- 81-100: `STRONG — STAY VIGILANT` in green

After score: personalized recommendations linking to relevant sections.

---

### SECTION 16 — CTA / JOIN THE MOVEMENT

**Section label:** `10 CTA / JOIN THE MOVEMENT`

**Layout:** Full-width dark section, 2-column.

**Left:**

```
Take back
your digital life.
```

Bebas Neue 72px, `--white`. Sub: "Join 125,000+ people reclaiming their privacy."

Two CTAs:

- `[JOIN THE MOVEMENT →]` — solid orange
- `[SUPPORT OUR WORK]` — outlined

**Right:** 4 animated stats:

```
125K+          8.4M+
PEOPLE PROTECTED    TRACKERS BLOCKED

3.2M+          100+
TOOLS DEPLOYED     COUNTRIES REACHED
```

Bebas Neue 52px for numbers, Share Tech Mono 9px for labels. Count up animation on scroll.

**Background:** Subtle image of crowd/protest in very dark treatment (CSS: `opacity: 0.08, sepia: 1`), or orange particle field generated with canvas.

---

### SECTION 17 — FOOTER

**Layout:** 5-column grid + full-width bottom bar.

#### Column 1 — Logo + Mission

```
[🛡 PRIVACY WATCH]
Fighting surveillance capitalism.
One tool at a time.
```

Social icons (Signal, GitHub, RSS feed, Mastodon) — all outlined SVGs, `--text-dim`, hover `--orange`.

#### Columns 2–5 — Links

- **Column 2 — LEARN:** Surveillance 101, How Tracking Works, Encryption Guide, Privacy Laws, Glossary
- **Column 3 — TOOLS:** Browser Guide, VPN Reviews, Email Services, Password Managers, OS Privacy
- **Column 4 — TRACKER:** Live Breach Feed, Incident Archive, Submit a Tip, Data Broker List, Threat Map
- **Column 5 — ABOUT:** About Us, Our Methodology, Transparency Report, Press, Careers

All links: Share Tech Mono 10px, `--text-dim`, hover → `--orange`

#### Bottom Bar (full-width, 1px border-top)

```
[🛡 PRIVACY WATCH]    ABOUT  CONTACT  PRESS  CAREERS  TRANSPARENCY  PRIVACY POLICY  TERMS
© 2026 PRIVACYWATCH. ALL RIGHTS RESERVED. BUILT WITH PRIVACY IN MIND.   ENCRYPTION: ACTIVE ●
```

Left: logo
Center: flat text links, Share Tech Mono 9px
Right: encryption status

**Special footer element:** A thin ticker at very bottom (or top of footer):

```
⚠ THIS WEBSITE USES NO TRACKING. NO COOKIES. NO ADS. NO SURVEILLANCE.
```

Amber text on even darker strip.

---

## 5. SCROLL & ANIMATION BEHAVIORS

### Page Load Sequence (staggered, 0–2.5s)

1. `0.0s` — Info strip fades in
2. `0.1s` — Nav slides down from top
3. `0.3s` — Hero coordinates typewriter begins
4. `0.6s` — Hero headline fades in with slight translate-Y (from +20px to 0)
5. `0.9s` — Subheadline fades in
6. `1.1s` — CTAs appear
7. `1.3s` — Stats row counts up
8. `1.5s` — Right panel CCTV image fades in with scanline effect
9. `2.0s` — Breach feed numbers count up
10. `2.5s` — Glitch fires once to announce the page

### Scroll-Triggered Animations (Intersection Observer)

- **Section headers:** Slide in from left (translateX: -30px → 0), `opacity: 0 → 1`
- **Stat counters:** Count from 0 to final value when 40% in viewport
- **Surveillance bars:** Width animates 0% → target% when section enters view
- **Timeline cards:** Staggered fade-in, 100ms delay between each
- **Tool cards:** Scale from 0.95 → 1.0 + fade on scroll
- **Table rows:** Reveal one by one with 50ms stagger

### Continuous Animations

- Ticker strip: infinite marquee
- Countdown: `setInterval` every second
- Map blips: pulsing box-shadow, staggered `animation-delay`
- Tracker counts: increment by random 1-3 every 5 seconds
- CCTV: scan line sweeps every 3s, occasional static glitch
- Hero coordinates: subtly update every 30s (randomize last 2 digits of lat/lon)

---

## 6. RESPONSIVE DESIGN

### Breakpoints

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1400px
```

### Mobile Adaptations

- Hero: single column, headline shrinks to `clamp(48px, 12vw, 72px)`, CCTV panel stacks below
- Breach tracker: map hides on mobile, list full-width
- Comparison tables: horizontal scroll with sticky first column
- Timeline: vertical stack instead of horizontal scroll
- Tool cards: 2-column grid
- Nav: hamburger → fullscreen overlay
- Terminal: full-width, reduced font size

---

## 7. PERFORMANCE NOTES

- Use `next/image` for all images (auto WebP conversion, lazy loading)
- Canvas animations: check `requestAnimationFrame` cancelation on component unmount
- Ticker: use CSS animation (not JS) for performance
- Fonts: subset via `next/font` — load only characters used
- Comparison tables: virtualize if > 50 rows
- Countup animations: only run once, mark completed with a ref flag
- Use `will-change: transform` sparingly (only on active glitch elements)

---

## 8. ACCESSIBILITY

- All animated elements: `prefers-reduced-motion` media query → disable glitch, pulse, ticker
- Color is never the only indicator (use icons + text alongside badges)
- All interactive elements keyboard navigable, visible focus ring in `--orange`
- `aria-live` on breach count updates (polite)
- Terminal: `aria-label="Interactive security terminal"`, `role="application"`
- Tables: proper `<thead>`, `<th scope="col">`, `<caption>` elements

---

## 9. FILE STRUCTURE

```
privacywatch/
├── app/
│   ├── layout.tsx          # Global layout, fonts, metadata
│   ├── page.tsx            # Main landing page
│   ├── news/
│   │   ├── page.tsx        # News listing
│   │   └── [slug]/page.tsx # Individual article
│   ├── tools/page.tsx      # Full tools directory
│   ├── tracker/page.tsx    # Full breach tracker
│   └── manifesto/page.tsx  # Full manifesto
├── components/
│   ├── layout/
│   │   ├── InfoStrip.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── BreachTracker.tsx
│   │   ├── FootprintMap.tsx
│   │   ├── EncryptionExplainer.tsx
│   │   ├── Manifesto.tsx
│   │   ├── SecurityProtocols.tsx
│   │   ├── SurveillanceIndex.tsx
│   │   ├── BrowserComparison.tsx
│   │   ├── VPNComparison.tsx
│   │   ├── EmailComparison.tsx
│   │   ├── Toolkit.tsx
│   │   ├── IncidentTimeline.tsx
│   │   ├── NewsGrid.tsx
│   │   ├── Terminal.tsx
│   │   ├── PrivacyScoreQuiz.tsx
│   │   └── CTA.tsx
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── CountUp.tsx
│   │   ├── Modal.tsx
│   │   ├── Panel.tsx
│   │   ├── SectionLabel.tsx
│   │   └── StatusBar.tsx
│   └── canvas/
│       ├── WorldMap.tsx
│       ├── FingerprintRadar.tsx
│       └── CCTVOverlay.tsx
├── data/
│   ├── browsers.json
│   ├── vpns.json
│   ├── emails.json
│   ├── tools.json
│   ├── countries.json
│   └── incidents.json
├── lib/
│   ├── countup.ts
│   ├── intersectionObserver.ts
│   └── formatters.ts
├── styles/
│   └── globals.css         # CSS variables, scanlines, noise, global resets
└── public/
    ├── fonts/              # Self-hosted fallback fonts
    └── icons/              # SVG icons
```

---

## 10. PROMPT FOR AI CODE GENERATION

When giving this plan to an AI to build, use this prompt:

---

**SYSTEM PROMPT:**

> You are an expert senior frontend developer and UI/UX designer. You create production-grade, visually exceptional websites. You write clean, well-commented code. You never use generic designs.

**USER PROMPT:**

> Build a complete single-file HTML website called 0_ERASURE. It is a privacy and cybersecurity intelligence platform. Use the following design system exactly:
>
> **Colors:** Background #020202, panels #0e0e0e, borders #1e1e1e, primary accent #d4560a (orange), bright orange hover #f06a1a, red critical #cc2200, amber warning #d97706, green secure #22c55e, body text #c8c8c8, dim text #666666, white headings #f0f0f0.
>
> **Fonts (Google Fonts):** Bebas Neue for display/hero, Share Tech Mono for labels/stats/terminal (monospace), Rajdhani for body copy, Space Mono for terminal input.
>
> **Global effects:** CSS scanlines overlay (repeating-linear-gradient), noise texture (SVG feTurbulence), crosshair cursor globally, glitch animation on hero h1 using pseudo-elements and clip-path.
>
> Include ALL of these sections in order: (1) Fixed info strip ticker, (2) Sticky navbar with logo + nav links + CTA, (3) Hero section with CCTV-style canvas panel + coordinates + countdown + privacy score + threat level + live breach feed numbers, (4) Live Breach Tracker with world map canvas + stats + scrollable incident list, (5) Digital Footprint radar + tracker category list, (6) Encryption explainer with animated flow diagram, (7) Privacy Manifesto with protest poster visual, (8) Security Protocols 5-card grid, (9) Surveillance Index country table, (10) Browser Comparison table with privacy scores for Chrome/Firefox/Brave/Tor/Safari/Edge/Librewolf, (11) VPN Comparison table for Mullvad/ProtonVPN/NordVPN/ExpressVPN/Hola, (12) Email Services table for ProtonMail/Tutanota/Gmail/Outlook, (13) Toolkit privacy tools grid, (14) Incident Timeline horizontal scroll, (15) Interactive Terminal with real commands (help/scan/whoami/breach/status/clear), (16) Privacy Score Quiz (10 questions, calculated score), (17) CTA section with animated stats, (18) Footer with 5 columns + bottom bar.
>
> Make everything interactive. Animate counters on scroll using IntersectionObserver. Animate the world map canvas with breach blips. Add the glitch effect to the hero. Make the terminal fully functional with all listed commands. Make the comparison tables sortable by clicking headers. Make the quiz calculate and display a score with personalized tips. All modals should work. The ticker should scroll continuously. The countdown should tick. Tracker counts should increment every few seconds. The CCTV canvas should have a scan line and occasional static burst.
>
> Write clean, semantic HTML. Use vanilla JS only (no frameworks). Use CSS variables throughout. Include detailed comments. Make it fully responsive for mobile.

---

*End of PRIVACYWATCH Build Plan — v1.0*
*Estimated build time with AI assistance: 4–8 hours for complete implementation*
*Sections can be built independently and composed*