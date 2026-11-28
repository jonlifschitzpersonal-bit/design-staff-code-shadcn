# Plantillas para shadcn/ui (Tailwind v4) y Animate UI

Plantillas de arranque para un proyecto que adoptó shadcn/ui como sistema de diseño, con o sin Animate UI. `project-setup`
las copia cuando detecta esa librería (hay un `components.json`). Medidas con shadcn 4.23 (preset Nova, base Radix) y
Animate UI 2.4: **revisalas contra lo que instaló el proyecto**, porque en shadcn los componentes son del proyecto y
pueden haber cambiado.

| Archivo | Va a | Qué es |
| --- | --- | --- |
| `banco/index.html`, `banco/main.tsx` | `tools/banco/` | **Banco de medición.** Una página con cada componente de `src/components/ui/` tal como está. No entra en `npm run build` (queda fuera de `src/`). Con `?pisos` carga la capa de pisos. Con `?abierto=dialog\|popover\|select\|tooltip` muestra solo ese overlay, abierto. |
| `banco/pisos-propuestos.css` | `tools/banco/` | **Capa de pisos** (texto ≥ 16 px, controles ≥ 44 px, borde de campos y aro de foco ≥ 3:1, texto destructivo a AA). Importa el tema de `src/` y le suma los ajustes: es el antes/después de la medición y el borrador de lo que irá a la capa de tema. |

Uso, con el servidor de desarrollo levantado:

```
node tools/medir.mjs --url http://localhost:5173/tools/banco/index.html        --name banco-390 --out design/knowledge/mediciones --min-text 16 --min-target 44
node tools/medir.mjs --url "http://localhost:5173/tools/banco/index.html?pisos" --name pisos-390 --out design/knowledge/mediciones --min-text 16 --min-target 44
node tools/medir.mjs --url "http://localhost:5173/tools/banco/index.html?abierto=dialog" --name dialog --selector "[role=dialog]" --crop
```

## Qué se midió (preset Nova, modo claro, 390 y 1440 px: idénticos)

| | Sin capa | Con capa |
| --- | --- | --- |
| Texto bajo 16 px | 34 de 38 | 0 |
| Controles bajo 44 px | 20 de 20 | 2 (casilla 24×24 e interruptor 32×18) |
| Borde de campos bajo 3:1 | 2 de 3 (1,26:1) | 0 |
| Aro de foco bajo 3:1 | 18 de 19 (2,05 a 2,58:1) | 0 |
| Campo en error sin indicador de foco | 1 | 0 |
| Texto de contraste bajo AA | botón destructivo (4,00:1) | 0 |

## Cómo se corrige y qué no

- **Gancho: `data-slot`.** shadcn no tiene clases de rol (`.button`): los estilos son utilidades dentro de cada
  componente. Todos traen `data-slot`, y una regla sin capa en el tema le gana a las utilidades de Tailwind, así que el
  piso se corrige una sola vez sin tocar el componente.
- **Overlays medidos** (`?abierto=dialog|popover|select|tooltip`): con la capa, 0 controles bajo 44 px, 0 textos bajo
  16 px y 0 fallas de foco. Ojo con `asChild`: el `data-slot` del disparador reemplaza al de `button`, por eso la capa
  usa `[data-slot$="-trigger"]`, `dialog-close` y `select-item`. Sin esas reglas, el disparador de un popover, la X del
  diálogo y las opciones del select se quedaban en 28 a 32 px.
- **No lo arregla la capa:** la casilla y el interruptor son botones visibles de Radix y `medir.mjs` mide el botón, no la
  etiqueta que lo envuelve. Hay que rehacerlos en el componente con un área táctil propia, o declarar la excepción.
- **Cambio de breakpoint:** a diferencia de HeroUI, el preset no baja el alto de los controles en pantallas grandes.
- **Foco:** el aro del preset es `ring-ring/50` (mitad de opacidad) y no llega a 3:1; la capa lo reemplaza por un
  contorno opaco. En un campo con `aria-invalid` el aro por defecto no se ve.
- **No medido:** modo oscuro (`--input` es blanco al 15 %), hover y seleccionado.
- **Movimiento** (§5 de la capa): `transition-all` en Button, Badge, el acordeón y los disparadores con `asChild`. Se
  limita por `data-slot`.
- **Toque** (§6 de la capa): `touch-action: manipulation`.

## Animate UI

`npm i @animate-ui/react motion` y `npx @animate-ui/cli@latest animate all --dry-run` (después sin `--dry-run`): cambia el
import de la primitiva de cada componente shadcn por su versión animada y quita las clases de animación CSS que Motion
reemplaza. No toca estructura, estilos ni API. `medir.mjs` mide con «reducir movimiento» activo por defecto, para no
medir una entrada a medio hacer. `--movimiento` mide el movimiento en sí, cuadro a cuadro.

**Sus curvas ya son las buenas.** Lo que hay que configurar son dos tiempos por defecto que rompen los límites de
`knowledge/MOVIMIENTO.md` §2 en cualquier nivel, más lo que pida el nivel de movimiento del proyecto (§1).

Medido en el banco el 26 y el 27-11-2026, con un dashboard. El usuario eligió el intermedio:

| Qué | Por defecto | Intermedio (el del banco) | Sobrio |
| --- | --- | --- | --- |
| `TabsContent` | El panel sale y recién después entra el otro: ~520 ms por cada cambio de pestaña (rompe el límite 2) | `transition = { duration: 0.18, ease: [0.23, 1, 0.32, 1] }` y `exitTransition = { duration: 0 }` por defecto en `src/components/ui/tabs.tsx` (abajo): el nuevo entra en 180 ms, sin esperar | Las dos en `{ duration: 0 }` |
| `CountingNumber` | Cuenta desde 0 en cada montaje; el resorte no se queda quieto en 12 s (rompe el límite 3) | Cuenta la primera vez por carga, con `transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}` y `key` estable (`MOVIMIENTO.md` §5) | `initiallyStable` y `duration: 0.3` |
| Series de Recharts | Crecen 400 ms en cada montaje | `"auto"`, 500 ms y `ease-out` la primera vez por carga; después `false` | `isAnimationActive={false}` |
| Indicador de la pestaña activa, valor del select | Se mueven entre 400 y 500 ms (resorte) | Se dejan: son el feedback. Si molestan, se acortan con `transition` | Igual |

Medido con `medir.mjs --movimiento`:

| | Al cargar, quieta a los | Después de cambiar de pestaña |
| --- | --- | --- |
| Intermedio | ~1,5 s | El panel entra a los 11 ms, en 180 ms |
| Sobrio | ~0,8 a 1,0 s | Instantáneo |
| Por defecto | No queda quieta en 12 s | Secuencia de ~520 ms |

```tsx
// src/components/ui/tabs.tsx (nivel intermedio): el panel nuevo entra corto y sin esperar al que sale; el indicador
// del TabsList sigue animado. En sobrio, las dos transiciones en { duration: 0 }.
const ENTRADA = { duration: 0.18, ease: [0.23, 1, 0.32, 1] } as const
const SALIDA = { duration: 0 }
function TabsContent({ className, transition = ENTRADA, exitTransition = SALIDA, ...props }:
  React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 text-sm outline-none", className)}
    transition={transition} exitTransition={exitTransition} {...props} />
}
```

## Lo que shadcn no trae: ui-sdk

`ui-sdk/campo-fecha.tsx` es un wrapper medido del `DatePicker` de ui-sdk (`0.1.0-beta.17`): fecha tipeable en es-AR
con calendario, dentro de diálogos de shadcn. Resuelve los dos choques con Radix (Escape cierra el diálogo entero;
`data-selected:` no aplica) y lleva celdas y botones a 44 px. Va a `src/components/`. Pasaron 52 comprobaciones de
comportamiento con Playwright y `medir.mjs` sin fallas a 1440 y 390, en claro y oscuro. Reglas completas en
`knowledge/RECETAS_LIBRERIAS.md` §5.
