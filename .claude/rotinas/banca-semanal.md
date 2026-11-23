# Rotina semanal d'A Banca — roteiro de execução

Este é o roteiro que a rotina na nuvem segue toda segunda-feira. Ela substitui as duas tarefas que
rodavam no Cowork. O resultado esperado: às ~6h o Kauê acorda com **um PR aberto** contendo as duas
edições novas (Salesforce e Mercado), com áudio, revisadas, e **links de prévia na Vercel**. Nada vai
ao ar sem o OK dele: quem publica é o merge do PR, que só o Kauê faz.

Leia `CLAUDE.md` inteiro antes de começar. Responda sempre em português do Brasil.

## Regras que não se negociam

- **Nunca** fazer merge, push na `main` ou fechar PR. Trabalhar só no branch da semana.
- **Nunca** reescrever edição já publicada. Edição anterior só recebe o link "Próxima edição".
- **Nunca** renumerar. "nº N" é por caderno: próxima = maior número publicado + 1.
- Nunca inventar fato, número, data ou link. Se uma fonte não abriu, isso vai para a seção de
  limites da edição, não para a manchete.
- Nada específico de cliente, nada de canal fechado (Partner Community, PAM), nenhuma fonte paga.
- A chave do ElevenLabs só existe na variável `ELEVENLABS_API_KEY`. Nunca imprimir, gravar ou
  commitar a chave.
- `CNAME` e `.nojekyll` não se tocam. `/jornal/` e `/repente/` nunca se linkam.

## 0. Preparar

1. Data da edição = a segunda-feira de hoje no horário de Brasília (`TZ=America/Sao_Paulo date +%F`).
   Se hoje não for segunda e o prompt não disser outra data, pare e explique.
2. Se já existe `jornal/{caderno}/{data}/` na `main`, aquele caderno já saiu: pule-o.
3. Crie o branch `claude/banca-{data}` a partir da `main` atualizada.
4. Corte de apuração: hoje, 05h BRT. Janela de cada caderno: do dia seguinte ao corte da edição
   anterior até o corte de hoje.
5. Leia a edição mais recente de cada caderno inteira: ela é o modelo de HTML, de tom e de
   profundidade, e diz o que ficou pendente para esta semana. Leia também
   `jornal/creditos-elevenlabs.md`.

## 1. Apurar e escrever cada caderno

Faça os dois cadernos; se tiver a ferramenta Agent, pode apurar os dois em paralelo, um subagente
por caderno, com este roteiro como instrução.

### Boletim Salesforce — Marketing Cloud Engagement, Marketing Cloud Next, Data 360, Agentforce

Fontes, nesta ordem de preferência (abra com WebFetch; registre as que não abrirem):
- Release notes no Salesforce Help: `help.salesforce.com/s/articleView?id=release-notes.rn_marketing.htm&type=5`
  (MC Next), `release-notes.rn_c360_truth.htm` (Data 360), `mc_rn_release_notes.htm` (Engagement),
  e o changelog consolidado `release-notes.rn_change_log.htm`. Rota alternativa:
  `help.salesforce.com/apex/HTViewHelpDoc?id=...`. Desconfie de versão em cache: se o changelog
  contradiz algo que a edição anterior já confirmou, trate como cache atrasado.
- Newsroom oficial `salesforce.com/news`, blog da Marketing Cloud, `admin.salesforce.com`,
  `investor.salesforce.com` (resultados, 8-K na SEC).
- Status: `api.status.salesforce.com/v1/incidents` (a página HTML não renderiza sem JS). Horários
  vêm em UTC: converta para Brasília (UTC−3) conferindo se o dia muda.
- Secundárias (Salesforce Ben e afins) só com a linha **Conferir**.

Critério: um item só entra se tiver data marcada ou se mudar o jeito de trabalhar de quem opera a
plataforma. Rótulos: **Ação** (tem data e alguém precisa fazer algo), **Preparar** (próximo ciclo),
**Observar** (direção, não tarefa). O carimbo conta "N itens · N com prazo".

### Análise de Mercado — macro e negócios com divulgação oficial

Fontes oficiais primeiro: Banco Central (Copom, atas, Focus, Pix), IBGE (IPCA, IPCA-15, PNAD, PMS,
PMC, PIB, produção industrial), Receita Federal e Agência Gov, Tesouro Nacional, Secex/MDIC,
Congresso/Câmara/Senado (pautas, cronogramas, CAE), TCU, ANPD, CADE, Diário Oficial. Imprensa só como
pista ou com **Conferir**. Use o calendário de divulgação do IBGE e do BCB para a agenda.

Duas camadas separadas: o **fato** (o que foi divulgado, por quem, quando, com link e confiança) e,
quando houver algo a dizer, a **Leitura** num bloco marcado "Leitura — opinião, não fato", que
sempre termina em "O que me faria mudar de ideia". A leitura não prevê número e não recomenda
decisão financeira. O carimbo conta "N itens · N com data · N com leitura".

### Montar os arquivos (checklist da skill `publishing-jornal-edition`)

Para cada caderno:
1. `jornal/{caderno}/{data}/index.html` a partir da edição anterior: mesmo `<head>` completo
   (og:type article, article:published_time, og-jornal.png absoluta 1200×630,
   summary_large_image, RSS), mesmo menu do topo, `.nav-edicoes` com "← Edição anterior · nº N-1",
   seções destaque, itens, agenda (contagem de dias a partir da data da edição; "quente" até 7
   dias, "morna" de 8 a 45) e limites ("O que este jornal não enxerga" / "O que este caderno faz").
2. Na edição anterior, acrescente em `.nav-edicoes` o link "Próxima edição · nº N →". Só isso.
3. Card no topo de `jornal/{caderno}/index.html`, logo abaixo de `NOVA-EDICAO-AQUI`.
4. Bloco `ULTIMA-{CADERNO}-INICIO/FIM` em `jornal/index.html`. Mexa só dentro do bloco do seu caderno.
5. `<item>` no topo de `jornal/{caderno}/feed.xml`, `lastBuildDate` atualizado, no máximo 20 itens.
6. Manchete: o que a edição traz, idealmente com menos de 40 palavras. Fonte que não abriu não é
   manchete. Número com confiança média não vai para a manchete nem para a capa sem ressalva.

## 2. Roteiro e áudio

1. Escreva `jornal/roteiros-audio/{caderno}-{data}.md` no formato dos roteiros existentes: texto
   pensado para fala, 650 a 800 caracteres de narração, teto 900, sem afirmar nada que a página não
   afirme. Rode `check_roteiro_budget.py`.
2. O roteiro passa pela revisão (passo 3) antes de gerar o áudio: cada geração gasta crédito.
3. Gere com `python .claude/skills/recording-audio-summary/scripts/gerar_audio.py <roteiro> jornal/{caderno}/{data}/resumo.mp3`
   (voz Rafael Valente). **Uma tentativa por caderno.** Se falhar, não insista: registre o erro no
   PR e siga sem áudio para aquele caderno.
4. Só se o mp3 foi gerado: cole o bloco `<div class="ouvir" data-ouvir-edicao hidden>…</div>` logo
   abaixo de `.nav-edicoes` (copie de uma edição existente, trocando o `src`), atualize o status do
   roteiro e acrescente a linha no "Log de geração" de `jornal/creditos-elevenlabs.md`.

## 3. Revisão por agente separado

Para cada caderno, chame o subagente **`revisor-banca`** (ferramenta Agent,
`subagent_type: "revisor-banca"`) passando caderno, data e corte. Ele devolve um parecer com
BLOQUEANTES e SUGESTÕES.
- Corrija todos os bloqueantes. Se algum exigir apuração que não dá para fazer, retire o item e
  registre por quê nos limites da edição.
- Aplique as sugestões que concordar; as que recusar, liste no PR com o motivo.
- Depois das correções, peça uma segunda passada ao revisor só sobre o que mudou. No máximo duas
  rodadas. Se a segunda ainda trouxer bloqueante, abra o PR assim mesmo, com o bloqueante em
  destaque no topo da descrição.
- Se a ferramenta Agent não existir nesta sessão, faça a revisão você mesmo seguindo
  `.claude/agents/revisor-banca.md` à risca e diga no PR que ela não foi independente.

## 4. Verificar

1. `python .claude/skills/publishing-jornal-edition/scripts/preflight_check.py {caderno} {data}`
   nos dois cadernos: zero erros.
2. Suba `python3 -m http.server 8000` e confira com `curl` que respondem 200: a capa, os dois
   índices, as duas edições novas, as duas anteriores, os dois feeds, os mp3 gerados, e todo link
   interno `/jornal/...` das páginas novas.
3. Os dois `feed.xml` continuam XML válido.

## 5. Abrir o PR

1. Commit com mensagem no padrão do repositório ("Publica edição nº N d'A Banca (Salesforce e
   Mercado, D mmm AAAA)"), push do branch `claude/banca-{data}`.
2. Abra o PR para `main`, **pronto para revisão (não rascunho)**, título igual ao commit.
3. Descrição do PR, nesta ordem:
   - **Links de prévia** (Vercel, branch): `https://painelbrasil-git-claude-banca-{data}-kaue-walter.vercel.app/jornal/`
     e as duas edições (`/jornal/salesforce/{data}/`, `/jornal/mercado/{data}/`). A Vercel publica
     a prévia alguns minutos depois do push.
   - Manchete e contagem de cada caderno.
   - Áudio: gerado ou não, caracteres usados, acumulado do mês.
   - Parecer do revisor: veredito, bloqueantes corrigidos, sugestões recusadas e por quê.
   - O que esta apuração não conseguiu ver (fontes que não abriram).
   - "Para publicar: aprovar e fazer o merge deste PR. O GitHub Pages publica em ~1 minuto. Depois,
     passar as URLs no LinkedIn Post Inspector antes de postar."
4. Termine a sessão com uma mensagem curta: link do PR, os três links de prévia e o veredito.

## Se algo der errado

- Uma fonte não abre: siga com as outras e declare. Um caderno inteiro sem material: publique edição
  curta e honesta sobre isso, como as nº 13 e 14 do Salesforce fizeram, em vez de pular a semana.
- A API do ElevenLabs falha (402, 401, rede): sem áudio naquele caderno, motivo no PR.
- O push ou o PR falham: termine a sessão explicando exatamente o que ficou feito e onde, para o
  Kauê retomar.
