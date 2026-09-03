---
name: capturing-og-card
description: Captura o card OG (1200x630px) de um molde HTML em cartoes-og/ ou repente/cartoes-og/ usando html2canvas, extrai o PNG e roda o checklist de qualidade antes de commitar. Use quando for gerar ou atualizar a imagem de compartilhamento (og:image) de uma vertical do site (home, Biblioteca, A Banca) ou do Repente.
---

# Capturando card OG

## Pré-requisitos

- Servidor local rodando (`python -m http.server 8123` na raiz do repo — nesta máquina o alias que
  funciona é `python`, não `python3`; ver `.claude/launch.json`).
- Molde já existe: `cartoes-og/og-<vertical>.html` (tokens de `assets/kw.css`) ou
  `repente/cartoes-og/og-repente.html` (tokens de `repente/assets/base.css`). Nunca misturar os dois
  sistemas de token — ver "Identidade visual" no `CLAUDE.md` pra qual estilo vale em qual molde.

## Processo

1. Abrir o molde no Browser pane com viewport 1200×630 exato (`resize_window`).
2. Injetar `html2canvas` 1.4.1 via CDN, com versão e hash SRI fixos — não trocar sem atualizar os
   dois juntos:
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
     integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA=="
     crossorigin="anonymous"></script>
   ```
3. Via `javascript_tool`, **aguardar `await document.fonts.ready` antes de chamar `html2canvas`.**
   Pular esse passo é a causa mais provável da imagem sair com fonte de sistema em vez de
   Fraunces/Archivo.
4. Capturar: `html2canvas(el, {width:1200, height:630, scale:1, backgroundColor:null, useCORS:true})`,
   depois `canvas.toDataURL('image/png')`. `el` é `document.querySelector('.cartao')` nos moldes do
   site principal (`cartoes-og/*.html`, confirmado em `og-biblioteca.html`) — nos moldes do Repente
   (`repente/cartoes-og/*.html`) o elemento é `.card`, classe diferente. Conferir sempre no molde
   específico antes de assumir.
5. O retorno do `javascript_tool` estoura o limite de token — a base64 cai num arquivo `.txt` de
   resultado. Decodificar esse JSON duas vezes com Python pra chegar no PNG bruto, salvo no
   scratchpad (nunca direto em `assets/`).

## Checklist de qualidade — nenhum item é opcional

- [ ] Dimensão do PNG bruto = 1200×630 exato, antes de comprimir.
- [ ] Comparação visual com o molde renderizado no navegador (fonte, cor, alinhamento, sombra). **Se
      algo destoar, não commitar** — volta pro "Capture node screenshot" manual do DevTools só pra
      esse card específico. `html2canvas` é o padrão, não uma garantia.
      **Não usar diff de pixel exato contra o PNG publicado como critério** — testado em 03/09/2026
      recapturando `og-biblioteca.png`: dimensão bateu 1200×630 exato e a comparação visual não
      mostrou diferença nenhuma, mas um diff de pixel bruto contra o arquivo publicado (que já passou
      por `pngquant`) acusou ~12% dos pixels divergindo — é ruído esperado da quantização de paleta
      com perda, não sinal de captura errada. Julgamento visual é o teste certo aqui, não comparação
      byte a byte.
- [ ] Comprimir com a Skill [optimizing-images](../optimizing-images/SKILL.md) e conferir a dimensão
      de novo depois — a compressão não pode mudar largura/altura.
- [ ] Rodar a Skill [verifying-open-graph-tags](../verifying-open-graph-tags/SKILL.md) na página que
      referencia o card, confirmando que `og:image:width`/`og:image:height` batem com o arquivo
      final.
- [ ] Apagar os PNGs intermediários do scratchpad — só o arquivo final comprimido entra em `assets/`
      (ou `repente/assets/`).

## Identidade visual

Não duplicar aqui — ver seção "Identidade visual de imagem" do `CLAUDE.md` (fundo cal, paleta
Pau-brasil, tipografia Fraunces/Instrument Sans/IBM Plex Mono, sem banco de imagem nem ícone
genérico).
