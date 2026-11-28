# Superficie: código

El sistema diseña **directo en código** (React u otro framework web con una librería de componentes), sin Figma. El
artefacto es la aplicación corriendo. Un tamaño, un color o un contraste solo cuenta como medido si salió de
`tools/medir.mjs` (Playwright) sobre la pantalla real.

## 1. Antes de escribir un componente

- Consultá la documentación de la librería del proyecto (su `llms.txt`, su MCP o la fuente que diga la skill
  `<proyecto>-ds`) para **cada componente que vayas a usar**.
- **No reinventes lo que la librería ya trae.** Un componente propio solo se justifica si la librería no tiene ese rol.

## 2. Dibujar

- Cada pantalla es una ruta. Cada **estado** (vacío, cargando, error, texto largo, muchos ítems, sin permiso) se abre
  directo por URL, por ejemplo `?estado=vacio`. Si un estado no se puede abrir, no se puede medir ni revisar.
- Si el producto tiene modo oscuro, que también se pueda forzar por URL (por ejemplo `?tema=oscuro`): `medir.mjs` mide
  la página tal como carga.
- **Datos de muestra realistas**, con los casos difíciles: el nombre más largo, el recuento más alto, otros formatos.
- **Los valores por defecto de la librería no cumplen los pisos del proyecto** (típicamente texto de 14 px y controles
  de 36 a 40 px). Se corrigen **una sola vez, en la capa de tema**, no pantalla por pantalla. Ver `RECETAS_LIBRERIAS.md`.
- Solo tokens y la escala tipográfica del tema. Nada de valores sueltos (`#1a73e8`, `text-[17px]`) en una pantalla: si
  falta un token, se agrega a la capa de tema.

## 3. Medir

Con el servidor de desarrollo levantado, desde la raíz del proyecto, por cada estado y viewport:

```
node tools/medir.mjs --url "http://localhost:5173/<ruta>?estado=<estado>" --name <pantalla>-<estado>-<ancho> \
  --out design/<slug>/capturas --width 390 --height 844 --min-text <piso> --min-target <piso> --strict
python "${CLAUDE_PLUGIN_ROOT}/skills/design-accessibility/scripts/contrast.py" --json design/<slug>/capturas/<name>.contraste.json
```

`medir.mjs` imprime un **resumen** (texto bajo el piso, targets bajo el piso, contraste no textual, foco con teclado y
desborde horizontal) y genera junto a la captura:
- `<name>.png`: captura a 2x de página completa (o recortada con `--selector "<css>" --crop`);
- `<name>.medidas.json`: el detalle de cada texto y control. Abrilo solo para lo que el resumen marca como falla;
- `<name>.contraste.json`: pares de color para `contrast.py`;
- `<name>.contraste-no-comprobable.json`, si existe: textos sobre imagen o degradado, que quedan **no comprobables**;
- `<name>.aria.yml`: el árbol de accesibilidad (rol, nombre accesible, estado y orden), para compararlo con el contrato
  semántico de `ux.md`. Un control sin nombre accesible es una falla con `--strict`. Requiere Playwright 1.49 o
  posterior.

`--strict` sale con código 1 si algo queda bajo los pisos. Después de medir, **mirá la captura** con `Read`: la medición
dice si cumple, no si se ve bien.

**Movimiento.** La medición normal emula «reducir movimiento» y captura el estado final, así que no ve lo que se mueve.
- **En la pantalla principal de cada familia,** sumá `--movimiento`: abre la página con las animaciones activas y
  registra, cuadro a cuadro, qué se mueve y cuándo queda quieta. Deja `<name>.movimiento.json`.
- **En la acción frecuente** (una pestaña, un filtro), `--movimiento-clic "<css>"`.
- **Cómo leerlo:** un `!` rompe un límite que vale para cualquier nivel de movimiento; un `·` es un hecho que se compara
  con el nivel aprobado del proyecto. El criterio está en `MOVIMIENTO.md`.

**Base móvil.** `medir.mjs` también revisa, siempre, lo que el código ya delata (§5):
- **zoom bloqueado:** es falla;
- **`env(safe-area-inset-*)` sin `viewport-fit=cover`;**
- **en anchos de teléfono:** que falte `theme-color` y los campos de menos de 16 px.
- **Para simular el notch y el indicador de inicio,** `--safe-area 47,34`.

**No mide:** hover, estados que la página no carga por URL, la lectura real con un lector de pantalla (anuncios y
movimiento del foco después de una acción), zoom del sistema, dispositivos reales, cómo se siente el movimiento y
contraste sobre imágenes. Eso se dice como no comprobable.

## 4. Para la revisión

El critic no tiene navegador. Necesita lo siguiente, porque una captura sola no alcanza para juzgar tamaños ni
movimiento:
- las capturas de cada estado y viewport;
- el resumen de medición, con el de movimiento si se corrió;
- las rutas de los archivos fuente.

**Windows:** `python` no ve `/tmp` de Git Bash. Escribí las salidas dentro del proyecto y pasá rutas relativas.

## 5. Base móvil (si el producto se usa en un teléfono)

Son las pocas cosas que separan «una web en el navegador» de algo que se siente instalado. Va **una vez**, en
`index.html` y en la capa de tema, antes de la primera pantalla. Adaptado de `mobile-native` (`emilkowalski/skills`,
MIT) y probado en el banco.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="<fondo claro>" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="<fondo oscuro>" media="(prefers-color-scheme: dark)" />
```

- **`viewport-fit=cover`:** sin esto, en iOS `env(safe-area-inset-*)` vale 0 y toda regla que lo use no hace nada.
  - Con esto, el borde seguro se resuelve donde hace falta: la barra superior fija
    (`padding-top: env(safe-area-inset-top)`), la barra inferior fija
    (`padding-bottom: max(0.75rem, env(safe-area-inset-bottom))`), lo que se posiciona encima de ella (toasts) y el
    `scroll-padding` del documento.
  - En el banco, el toast se le superponía 7 px a la barra fija hasta que su margen sumó el área segura.
- **`theme-color`:** uno por esquema, con el color del borde superior de la app (el fondo de la barra), no el de la
  marca.
  - Si el tema se elige a mano (una clase, no la preferencia del sistema), el código que cambia el tema actualiza las
    metas.
  - Si el color de fondo cambia, hay que cambiarlo en los dos lugares.
- **`touch-action: manipulation`** en lo interactivo (`a`, `button`, `input`, `label`, `select`, `textarea`,
  `[role=button]`, `[role=tab]`, `[role=option]`, `[role=switch]`): el toque no espera al doble toque.
- **Nunca bloquear el zoom** (`user-scalable=no`, `maximum-scale=1`). Si iOS hace zoom al enfocar un campo, la causa es
  que tiene menos de 16 px.
- **El teclado y el contenido:** `inputmode`, `enterkeyhint` y `autocomplete` en cada campo. Los botones llevan
  `user-select: none`, el texto de contenido no.
- **Alto:** `100dvh` para lo que sigue al área visible (el contenedor de la app); `100svh` para lo que no puede quedar
  cortado (un hero).
- **Lo que ya dan Tailwind 4 y shadcn:** el hover limitado a `(hover: hover)`, sin el destello al tocar y
  `text-size-adjust`. No se repite.
- **Se decide por proyecto:**
  - `interactive-widget=resizes-content`: en Android hace subir la barra fija con el teclado;
  - `overscroll-behavior: none`: solo si la app tiene sus propios contenedores con scroll, no si es un documento.
- **Solo en un teléfono real:** el efecto de las áreas seguras, `theme-color`, el toque, el teclado y el hover pegado.
  La emulación de Chromium no los reproduce: aplica `env()` aunque falte `viewport-fit`. Se dicen como no comprobables
  hasta probarlos en un teléfono.
