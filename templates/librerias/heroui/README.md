# Plantillas para HeroUI v3 (Tailwind v4)

Plantillas de arranque para un proyecto que adoptó HeroUI v3 como sistema de diseño. `project-setup` las copia cuando
detecta esa librería. Probadas con HeroUI 3.2.7: **revisalas contra la versión que instaló el proyecto**.

| Archivo | Va a | Qué es |
| --- | --- | --- |
| `banco/index.html`, `banco/main.tsx` | `tools/banco/` | **Banco de medición.** Una página con cada componente de HeroUI sin personalizar. No entra en `npm run build` (queda fuera de `src/`). Con `?pisos` carga la capa de pisos en lugar del tema del proyecto. |
| `banco/pisos-propuestos.css` | `tools/banco/` | **Capa de pisos** (texto ≥ 18 px, controles ≥ 48 px, colores a AA). Es el antes/después de la medición y el borrador de lo que irá a la capa de tema. |

Uso, con el servidor de desarrollo levantado:

```
node tools/medir.mjs --url http://localhost:5173/tools/banco/index.html        --name banco-390 --out design/knowledge/mediciones
node tools/medir.mjs --url "http://localhost:5173/tools/banco/index.html?pisos" --name pisos-390 --out design/knowledge/mediciones
node tools/medir.mjs --url http://localhost:5173/tools/banco/index.html --selector "[data-bloque=button]" --crop --name button
```

La primera muestra qué incumple la librería tal como viene; la segunda, qué queda después de la capa de pisos. Cada
bloque del banco tiene `data-bloque="<componente>"`, así que `--selector` mide un componente solo. Ver
`knowledge/RECETAS_LIBRERIAS.md`.
