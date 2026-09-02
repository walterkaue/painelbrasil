/* ═══════════════════════════════════════════════════════════════
   REPENTE — utilidades compartilhadas de painel
   Formatadores, helpers de SVG, tooltip, alternância de tema e
   botões de compartilhamento. Cada página de tema traz só os
   seus dados e o desenho dos seus gráficos.
   ═══════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  /* ── formatadores (pt-BR) ────────────────────── */
  const BRL  = n => n.toLocaleString('pt-BR', {style:'currency', currency:'BRL', maximumFractionDigits:0});
  const BRL2 = n => n.toLocaleString('pt-BR', {style:'currency', currency:'BRL', minimumFractionDigits:2});
  const NUM  = (n, d = 1) => n.toLocaleString('pt-BR', {minimumFractionDigits:d, maximumFractionDigits:d});
  const INT  = n => n.toLocaleString('pt-BR', {maximumFractionDigits:0});

  /* ── DOM ─────────────────────────────────────── */
  // `h` vira innerHTML sem sanitização — só chamar com literal/dado local
  // digitado à mão (dados.js), nunca com texto vindo de API ou input do
  // usuário. Ver regra em CLAUDE.md, seção Segurança.
  const el = (t, c, h) => {
    const e = document.createElement(t);
    if (c) e.className = c;
    if (h != null) e.innerHTML = h; // nosemgrep: dom-innerhtml-valor-nao-literal -- todo caller hoje passa literal ou dado hardcoded de dados.js, ver aviso acima
    return e;
  };
  const limpa = id => {
    const n = document.getElementById(id);
    if (n) while (n.firstChild) n.removeChild(n.firstChild);
    return n;
  };

  /* ── SVG ─────────────────────────────────────── */
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (t, a = {}) => {
    const e = document.createElementNS(NS, t);
    for (const k in a) e.setAttribute(k, a[k]);
    return e;
  };
  const txt = (s, x, y, o = {}) => {
    const t = mk('text', Object.assign(
      {x, y, 'font-size':11.5, fill:'var(--tinta-3)', 'font-family':'var(--mono)'}, o));
    t.textContent = s;
    return t;
  };

  /* ── tooltip compartilhado ───────────────────── */
  let tip;
  function balao() {
    if (!tip) {
      tip = el('div');
      tip.style.cssText =
        'position:fixed;z-index:99;pointer-events:none;opacity:0;transition:opacity .12s;' +
        'background:var(--superficie);border:1px solid var(--linha);border-radius:9px;' +
        'padding:9px 12px;font-size:13px;line-height:1.5;color:var(--tinta);' +
        'box-shadow:0 6px 22px -8px rgba(0,0,0,.35);font-family:var(--sans);max-width:250px';
      document.body.appendChild(tip);
    }
    return tip;
  }

  /**
   * Liga o tooltip a um SVG.
   * @param svg   elemento SVG
   * @param itens array de dados
   * @param fx    (indice, item) => coordenada x no espaço do viewBox
   * @param fmt   item => HTML do balão
   * @param W     largura do viewBox
   */
  function hover(svg, itens, fx, fmt, W) {
    const t = balao();
    svg.style.cursor = 'crosshair';
    svg.addEventListener('mousemove', ev => {
      const r = svg.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width * W;
      let melhor = 0, dist = Infinity;
      itens.forEach((d, i) => {
        const dd = Math.abs(fx(i, d) - px);
        if (dd < dist) { dist = dd; melhor = i; }
      });
      t.innerHTML = fmt(itens[melhor]); // nosemgrep: dom-innerhtml-valor-nao-literal -- itens vem de dados.js (digitado à mão), fmt é formatador local do chamador
      t.style.opacity = 1;
      t.style.left = Math.min(ev.clientX + 14, window.innerWidth - 270) + 'px';
      t.style.top  = (ev.clientY - 10) + 'px';
    });
    svg.addEventListener('mouseleave', () => { t.style.opacity = 0; });
  }

  /* ── alternância de tema ─────────────────────── */
  function ligarTema() {
    const b = document.getElementById('btnTema');
    if (!b) return;
    b.addEventListener('click', () => {
      const atual = document.documentElement.getAttribute('data-theme');
      const escuroAgora = atual
        ? atual === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
      const novo = escuroAgora ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', novo);
      try { localStorage.setItem('repente-tema', novo); } catch (e) { /* modo privado */ }
    });
  }
  /* aplica a preferência salva antes de pintar, se houver */
  try {
    const salvo = localStorage.getItem('repente-tema');
    if (salvo === 'dark' || salvo === 'light') {
      document.documentElement.setAttribute('data-theme', salvo);
    }
  } catch (e) { /* localStorage indisponível — segue no tema do sistema */ }

  /* ── compartilhamento ────────────────────────────────────────
     Facebook e WhatsApp têm endereço de compartilhamento por URL.
     O Instagram NÃO tem — não existe forma de mandar um link para
     o Instagram pela web. O que existe é a API nativa do navegador
     (navigator.share), que no celular abre a bandeja do sistema com
     o Instagram dentro. Sem ela, a única saída honesta é copiar o
     link para a pessoa colar no story ou na bio.
     ───────────────────────────────────────────────────────────── */
  function ligarCompartilhar() {
    const caixa = document.querySelector('.botoes-share');
    if (!caixa) return;

    const url   = caixa.dataset.url   || location.href;
    const texto = caixa.dataset.texto || document.title;
    const aviso = document.getElementById('avisoShare');

    const fala = (msg, ok) => {
      if (!aviso) return;
      aviso.innerHTML = msg; // nosemgrep: dom-innerhtml-valor-nao-literal -- fala() só é chamada com literais fixos definidos logo abaixo, nunca dado externo
      aviso.style.color = ok ? 'var(--s3)' : 'var(--tinta-3)';
    };

    const copiar = async () => {
      try {
        await navigator.clipboard.writeText(url);
        return true;
      } catch (e) {
        try {
          const t = document.createElement('textarea');
          t.value = url;
          t.style.cssText = 'position:fixed;opacity:0';
          document.body.appendChild(t);
          t.select();
          const ok = document.execCommand('copy');
          document.body.removeChild(t);
          return ok;
        } catch (e2) { return false; }
      }
    };

    caixa.addEventListener('click', async ev => {
      const b = ev.target.closest('[data-rede]');
      if (!b) return;
      const rede = b.dataset.rede;

      if (rede === 'whatsapp') {
        window.open('https://api.whatsapp.com/send?text=' +
          encodeURIComponent(texto + '\n' + url), '_blank', 'noopener');
        return;
      }
      if (rede === 'facebook') {
        window.open('https://www.facebook.com/sharer/sharer.php?u=' +
          encodeURIComponent(url), '_blank', 'noopener,width=640,height=560');
        return;
      }
      if (rede === 'instagram') {
        /* No celular, a bandeja nativa inclui o Instagram. */
        if (navigator.share) {
          try {
            await navigator.share({title: document.title, text: texto, url});
            return;
          } catch (e) { /* pessoa cancelou, ou o navegador recusou — cai para copiar */ }
        }
        const ok = await copiar();
        fala(ok
          ? '✅ <strong>Link copiado.</strong> O Instagram não aceita link compartilhado pela web — cole no seu story, na legenda ou na bio.'
          : 'Não consegui copiar automaticamente. Copie o endereço da barra do navegador e cole no Instagram.', ok);
        return;
      }
      if (rede === 'copiar') {
        const ok = await copiar();
        fala(ok ? '✅ <strong>Link copiado.</strong>' : 'Não consegui copiar. Copie o endereço da barra do navegador.', ok);
      }
    });
  }

  /* ── carimbo de data ─────────────────────────── */
  function carimbo(id, extraidoEm, base) {
    const n = document.getElementById(id);
    if (!n) return;
    const partes = ['Dados conferidos em ' +
      new Date(extraidoEm + 'T12:00:00').toLocaleDateString('pt-BR')];
    if (base) partes.push('valores reais em ' + base);
    partes.push('página aberta em ' + new Date().toLocaleDateString('pt-BR'));
    n.textContent = partes.join(' · ');
  }

  /* ── inicialização automática ────────────────── */
  function iniciar() { ligarTema(); ligarCompartilhar(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }

  global.R = {BRL, BRL2, NUM, INT, el, limpa, mk, txt, hover, carimbo};
})(window);
