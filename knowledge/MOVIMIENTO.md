# Movimiento

**Es la única fuente del plugin sobre movimiento.** Las skills y los agentes remiten acá. Separa dos cosas:
- **cuánto se mueve la app**, que es gusto y marca: lo elige el usuario como parte de la dirección visual (§1);
- **lo que hace esperar o no se queda quieto**, que es un defecto en cualquier nivel (§2).

Quién hace qué:
- `ui` propone el nivel en el checkpoint de dirección visual, lo construye con la librería y lo mide (§3 a §6).
- `ux` dice en `ux.md` qué transiciones tiene cada flujo y para qué.
- El critic revisa contra el nivel aprobado y los límites (§7).

Está adaptado de `emilkowalski/skills` (`review-animations` y su `STANDARDS.md`, licencia MIT, ver
`THIRD_PARTY_NOTICES.md`) y probado en el banco de shadcn con Animate UI, del 26 al 27-11-2026.

**Qué enseñó el banco:**
- Las curvas de la librería estaban bien. Lo que fallaba eran dos tiempos por defecto:
  - las cifras contaban con un resorte que no se quedaba quieto en 12 s;
  - cada cambio de pestaña hacía esperar unos 520 ms (salía un panel y recién después entraba el otro).
- La primera corrección sacó todo el movimiento de los datos, y al usuario le gustaba. Comparando tres niveles en la
  app, eligió el intermedio.

## 1. El nivel de movimiento (lo decide el usuario)

| Nivel | Datos (cifras, gráficos) | Acción frecuente (pestaña, filtro, período) | Suele ir en |
| --- | --- | --- | --- |
| **Sobrio** | Aparecen con su valor final. Solo anima un cambio en el lugar por una acción del usuario (registrar un gasto cambia el saldo), en 0,3 s o menos | Instantáneo | Herramientas de operación intensiva, muchas horas por día |
| **Intermedio** (probado y aprobado en el banco) | Entran una vez por carga de la página: cifras en 0,7 s, barras en 0,5 s, con `ease-out`. Al cambiar un filtro, las cifras van del valor anterior al nuevo | El contenido nuevo entra con un fundido de 200 ms o menos, sin esperar al que sale | Dashboards y apps de producto |
| **Expresivo** (sin probar todavía) | Entran cada vez que se entra a la pantalla. Entradas escalonadas en grupos | Igual que el intermedio | Producto de consumo, marca muy marcada, onboarding |

- **Cómo se decide:**
  - `ui` propone un nivel en el checkpoint de dirección visual y lo construye funcionando en la pantalla principal.
  - El lead lo muestra como una línea más de la dirección.
  - El usuario lo aprueba o lo cambia, y queda en «Decisiones» del brief y en la sección «Movimiento» de la skill DS.
- **Si no hay checkpoint** (pantalla sobre un sistema que ya existe), vale el nivel de la skill DS.
- **Si no hay ninguno,** `ui` propone el intermedio y lo marca como pendiente de aprobación.
- **Si el usuario duda,** se le muestran los niveles funcionando, no descriptos. En el banco alcanzó un parámetro de URL
  (`?movimiento=sobrio|intermedio|original`) que elige la configuración de las tres piezas que se mueven, y un panel
  chico para cambiarlo y repetir la carga.
- **Igual en cualquier nivel:**
  - lo que da feedback o muestra de dónde viene algo: diálogos, menús, toasts, interruptores, el indicador de la
    pestaña activa, el cambio de tema;
  - un cambio de valor en el lugar por una acción del usuario.
- **Cada animación tiene un trabajo con nombre:**
  - feedback de una acción;
  - mostrar de dónde viene o a dónde va algo;
  - indicar un cambio de estado;
  - evitar un salto brusco;
  - explicar;
  - la entrada de los datos que fija el nivel.

  Si se borra y no se pierde nada, se borra.

## 2. Límites para cualquier nivel (no son gusto)

1. **Lo que se dispara desde el teclado no se anima.** Un atajo se repite cientos de veces por día.
2. **Lo frecuente no hace esperar.** Después de cambiar de pestaña, de filtro o de ruta, el contenido nuevo empieza a
   verse en el acto. Nunca una secuencia de salida y después entrada, ni un escalonado. `medir.mjs` lo marca como
   «secuencia».
3. **Un dato termina de moverse en 1 s como máximo.** Va con duración fija y `ease-out`, no con un resorte sin
   duración: el de `CountingNumber` tardaba más de 12 s.
4. **La pantalla queda quieta a los 2 s de cargar.**
5. **La interfaz se mueve en menos de 300 ms.** Las excepciones son los datos (límite 3), los diálogos, drawers y
   sheets, y los toasts.
6. **Nunca:**
   - `ease-in` en la interfaz;
   - `scale(0)`;
   - `transition: all`.
7. **Con «reducir movimiento»:** los datos aparecen con su valor final, y el resto se mueve menos y más suave (§4).
8. **Lo que se mueve solo más de 5 s se puede pausar** (WCAG 2.2.2).

## 3. Cómo se anima

**Curvas.**
- **Entrar o salir:** `ease-out`, con `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Moverse en la pantalla:** `ease-in-out`, con `cubic-bezier(0.77, 0, 0.175, 1)`.
- **Drawer o sheet:** `cubic-bezier(0.32, 0.72, 0, 1)`.
- **Hover o color:** `ease`.
- **Lo continuo** (progreso, esqueleto): `linear`.
- **Nunca `ease-in` en la interfaz:** demora justo el momento que la persona está mirando. Las curvas que trae CSS son
  flojas: se usan estas.

**Duración.**

| Elemento | Duración |
| --- | --- |
| Feedback de presionar | 100 a 160 ms |
| Tooltip, popover chico | 125 a 200 ms |
| Menú, select | 150 a 250 ms |
| Contenido nuevo después de una acción frecuente | 200 ms o menos, o nada (sobrio) |
| Diálogo, drawer, sheet | 200 a 500 ms |
| Toast | 400 ms con `ease` (Sonner) |
| Entrada de datos (intermedio, expresivo) | Cifras 0,7 s; series de un gráfico 0,5 s; nunca más de 1 s |

- La salida es más corta que la entrada.
- Un resorte no tiene duración fija. `medir.mjs` informa su tiempo completo de asentamiento, que es más largo que lo que
  se ve.

**Física.**
- **Escala:** nunca desde `scale(0)`. Se arranca en 0,9 a 0,97, con opacidad.
- **Origen:** el popover, el menú y el tooltip crecen desde su disparador. El diálogo, centrado.
- **Presionar:** `scale(0.97)` en `:active`, en 100 a 160 ms con `ease-out`.

**Propiedades.**
- Se anima `transform` y `opacity`. **Nunca `transition: all`**, que anima propiedades que nadie eligió: el alto, el
  padding, el foco.
- Animar `width`, `height`, `margin`, `padding`, `top` o `left` necesita un motivo. El que vale es el alto medido de un
  acordeón.

**Interrupción.** Lo que se dispara seguido (toasts, interruptores, arrastres) usa transiciones o resortes, que retoman
desde donde están. Los keyframes reinician desde cero.

**Coreografía.**
- Una sola entrada por contenedor.
- El escalonado (30 a 80 ms entre ítems) va solo en entradas de grupo, en el nivel expresivo, y nunca bloquea la
  interacción.

**Cohesión.** Un dashboard es nítido y rápido, aun en el nivel expresivo. Lo juguetón, con rebote (0,1 a 0,3), queda
para los gestos.

## 4. Accesibilidad

- **«Reducir movimiento» es menos y más suave, no cero.**
  - Se mantienen la opacidad y el color que ayudan a entender.
  - Se sacan el desplazamiento, la escala y el rebote.
  - Las cifras y los gráficos aparecen con su valor final.
  - `CountingNumber` salta solo al valor final; en Recharts, `isAnimationActive="auto"` respeta la preferencia.
- **Un hover que mueve algo va dentro de `@media (hover: hover) and (pointer: fine)`.** En pantallas táctiles el hover
  queda pegado. Tailwind 4 ya limita así el prefijo `hover:`.
- **Lo que se mueve solo más de 5 s** (carrusel, marquesina, contador en vivo) necesita pausa (WCAG 2.2.2). Ver
  `design-accessibility`.

## 5. En la pila del proyecto

Los valores por defecto de la librería son decisiones que nadie tomó. Leelos en `node_modules` antes de aceptarlos.
Lo que sigue está medido en el banco.

| Pieza | Por defecto | Sobrio | Intermedio | Expresivo |
| --- | --- | --- | --- | --- |
| Animate UI `CountingNumber` | Cuenta desde 0 en cada montaje, con un resorte que no se queda quieto en 12 s (rompe el límite 3) | `initiallyStable` y `transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}` | Cuenta desde 0 solo la primera vez por carga (abajo), con `transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}`. `key` estable, para que un filtro la lleve del valor anterior al nuevo | Igual que el intermedio, pero cuenta en cada montaje |
| Recharts 3 (`Bar`, `Line`, `Area`, `Pie`) | `isAnimationActive: "auto"`: crecen 400 ms en cada montaje | `isAnimationActive={false}` | `"auto"`, `animationDuration={500}` y `animationEasing="ease-out"` la primera vez por carga; después `false` | `"auto"` en cada montaje |
| Animate UI `TabsContent` | Sale el panel viejo (150 ms) y recién después entra el nuevo (300 ms), con blur y desplazamiento (rompe el límite 2) | `transition` y `exitTransition` en `{ duration: 0 }` | `transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}` y `exitTransition={{ duration: 0 }}` | Igual que el intermedio |
| Animate UI, indicador de la pestaña (`TabsList`) | Resorte de 500 ms | Se deja: es el feedback. Si molesta, se acorta con `transition` | ← | ← |
| Animate UI tooltip | 340 ms, con escala 0,7 (token, no se cambia por props) | Se acepta o se acorta con `transition` | ← | ← |
| shadcn (Button, Badge, acordeón, disparadores con `asChild`) | `transition-all` (rompe el límite 6) | Capa de movimiento por `data-slot`: `templates/librerias/shadcn/banco/pisos-propuestos.css` §5 | ← | ← |
| Sonner | 400 ms con `ease` | Se deja | ← | ← |

**«La primera vez por carga»** se resuelve con una marca de módulo:
- se lee en el inicializador de `useState`, que no cambia nada, porque StrictMode lo llama dos veces;
- se escribe en un efecto, después de montar.

```tsx
const yaEntraron = { cifras: false } // a nivel de módulo: dura lo que dura la carga de la página
function Cifra({ valor }: { valor: number }) {
  const [cuenta] = React.useState(() => !yaEntraron.cifras)
  React.useEffect(() => { yaEntraron.cifras = true }, [])
  return <CountingNumber number={valor} initiallyStable={!cuenta}
    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }} />
}
```

Si la librería no expone sus tokens (Animate UI no los exporta), se copia el valor y se anota de qué token sale.

## 6. Cómo se verifica

**Chequeos de código**, antes de entregar. Valen para cualquier nivel y tienen que dar vacío:

```bash
# Cifras con el resorte por defecto (límite 3)
grep -rl "<CountingNumber" src --include=*.tsx | xargs -r grep -L "transition="
# Series de gráfico que no declaran su animación: el nivel es una decisión, no un valor por defecto
grep -rlE "<(Bar|Line|Area|Pie|Radar|Scatter)\b" src --include=*.tsx | xargs -r grep -L "isAnimationActive"
# transition-all fuera de los componentes de la librería (límite 6)
grep -rn "transition-all" src --include=*.tsx | grep -v "src/components/ui/"
```

Con Animate UI, además, el `TabsContent` del proyecto tiene que fijar `exitTransition` (límite 2).

**Medición** (`tools/medir.mjs`). Abre la página con las animaciones activas y registra, cuadro a cuadro, qué se mueve
y cuándo queda quieta:
- `--movimiento` mide al cargar;
- `--movimiento-clic "<css>"` mide después de la acción frecuente (una pestaña, un filtro);
- deja el detalle en `<name>.movimiento.json`.

Se corre en la pantalla principal de cada familia de pantallas.

**«!» marca lo que rompe un límite de §2, y «·» un hecho que se juzga con el nivel aprobado.**

| Si `medir.mjs` marca… | Qué es | Revisá |
| --- | --- | --- |
| `! … NO queda quieta` o `quieta a los … (límite: 2 s)` | Algo que no termina: casi siempre un resorte | Límites 3 y 4, y §5 |
| `! cifra que cambia … (límite: 1 s)` o `! … se redibuja … (límite: 1 s)` | Un dato que tarda demasiado | Límite 3 y §5 |
| `! secuencia en …` | Salir y después entrar, o un escalonado, después de una acción frecuente | Límite 2 y §5 |
| `! animación de más de 300 ms` | Puede ser un diálogo (está bien) o algo de la interfaz (no) | Límite 5 |
| `! transition: all` | El valor por defecto de la librería | Límite 6 y §5 |
| `· cifra que cambia` o `· se redibuja` | La entrada de un dato, dentro del límite | Que coincida con el nivel aprobado (§1) |

**Lo que no se mide** se dice como no comprobable:
- cómo se siente el movimiento: lo juzga una persona recorriendo la app;
- los gestos en un teléfono real;
- el «reducir movimiento» del sistema, que la medición solo emula.

## 7. Cómo se revisa (lente del critic)

**Primero, el nivel aprobado:** está en la sección «Movimiento» de la skill DS o en «Decisiones» del brief. Si no hay
ninguno aprobado, va como *Externo* («nivel de movimiento sin aprobar») y se revisa solo contra los límites.

Se juzga con tres fuentes:
- el resumen de movimiento de `medir.mjs`;
- el código;
- los valores por defecto de la librería en `node_modules`.

Cada hallazgo va en la tabla del critic con su **antes, después y por qué**. Este es el orden de gravedad:
1. **Rompe un límite** (§2): teclado, algo frecuente que hace esperar, un dato de más de 1 s, una pantalla que no se
   queda quieta, `ease-in`, `scale(0)`, `transition: all`. Va como *Corregir*.
2. **Se aparta del nivel aprobado,** con más o menos movimiento que el aprobado. Va como *Corregir*.
3. **Movimiento sin un trabajo con nombre**, fuera de lo que da el nivel.
4. **Rendimiento:** propiedades de layout.
5. **Interrupción y tiempos:** keyframes donde hace falta poder interrumpir, o una salida más larga que la entrada.
6. **Origen, física y cohesión.**

Que al critic le guste más o menos movimiento dentro del nivel aprobado no es un hallazgo; como mucho, una
*Sugerencia*.

Para corregir, la preferencia es, en este orden:
- ajustarlo al nivel y a los límites;
- borrar lo que no tiene trabajo;
- reducir (menos duración, menos distancia, menos propiedades);
- cambiar la curva;
- corregir el origen;
- hacerlo interrumpible;
- pasarlo a `transform` y `opacity`.
