# Recetas para librerías de componentes

Cómo adoptar una librería (HeroUI, shadcn, MUI…) como sistema de diseño sin que sus valores por defecto rompan los
pisos del proyecto. Lo usa `project-setup` al armar las skills del DS, y el lead al diseñar. La superficie es la de
`SUPERFICIE_CODIGO.md`.

## 1. Medir la librería sin personalizar (el «banco»)

Las skills `-components` y `-tokens` no se escriben de memoria ni desde la documentación sola: se miden. El **banco** es
una página que renderiza cada componente que el producto podría usar, con el tema por defecto, fuera de `src/` para que
no entre en el build (`tools/banco/`). Con `tools/medir.mjs` se obtiene, componente por componente:
- qué texto queda bajo el piso de tamaño y qué controles bajo el piso de target;
- qué pares de color no llegan a AA y qué campos, casillas e interruptores no se distinguen del fondo (WCAG 1.4.11);
- qué controles no muestran foco con el teclado.

Si el proyecto usa HeroUI v3 o shadcn/ui, hay un banco hecho en `templates/librerias/heroui/` o `templates/librerias/shadcn/`.
Para otra librería, armalo igual:
un `<section data-bloque="<componente>">` por componente, para poder medir uno solo con `--selector` y `--crop`.
Ese resultado es lo que va en la tabla «Valores por defecto que NO cumplen los pisos» de `<proyecto>-components`.

## 2. Una sola capa de pisos, en el tema

Se corrige **una vez**, en la capa de tema, no pantalla por pantalla:
- **Texto.** Las librerías basadas en Tailwind v4 usan `--text-xs`, `--text-sm` y `--text-base` para casi todo. Subir esas
  tres variables en `@theme` corrige todo el texto de la librería de una vez. El texto sin clase hereda del `body`:
  también hay que fijarlo.
- **Targets.** Mínimo de alto en el selector de cada control (`.button`, `.input`, `.tabs__tab`…) con `min-height` y
  `height: auto`. Ojo con los breakpoints: HeroUI **baja** el alto de los botones desde 768 px (36 px), así que un piso
  probado en móvil falla en tablet. Medí en todos los viewports del alcance.
- **Color.** Remedí los pares por defecto; los que fallan se reemplazan por la variable de tema (no por un hex suelto en
  la pantalla). Un campo sin borde necesita su variable de borde, no una sombra.

La plantilla `templates/librerias/heroui/banco/pisos-propuestos.css` es un ejemplo completo para HeroUI v3.

**Costo que hay que decir en voz alta.** Igualar los tamaños de texto **aplana la jerarquía por tamaño**: la ayuda y las
etiquetas pasan a medir igual que el cuerpo. Se recupera con peso, color y espacio, o con una escala propia por encima
del piso. Es una decisión de diseño: va en «Decisiones» del brief y en la skill `<proyecto>-ds`, con su razón.

## 3. Trampas conocidas al medir (ya resueltas en `medir.mjs`, útiles al leer sus resultados)

- **Colores `oklch()`**: Tailwind v4 y HeroUI los usan. Un parser que solo entienda `rgb()` los omite sin avisar.
- **Controles nativos ocultos**: las librerías ponen un `<input>` o `<select>` invisible debajo del control. El control
  que ve y toca la persona es la etiqueta o el rol: es lo que se mide.
- **Fondos translúcidos** (chips «soft», alertas): se componen sobre la primera capa opaca de más arriba. Solo imagen o
  degradado es «no comprobable».
- **Valores resueltos según el modo**: con `color-mix()` y transparencias, el valor «claro» que declara la librería puede
  engañar en oscuro. Lo que cuenta es el color que el navegador calcula en cada modo, con la captura tomada en ese modo.
- **`get_theme_variables` del MCP de HeroUI** puede devolver incompleto el modo claro. Contrastalo con la medición.
- **Windows:** `python` no ve `/tmp` de Git Bash. Escribí las salidas dentro del proyecto (`--out design/...`) y pasá
  rutas relativas.

## 4. shadcn/ui y Animate UI

shadcn no es un paquete: los componentes se copian a `src/components/ui/` y son del proyecto. Cambia cómo se aplica todo
lo anterior (medido con el preset Nova, ver `templates/librerias/shadcn/README.md`):
- **El gancho es `data-slot`, no una clase de rol.** Los estilos son utilidades de Tailwind dentro del componente; una regla
  sin capa en el tema (`[data-slot="button"] { min-height: 2.75rem }`) le gana a esas utilidades. Se sigue corrigiendo
  una sola vez, en el tema. Editar el componente es válido, pero entonces el banco y la skill `<proyecto>-ds` tienen
  que reflejarlo.
- **Con `asChild`, el `data-slot` del disparador reemplaza al del `Button`.** Un `PopoverTrigger asChild` o un
  `TooltipTrigger asChild` que envuelve un `Button` deja `data-slot="popover-trigger"`, y una regla solo por
  `[data-slot="button"]` no lo alcanza (un botón de 32 px siguió ahí con la capa aplicada). Los disparadores se cubren
  con `[data-slot$="-trigger"]`; la X del diálogo (`dialog-close`) y las opciones del select (`select-item`) llevan su
  propia regla. Por eso el banco tiene `?abierto=`: los overlays solo existen abiertos y hay que medirlos.
- **El texto suelto no lo alcanza `--text-*`.** El preset usa tamaños arbitrarios (`text-[0.8rem]` en el botón `sm`):
  van por `data-slot`.
- **El foco no llega a 3:1 por defecto.** El aro es `ring-ring/50`, de mitad de opacidad. No se arregla subiendo `--ring`
  (con 50 % de opacidad casi no cambia): hace falta un contorno opaco. Medí `aroBajo3` en el banco, que es lo que revela
  el problema.
- **Casilla e interruptor** son botones visibles de Radix: `medir.mjs` mide el botón, no la etiqueta que lo envuelve, así
  que no hay CSS que los lleve al piso sin deformarlos. Rehacelos en el componente con un área táctil propia o declará
  la excepción.
- **Animate UI** (`@animate-ui/react` + `motion`) cambia el import de la primitiva de cada componente por su versión
  animada y quita las clases de animación CSS que Motion reemplaza; no cambia estructura ni estilos, así que los pisos
  siguen valiendo. Corré `npx @animate-ui/cli@latest animate all --dry-run` antes de aplicarlo. El movimiento sale de la
  librería: no se escribe a mano. Respeta «reducir movimiento»; `medir.mjs` mide con esa preferencia activa y las
  capturas salen en estado final. **El movimiento en sí no se mide**: se dice como no comprobable.

## 5. Qué no cubre

Hover, estado seleccionado, estado con error y modo oscuro solo se miden si la página se carga en ese estado: abrilo por
URL o parámetro y corré `medir.mjs` de nuevo. El lector de pantalla, el zoom del sistema y el orden real de lectura no
los mide ninguna herramienta de este plugin.
