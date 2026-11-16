# Design Tokens — Senior Product UI

Use this reference when establishing or auditing a token system.

## 1. Token Layers

Prefer:
1. primitives
2. semantic tokens
3. component tokens

Example:

```text
blue.600
    ↓
interaction.primary.bg
    ↓
button.primary.bg
```

Semantic tokens should describe purpose, not merely hue.

## 2. Color Families

Recommended conceptual separation:

### Brand
- brand.primary
- brand.secondary
- brand.accent

### Interaction
- interaction.primary
- interaction.hover
- interaction.selected
- interaction.focus

### Semantic
- status.critical
- status.warning
- status.success
- status.info
- status.neutral

### Data
- data.categorical.*
- data.sequential.*
- data.diverging.*

### Quality
- quality.high
- quality.medium
- quality.low
- quality.unknown

### Surfaces
- surface.canvas
- surface.base
- surface.raised
- surface.overlay
- border.subtle
- border.strong

### Decorative
- atmosphere.gradient.*
- atmosphere.glow.*
- texture.*

Do not use decorative tokens for functional status.

## 3. Primitive Palette

The number of hues depends on the product.

Avoid:
- arbitrary near-duplicate hues
- semantic palette derived only from brand palette
- one hue forced into unrelated meanings

Pure black/white may be valid.
Near-black/near-white may be more comfortable in some systems.
Choose based on context and contrast.

## 4. Spacing

A 4px or 8px family is common but not mandatory.

Example:
4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96

Use optical exceptions deliberately, not accidentally.

## 5. Typography

Define semantic roles:
- display
- heading
- body
- label
- metadata
- data / numerals
- code / mono if needed

Avoid near-duplicate sizes without purpose.

## 6. Radius

Define a small family such as:
- small
- medium
- large
- full

Nested radii should feel related, but do not apply a rigid subtraction formula
when it produces awkward geometry.

## 7. Elevation

Possible tools:
- surface tone
- border
- shadow
- blur
- overlap
- z-position

Dark mode does not require one universal elevation technique.
Use surface contrast and shadows according to the material strategy.

## 8. Gradient Tokens

If gradients are part of the system, tokenize them by purpose:

```text
atmosphere.canvas.primary
atmosphere.canvas.secondary
brand.hero.gradient
surface.accent.gradient
```

Do not create anonymous one-off gradients across screens.

Document:
- angle / geometry
- stops
- opacity
- intended surfaces
- contrast constraints
- dark-mode behavior

## 9. Semantic Status Tokens

Do not bind semantic tokens directly to component geometry.

Example:

```text
status.critical.bg
status.critical.border
status.critical.fg
status.critical.icon
```

Then a badge, row accent, alert, or chart threshold can consume the same
semantic role appropriately.

## 10. Accessibility

Validate tokens in actual combinations.

A token may be accessible on one surface and fail on another.

Check:
- text contrast
- non-text contrast
- focus visibility
- disabled readability
- light/dark themes
- color-vision distinguishability

## 11. Naming

Good:
- `status.critical.bg`
- `interaction.selected.border`
- `surface.canvas`
- `quality.low.icon`

Weak:
- `red2`
- `blueSoft`
- `yellowBadge`

Primitive tokens can be hue-based; semantic tokens should be role-based.
