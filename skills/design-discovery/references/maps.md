# Benchmark, journey map y service blueprint

## Cuál usar

| Herramienta | Responde | No responde |
| --- | --- | --- |
| **JTBD** (síntesis) | Qué intenta lograr la persona | Cómo lo vive paso a paso |
| **Journey map** | Cómo lo vive una persona, etapa por etapa, y dónde duele | Qué hay que cambiar en la operación |
| **Service blueprint** | Quién hace qué detrás de cada paso, con qué sistema, y qué falla | Cómo se siente el usuario |

Orden habitual: JTBD → journey actual → blueprint actual → (oportunidades) → journey y blueprint futuros.
Si hay varios actores o operación fuera de pantalla, el blueprint no es opcional.

## Benchmark (`04-benchmark.md`)

- Elegí 3 a 6 referentes: competidores directos, sustitutos (incluido el papel o la planilla) y un análogo de otra
  industria que resuelva el mismo job.
- Por cada uno: qué job resuelve, cómo lo resuelve en el momento clave, qué patrón vale la pena y qué no copiar.
- Un benchmark es **hipótesis** sobre lo que funciona: no prueba que funcione para tus usuarios.
- Cerrá con: patrones que los usuarios probablemente esperan (convención) y dónde hay espacio para diferenciarse.

## Journey map (`05-situacion-actual.md`, `07-situacion-futura.md`)

Uno por arquetipo y por job. Columnas = etapas; filas:

| | Etapa 1 | Etapa 2 | … |
| --- | --- | --- | --- |
| Qué hace | | | |
| Punto de contacto / herramienta | | | |
| Qué piensa o dice (cita, con sesión) | | | |
| Emoción (↑ → ↓) | | | |
| Dolor | | | |
| Oportunidad | | | |

- El journey **actual** describe lo que pasa hoy, con evidencia. El **futuro** describe la propuesta y es hipótesis
  hasta que se pruebe.
- Marcá el momento de mayor dolor: suele ser donde empieza el diseño.

## Service blueprint

Mismo eje de etapas que el journey, con estos carriles:

| Carril | Contenido |
| --- | --- |
| Evidencia física | Lo que el usuario ve o toca (pantalla, papel, dispositivo, mensaje) |
| Acciones del usuario | Lo que hace el usuario |
| — línea de interacción — | |
| Frontstage | Lo que hace el personal o el sistema a la vista del usuario |
| — línea de visibilidad — | |
| Backstage | Lo que hace el personal o el sistema sin que el usuario lo vea |
| — línea de interacción interna — | |
| Procesos de soporte | Sistemas, terceros, integraciones, políticas |

Agregá por paso: **responsable**, **sistema**, **qué puede fallar** y **qué ve el usuario si falla**. Los puntos donde
un paso depende de otro actor (traspasos) y los que fallan sin que nadie se entere son los candidatos a diseño.
