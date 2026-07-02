# Darkfield — Constellation Figure Data

Constellation stick-figure topology used by the [Darkfield](https://robowen.io/apps/darkfield)
astronomy app, published here to satisfy the **ShareAlike** obligation of the source licenses.

## Files

| File | Sky culture | Constellations | Lines |
|------|-------------|----------------|-------|
| `modern-western.json` | Stellarium "modern" (Western) | 88 | 694 |
| `sky-and-telescope.json` | Stellarium "modern_st" (Sky & Telescope) | 88 | 751 |

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

- `modern-western.json` — adapted from the Stellarium "modern" sky culture
  (© the Stellarium team, CC BY-SA 4.0).
- `sky-and-telescope.json` — adapted from the Stellarium "modern_st" (Sky & Telescope)
  sky culture (© Paul Krizak, Jonathan E. Piskor, and Georg Zotti, CC BY-SA 2.0),
  relicensed to CC BY-SA 4.0 as permitted for adaptations.
- Both — star identifiers cross-mapped via the [HYG Database](https://github.com/astronexus/HYG-Database)
  (© David Nash, CC BY-SA 4.0).

**Modifications:** HIP endpoints were remapped to HR numbers via HYG, validated against the
Yale Bright Star Catalogue (5th Revised Ed., Hoffleit & Warren, 1991), and degenerate
segments dropped.
