# Lenguaje claro, accesibilidad cognitiva y localización

## Lenguaje claro

El objetivo es que la persona entienda **a la primera lectura**, en su contexto real (apurada, cansada, con estrés o en
una segunda lengua).

- **Frases cortas**: una idea por frase; alarmá a partir de ~20 palabras.
- **Palabras comunes** en vez de técnicas; si un término técnico es inevitable, explicalo la primera vez.
- **Voz activa** y sujeto claro: «El médico revisa los resultados», no «Los resultados serán revisados».
- **Lo importante primero**: la acción o el hecho al principio de la frase y del bloque.
- **Sin dobles negaciones** ni condiciones anidadas.
- **Números en cifras** y con su unidad.
- **Nivel de lectura**: para público general, apuntá a lectura de escuela primaria alta o secundaria baja. WCAG 2.2
  SC 3.1.5 (AAA) pide un nivel de secundaria inferior o una versión alternativa; tomalo como guía, no como gate.

## Accesibilidad cognitiva y del copy

- **No depender solo del color, de un ícono o del audio**: el estado y el error también se dicen en texto.
- **Labels visibles** y asociados a su campo; el placeholder no es un label.
- **Alt text** que dice la función o el contenido relevante, no «imagen de…»; vacío si es decorativo.
- **Links y botones con sentido fuera de contexto**: «Ver resultados de mayo», no «Clic acá».
- **Orden de lectura**: el texto se entiende en el orden en que lo lee un lector de pantalla.
- **Tiempo**: si hay un límite, se avisa antes y se puede extender, con texto que diga cuánto queda.
- **Contextos de estrés** (salud, finanzas, trámites): una decisión por pantalla, consecuencias explícitas,
  confirmación clara de que algo quedó hecho.
- **Adultos mayores**: términos conocidos, nada de abreviaturas ni anglicismos innecesarios, instrucciones concretas
  («Tocá el botón azul de abajo»), sin depender de gestos aprendidos.

## Localización

- **Diseñá para el texto más largo**: el alemán o el español suelen ocupar ~30% más que el inglés; los botones y las
  etiquetas tienen que poder crecer o partir en dos líneas sin romperse.
- **No armes frases con pedazos** («Tenés » + n + « mensajes»): cada idioma ordena distinto. Usá textos completos con
  variables: «Tenés {count} mensajes».
- **Plurales**: cada idioma tiene sus reglas (algunos tienen más de dos formas); usá formatos de plural (ICU), no
  `if (n == 1)`.
- **Género gramatical**: evitá construcciones que obliguen a concordar con un género desconocido.
- **Fechas, horas, números y monedas** con el formato del locale; nunca hardcodeados en el texto.
- **Íconos y metáforas** culturales (buzón, gestos, colores con significado) se revisan por mercado.
- **Contexto para traducción**: cada texto lleva dónde aparece, límite de caracteres y qué son sus variables
  (tabla «Copy» de `ux.md`).
- **Inglés como fuente**: si el locale primario es inglés y después llega otro idioma, escribí el inglés sin modismos ni
  juegos de palabras que no se traducen.
