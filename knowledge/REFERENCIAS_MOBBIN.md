# Referencias de interfaces con Mobbin

Cómo buscar referencias de pantallas y flujos reales en el MCP de [Mobbin](https://mobbin.com/mcp) **antes de armar
pantallas**. Lo leen los agentes `discovery`, `ux` y `ui`; el lead lo usa cuando el pedido es de dirección visual o de
estructura de la app. El `design-critic` no lo usa.

Una referencia de Mobbin sirve para **no inventar un patrón que ya está resuelto** y para **salir de lo genérico**: sirve
tanto para el flujo como para la estructura y para lo visual. No es evidencia de los usuarios del proyecto ni valida nada.

## Tres lentes (cada agente toma la suya)

| Lente | Qué se mira | Quién la usa | Dónde se anota |
| --- | --- | --- | --- |
| **Flujo** | Secuencia de pasos, qué se pide y cuándo, cómo se confirma, cómo se recupera un error | `discovery`, `ux` | `ux.md` (o el brief en discovery) |
| **Estructura** | Esqueleto de la app: navegación (sidebar, barra superior o inferior), jerarquía de pantallas, composición de la grilla, qué va fijo y qué scrollea, densidad según el dispositivo | `ux` (navegación, IA) y `ui` (composición) | `ux.md` (IA) y `referencias-visuales.md` |
| **Visual** | Jerarquía y escala tipográfica, uso del color y del peso, superficies y bordes, ritmo y espaciado, tratamiento de tablas, tarjetas, estados, íconos y vacíos, cómo se ve «terminado» | `ui` (y el lead al fijar dirección) | `design/<slug>/referencias-visuales.md` |

Sin la lente estructural y la visual, el resultado tiende a ser correcto pero básico: una columna centrada, sin esqueleto
de app, sin jerarquía propia. **Un producto de escritorio se busca por pantallas de escritorio** (`platform: web`), no
por flujos móviles.

## Cuándo

- **Sí:** antes de definir pantallas o flujos nuevos; al fijar una dirección visual nueva o el esqueleto de la app
  (navegación y composición por dispositivo); cuando comparás mecanismos distintos para el mismo escenario; cuando la
  primera versión «se ve básica» o genérica.
- **No:** un ajuste puntual de copy o de espaciado, un estado o una pantalla que un componente del DS del proyecto ya
  resuelve.

## Cómo

1. **Cargá las herramientas.** Son las del servidor MCP `mobbin` (si se agregó con otro nombre, buscalas por el nombre
   de la herramienta). Si están diferidas, cargalas con una sola llamada a `ToolSearch`.
   - `search_screens`: pantallas sueltas, móviles y web. Es la principal para las lentes de estructura y visual.
   - `search_flows`: flujos de varios pasos en orden. Es la principal para la lente de flujo.
   - `search_sections`: secciones de sitios web (landing, precios); casi nunca sirve para una app.
   - La plataforma solo admite `ios` o `web`: para una app de escritorio o responsive, `web`; para un producto móvil,
     `ios` como equivalente. Cada búsqueda devuelve un número limitado de resultados: pedí la página siguiente en vez de
     repetir la consulta.
   - Las demás herramientas (`list_collections`, `get_collection_contents`, `create_collection`, `save_content`,
     `add_comment`) leen o escriben el espacio guardado de la persona. **No las uses** salvo que el pedido lo diga.
2. **Buscá por tarea y por tipo de producto, no por estética.** Los adjetivos («moderno», «limpio») no filtran. Describí
   el tipo de pantalla y el tipo de producto: «banking app account overview dashboard», «invoice payments list with
   status», «admin review queue with detail panel», «web app with left sidebar navigation». Una consulta por pantalla;
   no combines intenciones.
   - **Flujo:** 2 a 4 búsquedas por flujo clave, con `search_flows` y el caso difícil (error, vacío, ayuda).
   - **Estructura y visual:** 3 a 6 búsquedas con `search_screens` por familia de pantallas: la pantalla de inicio de la
     persona, la pantalla de trabajo densa (tabla, cola, detalle), el formulario, el estado y la constancia. Buscá en el
     mismo rubro (finanzas, pagos, facturas) **y** en un rubro vecino con buena resolución visual para esa tarea.
3. **Mirá las imágenes.** Las búsquedas devuelven imágenes de cada pantalla: abrilas y describí lo que ves, no lo que
   dice la metadata. Citá cada una con su enlace de Mobbin.
4. **Extraé ideas concretas, una por referencia.** No «me gusta cómo se ve»: qué decisión visual o estructural sostiene
   el resultado. Preguntas útiles:
   - ¿Qué esqueleto tiene (sidebar, encabezado, panel lateral) y qué ocupa cada zona a 1440 px?
   - ¿Qué es lo más grande y lo más pesado de la pantalla, y qué es lo más callado?
   - ¿Cómo agrupa (superficie, borde, espacio, título de sección) sin usar una caja para todo?
   - ¿Cómo muestra un estado (texto, ícono, color, posición)?
   - ¿Cuánto aire y qué densidad tiene la tabla o la lista, y cómo se escanea?
   - ¿Qué hace que no parezca una plantilla (un detalle de tipografía, de cifras, de ilustración, de vacío)?
5. **Pasalas por el filtro del proyecto antes de adoptar nada.** Mandan los pisos y las reglas del proyecto (texto,
   targets, contraste, lenguaje, dominio, audiencia). Las apps comerciales casi siempre rompen alguno: texto de 12-14 px,
   gris sobre gris, íconos sin texto, jerga. Se toma la idea, se rehace con la escala y los tokens del proyecto y se mide.
6. **Anotá lo que encontraste.** Para cada referencia: app, pantalla, enlace, **la idea que tomaste, la que descartaste
   y por qué** (incluido el filtro: «descartado: texto de 13 px»). Marcá cada una como
   `referencia externa (Mobbin, <fecha>)`. Dónde: ver la tabla de las tres lentes. El archivo
   `design/<slug>/referencias-visuales.md` es de `ui`: ahí quedan las ideas de estructura y visual que efectivamente se
   aplicaron, mapeadas a la pantalla donde se usaron.
7. **Respetá el límite.** El servidor admite 60 pedidos por 60 segundos por usuario. Mantené la tarea en unas 15 a 25
   búsquedas. Ante un error 429, esperá lo que diga `Retry-After` y seguí.

## Reglas

- **Contrastá con el proyecto antes de adoptar un patrón.** Mandan las reglas del proyecto (`CLAUDE.md`, su skill de
  reglas de diseño, su accesibilidad) y la evidencia de sus usuarios, no la popularidad de un patrón.
- **No copies** el aspecto, la marca ni los textos de otra app. Tomá la idea (estructura, secuencia, jerarquía,
  proporción, tratamiento) y escribí el copy y los visuales propios del proyecto. Una pantalla que es reconocible como
  la de otra app es una copia, no una referencia.
- **No reproduzcas pantallas ajenas** en los documentos ni en el código: citá app, pantalla y enlace.
- **Una referencia no es un dato de usuarios.** «Muchas apps lo hacen así» justifica una preferencia, no valida el
  diseño. Va como hipótesis, igual que una ley de UX con evidencia baja.
- **Una referencia visual no reemplaza la medición.** Lo que se toma se construye con los tokens del proyecto y se mide
  igual que todo.
- En una evaluación ciega, las referencias externas son legítimas si las registrás como tales.

## Si el MCP no está disponible

Pasa si no está instalado, no se autenticó, la cuenta no tiene un plan con acceso o el límite de pedidos no se libera.
**No frenes ni inventes referencias.** Decilo en una línea, marcá esa parte como `no comprobable: sin referencias de
Mobbin` y seguí con el resto del método. Al cerrar, incluilo entre lo que no pudiste comprobar.
