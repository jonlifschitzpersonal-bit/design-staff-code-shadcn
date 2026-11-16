# Visual Semantics and Salience

Use this reference when designing statuses, pills, badges, tags, table states,
filters, alerts, dashboards, or any interface where multiple colors and small
labels compete for attention.

## 1. Start With Meaning, Not Components

Do not ask "what color should this pill be?" first.

Ask:
- What semantic dimension is this?
- Is it a workflow state, severity, quality, availability, category, or control?
- Is it categorical or ordinal?
- Does it require action?
- How important is it?
- Is it exceptional or routine?
- Is it interactive?

A component is chosen after the semantic role is understood.

## 2. Semantic Families

Common families:

### Workflow state
Examples:
- not started
- in progress
- ready for review
- completed
- stopped

Usually answers:
"Where is this item in a process?"

### Severity / urgency
Examples:
- critical
- urgent
- warning
- normal

Answers:
"How serious is this?"

### Quality / confidence
Examples:
- reliable
- low confidence
- incomplete
- unknown

Answers:
"How much should I trust this data?"

### Availability
Examples:
- available
- unavailable
- pending
- not applicable

Answers:
"Can this information/action exist right now?"

### Interaction state
Examples:
- selected
- active
- hovered
- focused
- disabled

Answers:
"What is the UI currently doing?"

These families should not automatically share the same visual language.

## 3. Visual Channels and Their Strength

Approximate salience, from strong to quiet:
- filled saturated container
- strong icon + color
- colored border / tonal fill
- neutral outlined container
- dot + text
- emphasized text
- plain text / metadata
- muted text

Position, size, and whitespace may outweigh color.

Use strong channels sparingly.

## 4. Filled / Outline / Text-Only Hierarchy

When a view contains many badges or pills, consider a three-level emphasis
system:

### Level 1 — Filled
Use for:
- critical / urgent exceptions
- primary operational states
- statuses that must survive fast scanning
- selected items when the interaction itself is primary

### Level 2 — Outline / tonal border
Use for:
- secondary statuses
- moderate warnings
- state information that matters but should not dominate
- categorical labels that need containment

### Level 3 — Text-only / dot + text / icon + text
Use for:
- tertiary metadata
- routine/expected states
- confidence or quality indicators when context is clear
- low-priority labels

Do not assign these levels by column automatically.
Assign by consequence and task relevance.

A table may legitimately use:
- filled badge for `Urgent`
- outlined label for `Ready for review`
- dot + text for `Reliable`
- plain muted text for `n/a`

## 5. Cross-Family Differentiation

If two semantic families both require color, differentiate them through other
channels.

Example:

Workflow state:
`[ Ready for review ]`
- soft outlined pill
- neutral or restrained interaction-adjacent color

Data quality:
`● Reliable`
- dot + text
- semantic quality color
- no container

Operational status:
`[ ! Urgent ]`
- stronger filled badge
- icon where useful
- severity color

This allows reuse of a hue when necessary without implying one shared state
system.

## 6. Interaction vs Data

Selected tabs, filters, navigation, toggles, and active controls belong to the
interaction system.

Data values and statuses belong to the semantic/data system.

Avoid:
- same blue filled pill for selected filter and "Open" status
- same border treatment for focus and warning
- same gray chip for disabled control and unavailable data

If the design system uses the same brand hue across systems, separate them by
shape, border, typography, iconography, or placement.

## 7. Color Economy

Every saturated color creates visual weight.

In dense professional interfaces:
- reserve saturation for exceptions
- allow routine states to be mostly neutral
- avoid coloring every row
- avoid turning every categorical value into a colored badge

A useful test:
convert the screen mentally to grayscale.
If hierarchy collapses completely, color is doing too much work.

## 8. Critical Redundancy

Critical information may repeat signals intentionally.

Example:
- red row accent
- "Urgent" text
- warning icon
- descriptive signal text

This is not wasteful if the state is safety- or action-critical.

Routine information should not receive the same redundancy.

## 9. Unknown Is Not Failure

Keep distinct:
- `0`
- `none`
- `unknown`
- `not measured`
- `not applicable`
- `pending`
- `failed`
- `stopped`

Do not collapse these into the same gray pill.

If they share a neutral visual family, ensure the text and surrounding
structure preserve the semantic difference.

## 10. Token Strategy

Prefer semantic tokens such as:

```text
interaction.selected.bg
interaction.selected.fg
interaction.focus.ring

status.critical.bg
status.critical.fg
status.warning.border

quality.reliable.indicator
quality.low.indicator

data.unavailable.fg
surface.canvas
surface.card
```

Do not name semantic tokens after raw hue when the role is stable.

## 11. Semantic Collision Checklist

Before delivery:
- Can one color be read as multiple unrelated meanings?
- Do two unrelated families share color + shape + fill?
- Are selected controls indistinguishable from passive statuses?
- Is a neutral state masking different meanings such as stopped vs n/a?
- Does the most visually prominent state deserve that prominence?
- Could secondary pills become outlined?
- Could tertiary pills become text-only?
- Are there enough non-color cues?
