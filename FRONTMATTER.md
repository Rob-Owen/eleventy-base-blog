# Frontmatter Reference

Quick reference for what frontmatter each page type should set.

---

## Blog post — `content/blog/YEAR/slug.md`

Layout is applied automatically by `content/blog/blog.11tydata.js`.

| Field | Required | Notes |
|---|---|---|
| `title` | ✅ | Page `<title>`, Article `headline`, breadcrumb label |
| `description` | ✅ | Meta description, OG/Twitter description |
| `date` | ✅ | ISO date (`2026-05-19`). Sets `datePublished` in Article schema |
| `tags` | ✅ | Include `posts` to appear in the blog feed and RSS |
| `ogImage` | — | Relative or absolute path to image; omit if none exists yet |
| `appleAppId` | — | Shows an App Store smart banner on the post (useful for launch posts) |
| `draft` | — | `true` hides the post from production builds |

**Minimal example:**
```yaml
---
title: How I built OctoPump
description: A walkthrough of the Cosy tariff scheduling logic in OctoPump.
date: 2026-05-19
tags:
  - posts
---
```

---

## App landing page — `content/apps/{slug}/{slug}.md`

Set `layout` explicitly — it is not inherited from the directory data file (which sets `app_subpage.njk`).

| Field | Required | Notes |
|---|---|---|
| `layout` | ✅ | `"layouts/app_showcase.njk"` |
| `title` | ✅ | App name. Used in MobileApplication `name`, nav, breadcrumb |
| `description` | ✅ | One-line tagline. Used in MobileApplication `description` and meta tags |
| `appleAppId` | ✅ | Numeric App Store ID. Enables the App Store badge, smart banner, and MobileApplication schema |
| `appCategory` | ✅ | Schema.org `applicationCategory`. See valid values below |
| `appOS` | ✅ | MobileApplication `operatingSystem` (e.g. `"iOS 17.0"`) |
| `accent` | ✅ | Hex colour string. Sets the `--accent` CSS custom property for the page |
| `heroImage` | — | Path relative to the `.md` file (e.g. `./stylus-demo.png`) |
| `heroAlt` | — | Alt text for the hero image |
| `ogImage` | — | OG/Twitter image path; omit until you have one |
| `tags` | — | Typically `[Apps, iOS]`, `[Apps, visionOS]`, or `[Apps, iOS, UK]` |
| `eleventyNavigation` | — | See nav structure below |
| `draft` | — | `true` hides the page from production builds |

**`appCategory` values in use:**

| App | Value |
|---|---|
| Stylus, Octoscope, OctoPump | `"UtilitiesApplication"` |
| HomeUI | `"HomeAndGardenApplication"` |
| Darkfield | `"ReferenceApplication"` |

**`eleventyNavigation` structure:**
```yaml
eleventyNavigation:
  parent: Apps   # groups under the Apps nav item
  key: Stylus    # unique identifier
  title: Daily Prioritisation & ToDos  # label shown in nav
```

**Minimal example:**
```yaml
---
layout: "layouts/app_showcase.njk"
title: OctoPump
description: Heat pump controls for the Octopus Cosy tariff.
appleAppId: 6743010923
appCategory: "UtilitiesApplication"
appOS: "iOS 17.0"
accent: "#F5B400"
tags:
  - Apps
  - iOS
  - UK
eleventyNavigation:
  parent: Apps
  key: OctoPump
  title: Cosy Heat Pump
---
```

---

## App subpage — `content/apps/{slug}/privacy.md`, `press.md`, `faqs.md`, `contact.md`

Layout (`app_subpage.njk`) is inherited from `content/apps/apps.11tydata.js`. The accent colour is also inherited automatically from the parent app page via the `getAppAccent` filter.

| Field | Required | Notes |
|---|---|---|
| `title` | ✅ | Page heading |
| `description` | — | Meta description; omit if not meaningful for this subpage |

The eyebrow label (e.g. "Stylus") and the secondary nav (FAQs / Press / Privacy links) are generated automatically from the directory structure — no frontmatter needed.

**Minimal example:**
```yaml
---
title: Privacy Policy
---
```

---

## General page — `content/about/index.md`, etc.

| Field | Required | Notes |
|---|---|---|
| `layout` | ✅ | `layouts/home.njk` (thin wrapper over `base.njk`) or `layouts/base.njk` directly |
| `title` | ✅ | Page `<title>` and heading |
| `description` | — | Meta description |
| `ogImage` | — | OG/Twitter image |
| `eleventyNavigation` | — | Top-level nav entry; use `order` to control position |

**`eleventyNavigation` for top-level pages:**
```yaml
eleventyNavigation:
  key: About
  order: 3   # controls position in the nav
```

---

## Fields that live in `_data/metadata.js` (not frontmatter)

These are site-wide and should be changed there, not per-page:

- `title` — site name ("Rob Owen")
- `url` — canonical base URL (`https://robowen.io/`)
- `author.name` — used in Person JSON-LD (`"Rob Owen"`)
- `author.email`
- `language`
- `description` — site-level fallback description
