# Design brief: el cierre de discovery

El design brief (`design/<slug>/brief.md`, plantilla `templates/brief.md` del plugin) es el documento con el que
empieza el diseño. Lo lee alguien que no participó del discovery (el `staff-design-lead`, los agentes `ux` y `ui`,
el cliente) y tiene que entender, sin preguntar:
- qué se diseña y para quién;
- por qué eso y no otra cosa;
- qué está probado y qué es apuesta;
- qué no se puede romper.

## Reglas

- **Corto**: 1 a 2 páginas. Resume y enlaza; no repite las etapas. Cada afirmación decisiva enlaza su etapa o fuente.
- **Etiquetas de evidencia** en lo decisivo (observado / dicho / inferido / hipótesis).
- La línea `**Validación con usuarios:**` es una de tres: `realizada` (hubo campo y test), `parcial` (hubo campo, no
  test, o al revés) o `pendiente` (no hubo campo). Si dice `pendiente` o `parcial`, la sección de supuestos críticos
  dice qué prueba lo resuelve.
- **Principios de diseño**: 3 a 5, cada uno derivado de un hallazgo y escrito para poder decidir entre dos opciones
  («Primero el estado del paciente, después las acciones», no «Simple e intuitivo»).
- **Lo que el diseño tiene que resolver primero**: el momento de mayor dolor o riesgo, no la pantalla de inicio.
- Si se va a compartir con el cliente, va en el idioma del cliente y sin jerga interna.

## Uso posterior

- El `staff-design-lead` y los agentes `ux` y `ui` lo toman como punto de partida y no rehacen el discovery. Si el
  encargo de diseño contradice el brief, lo señalan.
- El brief se actualiza si el diseño o un test cambian un hallazgo, un supuesto o el alcance. El cambio se anota en
  una línea en «Decisiones».
