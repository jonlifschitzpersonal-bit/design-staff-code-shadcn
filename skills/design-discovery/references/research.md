# Research con personas: plan, entrevistas, campo y test

## Elegir el método

Dos ejes (NN/g, Rohrer): **lo que la gente dice vs. lo que hace**, y **por qué / cuánto**. Lo que dicen y lo que hacen
suelen diferir; para decisiones de diseño, pesa más lo que hacen.

| Necesitás saber… | Método | Cuándo no |
| --- | --- | --- |
| Cómo trabajan hoy, en su contexto, con sus herramientas | Indagación contextual / observación | Si no podés acceder al lugar: entrevista con demostración en pantalla compartida |
| Qué intentan lograr, qué los frustra, qué usaron antes | Entrevista semiestructurada | No sirve para validar si una solución funciona |
| Qué tan frecuente es algo que ya entendiste | Encuesta / datos de uso | Nunca para descubrir el problema: solo mide lo que ya sabés preguntar |
| Si entienden y completan un flujo | Test de usabilidad moderado | Antes de tener un flujo: probá el problema, no la UI |
| Cómo agrupan y nombran el contenido | Card sorting / tree testing | Si el producto tiene pocas secciones |
| Qué hacen los que operan detrás | Shadowing de soporte u operaciones | — |

## Plan de research (`01-plan-de-research.md`)

1. **Decisión que habilita**: qué vamos a decidir con esto.
2. **Preguntas de research** (3 a 6). Son lo que el equipo necesita saber, no lo que se le pregunta al usuario.
   Buena: «¿Cómo deciden hoy cuándo derivar a un paciente?». Mala: «¿Les gustaría una app para derivar?».
3. **Participantes**: perfiles, criterio de inclusión y exclusión, cuántos (5 a 8 por perfil suele mostrar los
   patrones principales en entrevistas cualitativas), cómo se los recluta y quién lo hace.
4. **Método y lugar** de cada sesión, duración, quién conduce y quién toma notas.
5. **Consentimiento y datos**: qué se graba, dónde se guarda, cómo se anonimiza. Si el dominio es sensible (salud,
   finanzas, menores), no se guardan datos identificables en el repo.
6. **Supuestos que el research puede romper**: los del encuadre.
7. **Calendario y responsable.**

## Guía de entrevista

Estructura: apertura (contexto y consentimiento) → contexto del rol → **la última vez que…** → herramientas y
alternativas → dolores y workarounds → cierre («¿qué te debería haber preguntado?»).

Reglas:
- Preguntá por **conducta pasada concreta**: «Contame la última vez que…». No por intenciones futuras («¿usarías…?»)
  ni por opiniones sobre una idea.
- Preguntas abiertas, una por vez, sin la respuesta adentro. Mal: «¿Te resulta lento el proceso?». Bien: «¿Cómo fue
  ese proceso?».
- No presentes la solución hasta el final, y si la presentás, separala del resto de la sesión.
- Pedí que muestren: la planilla, el papel, la pantalla que usan hoy.
- Repreguntas: «¿Por qué?», «¿Qué pasó después?», «¿Cómo lo resolviste?», «¿Qué alternativa probaste?».
- Las cifras que dé el entrevistado («lo hago 20 veces por día») se registran como **dicho**, no como dato.

## Registro de campo (`02-campo.md`)

Una fila por sesión: ID anónimo (P1, P2…), perfil, fecha, método, quién condujo, dónde está el material crudo. El
material crudo va en `fuentes/` (transcripción, notas) o se enlaza si vive afuera. Sin material crudo, no hay cita.

**La IA no conduce ni simula sesiones.** Prepara la guía, ordena el material y sintetiza; las sesiones las hacen
personas.

## Test de usabilidad (etapa 9)

- **Tareas** realistas, escritas como objetivo, sin el nombre del botón: «Registrá a un paciente nuevo que llegó sin
  turno», no «Tocá Nuevo paciente».
- **Criterio de éxito** por tarea, definido antes: completó sin ayuda / con ayuda / no completó.
- 5 participantes por perfil para encontrar los problemas principales de un flujo.
- Registrá lo **observado** (dónde dudó, qué tocó, qué dijo en voz alta), no la nota que se pone.
- Resultado: tabla `Tarea | Éxito (n/N) | Problema observado | Severidad (bloquea / demora / cosmético) | Cambio`.

Un walkthrough de IA sobre los wireframes sirve para detectar problemas evidentes antes del test. No es un test.
