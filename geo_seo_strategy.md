# GEO + SEO Strategy for robowen.io — A Practical, Opinionated 2026 Playbook for an Indie iOS Dev Portfolio

## TL;DR
- **Ship the boring fundamentals first** (sitemap, robots.txt with explicit AI-bot rules, JSON-LD `MobileApplication` + `Person` + `BreadcrumbList` on every page, Core Web Vitals green, per-app landing pages with `apple-itunes-app` smart banner + `/.well-known/apple-app-site-association`). These are 80% of the outcome and the only things every AI engine and Google currently respect.
- **For AI visibility (GEO), the lever that moves the needle is third-party consensus, not on-site magic** — Reddit (≈46.7% of Perplexity top-10 citations per Profound's August 2024–June 2025 dataset of 30 million citations: *"Reddit's Universal Appeal: Reddit emerges as the leading source for both Google AI Overviews (2.2%) and Perplexity (6.6%)"* in overall volume, with 46.7% of Perplexity's *top-10* share), Wikipedia (≈47.9% of ChatGPT top-10 per the same Profound study: *"Within ChatGPT's top 10 most-cited sources, Wikipedia accounts for nearly half (47.9%) of citations among these leading sources"*), YouTube, Hacker News, MacStories, The Sweet Setup, iOS Dev Weekly, and Indie Dev Monday. `llms.txt` is worth shipping (half a day) but is **not** a citation lever in 2026; Google's Gary Illyes and John Mueller explicitly said Google does not use it, and SE Ranking's 300k-domain study found no measurable citation uplift.
- **Write opinionated, answer-first listicles and comparisons** ("Best heat-pump-tariff control apps for UK Octopus Cosy customers, 2026", "Best astronomy planner for iPhone vs. iPad", "Stylus vs. Things vs. Reminders for ADHD-friendly daily tasks") with named statistics, dates, and "Last updated" timestamps. AI engines have a documented recency bias: per LLMrefs data, citations drop sharply past 3 months without an update, and Averi's analysis finds content updated within the past 12 months earns 3.2× more Perplexity citations.

---

## Key Findings

1. **Eleventy is well-suited to this work.** Official `@11ty/eleventy-img`, `@11ty/eleventy-plugin-rss`, `@11ty/eleventy-navigation` and the third-party `eleventy-plugin-llms`, `@quasibit/eleventy-plugin-sitemap`, `eleventy-plugin-metagen`, `eleventy-plugin-og-image`, and `eleventy-plugin-gen-favicons` cover everything you need without a framework rewrite.
2. **Schema.org `MobileApplication` is the correct subtype for iOS App Store apps** (not the generic `SoftwareApplication`). Per SchemaValidator.org's 2026 guide: *"MobileApplication is a subtype of SoftwareApplication specifically for apps distributed through mobile app stores. Use MobileApplication for iOS App Store and Google Play apps — it signals to Google that this is a native mobile app download."* Triple-stack `MobileApplication` + `BreadcrumbList` + `FAQPage` on each app landing page. According to GenOptima's data this stack yields ~1.8× more AI citations than `Article` alone.
3. **robots.txt is the file that actually controls AI access in 2026.** Allow `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `ChatGPT-User`, `Claude-User`, `Perplexity-User`, `Googlebot`, `Bingbot`, and `Applebot`; make a conscious decision about training crawlers (`GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`, `Applebot-Extended`). For an indie dev who wants App Store downloads, **allow everything** — the visibility upside dominates the training-data downside.
4. **`llms.txt` adoption reality check.** Limy's analysis of 515M LLM bot events found only 408 hits to `/llms.txt` over 90 days — negligible. Major answer engines do not retrieve it in production. Ship it anyway because (a) it's a half-day of work, (b) IDE agents and MCP integrations do use it, and (c) it forces you to write a clean inventory. Treat it as B2A (business-to-agent) infrastructure, not as SEO.
5. **Google's INP threshold (200 ms) is now the hardest Core Web Vital to pass.** Per BKND Development's Core Web Vitals INP Optimization Guide citing Chrome User Experience Report (CrUX) field data: *"Roughly 43% of sites still don't meet the 200ms 'good' threshold"*, making it the most commonly failed Core Web Vital in 2026. Eleventy ships zero JS by default, so you start with an enormous advantage. Don't waste it by adding heavy analytics or carousel scripts.
6. **Apple Smart App Banner with `pt`/`ct` campaign tokens still works in 2026** but the syntax is undocumented in Apple's current docs; you have to use the `affiliate-data=pt=…&ct=…` form. Add a per-app `apple-itunes-app` meta tag with a real `app-argument` Universal Link.
7. **The single highest-leverage AI-citation tactic for indie iOS apps is being mentioned by category-authoritative third parties**: MacStories, The Sweet Setup, 9to5Mac, iOS Dev Weekly, Indie Dev Monday, and topic-specific Reddit threads. Without this, on-site optimization plateaus.
8. **Bing Webmaster Tools' AI Performance / Copilot citation report is live in public preview** (announced 10 Feb 2026 — see Microsoft's `blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview`, posted by PMs Krishna Madhavan, Meenaz Merchant, Fabrice Canel, and Saral Nigam). This is the only first-party, free way to see how often Copilot cites your pages. Sign up immediately.

---

## Details

### 1. Architecture: How to lay out robowen.io in Eleventy

A clean structure that supports per-app landing pages, blog content, and clean URL hygiene:

```
src/
  _data/
    site.json                  # name, author, baseUrl, social, etc.
    apps.js                    # array of app metadata used everywhere
  _includes/
    layouts/
      base.njk                 # head, meta, OG, JSON-LD partials
      app.njk                  # MobileApplication schema + smart banner
      post.njk                 # Article schema + FAQPage if present
    partials/
      schema-person.njk        # Robert Owen identity graph
      schema-organization.njk
      schema-app.njk
      schema-faq.njk
      schema-breadcrumb.njk
      meta-og.njk
      meta-twitter.njk
      smart-banner.njk
  apps/
    octoscope/index.md
    octopump/index.md
    homeui/index.md
    stylus/index.md
  blog/
    octopump-cosy-octopus-explained.md
    best-astronomy-apps-iphone-2026.md
    …
  about.md
  uses.md
  index.md
  llms.njk                     # generates /llms.txt
  sitemap.njk                  # generates /sitemap.xml
  robots.njk                   # generates /robots.txt
  feed.njk                     # generates /feed.xml (Atom)
  well-known/
    apple-app-site-association # served at /.well-known/AASA (no .json extension)
public/
  og/                          # pre-rendered Open Graph images
```

Permalink rules: `apps/octopump/`, `blog/octopump-cosy-octopus-explained/`, with trailing slashes. Use `<link rel="canonical">` from the absolute URL of `page.url`.

### 2. Structured data (JSON-LD) — what to ship and what to skip

**Use JSON-LD only.** Microdata and RDFa are noise. Google, Anthropic, OpenAI, and AI parsers all prefer JSON-LD per the W3C JSON-LD best practices (`w3c.github.io/json-ld-bp/`) and SchemaValidator.org's 2026 guidance.

**The minimum viable graph for every page:** a single `<script type="application/ld+json">` containing an `@graph` array with:

1. `Person` (you, Robert Owen) — referenced by `@id` everywhere
2. `Organization` — your "studio" identity (even if you're a one-person shop, this anchors `sameAs` links)
3. `WebSite` with `potentialAction` `SearchAction` (only if you add site search)
4. Page-specific entity: `WebPage`, `Article`, `MobileApplication`, or `FAQPage`
5. `BreadcrumbList`

#### Person + Organization (site-wide, in `base.njk`)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://robowen.io/#person",
      "name": "Robert Owen",
      "url": "https://robowen.io/",
      "image": "https://robowen.io/img/robert-owen.jpg",
      "jobTitle": "Independent iOS Developer",
      "knowsAbout": ["iOS development", "SwiftUI", "GraphQL", "Astronomy", "Heat pumps", "Octopus Energy Cosy tariff"],
      "sameAs": [
        "https://github.com/robowen",
        "https://mastodon.social/@robowen",
        "https://bsky.app/profile/robowen.io",
        "https://www.linkedin.com/in/robowen/"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://robowen.io/#organization",
      "name": "Robowen",
      "url": "https://robowen.io/",
      "logo": "https://robowen.io/img/logo-512.png",
      "founder": { "@id": "https://robowen.io/#person" }
    }
  ]
}
</script>
```

The `sameAs` array is the **identity graph**. Every Mastodon/Bluesky/GitHub/LinkedIn handle you add is one more correlation point AI engines use to confirm "Robert Owen the indie iOS dev" is one entity. This is one of the highest-ROI moves for AI engines because they need disambiguation signals to confidently cite you.

#### MobileApplication per app page (in `app.njk`)

For Octoscope (astronomy):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "@id": "https://robowen.io/apps/octoscope/#app",
  "name": "Octoscope",
  "applicationCategory": "ReferenceApplication",
  "applicationSubCategory": "Astronomy",
  "operatingSystem": "iOS 17.0",
  "url": "https://robowen.io/apps/octoscope/",
  "downloadUrl": "https://apps.apple.com/app/idXXXXXXXXX",
  "installUrl": "https://apps.apple.com/app/idXXXXXXXXX",
  "image": "https://robowen.io/og/octoscope.png",
  "screenshot": [
    "https://robowen.io/img/octoscope/shot-1.png",
    "https://robowen.io/img/octoscope/shot-2.png"
  ],
  "description": "Octoscope is an astronomy toolkit for iPhone and iPad that plans stargazing sessions, tracks satellite passes, and previews deep-sky targets with live light-pollution and weather data.",
  "featureList": [
    "ISS and satellite pass predictions",
    "Deep-sky object planner",
    "Light-pollution overlay",
    "Astrophotography exposure calculator"
  ],
  "softwareVersion": "2.1.0",
  "datePublished": "2024-09-12",
  "releaseNotes": "https://robowen.io/apps/octoscope/changelog/",
  "author": { "@id": "https://robowen.io/#person" },
  "publisher": { "@id": "https://robowen.io/#organization" },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "category": "Freemium"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
}
</script>
```

**Critical rules** (from Google's structured data guidelines, reiterated by SchemaValidator.org):

- `aggregateRating` must match what is visually on the page. Do not invent ratings.
- For freemium pricing, either use `price: "0"` or an array of `Offer` objects, one per tier.
- Use `MobileApplication` (subtype of `SoftwareApplication`) for App Store apps — it explicitly signals "native mobile app download" to Google.
- Validate every page with the Google Rich Results Test and `validator.schema.org` before merging.

#### Article + FAQPage for blog posts

For an evergreen post like `best-astronomy-apps-iphone-2026.md`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Best Astronomy Apps for iPhone in 2026",
  "datePublished": "2026-02-14",
  "dateModified": "2026-05-09",
  "author": { "@id": "https://robowen.io/#person" },
  "publisher": { "@id": "https://robowen.io/#organization" },
  "image": "https://robowen.io/og/best-astronomy-apps-2026.png",
  "mainEntityOfPage": "https://robowen.io/blog/best-astronomy-apps-iphone-2026/"
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best free astronomy app for iPhone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For a free, modern iPhone astronomy planner with light-pollution overlays and ISS pass prediction, Octoscope is built specifically around session planning rather than ad-driven sky-pointing…"
      }
    }
  ]
}
</script>
```

The "triple stack" `Article + FAQPage + BreadcrumbList` pattern is the one GenOptima identifies as yielding ~1.8× more AI citations than `Article` alone.

#### Eleventy implementation — JSON-LD partials

Put your schemas in `_includes/partials/schema-*.njk` and include them with data passed in from front matter:

```liquid
{# _includes/partials/schema-app.njk #}
<script type="application/ld+json">
{{ {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": app.name,
  "applicationCategory": app.category,
  "operatingSystem": app.minIOS,
  "url": site.baseUrl + page.url,
  "downloadUrl": app.appStoreUrl,
  "image": site.baseUrl + app.ogImage,
  "description": app.description,
  "softwareVersion": app.version,
  "datePublished": app.datePublished,
  "author": { "@id": site.baseUrl + "/#person" },
  "publisher": { "@id": site.baseUrl + "/#organization" },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
} | dump | safe }}
</script>
```

Then in each app's `index.md`:

```yaml
---
layout: layouts/app.njk
app:
  name: Octoscope
  appStoreId: 6502345678
  appStoreUrl: https://apps.apple.com/app/id6502345678
  category: ReferenceApplication
  minIOS: "iOS 17.0"
  version: "2.1.0"
  datePublished: 2024-09-12
  description: "Astronomy toolkit for iPhone and iPad…"
  ogImage: /og/octoscope.png
  universalLinkPath: /apps/octoscope/launch
  smartBannerArgument: https://robowen.io/apps/octoscope/launch
permalink: /apps/octoscope/
---
```

### 3. Traditional SEO foundations on Eleventy

**Sitemap.** Use `@quasibit/eleventy-plugin-sitemap` or hand-roll one with a `sitemap.njk` template iterating `collections.all`. Exclude pages with `eleventyExcludeFromCollections: true` and any page with front-matter `sitemap: false`.

**robots.txt.** Generate it from a template (don't ship a static one — you want the sitemap URL injected from `_data/site.json`). Recommended starter for robowen.io (allow everything, including training, because the goal is downloads, not IP protection):

```
# robots.txt for robowen.io
User-agent: *
Allow: /

# Explicit allow for AI retrieval bots (so they don't fall through to default rules)
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: GPTBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: Bingbot
Allow: /
User-agent: cohere-ai
Allow: /
User-agent: YouBot
Allow: /

# Discourage the worst actors
User-agent: Bytespider
Disallow: /

Sitemap: https://robowen.io/sitemap.xml
```

Per OpenAI's official docs, blocking `OAI-SearchBot` removes you from ChatGPT search answers entirely — exactly the opposite of what you want. The 27% of B2B sites accidentally blocking AI crawlers at the CDN layer (per ziptie.dev research cited by Mersel) is a real risk; double-check Cloudflare's "Block AI bots" toggle is off.

**Per-page meta.** Use `eleventy-plugin-metagen` or a hand-rolled `_includes/partials/meta-og.njk` that pulls from front matter:

```liquid
<title>{{ title }} — {{ site.name }}</title>
<meta name="description" content="{{ description }}">
<link rel="canonical" href="{{ site.baseUrl }}{{ page.url }}">

<meta property="og:title" content="{{ title }}">
<meta property="og:description" content="{{ description }}">
<meta property="og:url" content="{{ site.baseUrl }}{{ page.url }}">
<meta property="og:image" content="{{ site.baseUrl }}{{ ogImage or '/og/default.png' }}">
<meta property="og:type" content="{{ ogType or 'website' }}">
<meta property="og:site_name" content="{{ site.name }}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@robowen">
<meta name="twitter:creator" content="@robowen">
```

**Open Graph images.** Pre-render with `eleventy-plugin-og-image` (no headless browser required) at build time. Target 1200×630, AVIF + PNG. Per-app and per-post.

**Images and Core Web Vitals.** `@11ty/eleventy-img` with AVIF + WebP + JPEG fallback, `fetchpriority="high"` on the LCP image, explicit `width`/`height` to prevent CLS, `loading="lazy"` only on below-the-fold images. Eleventy's default zero-JS posture gets you most of the way to a green INP score.

```js
// .eleventy.js
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp", "jpeg"],
    widths: [320, 640, 1024, 1920, "auto"],
    htmlOptions: {
      imgAttributes: { loading: "lazy", decoding: "async" },
      pictureAttributes: {}
    }
  });
}
```

Set `fetchpriority="high"` and remove `loading="lazy"` on hero images:

```html
<img src="/img/octoscope/hero.avif" alt="Octoscope app screenshot showing star map with light-pollution overlay" width="1200" height="800" fetchpriority="high" decoding="async">
```

**Targets (per web.dev field thresholds at 75th percentile):**

- LCP ≤ 2.5 s
- INP ≤ 200 ms
- CLS ≤ 0.1
- TTFB < 600 ms

A static Eleventy site on Cloudflare Pages or Netlify will hit these defaults if you avoid heavyweight JS.

**Semantic HTML.** One `<h1>` per page; `<article>`, `<section>`, `<nav>`, `<main>`, `<aside>`. AI engines and crawlers extract content by heading hierarchy — break content into specific H2s that each answer one question.

**Internal linking.** Use `@11ty/eleventy-navigation` with `BreadcrumbList` JSON-LD. From every app page, link to:

- The blog post that explains the relevant domain ("What is the Octopus Cosy tariff?" from OctoPump)
- The other apps under "More by Robert Owen"
- A `/uses` page (classic indie-dev SEO move — accumulates external links from devs documenting their stacks)

### 4. App Store SEO connections (ASO support from the website)

**Smart App Banner (`apple-itunes-app` meta tag).** Per-app, with Apple Search Ads campaign attribution tokens. The working 2026 syntax (validated via Apple Developer Forums threads — not in Apple's current official "Promoting Apps with Smart App Banners" doc, which omits the syntax):

```html
<meta name="apple-itunes-app"
      content="app-id=6502345678,
               app-argument=https://robowen.io/apps/octoscope/launch?ref=banner,
               affiliate-data=pt=123456&ct=site-banner-octoscope">
```

- `app-id` — App Store ID (digits only)
- `app-argument` — a Universal Link that your app handles in `NSUserActivity` / `onOpenURL` (SwiftUI) so the banner deep-links into a relevant screen when the app is installed
- `pt` — provider token from App Store Connect → Analytics → Sources → Generate Campaign Link
- `ct` — campaign token (any string you choose; appears in App Analytics' Campaigns report)

Apple's App Analytics dashboard aggregates installs from `ct=site-banner-octoscope` so you can attribute App Store opens to the website. Note Apple aggregates only when ≥5 first-time downloads come through that campaign in 24 hours, and only opted-in users contribute data.

**Universal Links — Apple App Site Association (AASA).** Serve `/.well-known/apple-app-site-association` as raw JSON (no `.json` extension, served over HTTPS with no redirects, `Content-Type: application/json`):

```json
{
  "applinks": {
    "details": [
      {
        "appIDs": ["TEAMID.io.robowen.Octoscope"],
        "components": [
          { "/": "/apps/octoscope/launch*", "comment": "Open Octoscope" },
          { "/": "/apps/octoscope/share/*", "comment": "Share targets" }
        ]
      },
      {
        "appIDs": ["TEAMID.io.robowen.OctoPump"],
        "components": [
          { "/": "/apps/octopump/launch*" },
          { "/": "/apps/octopump/cosy-import/*" }
        ]
      }
    ]
  }
}
```

In Eleventy, place the file at `src/well-known/apple-app-site-association` with front matter:

```yaml
---
permalink: /.well-known/apple-app-site-association
eleventyExcludeFromCollections: true
---
```

Then add a Cloudflare Pages / Netlify header rule to force `Content-Type: application/json`:

```toml
# netlify.toml
[[headers]]
  for = "/.well-known/apple-app-site-association"
  [headers.values]
    Content-Type = "application/json"
```

Validate with `https://app-site-association.cdn-apple.com/a/v1/robowen.io` after publishing — Apple's CDN caches the file; if you see a 404 or `SWCERR00301 Timeout`, your server config is wrong.

**Per-app landing page anatomy.** Every app page should answer five questions above the fold:

1. What does this app do, in one sentence?
2. Who is it for? (e.g., "for UK households on the Octopus Cosy tariff")
3. Show a screenshot or a 6-second autoplay-muted video
4. App Store badge with `apple-itunes-app` campaign attribution
5. One-line credibility signal (ratings, "as seen in", or download count if impressive)

Then a clearly-headed FAQ section with `FAQPage` schema, then a "How it works" section, then a "Behind the scenes" link to a dev blog post. This pattern is exactly what AI engines extract — front-load the answer (the Princeton GEO paper, presented at KDD 2024, found that "front-loaded value" and "answer-first" content yielded the largest citation gains).

### 5. GEO (Generative Engine Optimization) — what actually moves the needle in 2026

The state of play, per Profound's analysis of 30 million citations across ChatGPT, Google AI Overviews, and Perplexity from August 2024 to June 2025 (`tryprofound.com/blog/ai-platform-citation-patterns`) and the Otterly 1M-citation report:

- **ChatGPT** weighs Wikipedia (~47.9% of its top-10 cited sources, per Profound: *"Within ChatGPT's top 10 most-cited sources, Wikipedia accounts for nearly half (47.9%) of citations among these leading sources"*) and editorial authority. Its citations track Bing organic results closely — per Seer Interactive's February 6, 2025 analysis by Christina Blake and Alisa Scharf of 500+ SearchGPT citations: *"87%+ of SearchGPT's citations matched Bing's top organic results when the same exact question was used as a query, with most of those results appearing in the top 10 positions."*
- **Perplexity** weighs Reddit (~46.7% of top-10 citations) and YouTube (~13.9%), with strong freshness bias.
- **Google AI Overviews / AI Mode** weighs existing organic rankings — ~97% of cited sources come from the top 20 organic results, per AI Labs Audit's analysis.
- **Claude** is most precision/citation-oriented; technical and well-structured content tends to win.

**Concrete GEO tactics ranked by impact for an indie iOS dev:**

#### A. Get cited by third parties first; on-site optimization second

The single biggest move is to be mentioned by category-authoritative outlets. For robowen.io:

- **Octoscope** → MacStories (Federico Viticci, John Voorhees), The Sweet Setup, AppAdvice, Sky & Telescope blog roundups, r/astrophotography, r/iOSProgramming.
- **OctoPump** → Octopus Energy community forum, r/OctopusEnergy, r/HeatPumpsUK, Energy Stats UK (Mick Wall — his Cosy tariff guide at `energy-stats.uk/octopus-cosy/` is the canonical UK source), MoneySavingExpert forums, HomeAssistant community forums.
- **HomeUI** → r/HomeKit, r/homeassistant, r/HomeAutomation, MacStories, Beautiful Pixels, Smart Home Sounds blog.
- **Stylus** → MacStories, The Sweet Setup, r/iOSProgramming, r/ADHD, r/productivity, r/getdisciplined, "best minimal task manager" listicles.

Per AI Labs Audit and AlmCorp research, Reddit threads, podcast transcripts (Indie Dev Monday at `indiedevmonday.com`, Under the Radar at `relay.fm/radar`, Sub Club Podcast at `subclub.com`), and MacStories-style editorial mentions are the "consensus signals" AI engines look for before citing a brand.

#### B. Write listicle and comparison content that AI engines preferentially surface

AI engines preferentially extract listicles, "Best X for Y" pages, and comparison tables (per the GenOptima March 2026 playbook and Search Engine Land's "AI citations favor listicles" piece). Priority posts to write (one every 2-3 weeks):

1. "Best astronomy apps for iPhone 2026" — listicle that includes Octoscope #1 but **also covers Sky Guide, Stellarium, Night Sky, Sky Tonight honestly**. AI engines reward comparative integrity; one-sided listicles get downweighted.
2. "How to run an Octopus Cosy heat-pump tariff: a 2026 setup guide" — utility post that drives organic traffic and ends with "OctoPump automates this for you".
3. "Stylus vs. Things 3 vs. Reminders for ADHD: choosing a minimal daily task app"
4. "HomeUI vs. native HomeKit Home app: when to switch"
5. "Octopus Energy Cosy tariff explained: cheap hours, peak penalties, and how to schedule a heat pump"
6. "Octoscope dev diary #N: building a star catalog in SwiftData" (technical depth — wins Hacker News, Claude citations)

**Each post must include:**

- A 2-3 sentence BLUF answer in the first 100 words (Princeton GEO paper finding)
- Named statistics with sources ("Octopus Energy says Cosy customers saved an average of £219 in the year to March 2026")
- A clear "Last updated" timestamp visible in HTML and in `dateModified` schema
- An H2 for every distinct sub-question, with a 40-60 word answer block immediately under the H2 (this is the "answer capsule" pattern Averi documents in 72.4% of ChatGPT-cited pages)
- An FAQ section at the bottom with `FAQPage` schema
- A comparison table when relevant (markdown tables render fine, and `<table>` is one of the structures Perplexity preferentially extracts)

#### C. Content patterns that earn citations (specifics)

From the Princeton 2023 GEO paper (presented at KDD 2024, the 30th ACM SIGKDD Conference) the highest-performing tactics were:

- **Cite sources** (link to authoritative third parties: web.dev, Apple Developer docs, Schema.org, Octopus Energy's own pages)
- **Add statistics** (specific percentages, dates, currency amounts)
- **Add quotations** (expert quotes; even quoting yourself with attribution helps)

Tactics that hurt: keyword stuffing, generic marketing prose, walls of unstructured text.

#### D. The recency requirement

LLMrefs documents AI citations dropping sharply after 3 months without update; Perplexity favors content updated within 12 months at ~3.2× the citation rate. Set a quarterly recurring task: open your top 10 posts, update one statistic, refresh `dateModified`, and add a "What changed in [season]" note at the top.

### 6. `llms.txt` for robowen.io — ship it, don't believe the hype

**State of adoption in May 2026:** ~10% of websites have one (SE Ranking 300k-domain study). Anthropic, Stripe, Cloudflare, Vercel, Mintlify, Cursor, Zapier, Hugging Face all publish one. Major AI search and answer crawlers (OpenAI, Google, Anthropic) do **not** fetch it in meaningful volume — Limy measured 408 hits across 515M LLM bot events. Google's Gary Illyes confirmed at Search Central Live July 2025 that Google does not use `llms.txt` and isn't planning to; John Mueller compared it to the discredited keywords meta tag.

**Why ship it anyway:**

- It's a half-day of work.
- IDE agents (Cursor, Claude Code, Copilot, Windsurf), MCP servers, and in-app AI assistants do fetch it. If a developer asks their IDE "show me an example astronomy app website", your `llms.txt` might be the surface that gets returned.
- The writing exercise forces a clean inventory of what you'd want AI to cite.
- The day a major answer engine flips the switch, you're already there.

**Format (per llmstxt.org, Jeremy Howard's September 2024 spec):**

- Single `# H1` (the project/site name)
- A `> blockquote` one-paragraph summary
- `## H2` sections with bulleted link lists; each link as `- [Title](URL): one-line description`
- Optional `## Optional` section for less critical resources

**`llms.txt` for robowen.io:**

```markdown
# Robowen

> Robowen is the indie iOS development studio of Robert Owen.
> It builds Octoscope (astronomy planning), OctoPump (Octopus Energy
> Cosy heat-pump tariff controller for the UK), HomeUI (HomeKit/Matter
> dashboard), and Stylus (mindful daily task manager).

## Apps

- [Octoscope](https://robowen.io/apps/octoscope/index.md): Astronomy toolkit for iPhone and iPad — stargazing planner, satellite passes, light-pollution overlay.
- [OctoPump](https://robowen.io/apps/octopump/index.md): Heat-pump controller for UK households on the Octopus Energy Cosy tariff; schedules heating around the three daily Cosy off-peak windows.
- [HomeUI](https://robowen.io/apps/homeui/index.md): A faster, more configurable iOS dashboard for HomeKit and Matter accessories.
- [Stylus](https://robowen.io/apps/stylus/index.md): Mindful daily task manager built around one focused list per day.

## Guides

- [Octopus Cosy tariff explained](https://robowen.io/blog/octopus-cosy-tariff-explained.md): How the three Cosy Hours work, the peak penalty, and how to schedule a heat pump around them.
- [Best astronomy apps for iPhone 2026](https://robowen.io/blog/best-astronomy-apps-iphone-2026.md): Honest comparison of Octoscope, Sky Guide, Stellarium, Night Sky, and Sky Tonight.
- [Stylus vs. Things 3 vs. Reminders](https://robowen.io/blog/stylus-vs-things-reminders.md): Picking a minimal daily task manager.

## About

- [About Robert Owen](https://robowen.io/about.md): Background, building philosophy, contact.
- [Uses](https://robowen.io/uses.md): The hardware, software, and services I use to ship.

## Optional

- [RSS feed](https://robowen.io/feed.xml)
- [Sitemap](https://robowen.io/sitemap.xml)
```

**Implementation in Eleventy** (the Ariel Salminen pattern documented at `arielsalminen.com/2025/generating-llms.txt-using-eleventy/`):

```liquid
{# src/llms.njk #}
---
permalink: llms.txt
eleventyExcludeFromCollections: true
---
# Robowen

> {{ site.tagline }}

## Apps
{% for app in apps %}
- [{{ app.name }}]({{ site.baseUrl }}{{ app.url }}index.md): {{ app.shortDescription }}
{% endfor %}

## Guides
{% for post in collections.guides | reverse %}
- [{{ post.data.title }}]({{ site.baseUrl }}{{ post.url }}index.md): {{ post.data.description }}
{% endfor %}
```

Then generate a `.md` mirror of each page (so the URLs in `llms.txt` actually return Markdown):

```liquid
{# src/markdown-mirror.njk #}
---
pagination:
  data: collections.indexable
  size: 1
  alias: doc
permalink: "{{ doc.url }}index.md"
eleventyExcludeFromCollections: true
---
# {{ doc.data.title }}

{{ doc.rawInput | safe }}
```

Add Netlify/Cloudflare headers to serve `.md` and `.txt` as `text/markdown` and `text/plain` with UTF-8.

**`llms-full.txt`** (the Mintlify/Anthropic pattern): a single concatenated Markdown file containing the body of every important page. Useful for IDE agents that paste a single URL into a chat. The `eleventy-plugin-llms` npm package generates both `llms.txt` and `llms-full.txt` automatically from your Markdown sources.

**Do not** treat `llms.txt` as access control. It is guidance, not enforcement. Restrict via auth or `robots.txt`, never via `llms.txt`.

### 7. Eleventy-specific implementation tips

**Official plugins to use:**

- `@11ty/eleventy-img` — responsive image transform, AVIF/WebP, build-time
- `@11ty/eleventy-plugin-rss` (v3, ESM, requires Eleventy v3+) — Atom feed
- `@11ty/eleventy-navigation` — hierarchical nav with breadcrumb support
- `@11ty/eleventy-plugin-syntaxhighlight` — Prism, server-side, no client JS

**Community plugins to consider:**

- `@quasibit/eleventy-plugin-sitemap` — sitemap.xml
- `@quasibit/eleventy-plugin-schema` — JSON-LD shortcode (or roll your own partials — usually cleaner)
- `eleventy-plugin-metagen` — Open Graph, Twitter Card, canonical
- `eleventy-plugin-og-image` (KiwiKilian) — build-time OG image generation without headless browser
- `eleventy-plugin-gen-favicons` (njaldwin) — single SVG → full favicon set + webmanifest
- `eleventy-plugin-llms` or `eleventy-plugin-llms-txt` — llms.txt + llms-full.txt

**Patterns:**

- Store per-app metadata in `_data/apps.js` and iterate it everywhere (home page grid, sitemap, llms.txt, RSS).
- Use Eleventy's computed data for `canonical`, `ogImage`, and `dateModified` from file mtime.
- Render JSON-LD via Nunjucks `dump | safe` to avoid hand-escaping quotes.
- Use `pagination` to generate a `.md` mirror of every indexable page for `llms.txt` link targets.
- Keep CSS inlined into `<head>` for any page where it's <14KB after gzip (critical CSS pattern). Use `@11ty/eleventy-plugin-bundle` to manage this cleanly.

### 8. Technical fundamentals you should not skip

**RSS/Atom feed.** Still worth shipping. Mastodon, Bluesky aggregators, NetNewsWire, Feedbin, Inoreader, and notably some AI training pipelines pull from RSS. Use `@11ty/eleventy-plugin-rss` with a `feed.njk` template; Atom format is preferred (it's what the plugin defaults to and what most readers handle best).

**Favicons + webmanifest.** `eleventy-plugin-gen-favicons` produces the modern 2022-best-practice set (six icons + webmanifest) from one SVG. Set `apple-touch-icon` (180×180), `icon` (32×32, 192×192, 512×512), and `manifest`.

**PWA / `manifest.json`.** Low priority for a portfolio site — you're driving users to native apps, not a web app. Ship a minimal `manifest.json` so the site is installable as a PWA on Android (and Apple bookmarks behave better), but don't bother with a service worker unless you want offline.

**`apple-mobile-web-app-capable` and friends.** Add the standard set:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Robowen">
<link rel="manifest" href="/site.webmanifest">
```

**AI bot access (robots.txt).** Already covered above. Verdict for an indie iOS dev whose goal is App Store downloads: **allow everything**, including training crawlers. The visibility upside dominates IP concerns for portfolio content you're publishing anyway. Block only `Bytespider` (documented robots.txt non-compliance).

### 9. Measurement — how to know if any of this is working

Tracking AI visibility is genuinely difficult; GA4 routes most AI referrals to "Direct" and Google AI Mode strips referrer headers entirely (per SparkToro January 2026 research, only ~12-18% of Perplexity citations produce click-through). Use a three-tier framework:

#### Tier 1: First-party tools (free, official)

- **Google Search Console** — verify the site, submit `sitemap.xml`. Watch the "Search Appearance" report for any AI Overview impressions.
- **Bing Webmaster Tools** — verify, submit sitemap, and **enable the AI Performance / Copilot report** (public preview since 10 Feb 2026, per `blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview`). This is the only first-party way to see Copilot citations (count, grounding queries — i.e. the fan-out queries Copilot generated internally — and page-level citation activity). No API yet, CSV export only.
- **Apple App Store Connect Analytics → Sources / Campaigns** — your `ct=site-banner-octoscope` campaign attributions show up here. Aggregates require ≥5 first-time downloads in 24h and only opted-in users.

#### Tier 2: Server logs and CDN analytics

The only way to see *which* AI bots are actually crawling. Pattern-match user agents in your Cloudflare / Netlify / fly.io logs:

```
GPTBot|OAI-SearchBot|ChatGPT-User|
ClaudeBot|Claude-User|Claude-SearchBot|
PerplexityBot|Perplexity-User|
Google-Extended|GoogleOther|
Applebot|Applebot-Extended|
Bingbot|CCBot|cohere-ai
```

Watching `ChatGPT-User` and `Perplexity-User` hits is especially valuable — every hit is a real person whose AI tool fetched your page to answer their question, **right now**. These hits correlate with citations even when no referral traffic results.

#### Tier 3: GA4 custom channel

In GA4 → Admin → Channel Groups, create a custom group "AI Traffic" with a regex on session source:

```
chatgpt\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|you\.com|kagi\.com
```

This won't catch AI Mode (no referrer) but covers ChatGPT browse, Perplexity, Claude, Gemini, Copilot, Kagi.

#### Tier 4: Manual prompt sweeps (the only reliable citation tracker)

Once a month, run a fixed list of 20-30 prompts across ChatGPT, Perplexity, Claude, and Google AI Mode, recording whether you're cited, mentioned, or invisible. Examples:

- "Best astronomy app for iPhone"
- "How do I control my heat pump on Octopus Cosy?"
- "Indie iOS task manager for ADHD"
- "Who is Robert Owen iOS developer?"
- "OctoPump app review"

Record results in a spreadsheet. Re-run monthly. The freeCodeCamp methodology (chudi.dev, "Measure your AI citation rate") is a solid template; or use a paid tool (Profound, Otterly, ALLMO, AI Labs Audit, Superlines) if it pays off.

**Metrics to track:**

- **Citation rate** — % of prompts where your URL is linked
- **Mention rate** — % where your brand/app is named (with or without link)
- **Share of voice** — your mentions vs. named competitors per prompt
- **AI referral traffic** — sessions from chatgpt.com, perplexity.ai, claude.ai
- **AI bot crawl frequency** — `ChatGPT-User`, `PerplexityBot` hits/day
- **App Store campaign installs** — `ct=site-banner-*` attribution

### 10. Backlinks and authority signals — the indie iOS playbook

Per SE Ranking's December 2025 study of 2.3 million pages across 295,485 domains (`seranking.com/blog/how-to-optimize-for-ai-mode/`): *"Domain Traffic's SHAP value (statistical influence) reaches 0.63—the highest of all metrics. Sites with over 1.16 million monthly visitors earn an average of 6.4 citations per query, compared to just 2.4 for sites with fewer than 2,700 visitors."* Small indie sites cannot earn AI citations purely on-site; **third-party authority is structural**. Targets, ranked by leverage:

**Tier 1: high durability, high AI-citation weight**

- **Hacker News "Show HN"** — Stable permalinks, included in every major LLM training set, high DR. Examples that show up in AI training data: `news.ycombinator.com/item?id=43215101` ("1,400 in 90 Days – Lessons from My First Indie iOS App"), `item?id=45253079` (Ghosty call screening indie). Single highest-durability channel for technical/prosumer apps. Submit each app's launch and significant updates.
- **Reddit threads in the right subreddits** — r/iOSProgramming, r/swift, r/apple, r/OctopusEnergy, r/HeatPumpsUK, r/astrophotography, r/HomeKit, r/HomeAutomation, r/ADHD, r/productivity. Reddit is ~46.7% of Perplexity top-10 citations. Authentic participation (answering other people's questions for months before posting your own) is the only approach that works; brigading gets banned.
- **MacStories** — Pitch Federico Viticci and John Voorhees with a clear, one-paragraph reason your app is interesting, plus screenshots. MacStories' annual "iOS X: The MacStories Review" pages are some of the highest-authority indie-app citation surfaces on the web; their `/linked/` short-post archive is heavily crawled.
- **The Sweet Setup** (Shawn Blanc) — explicitly "Wirecutter for apps", articles structured as "Best Markdown writing app for iPhone" style listicles AI engines extract verbatim.
- **iOS Dev Weekly** (Dave Verwer, `iosdevweekly.com`) — ~46,000 readers, around 750 issues in. Per Verwer, "almost 20,000 links back to the community over 750 issues" — IDW is one of the single largest sources of dofollow backlinks to iOS indie blogs. Dev-focused but powerful for entity recognition.
- **Indie Dev Monday** (Josh Holtz, `indiedevmonday.com`) — weekly indie-dev interview newsletter. Issue pages create durable, citable bio pages per developer (e.g., Issue #2 features Christian Selig).

**Tier 2: useful, less concentrated**

- **9to5Mac, AppAdvice, iMore, Beautiful Pixels** — pitch app launches with embargo dates and assets.
- **Sub Club Podcast** (RevenueCat) — long-form indie-dev interviews; episodes get backlinks (e.g., Christian Selig episode at `subclub.com/episode/...`).
- **Under the Radar podcast** (Marco Arment + Underscore David Smith, `relay.fm/radar`) — high-quality indie audience.
- **Product Hunt** — single launch event with backlink, increasingly dominated by VC-backed launches. Still worth doing, but don't expect Robinhood-style outcomes; modern indie launches average 50-150 signups.
- **dev.to, Lobste.rs** — useful for tutorial-style posts; build dev-author authority.
- **GitHub** — open-source a non-core component of one of your apps (a SwiftUI widget, a heat-pump tariff calculator library). README pages rank well and AI engines train on GitHub heavily.

**Tier 3: niche / category-specific**

- For **OctoPump**: Energy Stats UK (`energy-stats.uk/octopus-cosy/` — Mick Wall's site is the canonical UK Cosy reference and is openly described as a hobby site with no Octopus affiliation, so a link from him is editorial gold), MoneySavingExpert forums, the Octopus Energy community Discourse, Home Assistant community forums, OpenEnergyMonitor forums.
- For **Octoscope**: Sky & Telescope, Cloudy Nights, r/astrophotography, r/telescopes, r/Astronomy.
- For **HomeUI**: r/HomeKit, r/Matter, Smart Home Sounds, HomeKit News.
- For **Stylus**: r/productivity, r/ADHD, "Best minimalist task apps" listicle authors.

**Tier 4: social platforms (high signal, low SEO durability)**

- **Mastodon `iosdev.space`** — relationship-building with indie iOS devs and curators (`@indieappcatalog@iosdev.space` lists 2,000+ apps). Most instances `noindex`; low durable SEO, high community value.
- **Bluesky** — Federico Viticci and many Apple journalists are active there in 2026 (his handle is `viticci.macstories.net` — Bluesky's handle-as-domain feature lets you set your handle to `robowen.io`, which compounds your domain identity). Public posts are indexable; Anthropic and OpenAI confirmed scraping public Bluesky.
- **X / Twitter** — degraded but still where some indie-dev launches happen; lower priority than Mastodon and Bluesky now.

**Practical sequencing**: for each app, build a "launch loop" — write a strong landing page, post a "Show HN", post in the right two or three subreddits, pitch MacStories / The Sweet Setup with the post link, and submit to iOS Dev Weekly and Indie Dev Monday. Then repeat every 6-9 months with a major update.

---

## Recommendations — staged implementation

**Phase 1 (this week — fundamentals that take ~2 days):**

1. Write `_data/site.json` and `_data/apps.js` with metadata for all four apps.
2. Build the `base.njk` layout with: meta tags (OG + Twitter), canonical, `Person` + `Organization` JSON-LD graph site-wide, sitewide nav.
3. Build `app.njk` with `MobileApplication` JSON-LD, `apple-itunes-app` smart banner meta tag (with `pt=`/`ct=` campaign tokens), `BreadcrumbList` schema.
4. Write 4 app landing pages (Octoscope, OctoPump, HomeUI, Stylus) with the 5-question-above-fold pattern.
5. Generate `sitemap.xml`, `robots.txt`, `feed.xml`, `llms.txt` via templates.
6. Ship `/.well-known/apple-app-site-association` with all four bundle IDs.
7. Submit site to Google Search Console and Bing Webmaster Tools; enable Bing's AI Performance report.

**Phase 2 (next 2-4 weeks — content + authority):**

8. Write 3 launch-loop posts:
   - "Best astronomy apps for iPhone 2026" (Octoscope leveraged honestly)
   - "Octopus Cosy tariff: a 2026 guide for heat-pump owners" (OctoPump leveraged)
   - "How I built a minimal task manager for ADHD brains" (Stylus dev-diary)
9. Add `FAQPage` schema to each app landing page (3-5 Q&As that match real user phrasing).
10. Submit "Show HN" for one app, post in 2-3 relevant subreddits, pitch MacStories and The Sweet Setup, submit to iOS Dev Weekly and Indie Dev Monday.

**Phase 3 (ongoing, monthly cadence):**

11. Run the 20-prompt AI-visibility sweep monthly across ChatGPT, Perplexity, Claude, Google AI Mode.
12. Update one post per quarter with refreshed statistics and `dateModified`.
13. Write one new listicle/comparison/dev-diary post every 2-3 weeks.
14. Watch Bing's AI Performance report, server logs for `ChatGPT-User` / `PerplexityBot` hits, and Apple App Store Connect's Sources/Campaigns dashboard.

**Benchmarks that should change your strategy:**

- If after 90 days **no `ChatGPT-User` or `PerplexityBot` hits** appear in server logs, your `robots.txt` is likely accidentally blocking them at the CDN. Audit Cloudflare's "Block AI bots" toggle and the Cloudflare WAF.
- If you have **third-party mentions but zero AI citations**, your on-site structure is the problem — front-load answer capsules, add FAQ schema, fix `dateModified`.
- If you have **good citations but no App Store install attribution**, the smart-banner `pt`/`ct` syntax is failing silently — test with curl, verify the format, wait for the 5-install/24h aggregation threshold.
- If **Core Web Vitals INP > 200 ms**, you've added too much client-side JS — remove analytics, defer non-critical scripts, audit any embed.

---

## Caveats

- **No major answer engine has confirmed using `llms.txt` for ranking or citation** as of May 2026. Treat it as cheap optionality, not a citation lever.
- **AI-visibility statistics in this report come partly from vendor blogs** (Profound, GenOptima, Superlines, Discovered Labs, Limy, Mersel, AlmCorp, Otterly, AI Labs Audit) with commercial interests; directionally consistent but treat exact percentages with caution. The Princeton GEO paper (KDD 2024) and SE Ranking's 2.3M-page December 2025 study are the most rigorous foundations; everything else is industry data.
- **The Smart Banner `pt=`/`ct=` syntax is not documented in Apple's current official "Promoting Apps with Smart App Banners" page** — the form `affiliate-data=pt=…&ct=…` exists only in Apple Developer Forum threads and older Apple documentation. Many implementations silently fail; expect to debug.
- **AI Overviews and AI Mode strip referrer headers** entirely — Google AI Mode visits will appear as `(direct) / (none)` in GA4 with no way to attribute. Server logs and manual prompt sweeps are the workarounds.
- **The "Cosy Octopus" tariff is a moving target** — Octopus has changed it multiple times (e.g., the 22:00-00:00 third off-peak window added in July 2024). OctoPump content must be updated whenever Octopus restructures Cosy, or it will be downweighted on freshness.
- **Apple's `MobileApplication` schema does not yet produce a guaranteed rich result in Google SERPs** — Google may surface star ratings or pricing inconsistently. Validate continuously with the Rich Results Test and don't treat schema as a rich-result guarantee.
- **Reddit's status as an AI citation source is partly the result of paid licensing deals** — Bloomberg reported in February 2024 (confirmed by CNET on February 22, 2024 and the Columbia Journalism Review) that Reddit's Google deal is *"worth about $60 million on an annualized basis"*. These terms may shift; build presence broadly across communities, not on Reddit alone.
- **Hyper-niche queries like "best heat pump app UK"** have no documented indie iOS case study confirming AI-citation lift. The playbook here is inferred from general GEO literature; expect to iterate based on actual measurement results from your monthly prompt sweep.