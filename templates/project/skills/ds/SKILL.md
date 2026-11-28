---
name: <proyecto>-ds
description: >-
  Sistema de diseño de <Proyecto>: librería de componentes y su documentación, pisos de accesibilidad, tokens de color,
  escala tipográfica y reglas de uso. Usar SIEMPRE antes de elegir un componente, un color o un tamaño de texto en una
  pantalla de <Proyecto>.
---

# Sistema de diseño de <Proyecto>

Inspeccionado el <fecha>. Si el código cambió, manda el código: volvé a medir y actualizá esta skill.

## Librería

- **Librería y versión:** <librería y versión>.
- **Documentación:** <llms.txt, servidor MCP u otra fuente, con su dirección>. Consultala para cada componente antes de
  usarlo: esta skill dice *cuándo* usarlo en <Proyecto>; la documentación dice *cómo*.
- **Capa de tema:** `<ruta del CSS del tema>`.

## Pisos

- **Texto mínimo:** <px>. **Target mínimo:** <px>. **Viewports:** <anchos>.
- **Audiencia:** <condiciones que suben los pisos, o «general»>.

### Valores por defecto de la librería que no cumplen (medidos en el banco)

| Componente | Qué incumple | Medido | Dónde se corrige (una vez) |
| --- | --- | --- | --- |

## Tokens de color

| Token | Claro / oscuro | Para qué | No usar para |
| --- | --- | --- | --- |

Pares ya medidos: <par → ratio, o «ninguno: medir todo»>.

## Tipografía

| Nivel (clase o variable) | Tamaño / peso | Para qué |
| --- | --- | --- |

Costo de los pisos: si igualaron tamaños, la jerarquía se recupera con peso, color y espacio, o con una escala propia
por encima del piso.

## Movimiento

Criterio general en `knowledge/MOVIMIENTO.md` del plugin. Acá va lo propio de <Proyecto>.

- **Nivel:** <sobrio | intermedio | expresivo (`MOVIMIENTO.md` §1), quién lo aprobó y cuándo (checkpoint de dirección
  visual). Hasta el checkpoint: «pendiente».>
- **Cómo se configura en esta pila:** <tabla: pieza, cómo, dónde, para este nivel (`MOVIMIENTO.md` §5). Por ejemplo
  `CountingNumber` con `transition` de duración fija, la serie de Recharts con `isAnimationActive` explícito, el
  `TabsContent` del proyecto sin secuencia, y la capa de movimiento en el tema.>
- **Chequeos** (tienen que dar vacío): <los greps de `MOVIMIENTO.md` §6, adaptados a la pila.>
- **Medido:** <cuándo queda quieta cada pantalla principal al cargar y después de la acción frecuente
  (`medir.mjs --movimiento`), con fecha.>

## Base móvil

<Si el producto se usa en un teléfono: qué está aplicado de `knowledge/SUPERFICIE_CODIGO.md` §5 (viewport-fit=cover,
theme-color y dónde se actualiza, áreas seguras por barra fija, touch-action), qué se decidió no aplicar y por qué, y qué
falta probar en un teléfono real. Si no se usa en un teléfono: «no aplica».>

## Reglas

- Si un componente de la librería da el diseño, se usa tal cual. Si no, se corrige una vez en el tema o se arma uno
  propio, con su motivo.
- Si falta un componente con comportamiento difícil (fecha, combobox tipeable, número con formato), va con ui-sdk en un
  wrapper del proyecto, no escrito a mano (`RECETAS_LIBRERIAS.md` §5 del plugin). <Versión fija de ui-sdk, wrappers
  existentes y si sus popups se animan con CSS o van sin animación.>
- <Reglas de rol del producto: por ejemplo, un filtro no se dibuja como una acción; un solo botón principal por
  pantalla.>
