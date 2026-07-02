---
title: Constellation Figure Data
description: Constellation stick-figure line data used by the Darkfield astronomy app, published for license compliance.
eleventyExcludeFromCollections: true
---

Constellation stick-figure topology used by the [Darkfield](/apps/darkfield/)
astronomy app, published here to satisfy the **ShareAlike** obligation of the source
licenses.

## Downloads

<ul class="download-list">
	<li>
		<a href="/apps/darkfield/data/constellation-figures/modern-western.json" download>
			<strong>modern-western.json</strong>
		</a>
		<span>Stellarium “modern” (Western) — 88 constellations, 694 lines · CC&nbsp;BY-SA&nbsp;4.0</span>
	</li>
	<li>
		<a href="/apps/darkfield/data/constellation-figures/sky-and-telescope.json" download>
			<strong>sky-and-telescope.json</strong>
		</a>
		<span>Stellarium “modern_st” (Sky &amp; Telescope) — 88 constellations, 751 lines · CC&nbsp;BY-SA&nbsp;4.0</span>
	</li>
</ul>

## Format

```json
{
  "name": "…",
  "skyCulture": "modernWestern",
  "license": "CC BY-SA 4.0",
  "starIdentifierScheme": "HR — Harvard Revised / Yale Bright Star Catalogue number",
  "lineFormat": "[star1HR, star2HR]",
  "constellations": [
    { "id": "Aql", "name": "Aquila", "lines": [[7602, 7557], [7557, 7525]] }
  ]
}
```

Each line joins two stars by their **HR (Yale Bright Star Catalogue) number**.

## License

Both files are licensed under **[Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/)**.

**Attribution / provenance**

- `modern-western.json` — adapted from the Stellarium “modern” sky culture
  (© the Stellarium team, CC BY-SA 4.0).
- `sky-and-telescope.json` — adapted from the Stellarium “modern_st” (Sky & Telescope)
  sky culture (© Paul Krizak, Jonathan E. Piskor, and Georg Zotti, CC BY-SA 2.0),
  relicensed to CC BY-SA 4.0 as permitted for adaptations.
- Both — star identifiers cross-mapped via the [HYG Database](https://github.com/astronexus/HYG-Database)
  (© David Nash, CC BY-SA 4.0).

**Modifications:** HIP endpoints were remapped to HR numbers via HYG, validated against the
Yale Bright Star Catalogue (5th Revised Ed., Hoffleit & Warren, 1991), and degenerate
segments dropped.
