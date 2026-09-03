#!/usr/bin/env python3
"""Confere o checklist de tags Open Graph/Twitter de uma pagina do site.

Uso: python check_og_tags.py <caminho/para/pagina.html> [--type article|website|profile]
"""
import argparse
import re
import struct
import sys
from pathlib import Path
from urllib.parse import urlparse

REQUIRED_META = [
    ("property", "og:site_name"),
    ("property", "og:type"),
    ("property", "og:locale"),
    ("property", "og:title"),
    ("property", "og:description"),
    ("property", "og:url"),
    ("property", "og:image"),
    ("property", "og:image:width"),
    ("property", "og:image:height"),
    ("property", "og:image:alt"),
    ("name", "twitter:card"),
    ("name", "twitter:title"),
    ("name", "twitter:description"),
    ("name", "twitter:image"),
]

SITE_ORIGIN = "https://kauewalter.com.br"


def parse_meta_tags(html):
    tags = {}
    for match in re.finditer(r"<meta\s+[^>]*>", html, re.IGNORECASE):
        tag = match.group(0)
        prop = re.search(r'property=["\']([^"\']+)["\']', tag)
        name = re.search(r'name=["\']([^"\']+)["\']', tag)
        content = re.search(r'content=["\']([^"\']*)["\']', tag)
        if content is None:
            continue
        if prop:
            tags[("property", prop.group(1))] = content.group(1)
        elif name:
            tags[("name", name.group(1))] = content.group(1)
    return tags


def png_dimensions(path):
    if not path.exists():
        return None
    with open(path, "rb") as f:
        header = f.read(24)
    if header[:8] != b"\x89PNG\r\n\x1a\n" or header[12:16] != b"IHDR":
        return None
    return struct.unpack(">II", header[16:24])


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("page", help="Caminho da pagina HTML")
    parser.add_argument("--type", default=None, help="og:type esperado (ex.: article, website, profile)")
    parser.add_argument("--repo-root", default=".", help="Raiz do repositorio (para resolver og:image local)")
    args = parser.parse_args()

    page_path = Path(args.page)
    if not page_path.exists():
        print(f"Arquivo nao encontrado: {page_path}")
        return 1

    html = page_path.read_text(encoding="utf-8")
    tags = parse_meta_tags(html)

    errors = []

    for kind, key in REQUIRED_META:
        if (kind, key) not in tags or not tags[(kind, key)].strip():
            errors.append(f"tag ausente ou vazia: {kind}={key}")

    og_url = tags.get(("property", "og:url"))
    if og_url and not og_url.startswith(SITE_ORIGIN):
        errors.append(f"og:url nao e absoluto (esperado prefixo {SITE_ORIGIN}): {og_url}")

    og_image = tags.get(("property", "og:image"))
    if og_image and not og_image.startswith(SITE_ORIGIN):
        errors.append(f"og:image nao e absoluto (esperado prefixo {SITE_ORIGIN}): {og_image}")

    if args.type:
        og_type = tags.get(("property", "og:type"))
        if og_type != args.type:
            errors.append(f"og:type esperado '{args.type}', encontrado '{og_type}'")

    if og_image:
        parsed = urlparse(og_image)
        local_path = Path(args.repo_root) / parsed.path.lstrip("/")
        dims = png_dimensions(local_path)
        if dims is None:
            print(
                f"Aviso: nao consegui ler dimensao de {local_path} "
                "(arquivo nao existe localmente ou nao e PNG) - pulei a checagem de dimensao."
            )
        else:
            real_w, real_h = dims
            declared_w = tags.get(("property", "og:image:width")) or "ausente"
            declared_h = tags.get(("property", "og:image:height")) or "ausente"
            if str(real_w) != str(declared_w) or str(real_h) != str(declared_h):
                errors.append(
                    f"dimensao declarada ({declared_w}x{declared_h}) nao bate com o arquivo real "
                    f"({real_w}x{real_h}) em {local_path}"
                )

    if errors:
        print(f"FALHOU - {page_path}")
        for e in errors:
            print(f"  - {e}")
        return 1

    print(f"OK - {page_path} passa no checklist de Open Graph.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
