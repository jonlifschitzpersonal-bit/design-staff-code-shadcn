# Síntesis: de las sesiones a hallazgos, JTBD y arquetipos

## Proceso

1. **Extraer observaciones** de cada sesión: una por nota, con ID de sesión y cita textual o descripción de la conducta.
   Etiqueta: observado o dicho.
2. **Agrupar por afinidad** (de abajo hacia arriba): juntá notas que hablan de lo mismo, sin categorías previas.
   Nombrá cada grupo con una frase en primera persona del usuario, no con un tema («No sé si el paciente ya pagó», no
   «Pagos»).
3. **Escribir hallazgos**. Un hallazgo es: **qué pasa + por qué + qué implica para el diseño**, con la evidencia que lo
   sostiene. Una cita suelta no es un hallazgo.
4. **Contar con cuidado**: «4 de 6 participantes del perfil X». No lo conviertas en porcentaje ni en «la mayoría de los
   usuarios».
5. **Buscar lo que contradice**: casos que no encajan, perfiles que se comportan distinto. Se registran, no se borran.

Formato de `03-sintesis.md`:

| ID | Hallazgo | Evidencia (sesiones, citas) | Etiqueta | Confianza (alta / media / baja) | Implicación para el diseño |
| --- | --- | --- | --- | --- | --- |

**Confianza alta**: varias sesiones, conducta observada, sin contradicciones. **Baja**: una sesión, solo dicho, o
contradicho por otra fuente.

## Jobs to be Done

Un job es el progreso que una persona intenta lograr en una situación, independiente de la solución.

**Job statement:** `Cuando <situación>, quiero <motivación>, para <resultado esperado>.`
- La situación es concreta (momento, contexto, desencadenante).
- No menciona el producto ni una feature.
- Bien: «Cuando un paciente llega sin turno y la sala está llena, quiero saber si lo puedo atender hoy, para no
  perderlo ni demorar a los demás». Mal: «Quiero un botón para agregar pacientes».

**Fuerzas del progreso** (por qué alguien cambia o no de solución):

| Empuje (problema actual) | Atracción (nueva solución) | Ansiedad (miedo al cambio) | Hábito (apego a lo actual) |
| --- | --- | --- | --- |

**Job map** (opcional, para jobs funcionales largos): definir → preparar → ejecutar → monitorear → modificar → concluir.
Sirve para encontrar en qué paso del job duele.

Cada job lleva la evidencia que lo sostiene. Un job escrito sin sesiones es **hipótesis**.

## Arquetipos (en vez de personas decorativas)

- Construí arquetipos **por conducta y contexto** (qué hacen, con qué frecuencia, con qué restricciones), no por datos
  demográficos.
- Cada arquetipo lleva: job principal, contexto, conductas observadas, dolores, qué lo haría cambiar, y las sesiones
  que lo sostienen.
- Sin entrevistas, se llaman **proto-arquetipos** y van marcados como hipótesis.
- No inventes nombre, foto, edad ni biografía si no cambian una decisión de diseño.

## Si la síntesis la hace el scout

Pasale las rutas del material crudo y la pregunta de research. Pedile el modo síntesis: devuelve observaciones con cita
y sesión, agrupaciones y hallazgos con confianza. Vos escribís los JTBD y los arquetipos, y revisás que cada cita
exista en el material crudo.
