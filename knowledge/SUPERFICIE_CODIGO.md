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

**No mide:** hover, estados que la página no carga por URL, la lectura real con un lector de pantalla (anuncios y
movimiento del foco después de una acción), zoom del sistema,
dispositivos reales, animaciones y contraste sobre imágenes. Eso se dice como no comprobable.

## 4. Para la revisión

El critic no tiene navegador. Necesita las capturas de cada estado y viewport, el resumen de medición y las rutas de los
archivos fuente. Una captura sola no alcanza para juzgar tamaños.

**Windows:** `python` no ve `/tmp` de Git Bash. Escribí las salidas dentro del proyecto y pasá rutas relativas.
