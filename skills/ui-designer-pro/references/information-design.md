# Information Design for Product UI

Use this reference for dashboards, admin tools, tables, queues, analytics,
clinical interfaces, monitoring, reporting, and any screen where users scan
many structured values.

## 1. Design for the Question

Every region should answer a user question.

Examples:
- Who needs attention?
- What changed?
- Which item is blocked?
- What can I act on now?
- How trustworthy is this data?
- What is the current stage?
- What is unusual?

Do not style columns before knowing their analytical role.

## 2. Comparison Direction

Determine whether users compare:
- across rows
- across columns
- within one row
- over time
- against a threshold

This affects:
- alignment
- grouping
- color
- typography
- separators
- chart choice

## 3. Preattentive Emphasis

Color, size, shape, and position can be perceived before detailed reading.

Use preattentive emphasis for:
- exceptions
- urgent action
- threshold breaches
- selected objects
- major changes

Do not use it for every routine value.

## 4. Table Salience Budget

A strong dense table often uses:
- neutral body text for routine values
- muted secondary metadata
- one clear exception channel
- one interaction channel
- sparse semantic color

If three or four columns all use colored filled pills, the table often becomes
a badge matrix rather than an information tool.

Possible treatment:
- workflow state → outlined compact label
- signal / finding → plain text with strong wording
- quality → dot + label
- recommended action → plain text
- urgency → filled status badge

This is an example, not a universal mapping.

## 5. Status vs Finding vs Action

Do not collapse these concepts.

Example:
- `Escalated` = workflow state
- `active drainage` = finding / signal
- `MD follow-up` = recommended action
- `Urgent` = urgency

They answer different questions and deserve different visual treatments.

## 6. Row-Level Exceptions

If a whole row is critical, consider a row-level cue:
- accent rule
- icon
- background tint
- stronger status

Do not over-color every cell in the same row.
One strong cue plus clear labels may be more effective.

## 7. Alignment

- left-align text
- right-align numeric values when comparison benefits
- align decimals when precision matters
- keep units consistent
- use tabular numerals for columns of numbers
- avoid centered text in dense tables unless the content is extremely short
  and categorical

## 8. Column Width

Allocate width by information behavior:
- predictable short states: compact
- variable findings: flexible
- actions: enough width to avoid confusing wraps
- identifiers: preserve recognizability
- numbers: compact and aligned

Do not distribute columns evenly by default.

## 9. Empty / Unknown / Not Applicable

Display these intentionally.

Preferred logic:
- no data → `No data`
- not measured → `Not measured`
- not applicable → `N/A`
- pending → `Pending`
- failed → `Failed`
- zero → `0`

Avoid a generic dash when the distinction matters.

## 10. KPI Styling

A KPI consists of more than a large number.

Consider:
- label
- value
- unit
- comparison
- time range
- trend
- threshold
- data freshness

Do not color a KPI as good/bad without a real threshold.

## 11. Filter and Status Separation

Filters are controls.
Statuses are data.

Do not make passive statuses visually indistinguishable from selectable filter
chips, especially when both appear in the same view.

Use differences in:
- container
- cursor/interaction
- icon
- selected checkmark
- border
- placement
- typography

## 12. Scan Test

Before delivery:
1. Ignore body copy.
2. Look only at the strongest visual signals.
3. Ask whether they reveal the correct priority order.
4. Check if exceptions are easier to find than routine states.
5. Check if the user can compare rows without decoding a rainbow of badges.
