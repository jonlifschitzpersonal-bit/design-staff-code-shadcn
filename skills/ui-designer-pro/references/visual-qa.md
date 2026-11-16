# Visual QA and Design Linting

Use this as the final pass before presenting a UI.

## 1. Squint Test

Blur or mentally squint at the screen.

Identify the first 3 visual anchors.

Ask:
- Are they actually the most important things?
- Is the eye being pulled to decoration?
- Are repeated pills overpowering content?
- Is the primary action competing with critical data?

## 2. Grayscale Test

Imagine or render the interface without hue.

Check:
- Does hierarchy still work?
- Are selected and status states still distinguishable?
- Is critical meaning still available in text / icon / structure?
- Does grouping survive?

If the answer is no, color is carrying too much.

## 3. Semantic Collision Audit

Create a quick map:

| Treatment | Meanings |
|---|---|
| blue filled pill | ? |
| amber fill | ? |
| gray pill | ? |
| red accent | ? |

Any treatment with unrelated meanings is a candidate for redesign.

Prioritize collisions that occur:
- in the same viewport
- with the same geometry
- with similar emphasis
- in safety-critical contexts

## 4. Pill Density Audit

Count compact containers.

Ask:
- how many are filled?
- how many are merely metadata?
- how many are interactive?
- how many belong to different semantic families?
- could some become outline?
- could some become text-only?
- could some become dot + text?
- are routine values visually louder than the content they describe?

## 5. Salience Distribution

Classify visible elements:
- strong
- medium
- quiet

A healthy screen has deliberate distribution.

Warning signs:
- most components are strong
- every card has a colored icon tile
- every state is a saturated badge
- multiple primary buttons
- background effects compete with data

## 6. Surface Audit

Check:
- canvas vs surface distinction
- card overuse
- unnecessary shadows
- inconsistent borders
- gradient purpose
- glass/blur purpose
- nested surfaces with unclear hierarchy

Ask:
"If the shadow/gradient/glow were removed, would the structure still make
sense?"

## 7. Typography Audit

Check:
- number of sizes
- number of weights
- label consistency
- line height
- table alignment
- numeral style
- truncation
- long content
- contrast
- hierarchy independent from color

## 8. Token Audit

Look for:
- one-off colors
- one-off radii
- one-off spacing
- duplicate component styles
- hardcoded values where semantic tokens exist
- semantic tokens used outside their role

## 9. Accessibility Audit

Check:
- text contrast
- non-text contrast
- meaning without color
- focus treatment
- target size
- disabled vs unavailable distinction
- error communication
- reduced-motion behavior

## 10. Cross-Screen Grammar

A visual grammar is only real if it survives across screens.

Check:
- does `critical` look like critical everywhere?
- does `selected` look like selected everywhere?
- are status families consistent?
- do filters behave and look consistently?
- are decorative gradients part of one surface strategy?
- did one page invent a new badge family?

## 11. Priority

### Critical
- false or ambiguous semantic meaning
- inaccessible critical state
- destructive action ambiguity
- unsafe risk communication

### High
- repeated semantic collisions
- hierarchy inversion
- badge overload
- selected/data confusion
- broken responsive behavior
- inconsistent system logic

### Medium
- spacing drift
- density mismatch
- weak composition
- over-containment
- localization fragility

### Polish
- optical alignment
- materiality
- gradient refinement
- shadow quality
- micro-motion
- typographic nuance

Do not spend polish effort before Critical and High issues are resolved.
