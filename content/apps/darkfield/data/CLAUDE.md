# Equipment Catalog Data

This directory holds the **server-hosted equipment reference catalogs** that AstroKit downloads at runtime. It is published as static content on the AstroKit website. Within the app repo it is reachable via the `server/` symlink (`server → ../website/content/apps/darkfield/data`), so the same JSON is the single source of truth for both the website and the app.

## What this data is for

Each file is a versioned catalog of real, commercially available amateur astronomy gear. The app uses these to let users **pick a real model from a list** when adding equipment — autocomplete with correct optical specs pre-filled — instead of typing everything by hand.

Because the catalogs are fetched and cached from the server, equipment can be added or corrected **without shipping an app update**. Updating the JSON here (and publishing the website) is enough.

## Files

| File | Catalog | Per-item fields |
|------|---------|-----------------|
| `telescopes/v1.json` | Telescopes | `id`, `name`, `manufacturer`, `type`, `aperture`, `focalLength` |
| `eyepieces/v1.json` | Eyepieces | `id`, `name`, `manufacturer`, `focalLength`, `apparentFOV`, `eyeRelief`, `barrelSize`, `isZoom` |
| `binoculars/v1.json` | Binoculars | `id`, `name`, `manufacturer`, `aperture`, `magnification`, `fieldOfView` |
| `mounts/v1.json` | Mounts | `id`, `name`, `manufacturer`, `type`, `payloadCapacity`, `hasTracking`, `hasGoTo` |
| `barlows/v1.json` | Barlows / Powermates | `id`, `name`, `manufacturer`, `factor`, `barrelSize` |
| `objects/` | Deep-sky / observable targets | — |

Every file is a versioned envelope:

```json
{
  "version": 1,
  "generatedAt": "2025-12-07T00:00:00Z",
  "telescopes": [ /* items */ ]
}
```

## Data quality requirements

- The catalogs must be **accurate and complete** — covering common amateur gear from **all major manufacturers** (Tele Vue, Sky-Watcher, Celestron, Nikon, etc.), not just a handful.
- These catalogs require **periodic updates** to add newly released equipment and correct any errors. Treat them as living reference data.
- When sourcing specs, **prefer the manufacturer's own website or official data sheet**. Avoid retailer listings or secondhand specs, which are frequently wrong.
- Keep `id` values stable and unique; the app may reference them. When adding items, bump `generatedAt` to the current date.

## Schema stability — do not break the app

**Never change the JSON schema (field names, types, or the envelope structure) unless explicitly asked to do so.** The app parses these files with a fixed decoder; any schema change can break catalog loading for shipped versions of the app. Adding new *items* to an existing catalog is always safe. Changing the *shape* of the data is not.

If a schema change is genuinely needed, it should be introduced as a new versioned file (e.g. `v2.json`) rather than mutating `v1.json` in place.

## Enum fields are strict — a single bad value breaks the WHOLE catalog

The app decodes these files with `Codable`. The enum-typed fields throw `DecodingError`
on any unrecognised value, with **no per-item fallback** — one invalid entry stops the
entire catalog from loading for every user. New entries must use exactly these values:

- **telescope `type`**: `refractor`, `newtonian`, `dobsonian`, `schmidtCassegrain`,
  `maksutovCassegrain`, `ritcheyChretien`, `other` (RASA / flat-field astrographs → `other`).
- **mount `type`**: `altAzManual`, `altAzGoTo`, `equatorialManual`, `equatorialGoTo`,
  `dobsonian`, `tabletop`, `other`.
- **eyepiece & barlow `barrelSize`**: only `"1.25\""` or `"2\""`. Do NOT add `0.965"` or
  `3"` items — they will fail to decode on shipped app versions.

Other rules: zoom eyepieces use `minFocalLength`/`maxFocalLength` and omit `focalLength`
(`isZoom: true`); non-zoom eyepieces have `focalLength`. Keep `manufacturer` spelling
consistent across all files (it feeds search tokenisation). `generatedAt` must be ISO-8601.

Note: there is no app-side consumer for an `objects/` (deep-sky) catalog here — the app
loads DSOs from bundled JSON via `DSOCatalogAdapter`. Don't recreate `server/objects/`.
