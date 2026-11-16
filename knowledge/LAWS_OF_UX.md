# Laws of UX — Applied Reference

The 30 principles catalogued at https://lawsofux.com/ (list verified 2026-10-27), rewritten for decision-making.
Read when a design decision, critique, or trade-off could be explained or challenged by one of them. For how the
most common ones collide in practice (Hick vs. control, Jakob vs. bad conventions, peak-end), see
[psychology-deep-dive.md](../skills/ux-designer-pro/references/psychology-deep-dive.md) (`ux-designer-pro` skill) — this
file does not repeat those worked conflicts.

Each entry: **what it says** · **apply** · **breaks when** · **critique signal** · **source** · **evidence**.

Evidence levels:
- **High** — replicated experimental finding; the direction is reliable (magnitudes still depend on context).
- **Medium** — real finding, but narrower than how UX folklore uses it, or with mixed replications.
- **Folk** — a useful rule of thumb or aphorism, not an empirical law. Never cite it as proof.

## How to use this file

1. A law **explains a preference; it does not prove the design works for these people.** It never replaces
   evidence, usability testing, or a domain rule.
2. Cite a law only when it explains a **concrete finding** on the artifact: observation → law → fix. A law named
   without an observed instance is decoration; drop it.
3. When two laws point in opposite directions, resolve by task frequency, cost of error, user expertise, and
   emotional state (see `psychology-deep-dive.md` §2). State which side wins and why.
4. Folk-level laws may frame a discussion; they may not settle one.

---

## 1. Perception and grouping (Gestalt)

### Law of Proximity
- **Says:** elements close together are perceived as a group.
- **Apply:** spacing encodes relationship — inner spacing < outer spacing; labels sit closer to their field than to
  the previous field.
- **Breaks when:** equal spacing everywhere forces readers to infer structure from content.
- **Signal:** a label equidistant between two fields; a button closer to the wrong card.
- **Source:** Wertheimer, 1923. **Evidence:** High.

### Law of Similarity
- **Says:** elements that look alike are perceived as related or as having the same function.
- **Apply:** one visual treatment per role; things that act alike look alike, things that act differently look
  different.
- **Breaks when:** decorative styling copies interactive styling (a non-clickable chip styled like a button).
- **Signal:** users tap static elements; two unrelated statuses share a color.
- **Source:** Wertheimer, 1923. **Evidence:** High.

### Law of Common Region
- **Says:** elements inside a shared boundary are perceived as a group, often more strongly than proximity.
- **Apply:** cards, panels, and backgrounds to bind related content when spacing alone is not enough.
- **Breaks when:** every item gets its own container (card soup) — the boundary stops meaning anything.
- **Signal:** nested borders three levels deep; a container holding a single item.
- **Source:** Palmer, 1992. **Evidence:** High.

### Law of Uniform Connectedness
- **Says:** visually connected elements (lines, shared fills, connectors) are perceived as more related than
  unconnected ones; it can override proximity and similarity.
- **Apply:** steppers, timelines, connected segments, selected-row highlights.
- **Breaks when:** connectors link things that are not actually sequential or dependent.
- **Signal:** a progress line implying an order the flow does not enforce.
- **Source:** Palmer & Rock, 1994. **Evidence:** High.

### Law of Prägnanz (simplicity)
- **Says:** people interpret ambiguous or complex images in the simplest form possible.
- **Apply:** simple, closed shapes for icons and diagrams; avoid layouts whose structure takes effort to parse.
- **Breaks when:** "simple" is pushed to the point of losing necessary distinctions (icons without labels).
- **Signal:** an icon or chart users describe differently from what it means.
- **Source:** Gestalt school (Wertheimer, Koffka, Köhler), 1920s. **Evidence:** High (perception), Medium as a
  general design rule.

## 2. Decision and choice

### Hick's Law (Hick-Hyman)
- **Says:** decision time grows with the number and complexity of options — roughly logarithmically for equally
  likely, unfamiliar choices.
- **Apply:** reduce or stage options at moments of first-time or high-stakes choice; highlight a recommended option.
- **Breaks when:** applied to familiar lists users scan or search (experts jump straight to the target), or when
  cutting options removes control a frequent user needs.
- **Signal:** a first-run screen with many equal-weight choices; a single critical decision buried among ten.
- **Source:** Hick, 1952; Hyman, 1953. **Evidence:** High for simple choice reaction time; Medium for full menus.

### Choice Overload
- **Says:** too many options can lower satisfaction, confidence, or the likelihood of choosing at all.
- **Apply:** curate, filter, compare side by side, provide defaults when options are many and hard to compare.
- **Breaks when:** users have clear preferences or expertise — large assortments then help. The effect depends on
  moderators (complexity, preference uncertainty, time pressure).
- **Signal:** many near-identical plans or variants with no comparison aid.
- **Source:** Iyengar & Lepper, 2000; meta-analyses Scheibehenne et al., 2010 (mean effect ≈ 0) and Chernev et
  al., 2015 (moderators). **Evidence:** Medium — real under specific conditions, not universal.

### Cognitive Bias
- **Says:** systematic deviations from rational judgment (anchoring, framing, defaults, loss aversion…) shape
  decisions.
- **Apply:** design defaults, framing, and order deliberately; audit your own decisions for confirmation bias.
- **Breaks when:** used to manipulate (see the ethical test in `psychology-deep-dive.md` §4); some popular biases
  have weak replications.
- **Signal:** a pre-selected option that serves the business, not the user; findings that only confirm the brief.
- **Source:** Tversky & Kahneman, 1974. **Evidence:** High for core heuristics; varies per bias.

### Occam's Razor
- **Says:** among solutions that work equally well, prefer the one with fewest assumptions — in design, fewest
  elements and concepts.
- **Apply:** remove what does not serve the task; one concept per screen where possible.
- **Breaks when:** "simpler" moves complexity onto the user (see Tesler) or deletes needed information.
- **Signal:** two mechanisms solving the same job; elements no one can justify.
- **Source:** William of Ockham (14th c.), philosophical principle. **Evidence:** Folk.

## 3. Memory and attention

### Working Memory
- **Says:** a limited-capacity system holds and manipulates information needed for the current task.
- **Apply:** keep needed information visible across steps; never make users carry a value from one screen to the
  next; recognition over recall.
- **Breaks when:** interfaces rely on remembering codes, earlier answers, or instructions read before a step.
- **Signal:** "as shown on the previous screen"; instructions disappear when the task starts.
- **Source:** Baddeley & Hitch, 1974. **Evidence:** High.

### Miller's Law
- **Says:** people can hold a small number of items in short-term memory — Miller's "7 ± 2", revised by Cowan to
  about 4 chunks.
- **Apply:** limit what must be **remembered**; group information into chunks.
- **Breaks when:** misused to cap the number of **visible** items (menus, tabs, nav). Visible items are recognized,
  not recalled; Miller says nothing about them.
- **Signal:** "a menu can't have more than 7 items" — reject this argument.
- **Source:** Miller, 1956; Cowan, 2001. **Evidence:** High for memory span; the menu-limit use is a myth.

### Chunking
- **Says:** grouping individual items into meaningful units makes them easier to process and remember.
- **Apply:** phone numbers, codes and IDs in groups; long forms split into labeled sections; dense data in rows
  with clear grouping.
- **Breaks when:** chunk boundaries do not match how users think about the data.
- **Signal:** a 16-character code shown unbroken; a 30-field form with no sections.
- **Source:** Miller, 1956; Chase & Simon, 1973. **Evidence:** High.

### Cognitive Load
- **Says:** the mental effort an interface demands; intrinsic (the task), extraneous (the design), germane (learning).
- **Apply:** cut extraneous load — the only kind design fully controls. See `psychology-deep-dive.md` §1.
- **Breaks when:** reduction removes information the task needs (intrinsic load cannot be designed away).
- **Signal:** users re-read instructions; decoration competes with the task.
- **Source:** Sweller, 1988 (instructional design; applied to UX by analogy). **Evidence:** High in learning
  research, Medium as a UX measure.

### Selective Attention
- **Says:** people focus on a subset of stimuli tied to their goal and filter the rest — including things that look
  like ads or are outside the task.
- **Apply:** place critical information where the task already has the eye; do not rely on peripheral banners for
  critical messages.
- **Breaks when:** important alerts are styled like promotional banners (banner blindness) or appear far from the
  point of action.
- **Signal:** an error shown at the top of a long form while the user looks at the field.
- **Source:** Cherry, 1953; Simons & Chabris, 1999; Benway & Lane, 1998 (banner blindness). **Evidence:** High.

### Serial Position Effect
- **Says:** first and last items in a series are remembered best.
- **Apply:** see `psychology-deep-dive.md` §1 — lead and close with what matters.
- **Breaks when:** order is fixed by domain logic (clinical, legal, chronological) — do not reorder for memorability.
- **Signal:** the key action in the middle of a long list or message.
- **Source:** Ebbinghaus, 1885; Murdock, 1962. **Evidence:** High for list recall.

### Von Restorff Effect (isolation effect)
- **Says:** an item that differs from its peers is more likely to be noticed and remembered.
- **Apply:** one visually distinct primary action or alert per view; reserve emphasis for what truly matters.
- **Breaks when:** many things are emphasized (nothing stands out), the distinction relies on color only
  (accessibility), or emphasis looks like an ad (selective attention).
- **Signal:** three "primary" buttons; red used for both errors and branding.
- **Source:** von Restorff, 1933. **Evidence:** High for memory.

### Zeigarnik Effect
- **Says:** interrupted or incomplete tasks stay more present in mind than completed ones.
- **Apply:** show progress and what remains; let users resume where they left off; make unfinished state visible.
- **Breaks when:** used to nag (artificial incompleteness, "your profile is 60% complete" for no user benefit).
- **Signal:** progress meters that exist only to drive engagement.
- **Source:** Zeigarnik, 1927. **Evidence:** Folk-to-Medium — replications are inconsistent; justify progress
  and resume features on task grounds, not on this effect.

## 4. Interaction and time

### Fitts's Law
- **Says:** time to reach a target grows with distance and shrinks with target size
  (MT = a + b·log₂(2D/W)).
- **Apply:** large targets for frequent and critical actions; place them near where the hand or pointer already is;
  separate destructive actions from frequent ones. On desktop, screen edges and corners are "infinite" targets;
  on touch they are not.
- **Breaks when:** only size is checked and distance is ignored, or targets are large but packed with no gap
  (error rate rises).
- **Signal:** a primary action far from the content it acts on; small targets for users with tremor, gloves, or
  low vision; destructive and confirm buttons adjacent.
- **Source:** Fitts, 1954; MacKenzie, 1992 (HCI formulation). WCAG 2.2 SC 2.5.8 sets the minimum.
  **Evidence:** High.

### Doherty Threshold
- **Says:** productivity rises when system response stays under ~400 ms, so neither person nor system waits on
  the other.
- **Apply:** respond instantly to input (optimistic UI, local feedback) even when work completes later; show
  progress for longer waits. Use the response-time limits as the working rule: ~0.1 s feels instant, ~1 s keeps flow,
  ~10 s is the attention limit without progress feedback.
- **Breaks when:** fake speed hides real failure, or artificial delay is removed where it builds trust in a
  heavy operation.
- **Signal:** a tap with no visible reaction; a spinner with no estimate on a 20-second step.
- **Source:** Doherty & Thadani, 1982 (IBM); Miller, 1968; Card, Robertson & Mackinlay, 1991; Nielsen, 1993.
  **Evidence:** Medium — the exact 400 ms figure comes from mainframe-era studies; the response-time bands
  are more robust.

### Postel's Law (robustness principle)
- **Says:** be liberal in what you accept, conservative in what you send.
- **Apply:** accept varied input formats (phone with spaces, dates in several forms, pasted text) and normalize
  them; output in one clear, consistent format.
- **Breaks when:** leniency accepts ambiguous input silently (05/06 as May or June) — then ask instead of guessing.
  In protocol engineering the principle itself is now questioned (RFC 9413, 2023).
- **Signal:** "invalid format" for an obviously valid value; rigid masks that reject pasted input.
- **Source:** Postel, RFC 760/761, 1980. **Evidence:** Folk for UX.

### Paradox of the Active User
- **Says:** users start using software immediately instead of reading instructions, even when learning first would
  save them time.
- **Apply:** teach in context at the moment of need; make the first action safe and reversible; do not rely on
  tours or manuals.
- **Breaks when:** the product depends on a long upfront tutorial to be usable.
- **Signal:** a skippable tour that holds information needed later; help separated from the task.
- **Source:** Carroll & Rosson, 1987. **Evidence:** Medium-High (observational, widely corroborated).

### Flow
- **Says:** full immersion arises when challenge matches skill, goals are clear, and feedback is immediate.
- **Apply:** for repeated, focused work, remove interruptions, keep feedback immediate, keep goals visible.
- **Breaks when:** applied to short transactional tasks — there the goal is to finish and leave, not to immerse.
- **Signal:** modal interruptions mid-task; feedback that arrives only at the end.
- **Source:** Csikszentmihalyi, 1990. **Evidence:** Medium for UX.

## 5. Motivation and emotion

### Aesthetic-Usability Effect
- **Says:** people perceive attractive designs as more usable and tolerate minor problems in them.
- **Apply:** visual quality earns trust and patience — especially in health, finance, and first impressions.
- **Breaks when:** used to justify skipping usability work; it also **masks problems in testing** (users rate a
  polished prototype highly while failing tasks).
- **Signal:** high satisfaction scores alongside low task success — trust the task data.
- **Source:** Kurosu & Kashimura, 1995; Tractinsky et al., 2000. **Evidence:** Medium — it affects perceived
  usability more than actual performance.

### Goal-Gradient Effect
- **Says:** motivation increases as people get closer to a goal.
- **Apply:** show progress, especially near the end; count completed steps instead of starting at zero when
  honest; shorten the visible distance to completion.
- **Breaks when:** progress is faked (artificial head start) or the remaining effort is hidden and then revealed.
- **Signal:** a stepper whose final step is much longer than the earlier ones without warning.
- **Source:** Hull, 1932; Kivetz, Urminsky & Zheng, 2006. **Evidence:** Medium-High.

### Peak-End Rule
- **Says:** experiences are judged mostly by their most intense moment and their end.
- **Apply:** see `psychology-deep-dive.md` §1 — engineer a clear, positive ending and never end on the
  painful step.
- **Breaks when:** used to paper over a bad average experience that users repeat daily.
- **Signal:** a flow that ends on an error, a form, or an ambiguous "done".
- **Source:** Kahneman et al., 1993; Redelmeier & Kahneman, 1996. **Evidence:** High in the original pain studies,
  Medium for digital products.

### Jakob's Law
- **Says:** users spend most of their time on other products and expect yours to work the same way.
- **Apply:** follow platform and category conventions by default; see `psychology-deep-dive.md` §2 for when to
  break them.
- **Breaks when:** the convention comes from a different context than yours, or your users have never used the
  category (first-time digital users, kiosk users).
- **Signal:** a custom control that replaces a standard one with no measurable gain.
- **Source:** Nielsen, 2000. **Evidence:** Medium (grounded in transfer of learning; stated as a heuristic).

### Mental Model
- **Says:** users act on their internal model of how a system works, formed from prior experience.
- **Apply:** match labels, grouping, and flow to the users' model (see card sorting, interviews); where the system
  must differ, make the difference visible at the point of action.
- **Breaks when:** the interface mirrors the internal org chart, database, or backend states.
- **Signal:** labels in internal jargon; users asking "where did it go?" after an action.
- **Source:** Craik, 1943; Norman, 1983/1988. **Evidence:** High as a concept.

## 6. Complexity and systems

### Tesler's Law (conservation of complexity)
- **Says:** every system has irreducible complexity; the question is who carries it — the system or the user.
- **Apply:** move complexity into the system (defaults, inference, automation) when it is safe; keep it with the
  user when their judgment is required.
- **Breaks when:** simplification hides decisions the user is accountable for, or automation makes the system
  unpredictable.
- **Signal:** a "simple" screen that pushes manual work to a later step or to support.
- **Source:** Larry Tesler, Xerox PARC, mid-1980s. **Evidence:** Folk.

### Pareto Principle
- **Says:** a minority of causes produces most effects (the "80/20").
- **Apply:** prioritize the few flows, errors, or features that account for most usage or pain — from data.
- **Breaks when:** the ratio is assumed instead of measured, or the 20% excluded holds critical, rare cases
  (safety, accessibility, edge-case errors).
- **Signal:** "80% of users don't need this" with no data behind it.
- **Source:** Pareto, 1896; Juran, 1940s. **Evidence:** Folk as a law; the distribution must be measured.

### Parkinson's Law
- **Says:** work expands to fill the time available for its completion.
- **Apply:** set clear expectations of duration; reduce the time a task demands (autofill, defaults, saved data).
- **Breaks when:** used to justify artificial time pressure (countdowns, timeouts) — that hurts accessibility
  (WCAG 2.2.1) and trust.
- **Signal:** a timer whose only purpose is urgency.
- **Source:** Parkinson, 1955 (satirical essay). **Evidence:** Folk.

---

## Common collisions (quick map)

| Tension | Usually resolved by |
| --- | --- |
| Hick / Choice Overload vs. expert control | Frequency and expertise: curate for novices, disclose detail one step away. |
| Occam vs. Tesler | Remove only complexity the system can absorb safely; keep decisions users are accountable for. |
| Von Restorff vs. Selective Attention | Emphasis must sit at the point of action and not look promotional. |
| Jakob vs. Mental Model of new users | Conventions help only users who have them; test with the real population. |
| Aesthetic-Usability vs. test validity | Trust task success over satisfaction ratings of polished prototypes. |
| Postel vs. error prevention | Accept unambiguous variants; ask when input is ambiguous. |
| Goal-Gradient / Zeigarnik vs. honesty | Progress shown must reflect real remaining effort. |
