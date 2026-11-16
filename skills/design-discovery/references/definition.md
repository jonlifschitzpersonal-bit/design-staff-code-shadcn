# Oportunidades, estructura y alcance construible

## Árbol de oportunidades (`06-oportunidades.md`)

Basado en el Opportunity Solution Tree de Teresa Torres:

```
Resultado buscado (métrica de producto o de negocio)
└── Oportunidad (necesidad, dolor o deseo del usuario, con evidencia)
    └── Solución candidata (2 o 3 por oportunidad, no una sola)
        └── Prueba del supuesto más riesgoso
```

- Las oportunidades salen de la síntesis y del journey, escritas desde el usuario («No sé si…», «Pierdo tiempo en…»),
  no como features.
- Compará al menos dos soluciones por oportunidad prioritaria, incluida una sin pantalla o con un cambio de proceso.

## Mapa de supuestos

Por cada solución candidata, listá qué tiene que ser cierto:

| Supuesto | Tipo (deseable / usable / factible / viable / ético o regulatorio) | Importancia | Evidencia actual | Prueba más barata | Responsable |
| --- | --- | --- | --- | --- | --- |

Probá primero los de **alta importancia y poca evidencia**. Una prueba barata puede ser: una pregunta al dueño del
dominio, cinco entrevistas focalizadas, un prototipo de papel, un dato de uso existente.

## Priorización, MVP y métricas

- Priorizá oportunidades por: impacto en el resultado, cantidad y fuerza de la evidencia, frecuencia del dolor,
  costo de no hacerlo y esfuerzo estimado. Dejá el criterio escrito; no uses una fórmula como si fuera objetiva.
- **MVP**: el conjunto mínimo de historias que permite probar el resultado con usuarios reales. Lo que queda afuera
  se escribe explícitamente.
- **Métricas**: una métrica de resultado (lo que cambia para el negocio o el usuario), 1 o 2 de conducta (lo que hacen
  en el producto) y una de salud (lo que no debe empeorar). Cada una con línea de base si existe, o «sin línea de base».

## Arquitectura de información y user flows (`07-situacion-futura.md`)

- **Modelo de objetos**: los objetos del dominio (paciente, turno, informe…), sus estados y quién los crea o modifica.
  Antes de las pantallas.
- **Arquitectura de información**: secciones, jerarquía y nombres, con el vocabulario de los usuarios (sale de la
  síntesis; si hay dudas, card sorting).
- **User flows** de los jobs principales: entrada → pasos → decisión → salida, incluyendo **caminos de error,
  interrupción y recuperación**, y los traspasos entre actores o dispositivos.

## Story map y user stories (`08-historias.md`)

**Story map** (Jeff Patton): columnas = actividades del usuario en orden (la columna vertebral del journey futuro);
filas = historias por prioridad. La primera franja horizontal completa es el MVP.

**User story**: `Como <arquetipo>, quiero <acción>, para <resultado>.` Ligada a un job y a una oportunidad.

**Criterios de aceptación** (Given/When/Then), incluidos los estados no felices:

```
Dado que <contexto>
Cuando <acción>
Entonces <resultado observable>
```

Cada historia cubre: camino principal, vacío, error, sin conexión o permiso si aplica, y textos largos. Chequeo INVEST:
independiente, negociable, valiosa, estimable, chica, testeable. Si una historia no se puede probar, está mal escrita.

Formato:

| ID | Actividad | Historia | Job / oportunidad | Prioridad (MVP / después) | Criterios de aceptación | Evidencia |
| --- | --- | --- | --- | --- | --- | --- |
