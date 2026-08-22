# Repente — kauewalter.com.br

Base pública de argumentos verificáveis sobre ciência, história e política brasileira.
Site estático, sem framework, sem build, sem dependência externa além das fontes do Google.

**No ar:** https://kauewalter.com.br

---

## Por que este repositório é público

Porque o projeto promete que todo número tem fonte e método — e promessa que não pode ser
auditada não vale nada. Com o repositório aberto, qualquer pessoa pode conferir de onde veio
cada dado, quando ele mudou e por quê. **O histórico de commits é parte do argumento.**

Se você encontrou um número errado aqui, abra uma issue. Erro apontado e confirmado é corrigido
em até 72 horas, com registro público da alteração — o texto original fica, nada é apagado em
silêncio.

---

## Estrutura

```
.
├── index.html                  Página inicial
├── 404.html
├── CNAME                       kauewalter.com.br  (não apagar — é o domínio)
├── .nojekyll                   desliga o processamento Jekyll do GitHub Pages
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── base.css                sistema de design compartilhado por TODAS as páginas
│   ├── painel.js               utilidades: formatadores, SVG, tooltip, tema, compartilhar
│   ├── selo.svg                favicon e marca
│   └── og-trabalho.png         cartão de compartilhamento (1200×630)
├── painel/
│   ├── index.html              Painel Brasil — índice dos temas
│   └── trabalho/
│       ├── index.html          Mundo do Trabalho — a página
│       └── dados.js            dados-semente e desenho dos gráficos deste tema
└── sobre/
    └── metodo.html             método, fontes e política de correção
```

### Como adicionar um painel novo

1. `mkdir painel/<tema>` e copie `painel/trabalho/index.html` como ponto de partida.
2. Crie `painel/<tema>/dados.js` com os dados-semente e as funções de gráfico do tema.
3. Ajuste no `<head>`: `<title>`, `description`, `canonical`, as tags `og:` e o `og:image`.
4. Atualize a trilha de navegação e o `<nav class="sumario">`.
5. Acrescente o cartão do tema em `painel/index.html` (mude a classe de `futuro` para `pronto`).
6. Acrescente a URL em `sitemap.xml`.

**Não duplique CSS.** Tudo que for visual vive em `assets/base.css`. Se um painel precisa de um
componente novo, ele entra no `base.css` e passa a existir para todos.

---

## Regras de dados

Herdadas do `PROMPT_BASE.md` do projeto e não negociáveis:

- **Nunca de memória.** Todo número vem de fonte primária localizável, com link.
- **Buraco é buraco.** Onde o dado não existe, o valor é `null` e a página diz que falta.
  Nunca interpolar, nunca estimar, nunca arredondar para preencher.
- **Uma safra por série.** Órgãos revisam séries históricas — o mesmo ano pode ter dois valores
  oficiais. Misturar divulgações produz variações que nunca existiram.
- **Ruptura de série é informação.** Se a metodologia mudou, isso vai na página, não numa nota
  de rodapé.
- **Dado que contraria a tese aparece.** De preferência no topo.

O caderno com as ressalvas de comparabilidade de cada série está em
`caderno-dados-painel` na base do projeto.

---

## Rodar localmente

Não há build. Qualquer servidor estático serve — mas **é preciso um servidor**, porque os
caminhos são absolutos (`/assets/...`) e não funcionam abrindo o arquivo direto do disco.

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

---

## Publicação

`main` → GitHub Pages, automático. Todo push na branch principal republica o site em cerca de
um minuto.

---

## Uso de IA

Este site é construído com apoio de inteligência artificial em pesquisa, cálculo e redação.
A responsabilidade por cada afirmação é humana e tem nome.

**Nenhuma imagem, voz ou vídeo sintético é publicado aqui.** Se algum dia for, virá rotulado de
forma visível e persistente. Voz ou rosto gerado de pessoa real não aparece neste site em
hipótese nenhuma — nem como sátira, nem com aviso.

---

## Licença

O **código** deste site (HTML, CSS, JS) é livre para reúso.

Os **dados** vêm de órgãos públicos brasileiros e são de uso livre mediante citação da fonte
(Decreto 8.777/2016, art. 2º, III). Ao reaproveitar um gráfico, cite o órgão que produziu o dado —
não este site. É a fonte original que sustenta o argumento.

---

## Aviso legal

Projeto independente de educação política baseada em evidência, mantido por Kauê Sevilhano Walter.
Publicação de posicionamento pessoal sobre questões públicas, amparada no art. 36-A, V da
Lei 9.504/1997. **Não há pedido de voto neste site.**
