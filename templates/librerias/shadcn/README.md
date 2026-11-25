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
- **No medido:** modo oscuro (`--input` es blanco al 15 %), hover, seleccionado, y el movimiento de Animate UI.

## Animate UI

`npm i @animate-ui/react motion` y `npx @animate-ui/cli@latest animate all --dry-run` (después sin `--dry-run`): cambia el
import de la primitiva de cada componente shadcn por su versión animada y quita las clases de animación CSS que Motion
reemplaza. No toca estructura, estilos ni API. `medir.mjs` mide con «reducir movimiento» activo por defecto, para no
medir una entrada a medio hacer; `--motion` captura con animación, pero el movimiento no se evalúa.
