# Semantic Accessibility Contract

Use this reference when designing or auditing an interactive screen, flow, or
component. The contract describes the experience exposed to assistive
technology without prescribing framework-specific properties.

## 1. What the Contract Prevents

Visual hierarchy does not automatically become semantic hierarchy. Component
names, appearance, CSS classes, and broad product knowledge do not
guarantee that implementation will infer the intended:

- control type
- accessible name
- current state or value
- grouping
- reading order
- focus behavior
- status announcement
- image meaning

Define these only where they affect the experience. Do not annotate every
decorative layer or restate behavior already governed by an approved component.

## 2. Contract Fields

For each important region, control, or composite, capture the applicable fields:

| Field | Decision |
|---|---|
| Element or region | Stable human-readable identifier |
| Semantic type | Heading, button, link, tab, list, list item, input, dialog, status, image, or appropriate native control |
| Accessible name | What identifies it without relying on nearby visual context |
| State or value | Selected, current, expanded, checked, disabled, busy, invalid, required, value, progress, or other applicable state |
| Action | What activation does and whether context changes |
| Grouping | One composite stop or separate meaningful children |
| Reading order | Intended sequence when visual position is unavailable |
| Focus behavior | Entry, initial target, movement after actions or errors, return, and restoration |
| Description | Helper text, consequence, format, or other information required before acting |
| Announcement | Error, success, loading, progress, completion, or dynamic update that must be announced |
| Media | Informative name/description or decorative exclusion |
| Source | Screen-specific decision or inherited Design System/component rule |

Omit non-applicable fields. A concise contract is better than annotation noise.

## 3. Composite Decision

Choose one meaningful unit when the entire surface performs one action and its
children provide identifying information. The combined name should contain the
minimum useful identity and state, not every visible string.

Keep separate controls when children perform independent actions. Do not place
independent buttons or links inside a composite that is also represented as one
indivisible action unless the platform and interaction model explicitly support
that structure.

Examples of composites that require this decision:

- interactive cards
- selectable rows
- table rows with row actions
- segmented controls or tabs
- grouped fields
- list items with overflow menus
- accordions and disclosure groups

## 4. Naming Rules

- Prefer visible product language.
- Do not include the control role in the name when the platform announces it.
- Do not make an icon's filename or layer name the accessible name.
- Add hidden context only when the visible label is ambiguous outside its
  visual position, such as repeated “Edit” actions.
- Avoid repeating child text already exposed separately.
- Preserve meaningful identifiers, states, totals, or consequences when they
  are needed to distinguish the object or action.

## 5. Structure and Reading Order

- Match product hierarchy, not the accidental order of the DOM or of CSS
  positioning.
- Identify headings and their relative level where hierarchy matters.
- Identify lists and repeated items when the collection relationship helps
  navigation or understanding.
- Keep related label, helper, value, and error information associated.
- Do not use visual coordinates, color, or punctuation alone to explain the
  relationship.

## 6. State, Updates, and Focus

Define how semantics change for selected, disabled, expanded, checked, busy,
invalid, loading, and completion states when applicable.

For context changes, decide:

- where focus goes after navigation
- where focus enters a dialog or drawer
- where it returns after dismissal
- which field receives focus after failed submission
- whether a dynamic update requires an announcement
- whether progress is determinate, indeterminate, or silent

Do not announce every visual update. Announce changes required to understand
the result, recover, or continue.

## 7. Where the Contract Lives (code surface)

Write it in the «Contrato semántico» table of `ux.md`: one row per important
region, control, or composite, with only the applicable fields.

A library or Design System component (for example, HeroUI on React Aria) can
provide an inherited contract: write «hereda de <componente>» and document only
changed names, grouping, order, focus, or state behavior.

The `ui` agent builds it with native elements or the library's components and
verifies it in `<name>.aria.yml`, the accessibility tree that `tools/medir.mjs`
writes next to each capture: roles, names, states, and order must match the
table. Controls without an accessible name fail `--strict`. Focus movement and
announcements are checked by reading the code and, when needed, by stepping
through the page; what cannot be checked is reported as not verifiable.

## 8. Completion Check

Before handoff, confirm:

- every important interactive element is defined or inherits a definition
- visual and semantic grouping agree
- icon-only actions have meaningful names
- decorative media is distinguished from informative media
- selected, disabled, expanded, invalid, busy, and other applicable states are
  expressible without relying on appearance
- reading order remains logical without visual coordinates
- focus behavior exists for dialogs, navigation, errors, and major dynamic
  changes
- important errors, progress, and completion updates have an announcement rule
- implementation does not need to invent a material semantic decision
