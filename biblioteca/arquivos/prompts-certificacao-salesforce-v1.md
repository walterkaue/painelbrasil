# Biblioteca de Prompts — Estudo e Certificação Salesforce

**Versão 1 · 24 de agosto de 2026 · Kauê Walter**

> **Esta é uma cópia e ela não se atualiza sozinha.** A versão corrente vive em
> https://kauewalter.com.br/biblioteca/prompts/ — com botão de copiar em cada prompt. Se a data
> acima estiver velha, confira lá antes de usar.

---

## Antes de usar: três regras

**1. Nenhum dado de cliente entra num LLM.** Nome de empresa, volumetria, estrutura de Data
Extension real, copy aprovada, print de tela de org, e-mail de contato, CNPJ, número de contrato.
Nada. Se o prompt precisa de contexto, invente um cenário genérico — todos os prompts deste arquivo
já foram escritos assim de propósito.

**2. O modelo erra detalhe de produto.** Ele acerta o conceito e inventa o nome do campo, o limite
de caracteres e o comportamento de uma configuração específica. Todo prompt aqui termina pedindo a
fonte; **confira no Exam Guide oficial e no Trailhead antes de decorar.** Um quiz gerado por IA é
treino de raciocínio, não fonte de verdade.

**3. Um prompt não substitui a mão na org.** Estes prompts servem para fixar e para diagnosticar
lacuna. A prova cobra decisão de implementação — isso só entra construindo.

---

## Como ler cada prompt

Cada bloco tem quatro partes:

- **Serve para** — o problema que ele resolve
- **Preencha** — as variáveis entre `[colchetes]`
- **O prompt** — copiar inteiro
- **Cuidado** — como o prompt falha

---

## 1. Diagnóstico de lacuna

**Serve para** descobrir o que você não sabe antes de gastar semanas estudando o que já sabe.

**Preencha** `[CERTIFICAÇÃO]` e `[TÓPICOS E PESOS]` (copie do Exam Guide oficial).

> Você é examinador da certificação **[CERTIFICAÇÃO]**.
>
> Os domínios do exame e seus pesos são:
> [TÓPICOS E PESOS]
>
> Faça um diagnóstico comigo. Para cada domínio, faça **uma** pergunta aberta de nível
> intermediário — não múltipla escolha — e espere minha resposta antes de ir para o próximo.
> Não me dê a resposta antes de eu responder.
>
> Depois que eu responder todos, monte uma tabela com: domínio, peso no exame, minha nota de 0 a 5,
> e uma frase dizendo qual é exatamente a lacuna. Ordene por (peso × lacuna), decrescente — quero
> saber onde estudar primeiro, não onde estou pior.
>
> Ao final, liste as três primeiras coisas que eu deveria estudar e por quê. Para cada uma, indique
> onde procurar na documentação oficial (módulo do Trailhead ou seção do Salesforce Help). Se não
> souber o endereço exato, diga "não sei" em vez de inventar um link.

**Cuidado:** ele vai querer despejar as perguntas todas de uma vez. Se fizer isso, responda
"uma por vez, por favor" e siga.

---

## 2. Gerador de quiz com peso de exame

**Serve para** treinar na proporção certa. A maioria dos simulados gratuitos distribui as questões
por igual, e o exame não faz isso.

**Preencha** `[CERTIFICAÇÃO]`, `[TÓPICOS E PESOS]`, `[N]` (quantas questões).

> Gere um simulado de **[N] questões** para a certificação **[CERTIFICAÇÃO]**.
>
> Distribua as questões proporcionalmente a estes pesos:
> [TÓPICOS E PESOS]
>
> Regras:
> - Múltipla escolha, 4 alternativas, uma correta — exceto quando o domínio naturalmente pede
>   "escolha 2", e nesse caso avise no enunciado.
> - Cada questão descreve um **cenário de implementação**, não uma definição. "O que é X?" é
>   proibido. "Um cliente precisa de X e tem a restrição Y — qual a abordagem?" é o formato.
> - As três alternativas erradas precisam ser plausíveis: erros que alguém que estudou pela metade
>   cometeria de verdade.
> - Numere as questões e **não mostre nenhuma resposta agora.**
>
> Quando eu mandar minhas respostas, aí sim corrija: para cada questão, diga a alternativa correta,
> explique por que ela é correta e — isso é o mais importante — explique **por que cada uma das
> outras três está errada**. Ao final, mostre meu acerto por domínio, em tabela.
>
> Marque com ⚠️ qualquer questão cuja resposta dependa de um detalhe de produto que você não tem
> certeza sobre a versão atual. Prefiro perder a questão a decorar errado.

**Cuidado:** o `⚠️` é o item mais valioso do prompt. Se ele nunca marcar nada em 30 questões,
desconfie e confira algumas por amostragem.

---

## 3. Autópsia de erro

**Serve para** o momento depois do simulado, que é onde o estudo de verdade acontece.

**Preencha** `[QUESTÃO]`, `[MINHA RESPOSTA]`, `[RESPOSTA CORRETA]`.

> Errei esta questão de certificação Salesforce:
>
> **Questão:** [QUESTÃO]
> **Eu respondi:** [MINHA RESPOSTA]
> **A resposta correta é:** [RESPOSTA CORRETA]
>
> Não me console e não repita o enunciado. Responda em quatro partes curtas:
>
> 1. **O conceito que eu não domino.** Não "você errou a alternativa B" — qual é o conceito por
>    trás, nomeado.
> 2. **Por que a minha alternativa é sedutora.** Em que situação ela seria a certa? Quero entender
>    a fronteira entre as duas.
> 3. **A regra de bolso** que faria eu acertar uma questão parecida no futuro, em uma frase.
> 4. **Onde confirmar** isso na documentação oficial. Se não souber, escreva "não sei".

**Cuidado:** funciona melhor uma questão por vez. Em lote, ele generaliza e você perde o item 2,
que é o que ensina.

---

## 4. Flashcards para repetição espaçada

**Serve para** transformar um capítulo em cartões que você revisa em 5 minutos por dia.

**Preencha** `[TEMA]` e `[CERTIFICAÇÃO]`.

> Gere 20 flashcards sobre **[TEMA]**, no nível cobrado pela certificação **[CERTIFICAÇÃO]**.
>
> Formato: uma linha por cartão, no padrão `frente | verso`, para eu colar direto no Anki.
>
> - A frente é uma pergunta ou um cenário curto. Nunca um termo solto.
> - O verso tem no máximo duas linhas.
> - Nenhum cartão pode ser respondido com "sim" ou "não".
> - Priorize o que se confunde com outra coisa: distinções, limites, ordem de execução, quando usar
>   A em vez de B.
> - Se o verso depender de um valor específico (limite, tamanho, quantidade) que você não tem
>   certeza para a versão atual, escreva o verso como `CONFERIR NO EXAM GUIDE` em vez de chutar.

**Cuidado:** revise os 20 antes de importar. Cartão errado decorado é pior que cartão nenhum.

---

## 5. Plano de estudo a partir da data da prova

**Serve para** parar de estudar por impulso.

**Preencha** `[CERTIFICAÇÃO]`, `[DATA DA PROVA]`, `[HORAS POR SEMANA]`, `[TÓPICOS E PESOS]`,
`[MINHAS LACUNAS]` (saída do prompt 1).

> Monte meu plano de estudo para a certificação **[CERTIFICAÇÃO]**.
>
> - Data da prova: **[DATA DA PROVA]**
> - Tempo disponível: **[HORAS POR SEMANA]** por semana
> - Domínios e pesos: [TÓPICOS E PESOS]
> - Minhas lacunas conhecidas: [MINHAS LACUNAS]
>
> Regras do plano:
> - Semana a semana, com data. Cada semana tem **um** objetivo principal, não cinco.
> - Aloque tempo por (peso no exame × minha lacuna), não por igual.
> - Toda semana tem uma tarefa prática na org, não só leitura. Descreva a tarefa.
> - A última semana é só revisão e simulado — nenhum tópico novo entra nela.
> - Se o tempo disponível não couber no escopo, **diga isso na primeira linha** e me mostre o que
>   ficaria de fora, em vez de espremer tudo. Prefiro saber que não dá.
>
> Entregue como tabela: semana, datas, objetivo, o que ler, o que construir, como eu sei que
> terminei.

**Cuidado:** ele é otimista com prazo. Se o plano parecer confortável, provavelmente está apertado.

---

## 6. Tradutor de conceito para caso real

**Serve para** quando você entendeu a definição e ainda não sabe quando usar.

**Preencha** `[CONCEITO]`.

> Explique **[CONCEITO]** do Salesforce Marketing Cloud em quatro camadas:
>
> 1. **O problema que existia antes** de essa funcionalidade existir. Qual dor ela resolve?
> 2. **Um cenário concreto** — empresa genérica e fictícia, sem nome real — em que ela é a escolha
>    certa. Descreva a restrição que torna ela a escolha certa.
> 3. **Um cenário parecido em que ela é a escolha errada**, e o que se usa no lugar. Esta é a parte
>    que eu mais preciso.
> 4. **A pegadinha de prova**: qual detalhe dessa funcionalidade costuma ser cobrado e confundido.
>
> Ao final, liste o que dessa resposta é conceito estável e o que é detalhe de configuração que pode
> ter mudado de versão — e que eu preciso conferir na documentação.

**Cuidado:** a camada 4 é onde ele mais inventa. Trate como hipótese a verificar.

---

## 7. Revisão de véspera

**Serve para** as duas horas antes da prova, quando estudar coisa nova é contraprodutivo.

**Preencha** `[CERTIFICAÇÃO]` e `[DOMÍNIOS ONDE FUI PIOR]`.

> Amanhã faço a certificação **[CERTIFICAÇÃO]**. Meus piores domínios nos simulados foram:
> **[DOMÍNIOS ONDE FUI PIOR]**.
>
> Não me ensine nada novo. Faça só isto:
>
> - 15 afirmações de uma linha sobre esses domínios, que eu leio e confirmo se sei ou não.
> - Depois, as 5 confusões mais comuns nesses domínios, no formato "X não é Y porque…".
> - Por último, 3 estratégias de prova para questões de cenário longo — como eliminar alternativa
>   quando eu não souber a resposta.
>
> Nada de motivação, nada de "você consegue". Só o conteúdo.

**Cuidado:** se ele começar a introduzir tópico novo, corte. Véspera não é hora de abrir frente.

---

## 8. Explicador de errata de release

**Serve para** o dia em que a Salesforce muda algo e o seu material de estudo envelhece.

**Preencha** `[FUNCIONALIDADE]` e `[RELEASE]`.

> Estou estudando **[FUNCIONALIDADE]** para certificação e quero saber se o que eu aprendi ainda
> vale na release **[RELEASE]**.
>
> Responda em três partes:
> 1. O que você sabe sobre essa funcionalidade e até quando essa informação é confiável.
> 2. Quais aspectos dela são historicamente instáveis entre releases — ou seja, onde eu devo
>    desconfiar do material antigo.
> 3. Exatamente o que eu devo procurar nas Release Notes oficiais para confirmar: que termos buscar,
>    em que seção.
>
> **Não afirme o que mudou nessa release se você não tem essa informação.** Diga "não sei, confira
> nas Release Notes" — é a resposta certa e é a que me ajuda.

**Cuidado:** este prompt existe justamente porque o modelo tem data de corte. Se ele responder com
segurança sobre uma release recente, desconfie mais, não menos.

---

## Registro de versão

| Versão | Data | O que mudou |
|---|---|---|
| 1 | 2026-08-24 | Primeira publicação. 8 prompts. |

**Encontrou um erro?** Escreva para o e-mail no rodapé de kauewalter.com.br. Correção confirmada
entra numa versão nova, com a data trocada aqui.
