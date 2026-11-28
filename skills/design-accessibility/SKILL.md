---
name: design-accessibility
description: >-
  Control de accesibilidad para pantallas diseñadas en código (o en un screenshot) en cualquier proyecto: WCAG 2.2 AA
  en lo que se puede verificar en la pantalla que corre, contraste, tamaños de texto y de toque MEDIDOS en el DOM real
  con Playwright (`tools/medir.mjs`), estados, foco, errores, timeouts y notas para desarrollo. Aplica además las
  reglas de accesibilidad propias del proyecto si existen. Devuelve una tabla cumple/falla/no comprobable con
  correcciones. Usar SIEMPRE antes de entregar una pantalla, flujo, estado o componente visual; cuando se pregunte por
  accesibilidad, contraste, tamaño de texto o de toque; y como lente de accesibilidad dentro de una crítica de diseño.
  No edita código por sí sola y no es una auditoría de código ni reemplaza una prueba con lector de pantalla.
---

# Accesibilidad en diseño (en código)

Es una **sola pasada**: forma parte de la revisión visual y no agrega una ronda. **Medí; no estimes.** Todo número que
reportes sale de lo que el navegador calculó sobre la pantalla real (`tools/medir.mjs`, ver
`${CLAUDE_PLUGIN_ROOT}/knowledge/SUPERFICIE_CODIGO.md`), y el contraste de los pares que salen de ahí, pasados por
`${CLAUDE_PLUGIN_ROOT}/skills/design-accessibility/scripts/contrast.py`. Lo que el agente «sabe» que la librería hace por
defecto no vale: los valores por defecto de las librerías suelen quedar bajo los pisos del proyecto.

## 0. Reglas del proyecto

Antes de medir, buscá si el proyecto tiene reglas de accesibilidad propias. Pueden estar en su `CLAUDE.md`, en su
skill de pipeline o de diseño, o en su design system. Por ejemplo:
- tamaños mínimos de texto;
- pisos de targets;
- pares de color ya validados;
- errores conocidos del DS;
- necesidades de su audiencia.

Esas reglas **se suman** a WCAG y mandan cuando son más exigentes. Si no hay ninguna, usá esta skill sola y decilo.

## 1. Medir (una vez, read-only)

Corré `tools/medir.mjs` sobre cada estado y viewport del alcance (comando y salidas en `SUPERFICIE_CODIGO.md`, sección
«Medir»). Del DOM real leés:
- el **modo** o tema (claro u oscuro) con el que se tomó la captura;
- los colores **resueltos** de texto y de su fondo (`.contraste.json`);
- el tamaño y el peso de cada texto (`.medidas.json`);
- el **área tocable** de cada control: el rectángulo del control que ve la persona, no el del ícono ni el del
  `<input>` nativo oculto (`targets` en `.medidas.json`); la distancia al control vecino se mide aparte si el proyecto
  la exige;
- el **contraste no textual** de campos, casillas, radios e interruptores (`noTexto`), y el **foco con teclado**
  (`foco`: recorrido con `Tab`, indicador visible y contraste del aro). Ambos los mide `medir.mjs`;
- los estados presentes: default, seleccionado, deshabilitado y error. Hover, seleccionado y error se miden si la página
  se carga en ese estado (por URL o parámetro); el foco ya lo recorre `medir.mjs`;
- el copy visible.

Después medí cada par fondo/primer plano relevante:

```sh
python "${CLAUDE_PLUGIN_ROOT}/skills/design-accessibility/scripts/contrast.py" --json <name>.contraste.json
# El JSON lo genera tools/medir.mjs: [{"name": "button \"Guardar\"", "fg": "#ffffff", "bg": "#1f5f86", "size": 16, "bold": true}, ...]
# Bordes de control, íconos con significado, focus ring, líneas de gráfico: "kind": "non-text" (se agregan a mano).
# Rápido: python ".../contrast.py" "#71717a" "#ffffff"
```

- Si el primer plano tiene alfa, el script lo compone sobre el fondo.
- Un fondo con imagen, gradiente o transparencia lo marca `medir.mjs` como **no comprobable** (archivo
  `.contraste-no-comprobable.json`). Medilo a mano en su punto más desfavorable, o dejalo como no comprobable.
- Si solo hay un screenshot (sin la app), estimá los colores con el cuentagotas sobre la imagen y marcá cada valor como
  «medido sobre screenshot».
- No vuelvas a medir los pares que el proyecto ya declara validados, salvo en un modo o tema donde figuren sin
  validar.

## 2. Criterios WCAG 2.2 AA verificables en la pantalla que corre

| Criterio | Qué se verifica en la pantalla | Umbral |
| --- | --- | --- |
| 1.4.3 Contraste de texto | Cada texto contra su fondo real | 4.5:1; 3:1 si es ≥24px, o ≥18.66px bold |
| 1.4.11 Contraste no textual | Borde de input, checkbox y toggle; ícono que comunica; focus ring; líneas y marcadores de gráfico | 3:1 contra lo adyacente |
| 1.4.1 Uso del color | Estado, error, selección, categoría o severidad nunca solo por color: suman forma, ícono o texto | Sin excepción |
| 2.5.8 Tamaño de target | Área tocable de cada control | ≥24×24 CSS px, o separación equivalente |
| 2.4.7 / 2.4.11 Foco visible y no tapado | Con `Tab`, cada control muestra su foco y ningún elemento sticky lo cubre (captura con el foco puesto) | Ring ≥3:1 |
| 1.3.1 / 1.3.2 Estructura y orden | Encabezados, agrupación y orden de lectura coherentes con el visual | Va anotado en las notas para desarrollo |
| 2.4.6 / 3.3.2 Encabezados, labels e instrucciones | Labels persistentes y visibles (el placeholder no es un label); instrucción antes del campo | — |
| 3.3.1 / 3.3.3 Errores | El error dice qué falló y cómo corregirlo, junto al campo, no solo en rojo | — |
| 3.3.7 / 3.3.8 Entrada redundante y autenticación accesible | No pedir dos veces el mismo dato; el login o la verificación no exigen memoria ni transcripción compleja | — |
| 2.2.1 Tiempo ajustable | Todo timeout o expiración de sesión avisa y permite extender | — |
| 2.5.7 Arrastre | Toda acción de arrastre tiene una alternativa por toque o clic | — |
| 1.4.4 / 1.4.10 / 1.4.12 Texto ampliado, reflow y espaciado | El layout aguanta texto al 200% y traducciones ≈30% más largas sin cortar ni solapar | — |
| 1.4.13 Contenido en hover | Los tooltips y popovers se pueden descartar, se pueden recorrer y persisten | — |
| 2.5.3 Label en el nombre | El nombre accesible empieza con el texto visible | Va en las notas para desarrollo |
| 1.1.1 Contenido no textual | Íconos solos, imágenes y gráficos tienen un texto alternativo definido | Va en las notas para desarrollo |
| 3.2.3 / 3.2.4 Consistencia | La misma función tiene el mismo nombre, ícono y lugar en todas las pantallas | — |
| 2.3.1 Destellos | Nada parpadea más de 3 veces por segundo | — |
| 2.2.2 Pausar, detener, ocultar | Lo que se mueve, parpadea o se actualiza solo durante más de 5 s (carrusel, marquesina, contador en vivo) se puede pausar o detener | — |
| 2.3.3 (AAA, recomendado) y «reducir movimiento» | Con `prefers-reduced-motion: reduce` el movimiento es menos y más suave, no cero: quedan opacidad y color, se van desplazamiento, escala y rebote, y los datos aparecen con su valor final (`MOVIMIENTO.md` §4) | `medir.mjs` mide con esa preferencia; `--movimiento`, sin ella |
| 1.4.4 Zoom | El viewport nunca bloquea el zoom (`user-scalable=no`, `maximum-scale=1`): si iOS hace zoom en un campo, la causa es un texto de menos de 16 px | `medir.mjs` lo marca como falla |
| 1.2.x / 1.4.2 Media y audio | Los videos tienen subtítulos; el audio que suena solo se puede pausar; la información no depende solo del sonido | — |

**Targets.** WCAG pide un piso de 24×24. Las guías de plataforma recomiendan más:
- **44×44 pt** en iOS (Apple HIG);
- **48×48 dp** en Android (Material).

Usá la recomendación de la plataforma, salvo que el proyecto fije otra cosa. Los px CSS que mide el navegador no son pt
ni dp ni mm: sin conocer la escala o la densidad del dispositivo, no los conviertas, y el criterio queda **no
comprobable**. Para web móvil, tratá el piso del proyecto en px CSS.

## 3. Según la audiencia (si el brief la define)

- **Adultos mayores o baja visión:** texto de cuerpo más grande que el mínimo, alto contraste, poco texto y una
  decisión por pantalla, targets por encima del recomendado de la plataforma y nada que exija precisión ni rapidez.
- **Personas con pérdida auditiva:** nada comunicado solo por audio; todo evento sonoro con su equivalente visual;
  videos con subtítulos.
- **Baja destreza motora:** sin gestos complejos ni arrastres obligatorios; targets amplios y bien separados.
- **Carga cognitiva alta o contextos de estrés** (salud, finanzas): copy simple, una acción primaria, confirmación o
  deshacer en lo irreversible y sin presión de tiempo.

## 4. Salida

Para tu propio control (al lead le pasás solo las fallas que quedaron y lo no comprobable):

| Criterio | Elemento (selector o texto) + captura | Medido (valor del JSON) | Resultado | Corrección |
| --- | --- | --- | --- | --- |

- El **Resultado** es `cumple`, `falla` o `no comprobable` (falta un dato, o falta el estado en la app).
- Toda `falla` lleva una corrección concreta: el token o la variable de tema que la resuelve, el tamaño o el copy.
- Las fallas de forma o de copy propio se corrigen en la misma pasada. Si la corrección toca un componente de la
  librería que usan otras pantallas, hacela en la capa de tema (una vez) y volvé a medir todas las pantallas afectadas.

**Notas para desarrollo.** En esta superficie el diseño ya es código: lo que antes era una nota pasa a ser parte del
componente (nombre accesible, orden de foco, `aria-live`). Avisá al lead solo lo que quedó **sin
implementar** o se decidió distinto:
- el nombre accesible de cada ícono o botón sin texto;
- el orden de foco y de lectura, si difiere del visual;
- el texto alternativo de imágenes y gráficos;
- qué cambios de estado se anuncian (live region);
- el comportamiento de los timeouts.

## Límites

- No reemplaza una prueba con lector de pantalla ni con usuarios reales. Ningún `cumple` de esta skill es una
  validación de usuarios.
- Lo que `tools/medir.mjs` no mide queda como **no comprobable** salvo que lo pruebes aparte con Playwright: lector de
  pantalla, anuncios de `aria-live`, orden real de lectura, zoom del sistema, dispositivos reales, contraste sobre
  imágenes y cómo se siente el movimiento (sus tiempos sí se miden con `--movimiento`). Una librería como React Aria cubre mucho de ARIA y teclado, pero «lo trae la librería» no es
  una medición: se prueba.
