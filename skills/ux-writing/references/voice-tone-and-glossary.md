# Voz, tono y glosario

**La voz** es la personalidad estable del producto: no cambia. **El tono** es cómo se ajusta esa voz al momento y al
estado de la persona: cambia todo el tiempo. Un producto con voz «clara y cálida» suena distinto al confirmar un turno
que al informar un error en un resultado.

## Definir la voz de un proyecto

Si el proyecto no tiene voz definida, proponé una (marcada como propuesta) en `design/knowledge/VOZ_Y_GLOSARIO.md`:

1. **3 atributos** de voz, cada uno con lo que **es** y lo que **no es**:

   | Atributo | Es | No es |
   | --- | --- | --- |
   | Claro | frases cortas, una idea por frase | telegráfico, frío |
   | Cálido | trata a la persona como alguien capaz | infantil, empalagoso |
   | Preciso | dice exactamente qué pasa | técnico, con jerga |

2. **Tratamiento**: tú / vos / usted, o tuteo vs. formal en inglés (contracciones, «we» del producto o impersonal).
3. **Persona gramatical del producto**: «guardamos tus cambios» o «tus cambios se guardaron».
4. **Mayúsculas**: sentence case o title case en títulos y botones; una sola regla.
5. **Puntuación**: punto final en frases completas, no en botones ni labels; signos de exclamación casi nunca.
6. **Números y formatos**: cifras siempre en número, formato de fecha y hora del locale.

Las fuentes de la voz son la marca, los usuarios (sus palabras en entrevistas y tickets) y el dominio. La opinión del
agente no alcanza para fijarla: es una propuesta hasta que el responsable la confirma.

## Tono según el momento

| Momento | Tono | Hacé | Evitá |
| --- | --- | --- | --- |
| Error grave o pérdida | serio, directo, tranquilizador | decir qué se conservó y cómo seguir | humor, «¡Ups!», culpar |
| Riesgo o acción irreversible | sobrio, explícito | nombrar la consecuencia | suavizar hasta que no se entienda |
| Espera o incertidumbre | calmo, informativo | decir qué pasa y cuánto falta | promesas de tiempo que no se cumplen |
| Salud, dinero, datos personales | respetuoso, preciso | lenguaje simple, sin alarmar ni minimizar | diminutivos, entusiasmo |
| Rutina frecuente | neutro, breve | lo mínimo | ceremonia, celebración |
| Primer logro | cálido | reconocer y mostrar el próximo paso | exagerar |

## Glosario

El glosario evita que el mismo concepto tenga tres nombres. Una fila por término:

| Término (UI) | Definición | Usalo para | No uses | Traducción / otros locales |
| --- | --- | --- | --- | --- |
| <término> | <qué es para el usuario> | <contexto> | <sinónimos a evitar, nombre interno> | <en / pt…> |

Reglas:
- el término de UI sale de cómo lo dicen los usuarios, no del modelo de datos;
- el nombre interno (de base de datos, de estado, del equipo) se anota en «No uses», para que nadie lo filtre a la UI;
- un término nuevo entra al glosario en la misma pasada en que entra a una pantalla;
- si dos áreas del producto llaman distinto a lo mismo, es una contradicción: se registra y se propone uno.
