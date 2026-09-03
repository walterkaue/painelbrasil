#!/usr/bin/env python3
"""Comprime um PNG com pngquant e confere que a dimensao nao mudou.

Uso: python compress_png.py <entrada.png> [saida.png]
Sem <saida.png>, sobrescreve a entrada.
"""
import struct
import subprocess
import sys
from pathlib import Path

# Teto de sanidade, nao meta de qualidade: maior PNG de compartilhamento real no site hoje
# (repente/assets/og-trabalho.png) fica em ~61KB. 150KB e ~2.5x isso, o suficiente pra pegar
# "alguem esqueceu de comprimir" sem incomodar por variacao normal entre cards.
SANITY_CEILING_KB = 150


def png_dimensions(path):
    with open(path, "rb") as f:
        header = f.read(24)
    if header[:8] != b"\x89PNG\r\n\x1a\n" or header[12:16] != b"IHDR":
        raise ValueError(f"{path} nao parece um PNG valido (assinatura ou IHDR ausente)")
    return struct.unpack(">II", header[16:24])


def main():
    if len(sys.argv) < 2:
        print("Uso: python compress_png.py <entrada.png> [saida.png]")
        return 1

    src = Path(sys.argv[1])
    dst = Path(sys.argv[2]) if len(sys.argv) > 2 else src

    if not src.exists():
        print(f"Arquivo nao encontrado: {src}")
        return 1

    before_w, before_h = png_dimensions(src)
    before_size = src.stat().st_size

    tmp_dst = dst.with_suffix(".tmp.png") if dst == src else dst
    result = subprocess.run(
        ["pngquant", "--force", "--output", str(tmp_dst), "--", str(src)],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"pngquant falhou (codigo {result.returncode}): {result.stderr.strip()}")
        return 1

    after_w, after_h = png_dimensions(tmp_dst)

    if (after_w, after_h) != (before_w, before_h):
        tmp_dst.unlink(missing_ok=True)
        print(
            f"ERRO: dimensao mudou na compressao — antes {before_w}x{before_h}, "
            f"depois {after_w}x{after_h}. Nao commitar este arquivo."
        )
        return 1

    if tmp_dst != dst:
        tmp_dst.replace(dst)

    after_size = dst.stat().st_size
    after_kb = after_size / 1024

    print(f"OK — {before_w}x{before_h} preservado. {before_size / 1024:.1f}KB -> {after_kb:.1f}KB")

    if after_kb > SANITY_CEILING_KB:
        print(
            f"Aviso: {after_kb:.1f}KB acima do teto de sanidade ({SANITY_CEILING_KB}KB) — "
            "revisar manualmente se faz sentido pra uma imagem de compartilhamento."
        )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
