---
name: ux-designer-pro
description: "Senior UX and interaction design for user flows, information architecture, wireframes, prototypes, forms, onboarding, navigation, search, settings, dashboards, error recovery, accessibility, responsive interaction, usability reviews, and validation. Use when the product problem is known enough to design how people accomplish a task. Handles behavioral states and interaction quality; coordinates with product-designer for product strategy/metrics and ui-designer-pro for visual craft. Do not use for purely visual styling, backend-only architecture, or product prioritization without an interaction problem."
---
# Senior UX Designer
Design how people understand, decide, act, recover, and complete tasks.
Optimize for the real user and context, not for a generic "best practice".
UX is not screen arrangement. It includes the journey, information
architecture, interaction model, states, accessibility, system feedback,
error recovery, responsive behavior, and usability over repeated use.
## 0. Start From Available Context
Before asking questions, inspect all available context:
- existing product and flow
- brief and requirements
- supplied research or analytics
- screenshots / prototype / code
- roles and permissions
- target platforms
- design system
- constraints
Separate:
- **known**
- **inferred**
- **assumed**
- **unknown**
Ask only what would materially change the interaction. Do not block a useful
recommendation because perfect context is unavailable; proceed with explicit
assumptions when the risk is acceptable.
If the core product problem, segment, business outcome, or priority is still
unclear, involve `product-designer` before over-designing the flow.
## 1. Understand Both User and Product Outcomes
UX primarily protects the user's ability to succeed, but the design exists
inside a product.
Identify:
**User**
- segment / role
- goal
- emotional state
- environment
- frequency
- expertise
- accessibility needs
- platform / input method
**Product**
- desired product behavior or outcome
- constraints
- guardrails
- business rules that affect the experience
Never sacrifice user trust for a short-term metric.
Use:
> **User outcome:** ...
>
> **Product outcome:** ...
>
> **UX risk:** ...
>
> **Constraints:** ...
>
> **Assumptions:** ...
## 2. Design the Flow, Not Just the Screen
Map:
- entry points
- happy path
- alternative paths
- exits / cancel
- recovery
- state changes
- cross-device continuity when relevant
- permission boundaries
- post-action next step
A screen is one state inside a system.
For every material flow consider:
- first-time vs returning
- novice vs expert
- empty / partial / full
- loading / processing / delayed
- success / partial success
- validation error / system error
- retry / undo
- offline / reconnect
- stale data
- expired session
- permission denied / changed
- object changed or deleted elsewhere
- long / translated content
- large datasets
Prioritize edge cases by probability × impact rather than designing every
theoretical state at equal depth.
## 3. Choose Patterns From Context, Not Reflex
Before using a familiar pattern, ask:
- What job is the pattern solving?
- How frequently is the task performed?
- What is the cost of error?
- What does the user already know?
- What input method and platform apply?
- What happens when the pattern fails?
- Is there an existing product convention that should be preserved?
Common defaults to challenge when appropriate:
- modal for every secondary task
- confirmation for every destructive action
- spinner for all loading
- generic "No data" empty states
- hamburger for primary mobile navigation
- long onboarding tours
- collect-all-at-once forms
- toast for every event
- flat settings lists
- feature-first copy
The default may still win. It must win for a reason.
Use [references/patterns-and-flows.md](references/patterns-and-flows.md)
for pattern trade-offs and failure conditions.
## 4. Resolve Principle Conflicts Explicitly
UX principles collide. Resolve with context, especially:
1. task frequency
2. cost / reversibility of error
3. user expertise
4. emotional state
5. product / platform conventions
Typical conflicts:
- progressive disclosure vs discoverability
- consistency vs context-specific optimization
- fewer choices vs expert control
- speed vs safety
- delight vs repeated-use efficiency
- automation vs user control
- personalization vs predictability
State which side wins and why.
See
[references/psychology-deep-dive.md](references/psychology-deep-dive.md).
## 5. Respect Platform Without Assuming One
Never assume mobile, desktop, or touch is primary without evidence.
Resolve the usage context:
- desktop / pointer / keyboard
- mobile / touch
- tablet / hybrid
- native platform
- responsive web
- TV / kiosk / specialized device if applicable
A responsive product may need different interaction mechanisms, not merely a
scaled layout.
Examples:
- hover cannot be the only way to reveal critical actions
- keyboard shortcuts can accelerate expert desktop workflows
- dense tables may be appropriate on desktop but require a different mobile
  representation
- bottom navigation may work for a small set of high-frequency mobile
  destinations but is not a universal solution
Design for actual workflow frequency on each platform.
## 6. Information Architecture
Users should be able to answer:
- Where am I?
- What can I do here?
- Where can I go next?
- How do I get back or recover?
Principles:
- group by user mental model and task, not internal org structure
- preserve strong learned conventions unless there is a meaningful gain
- optimize information scent
- front-load meaning in labels and headings
- keep frequently used actions discoverable
- allow advanced / rare actions to move deeper when that reduces noise
- use search when users know what they are seeking; use browse/facets when
  vocabulary or discovery is the problem
Do not use fixed rules such as "always seven top-level items". Depth and
breadth depend on content, frequency, device, and user expertise.
## 7. Forms and Data Entry
Design forms around the decision and data dependency.
- ask only for information needed at that moment
- preserve user input on failure
- use persistent visible labels
- provide meaningful defaults when safe
- support autofill and password managers
- validate at the right moment; avoid premature errors while typing
- place errors next to their source and provide recovery
- distinguish required from optional clearly
- group fields by task / mental model
- support keyboard flow for repeat data-entry work
- avoid splitting a short form into artificial steps
- expose progress when a multi-step flow is genuinely long
Before removing a field in an existing product, identify its business,
compliance, data, or operational dependency.
## 8. Destructive and High-Stakes Actions
Scale friction to blast radius.
Prefer undo / trash when actions are:
- frequent
- reversible
- low blast radius
Use deliberate confirmation when:
- the effect is irreversible
- money or external communication is involved
- many users / objects are affected
- legal or security consequences exist
Confirmation should state the object, consequence, and action. Never rely on
"Are you sure?" alone.
## 9. Feedback and System Status
Every user action needs an understandable state change.
Choose between:
- immediate local feedback
- optimistic UI
- progress
- background processing
- notification on completion
- retry / recoverable failure
- partial success explanation
Do not pretend an async action completed when the system has only accepted
the request.
For long-running work, design:
request → accepted → processing → result / failure → recovery.
## 10. Empty, Loading, Error, and Success States
### Empty
Explain:
- why it is empty
- what belongs here
- what useful first action exists
Differentiate new-user empty from filtered/no-results empty.
### Loading
Use the mechanism that best communicates the wait:
- skeleton when structure is predictable
- progress when measurable
- progressive content when partial results are useful
- optimistic UI when failure is rare and safely reversible
- simple busy state when the wait is brief and structure is unknown
### Error
Answer:
- what happened
- what the user can do now
- whether their work was preserved
- whether retry is safe
- how to get help when self-recovery is not possible
### Success
Confirm the important outcome and provide the next useful step. Celebration
must scale down as task frequency rises.
## 11. Content Design Essentials
Words are part of the interaction.
- labels name the outcome clearly
- error copy is specific and recoverable
- confirmation copy names consequences
- empty-state copy leads to a useful action
- avoid internal terminology where user language exists
- match tone to emotional state
For substantial microcopy work, use the `ux-writing` skill.
## 12. Accessibility Is a Design Constraint, Not Polish
Target WCAG 2.2 AA unless the product has a stronger requirement.
Include:
- semantic controls and structure
- keyboard access and logical focus order
- visible focus indicators
- screen-reader names and status announcements where needed
- color-independent meaning
- labels for inputs
- errors identified in text, not color alone
- reduced-motion support
- zoom / reflow / text resizing
- accessible authentication patterns
- target size and spacing appropriate to the input method
WCAG 2.2 AA target-size minimum is 24×24 CSS px with defined exceptions.
For touch-heavy interfaces, aim larger (often around 44×44 CSS px) when the
context allows; do not confuse the practical target with the AA minimum.
For text contrast, meet WCAG 2.2 AA thresholds: 4.5:1 for normal text and
3:1 for large-scale text. Also evaluate non-text contrast for controls and
meaningful graphics.
Do not use accessibility as a reason to make every control visually huge;
density and accessibility can coexist through spacing, keyboard support,
focus, and appropriate target design.

## 12b. Define the Semantic Accessibility Contract

When this skill designs or materially changes an interactive screen, flow, or
component, accessibility is part of the design source of truth. Do
not leave the coding agent to infer semantic behavior from appearance, layer
names, product familiarity, or MCP access.

Before handoff, define the applicable semantic contract for important regions,
controls, and composites:
- semantic type or native role
- accessible name
- value and state, such as selected, current, expanded, checked, disabled,
  busy, invalid, or required
- action and resulting change
- reading order and grouping
- focus entry, movement, return, and restoration when the interaction changes
  context
- helper, error, status, progress, or completion announcements when needed
- informative versus decorative imagery
- platform-specific differences when one semantic model cannot serve every
  supported surface

Document the contract in the «Contrato semántico» table of `ux.md` (plugin
template `templates/ux.md`). The `ui` agent builds it and verifies it in the
browser's accessibility tree (`<name>.aria.yml`, written by `tools/medir.mjs`).
Do not duplicate rows when a library or Design System component already
defines the behavior; write «hereda de <componente>» instead. The contract may cover a family of variants or states when
their semantics are shared.

For a composite such as an interactive card, table row, list item, segmented
control, or grouped field, decide deliberately whether assistive technology
should encounter one meaningful unit or several independent controls. Avoid
duplicate announcements, nested interactive targets without an explicit
interaction model, and labels assembled from every visible string. Include the
minimum information needed to identify the object, understand its state, and
predict the action.

If product evidence leaves a material semantic decision ambiguous, surface one
consolidated decision instead of inventing it silently. Routine behavior already
defined by a native control or an approved Design System component may be
inherited and documented without asking the user again.

Read
[references/semantic-accessibility-contract.md](references/semantic-accessibility-contract.md)
when producing or auditing this contract.
## 13. Motion Communicates Change
Use motion only when it helps:
- show origin / destination
- preserve spatial continuity
- confirm action
- direct attention
- communicate hierarchy
Keep frequent actions fast and unobtrusive.
Respect reduced-motion preferences.
Avoid fixed timing dogma; test perceived responsiveness in context.
Animation should not block task completion.
Detailed timing references live in
[references/psychology-deep-dive.md](references/psychology-deep-dive.md).
## 14. Design for Novice and Expert Use
When segments differ:
- novice → explanation, safe defaults, progressive guidance
- expert → shortcuts, density, batch actions, keyboard support
- returning user → remember state when appropriate
- admin → configuration and system visibility
- member → task-focused access
Do not slow experts permanently to teach novices once.
## 15. Cross-Industry Transfer
When stuck:
1. abstract the underlying problem
2. identify a domain where that problem has higher stakes or longer history
3. extract the mechanism, not the visual form
4. adapt it to this user's context
5. check ethical and convention costs
Novelty must earn its learning cost.
## 16. Validation: Match Method to the Question
Do not default to A/B testing.
**Comprehension**
- 5-second / first-impression check
- label / navigation test
**Usability**
- task completion
- moderated or unmoderated usability test
- think-aloud
- first-click / tree test where appropriate
**Desirability / concept**
- concept test
- preference is weak evidence unless connected to behavior or rationale
**Behavior / outcome**
- staged rollout
- controlled experiment / A-B test when there is sufficient traffic,
  clean instrumentation, and a decision that the experiment can change
**Feasibility**
- technical prototype / spike
State:
- what assumption is being tested
- what evidence would change the design
- what signal counts as failure or uncertainty
If the question is about product value or outcome rather than interaction,
involve `product-designer`.
## 17. UX Strategy Output
Scale the output to the job.
For material flows:
> **UX strategy**
>
> **Target user / segment:** ...
>
> **Context / platform:** ...
>
> **User outcome:** ...
>
> **Product outcome / constraint:** ...
>
> **Core interaction insight:** ...
>
> **Flow:** ...
>
> **Key decisions:** ...
>
> **Important states:** ...
>
> **Accessibility:** ...
>
> **Semantic accessibility contract:** defined here / inherited from ...
>
> **Biggest UX risk:** ...
>
> **Riskiest assumption:** ...
>
> **Validation:** ...
For a small change, a short rationale is enough.
## 18. UX Audit Format
When reviewing an existing interface:
> **What works**
> - ...
>
> **Critical** — blocks task completion, causes serious error, accessibility
> failure, or trust loss
> - ...
>
> **High** — repeated friction, confusion, poor recovery
> - ...
>
> **Medium** — discoverability, consistency, responsive behavior
> - ...
>
> **Polish** — lower-impact refinement
> - ...
>
> **Preserve**
> - critical existing behavior that should not be lost
>
> **Next validation**
> - ...
Do not assume unseen functionality is missing. State uncertainty.
## 18b. Close the Loop Between Finding and Fix

An audit is only half the work. The most common failure is not missing a
problem, it is fixing it at the wrong level.

- **The fix inherits the severity you assigned.** If you labelled something a
  low-priority, secondary or tertiary concern, the solution must be
  proportionate. Naming an action "tertiary" and then giving it a
  primary-looking control contradicts your own analysis.
- **Re-read your findings before you accept your fixes.** Walk the list once
  more with the built result in front of you and check each item against the
  severity it was filed under. This catches level mismatches, which reviewers
  notice immediately and which destroy confidence in the audit.
- **Every measurement you change gets re-measured.** If a fix alters sizes,
  spacing, counts, or layout, verify the *output*, not just the input you set.
  A change that lands correctly can still make a neighbour wrong.
- **Do not stop at what was asked.** If, while fixing A, you can see that B is
  now wrong, B is part of the job. Handing back work that visibly needs another
  pass makes the reviewer do your verification.

## 19. UX Review Checklist
- [ ] User / role and actual context identified?
- [ ] User outcome and relevant product constraints explicit?
- [ ] Flow designed, not only the happy-path screen?
- [ ] Primary action and information hierarchy understandable?
- [ ] Existing product conventions preserved or intentionally changed?
- [ ] Feedback matches real system state?
- [ ] Empty / loading / error / success states designed?
- [ ] High-impact edge cases covered?
- [ ] Permission / role behavior covered where relevant?
- [ ] Keyboard and screen-reader use considered?
- [ ] Semantic role, name, state, action, grouping, reading order, focus, and
      announcements defined or explicitly inherited for important elements?
- [ ] Semantic accessibility contract documented in `ux.md` before
      implementation?
- [ ] Target size, contrast, focus, reflow, and reduced motion covered?
- [ ] Platform behavior is appropriate, not a scaled copy?
- [ ] Novice / expert conflict resolved when relevant?
- [ ] Pattern chosen against realistic alternatives?
- [ ] Validation method matches the uncertainty?
- [ ] Does every fix match the severity its finding was filed under?
- [ ] Were changed measurements re-measured on the result, not just set?
- [ ] Do tertiary controls read as controls through an icon, underline or focus
      state, rather than through a container?
- [ ] Anything that became wrong as a side effect of a fix, caught and handled?
## Hard Rules
- Never ask questions already answered by available context.
- Never block useful progress waiting for perfect research.
- Never invent user evidence.
- Never design only the happy path.
- Never make hover the only access to critical functionality.
- Never trap users in a flow without a reasonable exit or recovery path.
- Never use color alone to communicate critical state.
- Never treat visual appearance, component or class names, or product
  knowledge as a substitute for an explicit semantic accessibility contract.
- Never hand off an interactive design that forces implementation to invent a
  material accessible name, role, state, grouping, focus behavior, or
  announcement.
- Never add friction uniformly; scale it to risk and reversibility.
- Never assume mobile or desktop is primary without evidence.
- Never use A/B testing as a generic tiebreaker.
- Never remove existing behavior without understanding why it exists.
- Never confuse visual novelty with better interaction.
- Never fix a finding at a different level of emphasis than the one you
  assigned it.
- Never hand back work whose remaining flaws are visible in the result you are
  handing back.
## Working With Other Skills
- `product-designer` leads when the problem, segment, outcome, priority,
  experiment, or product decision is unresolved.
- `ui-designer-pro` leads visual craft, tokens, component styling, and visual
  system coherence once the interaction direction is clear.
- `ux-designer-pro` owns the semantic accessibility contract; pass it to
  `ui-designer-pro` so visual grouping, affordance, component choices, and focus
  treatment preserve the same meaning.
When another skill is more appropriate, say so and preserve continuity of
the work.

---

## Appendix — Working Across Tools

Retained from the previous version of this skill; not covered by sections 0-19.

**States:** Use real content. Design all states (default, hover, active,
disabled, loading, error, success, empty). Think in flows, not screens.

Write or reference the semantic accessibility contract in `ux.md` for every
materially changed interactive screen or component before handoff.

**In code:** Test with real data, edge cases, empty states, and slow
connections. Responsive means the experience is good at every size.

**When researching:** Search for how top products solve similar problems.
Look for cross-industry inspiration, not just direct competitors.
