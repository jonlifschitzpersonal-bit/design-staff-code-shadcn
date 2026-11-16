# UX · <título>

<!-- Lo escribe el agente ux; lo construye el agente ui. Corto y concreto: lo que ui necesita para construir sin preguntar. -->

## Objetivo

Qué tarea completa la persona y cómo sabe que terminó.

## Flujo

1. <paso: qué ve, qué decide, qué hace>
2. …

Salidas y recuperación: <qué pasa si cancela, si falla, si vuelve después>.

Mecanismo elegido y descartados: <una línea por opción descartada, con el porqué>.

## Pantallas

<!-- Por pantalla: qué va primero, qué se agrupa, cuál es la acción principal y qué es acción, filtro, navegación o estado. -->

## Estados

| Estado | Cómo se abre (URL) | Qué ve la persona | Copy | Acción disponible |
| --- | --- | --- | --- | --- |
| Normal | `/` | | | |
| Cargando | `?estado=cargando` | | | |
| Vacío | `?estado=vacio` | | | |
| Error | `?estado=error` | | | |

<!-- Sumá los de harden.md que apliquen: texto muy largo y muy corto, muchos ítems, sin permiso, validación, otro idioma
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
