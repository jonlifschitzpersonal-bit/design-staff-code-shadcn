# Design sprint: cuándo, qué variante y cómo lo lleva el agente

Un design sprint responde **una pregunta grande en pocos días**: el equipo mapea el problema, bosqueja soluciones
individuales, decide una, la prototipa con calidad suficiente para que parezca real y la prueba con 5 personas reales.
No reemplaza al research: lo concentra alrededor de una apuesta concreta. Para cada técnica suelta (How might we,
Crazy 8s, note-and-vote, storyboard…) y cuándo conviene, ver [workshop-techniques.md](workshop-techniques.md).

Fuentes: Jake Knapp, John Zeratsky y Braden Kowitz, *Sprint* (GV, 2016); AJ&Smart, *Design Sprint 2.0* (con Knapp,
2017–2018); AJ&Smart, *Lightning Decision Jam*.

## Cuándo conviene y cuándo no

**Conviene** cuando se cumplen casi todas:
- hay una **pregunta grande y cara de equivocar**: una apuesta de producto, un flujo nuevo central, un giro de modelo;
- el problema está **suficientemente encuadrado**: se sabe para quién y qué resultado se busca, aunque no cómo;
- hay un **decider** real que puede estar (o delegar con autoridad) y un equipo de 4 a 7 personas que puede reservar
  los días;
- se pueden **reclutar 5 personas del perfil** para el último día;
- equivocarse tarde (después de construir) cuesta mucho más que una semana.

**No conviene** y qué hacer en su lugar:

| Situación | En vez del sprint |
| --- | --- |
| No se sabe quién es el usuario ni qué problema tiene | Discovery: research y síntesis (etapas 1–3). Un sprint sin esa base prueba una solución a un problema supuesto. |
| La decisión es chica o reversible | Decidir y medir; o una Lightning Decision Jam si el equipo está trabado. |
| No hay decider ni tiempo del equipo | Discovery proporcional con el `staff-design-lead`; el sprint sin decider termina en otra reunión. |
| El problema es de ejecución o de pulido de una pantalla | `staff-design-lead`. |
| No se puede testear con personas reales | Se puede hacer la parte de mapa, bosquejo y decisión, pero el resultado sale como **hipótesis** y el brief dice `Validación con usuarios: pendiente`. |
| Hay que comparar muchas oportunidades antes de elegir una | Árbol de oportunidades y mapa de supuestos (etapa 6) primero; el sprint después, sobre la elegida. |

## Variantes

| Variante | Duración | Cuándo elegirla |
| --- | --- | --- |
| **GV clásico** | 5 días: mapa, bosquejo, decisión, prototipo, test | Equipo con tiempo y una pregunta muy incierta; es la versión más completa. |
| **Design Sprint 2.0** (AJ&Smart) | 4 días; el equipo completo solo en los dos primeros | Lo más común hoy: misma lógica con menos tiempo del equipo. Día 1 mapa y bosquejo, día 2 decisión y storyboard, día 3 prototipo, día 4 test. |
| **Remoto** | Igual que la variante elegida, en bloques más cortos | Equipo distribuido. Pizarra compartida (FigJam, Miro), sesiones de 3–4 h, trabajo individual offline, cámaras prendidas en las votaciones. |
| **Lightning Decision Jam** | 60–90 minutos | No es un sprint: destraba un equipo con muchos problemas y opiniones. Lo que funciona → problemas → HMW → votos → soluciones → votos → matriz esfuerzo/impacto → próximas acciones. |
| **Mini sprint / foundation sprint** | 1–2 días | Cuando todavía hay que acordar el objetivo y la apuesta antes de un sprint de solución. Sin prototipo ni test: sale una hipótesis a probar. |

## Roles

- **Decider:** decide cuando el equipo no converge y tiene los *supervotos*. Si no puede estar todo el tiempo, tiene que
  estar en el mapa (día 1) y en la decisión.
- **Facilitador:** maneja tiempos, agenda y proceso; no empuja su solución.
- **Equipo (4–7):** quien sabe del negocio, del cliente, de tecnología, de diseño y de operación.
- **Expertos:** se los entrevista en *Ask the Experts*; no hace falta que se queden.
- **Entrevistador del test:** una persona; el resto observa y toma notas.

## Agenda (GV de 5 días)

| Día | Qué pasa | Salida |
| --- | --- | --- |
| **1 · Mapa** | Objetivo de largo plazo → preguntas del sprint → mapa del recorrido → *Ask the Experts* con notas *How might we* → agrupar y votar HMW → elegir el **target** (un cliente y un momento del mapa). | Objetivo, preguntas del sprint, mapa con target. |
| **2 · Bosquejo** | *Lightning demos* (soluciones de otros, 3 minutos cada una) → bosquejo en 4 pasos, individual y en silencio: notas, ideas, **Crazy 8s**, bosquejo de solución. | Un bosquejo de solución por persona, anónimo. |
| **3 · Decisión** | Museo en silencio → **heat map** → *speed critique* → *straw poll* → **supervoto** del decider → *rumble* (dos soluciones) o *all-in-one* → **storyboard** de 10–15 cuadros. | Solución elegida y storyboard. |
| **4 · Prototipo** | Prototipo de *fachada* con calidad "ricitos de oro": suficiente para que parezca real, nada más. Roles: makers, stitcher, writer, asset collector, interviewer. Ensayo general a la tarde. | Prototipo listo y guion del test. |
| **5 · Test** | 5 entrevistas de una hora, una por vez, con la *five-act interview*: bienvenida, contexto, presentar el prototipo, tareas con empujes mínimos, cierre. El equipo mira y anota; al final, grilla de patrones. | Respuesta a cada pregunta del sprint y próximo paso. |

**Por qué 5 personas:** con 5 participantes de un perfil aparecen la mayoría de los problemas grandes de un flujo
(Nielsen, 2000). Es una señal fuerte para decidir, no una medida de cuántos usuarios lo harían.

## Qué hace el agente

El agente **prepara, facilita y sintetiza**. No reemplaza al equipo, al decider ni a los usuarios.

| Momento | El agente | El equipo / el usuario |
| --- | --- | --- |
| Antes | Arma el encuadre del sprint, propone variante, agenda y lista del equipo; borrador del objetivo de largo plazo, de las preguntas del sprint y del mapa desde lo que ya se sabe; guía de *Ask the Experts*; plan de reclutamiento y guion del test. | Confirma la pregunta, el decider, el equipo y las fechas; recluta. |
| Día 1 | Transcribe y agrupa las notas HMW por afinidad; propone cómo nombrar cada grupo; mantiene el mapa actualizado. | Escribe los HMW, vota, elige el target. |
| Día 2 | Prepara las lightning demos desde el benchmark; da las plantillas de bosquejo y Crazy 8s. | Bosqueja, en silencio y por separado. |
| Día 3 | Registra el heat map, la crítica y los votos; arma el storyboard en limpio con el equipo. | Vota; el decider decide. |
| Día 4 | Escribe el copy y la spec del prototipo; arma el guion de la five-act interview; revisa que el prototipo pruebe las preguntas del sprint. | Construye el prototipo (los agentes `ux` y `ui` pueden armarlo en código). |
| Día 5 | Prepara la grilla de observación; sintetiza los patrones con citas y conteos reales. | Hace las entrevistas y observa. |
| Después | Responde cada pregunta del sprint (sí / no / no se sabe), registra decisión y próximo paso, y lleva el resultado al design brief. | Decide qué sigue. |

**Límites, sin excepción:**
- La IA **no vota** en lugar del equipo ni **decide** en lugar del decider.
- La IA **no simula** el test. Sin 5 personas reales, el sprint termina en hipótesis.
- Los bosquejos de la IA, si se usan como semilla, se presentan como **una propuesta más etiquetada "IA"**, nunca como
  la del equipo.

## Equipo chico o diseñador solo

Un sprint con una o dos personas pierde su ventaja principal, que es la diversidad de soluciones. Si igual conviene:
- el **decider tiene que ser una persona real** (cliente o product owner), aunque sea solo en el mapa y la decisión;
- sumá al menos un experto por entrevista;
- las alternativas de la IA cuentan como un participante más, etiquetado; los votos son solo de personas;
- registrá en `sprint.md` que fue un **sprint reducido**, con qué faltó y qué pasó a ser hipótesis.

## Dónde vive y conexión con el discovery

- El sprint vive en `design/<slug>/discovery/sprint.md`: objetivo de largo plazo, preguntas del sprint, mapa,
  target, votos, storyboard, resultado del test y decisión, uno por encabezado.
- Las etapas que cubre el sprint remiten a `sprint.md`: benchmark (lightning demos), situación actual (mapa), situación
  futura (storyboard) y baja fidelidad (prototipo y test). Las que no se hicieron se declaran con
  `**Etapa salteada:**` y su consecuencia.
- Las etiquetas de evidencia siguen valiendo: lo del test es **observado** o **dicho**; el mapa armado por el equipo sin
  usuarios, el storyboard y las respuestas a preguntas que no se probaron son **hipótesis** o **inferido**.
- Si el sprint ocurre dentro de una iniciativa de diseño, sus mecanismos alimentan la elección del agente `ux`.
