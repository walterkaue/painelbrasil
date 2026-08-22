# kauewalter.com.br

Site estático servido por GitHub Pages. Sem framework, sem etapa de build.

```
.
├── index.html        página inicial
├── 404.html
├── CNAME             kauewalter.com.br  (não apagar)
├── .nojekyll
├── robots.txt
├── sitemap.xml
├── assets/           folhas de estilo e imagens
└── repente/          projeto independente, com estrutura e assets próprios
```

## Rodar localmente

```bash
python3 -m http.server 8000
```

Um servidor é necessário: abrir os arquivos direto do disco não carrega os caminhos corretamente.

## Publicação

Push na branch `main` → publica automaticamente em cerca de um minuto.
