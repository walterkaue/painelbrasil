#!/usr/bin/env python3
"""Confere se og:image:width/height declarado em cada página bate com o PNG real.

Rodar antes de colar uma URL nova no LinkedIn Post Inspector — o LinkedIn cacheia
o primeiro acesso, então card com dimensão errada fica preso (ver CLAUDE.md,
seção Open Graph). Só lê e compara; não redimensiona nem otimiza imagem.

Uso: python3 scripts/verificar-og-image.py
Sai com código 1 se achar alguma divergência.
"""
import re
import struct
import sys
from pathlib import Path

if sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")

RAIZ = Path(__file__).resolve().parent.parent
DOMINIO = "https://kauewalter.com.br/"

PADRAO_IMAGEM = re.compile(r'property="og:image"\s+content="([^"]+)"')
PADRAO_LARGURA = re.compile(r'property="og:image:width"\s+content="(\d+)"')
PADRAO_ALTURA = re.compile(r'property="og:image:height"\s+content="(\d+)"')


def tamanho_png(caminho):
    with open(caminho, "rb") as f:
        cabecalho = f.read(24)
    if cabecalho[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    largura, altura = struct.unpack(">II", cabecalho[16:24])
    return largura, altura


def resolver_caminho_local(url):
    if not url.startswith(DOMINIO):
        return None
    return RAIZ / url[len(DOMINIO):]


def conferir_pagina(caminho_html):
    texto = caminho_html.read_text(encoding="utf-8")
    m_img = PADRAO_IMAGEM.search(texto)
    if not m_img:
        return None

    url_imagem = m_img.group(1)
    caminho_imagem = resolver_caminho_local(url_imagem)
    relativo = caminho_html.relative_to(RAIZ)

    if caminho_imagem is None:
        return f"{relativo}: og:image não é URL absoluta de kauewalter.com.br — {url_imagem}"
    if not caminho_imagem.exists():
        return f"{relativo}: og:image aponta pra arquivo que não existe — {caminho_imagem.relative_to(RAIZ)}"

    real = tamanho_png(caminho_imagem)
    if real is None:
        return f"{relativo}: {caminho_imagem.name} não é um PNG válido"

    m_w = PADRAO_LARGURA.search(texto)
    m_h = PADRAO_ALTURA.search(texto)
    if not m_w or not m_h:
        return f"{relativo}: tem og:image mas falta og:image:width ou og:image:height"

    declarado = (int(m_w.group(1)), int(m_h.group(1)))
    if declarado != real:
        return (f"{relativo}: declarado {declarado[0]}x{declarado[1]}, "
                f"arquivo real é {real[0]}x{real[1]} ({caminho_imagem.relative_to(RAIZ)})")

    return None


def main():
    problemas = []
    for caminho_html in sorted(RAIZ.rglob("*.html")):
        if any(parte in {"_rascunhos", "node_modules"} for parte in caminho_html.parts):
            continue
        problema = conferir_pagina(caminho_html)
        if problema:
            problemas.append(problema)

    if not problemas:
        print("Tudo certo — og:image:width/height bate com o arquivo real em todas as páginas.")
        return 0

    print(f"{len(problemas)} problema(s) encontrado(s):\n")
    for p in problemas:
        print(f"  - {p}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
