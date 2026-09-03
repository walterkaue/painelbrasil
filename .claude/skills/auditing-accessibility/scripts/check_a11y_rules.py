#!/usr/bin/env python3
"""Varre uma pagina HTML em busca de violacoes das duas regras de acessibilidade
do projeto: alt text generico e botao repetido sem aria-label distinguindo o alvo.

Uso: python check_a11y_rules.py <pagina.html>

Checagem estatica e heuristica, nao substitui revisao manual - sobretudo a regra
de aria-label dinamico (texto que muda via JS), que precisa conferir se o script
atualiza o aria-label junto com o texto visivel. Ver SKILL.md.
"""
import re
import sys
from collections import Counter
from pathlib import Path

BANNED_ALT_PATTERNS = [
    r"^imagem$",
    r"^foto$",
    r"^picture$",
    r"^image$",
    r"^tela (do|de) [\w\s]+$",
    r"^screenshot$",
]


def find_img_tags(html):
    return re.findall(r"<img\b[^>]*>", html, re.IGNORECASE)


def check_alt_text(html):
    issues = []
    for tag in find_img_tags(html):
        alt_match = re.search(r'alt\s*=\s*["\']([^"\']*)["\']', tag, re.IGNORECASE)
        if not alt_match:
            issues.append(f"sem atributo alt: {tag[:80]}")
            continue
        alt = alt_match.group(1).strip()
        if not alt:
            issues.append(f"alt vazio: {tag[:80]}")
            continue
        for pattern in BANNED_ALT_PATTERNS:
            if re.match(pattern, alt, re.IGNORECASE):
                issues.append(f"alt generico ('{alt}'): {tag[:80]}")
                break
    return issues


def check_repeated_buttons(html):
    issues = []
    buttons = re.findall(r"<button\b[^>]*>(.*?)</button>", html, re.IGNORECASE | re.DOTALL)
    button_tags = re.findall(r"<button\b[^>]*>.*?</button>", html, re.IGNORECASE | re.DOTALL)
    texts = [re.sub(r"<[^>]+>", "", t).strip() for t in buttons]
    counts = Counter(t for t in texts if t)
    for text, tag in zip(texts, button_tags):
        if text and counts[text] > 1:
            has_aria = re.search(r'aria-label\s*=\s*["\']', tag, re.IGNORECASE)
            if not has_aria:
                issues.append(
                    f"botao com texto repetido ('{text}', aparece {counts[text]}x) "
                    f"sem aria-label: {tag[:100]}"
                )
    return issues


def main():
    if len(sys.argv) < 2:
        print("Uso: python check_a11y_rules.py <pagina.html>")
        return 1

    page_path = Path(sys.argv[1])
    if not page_path.exists():
        print(f"Arquivo nao encontrado: {page_path}")
        return 1

    html = page_path.read_text(encoding="utf-8")

    alt_issues = check_alt_text(html)
    button_issues = check_repeated_buttons(html)

    if not alt_issues and not button_issues:
        print(f"OK - {page_path}: nenhuma violacao estatica encontrada.")
        print(
            "Lembrete: isto nao confere aria-label dinamico em botao com estado "
            "(ver SKILL.md) - precisa revisao manual do JS."
        )
        return 0

    print(f"Revisar - {page_path}")
    for i in alt_issues:
        print(f"  [alt text] {i}")
    for i in button_issues:
        print(f"  [aria-label] {i}")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
