# UX · <título>

<!-- Lo escribe el agente ux; lo construye el agente ui. Corto y concreto: lo que ui necesita para construir sin preguntar. -->

## Objetivo

Qué tarea completa la persona y cómo sabe que terminó.

## Flujo

1. <paso: qué ve, qué decide, qué hace>
2. …

Salidas y recuperación: <qué pasa si cancela, si falla, si vuelve después>.

Mecanismo elegido y descartados: <una línea por opción descartada, con el porqué>.

## Camino de alto volumen

<!-- Si «Volumen y operación» del brief muestra un rol que maneja muchos ítems: cómo resuelve el caso común en lote o
con defaults (seleccionar varios, aceptar las coincidencias, teclado), y recién después el caso de a uno. Si no aplica:
«no aplica · <por qué>». -->

## Permisos

<!-- Obligatorio si hay más de un rol. Una fila por acción importante. «Visible pero no disponible» dice por qué. -->

| Acción | <rol A> | <rol B> | Notas (quién es dueño, qué pasa si cambia el rol) |
| --- | --- | --- | --- |

## Cierre del circuito

<!-- Cada cambio que pasa sin que la persona esté mirando (otro rol actuó, un proceso terminó, venció un plazo): cómo se
entera. Si queda fuera de alcance, decilo con el riesgo. -->

| Cambio | Quién lo provoca | Cómo se entera la persona afectada | En alcance |
| --- | --- | --- | --- |

## Pantallas

<!-- Por pantalla: qué va primero, qué se agrupa, cuál es la acción principal y qué es acción, filtro, navegación o estado. -->

## Estados

| Estado | Cómo se abre (URL) | Qué ve la persona | Copy | Acción disponible |
| --- | --- | --- | --- | --- |
| Normal | `/` | | | |
| Cargando | `?estado=cargando` | | | |
| Vacío | `?estado=vacio` | | | |
| Error | `?estado=error` | | | |

<!-- Sumá los casos límite que apliquen: texto muy largo y muy corto, muchos ítems, sin permiso, validación, otro idioma
(+30%), formatos de fecha y número. -->

## Copy

| Elemento | Texto | Nota (límite, variable, plural) |
| --- | --- | --- |

Glosario: <términos nuevos, uno por concepto>.

## Contrato semántico

<!-- Lo que encuentra un lector de pantalla (ux-designer-pro §12b). Una fila por región, control o compuesto importante;
solo los campos que apliquen. Lo que ya resuelve un componente de la librería: «hereda de <componente>». ui lo comprueba
en <name>.aria.yml. -->

| Elemento | Rol | Nombre accesible | Estado / valor | Agrupación y orden | Foco | Anuncio |
| --- | --- | --- | --- | --- | --- | --- |

## Preguntas abiertas
