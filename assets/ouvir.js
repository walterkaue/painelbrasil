/* "Ouvir esta edição" — player do resumo em áudio gerado via ElevenLabs.
   Progressive enhancement: sem <audio> no navegador (raríssimo), o bloco some. */
(function(){
  'use strict';

  var wrap = document.querySelector('[data-ouvir-edicao]');
  if (!wrap) return;
  var audio = wrap.querySelector('[data-ouvir-audio]');
  var btn = wrap.querySelector('.ouvir-btn');
  var icone = wrap.querySelector('.ouvir-icone');
  var rotulo = wrap.querySelector('.ouvir-rotulo');
  var tempo = wrap.querySelector('[data-ouvir-tempo]');
  if (!audio || !btn || !icone || !rotulo) return;
  if (typeof audio.play !== 'function') return;

  var ICONE_PLAY = '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M6.5 4.2 16 10 6.5 15.8Z"/></svg>';
  var ICONE_PAUSA = '<svg viewBox="0 0 20 20" fill="currentColor"><rect x="5" y="4" width="3.6" height="12" rx=".5"/><rect x="11.4" y="4" width="3.6" height="12" rx=".5"/></svg>';

  function formataTempo(seg){
    if (!isFinite(seg)) return '0:00';
    var m = Math.floor(seg / 60);
    var s = Math.floor(seg % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function atualizaTempo(){
    if (!tempo) return;
    var dur = audio.duration;
    tempo.textContent = formataTempo(audio.currentTime) + ' / ' + formataTempo(dur);
    tempo.hidden = false;
  }

  function atualizaBotao(){
    if (audio.paused) {
      icone.innerHTML = ICONE_PLAY;
      rotulo.textContent = audio.currentTime > 0 && audio.currentTime < audio.duration
        ? 'Continuar ouvindo' : 'Ouvir o resumo';
    } else {
      icone.innerHTML = ICONE_PAUSA;
      rotulo.textContent = 'Pausar';
    }
  }

  atualizaBotao();

  btn.addEventListener('click', function(){
    if (audio.paused) { audio.play(); } else { audio.pause(); }
  });

  audio.addEventListener('play', atualizaBotao);
  audio.addEventListener('pause', atualizaBotao);
  audio.addEventListener('timeupdate', atualizaTempo);
  audio.addEventListener('loadedmetadata', atualizaTempo);
  audio.addEventListener('ended', function(){
    audio.currentTime = 0;
    atualizaBotao();
  });

  wrap.hidden = false;
})();
