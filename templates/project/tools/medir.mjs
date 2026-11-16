#!/usr/bin/env node
// Captura una pantalla y mide el DOM real con Playwright.
// Parte del plugin design-staff-code-v2. Se copia al proyecto como tools/medir.mjs (lo hace project-setup).
//
// Uso (desde la raíz del proyecto, con el servidor de desarrollo levantado):
//   node tools/medir.mjs --url http://localhost:5173/ --name hoy --out design/<slug>/capturas
//   opciones: --width 390 --height 844       viewport (por defecto 390x844)
//             --min-text 18 --min-target 48  pisos del proyecto, en px CSS
//             --selector "main"              mide solo dentro de ese elemento
//             --crop                         la captura se recorta a --selector (por defecto, página completa)
//             --sin-foco                     no recorre el teclado (más rápido)
//             --strict                       sale con código 1 si hay incumplimientos
//
// Salida, junto a la captura (<out>/<name>*):
//   <name>.png                         captura
//   <name>.medidas.json                texto, controles, contraste no textual, foco y resumen
//   <name>.contraste.json              pares fg/bg en el formato de skills/design-accessibility/scripts/contrast.py
//                                      (texto y "non-text"). Los de fondo componible vienen resueltos.
//   <name>.contraste-no-comprobable.json   solo lo que NO se puede medir (fondo con imagen o degradado)
//   <name>.aria.yml                    árbol de accesibilidad (rol, nombre, estado, orden) para el contrato semántico;
//                                      los controles sin nombre accesible cuentan como falla con --strict
//
// Qué mide y qué no:
//   - Texto: tamaño, peso, interlineado y color resueltos por el navegador. Los fondos translúcidos se componen sobre
//     las capas de abajo; la opacidad de un ancestro se aplica al color del texto y se marca "aproximado".
//   - Controles: se mide el control que ve y toca la persona, no el <input> o <select> nativo oculto (que las
//     librerías de componentes ponen debajo): se resuelve a su <label> o a su rol. Los contenedores (tabpanel,
//     radiogroup, listbox...) no cuentan como controles.
//   - Contraste no textual (WCAG 1.4.11): borde o fondo de campos, casillas, radios e interruptores contra lo de al
//     lado. Mide el estado en que está la página al cargar (sin tildar, sin error).
//   - Foco con teclado: recorre la página con Tab, compara una captura recortada de cada control con y sin foco y
//     mide el contraste del aro contra lo que tapa. Es una aproximación por píxeles, no la lectura del CSS.
//   - Semántica: árbol de accesibilidad (ariaSnapshot) y controles sin nombre accesible.
//   - NO mide: hover, estado seleccionado o con error si la página no carga en ese estado (abrilo por URL o
//     parámetro y medí de nuevo), zoom, la lectura real con un lector de pantalla, animaciones, contraste sobre imágenes. Los radios dentro
//     de un grupo se recorren con las flechas, no con Tab: figuran como "no alcanzables con Tab" a título informativo.

import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright'

const args = process.argv.slice(2)
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback
}
const url = opt('url')
if (!url) {
  console.error('Falta --url. Ejemplo: node tools/medir.mjs --url http://localhost:5173/ --name hoy')
  process.exit(2)
}
const name = opt('name', 'pantalla')
const out = opt('out', 'capturas')
const width = Number(opt('width', 390))
const height = Number(opt('height', 844))
const minText = Number(opt('min-text', 18))
const minTarget = Number(opt('min-target', 48))
const selector = opt('selector', 'body')
const crop = args.includes('--crop')
const medirFoco = !args.includes('--sin-foco')
const strict = args.includes('--strict')

mkdirSync(out, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 })
await page.goto(url, { waitUntil: 'networkidle' })

const png = join(out, `${name}.png`)
if (crop && selector !== 'body') await page.locator(selector).first().screenshot({ path: png })
else await page.screenshot({ path: png, fullPage: true })

// Árbol de accesibilidad: lo que encuentra un lector de pantalla (rol, nombre accesible, estado y orden). Sirve para
// comprobar el contrato semántico de ux.md. Requiere Playwright 1.49 o posterior.
let aria = null
try {
  aria = await page.locator(selector).first().ariaSnapshot()
} catch (e) {
  console.error(`Aviso: no se pudo leer el árbol de accesibilidad (${e.message.split('\n')[0]})`)
}
const ROLES_CON_NOMBRE = 'button|link|textbox|searchbox|checkbox|radio|switch|combobox|tab|menuitem|option|slider|spinbutton'
const sinNombre = aria
  ? aria.split('\n').filter((l) => new RegExp(`^\\s*- (${ROLES_CON_NOMBRE})(\\s*\\[[^\\]]*\\])*\\s*:?\\s*$`).test(l)).map((l) => l.trim())
  : []

// ---------------------------------------------------------------------------------------------------------------------
// 1. Medición en la página
// ---------------------------------------------------------------------------------------------------------------------
const medidas = await page.evaluate(
  ({ selector, minText, minTarget }) => {
    const root = document.querySelector(selector)
    if (!root) return { error: `No existe el selector ${selector}` }

    // --- color ---------------------------------------------------------------------------------------------------
    // Cualquier color CSS (rgb, oklch, color(), hsl...) pasa por un canvas, que lo convierte a sRGB de 8 bits.
    // Tailwind v4 y HeroUI usan oklch(): un parser que solo entienda rgb() los omitiría sin avisar.
    const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true })
    ctx.canvas.width = ctx.canvas.height = 1
    const toRgba = (css) => {
      if (!css || css === 'transparent') return { r: 0, g: 0, b: 0, a: 0 }
      ctx.clearRect(0, 0, 1, 1)
      ctx.fillStyle = '#000'
      ctx.fillStyle = css
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
      return { r, g, b, a: Math.round((a / 255) * 100) / 100 }
    }
    const hex = (c) =>
      '#' + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
    const sobre = (f, b) => ({
      r: f.r * f.a + b.r * (1 - f.a),
      g: f.g * f.a + b.g * (1 - f.a),
      b: f.b * f.a + b.b * (1 - f.a),
      a: 1,
    })
    const lum = (c) => {
      const f = (v) => {
        v /= 255
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
      }
      return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b)
    }
    const razon = (a, b) => {
      const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
      return Math.round(((x + 0.05) / (y + 0.05)) * 100) / 100
    }

    // Fondo efectivo de un elemento: las capas translúcidas se componen sobre la primera capa opaca de más arriba.
    // Imagen o degradado en el camino: no comprobable. Sin capa opaca: lienzo blanco del navegador.
    const fondoDe = (el) => {
      const capas = []
      let opaca = null
      for (let n = el; n; n = n.parentElement) {
        const cs = getComputedStyle(n)
        if (cs.backgroundImage !== 'none') return { motivo: 'fondo con imagen o degradado' }
        const c = toRgba(cs.backgroundColor)
        if (c.a > 0) {
          if (c.a >= 0.99) {
            opaca = c
            break
          }
          capas.push(c)
        }
      }
      let base = opaca ?? { r: 255, g: 255, b: 255, a: 1 }
      for (let i = capas.length - 1; i >= 0; i--) base = sobre(capas[i], base)
      return { color: base, compuesto: capas.length > 0 }
    }
    const opacidadDe = (el) => {
      let o = 1
      for (let n = el; n; n = n.parentElement) o *= Number(getComputedStyle(n).opacity)
      return Math.round(o * 100) / 100
    }

    // --- identificación estable ----------------------------------------------------------------------------------
    const ruido = /react-aria|^:r|_r_|^radix-|^headlessui|^«|\d{6,}/i
    const bloqueDe = (el) => {
      const b = el.closest('[data-bloque],[data-testid],[data-screen]')
      if (b) return b.dataset.bloque || b.dataset.testid || b.dataset.screen
      const i = el.closest('[id]')
      return i && !ruido.test(i.id) ? `#${i.id}` : ''
    }
    const textoDe = (el) => {
      const lab = el.labels && el.labels[0] ? el.labels[0].innerText : ''
      return (
        el.getAttribute('aria-label') ||
        (el.innerText || '').trim() ||
        lab ||
        el.getAttribute('placeholder') ||
        el.getAttribute('name') ||
        ''
      )
        .trim()
        .replace(/\s+/g, ' ')
        .slice(0, 50)
    }
    const descr = (el) => {
      const rol = el.getAttribute('role')
      const t = textoDe(el)
      const b = bloqueDe(el)
      return `${el.tagName.toLowerCase()}${rol ? `[${rol}]` : ''}${t ? ` "${t}"` : ''}${b ? ` @${b}` : ''}`
    }
    const numerar = (lista) => {
      const cuenta = new Map()
      for (const x of lista) cuenta.set(x.el, (cuenta.get(x.el) ?? 0) + 1)
      const vistos = new Map()
      for (const x of lista) {
        if (cuenta.get(x.el) > 1) {
          const n = (vistos.get(x.el) ?? 0) + 1
          vistos.set(x.el, n)
          x.el = `${x.el} #${n}`
        }
      }
    }

    const visible = (el) => {
      const cs = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      // La opacidad se hereda: un panel cerrado con opacity 0 esconde todo lo que tiene adentro.
      return cs.visibility !== 'hidden' && cs.display !== 'none' && opacidadDe(el) >= 0.01 && r.width > 0 && r.height > 0
    }

    // --- texto ---------------------------------------------------------------------------------------------------
    const textos = []
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    const vistos = new Set()
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const el = n.parentElement
      if (!el || vistos.has(el) || !n.textContent.trim() || !visible(el)) continue
      if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(el.tagName)) continue
      vistos.add(el)
      const cs = getComputedStyle(el)
      const fg = toRgba(cs.color)
      const op = opacidadDe(el)
      if (op < 1) fg.a = Math.round(fg.a * op * 100) / 100
      const fondo = fondoDe(el)
      const fs = parseFloat(cs.fontSize)
      const lh = parseFloat(cs.lineHeight)
      textos.push({
        el: descr(el),
        texto: n.textContent.trim().replace(/\s+/g, ' ').slice(0, 60),
        fontSizePx: fs,
        fontWeight: Number(cs.fontWeight),
        interlineado: Number.isFinite(lh) ? Math.round((lh / fs) * 100) / 100 : null,
        color: hex(fg),
        colorAlfa: fg.a,
        fondo: fondo.color ? hex(fondo.color) : null,
        fondoNoComprobable: fondo.motivo ?? null,
        aproximado: [op < 1 ? 'opacidad de un ancestro' : null, fondo.compuesto ? 'fondo compuesto' : null].filter(
          Boolean,
        ),
      })
    }
    numerar(textos)

    // --- controles: el que ve y toca la persona -------------------------------------------------------------------
    const CANDIDATOS =
      'a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button], [role=link], [role=tab], [role=checkbox], [role=radio], [role=switch], [role=menuitem], [role=option], [role=combobox], [tabindex]:not([tabindex="-1"])'
    const CONTENEDORES = new Set([
      'tabpanel', 'tablist', 'radiogroup', 'listbox', 'grid', 'table', 'dialog', 'region', 'group', 'menu', 'toolbar',
      'row', 'rowgroup', 'presentation', 'none', 'main', 'article', 'form', 'search',
    ])
    const ocultoVisualmente = (el) => {
      const cs = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      return (
        Number(cs.opacity) < 0.01 ||
        (cs.clip && cs.clip !== 'auto') ||
        (cs.clipPath && cs.clipPath !== 'none') ||
        r.width <= 2 ||
        r.height <= 2 ||
        el.closest('[aria-hidden="true"]') !== null
      )
    }
    const etiquetaDe = (el) =>
      el.closest('label') ||
      (el.id ? document.querySelector(`label[for="${CSS.escape(el.id)}"]`) : null) ||
      el.closest('[role=radio],[role=checkbox],[role=switch],[role=combobox],[role=option]')
    // Devuelve el elemento visible que representa al control, o null si no hay ninguno.
    const resolver = (el) => {
      const oculto = ocultoVisualmente(el)
      const casilla = el.matches('input[type=checkbox],input[type=radio],input[type=range]')
      if (!oculto && !casilla) return el
      const lab = etiquetaDe(el)
      if (lab && lab !== el && visible(lab) && !ocultoVisualmente(lab)) return lab
      return oculto ? null : el
    }

    const controles = []
    const omitidos = []
    const resueltos = new Map() // elemento -> índice en `controles`
    for (const el of root.querySelectorAll(CANDIDATOS)) {
      if (CONTENEDORES.has(el.getAttribute('role') ?? '')) continue
      const real = resolver(el)
      if (!real) {
        omitidos.push({ el: descr(el), motivo: 'control nativo oculto sin etiqueta ni rol visible' })
        continue
      }
      if (!visible(real) || resueltos.has(real)) continue
      const r = real.getBoundingClientRect()
      resueltos.set(real, controles.length)
      controles.push({
        el: descr(real),
        nativoOculto: real !== el,
        enLinea: real.tagName === 'A' && getComputedStyle(real).display === 'inline',
        anchoPx: Math.round(r.width * 10) / 10,
        altoPx: Math.round(r.height * 10) / 10,
        _nodo: real,
      })
    }
    numerar(controles)

    // --- contraste no textual (WCAG 1.4.11) -----------------------------------------------------------------------
    // Borde (o sombra de 0 de desfoque que hace de borde) y fondo del control contra el fondo de al lado.
    const bordeDe = (el) => {
      const cs = getComputedStyle(el)
      const out = []
      const w = parseFloat(cs.borderTopWidth)
      if (w > 0 && cs.borderTopStyle !== 'none') {
        const c = toRgba(cs.borderTopColor)
        if (c.a > 0) out.push(c)
      }
      if (cs.boxShadow && cs.boxShadow !== 'none') {
        // Capas separadas por comas fuera de paréntesis.
        const capas = cs.boxShadow.split(/,(?![^(]*\))/)
        for (const capa of capas) {
          const nums = [...capa.matchAll(/(-?[\d.]+)px/g)].map((m) => parseFloat(m[1]))
          const [, , blur = 0, spread = 0] = nums
          const color = capa.replace(/(-?[\d.]+)px/g, '').replace(/inset/, '').trim()
          if (blur === 0 && spread > 0) {
            const c = toRgba(color)
            if (c.a > 0) out.push(c)
          }
        }
      }
      return out
    }
    const contrasteDe = (el) => {
      const padre = el.parentElement ?? el
      const fondoPadre = fondoDe(padre)
      if (!fondoPadre.color) return null
      let mejor = null
      const r0 = el.getBoundingClientRect()
      // El control y los envoltorios que lo dibujan (casi del mismo tamaño).
      const piezas = [el]
      for (let n = el.parentElement, i = 0; n && n !== root && i < 3; n = n.parentElement, i++) {
        const r = n.getBoundingClientRect()
        if (Math.abs(r.width - r0.width) <= 10 && Math.abs(r.height - r0.height) <= 10) piezas.push(n)
      }
      for (const p of piezas) {
        const base = p.parentElement ? fondoDe(p.parentElement) : fondoPadre
        if (!base.color) continue
        const candidatos = []
        for (const b of bordeDe(p)) candidatos.push({ tipo: 'borde', color: sobre(b, base.color) })
        const f = toRgba(getComputedStyle(p).backgroundColor)
        if (f.a > 0 && getComputedStyle(p).backgroundImage === 'none')
          candidatos.push({ tipo: 'fondo', color: sobre(f, base.color) })
        for (const c of candidatos) {
          const v = razon(c.color, base.color)
          if (!mejor || v > mejor.razon) mejor = { tipo: c.tipo, razon: v, fg: hex(c.color), bg: hex(base.color) }
        }
      }
      return mejor ?? { tipo: 'ninguno', razon: 1, fg: hex(fondoPadre.color), bg: hex(fondoPadre.color) }
    }
    // La marca de una casilla, un radio o un interruptor: la primera pieza chica con borde o fondo.
    const marcaDe = (el) => {
      for (const d of el.querySelectorAll('*')) {
        const r = d.getBoundingClientRect()
        if (r.width < 8 || r.height < 8 || r.width > 64 || r.height > 64 || !visible(d)) continue
        const cs = getComputedStyle(d)
        if (bordeDe(d).length || toRgba(cs.backgroundColor).a > 0) return d
      }
      return null
    }
    const noTexto = []
    const paresNoTexto = []
    for (const c of controles) {
      const el = c._nodo
      let objetivo = null
      let tipo = null
      const inp = el.matches('input,select,textarea') ? el : el.querySelector('input,select,textarea')
      const rol = el.getAttribute('role')
      if (inp && inp.tagName !== 'SELECT' && (inp.tagName === 'TEXTAREA' || /^(text|search|email|tel|url|password|number|date)?$/.test(inp.type ?? ''))) {
        objetivo = el.matches('input,textarea') ? el : inp
        tipo = 'campo de texto'
      } else if (el.tagName === 'SELECT' || rol === 'combobox' || el.matches('[aria-haspopup=listbox]')) {
        objetivo = el
        tipo = 'selector'
      } else if (el.tagName !== 'BUTTON' && ((inp && /checkbox|radio/.test(inp.type)) || /checkbox|radio|switch/.test(rol ?? ''))) {
        // Un <button role="radio"> es un botón (por ejemplo un filtro segmentado): se mide como botón, no como casilla.
        objetivo = marcaDe(el) ?? el
        tipo = 'casilla, radio o interruptor'
      }
      if (!objetivo) continue
      const m = contrasteDe(objetivo)
      if (!m) continue
      const el_ = c.el
      noTexto.push({ el: el_, tipo, usa: m.tipo, razon: m.razon, cumple: m.razon >= 3 })
      paresNoTexto.push({ name: `[no texto · ${m.tipo}] ${el_}`, fg: m.fg, bg: m.bg, kind: 'non-text' })
    }

    // --- índice para el recorrido con teclado ----------------------------------------------------------------------
    window.__medir = {
      // Cuántos elementos enfocables hay en TODA la página: con --selector, los de afuera también consumen Tabs.
      totalEnfocables: document.querySelectorAll(CANDIDATOS).length,
      nodos: controles.map((c) => c._nodo),
      rect: (i) => {
        const r = window.__medir.nodos[i].getBoundingClientRect()
        return { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height }
      },
      idActivo: () => {
        const a = document.activeElement
        if (!a || a === document.body) return null
        let n = resolver(a) ?? a
        while (n && !resueltos.has(n)) n = n.parentElement
        return n ? resueltos.get(n) : -1
      },
    }

    const textoBajoPiso = textos.filter((t) => t.fontSizePx < minText)
    const lista = controles.map(({ _nodo, ...resto }) => resto)
    const targetsBajoPiso = lista.filter((t) => t.anchoPx < minTarget || t.altoPx < minTarget)
    const interl = textos.filter((t) => t.interlineado != null).map((t) => t.interlineado)

    return {
      viewport: { ancho: window.innerWidth, alto: window.innerHeight },
      pisos: { textoPx: minText, targetPx: minTarget },
      resumen: {
        textos: textos.length,
        textoMinimoPx: textos.length ? Math.min(...textos.map((t) => t.fontSizePx)) : null,
        textosBajoPiso: textoBajoPiso.length,
        interlineadoMinimo: interl.length ? Math.min(...interl) : null,
        targets: lista.length,
        targetMinimoPx: lista.length ? Math.min(...lista.map((t) => Math.min(t.anchoPx, t.altoPx))) : null,
        targetsBajoPiso: targetsBajoPiso.length,
        controlesNativosOmitidos: omitidos.length,
        noTextoMedidos: noTexto.length,
        noTextoBajo3: noTexto.filter((x) => !x.cumple).length,
        desbordeHorizontal: document.documentElement.scrollWidth > window.innerWidth,
      },
      textoBajoPiso,
      targetsBajoPiso,
      noTexto,
      omitidos,
      textos,
      targets: lista,
      _paresNoTexto: paresNoTexto,
    }
  },
  { selector, minText, minTarget },
)

if (medidas.error) {
  await browser.close()
  console.error(medidas.error)
  process.exit(2)
}

// ---------------------------------------------------------------------------------------------------------------------
// 2. Foco con teclado: Tab, captura recortada con y sin foco, diferencia por píxeles
// ---------------------------------------------------------------------------------------------------------------------
const foco = { medido: false, recorrido: [], noAlcanzables: [], fueraDeLista: 0 }
if (medirFoco && medidas.targets.length) {
  foco.medido = true
  const n = medidas.targets.length
  const margen = 8
  const clipDe = async (i) => {
    const r = await page.evaluate((k) => window.__medir.rect(k), i)
    const x = Math.max(0, r.x - margen)
    const y = Math.max(0, r.y - margen)
    return { x, y, width: r.w + margen * 2, height: r.h + margen * 2 }
  }
  await page.evaluate(() => document.activeElement && document.activeElement.blur())
  await page.mouse.move(0, 0)
  const base = []
  for (let i = 0; i < n; i++) base.push((await page.screenshot({ clip: await clipDe(i), fullPage: true })).toString('base64'))

  const vistos = new Set()
  const pasos = []
  const totalEnfocables = await page.evaluate(() => window.__medir.totalEnfocables)
  for (let k = 0; k < totalEnfocables * 2 + 5; k++) {
    await page.keyboard.press('Tab')
    await page.waitForTimeout(120)
    const id = await page.evaluate(() => window.__medir.idActivo())
    if (id === null) break
    if (id === -1) {
      foco.fueraDeLista++
      continue
    }
    if (vistos.has(id)) break
    vistos.add(id)
    pasos.push({ id, orden: pasos.length + 1, con: (await page.screenshot({ clip: await clipDe(id), fullPage: true })).toString('base64') })
  }
  await page.evaluate(() => document.activeElement && document.activeElement.blur())

  const comparar = await page.evaluate(async (pares) => {
    const cargar = (b64) =>
      new Promise((res, rej) => {
        const im = new Image()
        im.onload = () => res(im)
        im.onerror = rej
        im.src = `data:image/png;base64,${b64}`
      })
    const pix = (im) => {
      const c = document.createElement('canvas')
      c.width = im.width
      c.height = im.height
      const g = c.getContext('2d', { willReadFrequently: true })
      g.drawImage(im, 0, 0)
      return g.getImageData(0, 0, im.width, im.height).data
    }
    const salida = []
    for (const [a, b] of pares) {
      const A = pix(await cargar(a))
      const B = pix(await cargar(b))
      let cambiados = 0
      let max = 0
      let at = -1
      for (let i = 0; i < Math.min(A.length, B.length); i += 4) {
        const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2]))
        if (d > 8) cambiados++
        if (d > max) {
          max = d
          at = i
        }
      }
      salida.push({
        cambiados,
        con: at >= 0 ? [B[at], B[at + 1], B[at + 2]] : null,
        sin: at >= 0 ? [A[at], A[at + 1], A[at + 2]] : null,
      })
    }
    return salida
  }, pasos.map((p) => [base[p.id], p.con]))

  const lum = (c) => {
    const f = (v) => {
      v /= 255
      return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
    }
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2])
  }
  const razon = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
    return Math.round(((x + 0.05) / (y + 0.05)) * 100) / 100
  }
  pasos.forEach((p, j) => {
    const c = comparar[j]
    const indicador = c.cambiados >= 20
    foco.recorrido.push({
      orden: p.orden,
      el: medidas.targets[p.id].el,
      indicador,
      pixelesCambiados: c.cambiados,
      contrasteAro: indicador && c.con && c.sin ? razon(c.con, c.sin) : null,
    })
  })
  foco.noAlcanzables = medidas.targets.filter((_, i) => !vistos.has(i)).map((t) => t.el)
}
await browser.close()

const focoResumen = foco.medido
  ? {
      alcanzadosConTab: foco.recorrido.length,
      sinIndicadorDeFoco: foco.recorrido.filter((f) => !f.indicador).length,
      aroBajo3: foco.recorrido.filter((f) => f.indicador && f.contrasteAro !== null && f.contrasteAro < 3).length,
      noAlcanzablesConTab: foco.noAlcanzables.length,
    }
  : null
medidas.resumen.foco = focoResumen
medidas.foco = foco

// ---------------------------------------------------------------------------------------------------------------------
// 3. Archivos
// ---------------------------------------------------------------------------------------------------------------------
const paresNoTexto = medidas._paresNoTexto
delete medidas._paresNoTexto
medidas.resumen.controlesSinNombreAccesible = aria ? sinNombre.length : null
medidas.controlesSinNombreAccesible = sinNombre
writeFileSync(join(out, `${name}.medidas.json`), JSON.stringify(medidas, null, 2))
if (aria) writeFileSync(join(out, `${name}.aria.yml`), aria + '\n')

const pares = []
const noComprobables = []
for (const t of medidas.textos) {
  if (!t.fondo) {
    noComprobables.push({ name: t.el, motivo: t.fondoNoComprobable })
    continue
  }
  const alfa = t.colorAlfa < 1 ? Math.round(t.colorAlfa * 255).toString(16).padStart(2, '0') : ''
  pares.push({
    name: t.el,
    fg: `${t.color}${alfa}`,
    bg: t.fondo,
    size: t.fontSizePx,
    bold: t.fontWeight >= 700,
    kind: 'text',
    ...(t.aproximado.length ? { aproximado: t.aproximado.join(', ') } : {}),
  })
}
pares.push(...paresNoTexto)
writeFileSync(join(out, `${name}.contraste.json`), JSON.stringify(pares, null, 2))
if (noComprobables.length) {
  writeFileSync(join(out, `${name}.contraste-no-comprobable.json`), JSON.stringify(noComprobables, null, 2))
}

// ---------------------------------------------------------------------------------------------------------------------
// 4. Resumen en pantalla
// ---------------------------------------------------------------------------------------------------------------------
const r = medidas.resumen
console.log(`${name}: ${width}x${height}${crop && selector !== 'body' ? ` (recorte de ${selector})` : ''}`)
console.log(`  texto:   ${r.textos} elementos, mínimo ${r.textoMinimoPx} px, bajo ${minText} px: ${r.textosBajoPiso}`)
console.log(`  targets: ${r.targets} controles, mínimo ${r.targetMinimoPx} px, bajo ${minTarget} px: ${r.targetsBajoPiso}` +
  (r.controlesNativosOmitidos ? ` (omitidos ${r.controlesNativosOmitidos} nativos ocultos sin etiqueta)` : ''))
console.log(`  contraste no textual: ${r.noTextoMedidos} controles, bajo 3:1: ${r.noTextoBajo3}`)
if (focoResumen) {
  console.log(`  foco:    ${focoResumen.alcanzadosConTab} con Tab, sin indicador: ${focoResumen.sinIndicadorDeFoco}, aro bajo 3:1: ${focoResumen.aroBajo3}, no alcanzables con Tab: ${focoResumen.noAlcanzablesConTab}`)
}
console.log(`  desborde horizontal: ${r.desbordeHorizontal ? 'SÍ' : 'no'}`)
console.log(aria
  ? `  semántica: árbol en ${join(out, `${name}.aria.yml`)}, controles sin nombre accesible: ${sinNombre.length}`
  : '  semántica: no comprobable (Playwright sin ariaSnapshot)')
for (const l of sinNombre.slice(0, 10)) console.log(`  ! sin nombre accesible: ${l}`)
console.log(`  contraste: ${pares.length} pares (python .../contrast.py --json ${join(out, `${name}.contraste.json`)}), no comprobables: ${noComprobables.length}`)
for (const t of medidas.textoBajoPiso.slice(0, 10)) console.log(`  ! texto ${t.fontSizePx}px: ${t.el}`)
for (const t of medidas.targetsBajoPiso.slice(0, 10)) console.log(`  ! target ${t.anchoPx}x${t.altoPx}px: ${t.el}`)
for (const t of medidas.noTexto.filter((x) => !x.cumple).slice(0, 10)) console.log(`  ! no textual ${t.razon}:1 (${t.tipo}): ${t.el}`)
for (const f of foco.recorrido.filter((x) => !x.indicador).slice(0, 10)) console.log(`  ! sin foco visible: ${f.el}`)

const falla =
  r.textosBajoPiso > 0 ||
  r.targetsBajoPiso > 0 ||
  r.desbordeHorizontal ||
  r.noTextoBajo3 > 0 ||
  sinNombre.length > 0 ||
  (focoResumen && (focoResumen.sinIndicadorDeFoco > 0 || focoResumen.aroBajo3 > 0))
if (strict && falla) process.exit(1)
