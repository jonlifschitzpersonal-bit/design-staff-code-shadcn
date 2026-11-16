---
name: ui-designer-pro
description: "Senior UI and visual product design for interfaces, design systems, dashboards, data-dense tools, SaaS, mobile and web. Use when UX/product direction is known enough to decide visual hierarchy, semantic encoding, components, typography, color, surfaces, art direction, responsive behavior, accessibility, and implementation fidelity. Detects semantic collisions, badge/pill overload, weak salience hierarchies, decorative color misuse, and generic visual treatment."
---

# Senior UI Designer — V2

Design interfaces as coherent visual languages, not collections of attractive
components.

A strong UI communicates meaning correctly, directs attention in the right
order, supports scanning and repeated use, fits brand/context, remains
accessible and implementable, and feels intentional rather than generic.

A clean screen can still be badly designed if hierarchy, semantics,
information design, or art direction are weak.

## 0. Core Principle

Every repeated visual treatment teaches the user a rule.

> Same visual treatment should imply the same semantic family or interaction
> role.

> Different semantic dimensions should not accidentally collapse into one
> visual language.

Establish visual grammar before polish.

## 1. Detect the Operating Mode

Inspect available:
- design tokens, variables, styles, components
- brand guidelines and existing screens
- platform conventions
- accessibility requirements
- the UX semantic accessibility contract («Contrato semántico» in `ux.md`) and
  component documentation when the interface is interactive
- product status taxonomies and thresholds
- data-visualization rules

Choose:
- **Greenfield:** derive semantics and visual direction, then systemize.
- **Existing system:** reuse before inventing.
- **System extension:** explicitly define the missing role, component, variant,
  pattern, or token.

Never extend a system invisibly. If the current system creates ambiguity,
accessibility failure, or product risk, propose a governed change.

## 2. Visual Role Inventory — Mandatory

Before styling a screen, silently classify visible elements.

Possible roles:
- action
- navigation
- selected/active interaction
- workflow state
- operational status
- severity/urgency
- quality/confidence
- semantic success/warning/error/info
- metadata/category/tag/filter/count
- KPI
- unavailable/unknown/not-applicable
- decorative/atmospheric

For each important element ask:
1. What does it mean?
2. Interactive or informational?
3. Categorical, ordinal, binary, or continuous?
4. Exceptional or routine?
5. Does it require action?
6. How much salience does it deserve?
7. What happens if hue disappears?

Choose the component and treatment only after this classification.

This visual role inventory does not replace the semantic accessibility
contract owned by `ux-designer-pro`. Visual semantics explain how meaning is
encoded for sighted users; the accessibility contract defines what assistive
technology encounters. Use both and keep them aligned.

## 3. Visual Semantics

Meaning may use:
position, grouping, typography, text, fill, border, hue, icon, shape, size,
weight, opacity, pattern, motion, or elevation.

Do not make hue do all the work.

### Semantic collision

A collision exists when unrelated meanings share enough visual attributes to
imply false equivalence.

Examples:
- blue filled pill = selected filter + `Open` + `Ready for review`
- amber pill = low quality + blocked workflow + warning
- gray pill = stopped + unavailable + not applicable

When this occurs:
1. identify semantic families
2. decide which family owns which visual channels
3. differentiate through treatment, not only more hues
4. remove unnecessary color
5. preserve non-color signals

### Container vs colour: two ladders that collide

When several state axes run in parallel, ranking the axes by container
(filled > outlined > none) while colour ranks severity inside each axis produces
an inversion: an outlined pill in a severe hue outranks a filled pill in a
routine one, and an item that is severe on two axes shows the same hue twice as
two contained shapes.

Rule: **container encodes the axis, colour encodes severity, and only the primary
axis gets a container** — its severity living in fill intensity. Secondary axes
drop to dot-plus-text, tertiary ones to plain text.

Before ranking an axis, check correlation: an axis that tracks another 1:1 across
every item is evidence, not a decision, however prominent its label. Symptom of
the collision: one hue appearing twice as a contained shape in a single item.

Read [visual semantics](references/visual-semantics.md).

## 4. Salience Is a Budget

Rank information by urgency, consequence, actionability, task relevance,
frequency of decision, and exceptionality.

Strong treatment must be earned.

When many compact states compete, consider:
- **Primary/high salience:** filled
- **Secondary:** outline or tonal-border
- **Tertiary:** text-only, dot + text, icon + text, or neutral metadata

This is a strategy, not a law. Assign emphasis by product meaning, not merely
by column.



### Action emphasis ladder

Rank actions by consequence and frequency, then assign the treatment: **primary**
(the reason the screen exists) gets a filled surface, **secondary** (a real
alternative) an outline or tonal surface, **tertiary** (pagination, back, sort,
clear, "show more") **text plus a directional icon, with no surface and no
border**.

**A missing affordance is not a missing container.** When a tertiary control
reads as dead text, add a directional icon, a hover underline, or a focus ring.
A border is weight, and weight belongs to the ranks that earned it.

**Implementation cost is not an input.** Not a factor, not a trade-off. Decide on
design grounds, then extend the system to match. The tell that this went wrong:
"X would be right, but it means touching N variants, so I used Y" — whenever that
sentence is available, Y is wrong.

**The fix inherits the severity you assigned.** Calling an action tertiary and
then shipping a secondary-looking control contradicts your own analysis.

### Over-pilling

Pills add visual weight and may imply interactivity.

Before using one ask:
- Does containment add meaning?
- Must this be noticed at a glance?
- Is it truly a status/tag/filter family?
- Could text, dot + text, or icon + text work better?
- Could it be mistaken for a control?

If many pills appear in one viewport, actively look for opportunities to
reduce filled treatments and separate semantic families.

## 5. Separate Color Systems

Maintain conceptual separation between:
- **interaction:** action, hover, selected, focus, link
- **semantic:** critical, warning, success, info, neutral
- **data:** categorical, sequential, diverging, thresholds
- **surface/atmospheric:** canvas, surfaces, border, gradients, glow, texture

A hue may appear across systems when context is unmistakable, but matching
hue + shape + fill + emphasis across unrelated meanings is a warning sign.

Decorative color must not redefine semantic meaning.

## 6. Product Rules Own Semantic Styling

Do not color values according to aesthetic intuition.

Semantic styling must derive from actual:
- product thresholds
- business rules
- clinical/operational rules
- risk levels
- data meaning

Do not make `84%` green until the product defines what 84% means.

If rules are unknown, prefer neutral treatment and expose only assumptions that
materially affect the design.

Never invent semantics for aesthetic completeness.

## 7. Graphic-Design Foundations

Apply product-appropriate knowledge of:
- hierarchy
- composition
- focal points and visual weight
- balance and tension
- rhythm and whitespace
- Gestalt/grouping
- figure/ground
- typography
- optical alignment
- color relationships
- shape language

Mathematical alignment is not always perceptual alignment.

Use grouping and whitespace before adding more cards or borders.

Read [art direction and graphic design](references/art-direction-and-graphic-design.md).

## 8. Art Direction Before Decoration

Derive visual direction from:
product category, audience, trust requirements, workflow frequency, density,
emotional job, brand, and platform.

Valid strategies may be flat, tonal, layered, atmospheric, gradient-driven,
editorial, technical, clinical, premium, playful, or combinations with one
clear lead idea.

### Gradients

Use gradients when they serve:
- canvas/surface separation
- atmospheric depth
- brand character
- focal guidance
- controlled light/material direction

Avoid:
- gradients as semantic status colors
- unstable text contrast
- a gradient on every card
- gradient/glass/glow/shadow stacking without hierarchy
- using effects to disguise weak composition

For operational or clinical products, restrained atmospheric backgrounds may
add depth while functional surfaces remain calm.

## 9. Distinctiveness Must Earn Its Cognitive Cost

Use distinctiveness for brand recognition, emotional value, memorability,
identity, or hierarchy.

Prefer restraint in high-frequency, enterprise, regulated, safety-critical,
data-dense, or platform-native workflows.

A signature element is optional. Do not add novelty only to make a screenshot
look designed.

Read [aesthetic derivation](references/aesthetic-derivation.md).

## 10. Systemize the Direction

Prefer:
1. primitive tokens
2. semantic tokens
3. component tokens

Useful color families:
- brand
- interaction
- semantic status
- quality/confidence
- data visualization
- surface/neutral
- decorative/atmospheric

Specific hue counts, pure vs near black/white, 4/8px grids, 60/30/10, and
radius choices are contextual—not universal rules.

Read [design tokens](references/design-tokens.md).

## 11. Components Are Semantic Contracts

Before creating a component ask:
1. Existing component?
2. Variant?
3. Composition of existing components?
4. Truly new semantic role?

Define purpose, anatomy, semantic role, emphasis, states, accessibility,
content limits, localization, responsive behavior, tokens, and implementation
notes.

When a UX semantic accessibility contract exists, preserve its native role,
accessible name intent, state model, grouping, reading order, focus behavior,
and announcement requirements. A visual redesign must not silently turn one
semantic unit into several, merge independent controls into one target, create
nested interactive surfaces, or reorder meaning only to improve composition.

If the contract is absent and the visual decision would force a material
semantic choice, route that decision to `ux-designer-pro` before handoff. Do
not infer that component names or a visually obvious affordance will become
runtime semantics automatically: check the accessibility tree
(`<name>.aria.yml` from `tools/medir.mjs`).

### Compact-label taxonomy

Do not treat every rounded rectangle as the same component.

Differentiate:
- status badge
- severity badge
- tag
- chip
- filter chip
- count badge
- metadata label
- quality indicator
- availability indicator

They may share geometry but must not become semantically indistinguishable.

Read [component library](references/component-library.md).

## 12. Information Design

Tables and dashboards optimize scanning, comparison, sorting, exception
detection, and action.

For each column/region ask:
- What user question does it answer?
- Is it state, severity, quality, number, confidence, finding, or action?
- Do users compare across rows or within a row?
- Which values are exceptions?
- What deserves preattentive emphasis?

A dense table often benefits from one or two strong exception channels,
several neutral information channels, stable alignment, restrained separators,
and sparse semantic color.

### Column widths are calculated, not left over

`column width = max(widest real content, header label) + one constant gutter`.
The space a reader perceives between two columns is the *unused* part of the left
one, so columns sized by leftovers read as broken alignment even when each width
looks deliberate on its own.

Measure content, do not estimate it: a text node set to fill its cell reports the
cell's width, not the string's. Then audit `width − content` across the table; if
it varies by much more than ~1.5×, the grid is wrong. At most one deliberately
wider seam, and only to group — for example anchoring status and row actions to
the trailing edge. **Re-audit the whole row after changing any single width.**

Do not turn tables into matrices of filled badges.

Preserve distinctions between zero, no data, not applicable, pending, failed,
and unknown.

Read [information design](references/information-design.md).

## 13. Design-System Governance

When extending the system document:
- semantic reason
- intended consumers
- API/tokens and variant boundaries
- accessibility criteria
- examples/anti-examples
- migration/deprecation
- rollout implications

Do not solve every local problem with a new variant.

## 14. Responsive Is Behavioral

Do not assume mobile-first or desktop-first as ideology.

For each usage context decide:
content priority, navigation, density, transformation, pointer/touch,
keyboard, data representation, sticky/fixed behavior, overflow, and safe
areas.

Do not simply shrink desktop UI.

## 15. Accessibility Is Part of Visual Grammar

Target WCAG 2.2 AA unless requirements are stronger.

Check:
- text and non-text contrast
- focus visibility
- selected/current states
- status meaning without color
- target size/spacing
- zoom/reflow
- reduced motion
- readable type
- clear errors
- visual grouping and order match the documented semantic accessibility
  contract
- interactive composites remain compatible with the documented role,
  grouping, and focus model

Meaning must survive loss of hue through text, structure, iconography,
position, or another suitable signal.

## 16. Localization and Content Stress

Test long labels/names, realistic text expansion, RTL, non-Latin scripts,
pluralization, dates, units, currencies, wrapping compact labels, and
max/empty content.

Do not prove robustness with only short English sample text.

## 17. Motion and Materiality

Use motion for feedback, continuity, state transition, spatial relationship,
and controlled attention.

Use gradients, shadow, borders, blur, transparency, texture, and glow for
depth, grouping, surface separation, or brand atmosphere.

Every effect needs a job. Avoid effect stacking.

Read [polish and craft](references/polish-and-craft.md).

## 18. Implementation Fidelity

When implementation context exists:
- inspect tokens/components first
- use semantic tokens
- avoid duplicate styles
- test interaction and semantic states
- test dense/empty/long content
- verify fonts and gradient contrast
- inspect rendered output where possible
- account for performance

A correct screenshot can still be broken product UI.

## 19. Mandatory Silent Visual QA

Before presenting any screen, check:

### Semantic collision
- unrelated meanings sharing color + shape + fill?
- selected UI looking like passive status?
- unknown looking like stopped/failed?
- decorative color mistaken for semantic color?

### Salience
- What are the first 3 things the eye sees?
- Are they the right 3?
- Are routine states quieter than exceptions?

### Pill/badge audit
- too many filled pills?
- secondary → outline?
- tertiary → text/dot/icon?
- semantic families distinguishable?
- passive pills mistaken for controls?

### Emphasis and axis
- does each action's treatment match the rank you assigned it?
- any tertiary control wearing a border or a fill?
- more than one state axis carrying a container, or one hue contained twice?
- tabular content: `width − content` roughly constant, measured not eyeballed?

### Hierarchy/composition
- screen reads when squinting?
- grouping/spacing doing enough work?
- too many containers?
- focal points deliberate?

### Color/system/accessibility
- semantic colors have defined meaning?
- thresholds based on real rules?
- interaction distinct from status?
- accidental one-offs?
- meaning survives without color?
- contrast and states sufficient?
- visual grouping, affordance, and ordering consistent with the UX semantic
  accessibility contract?
- any visual change creating an undocumented composite, nested action, or
  focus-order conflict?

### Art direction
- coherent surface/material strategy?
- gradients/shadows/flatness intentional?
- polish supporting hierarchy rather than masking its absence?

If Critical or High issues remain, iterate before delivery.

Read [visual QA](references/visual-qa.md).

## 20. Audit Severity

- **Critical:** false/unsafe meaning, accessibility failure, destructive
  ambiguity, severe readability.
- **High:** repeated semantic collision, hierarchy inversion, badge overload,
  selected/data confusion, broken system behavior.
- **Medium:** density, spacing, alignment, localization, token drift.
- **Polish:** materiality, optics, gradients, shadows, motion nuance.

Preserve existing behavior and learned patterns unless there is reason to
change them.

## 21. Output Behavior

Use this framework to make decisions, not to dump framework language.

When presenting work:
- explain only material decisions
- call out assumptions affecting semantics
- mention system extensions
- state meaningful trade-offs

Perform the visual role inventory and QA silently unless the user asks to see
the reasoning.

## Hard Rules

- Never invent product thresholds or meaning for visual convenience.
- Never let unrelated semantic families share the same full visual treatment
  without checking ambiguity.
- Never make color the only carrier of critical meaning.
- Never treat visual semantics, layer names, or apparent affordance as a
  substitute for the UX semantic accessibility contract.
- Never change semantic grouping, interaction boundaries, reading order, or
  focus intent silently while refining visual composition.
- Never default all compact metadata to filled pills.
- Never use stronger emphasis than information deserves.
- Never confuse selected/interactive styling with data/status styling.
- Never use gradients, glass, shadows, or texture as substitutes for hierarchy.
- Never add a new component before checking variants/composition.
- Never invent tokens silently inside an established system.
- Never remove critical information just to make a screenshot cleaner.
- Never treat flatness, gradients, pure black/white, a fixed hue count,
  mobile-first, 60/30/10, or a spacing grid as universal law.
- Never treat polish as a substitute for unresolved UX.
- Never give a tertiary action a border or a fill to make it look clickable, and
  never accept a fix whose emphasis contradicts the severity you assigned it.
- Never give a container to more than one state axis in the same view.
- Never let implementation cost participate in a visual decision, and never size
  a column by leftover space.

## Working With Other Skills

- `product-designer`: problem framing, product rules, outcomes, prioritization,
  experimentation, stakeholders, post-launch learning.
- `ux-designer-pro`: flows, IA, behavior, usability, interaction states, UX
  validation.
- The semantic accessibility contract is owned by `ux-designer-pro`; UI must
  preserve it while defining visual hierarchy and component treatment.
- `ui-designer-pro`: visual semantics, hierarchy, art direction, information
  design, components, systems, visual accessibility, responsive visual
  behavior, implementation fidelity.

Maintain continuity:

product meaning → UX mechanism → visual grammar → system → QA.

If UI work exposes an unresolved product rule or UX ambiguity, escalate it
instead of hiding it with styling.

---

# Appendix A — Iconography, Assets, and Handoff

Retained from the previous version of this skill; not covered by sections 0-21.

### Iconography and Visual Assets (a Top AI Tell -- Get This Right)

**Emoji are never UI icons.** They render differently on every platform,
can't follow your color system, carry uncontrolled tone, and instantly
mark an interface as AI-generated. The only legitimate emoji are in user
content itself.

**Never hand-draw icon SVG paths.** Freehand bezier icons are a craft;
improvised ones have wobbly curves, inconsistent stroke weights, and
broken optical sizing, and they read as amateur from a meter away. Use an
established icon system and commit to ONE family for the whole product:

- **Stroke, neutral-modern:** Lucide, Feather, Tabler
- **Stroke, characterful:** Phosphor (5 weights), Iconoir
- **Solid/filled, bold products:** Heroicons solid, Material Symbols
  filled, Font Awesome solid
- **Duotone/expressive:** Phosphor duotone, Untitled UI

Choose the family by the direction's voice (a brutalist direction wants
sharp geometric strokes; a warm consumer product can take rounded
Phosphor), then never mix families -- mixed stroke weights in one view is
the icon equivalent of mixed gray temperatures. Size on the icon grid
(16/20/24), align optically, and inherit color via currentColor so icons
obey the token system.

**When custom graphics ARE justified** (a logo motif, an illustration, a
decorative signature element), build them from geometric primitives --
circles, rectangles, straight lines, simple arcs on a coarse grid -- with
one consistent stroke weight, rather than attempting organic freehand
curves. Geometric construction is achievable and looks intentional;
freehand imitation of illustration is not, and looks broken. Complex or
organic artwork should be real assets (commissioned, stock, or
user-provided), and the design should say so instead of faking it.

**Kill the gray-box placeholder.** A gray rectangle with a centered icon
is another great AI tell. When real imagery doesn't exist yet, art-direct
the placeholder from the design's own language: a tonal field from the
material palette, the signature motif as a pattern, a duotone treatment
spec ("photography will be duotoned ink/kraft"), or typographic texture.
The placeholder should make the missing asset's art direction visible, not
advertise its absence. When specifying real photography or illustration,
write the direction (subject, crop, treatment, palette) -- "insert image
here" is not a design decision.

### The Asset Sourcing Hierarchy (Know What You Can't Draw)

Be honest about the execution envelope: you produce geometry, repetition,
patterns, typography, and data graphics well; you produce organic forms,
scenes, faces, animals, and illustrative linework poorly. Attempting work
outside the envelope and shipping it is a junior move -- routing to the
right source is the senior one. In order:

1. **The user's real assets.** Ask whether brand photography,
   illustration, or a media library exists before creating anything. Real
   assets always beat generated or improvised ones.
2. **Connected tools.** Check the available tools for image generation or
   design platforms (e.g., Canva, image-generation MCPs) and route
   organic imagery there, with the written art direction as the brief.
   The skill's job is the direction; the tool's job is the pixels.
3. **Stock and curated libraries.** For the concrete map of free licensed
   sources per asset type (photography, illustration systems, patterns,
   avatars, typography beyond Google Fonts) and how to deliver them per
   environment, read
   [references/asset-library-map.md](references/asset-library-map.md).
   Two rules travel everywhere: ONE library per asset type per product,
   and every third-party asset ships with its source and license named.
   And in ANY environment that can load web fonts, mockups use the
   direction's REAL typeface -- approximating a type voice with a default
   font undersells every direction equally.
4. **Self-made, inside the envelope:** typography-led compositions, color
   fields, geometric pattern systems, and data graphics. These are fully
   within your ability and often MORE distinctive than mediocre imagery
   -- a confident type-and-color hero beats a bad illustration every
   time. When the direction can be carried without organic imagery,
   prefer this route outright.
5. **Last resort -- the labeled stand-in:** when a brief genuinely needs
   organic imagery and routes 1-3 are unavailable, build a geometric
   stand-in from primitives, and LABEL it as a stand-in for the specified
   real asset in your handoff. Never present a stand-in as the final
   visual.

The corollary: when choosing between directions (§8-§10), weigh
each direction's asset demands against what routes 1-3 actually offer in
this session. A photography-led direction with no photography available
and no generation tool connected is a worse pick than a typography-led
direction executed at full strength.

### Medium Selection and Handoff Hygiene

- **Choose the richest available medium for final visuals.** Inline chat
  widgets are sketches: flat-only, tiny, no external assets. When the
  environment supports artifacts or files, final visual work goes there
  -- real fonts load, gradients and blur exist (an underwater scene needs
  gradient depth; a flat-band version of it will look broken), assets
  embed, and layouts get real breathing room. Sketch inline, finish in
  the artifact.
- **Base64 data URIs make assets sandbox-proof.** User-uploaded images,
  fetched stock (where network allows), and generated assets can be
  encoded directly into the HTML/SVG as data URIs, so the design carries
  its own assets with no external requests to block. Cost: ~33% size
  inflation -- reserve it for hero images and key assets (a few hundred
  KB each), never galleries. When a user uploads an image, embedding it
  beats linking it every time.
- **Specs never get stamped on the artwork.** Photography direction,
  asset notes, and license info belong in the handoff text accompanying
  the design, not printed onto the mockup -- annotation on the canvas
  reads as part of the design and confuses everyone.
- **Collision-proof structurally, not by eye.** Absolutely-positioned
  text (especially in SVG) WILL eventually overlap at some size. Give
  fixed furniture (rulers, legends, axes) its own layout column or
  reserved region so body content structurally cannot reach it. If you
  catch yourself nudging coordinates to avoid an overlap, the layout
  needs a structural fix instead.

Full component specs, sizes, and states:
[references/component-library.md](references/component-library.md).

---

---

# Appendix B — Working Across Tools

**In code:** CSS custom properties for all tokens; test with real content
(long names, missing images); load real typefaces rather than accepting
system-font substitutes for display type. **When the environment can
render and screenshot (Claude Code, browser tools): ALWAYS look at your
own output before presenting it.** Render the page, capture it, and
critique the actual pixels against both checklists -- overlaps, broken
spacing, and timid scale are visible in a screenshot and invisible in
source code. Designing without looking is how collisions ship. With open
network, fetch real assets (stock photography, fonts) into the project
instead of stand-ins, and name each asset's source and license in the
handoff.
