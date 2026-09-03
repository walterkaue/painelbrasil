---
name: optimizing-images
description: Comprime PNG com pngquant conferindo que a dimensão não mudou na compressão, e avisa se o resultado ultrapassar um teto de sanidade. Use ao adicionar ou atualizar qualquer imagem em assets/ ou repente/assets/, especialmente cards OG.
---

# Otimizando imagens

## Regra geral

Antes de adicionar imagem nova: medir o arquivo, gerar já no tamanho certo (1200×630 pro card
social) em vez de publicar PNG grande e confiar em CSS pra encolher. Referência real (checada em
03/09/2026): os PNGs de compartilhamento do site principal ficam em ~15-16KB, os do Repente entre
~11KB e ~62KB — não existe imagem de herói de artigo no site hoje.

## Comprimir um PNG

`pngquant` e `cwebp` estão no PATH desta máquina (`%USERPROFILE%\tools\`). Rodar o script, que
comprime e **falha explicitamente** se a dimensão de saída divergir da de entrada, em vez de deixar
passar silencioso:

```bash
python .claude/skills/optimizing-images/scripts/compress_png.py <entrada.png> [saida.png]
```

Sem `[saida.png]`, sobrescreve a entrada. O script reporta o tamanho antes/depois e avisa (sem
bloquear) se o resultado ultrapassar 150KB — teto de sanidade, não meta de qualidade.

## Se dia entrar imagem de artigo (fora do fluxo de card OG)

- `width`/`height` sempre no `<img>` (evita CLS).
- `loading="lazy"` se estiver abaixo da dobra, `loading="eager"` só na imagem principal acima da
  dobra.
- Scripts de terceiro (analytics, formulário) sempre com `defer` ou `async` — nunca bloqueando o
  `<head>`. Ver `assets/compartilhar.js`, que já segue isso.
