---
name: auditing-accessibility
description: Confere as duas regras de acessibilidade do projeto — alt text funcional (nunca genérico) e aria-label distinguindo botão repetido, inclusive quando o texto do botão muda de estado via JS. Use ao criar página nova, adicionar imagem, ou duplicar um componente de botão/ação na mesma página (ex. "Copiar", "Baixar .md").
---

# Auditando acessibilidade

## Estado do MCP `a11y-accessibility`

**Bloqueado nesta máquina agora (03/09/2026)** — todas as ferramentas que renderizam página
(`test_accessibility`, `test_html_string`, `check_aria_attributes`) falham com
`Failed to launch the browser process!`. É a mesma dependência de Puppeteer desatualizado da issue
[#7](https://github.com/walterkaue/painelbrasil/issues/7) — só que agora confirmado quebrado, não
só desatualizado (comentário adicionado na issue). `get_rules` (só metadados) funciona.

**Por isso o caminho principal desta Skill é checagem estática, não o MCP.** Se `test_accessibility`
voltar a funcionar (issue #7 resolvida), pode rodar como camada extra contra `wcag2aa`, mas não é
pré-requisito.

## Checagem estática

```bash
python .claude/skills/auditing-accessibility/scripts/check_a11y_rules.py <pagina.html>
```

Pega, por regra fixa:

- `<img>` sem `alt`, com `alt=""`, ou com `alt` genérico (`"imagem"`, `"foto"`, `"tela de X"`,
  `"screenshot"`) — nunca `alt="imagem"` ou `alt="tela do Salesforce"`; descrever o que a imagem
  mostra funcionalmente (que tela, que dado, que estado).
- Botão com o mesmo texto visível repetido na página (ex. vários "Copiar") sem `aria-label`
  distinguindo o alvo.

**O que o script não pega — revisar à mão:** botão que muda de estado via JS (ex. "Copiar" →
"Copiado"). Se o `aria-label` identifica o alvo mas fica **estático**, ele mascara o feedback
dinâmico — o texto visível muda mas o leitor de tela sempre anuncia o mesmo rótulo fixo. Conferir
no `<script>` da página se a função que troca `textContent` também chama
`setAttribute('aria-label', ...)` no mesmo lugar (ver `biblioteca/prompts/index.html`, função
`avisa()`, como referência do padrão certo).

## Se o script não encontrar nada

Não é garantia de página acessível — só confirma ausência das duas violações específicas que o
projeto já documentou. Não é auditoria WCAG completa.
