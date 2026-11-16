// Banco de medición: componentes de HeroUI v3 SIN personalizar (solo el tema por defecto).
// No es parte del producto. Sirve para medir los valores por defecto de la librería contra los pisos del proyecto:
//   node tools/medir.mjs --url http://localhost:5173/tools/banco/index.html --name banco-390 --out design/knowledge/mediciones --width 390 --height 844
// Se sirve con `npm run dev`; no entra en `npm run build` (queda fuera de src/ y de index.html).
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Con `?pisos` se carga la capa de pisos propuesta (tools/banco/pisos-propuestos.css) en vez del tema de src/.
if (location.search.includes('pisos')) await import('./pisos-propuestos.css')
else await import('../../src/index.css')
import {
  Accordion,
  Alert,
  Button,
  Card,
  Checkbox,
  Chip,
  Description,
  FieldError,
  Input,
  Label,
  Link,
  ListBox,
  ProgressBar,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Table,
  Tabs,
  TextArea,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@heroui/react'

function Bloque({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} data-bloque={id} className="mb-6 flex flex-col gap-3">
      <p className="text-xs text-muted">[{id}]</p>
      {children}
    </section>
  )
}

function Banco() {
  return (
    <main className="p-4">
      <Bloque id="typography">
        <Typography type="h1">h1 Título de la pantalla</Typography>
        <Typography type="h2">h2 Subtítulo</Typography>
        <Typography type="h3">h3 Sección</Typography>
        <Typography type="h4">h4 Subsección</Typography>
        <Typography type="h5">h5 Etiqueta</Typography>
        <Typography type="h6">h6 Detalle</Typography>
        <Typography type="body">body Texto de ejemplo de la pantalla.</Typography>
        <Typography type="body-sm">body-sm Texto de ejemplo de la pantalla.</Typography>
        <Typography type="body-xs">body-xs Texto de ejemplo de la pantalla.</Typography>
        <Typography type="body" color="muted">body muted Texto de ejemplo de la pantalla.</Typography>
      </Bloque>

      <Bloque id="button">
        <div className="flex flex-wrap gap-3">
          <Button size="sm">sm primary</Button>
          <Button>md primary</Button>
          <Button size="lg">lg primary</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">secondary</Button>
          <Button variant="tertiary">tertiary</Button>
          <Button variant="outline">outline</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="danger">danger</Button>
          <Button variant="danger-soft">danger-soft</Button>
        </div>
        <Button size="lg" fullWidth>lg fullWidth</Button>
      </Bloque>

      <Bloque id="toggle-button">
        <ToggleButtonGroup selectionMode="single" aria-label="Filtro">
          <ToggleButton id="hoy">Opción 1</ToggleButton>
          <ToggleButton id="manana">
            <ToggleButtonGroup.Separator />
            Opción 2
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup selectionMode="single" size="lg" aria-label="Filtro lg">
          <ToggleButton id="a">Opción A</ToggleButton>
          <ToggleButton id="b">
            <ToggleButtonGroup.Separator />
            Opción B
          </ToggleButton>
        </ToggleButtonGroup>
      </Bloque>

      <Bloque id="text-field">
        <TextField name="dni" isRequired>
          <Label>Campo con ayuda</Label>
          <Input placeholder="Texto de ejemplo" />
          <Description>Texto de ayuda del campo.</Description>
        </TextField>
        <TextField name="nombre" isInvalid>
          <Label>Nombre</Label>
          <Input defaultValue="" />
          <FieldError>Mensaje de error del campo.</FieldError>
        </TextField>
        <TextField name="nota">
          <Label>Campo largo</Label>
          <TextArea placeholder="Opcional" />
        </TextField>
      </Bloque>

      <Bloque id="select">
        <Select placeholder="Elegí una opción">
          <Label>Sucursal</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="centro" textValue="Opción A">
                Opción A
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="ituzaingo" textValue="Opción C">
                Opción C
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </Bloque>

      <Bloque id="radio-group">
        <RadioGroup defaultValue="centro" name="opcion">
          <Label>Sucursal</Label>
          <Description>Descripción del grupo.</Description>
          <Radio value="centro">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              Opción A
            </Radio.Content>
            <Description>Descripción de la opción</Description>
          </Radio>
          <Radio value="moron">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              Opción B
            </Radio.Content>
          </Radio>
        </RadioGroup>
      </Bloque>

      <Bloque id="checkbox-switch">
        <Checkbox>
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            Casilla
          </Checkbox.Content>
        </Checkbox>
        <Switch>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Content>
            <Label>Interruptor</Label>
          </Switch.Content>
        </Switch>
      </Bloque>

      <Bloque id="tabs">
        <Tabs defaultSelectedKey="hoy">
          <Tabs.ListContainer>
            <Tabs.List aria-label="Vistas">
              <Tabs.Tab id="hoy">
                Hoy
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="manana">
                Opción 2
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
          <Tabs.Panel id="hoy">Contenido del panel A</Tabs.Panel>
          <Tabs.Panel id="manana">Contenido del panel B</Tabs.Panel>
        </Tabs>
      </Bloque>

      <Bloque id="chip">
        <div className="flex flex-wrap gap-2">
          <Chip size="sm">sm Listo</Chip>
          <Chip>md Confirmado</Chip>
          <Chip size="lg" color="success" variant="soft">
            lg Estado listo
          </Chip>
        </div>
      </Bloque>

      <Bloque id="alert">
        <Alert status="warning">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Título de la alerta</Alert.Title>
            <Alert.Description>Detalle de la alerta.</Alert.Description>
          </Alert.Content>
        </Alert>
      </Bloque>

      <Bloque id="card">
        <Card>
          <Card.Header>
            <Card.Title>Título de la tarjeta</Card.Title>
            <Card.Description>Descripción de la tarjeta</Card.Description>
          </Card.Header>
          <Card.Content>Contenido de la tarjeta.</Card.Content>
          <Card.Footer>
            <Button>Acción de la tarjeta</Button>
          </Card.Footer>
        </Card>
      </Bloque>

      <Bloque id="link">
        <Link href="#">Un enlace</Link>
      </Bloque>

      <Bloque id="progress-bar">
        <ProgressBar value={60}>
          <Label>Progreso</Label>
          <ProgressBar.Output />
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
      </Bloque>

      <Bloque id="accordion">
        <Accordion>
          <Accordion.Item id="a1">
            <Accordion.Heading>
              <Accordion.Trigger>
                Pregunta del acordeón
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>Respuesta del acordeón.</Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Bloque>

      <Bloque id="table">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Contenido del panel A" className="min-w-[500px]">
              <Table.Header>
                <Table.Column isRowHeader>Columna A</Table.Column>
                <Table.Column>Columna B</Table.Column>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Fila 1</Table.Cell>
                  <Table.Cell>Confirmado</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </Bloque>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Banco />
  </StrictMode>,
)
