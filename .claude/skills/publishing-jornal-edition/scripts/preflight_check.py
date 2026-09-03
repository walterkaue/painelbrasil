#!/usr/bin/env python3
"""Pre-checagem local do checklist de publicacao semanal d'A Banca, antes do commit.

Espelha (e estende) a auditoria que .github/workflows/checklist-banca.yml roda em CI
depois do push - a ideia e pegar o mesmo erro antes, nao depois.

Uso: python preflight_check.py <salesforce|mercado> <AAAA-MM-DD>
"""
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path


def main():
    if len(sys.argv) != 3:
        print("Uso: python preflight_check.py <salesforce|mercado> <AAAA-MM-DD>")
        return 1

    caderno, data = sys.argv[1], sys.argv[2]
    if caderno not in ("salesforce", "mercado"):
        print(f"Caderno invalido: {caderno} (use salesforce ou mercado)")
        return 1

    root = Path(".")
    edicao_path = root / "jornal" / caderno / data / "index.html"
    index_path = root / "jornal" / caderno / "index.html"
    feed_path = root / "jornal" / caderno / "feed.xml"
    capa_path = root / "jornal" / "index.html"
    rel = f"/jornal/{caderno}/{data}/"

    errors = []
    warnings = []

    if not edicao_path.exists():
        print(f"ERRO: {edicao_path} nao existe - passo 1 (criar a partir do BLOCO-MODELO) nao foi feito.")
        return 1

    edicao_html = edicao_path.read_text(encoding="utf-8")

    if not index_path.exists() or rel not in index_path.read_text(encoding="utf-8"):
        errors.append(f"passo 2: card da edicao ({rel}) nao encontrado em {index_path}")

    if not feed_path.exists():
        errors.append(f"passo 4: {feed_path} nao existe")
    else:
        feed_text = feed_path.read_text(encoding="utf-8")
        if rel not in feed_text:
            errors.append(f"passo 4: edicao ({rel}) nao encontrada em {feed_path}")
        try:
            ET.fromstring(feed_text)
        except ET.ParseError as e:
            errors.append(f"passo 4: {feed_path} nao e XML bem formado: {e}")

    if "Edição anterior" not in edicao_html:
        errors.append("passo 5: link 'Edição anterior' não encontrado na página nova")

    prev_match = re.search(r'class="prev" href="(/jornal/[^"]+/)"', edicao_html)
    if prev_match:
        prev_rel = prev_match.group(1).strip("/")
        prev_path = root / prev_rel / "index.html"
        if prev_path.exists():
            if "Próxima edição" not in prev_path.read_text(encoding="utf-8"):
                errors.append(f"passo 5: link 'Próxima edição' não encontrado em {prev_path} (edição anterior)")
        else:
            warnings.append(f"não encontrei {prev_path} para conferir o link 'Próxima edição'")
    else:
        warnings.append("não encontrei link .prev na página nova - não deu para conferir a ligação com a edição anterior")

    marker = f"ULTIMA-{caderno.upper()}-INICIO"
    if not capa_path.exists() or marker not in capa_path.read_text(encoding="utf-8"):
        warnings.append(f"passo 3: bloco {marker} não encontrado em {capa_path} - conferir se a capa foi atualizada")
    else:
        capa_text = capa_path.read_text(encoding="utf-8")
        start = capa_text.find(marker)
        window = capa_text[start:start + 1500]
        if data not in window:
            warnings.append(f"passo 3: bloco da capa não parece citar {data} - conferir manualmente")

    resumo_path = edicao_path.parent / "resumo.mp3"
    if not resumo_path.exists():
        warnings.append("passo 6: resumo.mp3 ainda não existe nesta pasta - falta gerar o áudio (Skill recording-audio-summary)")
    if "data-ouvir-edicao" not in edicao_html:
        warnings.append("passo 6: bloco .ouvir não encontrado na página nova")

    if errors:
        print(f"FALHOU - edição {caderno} {data}")
        for e in errors:
            print(f"  [erro] {e}")
        for w in warnings:
            print(f"  [aviso] {w}")
        return 1

    print(f"OK - edição {caderno} {data} passa nos itens obrigatórios do checklist.")
    for w in warnings:
        print(f"  [aviso] {w}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
