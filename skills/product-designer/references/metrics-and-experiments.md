# Metrics and Experiments

Use when product work must connect design to measurable outcomes.

## Metric Stack

### User outcome
What gets better in the person's life or work?

### Product behavior
What observable behavior indicates that improvement?

### Primary metric
The clearest measurable signal for the initiative.

### Diagnostic metrics
Explain why the primary metric moved.

### Guardrails
Catch harm elsewhere.

Example:

**User outcome:** team admin gets a project operational without support.

**Primary:** % of new qualified workspaces reaching first operational project
within 24h.

**Diagnostics:**
- setup start rate
- integration completion
- invite completion
- first project creation
- median time-to-value

**Guardrails:**
- setup errors
- support contacts
- accidental configuration
- 7-day retention
- performance

## Avoid Metric Traps

- clicks without outcome
- time-in-product when efficiency is the user value
- onboarding completion if users complete but never activate
- conversion without refund / retention quality
- notification opens that increase opt-outs

## Event Design

Name events around meaningful behavior, not every UI tap.

Prefer:
`workspace_created`

over:
`blue_button_clicked`

Properties should explain segmentation or context, not collect sensitive data
without purpose.

## Experiment Decision Test

Before proposing A/B:

1. Is there a causal product question?
2. Is the outcome measurable in the available horizon?
3. Is traffic sufficient?
4. Can variants be isolated?
5. Is the difference large enough to matter?
6. Is assignment ethical and safe?
7. What decision changes based on the result?

If not, use another method.

## Hypothesis Anatomy

> We believe [mechanism]
> for [segment]
> will [behavior/outcome]
> because [evidence].
> We'll know through [metric / signal].

Then list:
- riskiest assumption
- expected direction / magnitude if known
- guardrails
- test duration or decision window where applicable
- stop conditions

## Experiment Interpretation

Do not reduce to "winner / loser".

Ask:
- Did the primary outcome move?
- Did guardrails worsen?
- Did segments respond differently?
- Was implementation faithful?
- Was exposure correct?
- Is the effect practically meaningful?
- Does qualitative evidence explain the mechanism?

A null result can mean:
- hypothesis wrong
- implementation weak
- effect too small
- sample insufficient
- metric too distant
- segment mismatch

## Post-Launch Without A/B

Use:
- pre/post with caution
- cohort comparison
- staged rollout
- feature flag exposure analysis
- support / qualitative changes
- time-series patterns

State confounds. Do not imply causality that the method cannot support.
