# Component Library — Semantic Component Guidance

Use this reference when building, reviewing, or standardizing UI components.

## 1. Components Need Roles, Not Just Shapes

A component's appearance should communicate:
- what it is
- whether it is interactive
- how important it is
- what state it is in

Do not create a generic "pill" that is then used for every compact label.

## 2. Buttons

Common hierarchy:
- Primary: strongest action
- Secondary: supporting action
- Tertiary / ghost: low-emphasis action
- Destructive: severity layered onto the appropriate action hierarchy

Do not enforce "one primary button per section" mechanically.
Use the fewest strong actions needed to make the decision hierarchy clear.

States:
- default
- hover
- active
- focus
- disabled
- loading

Button/input heights may share a density family, but exact equality is not a
universal requirement if component anatomy or platform conventions differ.

## 3. Inputs

Include:
- persistent label where needed
- clear focus
- error state with text
- helper text
- disabled / read-only distinction
- filled state
- loading / validation where relevant

Placeholder is not a reliable replacement for a label.

## 4. Badges, Pills, Tags, Chips, Indicators

### Status badge
System-generated state.

Possible hierarchy:
- filled = high salience
- outline / tonal = medium salience
- text / dot = low salience

### Severity badge
Communicates risk or urgency.
May use stronger color and iconography.

### Tag
Categorical metadata.
Usually lower salience than operational status.

### Chip
Compact interactive element, often removable/selectable.

### Filter chip
Explicit control.
Must look interactive and selected/unselected states must be clear.

### Count badge
Quantity associated with another object.

### Quality indicator
Often better as dot + text or icon + text than a filled pill.

### Metadata label
Usually does not need a container.

Do not make all roles look identical.

## 5. Tables

Optimize for scanability.

Use:
- stable column alignment
- restrained separators
- clear header hierarchy
- row hover/selection only if rows are interactive
- sticky headers when useful
- pagination / virtualization strategies appropriate to data scale

Zebra striping, borders, whitespace, and row grouping are tools.
Choose the minimum combination needed.

Avoid:
- a filled badge in every categorical cell
- centered long text
- evenly sized columns regardless of content
- row hover on non-interactive rows if it falsely implies clickability

## 6. Cards

Use containment when it explains grouping, interaction, or surface hierarchy.

Do not cardify every section.

Possible anatomy:
- header
- supporting metadata
- content
- action
- status

Use hover elevation only if the card is interactive or the material strategy
supports it.

## 7. Navigation

Active navigation belongs to the interaction visual system.

Differentiate navigation selected state from passive data/status states.

Support:
- hover
- focus
- current/active
- expanded/collapsed where relevant
- keyboard navigation

## 8. Tabs

Tabs are interactive state, not status badges.

Selected treatment may use:
- underline
- tonal background
- text weight
- indicator

Avoid using the exact same filled pill style as passive table statuses if both
appear together.

## 9. Modals / Dialogs

Define:
- purpose
- focus entry
- focus trap where appropriate
- dismissal
- destructive behavior
- responsive transformation
- action hierarchy

Do not assume backdrop click should always close.
For high-risk or in-progress tasks, accidental dismissal may be harmful.

## 10. Tooltips

Use for supplemental information, not essential content.

Ensure:
- keyboard access
- sufficient delay / persistence
- viewport collision handling
- readable width
- equivalent access on touch when necessary

## 11. Toasts / Notifications

Use appropriate persistence:
- success/info may auto-dismiss
- errors and required actions may need persistence

Include:
- clear status text
- action when relevant
- non-color signal

## 12. Icon-Only Controls

Need:
- accessible name
- adequate target
- recognizable icon
- discoverability support if unfamiliar

Do not use emoji as default UI iconography.

## 13. Component State Matrix

For important components verify:
- default
- hover
- active
- focus
- selected
- disabled
- loading
- error
- empty
- success
- offline / stale when relevant
- permission restricted when relevant

Not every component needs every state.
The product behavior determines the matrix.
