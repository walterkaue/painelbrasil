# Trilhas de Estudo — Marketing Cloud, Data 360 e MC Next

**Versão 1 · 24 de agosto de 2026 · Kauê Walter**

> **Esta é uma cópia e ela não se atualiza sozinha.** A versão corrente vive em
> https://kauewalter.com.br/biblioteca/trilhas/ — e este documento fala de prazos de certificação
> que expiram. Se a data acima estiver velha, confira lá antes de usar.

---

## Para que serve este documento

Escolher certificação Salesforce virou trabalho: os nomes mudaram em 2025, vinte e quatro
credenciais se aposentam em fevereiro de 2027 e duas certificações novas nasceram em **21 de agosto
de 2026**. Quem monta um plano de estudo com material de dois anos atrás estuda para uma prova que
não existe mais.

Este documento faz três coisas: fixa os **nomes oficiais atuais**, mostra **o que está sendo
aposentado**, e propõe **quatro trilhas** por papel.

> **Como usar com honestidade.** Todo dado numérico aqui tem a fonte indicada. Onde a fonte é
> secundária, está escrito. **Confira no Exam Guide oficial antes de marcar prova** — este arquivo
> envelhece, o Exam Guide não.

---

## 1. O que mudou de nome (e ainda aparece errado em todo lugar)

Os nomes abaixo mudaram e os antigos continuam circulando em vaga, LinkedIn e material de curso.

| Nome antigo | Nome oficial atual |
|---|---|
| Marketing Cloud Administrator | **Marketing Cloud Engagement Administrator** |
| Marketing Cloud Consultant | **Marketing Cloud Engagement Consultant** |
| Marketing Cloud Developer | **Marketing Cloud Engagement Developer** |
| Marketing Cloud Account Engagement Specialist | **Marketing Cloud Account Engagement Foundations** |
| Marketing Cloud Email Specialist | *sem mudança* |
| Data Cloud Consultant | *sem mudança* |

Todas levam o prefixo oficial "Salesforce Certified".

*Fonte: [S2 Labs — Salesforce is Renaming 35+ Certifications](https://s2-labs.com/blog/salesforce-renaming-35-certifications/). A troca do bloco "Engagement" saiu em julho de 2025.*

---

## 2. O que se aposenta em 1º de fevereiro de 2027

Três credenciais de Marketing Cloud estão entre as 24 que a Salesforce aposenta:

- Marketing Cloud Advanced Cross-Channel — Accredited Professional
- Marketing Cloud Intelligence — Accredited Professional
- Marketing Cloud Personalization — Accredited Professional

**As datas já passaram ou estão passando:**

| Marco | Data |
|---|---|
| Último dia para se registrar | 24 de julho de 2026 — **já passou** |
| Último dia para fazer a prova | **31 de agosto de 2026** |
| Aposentadoria oficial | 1º de fevereiro de 2027 |

> ⚠️ **Se alguém do time já está registrado numa dessas três, a prova precisa ser feita até 31 de
> agosto de 2026.** Este documento é de 24 de agosto. Vale checar hoje, não semana que vem.

Credencial aposentada **continua válida** — ela não é revogada, só sai do catálogo. Não vale a pena
correr atrás de uma agora; vale a pena não deixar vencer uma que já foi paga.

*Fontes: [Salesforce Time](https://salesforcetime.com/2026/06/10/salesforce-certification-retirements-and-renames-explained/) e [S2 Labs](https://s2-labs.com/blog/list-of-salesforce-certifications-retiring/), que concordam nas três credenciais e nas três datas.*

---

## 3. A certificação nova: Marketing Cloud Next Consultant

**Salesforce Certified Marketing Cloud Next Consultant** — disponível desde **21 de agosto de 2026**.
No mesmo dia saiu a Tableau Next Consultant.

**Domínios e pesos:**

| Domínio | Peso |
|---|---|
| Campaign Design, Flow Orchestration & Content | 30% |
| Data Modeling, Identity Resolution & Segmentation | 25% |
| Platform Setup & Governance | 13% |
| Consent | 13% |
| Agentforce & AI Innovation | 11% |
| Analytics & Performance Insights | 8% |

**Formato da prova:** 60 questões de múltipla escolha (mais até 5 não pontuadas) · 105 minutos ·
nota de corte 72% (43 acertos) · baseada na release Summer '26 · sem pré-requisito formal, com
6 a 12 meses de prática recomendados.

> 🔶 **Confiança do dado de formato:** os números acima vêm de **uma fonte secundária**
> ([SFMC Tips #327](https://medium.com/@marketingcloudtips/salesforce-certified-marketing-cloud-next-consultant-certification-officially-announced-17e72cf40b6f)),
> que cita o Exam Guide oficial no Salesforce Help. Os **domínios e pesos** têm confirmação cruzada:
> os sete módulos da trilha oficial do Trailhead correspondem um a um a eles. **O formato da prova
> não foi confirmado em fonte primária — confirme antes de marcar.**

**Trilha oficial:** [Prepare for Your Marketing Cloud Next Consultant Certification](https://trailhead.salesforce.com/content/learn/trails/prepare-for-your-marketing-cloud-next-consultant-certification)
— 7 módulos, ~17h30, classificada como Foundational.

**O que isso significa na prática:** 25% do exame é modelagem de dados, resolução de identidade e
segmentação. Isso é Data 360, não é e-mail. Quem vem de MCE e nunca modelou dado vai sentir aqui, e
é por isso que a Trilha 3 abaixo passa por Data Cloud **antes** de MC Next.

---

## 4. As quatro trilhas

Cada trilha tem: para quem é, o que se estuda, o que se constrói, e o sinal de que terminou.
A ordem importa mais que a velocidade.

---

### Trilha 1 — Operação de MCE
**Para quem** entrou agora e opera campanha: monta e-mail, publica LP, dispara jornada.

| Etapa | Estudo | Prática — o sinal de que terminou |
|---|---|---|
| 1 | Fundamentos de plataforma Salesforce (objetos, relacionamentos, permissão) | Explicar em voz alta a diferença entre um registro no CRM e um assinante em MCE |
| 2 | Data Extensions, Subscriber Key, listas × DEs, sendable × não-sendable | Criar uma DE sendable do zero e explicar por que o Subscriber Key é o que é |
| 3 | Content Builder, blocos, template, AMPscript de personalização básica | Montar um e-mail com saudação personalizada e conteúdo condicional por um campo |
| 4 | Journey Builder: entry source, decision split, wait, goal | Construir uma jornada de boas-vindas de 3 e-mails com saída por conversão |
| 5 | Automation Studio: import, SQL query activity, file transfer | Escrever uma query que popula uma DE a partir de outra e agendar |
| 6 | Deliverability: SPF, DKIM, reputação, bounce, unsubscribe | Ler um relatório de envio e dizer o que está ruim e por quê |

**Certificação alvo:** Salesforce Certified Marketing Cloud Email Specialist.

---

### Trilha 2 — Consultoria em MCE
**Para quem** já opera e agora decide: desenha solução, conversa com o cliente, escolhe entre
caminhos.

| Etapa | Estudo | Prática — o sinal de que terminou |
|---|---|---|
| 1 | Modelo de dados: relacionamento entre DEs, Data Designer, Contact Builder | Desenhar o modelo de dados de um cenário fictício e defender as escolhas |
| 2 | Arquitetura de BU: quando separar, o que herda, o que não herda | Escrever meia página dizendo quando **não** criar uma BU nova |
| 3 | Preferência e consentimento: profile center, unsubscribe por BU, LGPD na prática | Mapear o caminho completo de um descadastro até a supressão do envio |
| 4 | Integração: API REST/SOAP, Marketing Cloud Connect, sincronização com CRM | Explicar o que quebra quando o Connect cai e o que continua funcionando |
| 5 | SQL em MCE: os limites reais, performance, o que não dá para fazer | Reescrever uma query lenta e medir |
| 6 | Governança: naming, versionamento, ambiente de teste, definição de pronto | Escrever o padrão de nomenclatura que você defenderia numa reunião |

**Certificação alvo:** Salesforce Certified Marketing Cloud Engagement Consultant.
*A Engagement Administrator é um bom degrau intermediário se a etapa 2 doer.*

---

### Trilha 3 — Data 360 e MC Next
**Para quem** vai trabalhar na stack nova. **Não pule a primeira metade.**

| Etapa | Estudo | Prática — o sinal de que terminou |
|---|---|---|
| 1 | Data Cloud / Data 360: data streams, data lake object, data model object | Explicar a diferença entre DLO e DMO sem consultar nada |
| 2 | Harmonização e mapeamento para o modelo canônico | Mapear duas fontes fictícias com esquemas diferentes para o mesmo DMO |
| 3 | Identity resolution: regras de match, reconciliação, o unified profile | Descrever um caso em que a regra de match une dois perfis que **não** deveriam ser unidos |
| 4 | Segmentação e calculated insights | Construir um segmento que dependa de um insight calculado |
| 5 | MC Next: setup, governança, consentimento | Comparar o modelo de consentimento do Next com o do MCE, item a item |
| 6 | MC Next: campaign design, flow orchestration, conteúdo | Reconstruir no Next uma jornada que você já fez no MCE, e listar o que não tem equivalente |
| 7 | Agentforce e IA aplicada a marketing | Descrever uma tarefa em que o agente ajuda e uma em que ele atrapalha |
| 8 | Analytics e performance | Dizer qual métrica do MCE deixa de fazer sentido no Next |

**Certificações alvo, nesta ordem:** Salesforce Certified Data Cloud Consultant →
Salesforce Certified Marketing Cloud Next Consultant.

**Por que Data Cloud primeiro:** 25% do exame de MC Next é modelagem, identidade e segmentação.
Estudar isso pela prova de MC Next é estudar a parte mais difícil na versão mais superficial.

---

### Trilha 4 — Desenvolvimento em MCE
**Para quem** escreve código: AMPscript, SSJS, SQL, API.

| Etapa | Estudo | Prática — o sinal de que terminou |
|---|---|---|
| 1 | AMPscript: sintaxe, funções de data, lookup, tratamento de nulo | Escrever um bloco que degrada com elegância quando o campo vem vazio |
| 2 | SSJS: quando usar em vez de AMPscript, e quando não usar | Listar três casos em que AMPscript é a escolha certa e SSJS é excesso |
| 3 | SQL: joins, deduplicação, janelas de tempo, limite de execução | Escrever uma dedup por Subscriber Key mantendo o registro mais recente |
| 4 | API REST e SOAP: autenticação, pacotes instalados, escopos | Fazer um envio triggered ponta a ponta num ambiente de teste |
| 5 | Cloud Pages e formulários: segurança, validação, injeção | Apontar a vulnerabilidade de uma CloudPage que grava dado sem validar |
| 6 | Debug e log: como descobrir por que a jornada não disparou | Reconstituir a causa de uma falha só pelos logs |

**Certificação alvo:** Salesforce Certified Marketing Cloud Engagement Developer.

---

## 5. Três avisos que valem mais que a trilha

**Certificação não é competência.** Ela prova que você estudou um recorte. O que decide entrega é o
que você construiu. Uma trilha sem a coluna "prática" preenchida não terminou, mesmo com a prova
passada.

**Material de curso envelhece mais rápido que o produto.** Se o material não cita a release, não
confie no detalhe — confie no conceito e confira o detalhe no Exam Guide.

**Não persiga credencial em retirada.** As três Accredited Professionals de Marketing Cloud saem em
fevereiro de 2027. Estudar para elas hoje é investir num ativo com data de validade impressa.

---

## Registro de versão

| Versão | Data | O que mudou |
|---|---|---|
| 1 | 2026-08-24 | Primeira publicação. 4 trilhas, quadro de renomeações, quadro de aposentadorias, MC Next Consultant. |

**Recheck sugerido:** dezembro de 2026 — antes da aposentadoria de 1º de fevereiro de 2027 e depois
de a release Winter '27 estabilizar.

**Encontrou um erro?** Escreva para o e-mail no rodapé de kauewalter.com.br. Correção confirmada
entra numa versão nova, com a data trocada aqui.

---

## Fontes

- [Prepare for Your Marketing Cloud Next Consultant Certification — Salesforce Trailhead](https://trailhead.salesforce.com/content/learn/trails/prepare-for-your-marketing-cloud-next-consultant-certification)
- [SFMC Tips #327 — Marketing Cloud Next Consultant Certification Officially Announced](https://medium.com/@marketingcloudtips/salesforce-certified-marketing-cloud-next-consultant-certification-officially-announced-17e72cf40b6f)
- [Salesforce Time — Certification Retirements and Renames Explained](https://salesforcetime.com/2026/06/10/salesforce-certification-retirements-and-renames-explained/)
- [S2 Labs — Complete List of Salesforce Certifications Retiring](https://s2-labs.com/blog/list-of-salesforce-certifications-retiring/)
- [S2 Labs — Salesforce is Renaming 35+ Certifications](https://s2-labs.com/blog/salesforce-renaming-35-certifications/)
- [Salesforce Ben — How to Navigate Salesforce Marketing Certifications in 2026](https://www.salesforceben.com/how-to-navigate-salesforce-marketing-certifications-in-2026/)
- [Hamza Siddiqui — Salesforce Launches Two Brand-New Certifications on August 21st](https://www.mhamzas.com/blog/2026/08/20/salesforce-launches-two-brand-new-certifications-on-august-21st/)
