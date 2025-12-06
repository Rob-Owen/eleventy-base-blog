# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Eleventy v2 static site generator blog, customized as a personal website for Rob Owen (robowen.io). The site includes a blog, apps showcase pages, and standard pages (about, 404, etc.).

## Build & Development Commands

```bash
# Development server with live reload (includes draft posts)
npm start

# Production build
npm run build

# Build for GitHub Pages deployment
npm run build-ghpages

# Debug mode (shows all Eleventy internals)
npm run debug
npm run debugstart  # with dev server

# Performance benchmarking
npm run benchmark
```

## Architecture

### Directory Structure

- **`content/`** - All source content (input directory)
  - `blog/` - Blog posts organized by year
  - `apps/` - App showcase pages (orbit, stylus, octoscope, homeui, octopump, astro)
  - `about/` - About page
  - `feed/` - RSS/JSON feed templates
  - `sitemap/` - Sitemap generation
- **`_includes/`** - Nunjucks templates and components
  - `layouts/` - Page layouts (base, home, post, app, app_detail)
  - `postslist.njk` - Reusable component for displaying post lists
  - `apptitle.njk` - App title component
- **`_data/`** - Global data files
  - `metadata.js` - Site metadata (title, URL, author info)
- **`public/`** - Static assets copied to output via passthrough
- **`_site/`** - Generated output directory (gitignored)

### Configuration Files

- **`eleventy.config.js`** - Main Eleventy configuration
  - Template formats: md, njk, html, liquid
  - Markdown uses Nunjucks preprocessing
  - Custom filters for dates, tags, app page lookups
  - Custom shortcode: `{% image %}` for optimized images
- **`eleventy.config.drafts.js`** - Draft post handling
  - Posts with `draft: true` in frontmatter only included in dev mode
  - Uses `BUILD_DRAFTS` environment variable
- **`eleventy.config.images.js`** - Image optimization plugin
  - Two shortcodes: `{% image %}` and `{% fullResImage %}`
  - Generates avif, webp, and fallback formats
  - Supports co-located images with blog posts
  - Special `SITE:` prefix for site-relative URLs

### Template Engine & Content

- **Nunjucks** is the primary template engine for both markdown and HTML preprocessing
- **Frontmatter** uses YAML
- **Collections** are defined via tags (e.g., `posts` tag)
- **Navigation** uses the `eleventyNavigation` key via the Navigation plugin

### Custom Filters

Key filters defined in `eleventy.config.js`:
- `readableDate` - Format dates using Luxon
- `htmlDateString` - ISO date strings for HTML
- `prefixAppStoreMeta` - Formats App Store metadata
- `pressPage`, `privacyPage`, `faqsPage` - Find specific app sub-pages

### Plugins

Official plugins used:
- `@11ty/eleventy-plugin-rss` - RSS/JSON feeds
- `@11ty/eleventy-plugin-syntaxhighlight` - Code syntax highlighting (Prism with okaidia theme)
- `@11ty/eleventy-plugin-navigation` - Navigation menus
- `@11ty/eleventy-plugin-bundle` - Per-page CSS bundles
- `EleventyHtmlBasePlugin` - URL path prefix handling

### Image Handling

Images are optimized using `@11ty/eleventy-img`:
- Watch target: `content/**/*.{svg,webp,png,jpeg}`
- Output: `_site/img/`
- Default widths: 400, 800, 1600px
- Formats: avif, webp, auto
- Lazy loading enabled by default

## Deployment

- **Primary deployment**: Netlify (configured in `netlify.toml`)
- Build command: `npm run build`
- Output directory: `_site`
- Lighthouse plugin enabled with strict thresholds (1.0 for all categories)
- Performance targets: 0 CLS, 0ms TBT

## Content Notes

- Site owner: Rob Owen (hello@robowen.io)
- Site URL: https://robowen.io/
- Apps featured: Orbit, Stylus, Octoscope, HomeUI, Octopump, Astro
- Each app has subdirectory with pages like privacy.md, press.md, contact.md, faqs.md
