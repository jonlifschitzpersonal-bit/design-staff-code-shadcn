import * as React from "react"
import {
  CalendarDay,
  CalendarGrid,
  CalendarHeading,
  CalendarNext,
  CalendarPrevious,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  DatePicker,
  DatePickerContent,
  DatePickerHint,
  DatePickerInput,
  DatePickerTrigger,
} from "@ui-sdk/react/date-picker"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// Plantilla del plugin (knowledge/RECETAS_LIBRERIAS.md §5): fecha tipeable + calendario de ui-sdk dentro de una app
// shadcn, con pisos de 44 px y 16 px. Medida con @ui-sdk/react 0.1.0-beta.17, shadcn 4.23 (Nova, Radix) y Tailwind 4.
// Ajustá el locale y los tokens al proyecto. Sin animación de apertura: en ese proyecto el movimiento salía de Animate UI.
const navegacion =
  "inline-flex size-11 items-center justify-center rounded-lg text-foreground hover:bg-accent data-disabled:pointer-events-none data-disabled:opacity-40"

export function CampoFecha({
  id,
  valor,
  onCambio,
  min,
  hoy,
  error,
  disabled,
  ref,
}: {
  id: string
  valor: string
  onCambio: (iso: string) => void
  min?: string
  hoy?: string
  error?: string
  disabled?: boolean
  ref?: React.Ref<HTMLInputElement>
}) {
  const [abierto, setAbierto] = React.useState(false)

  // Dentro de un Dialog de Radix, Radix toma Escape en la captura de `document` y cierra el diálogo entero; ui-sdk ve
  // el evento ya consumido y no cierra el calendario. Con el calendario abierto, Escape se resuelve antes, en `window`.
  React.useEffect(() => {
    if (!abierto) return
    const alEscape = (evento: KeyboardEvent) => {
      if (evento.key !== "Escape") return
      evento.stopPropagation()
      evento.preventDefault()
      setAbierto(false)
    }
    window.addEventListener("keydown", alEscape, true)
    return () => window.removeEventListener("keydown", alEscape, true)
  }, [abierto])

  return (
    <DatePicker
      locale="es-AR"
      open={abierto}
      onOpenChange={setAbierto}
      value={valor || null}
      onValueChange={(v) => onCambio(typeof v === "string" ? v : "")}
      min={min}
      today={hoy}
      disabled={disabled}
      className="flex flex-col gap-1.5"
    >
      <div className="flex gap-2">
        <DatePickerInput
          ref={ref}
          id={id}
          autoComplete="off"
          aria-invalid={error ? true : undefined}
          aria-errormessage={error ? `${id}-error` : undefined}
          className={cn(
            "min-h-11 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 text-base tabular-nums outline-none placeholder:text-muted-foreground",
            "disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 dark:bg-input/30",
            "aria-invalid:border-destructive data-invalid:border-destructive"
          )}
        />
        <DatePickerTrigger
          aria-label="Abrir calendario"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-input bg-transparent text-foreground hover:bg-accent disabled:opacity-50 data-open:bg-accent dark:bg-input/30"
        >
          <CalendarIcon aria-hidden="true" className="size-5" />
        </DatePickerTrigger>
      </div>
      <DatePickerHint className="text-muted-foreground">
        {(estado) => `Día/mes/año, por ejemplo ${estado.example}`}
      </DatePickerHint>
      <DatePickerContent
        aria-label="Calendario"
        className="m-0 rounded-xl border border-border bg-popover p-3 text-popover-foreground shadow-lg"
      >
        <div className="flex items-center justify-between gap-2 pb-2">
          <CalendarPrevious aria-label="Mes anterior" className={navegacion}>
            <ChevronLeftIcon aria-hidden="true" className="size-5" />
          </CalendarPrevious>
          <CalendarHeading className="font-semibold first-letter:uppercase" />
          <CalendarNext aria-label="Mes siguiente" className={navegacion}>
            <ChevronRightIcon aria-hidden="true" className="size-5" />
          </CalendarNext>
        </div>
        <CalendarGrid className="border-collapse">
          <CalendarWeekdays>
            {(indice) => (
              <CalendarWeekday index={indice} className="size-11 font-normal text-muted-foreground" />
            )}
          </CalendarWeekdays>
          <CalendarWeeks>
            {(celda) => (
              <CalendarDay
                value={celda.date}
                className={cn(
                  "size-11 rounded-lg text-center tabular-nums hover:bg-accent",
                  "data-today:font-semibold data-today:underline data-today:underline-offset-4",
                  "data-outside:text-muted-foreground",
                  // `data-selected:` no sirve acá: shadcn/tailwind.css la redefine como [data-selected="true"] (por cmdk) y
                  // ui-sdk marca el día con data-selected="" (presencia). aria-selected="true" lo ponen los dos.
                  "aria-selected:bg-primary aria-selected:text-primary-foreground aria-selected:hover:bg-primary",
                  "data-disabled:pointer-events-none data-disabled:text-muted-foreground data-disabled:opacity-50"
                )}
              />
            )}
          </CalendarWeeks>
        </CalendarGrid>
      </DatePickerContent>
    </DatePicker>
  )
}
