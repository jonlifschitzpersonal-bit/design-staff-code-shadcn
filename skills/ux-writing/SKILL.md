---
name: ux-writing
description: >-
  UX writing y content design senior para cualquier proyecto: voz y tono, microcopy por tipo de mensaje (botones,
  errores, estados vacíos, confirmaciones y acciones destructivas, onboarding, notificaciones, formularios, estados de
  sistema), lenguaje claro y accesibilidad cognitiva, glosario y consistencia de términos, localización y tabla de textos
  para desarrollo. Usar al escribir o revisar el texto de una pantalla, flujo, estado o componente; cuando el copy es
  nuevo o cambió; al definir la voz de un producto; o cuando se pregunte «cómo digo esto», «qué pongo en este botón /
  error / estado vacío».
---

# UX writing

Las palabras son parte de la interacción: el usuario actúa según lo que entiende. Un buen texto de interfaz dice **qué
pasó, qué importa y qué hacer ahora**, con las palabras del usuario y en el tono que su estado pide. Se escribe
**mientras se diseña**, en la misma pantalla, no después.

## Qué tomás del proyecto

- **Voz, tono y glosario** del proyecto, si existen (por defecto, `design/knowledge/VOZ_Y_GLOSARIO.md`). Mandan sobre
  esta skill. Si no existen, proponé una voz con [references/voice-tone-and-glossary.md](references/voice-tone-and-glossary.md)
  y marcala como propuesta, no como regla.
- **Idioma** de lo que ve el usuario y el cliente, **locale primario** y locales futuros (`CLAUDE.md`).
- **Audiencia**: edad, contexto, estrés, conocimiento del dominio, condiciones (baja visión, pérdida auditiva, lectura
  en segunda lengua).
- **Reglas de dominio** sobre lo que se puede afirmar (clínico, legal, financiero). El copy nunca promete más de lo que
  el producto o la fuente sostienen.

## Proceso

1. **Leé el recorrido entero**, no strings sueltos: de dónde viene el usuario, qué acaba de hacer, qué sigue.
2. **Por cada estado, fijá la jerarquía del mensaje**: el único hecho que necesita ahora, la acción disponible y lo que
   puede esperar después. Todo lo demás compite.
3. **Escribí con el patrón del tipo de mensaje** ([references/microcopy-patterns.md](references/microcopy-patterns.md)).
4. **Ajustá el tono al estado emocional**: error, riesgo, espera, éxito o rutina (tabla en la referencia de voz).
5. **Recortá**: cada palabra tiene que cambiar lo que el usuario entiende o hace. Primero sale lo que repite el título,
   el «por favor» de relleno y las introducciones.
6. **Probá el texto en condiciones reales**: el largo más largo y más corto, otro idioma (+30%), lector de pantalla, el
   texto a su ancho real en la pantalla ([references/plain-language-and-localization.md](references/plain-language-and-localization.md)).
7. **Registrá los términos nuevos** en el glosario y los textos finales en la tabla «Copy» de `ux.md`.

## Reglas que no se negocian

- **El botón dice lo que hace**: verbo + objeto («Guardar cambios», «Enviar resultados»), nunca «OK», «Sí» o «Aceptar»
  cuando la acción tiene consecuencias. El mismo verbo en el título, el botón y la confirmación.
- **Un error dice qué pasó, por qué si ayuda y cómo seguir**, cerca de donde ocurrió, sin culpar al usuario y sin
  códigos internos como mensaje principal.
- **Una acción destructiva o irreversible nombra la consecuencia** («Se borran los 47 resultados»), con un botón que
  repite la acción; si se puede deshacer, se ofrece deshacer en vez de preguntar.
- **El estado vacío lleva a una acción útil** y explica por qué está vacío cuando no es obvio.
- **Las palabras del usuario, no las internas**: nada de nombres de estados, campos, tablas, `snake_case` o jerga del
  equipo en la UI.
- **Un concepto, un término**: si en una pantalla es «turno», no es «cita» en la siguiente.
- **Ningún texto depende solo del color, de un ícono o del audio** para transmitir su significado.
- **No prometer**: ni validación, ni resultados, ni tiempos, ni seguridad que el producto o la fuente no sostengan.
- **El copy de la IA es una propuesta**: si el texto toca una regla de dominio, una promesa al cliente o un término
  legal, se escala con una propuesta, no se decide.

## Revisión del copy (checklist)

- [ ] ¿Se entiende qué pasó, qué importa y qué hacer, leyendo solo el título y el botón?
- [ ] ¿Cada botón nombra su acción y coincide con el título y la confirmación?
- [ ] ¿Los errores dicen cómo seguir y aparecen donde ocurrieron?
- [ ] ¿Las acciones destructivas nombran la consecuencia?
- [ ] ¿Los estados vacío, carga, error y éxito tienen texto, y el tono es el que pide cada uno?
- [ ] ¿Los términos coinciden con el glosario y entre pantallas?
- [ ] ¿Hay jerga interna, nombres de estados o de campos?
- [ ] ¿Cabe con el texto más largo y en otro idioma (+30%)? ¿Plurales, fechas y números?
- [ ] ¿Se entiende con lector de pantalla (labels, alt, orden) y sin depender del color o del audio?
- [ ] ¿El nivel de lectura es el de la audiencia? ¿Hay frases de más de ~20 palabras?
- [ ] ¿Algún texto promete algo que la fuente no sostiene?

Cuando el copy es nuevo o cambió, esta revisión va **antes** de la lente `clarify` de Impeccable, y lo que cambia se
aplica en `ux.md`.

## Entrega

- El copy va en la pantalla, en el idioma del cliente.
- Lo que desarrollo o traducción necesitan (claves, límites de caracteres, variables, plurales, notas de contexto) va
  en la tabla de textos del documento de entrega, nunca como anotación en el canvas.
- Las preguntas de copy al cliente van cortas, sin jerga y con la propuesta de texto ya escrita.
