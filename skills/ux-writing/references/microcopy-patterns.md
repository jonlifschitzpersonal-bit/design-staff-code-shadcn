# Patrones de microcopy por tipo de mensaje

Cada patrón: **qué tiene que lograr**, **estructura**, **ejemplo** (mal → bien) y **error común**. Los ejemplos están en
español para ilustrar; el texto real va en el idioma del producto y con su voz.

## Botones y acciones

- **Logra:** que el usuario sepa qué pasa al tocarlo.
- **Estructura:** verbo + objeto, 1–3 palabras. El primario dice el resultado; el secundario, la alternativa real.
- **Ejemplo:** «OK» / «Cancelar» → «Enviar pedido» / «Seguir editando».
- **Error común:** «Sí / No» en un diálogo cuya pregunta hay que releer para entender qué significa cada uno.

## Títulos y encabezados

- **Logra:** orientar en un vistazo: dónde estoy o qué tengo que decidir.
- **Estructura:** el tema o la tarea, no el nombre de la función. En un diálogo, la pregunta o la acción.
- **Ejemplo:** «Gestión de dispositivos» → «Elegí la tablet para esta sala».
- **Error común:** repetir en el texto de abajo lo que ya dice el título.

## Errores

- **Logra:** que el usuario salga del problema.
- **Estructura:** qué pasó (en sus palabras) + cómo seguir. El porqué, solo si ayuda a resolverlo. Junto al campo o a la
  acción que falló.
- **Ejemplos:**
  - «Error 403» → «No tenés permiso para ver estos resultados. Pedile acceso a quien administra la cuenta.»
  - «Entrada inválida» → «Escribí la fecha como día/mes/año, por ejemplo 05/11/1958.»
  - «Algo salió mal» → «No pudimos guardar. Revisá la conexión; tus respuestas siguen acá.»
- **Errores de conexión:** decir qué se conservó y qué no; ofrecer reintentar.
- **Error común:** culpar («Ingresaste mal…»), dramatizar («¡Ups!» en un error grave) o mostrar el código como mensaje.

## Validación de formularios

- **Logra:** prevenir antes que corregir.
- **Estructura:** el formato esperado va en el label o la ayuda, visible antes de escribir; el error dice cómo
  arreglarlo y aparece al salir del campo, no al primer carácter.
- **Error común:** el placeholder como única instrucción (desaparece al escribir y suele tener poco contraste).

## Estados vacíos

- **Logra:** que el vacío sea un punto de partida.
- **Tipos y estructura:**
  - *Primera vez*: qué va a aparecer acá + la acción para empezar.
  - *Sin resultados*: qué se buscó + cómo ampliar o corregir.
  - *Todo resuelto*: confirmar que no falta nada; sin acción forzada.
  - *Sin permiso o sin datos todavía*: por qué y cuándo cambia.
- **Ejemplo:** «No hay datos» → «Todavía no hay pacientes en espera. Cuando alguien haga el check-in, aparece acá.»
- **Error común:** el mismo texto genérico para los cuatro tipos.

## Confirmaciones y acciones destructivas

- **Logra:** que el usuario decida sabiendo la consecuencia, o que pueda deshacer.
- **Estructura:** título con la acción («¿Borrar esta evaluación?») + la consecuencia concreta + botón que repite la
  acción («Borrar evaluación») + alternativa («Conservar»).
- **Preferí deshacer a confirmar** cuando la acción es frecuente y reversible: «Evaluación archivada · Deshacer».
- **Error común:** «¿Estás seguro?» sin decir de qué, o confirmaciones en acciones triviales (el usuario aprende a
  aceptar sin leer).

## Éxito y confirmación de resultado

- **Logra:** cerrar la tarea y mostrar el próximo paso.
- **Estructura:** qué quedó hecho + qué sigue (si algo sigue).
- **Ejemplo:** «¡Listo!» → «Resultados enviados al médico. Te avisamos cuando los revise.»
- **Error común:** celebrar una acción rutinaria; la ceremonia baja con la frecuencia.

## Carga y espera

- **Logra:** que la espera no parezca un error.
- **Estructura:** qué está pasando + cuánto falta si se sabe + qué puede hacer mientras.
- **Rangos:** menos de ~1 s, sin texto; 1–10 s, indicador y qué se hace; más de ~10 s, progreso y estimación.
- **Error común:** «Cargando…» durante 30 segundos sin cambiar.

## Onboarding y ayuda en contexto

- **Logra:** enseñar en el momento en que hace falta, no antes.
- **Estructura:** una idea por paso, con el beneficio para el usuario; la ayuda junto al control que explica.
- **Error común:** un tour inicial con información que se necesita más tarde (la gente lo saltea).

## Notificaciones

- **Logra:** que valga la pena interrumpir.
- **Estructura:** el hecho + por qué le importa + la acción. Lo más importante en las primeras ~40 caracteres (se
  truncan).
- **Error común:** notificar algo que no requiere atención ni acción.

## Permisos

- **Logra:** que el usuario entienda para qué se pide antes del diálogo del sistema.
- **Estructura:** para qué se usa + qué pasa si no lo da.
- **Error común:** pedirlo al abrir la app, sin contexto.

## Labels, placeholders y ayudas

- **Label:** siempre visible, sustantivo corto. **Ayuda:** formato, por qué se pide o qué pasa con el dato.
  **Placeholder:** ejemplo opcional, nunca la única instrucción.
- **Campos opcionales:** marcá lo opcional, no lo obligatorio, si la mayoría es obligatoria (y viceversa).

## Estados de sistema y etiquetas de estado

- **Logra:** que el estado se entienda sin leer la documentación.
- **Estructura:** adjetivo o participio en el idioma del usuario («En espera», «Listo para revisar»), con el mismo
  término en lista, detalle y notificación. Nunca el nombre interno del estado.
- **Error común:** estados que solo se distinguen por color.
