# Design Staff Code v2

Un equipo de product design para Claude Code que diseña **directo en código** (React + una librería de componentes
como HeroUI o shadcn/ui). Cuatro agentes que juntos funcionan como un Staff Designer, más un revisor independiente. Sin expedientes,
bitácoras ni informes: cada iniciativa deja solo `brief.md`, `ux.md` y la pantalla funcionando.

Es la versión 2 de [`design-staff-code`](https://github.com/jonlifschitzpersonal-bit/design-staff-code), simplificada
para ser más rápida y gastar menos tokens.

## El equipo

| Agente | Rol | Lee completas | Entrega |
| --- | --- | --- | --- |
| `staff-design-lead` (principal) | **Lead y Product Designer.** Encuadra el problema, decide qué construir, coordina y es el único que habla con vos. | `product-designer` | Encuadre en `brief.md` y un cierre corto en el chat |
| `discovery` | Research: problema, usuarios, JTBD, oportunidades, MVP y métricas. | `design-discovery` y las referencias de evidencia y métricas de `product-designer` | `brief.md` |
| `ux` | Flujos, estructura de pantalla, estados y casos límite, interacción y copy. | `ux-designer-pro` + `patterns-and-flows` y `semantic-accessibility-contract`, `ux-writing`, y las guías de Impeccable `harden`, `clarify` y `onboard` | `ux.md`, con el contrato semántico |
| `ui` | Diseño visual en código, medición en el navegador y accesibilidad. | `ui-designer-pro` + `visual-semantics`, `visual-qa` y `polish-and-craft` (y las demás referencias según la tarea), `design-accessibility`, `MOVIMIENTO.md`, las guías de Impeccable `critique` y `distill`, y la documentación de la librería | La pantalla, medida |
| `design-critic` | Revisión independiente en dos momentos: una pasada corta sobre el encuadre (antes de `ux`) y una al final de cada pantalla o flujo nuevo. | Los checklists de revisión de las skills y la lente de `MOVIMIENTO.md` | Hallazgos: Corregir / Sugerencia / Externo |

Cada especialista lee sus skills completas, pero solo las suyas: ningún agente carga todo el conocimiento.

## Cómo trabajan

| Pedido | Ruta |
| --- | --- |
| Ajuste puntual (un texto, un color, un espaciado) | Lo hace el lead y lo mide. |
| Cambio de flujo, estados o copy | `ux` → `ui` → critic |
| Pantalla o flujo nuevo | Encuadre → critic de encuadre → `ux` → `ui` → critic. Si la dirección visual es nueva, con checkpoint (ver abajo). |
| Producto nuevo o área nueva grande | Discovery → critic de encuadre → `ux` → checkpoint de `ui` → `ui` completo → critic. El agente `discovery` entra si hay que planificar research, si el material es mucho (más de 5 entrevistas, transcripciones, tickets) o si hace falta un journey, un blueprint o un árbol de oportunidades. Si el research es chico, el lead lo sintetiza en el brief. |

1. El lead encuadra en `design/<slug>/brief.md`: problema, resultado, alcance, reglas e hipótesis. En algo nuevo suma
   el volumen por rol, 2 o 3 mecanismos (al menos uno que elimine la tarea) con el elegido, el supuesto más riesgoso,
   la profundidad (núcleo o completo, según la evidencia) y la medición, proporcional.
   El critic revisa ese encuadre en una pasada corta, antes de que se diseñe una sola pantalla.
2. Los especialistas trabajan en orden; ninguno habla con vos: le devuelven sus preguntas al lead. `ux` diseña primero
   el camino de alto volumen y deja la matriz de permisos y el cierre del circuito. Cada uno cierra con `Lecturas: …`.
3. **Checkpoint de dirección visual.** Si la dirección es nueva (producto nuevo, rediseño, sin marca), `ui` construye
   primero solo el esqueleto de la app y la pantalla principal de cada tipo de usuario, con referencias visuales de
   Mobbin por pantalla. El lead te la muestra y espera tu OK antes de construir el resto de los estados.
4. El critic revisa una vez, con una lista priorizada de estados obligatorios, y declara su cobertura. Lo que marca como *Corregir* se aplica siempre, continuando al mismo especialista para no
   volver a leer sus skills.
5. El lead te cuenta qué se hizo, las decisiones discutibles con su porqué, qué cambió por la crítica y qué falta
   decidir.

## Qué trae

| Pieza | Para qué |
| --- | --- |
| `agents/` | Los cinco agentes. |
| `skills/product-designer`, `design-discovery`, `ux-designer-pro`, `ux-writing`, `ui-designer-pro`, `design-accessibility` | El conocimiento senior de cada rol. |
| `skills/project-setup` | Prepara un proyecto: sección de diseño en `CLAUDE.md`, skill `<proyecto>-ds`, medición y capa de pisos. |
| `vendor/impeccable/` | 5 guías de Impeccable (`critique`, `clarify`, `distill`, `harden`, `onboard`), Apache-2.0. |
| `knowledge/SUPERFICIE_CODIGO.md` | Cómo se dibuja y se mide en código, y la base móvil (§5). |
| `knowledge/MOVIMIENTO.md` | La única fuente sobre movimiento: los tres niveles (sobrio, intermedio, expresivo), que el usuario elige en el checkpoint de dirección visual; los límites que valen para cualquier nivel; cómo se configura la librería para cada uno; y cómo se mide. Es la lente de movimiento del critic. |
| `knowledge/RECETAS_LIBRERIAS.md` | Cómo adoptar una librería sin que sus valores por defecto rompan los pisos, en qué orden buscar un componente que falta, y Sonner. |
| `knowledge/LAWS_OF_UX.md` | Leyes de UX con su nivel de evidencia, para consultar a demanda. |
| `knowledge/REFERENCIAS_MOBBIN.md` | Cómo buscar referencias en el MCP de Mobbin, si está instalado: flujo (`ux`), estructura de la app y visual (`ui`, que deja `referencias-visuales.md`). |
| `templates/brief.md`, `templates/ux.md` | Los dos documentos de cada iniciativa. |
| `templates/project/tools/medir.mjs` | Playwright: captura y mide en el DOM real texto, targets, contraste, foco, árbol de accesibilidad y base móvil. Con `--movimiento`, también qué se mueve y cuánto tarda en quedar quieta (al cargar y después de un clic). |
| `THIRD_PARTY_NOTICES.md` | Licencias de lo adaptado: Impeccable (Apache-2.0) y `emilkowalski/skills` (MIT). |
| `templates/librerias/heroui/` | Banco de medición y capa de pisos para HeroUI v3. |
| `templates/librerias/shadcn/` | Banco de medición y capa de pisos, movimiento y toque para shadcn/ui (Tailwind v4), con o sin Animate UI (cómo configurar lo que anima por defecto para cada nivel de movimiento), y un wrapper de ui-sdk para la fecha (lo que shadcn no trae). |

## Instalar

En esta máquina vive en `D:\Escritorio\claude-plugins\design-staff-code-v2` y se declara en el marketplace local
`jony-plugins`:

```
claude plugin marketplace update jony-plugins
claude plugin install design-staff-code-v2@jony-plugins --scope local
```

En otra máquina: cloná el repo y usá `claude --plugin-dir <ruta-del-clon>`.

## Habilitar en un proyecto

En `.claude/settings.local.json`:

```json
{
  "agent": "design-staff-code-v2:staff-design-lead",
  "enabledPlugins": { "design-staff-code-v2@jony-plugins": true }
}
```

Después corré `/design-staff-code-v2:project-setup` y reiniciá Claude Code. No lo habilites junto con `design-staff` ni
con `design-staff-code`: comparten los nombres de las skills.

Fuera del plugin, el proyecto pone Playwright (`npm i -D playwright` y `npx playwright install chromium`) y la
documentación de su librería de componentes.

## Mantener

Lo genérico se cambia acá; lo propio de cada proyecto (su `CLAUDE.md` y su skill `<proyecto>-ds`) vive en el proyecto.
Por cada cambio: subí la versión en `.claude-plugin/plugin.json`, corré `claude plugin validate .`, hacé commit y
`claude plugin update design-staff-code-v2@jony-plugins`.
