# Impeccable: guías incluidas

Copia **sin modificar** de 5 guías de [Impeccable](https://github.com/pbakaus/impeccable), de Paul Bakaus, versión
4.8.0. Se copiaron el 2026-10-27 bajo la licencia Apache-2.0 (`LICENSE` y `NOTICE.md` de este directorio, copiados del
repo original). `NOTICE.md` se refiere a archivos de iOS y Android que este plugin no incluye; se conserva igual.

| Archivo | Para qué la usa el plugin |
| --- | --- |
| `reference/critique.md` | Solo la *Assessment A* (revisión de diseño), como lente de la pasada visual. |
| `reference/clarify.md` | Lente sobre el copy visible, solo si el copy es nuevo o cambió. |
| `reference/distill.md` | Lente de simplificación, al final de la pasada visual. |
| `reference/harden.md` | Solo la sección «Assess Hardening Needs», para definir los estados antes de dibujar. Se ignora el CSS. |
| `reference/onboard.md` | Solo en una primera experiencia o un estado vacío. |

Se leen como guías, nunca como un flujo. Hay que ignorar lo que dependa del resto de Impeccable: los comandos
`/impeccable …`, los scripts, el detector, el navegador y el hook. Para actualizar, copiá los mismos 5 archivos de una
versión nueva, cambiá la versión acá y revisá que las secciones citadas sigan existiendo.
