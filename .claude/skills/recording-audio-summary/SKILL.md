---
name: recording-audio-summary
description: Escreve o roteiro de narração e gera o áudio "Ouvir o resumo" de uma edição d'A Banca via ElevenLabs, checando o calendário de vozes e o orçamento de créditos antes de gerar. Use toda segunda-feira, depois de publicar a edição, para os dois cadernos (Salesforce e Mercado).
---

# Gravando o resumo em áudio

## ⚠️ Validade desta Skill — revisar em 05/10/2026

O passo de "checar o calendário de vozes" só faz sentido enquanto o teste da issue
[#12](https://github.com/walterkaue/painelbrasil/issues/12) estiver ativo. Depois de 05/10/2026
(rodada de decisão final, ver `jornal/creditos-elevenlabs.md`), simplificar esta Skill: a voz vira
fixa, não semanal.

## Antes de gerar — sempre nesta ordem

1. **Ler `jornal/creditos-elevenlabs.md` inteiro**, não só a tabela — a seção "Regra de prioridade"
   e a meta de ~80% do mês mudam como o roteiro deve ser cortado.
2. **Conferir a linha da semana atual na tabela "Calendário de teste de vozes"** — é ela que diz
   qual voz usar, não Roger por padrão enquanto o teste estiver ativo.
3. **Conferir o acumulado do mês** no "Log de geração" — se já estiver perto de 8.000 créditos,
   aplicar a regra de prioridade (roteiro mais curto primeiro, nunca pular caderno sem necessidade
   real).

## Escrever o roteiro

Roteiro de narração **não é** o parágrafo do site copiado — é texto pensado pra fala, mais curto.
Ver `jornal/roteiros-audio/` para exemplos e o formato do arquivo (título, linha de metadados
`Caracteres/Status`, instrução, separador `---`, narração).

Regras de estilo (confirmadas nos roteiros já publicados):
- Números por extenso quando soam melhor falados (`"Winter 27"`, `"número 2"`), não símbolo
  (`Winter '27`, `nº 2`).
- Direto ao ponto: manchete, contexto essencial, sem repetir tudo que está na tela.

Salvar em `jornal/roteiros-audio/{caderno}-{AAAA-MM-DD}.md`.

## Conferir o orçamento antes de gerar

```bash
python .claude/skills/recording-audio-summary/scripts/check_roteiro_budget.py jornal/roteiros-audio/{caderno}-{AAAA-MM-DD}.md
```

1 caractere = 1 crédito, confirmado na prática (não é estimativa). Faixa saudável: 650–800
caracteres por caderno. Teto rígido de 900 antes de precisar cortar mais (regra de prioridade do
mês apertado).

## Gerar e publicar

1. Gerar no ElevenLabs (plano Free) com a voz da semana.
2. Salvar como `resumo.mp3` na pasta da edição (`jornal/{caderno}/{AAAA-MM-DD}/resumo.mp3`).
3. Colar o bloco `<div class="ouvir" data-ouvir-edicao hidden>...</div>` (copie de qualquer edição
   existente) logo abaixo de `.nav-edicoes`.
4. **Atualizar `jornal/creditos-elevenlabs.md`**: nova linha na tabela "Log de geração"
   (data, edição, caracteres, acumulado, link do áudio) e o `status` da linha correspondente no
   "Calendário de teste de vozes" (pendente → gerado, com qualquer impressão de ouvido relevante).
5. Nunca gerar de novo só por escolha de voz/estilo — cada tentativa gasta crédito real. Revisar o
   roteiro por escrito antes de mandar pro ElevenLabs.

## Próxima publicação real — o que conferir

A tabela de teste de voz (lida em 03/09/2026) tem estas semanas planejadas — conferir se ainda bate
com `jornal/creditos-elevenlabs.md` antes de gerar, pode ter mudado:

| Segunda | Voz planejada | Status (em 03/09/2026) |
|---|---|---|
| **07/09/2026** | **Guga** — "Perfect for News" | pendente — é a próxima publicação |
| 14/09/2026 | Dan Rocha | pendente |
| 21/09/2026 | Rômulo Franklin | pendente |
| 28/09/2026 | Bia - Versatile | pendente |
| 05/10/2026 | Rafael Valente | pendente — última semana de teste |

Esta Skill inteira ainda não foi testada gerando áudio de verdade — o critério de aceite real só
acontece na segunda-feira 07/09/2026, com a voz Guga. Conferir nessa publicação: o roteiro ficou bom
lido em voz alta por essa voz específica, o orçamento bateu com o previsto, e o passo 4 (atualizar
o log) não foi esquecido.
