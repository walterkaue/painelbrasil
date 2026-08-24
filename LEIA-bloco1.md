# Bloco 1 — o que subir e em que ordem

**Gerado em 24/08/2026.** Este arquivo é instrução, **não sobe para o repositório**.

---

## ⚠️ Leia esta linha antes de tudo

As três páginas da Biblioteca agora apontam o `og:image` para **`/assets/og-biblioteca.png`**, que
**ainda não existe** — você precisa gerá-lo (passo 2 abaixo) e subir na **mesma leva**. Se subir as
páginas sem o PNG, o compartilhamento no LinkedIn sai **sem imagem nenhuma**, o que é pior que o
cartão errado de hoje.

Se quiser publicar antes de gerar os cartões, troque nas três páginas
`og-biblioteca.png` de volta por `og-kw.png` — são 6 linhas, duas por arquivo.

---

## Passo 1 — Publicar a Biblioteca e o sitemap

Do zip `biblioteca-kauewalter-v2.zip` + este pacote, sobem:

```
assets/biblioteca.css
biblioteca/index.html
biblioteca/prompts/index.html
biblioteca/trilhas/index.html
biblioteca/arquivos/prompts-certificacao-salesforce-v1.md
biblioteca/arquivos/trilhas-estudo-salesforce-v1.md
sitemap.xml                          ← SUBSTITUI o atual
```

**Nada a apagar.** O `sitemap.xml` novo substitui o antigo no mesmo caminho.

### Sobre o sitemap

Ele lista **cinco páginas-índice** e nenhuma edição d'A Banca. Isso é deliberado: listar edição
criaria uma tarefa manual toda segunda-feira, e tarefa manual semanal é tarefa esquecida em três
semanas. O Google descobre as edições a partir da capa `/jornal/`.

Se você discordar e quiser as edições listadas, o custo é assumir esse passo toda semana — ou
resolver P6-3 (publicação automática) primeiro.

---

## Passo 2 — Gerar os dois cartões OG

Os arquivos `cartoes-og/og-biblioteca.html` e `cartoes-og/og-jornal.html` são **moldes**, não
imagens. Eles não sobem para o repositório — o que sobe é o PNG que sai deles.

**Por que não vieram prontos:** as fontes Fraunces e Instrument Sans só carregam do Google Fonts, e
o ambiente onde eles foram montados não tem acesso a elas. Gerar lá produziria um cartão com a
tipografia errada — no ativo mais visível do site. No seu navegador as fontes carregam certas.

**Como gerar (3 cliques, resultado exato):**

1. Abra o arquivo `.html` no Chrome (arrastar para uma aba serve)
2. Botão direito sobre o cartão → **Inspecionar**
3. No painel *Elements*, botão direito na linha `<div class="cartao">` → **Capture node screenshot**

Sai um PNG de **1200×630 exatos**, com as fontes reais. Salve como:

| Molde | Salvar como |
|---|---|
| `og-biblioteca.html` | `assets/og-biblioteca.png` |
| `og-jornal.html` | `assets/og-jornal.png` |

**Confira antes de subir:** o título tem que sair em Fraunces (serifada, com as curvas moles) e o
corpo em Instrument Sans. Se saiu em Times ou Georgia, as fontes não carregaram — recarregue a
página e repita.

---

## Passo 3 — Apontar A Banca para o cartão novo

O `/jornal/index.html` continua com o `og:image` do currículo. Depois de subir
`assets/og-jornal.png`, troque lá:

```html
<meta property="og:image" content="https://kauewalter.com.br/assets/og-jornal.png">
<meta name="twitter:image" content="https://kauewalter.com.br/assets/og-jornal.png">
```

E o mesmo vale para cada página de edição, se elas tiverem OG próprio.

---

## Passo 4 — Menu da home

No `index.html` da raiz, dentro do `<nav>`, **depois** do item "A Banca":

```html
<a href="/biblioteca/">Biblioteca</a>
```

⚠️ Isso deixa o menu com **seis** links + o botão de tema. **Abra no celular depois de subir** e
confira se o cabeçalho não estoura. Se estourar, as saídas são: encurtar "Trajetória" para
"Carreira", ou tirar "Formação" do menu (ela é uma seção curta e a pessoa chega rolando).

---

## Depois de subir — checklist rápido

- [ ] `kauewalter.com.br/biblioteca/` abre e os dois cartões levam às páginas
- [ ] `kauewalter.com.br/biblioteca/prompts/` — o botão **Copiar** cola o prompt certo
- [ ] O botão **Baixar .md** baixa, não abre como texto na aba
- [ ] `kauewalter.com.br/sitemap.xml` abre e mostra as cinco URLs
- [ ] Colar `kauewalter.com.br/biblioteca/` no
      [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) e ver o cartão novo
      *(o LinkedIn guarda cache do primeiro acesso — inspecione antes de postar, não depois)*
- [ ] Menu no celular, com os seis itens
