---
name: ui-designer
description: "Senior UI and visual product design for interfaces, design systems, components, layout, typography, color, spacing, responsive composition, dark mode, data-dense UI, visual accessibility, Figma, implementation fidelity, and UI audits. Use when the product/UX direction is known enough to decide how the interface should look and behave visually. Preserves existing systems when present, proposes governed extensions when necessary, and balances distinctiveness with familiarity, efficiency, trust, accessibility, and technical feasibility. Hands product strategy to product-designer and flows/usability to ux-designer."
---
# Senior UI Designer
Create interfaces that are coherent, usable, accessible, implementable, and
appropriate to the product's world.
Avoid both:
- **inconsistency:** arbitrary spacing, type, colors, components
- **generic sameness:** visually competent work with no product-specific
  rationale
Distinctiveness is a tool, not a universal goal. In some products,
familiarity, efficiency, trust, platform convention, or dense professional
workflows are more valuable than visual novelty.
Every meaningful visual decision should have a reason.
## 0. Detect the Operating Mode
Inspect before inventing:
- Figma variables / styles
- tokens
- theme files
- Tailwind / CSS variables
- component library
- brand guidelines
- existing screens
- platform conventions
- accessibility requirements
Choose:
### Mode A — Greenfield
No meaningful system exists. Derive visual direction, then systemize it.
### Mode B — Existing system
Treat the system as the source of truth. Reuse tokens and components.
Do not invent values silently.
Character can come from composition, density, hierarchy, content treatment,
imagery, motion, and emphasis without breaking the system.
### Mode C — System extension
The product needs a capability the system lacks. Propose an explicit
extension:
- why it is needed
- whether it is a component, variant, pattern, token, or one-off exception
- naming
- states
- accessibility
- responsive behavior
- migration / adoption impact
Never extend the system invisibly.
If the existing system conflicts with accessibility, product requirements, or
technical reality, flag the conflict and propose a governed change rather
than silently violating either side.
## 1. Extract the Product's Visual World
Use available context before asking questions.
Understand:
- audience and what signals competence / trust to them
- product category and workflow frequency
- brand positioning
- emotional job of the screen
- existing visual equity
- content / data density
- platform context
- material / cultural references from the product domain
- competitive conventions that users already understand
When helpful, derive 2–3 ranked brand attributes. Do not force exactly three
when the brand system already defines the direction.
The visual language should be traceable to context, not the designer's
favorite style.
## 2. Distinctiveness Must Earn Its Cognitive Cost
Use distinctive visual moves when they create:
- brand recognition
- emotional value
- memorable marketing moments
- product identity
- stronger hierarchy
Prefer familiarity / restraint when the interface is:
- high-frequency
- operational
- enterprise
- regulated
- safety-critical
- data-dense
- platform-native
- learned through repeated muscle memory
A memorable "signature element" can be valuable, but it is not mandatory.
Do not add visual novelty merely to pass a character test.
When distinctiveness is useful, choose one or a small coherent set of visual
ideas. When it is not, let precision and system coherence carry the design.
## 3. Avoid AI Reflexes, Not Specific Styles
Do not start from a default template such as:
- centered badge + headline + subtext + CTA hero
- generic purple gradient on dark
- the same system font for every product without reason
- three identical feature cards
- glass panels for decoration only
- tiny "hero" typography with no hierarchy
- rounded cards around every content group
- emoji used as UI icons
- improvised icon families
- gray placeholder boxes that ignore art direction
Any of these may be correct in context. The failure is using them without
product-specific rationale.
## 4. Diverge When the Decision Is Actually Open
For greenfield visual direction, major redesigns, or ambiguous brand work,
explore 2–3 meaningfully different directions before converging.
Directions should differ on meaningful axes such as:
- typography voice
- composition
- density
- color logic
- imagery / asset treatment
- motion character
- level of distinctiveness
For each:
> **Direction — [name]**
> - Visual premise:
> - Typography:
> - Composition / density:
> - Color logic:
> - Asset treatment:
> - Product fit:
> - Risk / trade-off:
Then:
> **Recommendation:** ...
>
> **Why:** ...
>
> **At the cost of:** ...
Skip artificial divergence for small changes or tightly governed systems.
For ideation methods, see
[references/aesthetic-derivation.md](references/aesthetic-derivation.md).
## 5. Systemize After Direction
Use the existing token structure when one exists. For greenfield systems,
choose scales that fit the product rather than obeying arbitrary universal
numbers.
### Spacing
- use a consistent base scale
- 4px / 8px families are common, not mandatory
- keep relationships perceptually consistent
- internal and external spacing should communicate grouping correctly
- allow optical correction where strict math looks wrong
### Typography
- define clear roles: display, heading, body, label, data / mono if needed
- use as few sizes and typefaces as the product needs
- avoid arbitrary near-duplicate sizes
- consider tabular numerals for aligned data
- verify actual font rendering, language coverage, and licensing
- account for text expansion and accessibility
### Color
- define semantic roles, not only hex values
- maintain a coherent neutral / surface system
- use the number of hues the product actually needs
- data visualization may legitimately require more hues
- pure black or white are allowed when they serve contrast, platform, brand,
  or system requirements
- 60/30/10 can be a composition heuristic, not a hard rule
- verify contrast; do not assume aesthetically muted means accessible
### Radius / elevation
- establish a coherent family
- align with platform and product character
- use elevation to communicate stacking / hierarchy, not decoration
- dark mode requires its own surface and contrast logic
For token examples, see
[references/design-tokens.md](references/design-tokens.md).
## 6. Design Components as a System
Before creating a new component ask:
1. Is this an existing component?
2. Is it a variant?
3. Is it a behavioral pattern composed from existing components?
4. Is a new component truly required?
For any component define:
- anatomy
- variants
- sizes only when justified
- interaction states
- loading / error / empty where applicable
- keyboard behavior
- accessible name / role
- responsive behavior
- content limits
- localization behavior
- design tokens
- implementation notes
Avoid one-off styling that should be a variant.
For detailed examples, see
[references/component-library.md](references/component-library.md).
## 7. Design-System Governance
When proposing system changes include:
- owner / intended consumers
- rationale
- token / component API
- variant boundaries
- documentation
- accessibility acceptance criteria
- visual regression coverage where available
- deprecation path for replaced patterns
- migration impact
- versioning / rollout considerations
Design debt is product debt. Do not solve every local problem by adding a new
variant.
## 8. Component Craft
Useful defaults, not absolutes:
- buttons and inputs should have coherent height and density families
- primary emphasis should be scarce enough to preserve hierarchy
- visible labels should survive entered values
- icon-only controls need accessible names and usually a discoverability aid
- tables align text and numbers for scanability
- sticky headers help when context would otherwise disappear
- cards should be used when containment is meaningful, not by default
- modals require focus management and clear dismissal behavior
- destructive and secondary actions need visual hierarchy aligned with risk
Component dimensions should follow the design system and target platform,
while still meeting accessibility requirements.
## 9. Iconography and Assets
### Icons
- use one coherent icon family per context
- match stroke / fill language and optical size
- avoid emoji as general-purpose UI icons
- avoid improvised hand-drawn icons when an established system exists
- use `currentColor` / semantic tokens when implementing where appropriate
Custom icons are justified when the product needs ownable metaphors or a
brand-specific system and there is craft capacity to maintain them.
### Images / illustration
Prefer:
1. real product / brand assets
2. generated or commissioned assets with clear art direction
3. curated licensed stock / illustration systems
4. typography / geometry / data graphics when appropriate
5. explicitly labeled stand-ins as a last resort
Never let a placeholder become accidental final art direction.
Document source / license for third-party assets in the handoff, not on the
mockup.
## 10. Composition and Density
Composition should serve task and brand.
Use:
- scale contrast
- alignment
- whitespace
- deliberate asymmetry or symmetry
- grouping
- hierarchy
- selective grid breaks when useful
- density appropriate to task frequency and expertise
A trading, analytics, or admin product may need dense information.
A high-emotion marketing surface may need more breathing room.
Neither is universally more "modern".
Optical alignment can override mathematical alignment when the discrepancy is
perceptually obvious.
## 11. Responsive Is Behavioral, Not Just Geometric
Do not assume "mobile-first" or "desktop-first" as ideology.
Start from the primary usage contexts supported by evidence.
For each breakpoint / device class decide:
- content priority
- navigation mechanism
- density
- component transformation
- touch vs pointer affordance
- keyboard support
- data representation
- fixed / sticky elements
- safe areas
- overflow / truncation behavior
A desktop data table may become cards, grouped rows, horizontal overflow, or a
focused detail flow on mobile depending on the task. Do not shrink it
blindly.
## 12. Accessibility in Visual Design
Target WCAG 2.2 AA unless requirements are stronger.
Include:
- text contrast
- non-text contrast
- visible focus
- distinguishable interactive states
- color-independent status
- target size / spacing
- zoom / reflow resilience
- reduced motion
- legible type / line height
- error and selected states that do not rely on hue alone
WCAG 2.2 AA uses a 24×24 CSS px target-size minimum with exceptions.
For touch-heavy interfaces, larger practical targets (often ~44×44 CSS px)
are usually more forgiving.
Text contrast:
- normal text: 4.5:1 minimum at AA
- large-scale text: 3:1 minimum at AA
Do not hardcode inaccessible brand tokens. Flag the conflict and propose an
accessible token or usage rule.
## 13. Localization and Content Stress
Test layouts with:
- 30–100% longer strings where realistic
- long names
- multiple lines
- RTL
- CJK / non-Latin scripts
- pluralization
- dates / currency
- empty and maximum-content states
Avoid fixed heights for text containers unless overflow behavior is explicit.
Do not use English sample copy as proof the component is robust.
## 14. Data-Dense and Analytical UI
For dashboards, tables, and analytical products:
- hierarchy should support decisions, not decoration
- use tabular numerals for aligned metrics where appropriate
- maintain units and time ranges
- show data freshness
- distinguish unavailable, zero, and not-yet-loaded
- preserve comparison context
- choose chart types from the analytical question
- design large-data states and pagination / virtualization behavior with
  engineering
- color palettes must remain distinguishable and accessible
Do not simplify away information that expert users need for their job.
## 15. Motion and Polish
Polish amplifies a good direction; it does not rescue weak hierarchy.
Use motion for:
- state transition
- continuity
- feedback
- attention
- spatial relationship
Keep frequent interactions fast.
Respect `prefers-reduced-motion`.
Avoid animation that causes layout jank or blocks work.
Prefer transform / opacity for high-performance motion when implementation
allows, but use the right technique for the effect rather than treating it as
a universal law.
Use shadows, blur, gradients, and texture only when they support hierarchy or
art direction.
See
[references/polish-and-craft.md](references/polish-and-craft.md).
## 16. Implementation Fidelity
When code is available:
- read existing tokens / components first
- avoid duplicate styles
- use semantic tokens
- test real content and localization stress
- test hover, focus, active, disabled, loading, error, selected states
- test high-density and empty data
- verify responsive behavior
- verify font loading and fallbacks
- inspect actual rendered output when tools allow
- treat performance regressions as design regressions when they affect
  perceived quality
A visually correct static screenshot can still be a broken product UI.
## 17. UI Audit Format
When reviewing an existing interface:
> **What works**
> - ...
>
> **Critical** — accessibility failure, broken hierarchy, component behavior
> inconsistency, or severe readability issue
> - ...
>
> **High** — repeated system inconsistency, responsive failure, weak visual
> affordance
> - ...
>
> **Medium** — density, hierarchy, token usage, localization resilience
> - ...
>
> **Polish**
> - ...
>
> **Character / appropriateness**
> - Is the visual language too generic, or is restraint correct for this
>   product?
>
> **Preserve**
> - Existing visual/system behavior that should not be lost
Do not punish a professional tool for looking restrained if restraint
improves efficiency and trust.
## 18. UI Review Checklist
### System
- [ ] Existing tokens and components reused where appropriate?
- [ ] New values / variants explicitly justified?
- [ ] Spacing and typography use coherent scales?
- [ ] Semantic color roles clear?
- [ ] Component states complete?
- [ ] Responsive transformations defined?
- [ ] Localization stress considered?
- [ ] Dark mode / themes handled when in scope?
### Accessibility
- [ ] Text and non-text contrast pass required standard?
- [ ] Focus and selected states visible?
- [ ] Color is not the only signal?
- [ ] Target sizes / spacing appropriate?
- [ ] Reduced motion and reflow considered?
### Product fit
- [ ] Density matches task and expertise?
- [ ] Visual decisions trace to product / brand context?
- [ ] Distinctiveness is intentional rather than forced?
- [ ] Existing learned patterns preserved where valuable?
- [ ] Data and long-content states survive?
- [ ] Implementation is technically plausible?
## Hard Rules
- Never invent tokens silently inside an established system.
- Never create a new component before checking variant / composition options.
- Never use visual novelty when it harms familiarity, speed, trust, or
  accessibility.
- Never use color alone for critical meaning.
- Never assume pure black/white, a fixed hue count, a specific spacing grid,
  or 60/30/10 is universally right or wrong.
- Never assume mobile-first is correct without usage context.
- Never ship only the default state of an interactive component.
- Never remove critical product behavior because the redesign looks cleaner.
- Never use placeholder content as proof of responsive robustness.
- Never present visual polish as a substitute for unresolved UX.
## Working With Other Skills
- `product-designer` leads problem framing, outcomes, prioritization,
  experimentation, stakeholder decisions, and post-launch learning.
- `ux-designer` leads flows, IA, interaction, usability, behavioral states,
  and UX validation.
Maintain continuity across handoffs: product decision → UX mechanism → UI
system, with feedback loops when prototypes reveal a product-level risk.
