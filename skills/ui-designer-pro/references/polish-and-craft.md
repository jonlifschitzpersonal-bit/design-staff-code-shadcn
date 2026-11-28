# Polish, Materiality, and Motion

Use this reference after semantic hierarchy and composition are correct.

## 1. Polish Is Multiplicative

Polish amplifies a coherent visual system.
It does not repair weak semantics or hierarchy.

Resolve first:
- meaning
- salience
- hierarchy
- component logic
- accessibility

Then refine materiality.

## 2. Surface Techniques

Possible tools:
- subtle tonal gradients
- atmospheric canvas gradients
- fine borders
- shadow
- inner shadow
- blur
- texture
- transparency
- glow
- highlights

Each tool must communicate:
- depth
- material
- grouping
- interaction
- brand atmosphere

Avoid adding an effect solely because it looks sophisticated in isolation.

## 3. Atmospheric Backgrounds

A restrained background gradient can:
- separate white/neutral functional cards from the canvas
- create calm depth
- reduce need for multiple shadows
- add brand atmosphere

Keep functional content surfaces readable and stable.

Example concept:
```css
.app-canvas {
  background:
    radial-gradient(circle at 20% 0%,
      rgba(120, 190, 230, 0.18),
      transparent 42%),
    linear-gradient(180deg,
      var(--surface-canvas-top),
      var(--surface-canvas-bottom));
}
```

Values must come from the actual token system.

## 4. Micro-Gradients

Subtle button or surface gradients can add physicality if the design language
supports it.

Do not use them automatically.

Check:
- hover/active states
- dark mode
- contrast
- banding
- consistency across components

## 5. Shadows

Use shadow when it explains elevation or interaction.

Avoid:
- shadow on every card
- colored shadow on routine components without art-direction reason
- different shadow recipes across similar surfaces

## 6. Blur / Glass

Use blur when translucency and layering are meaningful.

Ensure:
- fallback when backdrop-filter is unsupported
- text remains readable over changing content
- `prefers-reduced-transparency: reduce` → frostier or solid surface: raise background opacity, drop the blur
- `prefers-contrast: more` → near-solid backgrounds with a defined, contrasting border
- blur does not obscure hierarchy

## 7. Texture

Subtle texture may add material character.

Use when:
- brand calls for tactility
- large flat surfaces feel sterile
- texture does not interfere with data/text

Do not apply noise merely to make CSS feel less flat.

## 8. Motion

Read `${CLAUDE_PLUGIN_ROOT}/knowledge/MOVIMIENTO.md`, the plugin's single source on motion: the three motion levels
(sober, intermediate, expressive) that the user picks as part of the visual direction, the limits that hold at every
level, curves and durations, accessibility, how to configure the project's library for each level, and how to measure
it with `medir.mjs --movimiento`.

In short: how much moves is taste and the user's call; what makes people wait or never settles is a defect at any
level. Polish is making the occasional moments (dialog, menu, toast, switch) crisp and keeping data entrances short.

## 9. Effect Stacking

Before combining effects, ask what each contributes.

Risky stack:
gradient + glass + heavy shadow + glow + saturated border + noise

Prefer:
one primary material idea
+
one or two supporting effects

## 10. Final Polish Check

- Do effects reinforce the visual grammar?
- Is the background subordinate to functional content?
- Are surfaces clearly layered?
- Do interactive elements respond consistently?
- Does the interface still work with effects reduced?
- Is polish appropriate to product seriousness and frequency of use?
