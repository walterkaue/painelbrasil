/* ===========================================================================
   compartilhar.js — monta a barra de compartilhamento.

   COMO USAR numa página qualquer do lado profissional:

     <link rel="stylesheet" href="/assets/compartilhar.css">
     ...
     <div class="kw-share"></div>          <-- onde a barra deve aparecer
     ...
     <script src="/assets/compartilhar.js" defer></script>

   Opcional, se o texto do compartilhamento tiver de ser diferente do <title>:
     <div class="kw-share" data-titulo="Trilhas de estudo — Marketing Cloud"></div>

   Sem dependência externa. Se o JavaScript não rodar, a barra simplesmente não
   aparece — nenhuma outra parte da página é afetada.
   =========================================================================== */

(function () {
  'use strict';

  var ICONES = {
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.24.25-.41.09-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.24-.85.83-.85 2.03s.87 2.35.99 2.51c.12.17 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.47-.29z"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
  };

  function copiaLegado(txt) {
    var ta = document.createElement('textarea');
    ta.value = txt;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function monta(caixa) {
    var url = window.location.href.split('#')[0];
    var titulo = caixa.getAttribute('data-titulo') || document.title || url;

    caixa.innerHTML = '';

    var rotulo = document.createElement('span');
    rotulo.className = 'kw-share-rotulo';
    rotulo.textContent = 'Compartilhar';
    caixa.appendChild(rotulo);

    var vivo = document.createElement('span');
    vivo.className = 'kw-share-vivo';
    vivo.setAttribute('role', 'status');
    vivo.setAttribute('aria-live', 'polite');

    // --- LinkedIn ---
    var li = document.createElement('a');
    li.className = 'kw-share-btn';
    li.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url);
    li.target = '_blank';
    li.rel = 'noopener noreferrer';
    li.innerHTML = ICONES.linkedin + '<span>LinkedIn</span>'; // nosemgrep: dom-innerhtml-valor-nao-literal -- ICONES.* é constante hardcoded acima, nunca dado externo
    li.setAttribute('aria-label', 'Compartilhar esta página no LinkedIn (abre em nova aba)');
    caixa.appendChild(li);

    // --- WhatsApp ---
    var wa = document.createElement('a');
    wa.className = 'kw-share-btn';
    wa.href = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(titulo + ' — ' + url);
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    wa.innerHTML = ICONES.whatsapp + '<span>WhatsApp</span>'; // nosemgrep: dom-innerhtml-valor-nao-literal -- ICONES.* é constante hardcoded acima, nunca dado externo
    wa.setAttribute('aria-label', 'Compartilhar esta página no WhatsApp (abre em nova aba)');
    caixa.appendChild(wa);

    // --- Copiar link ---
    var cp = document.createElement('button');
    cp.type = 'button';
    cp.className = 'kw-share-btn';
    var rotuloCopiar = '<span>Copiar link</span>';
    cp.innerHTML = ICONES.link + rotuloCopiar; // nosemgrep: dom-innerhtml-valor-nao-literal -- rotuloCopiar é literal fixo definido acima, nunca dado externo
    cp.setAttribute('aria-label', 'Copiar o endereço desta página');

    function avisa(texto, estado) {
      cp.innerHTML = ICONES.link + '<span>' + texto + '</span>'; // nosemgrep: dom-innerhtml-valor-nao-literal -- avisa() só é chamada com literais fixos ('Link copiado' etc.), nunca dado externo
      cp.setAttribute('data-estado', estado);
      vivo.textContent = texto;
      window.setTimeout(function () {
        cp.innerHTML = ICONES.link + rotuloCopiar; // nosemgrep: dom-innerhtml-valor-nao-literal -- rotuloCopiar é literal fixo definido acima, nunca dado externo
        cp.removeAttribute('data-estado');
        vivo.textContent = '';
      }, 2200);
    }

    cp.addEventListener('click', function () {
      var reserva = function () {
        var ok = copiaLegado(url);
        avisa(ok ? 'Link copiado' : 'Copie da barra do navegador', ok ? 'ok' : 'erro');
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(function () {
          avisa('Link copiado', 'ok');
        })['catch'](reserva);
      } else {
        reserva();
      }
    });

    caixa.appendChild(cp);
    caixa.appendChild(vivo);
  }

  function inicia() {
    var caixas = document.querySelectorAll('.kw-share');
    for (var i = 0; i < caixas.length; i++) { monta(caixas[i]); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicia);
  } else {
    inicia();
  }
})();
