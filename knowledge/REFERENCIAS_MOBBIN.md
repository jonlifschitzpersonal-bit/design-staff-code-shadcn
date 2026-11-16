# Referencias de interfaces con Mobbin

Cómo buscar referencias de pantallas y flujos reales en el MCP de [Mobbin](https://mobbin.com/mcp) **antes de armar
pantallas**. Lo leen los agentes `discovery` y `ux`. El `design-critic` no lo usa.

Una referencia de Mobbin sirve para **no inventar un patrón que ya está resuelto**. No es evidencia de los usuarios del
proyecto ni valida nada.

## Cuándo

- **Sí:** antes de definir pantallas o flujos nuevos, y
  cuando comparás mecanismos distintos para el mismo escenario.
- **No:** un ajuste puntual de copy, un estado o una pantalla que un componente del DS del proyecto ya resuelve.

## Cómo

1. **Cargá las herramientas.** Son las del servidor MCP `mobbin` (si se agregó con otro nombre, buscalas por el nombre
   de la herramienta). Si están diferidas, cargalas con una sola llamada a `ToolSearch`.
   - `search_screens`: pantallas sueltas, móviles y web.
   - `search_flows`: flujos de varios pasos en orden.
   - `search_sections`: secciones de sitios web.
   - La plataforma solo admite `ios` o `web` (para un producto móvil, usá `ios` como equivalente). Cada búsqueda
     devuelve 5 resultados por página; si necesitás más, pedí la página siguiente en vez de repetir la consulta.
   - Las demás herramientas (`list_collections`, `get_collection_contents`, `create_collection`, `save_content`,
     `add_comment`) leen o escriben el espacio guardado de la persona. **No las uses** salvo que el pedido lo diga.
2. **Buscá por tarea del usuario, no por estética.** Por cada pantalla o flujo clave del alcance, entre 2 y 4
   búsquedas: la tarea («reservar un turno», «estado de un pedido»), la plataforma del producto y, si la audiencia lo
   pide, el caso difícil (error, vacío, ayuda). Preferí `search_flows` para flujos y `search_screens` para un estado.
3. **Respetá el límite.** El servidor admite 60 pedidos por 60 segundos por usuario. Mantené la tarea en unas 15 a 20
   búsquedas. Ante un error 429, esperá lo que diga `Retry-After` y seguí.
4. **Anotá lo que encontraste** en una o dos líneas, en `ux.md` (diseño) o en el brief (discovery): las referencias
   que miraste (app, pantalla y enlace), **qué patrón tomaste y qué descartaste**. Marcá cada
   una como `referencia externa (Mobbin, <fecha>)`.

## Reglas

- **Contrastá con el proyecto antes de adoptar un patrón.** Las apps comerciales suelen romper pisos de accesibilidad,
  de lenguaje o de dominio. Mandan las reglas del proyecto (`CLAUDE.md`, su skill de reglas de diseño, su accesibilidad)
  y la evidencia de sus usuarios, no la popularidad de un patrón.
- **No copies** el aspecto, la marca ni los textos de otra app. Tomá el patrón (estructura, secuencia, jerarquía) y
  escribí el copy y los visuales propios del proyecto.
- **No reproduzcas pantallas ajenas** en los documentos ni en el código: citá app, pantalla y enlace.
- **Una referencia no es un dato de usuarios.** «Muchas apps lo hacen así» justifica una preferencia, no valida el
  diseño. Va como hipótesis, igual que una ley de UX con evidencia baja.
- En una evaluación ciega, las referencias externas son legítimas si las registrás como tales.

## Si el MCP no está disponible

Pasa si no está instalado, no se autenticó, la cuenta no tiene un plan con acceso o el límite de pedidos no se libera.
**No frenes ni inventes referencias.** Decilo en una línea, marcá esa parte como `no comprobable: sin referencias de
Mobbin` y seguí con el resto del método. Al cerrar, incluilo entre lo que no pudiste comprobar.
