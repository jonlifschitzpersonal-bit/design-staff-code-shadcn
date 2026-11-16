#!/usr/bin/env python3
"""Contraste WCAG 2.x entre colores leídos del DOM (tools/medir.mjs) o de un diseño.

Uso:
  python contrast.py FG BG [FG BG ...]
  python contrast.py --json pares.json      # [{"name": "...", "fg": "#...", "bg": "#...", "size": 24, "bold": false, "kind": "text"}]

Colores: #RGB, #RRGGBB o #RRGGBBAA. Si el primer plano tiene alfa, se compone sobre el fondo
(el fondo debe ser opaco: si no lo es, compóngalo antes contra la superficie de abajo).
Si se pasan size/bold/kind, informa el umbral que corresponde:
  text normal  4.5:1 · text grande (>=24px, o >=18.66px bold) 3:1 · non-text (bordes de control,
  íconos con significado, focus ring, líneas de gráfico) 3:1.
"""

from __future__ import annotations

import json
import sys


def parse(value: str) -> tuple[float, float, float, float]:
    raw = value.strip().lstrip("#")
    if len(raw) == 3:
        raw = "".join(ch * 2 for ch in raw)
    if len(raw) not in (6, 8):
        raise ValueError(f"Color inválido: {value}")
    r, g, b = (int(raw[i:i + 2], 16) / 255 for i in (0, 2, 4))
    a = int(raw[6:8], 16) / 255 if len(raw) == 8 else 1.0
    return r, g, b, a


def composite(fg: tuple[float, float, float, float], bg: tuple[float, float, float, float]) -> tuple[float, float, float]:
    if bg[3] < 1:
        raise ValueError("El fondo tiene transparencia: compóngalo antes contra la superficie de abajo")
    a = fg[3]
    return tuple(fg[i] * a + bg[i] * (1 - a) for i in range(3))  # type: ignore[return-value]


def luminance(rgb: tuple[float, float, float]) -> float:
    def channel(c: float) -> float:
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (channel(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(fg_hex: str, bg_hex: str) -> float:
    bg = parse(bg_hex)
    fg = composite(parse(fg_hex), bg)
    l1, l2 = sorted((luminance(fg), luminance(bg[:3])), reverse=True)
    return (l1 + 0.05) / (l2 + 0.05)


def threshold(kind: str | None, size: float | None, bold: bool) -> tuple[float, str] | None:
    if kind == "non-text":
        return 3.0, "non-text 3:1"
    if size is None:
        return None
    large = size >= 24 or (bold and size >= 18.66)
    return (3.0, "texto grande 3:1") if large else (4.5, "texto normal 4.5:1")


def report(name: str, fg: str, bg: str, size: float | None = None, bold: bool = False, kind: str | None = None) -> bool:
    value = ratio(fg, bg)
    limit = threshold(kind, size, bold)
    verdict = ""
    ok = True
    if limit:
        ok = value >= limit[0]
        verdict = f"  {'CUMPLE' if ok else 'FALLA'} ({limit[1]})"
    label = f"{name}: " if name else ""
    print(f"{label}{fg} sobre {bg} = {value:.2f}:1{verdict}")
    return ok


def main(argv: list[str]) -> int:
    # En la consola de Windows (cp1252) los acentos y los símbolos salen rotos: forzamos UTF-8.
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if not argv or argv[0] in {"-h", "--help"}:
        print(__doc__)
        return 0
    ok = True
    if argv[0] == "--json":
        with open(argv[1], encoding="utf-8") as stream:
            for item in json.load(stream):
                ok &= report(item.get("name", ""), item["fg"], item["bg"], item.get("size"),
                             bool(item.get("bold", False)), item.get("kind"))
        return 0 if ok else 1
    if len(argv) % 2:
        print("Pasá pares FG BG", file=sys.stderr)
        return 2
    for i in range(0, len(argv), 2):
        report("", argv[i], argv[i + 1])
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
