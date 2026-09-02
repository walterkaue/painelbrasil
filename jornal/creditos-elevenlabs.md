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
hospedado aqui continua tocando normal, é só a geração futura que para). Decisão consciente de
ficar com Roger por enquanto (02/09/2026) — revisitar a troca de voz antes de dezembro, ver
candidatas nativas de pt-BR levantadas: Rafael Valente, Marcus Coelho, Pedro Costa, Scheila.

## Regra de prioridade quando o mês apertar

1. Os dois cadernos toda semana é o padrão — cabe no orçamento com roteiro cortado (~900
   caracteres por caderno, ver seção de roteiros).
2. Se um mês tiver 5 segundas-feiras ou o acumulado passar de 8.000 antes do fim do mês, cortar
   pela ordem: primeiro reduzir o roteiro ainda mais (só manchete + 1 parágrafo), depois — só em
   último caso — pular a narração de uma edição e manter card de imagem normal.
3. Nunca gerar de novo por causa de escolha de voz/estilo sem necessidade — cada tentativa gasta
   crédito. Revisar o roteiro por escrito antes de mandar pro ElevenLabs.
