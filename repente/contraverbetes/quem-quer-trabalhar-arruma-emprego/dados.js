/* ═══════════════════════════════════════════════════════════════
   CONTRAVERBETE C1 — "Quem quer trabalhar arruma emprego"
   Dados do pacote de conteúdo entregue pelo Projeto Repente —
   conteúdo (C1_quem-quer-trabalhar-arruma-emprego_1.md, rev. 2,
   2026-09-08). O bloco `D` abaixo é colado como veio — a mão desta
   sessão está só no desenho do gráfico G7.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const {NUM, INT, el, limpa, mk, txt, hover, carimbo} = window.R;

  const D = {
    extraidoEm: "2026-09-08",
    // sem valor deflacionado nesta série: é contagem, não moeda — sem campo "base"
    reguas: [
      {
        id: "desocupada",
        nome: "Desocupada",
        desc: "Procurou trabalho e estava disponível na semana de referência",
        unidade: "mil pessoas",
        notaFonte: "IBGE · PNAD Contínua trimestral · tabela 4100 · 4º tri · ruptura a partir do 3º tri 2025 (Amostra Mestra) · não comparável com PME nem com a PNAD anual antiga",
        serie: [[2016,12323],[2017,12279],[2018,12215],[2019,11698],[2020,14135],[2021,11793],[2022,8410],[2023,7926],[2024,6684],[2025,5503]]
      },
      {
        id: "subocupada",
        nome: "Subocupada por insuficiência de horas",
        desc: "Ocupada, trabalhando menos horas do que gostaria",
        unidade: "mil pessoas",
        notaFonte: "IBGE · PNAD Contínua trimestral · tabela 4100 · 4º tri · mesma ruptura",
        serie: [[2016,5206],[2017,6376],[2018,6817],[2019,6747],[2020,6750],[2021,7241],[2022,5336],[2023,5346],[2024,4855],[2025,4512]]
      },
      {
        id: "ft_potencial",
        nome: "Força de trabalho potencial",
        desc: "Fora da força de trabalho, queria trabalhar, mas não procurou ou não estava disponível",
        unidade: "mil pessoas",
        notaFonte: "IBGE · PNAD Contínua trimestral · tabela 4100 · 4º tri · mesma ruptura",
        serie: [[2016,6527],[2017,7446],[2018,7699],[2019,7664],[2020,11095],[2021,8842],[2022,7188],[2023,6326],[2024,5892],[2025,5274]]
      }
    ],
    desalentoPercent: [[2016,3.6],[2017,3.9],[2018,4.2],[2019,4.1],[2020,5.4],[2021,4.3],[2022,3.6],[2023,3.1],[2024,2.7],[2025,2.4]],
    desalentoAbsoluto: [[2016,null],[2017,null],[2018,null],[2019,null],[2020,null],[2021,null],[2022,null],[2023,null],[2024,null],[2025,null]]
  };

  /* ── G7 — pessoas subutilizadas, por situação (barra empilhada) ── */
  function plotG7() {
    const [desoc, subo, pot] = D.reguas;
    const anos = desoc.serie.map(p => p[0]);
    const porAno = anos.map((ano, i) => ({
      ano,
      desoc: desoc.serie[i][1],
      subo: subo.serie[i][1],
      pot: pot.serie[i][1]
    }));

    const W = 980, H = 400, mL = 58, mR = 176, mT = 26, mB = 50;
    const iw = W - mL - mR, ih = H - mT - mB, bw = iw / porAno.length;
    const TETO = 30000; // mil pessoas — acima do maior total da série (26 732, em 2018)
    const y = v => mT + ih - (v / TETO) * ih;
    const svg = mk('svg', {viewBox: `0 0 ${W} ${H}`, role: 'img',
      'aria-label': 'Pessoas subutilizadas por situação, Brasil, 4º trimestre, 2016 a 2025, em milhões de pessoas. Desocupada na base, subocupada e força de trabalho potencial empilhadas acima.'});

    const defs = mk('defs');
    const pat = mk('pattern', {id: 'g7-ruptura', patternUnits: 'userSpaceOnUse', width: 6, height: 6, patternTransform: 'rotate(45)'});
    pat.appendChild(mk('rect', {width: 6, height: 6, fill: 'transparent'}));
    pat.appendChild(mk('line', {x1: 0, y1: 0, x2: 0, y2: 6, stroke: 'var(--tinta)', 'stroke-width': 1.4, 'stroke-opacity': .32}));
    defs.appendChild(pat);
    svg.appendChild(defs);

    [0, 5000, 10000, 15000, 20000, 25000, 30000].forEach(v => {
      svg.appendChild(mk('line', {x1: mL, x2: W - mR, y1: y(v), y2: y(v), stroke: 'var(--grade)', 'stroke-width': 1}));
      svg.appendChild(txt(NUM(v / 1000, 0) + ' mi', mL - 9, y(v) + 4, {'text-anchor': 'end'}));
    });

    const cores = {desoc: 'var(--s2)', subo: 'var(--s4)', pot: 'var(--s1)'};
    const nomes = {desoc: 'Desocupada', subo: 'Subocupada', pot: 'Força de trabalho potencial'};

    porAno.forEach((r, i) => {
      const bx = mL + i * bw + 7, bwid = bw - 14;
      let acc = 0;
      [['desoc', r.desoc], ['subo', r.subo], ['pot', r.pot]].forEach(([k, v]) => {
        const y0 = y(acc), y1 = y(acc + v);
        svg.appendChild(mk('rect', {x: bx, y: y1, width: bwid, height: y0 - y1, fill: cores[k]}));
        if (r.ano === 2016 || r.ano === 2020 || r.ano === 2025) {
          svg.appendChild(txt(INT(v), bx + bwid / 2, y1 + (y0 - y1) / 2 + 4,
            {'text-anchor': 'middle', 'font-size': 10.5, 'font-weight': 600, fill: '#fff'}));
        }
        acc += v;
      });

      if (r.ano === 2025) {
        svg.appendChild(mk('rect', {x: bx, y: y(acc), width: bwid, height: y(0) - y(acc), fill: 'url(#g7-ruptura)'}));
        svg.appendChild(mk('line', {x1: bx - 5, x2: bx - 5, y1: mT, y2: mT + ih,
          stroke: 'var(--tinta-3)', 'stroke-width': 1, 'stroke-dasharray': '3 4'}));
        svg.appendChild(txt('⚠ ruptura amostral', bx + bwid / 2, mT - 10,
          {'text-anchor': 'middle', 'font-size': 10.5, 'font-family': 'var(--sans)', fill: 'var(--tinta-3)', 'font-weight': 600}));

        let accL = 0;
        [['desoc', r.desoc], ['subo', r.subo], ['pot', r.pot]].forEach(([k, v]) => {
          const ym = y(accL + v / 2);
          svg.appendChild(txt(nomes[k], bx + bwid + 9, ym + 4,
            {'text-anchor': 'start', 'font-size': 11, 'font-family': 'var(--sans)', fill: cores[k], 'font-weight': 600}));
          accL += v;
        });
      }

      svg.appendChild(txt(r.ano, bx + bwid / 2, mT + ih + 20, {'text-anchor': 'middle'}));
    });
    svg.appendChild(mk('line', {x1: mL, x2: W - mR, y1: y(0), y2: y(0), stroke: 'var(--base)', 'stroke-width': 1}));

    limpa('plotG7').appendChild(svg);
    hover(svg, porAno, (i, p) => mL + i * bw + bw / 2,
      p => `<strong>${p.ano}${p.ano === 2025 ? ' ⚠ ruptura' : ''}</strong><br>` +
        `Desocupada: ${INT(p.desoc)} mil<br>Subocupada: ${INT(p.subo)} mil<br>` +
        `Força de trabalho potencial: ${INT(p.pot)} mil<br>` +
        `<strong>Total subutilizada: ${INT(p.desoc + p.subo + p.pot)} mil</strong>`, W);
  }

  carimbo('carimbo', D.extraidoEm);
  plotG7();
})();
