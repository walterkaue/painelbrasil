# kauewalter.com.br — guia de trabalho

Site estático pessoal do Kauê Walter, publicado no GitHub Pages. Leia [README.md](README.md) antes
de mexer em estrutura de pasta.

## O que é, de verdade

Não é um site de notícias/e-books como um template genérico assumiria — é um portfólio pessoal com
duas verticais de conteúdo público, mais um projeto irmão com marca própria:

- **Home** ([index.html](index.html)) — currículo/trajetória, Marketing Cloud e liderança de CRM.
- **Biblioteca** ([biblioteca/](biblioteca/index.html)) — prompts e trilhas de certificação Salesforce.
- **A Banca** ([jornal/](jornal/index.html)) — boletim semanal, dois cadernos (Salesforce e Mercado).
- **Repente** ([repente/](repente/index.html)) — projeto **independente**: base de dados públicos
  sobre o Brasil. Tem CNAME, sitemap, paleta (Archivo/laranja) e sistema de tokens próprios em
  `repente/assets/base.css`. **Não misturar a identidade visual dele com a do resto do site**, e
  vice-versa — são marcas separadas de propósito.

Canal principal de tráfego: **LinkedIn**. Isso pesa mais nas decisões de SEO/compartilhamento do que
Google — ver seção de Open Graph abaixo.

## Arquitetura — não mexer sem necessidade real

- **Sem framework, sem build step.** HTML/CSS/JS puros, servidos direto pelo GitHub Pages. Não
  introduza bundler, pré-processador ou dependência de Node para gerar o site.
- Tokens de cor/tipografia vivem em [assets/kw.css](assets/kw.css) (`:root`, bloco de tema escuro
  via `prefers-color-scheme`, e `:root[data-theme="dark"]` para a escolha manual — **os três mudam
  juntos**). Nunca hardcode uma cor hex num componente novo: use `var(--token)`.
- O nav do topo é o mesmo em toda página do site principal (não em Repente): `Carreira · A Banca ·
  Biblioteca · Contato · Tema` (rev. 25/08/2026 — substituiu o modelo anterior de âncoras
  `Conteúdo · Atuação · Trajetória · Formação · Contato`). "Carreira" aponta pra `/`, "A Banca" pra
  `/jornal/`, "Biblioteca" pra `/biblioteca/`, e só "Contato" continua âncora (`/#contato`), porque a
  seção de contato só existe na home. Se criar página nova em `jornal/` ou `biblioteca/`, copie esse
  nav — não invente outro.
- **O nav do topo são destinos diretos, não mais um sumário da home.** As seções Atuação, Trajetória
  e Formação continuam existindo na home (a página não mudou), só saíram do `<nav>` — quem quiser
  chegar lá rola a página ou usa busca do navegador. Isso mantém o nav fixo em 4 links + botão de
  tema mesmo que uma vertical de conteúdo nova apareça um dia: cada vertical com página própria
  (`/algo/`) ganha um link direto; conteúdo que só existe como seção da home, não.

## SEO on-page

- **H1 único** por página. `h2` para seção, `h3` para subitem — nunca pular de `h2` pra `h4`.
- Toda página nova precisa do checklist completo de `<head>` (ver próxima seção) — não é opcional
  "se sobrar tempo".
- `<title>` e `og:title` podem divergir (o primeiro pode levar "— Kauê Walter" no fim para o Google;
  o segundo fica mais curto pro card social). `og:description` mira o gancho de LinkedIn — curto e
  com benefício direto, não um resumo acadêmico.

## Open Graph / compartilhamento no LinkedIn

Checklist obrigatório no `<head>` de toda página (home, boletim, edição, biblioteca):

```html
<meta property="og:site_name" content="Kauê Walter">
<meta property="og:type" content="website"><!-- "article" em edição de boletim -->
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:url" content="https://kauewalter.com.br/...">
<meta property="og:image" content="https://kauewalter.com.br/assets/....png"><!-- URL ABSOLUTA sempre -->
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="...">
<meta name="twitter:card" content="summary_large_image"><!-- nunca "summary" quando existe og:image própria -->
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://kauewalter.com.br/assets/....png">
```

- **Imagem sempre em 1200×630px exatos.** O LinkedIn não escala bem imagem fora da proporção
  1.91:1, e URL relativa (`/assets/...`) falha no card — sempre `https://kauewalter.com.br/...`.
  Antes de referenciar um PNG novo em `og:image`, confira o tamanho real do arquivo (ex.: no
  PowerShell, `[System.Drawing.Image]::FromFile(...)`) e compare com o que a página declara em
  `og:image:width`/`height` — os dois têm que bater.
- Cards por vertical, não por artigo: `og-kw.png` (home), `og-biblioteca.png` (as 3 páginas da
  Biblioteca), `og-jornal.png` (as páginas d'A Banca, incluindo edições). Não é preciso gerar uma
  imagem nova por edição semanal — é exatamente o tipo de tarefa manual recorrente que o
  `sitemap.xml` já evita de propósito (ver regra logo abaixo, em "A Banca — rotina de publicação
  semanal").
- **Testar o card antes de publicar o link, não depois.** O LinkedIn guarda em cache o resultado do
  primeiro acesso a uma URL — se alguém (inclusive você) já a abriu antes do OG estar certo, o card
  errado fica preso. Cole a URL no
  [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) assim que a página subir, e só
  depois publique o post de verdade. Isso vale principalmente para edição nova d'A Banca, que sai
  toda semana.

## A Banca — rotina de publicação semanal

Os dois cadernos (Boletim Salesforce e Análise de Mercado) saem **toda semana**, cada um com sua
própria numeração sequencial — "nº N" é por caderno, não compartilhado entre os dois. Se um caderno
pular uma semana, o contador dele simplesmente não avança naquele ciclo; **nunca renumerar** uma
edição já publicada pra tapar o buraco.

- **URL de edição**: `jornal/{salesforce,mercado}/AAAA-MM-DD/index.html`, data de segunda-feira de
  publicação. `og:type` é `"article"` nas páginas de edição (com `article:published_time`), e
  `"website"` nas capas/índices (`/jornal/`, `/jornal/salesforce/`, `/jornal/mercado/`).
- **Sitemap propositalmente sem edição nenhuma.** `sitemap.xml` lista só as páginas-índice
  (`/`, `/jornal/`, `/biblioteca/` e as duas trilhas). Listar cada edição criaria uma tarefa manual
  toda segunda — e tarefa manual semanal é tarefa esquecida em três semanas. O Google descobre
  edição nova a partir da capa do caderno, que sempre linka a mais recente.
- **Checklist de toda edição nova** (os pontos de inserção já existem como comentário HTML nos
  arquivos — procure por eles em vez de adivinhar onde colar):
  1. Criar a página da edição a partir do bloco-modelo comentado no fim de qualquer edição existente
     (ex.: `jornal/salesforce/2026-08-24/index.html`, seção `BLOCO-MODELO` perto do fechamento do
     `<body>`).
  2. Inserir o card da edição em `NOVA-EDICAO-AQUI`, no índice do caderno
     (`jornal/{caderno}/index.html`) — entra no topo da lista, mais recente primeiro.
  3. Atualizar o bloco `ULTIMA-{CADERNO}-INICIO/FIM` na capa (`jornal/index.html`) com o resumo da
     edição nova.
  4. Acrescentar o item no topo de `jornal/{caderno}/feed.xml` (mais recente primeiro) e manter só
     as ~20 edições mais recentes no feed — as mais antigas saem do XML mas continuam listadas no
     índice completo da página.
  5. Ligar a navegação entre edições: colar o link "Próxima edição" na página da edição **anterior**,
     e "Edição anterior" na página **nova** (componente `.nav-edicoes`, logo abaixo do
     `<header class="jornal-head">` — procure o comentário-modelo no arquivo da edição mais recente
     de cada caderno pra ver exatamente onde colar).
- **Agrupar por ano só quando fizer sentido.** A lista em `.edicoes` fica simples (sem separador) até
  conter edições de mais de um ano civil. A partir daí, inserir `<h3>{ano}</h3>` acima do primeiro
  item de cada ano, ano mais recente primeiro. Não implementar isso antes de precisar.

## Identidade visual de imagem — modelo: `assets/og-kw.png`

Toda vez que for gerar, redimensionar ou escolher uma imagem nova para o site principal (não
Repente), o modelo de arte é [assets/og-kw.png](assets/og-kw.png):

- Fundo cal (`--bg` claro, `#F0F2EF`), nunca branco puro nem foto.
- Formas geométricas planas (a "faixa da serra": triângulos e círculos), paleta Pau-brasil
  (carmim/mata/azulejo/ocre/rosa — os tokens de `kw.css`), sem gradiente, sem sombra além da
  `--shadow` já definida no sistema.
- Tipografia: Fraunces no título, Instrument Sans no corpo, IBM Plex Mono em dado/rótulo — nunca
  outra família.
- Nada de screenshot de produto (print de Salesforce, por exemplo) usado como imagem de
  compartilhamento sem antes recriar no mesmo tratamento visual — um print cru quebra a
  identidade do card no feed do LinkedIn.
- **Sem foto de banco de imagem, sem ícone de biblioteca genérica (Font Awesome etc.)** — os únicos
  SVGs do site são desenhados à mão seguindo esse sistema (ver os ícones inline em `index.html` e
  `kw.svg`).
- Cards novos seguem o padrão dos moldes em [cartoes-og/](cartoes-og/og-biblioteca.html): HTML com
  os tokens de `kw.css`, capturado a 1200×630 via "Capture node screenshot" no Chrome DevTools — não
  existe pipeline automatizado de geração de imagem neste projeto, e não deve existir (ver abaixo).

## Alt text

Nunca `alt="imagem"` ou `alt="tela do Salesforce"`. Descreva o que a imagem mostra funcionalmente:
que tela, que dado, que estado. Para card de compartilhamento, `og:image:alt` repete essencialmente
o `og:title`.

## Acessibilidade em botões repetidos

Quando a mesma ação aparece várias vezes numa página com o mesmo texto visível (ex.: os botões
"Copiar" em `/biblioteca/prompts/`, ou "Baixar .md" quando há mais de um arquivo na página), cada um
precisa de `aria-label` distinguindo o alvo — sem isso um leitor de tela lê "Copiar, botão" oito
vezes seguidas sem dizer qual prompt.

**Cuidado com botão que muda de estado via JS** (ex.: "Copiar" → "Copiado"): se o `aria-label`
identifica o alvo mas fica **estático**, ele passa a mascarar o feedback dinâmico — o texto visível
muda pra "Copiado" mas o leitor de tela sempre anuncia o mesmo rótulo fixo. Ou o `aria-label` é
atualizado junto com o estado (padrão usado em `biblioteca/prompts/index.html`), ou não se usa
`aria-label` nesse tipo de botão.

## Performance e imagens — realidade deste ambiente

- **Não há ferramenta de otimização de imagem disponível neste ambiente** (sem ImageMagick,
  pngquant, cwebp — só o `convert.exe` do Windows, que não serve pra imagem). Redimensionar/
  comprimir é sempre um passo manual: gerar já no tamanho certo (1200×630 pro card social) em vez de
  publicar um PNG grande e confiar em CSS pra encolher.
- Antes de adicionar imagem nova, meça o arquivo. Como referência do que já está no ar: os 4 PNGs
  de compartilhamento do site ficam entre 21KB e 85KB — não existe imagem de herói de artigo no site
  hoje (nem prompt nem boletim usa imagem no corpo do texto).
- Se algum dia entrar imagem de artigo (print de release note, por exemplo): `width`/`height` no
  `<img>` sempre (evita CLS), `loading="lazy"` se estiver abaixo da dobra, `loading="eager"` só na
  imagem principal acima da dobra.
- Scripts de terceiro (analytics, formulário) sempre com `defer` ou `async` — nunca bloqueando o
  `<head>`. Ver `assets/compartilhar.js`, que já segue isso.

## Segurança — realidade de "HTML estático, repositório público, sem backend"

O maior risco real aqui não é técnico, é de **exposição por publicação**: o repositório é público,
então qualquer coisa commitada fica visível no histórico do Git para sempre, mesmo revertida depois.

- **Nunca** commitar chave de API, token, e-mail interno ou dado de cliente. Se algo sensível for
  commitado por engano, **reverter não basta** — o commit continua no histórico. É preciso reescrever
  o histórico ou revogar a credencial exposta, e isso é aviso imediato a você, nunca silêncio.
- **O arquivo `CNAME` nunca se apaga.** Já vale como regra de não quebrar o site (ver README), mas
  também é segurança: sem ele o domínio cai do GitHub Pages e fica sujeito a ser reclamado por outra
  conta enquanto o DNS ainda apontar pra lá.
- **GitHub Pages não aceita cabeçalho HTTP customizado** (tipo CSP ou X-Content-Type-Options) sem um
  proxy na frente, que este projeto não tem. Um arquivo `_headers` estilo Netlify não funciona aqui.
  Se um dia entrar CSP, só dá via `<meta http-equiv="Content-Security-Policy">` no `<head>` — mais
  fraco que cabeçalho real — e precisa testar contra os scripts existentes (tema, `compartilhar.js`,
  `repente/assets/painel.js`) antes de publicar.
- **Script novo de CDN** (analytics, biblioteca de gráfico): confirmar manutenção ativa e licença
  compatível, e adicionar `integrity` + `crossorigin` na tag. Isso **não se aplica** ao link do Google
  Fonts já em uso — a resposta dele varia por navegador, então um hash de integridade fixo quebra.
- **Dado externo inserido no DOM deve usar `textContent`, nunca `innerHTML` com o valor bruto.** Hoje
  isso é mais preventivo que urgente: nada no site busca dado externo em tempo de execução —
  `repente/assets/painel.js` é só formatação/tooltip/tema, e os números do Painel Brasil vêm de
  arquivos como `repente/painel/trabalho/dados.js`, digitados e citados à mão, não de uma API ao
  vivo. Vale como regra para quando/se uma integração de verdade entrar.

## Rodar localmente

```bash
python3 -m http.server 8000
```

Servidor é obrigatório — abrir os arquivos direto do disco (`file://`) quebra os caminhos absolutos
(`/assets/...`, `/jornal/...`) que o site inteiro usa. Ver [README.md](README.md).

## Git

**Nunca commitar ou dar `push` sem o usuário pedir explicitamente**, mesmo depois de terminar uma
tarefa de otimização/SEO. Mostrar o que mudou e esperar confirmação — "pode publicar" é a autorização,
não a conclusão da tarefa em si.
