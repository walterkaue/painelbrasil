#!/usr/bin/env python3
"""Conta os caracteres do roteiro de narracao (apos o separador ---) e compara
com o orcamento de creditos ElevenLabs. 1 caractere = 1 credito, confirmado na
pratica (ver jornal/creditos-elevenlabs.md, nao e estimativa).

Uso: python check_roteiro_budget.py <roteiro.md>
"""
import sys
from pathlib import Path

TARGET_MIN = 650
TARGET_MAX = 800
HARD_CEILING = 900  # ver "Regra de prioridade" em jornal/creditos-elevenlabs.md


def extract_narration(text):
    parts = text.split("\n---\n", 1)
    if len(parts) == 2:
        return parts[1].strip()
    return text.strip()


def main():
    if len(sys.argv) != 2:
        print("Uso: python check_roteiro_budget.py <roteiro.md>")
        return 1

    path = Path(sys.argv[1])
    if not path.exists():
        print(f"Arquivo nao encontrado: {path}")
        return 1

    text = path.read_text(encoding="utf-8")
    narration = extract_narration(text)
    count = len(narration)

    print(f"{path}: {count} caracteres de narracao (= {count} creditos ElevenLabs, 1:1 confirmado).")

    if count > HARD_CEILING:
        print(
            f"ERRO: acima do teto de {HARD_CEILING} caracteres da regra de prioridade "
            "em jornal/creditos-elevenlabs.md - cortar o roteiro antes de gerar."
        )
        return 1
    if count > TARGET_MAX:
        print(f"Aviso: acima da faixa saudavel ({TARGET_MIN}-{TARGET_MAX}) - considerar cortar.")
    elif count < TARGET_MIN:
        print(f"Aviso: abaixo da faixa saudavel ({TARGET_MIN}-{TARGET_MAX}) - conferir se nao ficou raso demais.")
    else:
        print("Dentro da faixa saudavel.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
