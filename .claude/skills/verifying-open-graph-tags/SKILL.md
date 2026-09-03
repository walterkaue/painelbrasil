---
name: verifying-open-graph-tags
description: Confere o checklist obrigatório de tags Open Graph/Twitter no <head> de uma página (presença, URLs absolutas, dimensão do og:image batendo com o arquivo real) antes de publicar. Use ao criar página nova ou trocar o card de compartilhamento de uma página existente, e sempre antes de testar no LinkedIn Post Inspector.
---

# Verificando tags Open Graph

## Por quê

O LinkedIn cacheia o resultado do primeiro acesso a uma URL — um card errado publicado fica preso.
Este checklist é auditável por script, não por leitura atenta: rodar antes de testar no
[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) e antes de publicar o link de
verdade.

## Rodar a checagem

```bash
python .claude/skills/verifying-open-graph-tags/scripts/check_og_tags.py <pagina.html> [--type article|website|profile]
```

Confere:

- As 14 tags obrigatórias do checklist (`og:site_name`, `og:type`, `og:locale`, `og:title`,
  `og:description`, `og:url`, `og:image` + width/height/alt, `twitter:card`, `twitter:title`,
  `twitter:description`, `twitter:image`).
- `og:url` e `og:image` são absolutos (`https://kauewalter.com.br/...`) — URL relativa falha no
  card do LinkedIn.
- `og:image:width`/`og:image:height` declarados batem com a dimensão real do PNG referenciado,
  quando o arquivo existe localmente no repo.
- `og:type` bate com o esperado, se `--type` for passado. **Não assumir que só existe
  `article`/`website`** — a home usa `og:type=profile`; conferir o tipo real da página antes de
  escolher o valor, em vez de adivinhar pela seção do CLAUDE.md.

## Se falhar

O script lista cada tag ausente ou divergente. Corrigir no `<head>` da página (ou regenerar o card
via [capturing-og-card](../capturing-og-card/SKILL.md) se o problema for dimensão de arquivo) e
rodar de novo até passar limpo.

## Cards por vertical, não por artigo

`og-kw.png` (home), `og-biblioteca.png` (Biblioteca), `og-jornal.png` (A Banca, incluindo edições).
Não gerar imagem nova por edição semanal — ver "A Banca" no `CLAUDE.md` sobre por que o sitemap
também evita entrada por edição.
