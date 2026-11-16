---
name: design-discovery
description: Métodos y estándar mínimo de la fase previa al diseño visual (discovery) para un producto nuevo o un área nueva grande. Encuadre, plan de research y guía de entrevista, síntesis de entrevistas, JTBD, arquetipos, benchmark, journey map, service blueprint, árbol de oportunidades, mapa de supuestos, MVP y métricas, design sprint (GV, 2.0, remoto, Lightning Decision Jam) y técnicas de taller (How might we, Crazy 8s, note-and-vote, heat map, storyboard, five-act interview), arquitectura de información, user flows, story map, user stories con criterios de aceptación, wireframes y test de usabilidad, y el design brief que se entrega antes de diseñar. Usar con el agente discovery, o cuando el pedido sea "investigar antes de diseñar", "hacer research", "armar JTBD / journey / blueprint / user stories / brief", "hacer un design sprint" o "qué técnica uso para…".
---

# Discovery: lo que pasa antes de diseñar

Discovery responde **qué problema vale la pena resolver, para quién, y qué tiene que ser cierto para que la solución
funcione**. Termina en un **design brief**: el documento con el que se empieza a diseñar. No produce pantallas finales.

## Cuándo es una fase completa y cuándo no

- **Producto nuevo o área nueva grande** (otro actor, otra app, otro modelo operativo): se eligen las etapas que
  reducen la incertidumbre más grande. Las que no se hacen quedan marcadas (ver «Etapas salteadas»).
- **Feature dentro de un producto que ya existe**: discovery proporcional. Hacé solo las etapas que reducen la
  incertidumbre dominante.
- **Ajuste de una pantalla**: no hay discovery.
- **Una pregunta grande, encuadrada, con decider y 5 personas para testear**: un **design sprint** de 4–5 días
  (`references/design-sprint.md`). Vive en `design/<slug>/discovery/sprint.md` y cubre benchmark, situación actual,
  situación futura y baja fidelidad.

Para elegir una técnica de taller (How might we, Crazy 8s, note-and-vote, heat map, storyboard, Lightning Decision
Jam, pre-mortem…) según lo que necesita el grupo, ver `references/workshop-techniques.md`.

## Etapas y entregables

| # | Etapa | Pregunta | Qué sale | Guía |
| --- | --- | --- | --- | --- |
| 0 | Encuadre | ¿Qué se quiere lograr, con qué límites, quién decide? | encuadre en el brief | este archivo |
| 1 | Plan de research | ¿Qué necesitamos saber y de quién? | plan + guía de entrevista | `references/research.md` |
| 2 | Campo | ¿Qué hacen y dicen las personas reales? | registro de sesiones + material crudo | `references/research.md` |
| 3 | Síntesis | ¿Qué patrones hay? ¿Qué intentan lograr? | hallazgos, JTBD, arquetipos | `references/synthesis.md` |
| 4 | Benchmark | ¿Cómo lo resuelven otros, qué patrones esperan? | patrones de referencia | `references/maps.md` |
| 5 | Situación actual | ¿Cómo se vive hoy y qué lo sostiene detrás? | journey + blueprint | `references/maps.md` |
| 6 | Oportunidades | ¿Qué conviene resolver primero y cómo sabremos si funcionó? | árbol, supuestos, MVP, métricas | `references/definition.md` |
| 7 | Situación futura | ¿Cómo debería funcionar? | journey futuro, IA, flujos de alto nivel | `references/definition.md` |
| 8 | Alcance construible | ¿Qué se construye y en qué orden? | story map + user stories | `references/definition.md` |
| 9 | Baja fidelidad | ¿Se entiende el flujo antes de pulirlo? | wireframes + test | `references/research.md` |
| 10 | **Design brief** | ¿Qué se diseña, para quién, con qué límites y qué sigue siendo hipótesis? | `design/<slug>/brief.md` | `references/design-brief.md` |

Leé la guía de cada etapa que hagas. El único entregable obligatorio es el **brief** (`templates/brief.md` del
plugin). Lo demás se guarda en `design/<slug>/discovery/` solo si alguien lo va a usar (por ejemplo, la guía de
entrevista que el equipo lleva a campo). Los flujos detallados y las pantallas son del agente `ux`.

### Etapa 0 · Encuadre

Antes de planificar research, dejá por escrito:
- el objetivo de negocio y por qué ahora;
- quién patrocina, quién decide y quién puede vetar;
- usuarios y actores que se sospecha que intervienen (incluí los que operan detrás: soporte, operaciones, terceros);
- restricciones: plazos, presupuesto, plataforma, regulación, idioma, accesibilidad;
- lo que ya se cree saber, escrito como **supuestos**;
- qué decisión tiene que habilitar este discovery y para cuándo.

Si falta el objetivo de negocio o quién decide, es lo primero que se pregunta. Llevá una propuesta.

## Etiquetas de evidencia (obligatorias)

Cada afirmación sobre usuarios, mercado u operación lleva una etiqueta:

| Etiqueta | Significa | Ejemplo de fuente |
| --- | --- | --- |
| **observado** | se vio a una persona real hacerlo | sesión de campo, test, grabación, dato de uso |
| **dicho** | una persona real lo dijo | entrevista, ticket, reunión con cita |
| **inferido** | conclusión del equipo a partir de lo observado o dicho | síntesis |
| **hipótesis** | nadie lo comprobó todavía | supuesto, benchmark, opinión de un stakeholder, salida de IA |

Reglas:
- **La IA no genera evidencia de usuarios.** Usuarios sintéticos, entrevistas simuladas o un walkthrough de IA producen,
  como mucho, **hipótesis**. Tienden a devolver los supuestos del equipo y no sorprenden.
- **Nunca inventes participantes, citas, cifras ni sesiones.** Si no hay campo, la síntesis queda vacía y se dice.
- Lo que dice un stakeholder sobre los usuarios es **hipótesis** hasta que se contrasta con usuarios.
- Un recuento («4 de 6») indica cuántos de los entrevistados, no un porcentaje del mercado.

## Etapas salteadas

Saltear es legítimo (no hay acceso a usuarios, no hay tiempo, ya existe la evidencia). Pero se declara:

```
**Etapa salteada:** <motivo>. Consecuencia: <qué pasa a ser hipótesis>.
```

- Si se saltea la etapa **2 (campo)**, todo lo de las etapas 3 a 8 sobre usuarios es **hipótesis**.
- Si se saltea la etapa **9 (test)**, los flujos del brief son **hipótesis no probadas**.
- En los dos casos, el brief dice `**Validación con usuarios:** pendiente` y lleva la prueba que lo resolvería.

## Brief «listo para diseñar»

Se puede pasar a diseño (`ux` y `ui`) cuando el brief tiene:
1. problema y usuarios, con la etiqueta de evidencia de cada afirmación decisiva;
2. JTBD principales;
3. objetivos y métricas de éxito;
4. alcance del MVP (historias priorizadas) y lo que queda afuera;
5. flujos clave y arquitectura de información;
6. restricciones y principios de diseño derivados de hallazgos;
7. una tabla de supuestos críticos, cada uno con la prueba más barata que lo resolvería;
8. riesgos y preguntas abiertas con responsable.

Lo que falte no bloquea por sí solo: queda escrito como hipótesis o pregunta abierta. Lo que sí bloquea es presentar
una hipótesis como validada.

## Formato

- Los entregables internos van en el idioma del equipo. Los que ve el cliente (journey, blueprint, brief si se
  comparte) van en el idioma que indique el `CLAUDE.md` del proyecto.
- Los mapas se escriben como tablas Markdown.
- Preferí tablas cortas a prosa larga. Cada entregable tiene que poder leerse solo.
