---
name: publishing-jornal-edition
description: Guia os 6 passos da publicação semanal d'A Banca (criar página, indexar no caderno, atualizar a capa, feed.xml, navegação entre edições, áudio) e roda uma pré-checagem local antes do commit. Use toda segunda-feira ao publicar edição nova do Boletim Salesforce ou da Análise de Mercado.
---

# Publicando edição d'A Banca

Sequência fixa — cada passo quebra algo específico se pulado. Os pontos de inserção existem como
comentário HTML nos arquivos; procure por eles (grep pelo texto do marcador) em vez de adivinhar
onde colar.

**Nunca renumerar** uma edição já publicada, mesmo que uma semana seja pulada — ver "A Banca" no
`CLAUDE.md`.

## Passo a passo

1. **Criar a página** em `jornal/{salesforce,mercado}/AAAA-MM-DD/index.html` (segunda-feira de
   publicação), a partir do bloco `BLOCO-MODELO` comentado no fim do `<body>` da edição mais
   recente do mesmo caderno. `og:type="article"` com `article:published_time`.
2. **Indexar**: colar o card no marcador `NOVA-EDICAO-AQUI` em `jornal/{caderno}/index.html`, topo
   da lista (mais recente primeiro).
3. **Atualizar a capa**: bloco `ULTIMA-{CADERNO}-INICIO`/`ULTIMA-{CADERNO}-FIM` em `jornal/index.html`
   (`{CADERNO}` maiúsculo: `SALESFORCE` ou `MERCADO`).
4. **`feed.xml`**: acrescentar `<item>` no topo de `jornal/{caderno}/feed.xml`, manter só as ~20
   edições mais recentes (as mais antigas saem do XML, continuam no índice completo da página).
5. **Navegação entre edições** (`.nav-edicoes`, logo abaixo de `<header class="jornal-head">`):
   colar "Edição anterior" na página **nova**, e "Próxima edição" na página que era a mais recente
   até agora. Os dois lados — a pré-checagem abaixo confere os dois, o CI em
   `.github/workflows/checklist-banca.yml` só confere o lado novo.
6. **Áudio "Ouvir o resumo"**: ver Skill `recording-audio-summary` (roteiro + ElevenLabs +
   checagem do calendário de vozes). Colar o bloco `.ouvir` (copie de qualquer edição existente)
   logo abaixo de `.nav-edicoes`.

## Pré-checagem antes do commit

```bash
python .claude/skills/publishing-jornal-edition/scripts/preflight_check.py <salesforce|mercado> <AAAA-MM-DD>
```

Confere os passos 2, 4 e 5 (os dois lados da navegação) como erro bloqueante; passos 3 e 6 como
aviso (heurística menos exata: 3 procura a data no bloco da capa, mas não confere o texto do
resumo; 6 só confere se `resumo.mp3` e o bloco `.ouvir` existem, não se o roteiro é bom). Também
valida que `feed.xml` continua XML bem-formado — o CI só confere texto, não sintaxe.

Isto é a mesma auditoria que `checklist-banca.yml` roda em CI, só que **antes** do push em vez de
depois (X vermelho no commit).

## Agrupar por ano

A lista em `.edicoes` fica simples até conter edições de mais de um ano civil. A partir daí,
`<h3>{ano}</h3>` acima do primeiro item de cada ano, mais recente primeiro. Não implementar antes
de precisar.
