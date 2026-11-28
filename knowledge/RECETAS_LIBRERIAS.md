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
  librería: no se escribe a mano. **Sus curvas ya son buenas; lo que fallan son dos tiempos por defecto**, que rompen
  los límites de `MOVIMIENTO.md` §2 en cualquier nivel:
  - el resorte de `CountingNumber` no se queda quieto en 12 s;
  - `TabsContent` hace salir un panel y recién después entrar el otro.

  Cómo se configura cada pieza para el nivel de movimiento del proyecto está en `MOVIMIENTO.md` §5. Se mide con
  `medir.mjs --movimiento`.
- **Capa de movimiento.** shadcn trae `transition-all` en Button, Badge, el acordeón y en los disparadores con `asChild`
  (que heredan el del Button). Se corrige una vez, por `data-slot`, como los pisos:
  `templates/librerias/shadcn/banco/pisos-propuestos.css` §5.
- **Toasts: Sonner** (`sonner`, el que trae shadcn). Un solo `<Toaster />`, montado en la raíz.
  - **`theme`:** por defecto es `light` y no sigue al sistema. Pasale el tema resuelto.
  - **Estilos:** Sonner inyecta su CSS después del tema, así que la capa le gana con un prefijo (`html [data-sonner-toast]`).
    Para un toast del sistema de diseño, lo recomendado es `toast.custom()`: sin estilos de Sonner, con su
    posicionamiento.
  - **Acción con «Deshacer»:** `action: { label, onClick }`.
  - **En móvil, si hay una barra fija abajo,** `mobileOffset` la esquiva sumando el área segura
    (`SUPERFICIE_CODIGO.md` §5).
  - **Un toast que no aparece** suele ser un `<Toaster />` desmontado.
  - **Un toast que aparece dos veces** suele ser dos `<Toaster />`.

## 5. Lo que la librería no trae: ui-sdk

**Antes de buscar afuera,** se busca en este orden. Lo que el proyecto ya tiene instalado manda; el orden decide solo
para lo que falta.
1. **La librería del proyecto** (shadcn: `npx shadcn@latest add <nombre>`).
2. **Animate UI,** si el proyecto lo usa y el componente existe animado.
3. **ui-sdk,** para un comportamiento difícil (abajo).
4. **Una librería de nicho** para el resto:
   - **Virtuoso** para listas o tablas de más de unas mil filas;
   - **dnd kit** para arrastrar y soltar, siempre con una alternativa por clic (WCAG 2.5.7);
   - **cmdk** para la paleta de comandos (ya la usa shadcn en `command`);
   - **Vaul** para drawers con gesto (ya la usa shadcn en `drawer`);
   - **input-otp** para códigos de verificación.

No se suman otras primitivas (Base UI, React Aria) al lado de Radix, ni otra librería para animar números (NumberFlow):
duplican comportamiento y suman choques.

Cuando falta un componente con **comportamiento difícil** (fecha tipeable con calendario, combobox tipeable, número o
monto con formato, o cualquier patrón APG con foco, teclado y ARIA propios), no se escribe a mano: ahí aparecen los bugs
de foco, de teclado y de parseo. Se usa **ui-sdk** (`@ui-sdk/react` + `@ui-sdk/core`, https://ui-sdk.dev):
comportamiento headless sin estilos, con la documentación dentro del paquete (`node_modules/@ui-sdk/react/docs/` y la
skill `node_modules/@ui-sdk/core/skills/ui-sdk/SKILL.md`). Leé el doc del componente antes de usarlo.

- **Cuándo no:** para lo que la librería ya trae (diálogo, select, popover, tabs…). Duplica comportamiento, pesa y suma
  choques. Con la fecha fueron unos 47 kB comprimidos por un solo componente.
- **Instalación:** `npm i @ui-sdk/react @ui-sdk/core` con **versión fija** (es beta), y `@layer ui-sdk;` como primera
  línea del CSS del tema, encima de `@import "tailwindcss"`, para que su CSS mínimo quede por debajo del nuestro.
- **Envolvé cada componente en uno del proyecto** (`src/components/<nombre>.tsx`) que le pone los tokens y los pisos y
  resuelve los choques una sola vez. Las pantallas usan el wrapper, nunca ui-sdk directo. Se estiliza con Tailwind sobre
  sus `data-slot` y atributos de estado (`data-open`, `data-disabled`, `data-today`, `data-outside`, `aria-invalid`).
  Ejemplo medido: `templates/librerias/shadcn/ui-sdk/campo-fecha.tsx`.
- **Choques con shadcn (Radix)**, encontrados probando en el navegador:
  - **Escape dentro de un Dialog o Sheet de Radix cierra el diálogo entero** y se pierde el formulario: Radix toma
    Escape en la captura de `document` y ui-sdk recibe el evento ya consumido. El wrapper controla `open` y, mientras el
    popup está abierto, resuelve Escape antes, con un `keydown` en la captura de `window`. Probá las dos: la primera
    Escape cierra el popup y devuelve el foco al disparador; la segunda cierra el diálogo.
  - **La variante `data-selected:` no funciona:** `shadcn/tailwind.css` la redefine como `[data-selected="true"]` (por
    cmdk) y ui-sdk marca con el atributo sin valor. Usá `aria-selected:`. Las demás variantes de shadcn (`data-open`,
    `data-disabled`, `data-active`, `data-checked`) aceptan el atributo sin valor.
- **Pisos:** el disparador lleva `data-slot="…-trigger"`, así que la capa de shadcn ya lo lleva a 44 px; las celdas del
  calendario y los botones de mes van en el wrapper (`size-11`). `medir.mjs` no abre popups: medí el popup abierto con
  un script propio de Playwright (tamaño de las celdas, texto, foco al abrir y al cerrar).
- **Movimiento:** ui-sdk anima con CSS (`data-starting-style` y `data-ending-style`). Si el proyecto exige que el
  movimiento salga de Animate UI, el popup va sin animación y se dice; si permite CSS en estos popups, se anima ahí. Lo
  decide el proyecto y queda en su skill `<proyecto>-ds`.
- **Lo que no da:** nada visual. Todo el estilo es del proyecto.

## 6. Qué no cubre

Hover, estado seleccionado, estado con error y modo oscuro solo se miden si la página se carga en ese estado: abrilo por
URL o parámetro y corré `medir.mjs` de nuevo. El lector de pantalla, el zoom del sistema y el orden real de lectura no
los mide ninguna herramienta de este plugin.
