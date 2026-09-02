# Créditos ElevenLabs — controle manual

Plano Free: **10.000 créditos/mês** (~1 caractere = 1 crédito), sem uso comercial permitido pelos
termos da ElevenLabs — revisar isso periodicamente, é decisão de risco do Kauê, não travada aqui.
Não existe API pública pra consultar saldo sem autenticação, então este arquivo é o controle real.

**Meta de uso:** até ~80% do mês (8.000 créditos), guardando reserva pra re-gravação por erro de
roteiro ou semana de conteúdo mais longo que a média.

**Roteiro de narração ≠ texto do site.** Escrito à parte, mais curto e pensado pra ouvido (ver
`jornal/roteiros-audio/`), não é o parágrafo "Decisão da semana"/"Abertura" colado direto — aquele
texto foi escrito pra leitura na tela, não pra fala.

## Log de geração

| Data | Edição | Caracteres | Acumulado do mês | Link do áudio |
|---|---|---|---|---|
| 02/09/2026 | Boletim Salesforce nº 2 (31/08) | 686 | 686 / 10.000 | [jornal/salesforce/2026-08-31/resumo.mp3](salesforce/2026-08-31/resumo.mp3) |
| 02/09/2026 | Análise de Mercado nº 2 (31/08) | 775 | 1.461 / 10.000* | [jornal/mercado/2026-08-31/resumo.mp3](mercado/2026-08-31/resumo.mp3) |

\* calculado pelo padrão 1:1 já confirmado no primeiro áudio — não conferido com o saldo real da
conta nesta linha, atualizar se divergir.

Confirmado na prática: **1 caractere = 1 crédito exato** (686 caracteres → 686 créditos, saldo caiu
pra 9.314 no primeiro teste). Voz usada nos dois: Roger (Laid-Back, Casual, Resonant) — 49s pro
Salesforce (~14 car./s), 67s pro Mercado (~12 car./s) — ritmo de fala varia um pouco por texto,
não é constante.

**Primeira semana completa: 1.461 caracteres pros dois cadernos**, dentro da meta de ~1.400-1.800
do plano.

**Sobre a voz (Roger):** é uma voz "Default" da ElevenLabs — **todas as vozes Default expiram em
31/12/2026** e não podem mais ser usadas pra gerar áudio novo depois disso (áudio já gerado e
hospedado aqui continua tocando normal, é só a geração futura que para). Por isso o teste de voz
abaixo — ver issue [#12](https://github.com/walterkaue/painelbrasil/issues/12).

## Calendário de teste de vozes (issue #12)

**Antes de gerar o áudio da semana, confira esta tabela** — é aqui que fica registrado qual voz usar
enquanto o teste está ativo. Fora do período de teste, a voz corrente é a da última linha "adotada".

Candidatas levantadas via fonte terceira ([json2video.com](https://json2video.com/ai-voices/elevenlabs/languages/portuguese/),
catálogo independente, não é página de marketing da ElevenLabs), filtradas pelas que a própria
descrição já cita caso de uso de notícia/jornalismo/informativo — não é achismo de tom.

| Semana | Segunda | Voz planejada | Descrição (fonte terceira) | Status |
|---|---|---|---|---|
| 1 | 07/09/2026 | **Guga** | "Perfect for News" | pendente |
| 2 | 14/09/2026 | **Dan Rocha** | "tom jornalístico, ideal pra reportagem de notícia" | pendente |
| 3 | 21/09/2026 | **Rômulo Franklin** | "locutor de rádio, 20 anos de experiência" | pendente |
| 4 | 28/09/2026 | **Bia - Versatile** | "combina autoridade técnica e calor humano" (única candidata feminina do teste) | pendente |
| 5 | 05/10/2026 | **Rafael Valente** | "Brazilian Professional Narrator" — ponto de comparação com a pesquisa anterior | pendente |

**Depois de 05/10/2026:** rodada de decisão final — recap comparativo das 5 semanas + checagem se
surgiu dado novo de terceiro nesse meio tempo (voz nova, alguma removida), antes de fechar a escolha
definitiva. Prazo prático segue sendo meados de dezembro de 2026, então essa janela dá folga real
caso a decisão exija regenerar áudio.

**Atualizar o `status` de cada linha** (pendente → gerado → adotada/descartada) conforme cada semana
acontece, e anotar aqui qualquer impressão de ouvido que não caiba só no status.

## Regra de prioridade quando o mês apertar

1. Os dois cadernos toda semana é o padrão — cabe no orçamento com roteiro cortado (~900
   caracteres por caderno, ver seção de roteiros).
2. Se um mês tiver 5 segundas-feiras ou o acumulado passar de 8.000 antes do fim do mês, cortar
   pela ordem: primeiro reduzir o roteiro ainda mais (só manchete + 1 parágrafo), depois — só em
   último caso — pular a narração de uma edição e manter card de imagem normal.
3. Nunca gerar de novo por causa de escolha de voz/estilo sem necessidade — cada tentativa gasta
   crédito. Revisar o roteiro por escrito antes de mandar pro ElevenLabs.
