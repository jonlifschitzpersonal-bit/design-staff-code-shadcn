// Banco de medición: componentes de shadcn/ui del proyecto (con Animate UI si se aplicó) SIN personalizar.
// No es parte del producto. Sirve para medir los valores por defecto contra los pisos del proyecto:
//   node tools/medir.mjs --url http://localhost:5173/tools/banco/index.html --name banco-390 --out design/knowledge/mediciones --width 390 --height 844
// Se sirve con `npm run dev`; no entra en `npm run build` (queda fuera de src/ y de index.html).
//
// A diferencia de una librería cerrada, en shadcn los componentes viven en src/components/ui/ y son del proyecto: el
// banco mide lo que el proyecto tiene hoy. Si se editó un componente, el banco refleja esa edición.
//
// Overlays (diálogo, popover, lista del select, tooltip): solo existen abiertos. Se miden de a uno con
//   ?abierto=dialog | popover | select | tooltip
// y el banco muestra únicamente ese bloque, abierto.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Con `?pisos` se carga la capa de pisos propuesta (tools/banco/pisos-propuestos.css), que importa el tema de src/ y
// le suma los ajustes. Sin `?pisos`, solo el tema de src/.
if (location.search.includes('pisos')) await import('./pisos-propuestos.css')
else await import('../../src/index.css')
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const abierto = new URLSearchParams(location.search).get('abierto')

function Bloque({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} data-bloque={id} className="mb-6 flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">[{id}]</p>
      {children}
    </section>
  )
}

// shadcn no trae un componente Label con el control adentro: el control que toca la persona es el de la etiqueta que lo
// envuelve. Se mide así a propósito (es como se usa en una pantalla).
function Campo({ children }: { children: React.ReactNode }) {
  return <label className="flex items-center gap-3 text-sm">{children}</label>
}

function Principales() {
  return (
    <>
      <Bloque id="typography">
        <h1 className="text-3xl font-semibold">h1 Título de la pantalla</h1>
        <h2 className="text-2xl font-semibold">h2 Subtítulo</h2>
        <h3 className="text-xl font-semibold">h3 Sección</h3>
        <p className="text-base">base Texto de ejemplo de la pantalla.</p>
        <p className="text-sm">sm Texto de ejemplo de la pantalla.</p>
        <p className="text-xs">xs Texto de ejemplo de la pantalla.</p>
        <p className="text-sm text-muted-foreground">sm muted Texto de ejemplo de la pantalla.</p>
      </Bloque>

      <Bloque id="button">
        <div className="flex flex-wrap gap-3">
          <Button size="xs">xs default</Button>
          <Button size="sm">sm default</Button>
          <Button>md default</Button>
          <Button size="lg">lg default</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">secondary</Button>
          <Button variant="outline">outline</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="destructive">destructive</Button>
          <Button variant="link">link</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="icon" aria-label="Agregar">
            +
          </Button>
          <Button size="icon-sm" aria-label="Agregar (sm)">
            +
          </Button>
        </div>
        <Button size="lg" className="w-full">
          lg ancho completo
        </Button>
      </Bloque>

      <Bloque id="input">
        <label className="flex flex-col gap-1.5 text-sm">
          Campo con ayuda
          <Input placeholder="Texto de ejemplo" />
          <span className="text-xs text-muted-foreground">Texto de ayuda del campo.</span>
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Campo con error
          <Input aria-invalid defaultValue="" />
          <span className="text-xs text-destructive">Mensaje de error del campo.</span>
        </label>
      </Bloque>

      <Bloque id="select">
        <label className="flex flex-col gap-1.5 text-sm">
          Sucursal
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Elegí una opción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Opción A</SelectItem>
              <SelectItem value="b">Opción B</SelectItem>
            </SelectContent>
          </Select>
        </label>
      </Bloque>

      <Bloque id="checkbox-switch">
        <Campo>
          <Checkbox /> Casilla
        </Campo>
        <Campo>
          <Switch /> Interruptor
        </Campo>
      </Bloque>

      <Bloque id="tabs">
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">Hoy</TabsTrigger>
            <TabsTrigger value="b">Opción 2</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Contenido del panel A</TabsContent>
          <TabsContent value="b">Contenido del panel B</TabsContent>
        </Tabs>
      </Bloque>

      <Bloque id="accordion">
        <Accordion type="single" collapsible>
          <AccordionItem value="a1">
            <AccordionTrigger>Pregunta del acordeón</AccordionTrigger>
            <AccordionContent>Respuesta del acordeón.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Bloque>
    </>
  )
}

function Overlay({ cual }: { cual: string }) {
  if (cual === 'dialog')
    return (
      <Bloque id="dialog">
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Título del diálogo</DialogTitle>
              <DialogDescription>Descripción del diálogo.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancelar</Button>
              <Button>Confirmar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Bloque>
    )
  if (cual === 'popover')
    return (
      <Bloque id="popover">
        <Popover open>
          <PopoverTrigger asChild>
            <Button variant="outline">Abrir popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Título del popover</PopoverTitle>
              <PopoverDescription>Detalle del popover.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </Bloque>
    )
  if (cual === 'select')
    return (
      <Bloque id="select-abierto">
        <Select open>
          <SelectTrigger>
            <SelectValue placeholder="Elegí una opción" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Opción A</SelectItem>
            <SelectItem value="b">Opción B</SelectItem>
          </SelectContent>
        </Select>
      </Bloque>
    )
  if (cual === 'tooltip')
    return (
      <Bloque id="tooltip">
        <TooltipProvider>
          <Tooltip open>
            <TooltipTrigger asChild>
              <Button variant="outline">Con tooltip</Button>
            </TooltipTrigger>
            <TooltipContent>Texto del tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Bloque>
    )
  return <p>Valores válidos de ?abierto: dialog, popover, select, tooltip.</p>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="p-4">{abierto ? <Overlay cual={abierto} /> : <Principales />}</main>
  </StrictMode>,
)
