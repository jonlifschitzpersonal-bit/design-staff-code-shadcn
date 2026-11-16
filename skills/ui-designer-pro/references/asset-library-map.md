# The Asset Library Map

Where to source assets you should not draw yourself. Referenced from the
Iconography and Asset Sourcing appendix of SKILL.md.

Free, licensed sources for when the user has no assets. Always check the
current license of the specific asset -- some require attribution, terms
change. One library per asset type per product; mixing systems is how
visual consistency dies.

| Asset type | Libraries | Craft rule |
|---|---|---|
| Photography | Unsplash, Pexels, Pixabay | One treatment across all photos (duotone in brand hues, uniform crop) so mixed sources read as one voice |
| Illustration | unDraw (recolorable), Storyset, Open Peeps, Humaaans, DrawKit | Commit to ONE system per product, recolor to tokens; never mix styles |
| Icons | Lucide, Tabler, Phosphor, Heroicons, Iconoir | One family, one weight (see SKILL.md §11 and the Iconography appendix) |
| Patterns / backgrounds | Hero Patterns, Haikei exports | Derive colors from the palette; patterns are texture, not decoration |
| Avatars | DiceBear (seedable, many styles), Boring Avatars | Pick one style; seed by user ID for stability |
| Typography | Google Fonts, Fontshare (General Sans, Clash, Satoshi, etc.) | Load the REAL typeface in every mockup -- never approximate a direction's voice with a default font |

Delivery paths by environment:
- **In code:** npm/CDN for icons and fonts; direct URLs for stock
  photography; SVG downloads for illustration and patterns.
- **In chat mockups:** load real typefaces from font CDNs; where external
  images are blocked, show the chosen photograph alongside the mockup as
  an art-direction reference and build the mockup's image area as a
  treatment-true tonal composition.

License hygiene: state the source and license of every third-party asset
in the handoff. "Found it online" is not a license.
