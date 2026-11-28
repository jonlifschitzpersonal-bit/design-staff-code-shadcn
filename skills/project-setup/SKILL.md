---
name: project-setup
description: >-
  Prepara un proyecto para design-staff-code-v2 en una sesión: sección de diseño en CLAUDE.md, skill del sistema de
  diseño del proyecto, medición con Playwright (tools/medir.mjs), banco de la librería y capa de pisos en el tema. Usar
  cuando se instala el plugin en un proyecto, cuando se pide «configurá el proyecto», o cuando el lead detecta que falta
  la skill <proyecto>-ds.
---

# Preparar un proyecto

Plantillas en `${CLAUDE_PLUGIN_ROOT}/templates/`. Reglas:
- **No pises lo que existe.** Si un archivo ya está, sumá solo lo que falta.
- **No inventes.** Lo que no se sabe queda como `<pendiente: qué falta y quién lo sabe>`.
- **No instales nada sin preguntar** (paquetes, navegadores, servidores MCP).
- No hagas commit salvo que el usuario lo pida.

## 1. Mirar el proyecto

Leé `package.json` (framework, librería y versión, comandos de dev y build), la capa de tema y el `CLAUDE.md` si existe.

## 2. Preguntar lo que falta (una ronda, con una opción por defecto en cada pregunta)

- Producto, para quién, y viewports a medir.
- Pisos de texto y de target (propuesta por defecto: 16 px y 44 px; más altos si la audiencia lo pide).
- Idioma y locale de lo que ve el usuario.
- Quién decide diseño y producto, y si hay un dominio que se escala (legal, clínico, financiero).

## 3. Medición

1. Copiá `templates/project/tools/medir.mjs` a `tools/medir.mjs`. Necesita `playwright` como dependencia de desarrollo y
   Chromium (`npx playwright install chromium`): proponelo antes de instalarlo.
2. Si hay un banco para la librería en `templates/librerias/<librería>/` (hoy: `heroui` y `shadcn`; el segundo se elige si hay
   un `components.json`), copialo a `tools/banco/` y revisá que los imports coincidan con lo instalado. El banco de shadcn
   importa `@/components/ui/*`: comprobá que el alias `@` exista en `vite.config` y `tsconfig`. Un banco que no carga
   no mide nada: `medir.mjs` lo avisa y sale con código 3.
3. Medí el banco sin personalizar y con `?pisos`, en los viewports del proyecto (ver `knowledge/RECETAS_LIBRERIAS.md`).

## 4. Capa de pisos

Con lo que falló en el banco, proponé la capa de pisos (`banco/pisos-propuestos.css` es el ejemplo, ajustado a los pisos
del proyecto). Aplicala a la capa de tema de `src/` **solo si el usuario la aprueba**, y decí qué jerarquía de tamaños
se aplana.

En la misma propuesta van dos cosas más:
- **La capa de movimiento** (§5 de la plantilla de shadcn): `transition-all` → propiedades explícitas.
- **La base móvil, si el producto se usa en un teléfono** (`knowledge/SUPERFICIE_CODIGO.md` §5):
  - `viewport-fit=cover`;
  - `theme-color` por esquema;
  - `touch-action`.

Si la librería rompe por defecto los límites de `knowledge/MOVIMIENTO.md` §2 (un resorte que no se queda quieto, una
secuencia al cambiar de pestaña), proponé corregirlo una vez. El **nivel de movimiento** (sobrio, intermedio o
expresivo) no se decide acá: es dirección visual y se elige en el checkpoint. Hasta entonces, la sección «Movimiento»
de la skill DS dice «nivel: pendiente».

## 5. Generar

| Plantilla | Destino |
| --- | --- |
| `project/CLAUDE.md` | sección «Diseño» de `CLAUDE.md` |
| `project/skills/ds/SKILL.md` | `.claude/skills/<proyecto>-ds/SKILL.md`, completada con la documentación de la librería y lo medido |
| `project/dotclaude/settings.local.json` | `.claude/settings.local.json` (fusionar; no borrar claves existentes) |

Si el marketplace no se llama `jony-plugins`, ajustá la clave de `enabledPlugins` (`claude plugin list` lo muestra).

**Impeccable.** `ui` hace su pasada final con el plugin Impeccable (`distill`, `clarify` y `polish`), y la plantilla lo
habilita. Si `claude plugin list` no muestra `impeccable@impeccable`, proponé instalarlo:
`claude plugin marketplace add pbakaus/impeccable` y `claude plugin install impeccable@impeccable`. No corras su `init`
ni su `document`: el producto vive en `brief.md` y el sistema, en la skill `<proyecto>-ds`.

## 6. Entrega

En pocas líneas: qué se creó, qué quedó pendiente y con quién, y que hay que **reiniciar Claude Code** si el plugin se
habilitó recién.
