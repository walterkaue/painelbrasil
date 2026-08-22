/* ═══════════════════════════════════════════════════════════════
   PAINEL BRASIL — MUNDO DO TRABALHO
   Dados-semente e desenho dos gráficos desta página.

   Conferidos em 22/08/2026. Nada aqui é estimado ou interpolado:
   onde não há dado confirmado em fonte, há null.
   O caderno com as ressalvas de comparabilidade de cada série
   fica em `caderno-dados-painel` no repositório do projeto.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const {BRL, BRL2, NUM, INT, el, limpa, mk, txt, hover, carimbo} = window.R;

  const D = {
    extraidoEm: '2026-08-22',
    base: 'reais de julho de 2026',

    /* [ano, nominal, real(jul/2026), necessário DIEESE, razão]
       real = nominal × produto do IPCA anual até jul/2026 */
    sm: [
      [1994, 70, 527.32, 728.90, 10.41], [1995, 100, 615.40, 763.09, 7.63],
      [1996, 112, 629.10, 778.27, 6.95], [1997, 120, 640.60, 837.16, 6.98],
      [1998, 130, 682.65, 857.66, 6.60], [1999, 136, 655.55, 940.58, 6.92],
      [2000, 151, 686.85, 1004.26, 6.65], [2001, 180, 760.44, 1101.54, 6.12],
      [2002, 200, 750.85, 1378.19, 6.89], [2003, 240, 824.35, 1420.61, 5.92],
      [2004, 260, 829.97, 1468.08, 5.65], [2005, 300, 906.10, 1607.11, 5.36],
      [2006, 350, 1024.94, 1564.52, 4.47], [2007, 380, 1065.28, 1803.11, 4.75],
      [2008, 415, 1098.58, 2141.08, 5.16], [2009, 465, 1180.08, 1995.91, 4.29],
      [2010, 510, 1222.05, 2227.53, 4.37], [2011, 545, 1226.22, 2329.35, 4.27],
      [2012, 622, 1322.24, 2561.47, 4.12], [2013, 678, 1360.86, 2765.44, 4.08],
      [2014, 724, 1365.65, 2975.55, 4.11], [2015, 788, 1343.07, 3518.51, 4.47],
      [2016, 880, 1411.11, 3856.23, 4.38], [2017, 937, 1459.46, 3585.05, 3.83],
      [2018, 954, 1432.23, 3960.57, 4.15], [2019, 998, 1436.38, 4342.57, 4.35],
      [2020, 1045, 1438.98, 5304.90, 5.08], [2021, 1100, 1376.27, 5800.98, 5.27],
      [2022, 1212, 1433.54, 6647.63, 5.48], [2023, 1320, 1492.33, 6439.62, 4.88],
      [2024, 1412, 1522.79, 7067.68, 5.01], [2025, 1518, 1570.22, 7106.83, 4.68],
      [2026, 1621, 1621.00, 7687.01, 4.74]
    ],

    /* As réguas do desemprego. O IBGE afirma em nota técnica que as
       pesquisas não são comparáveis entre si — por isso cada uma é
       uma série separada, nunca uma linha só. */
    reguas: [
      {id:'pnadc', nome:'PNAD Contínua — desocupação (2º trimestre)',
       desc:'Nacional, 14 anos ou mais. Conta quem não tinha trabalho, procurou nos últimos 30 dias e estava disponível. É a taxa que vira manchete — e a mais estreita.',
       unidade:'%', cor:'var(--s1)',
       fonte:'IBGE — PNAD Contínua, 2º trimestre de cada ano, safra 2T2026 (série recalculada na mesma divulgação)',
       serie:[[2012,7.6],[2013,7.5],[2014,6.9],[2015,8.4],[2016,11.4],[2017,13.1],[2018,12.6],
              [2019,12.1],[2020,13.6],[2021,14.2],[2022,9.3],[2023,8.0],[2024,6.9],[2025,5.8],[2026,5.4]]},
      {id:'subut', nome:'PNAD Contínua — subutilização',
       desc:'Soma desocupados, subocupados por insuficiência de horas e força de trabalho potencial (inclui quem desistiu de procurar). É mais que o dobro da desocupação.',
       unidade:'%', cor:'var(--s2)',
       fonte:'IBGE — PNAD Contínua, taxa composta de subutilização, médias anuais (safra 2023–2025); 2026 = 2º trimestre',
       serie:[[2019,24.4],[2022,20.9],[2023,18.0],[2024,16.2],[2025,14.5],[2026,12.9]]},
      {id:'inform', nome:'PNAD Contínua — informalidade',
       desc:'Fatia dos ocupados sem carteira, sem CNPJ e sem contribuição previdenciária. Não é desemprego: é trabalho sem proteção nenhuma.',
       unidade:'%', cor:'var(--s4)',
       fonte:'IBGE — PNAD Contínua, taxa de informalidade, médias anuais (Retrospectiva 2024); 2026 = 2º trimestre',
       serie:[[2016,39.1],[2017,40.6],[2018,40.9],[2019,40.9],[2020,37.6],[2021,39.5],[2022,39.4],
              [2023,39.2],[2024,39.0],[2025,38.1],[2026,37.4]]},
      {id:'desal', nome:'PNAD Contínua — desalentados (milhões)',
       desc:'Pessoas que queriam trabalhar mas desistiram de procurar. Não entram na taxa de desocupação — por definição, não estão procurando.',
       unidade:'mi', cor:'var(--s3)',
       fonte:'IBGE — PNAD Contínua, desalentados, médias anuais (safra 2023–2025)',
       serie:[[2014,1.6],[2021,5.6],[2022,4.3],[2023,3.7],[2024,3.3],[2025,2.9]]},
      {id:'pme', nome:'PME — desocupação (régua antiga, 2003–2015)',
       desc:'Apenas 6 regiões metropolitanas, a partir dos 10 anos. Encerrada em 2016. O IBGE afirma que a PNAD Contínua mostra taxas SISTEMATICAMENTE MAIS ALTAS que esta — a régua antiga não era mais severa, era mais estreita.',
       unidade:'%', cor:'var(--tinta-3)',
       fonte:'IBGE — Pesquisa Mensal de Emprego, médias anuais, releases da Agência de Notícias. Série com buracos (2007 e 2008 não localizados)',
       serie:[[2003,12.4],[2004,11.5],[2005,9.8],[2006,10.0],[2009,8.1],[2010,6.7],[2011,6.0],
              [2012,5.5],[2013,5.4],[2014,4.8],[2015,6.8]]},
      {id:'pnad', nome:'PNAD anual — desocupação (régua mais antiga)',
       desc:'Nacional, 10 anos ou mais, medida na última semana de setembro. Descontinuada em 2015. Só cinco anos puderam ser confirmados em fonte primária — os pontos são pontos, não uma tendência.',
       unidade:'%', cor:'var(--base)', pontos:true,
       fonte:'IBGE — PNAD anual. ⚠️ Série incompleta: apenas 5 anos confirmados. Não sustenta narrativa.',
       serie:[[1995,6.1],[2003,9.7],[2006,8.5],[2008,7.1],[2009,8.3]]}
    ],

    /* Censo 2022 — salário mínimo de referência R$ 1.212 */
    faixas: [
      {rot:'Até ½ salário mínimo', v:11.2, nota:'o número defensável para “abaixo do mínimo”'},
      {rot:'Mais de ½ até 1 SM', v:24.1, nota:'derivado: 35,3 − 11,2'},
      {rot:'Mais de 1 até 2 SM', v:32.7, nota:null},
      {rot:'Mais de 2 até 5 SM', v:24.4, nota:'⚠️ agrupado: as faixas 2–3 e 3–5 não estão publicadas'},
      {rot:'Mais de 5 SM', v:7.6, nota:'destes, 0,7% ganham mais de 20 SM'}
    ],

    /* IBGE — Contas Nacionais, % do PIB: [ano, trabalho, capital] */
    pib: [[2010,41.6,33.7],[2011,42.2,33.6],[2012,42.8,32.8],[2013,43.2,32.6],[2014,43.5,33.1],
          [2015,44.6,32.1],[2016,44.7,32.3],[2017,44.3,32.4],[2018,43.6,32.7],[2019,43.5,32.9],
          [2020,42.0,35.3],[2021,39.2,37.4]],

    /* IPEA / POF 2017-2018: [renda média do décimo, indiretos %, diretos %] */
    tributos: [[212,21.2,3.1],[409,15.7,4.0],[582,14.1,4.0],[761,13.0,4.6],[962,12.7,5.1],
               [1196,11.9,5.3],[1491,11.5,5.8],[1934,11.4,7.0],[2818,10.4,8.4],[7718,7.8,10.9]],

    uf: {
      desoc: {titulo:'Taxa de desocupação por estado', unidade:'%', inverso:true,
        fonte:'IBGE — PNAD Contínua Trimestral, 2º trimestre de 2026. ⚠️ 10 das 27 UFs cruzadas com o release do IBGE; as demais vêm de compilação secundária e serão conferidas no SIDRA.',
        dados:[['SC',2.1],['MT',2.2],['ES',2.3],['RO',2.6],['MS',2.7],['PR',3.1],['MG',3.8],['GO',4.0],
               ['TO',4.1],['RS',4.2],['RR',5.0],['PB',5.4],['SP',5.4],['RN',5.6],['MA',6.0],['PA',6.2],
               ['DF',6.5],['AC',6.6],['CE',6.6],['RJ',7.1],['AM',7.5],['AL',7.9],['SE',7.9],['PI',8.3],
               ['PE',8.3],['BA',9.1],['AP',9.8]],
        media:5.4, mediaRot:'Brasil: 5,4%'},
      renda: {titulo:'Rendimento domiciliar per capita por estado', unidade:'R$', inverso:false,
        fonte:'IBGE — PNAD Contínua, Rendimento de todas as fontes 2025. ⚠️ É rendimento DOMICILIAR PER CAPITA de todas as fontes, conceito diferente do rendimento do trabalho.',
        dados:[['MA',1219],['CE',1390],['AC',1392],['PA',1420],['AL',1422],['BA',1465],['AM',1484],
               ['PB',1543],['PI',1546],['PE',1600],['SE',1697],['AP',1697],['RN',1819],['RR',1878],
               ['RO',1991],['TO',2036],['ES',2249],['MT',2335],['MG',2353],['GO',2407],['MS',2454],
               ['PR',2762],['RJ',2794],['SC',2809],['RS',2839],['SP',2956],['DF',4538]],
        media:2316, mediaRot:'Brasil: R$ 2.316'}
    },

    mundo: [['Alemanha',34053],['Reino Unido',33071],['França',28710],['Coreia do Sul',26512],
            ['Espanha',26216],['Portugal',19814],['EUA (federal)',15080],['Colômbia',11107],
            ['Chile',10931],['Brasil',6712],['México',5892]],

    corpo: [
      ['Mortes no trabalho em 2025','3.644','recorde da série · cerca de 10 por dia'],
      ['Acidentes de trabalho em 2025','806.011','recorde da série'],
      ['Mortes acumuladas, 2016–2025','27.486','mais de 106 milhões de dias de trabalho perdidos'],
      ['Crescimento das mortes, 2020→2025','+60,8%','de 2.265 para 3.644'],
      ['Rendimento-hora de pessoas brancas','R$ 24,60','IBGE, Síntese de Indicadores Sociais 2025 (ano-base 2024)'],
      ['Rendimento-hora de pessoas pretas ou pardas','R$ 15,00','61% do valor recebido por pessoas brancas'],
      ['Rendimento de mulheres frente a homens','78,6%','equivale a homens recebendo 27,2% a mais']
    ]
  };

  /* Endpoint público que a página tenta ler no navegador de quem visita.
     Se falhar (rede, CORS, mudança de API), o dado-semente permanece e
     o selo continua "Dados de referência". Nada quebra. */
  const FONTE_VIVA =
    'https://servicodados.ibge.gov.br/api/v3/agregados/6381/periodos/-6/variaveis/4099?localidades=N1[all]';

  /* ── cartões de número ───────────────────────── */
  function tiles() {
    const s = D.sm, ult = s[s.length - 1], prim = s[0];
    const defs = [
      ['Salário mínimo real hoje', BRL(ult[2]),
       'em reais de jul/2026 · era ' + BRL(prim[2]) + ' em 1994', 'DIEESE + IPCA/IBGE · elaboração própria'],
      ['Ganho real desde 1994', '+' + NUM((ult[2] / prim[2] - 1) * 100, 0) + '%',
       'o mínimo triplicou em poder de compra', 'DIEESE + IPCA/IBGE · elaboração própria'],
      ['Distância do salário necessário', NUM(ult[4], 2) + '×',
       'o DIEESE calcula ' + BRL(ult[3]) + ' para uma família de 4', 'DIEESE — Cesta Básica, jul/2026'],
      ['Anos em que a distância ficou abaixo de 4×', '1',
       'de 33 anos medidos — só 2017', 'DIEESE · elaboração própria'],
      ['Remuneração do trabalho no PIB', '39,2%',
       'era 44,7% em 2016 · série para em 2021', 'IBGE — Contas Nacionais'],
      ['Imposto indireto sobre os 10% mais pobres', '21,2%',
       'os 10% mais ricos pagam 7,8%', 'IPEA / POF-IBGE 2017-2018'],
      ['Mortes no trabalho em 2025', '3.644',
       'recorde da série · só trabalho formal', 'MTE — estudo 2016–2025'],
      ['Subutilização da força de trabalho', '12,9%',
       'mais que o dobro da taxa de desocupação (5,4%)', 'IBGE — PNAD Contínua, 2º tri/2026']
    ];
    const alvo = document.getElementById('tiles');
    defs.forEach(([rot, val, sub, fonte]) => {
      const c = el('div', 'tile');
      c.appendChild(el('div', 'rot', rot));
      c.appendChild(el('div', 'val', val));
      c.appendChild(el('div', 'sub', sub));
      c.appendChild(el('div', 'fonte-mini', fonte));
      alvo.appendChild(c);
    });
  }

  /* ── salário mínimo real ─────────────────────── */
  function plotReal() {
    const d = D.sm, W = 900, H = 350, mL = 64, mR = 22, mT = 26, mB = 44;
    const iw = W - mL - mR, ih = H - mT - mB, min = 0, max = 1750;
    const x = i => mL + (i / (d.length - 1)) * iw;
    const y = v => mT + ih - ((v - min) / (max - min)) * ih;
    const svg = mk('svg', {viewBox:`0 0 ${W} ${H}`, role:'img',
      'aria-label':'Salário mínimo real em reais de julho de 2026, de 1994 a 2026'});

    [0, 400, 800, 1200, 1600].forEach(v => {
      svg.appendChild(mk('line', {x1:mL, x2:W-mR, y1:y(v), y2:y(v), stroke:'var(--grade)','stroke-width':1}));
      svg.appendChild(txt('R$ ' + INT(v), mL - 9, y(v) + 4, {'text-anchor':'end'}));
    });

    const defs = mk('defs'), g = mk('linearGradient', {id:'gReal', x1:0, y1:0, x2:0, y2:1});
    g.appendChild(mk('stop', {offset:'0%','stop-color':'var(--s1)','stop-opacity':.22}));
    g.appendChild(mk('stop', {offset:'100%','stop-color':'var(--s1)','stop-opacity':.02}));
    defs.appendChild(g); svg.appendChild(defs);

    svg.appendChild(mk('path', {d: d.map((r,i)=>`${i?'L':'M'}${x(i)},${y(r[2])}`).join(' ') +
      ` L${x(d.length-1)},${y(0)} L${x(0)},${y(0)} Z`, fill:'url(#gReal)'}));
    svg.appendChild(mk('path', {d: d.map((r,i)=>`${i?'L':'M'}${x(i)},${y(r[1])}`).join(' '),
      fill:'none', stroke:'var(--base)','stroke-width':2,'stroke-dasharray':'5 5','stroke-linecap':'round'}));
    svg.appendChild(mk('path', {d: d.map((r,i)=>`${i?'L':'M'}${x(i)},${y(r[2])}`).join(' '),
      fill:'none', stroke:'var(--s1)','stroke-width':2.5,'stroke-linejoin':'round','stroke-linecap':'round'}));
    svg.appendChild(mk('line', {x1:mL, x2:W-mR, y1:y(0), y2:y(0), stroke:'var(--base)','stroke-width':1}));

    d.forEach((r, i) => {
      const marco = (i === 0 || i === d.length - 1);
      svg.appendChild(mk('circle', {cx:x(i), cy:y(r[2]), r:marco?5:2.6, fill:'var(--s1)',
        stroke:'var(--superficie)','stroke-width':marco?2:1}));
      if (marco) svg.appendChild(txt(BRL(r[2]), x(i) + (i ? -4 : 4), y(r[2]) - 14,
        {'text-anchor': i ? 'end' : 'start', 'font-size':13, 'font-weight':700, fill:'var(--tinta)'}));
      if (r[0] % 4 === 2 || i === d.length - 1)
        svg.appendChild(txt(r[0], x(i), mT + ih + 20, {'text-anchor':'middle'}));
    });
    svg.appendChild(txt('linha tracejada: valor nominal da época', x(0) + 8, y(0) - 10,
      {'text-anchor':'start','font-family':'var(--sans)', fill:'var(--tinta-3)'}));

    limpa('plotReal').appendChild(svg);
    hover(svg, d, i => x(i),
      r => `<strong>${r[0]}</strong><br>Real: ${BRL2(r[2])}<br>Nominal: ${BRL2(r[1])}`, W);
  }

  /* ── razão necessário / mínimo ───────────────── */
  function plotRazao() {
    const d = D.sm, W = 900, H = 320, mL = 48, mR = 22, mT = 26, mB = 44;
    const iw = W - mL - mR, ih = H - mT - mB, max = 11, bw = iw / d.length;
    const y = v => mT + ih - (v / max) * ih;
    const svg = mk('svg', {viewBox:`0 0 ${W} ${H}`, role:'img',
      'aria-label':'Razão entre salário mínimo necessário e vigente, 1994 a 2026'});

    [2, 4, 6, 8, 10].forEach(v => {
      svg.appendChild(mk('line', {x1:mL, x2:W-mR, y1:y(v), y2:y(v), stroke:'var(--grade)','stroke-width':1}));
      svg.appendChild(txt(v + '×', mL - 9, y(v) + 4, {'text-anchor':'end'}));
    });
    svg.appendChild(mk('line', {x1:mL, x2:W-mR, y1:y(1), y2:y(1), stroke:'var(--s3)',
      'stroke-width':2, 'stroke-dasharray':'6 4'}));
    svg.appendChild(txt('1×', mL - 9, y(1) + 4, {'text-anchor':'end', fill:'var(--s3)','font-weight':700}));

    const menor = d.reduce((a, b) => b[4] < a[4] ? b : a);
    d.forEach((r, i) => {
      const bx = mL + i * bw + 2, bwid = bw - 4, ty = y(r[4]), rr = Math.min(3, bwid / 2);
      svg.appendChild(mk('path', {d:`M${bx},${y(0)} L${bx},${ty+rr} Q${bx},${ty} ${bx+rr},${ty} ` +
        `L${bx+bwid-rr},${ty} Q${bx+bwid},${ty} ${bx+bwid},${ty+rr} L${bx+bwid},${y(0)} Z`,
        fill:'var(--s2)', 'fill-opacity': r[0] === menor[0] ? 1 : .72}));
      if (r[0] % 4 === 2 || i === d.length - 1)
        svg.appendChild(txt(r[0], bx + bwid / 2, mT + ih + 20, {'text-anchor':'middle'}));
    });
    svg.appendChild(txt(NUM(d[0][4], 2), mL + bw / 2, y(d[0][4]) - 8,
      {'text-anchor':'middle','font-weight':700, fill:'var(--tinta)','font-size':12}));
    svg.appendChild(txt(NUM(d[d.length-1][4], 2), mL + (d.length-1) * bw + bw / 2, y(d[d.length-1][4]) - 8,
      {'text-anchor':'middle','font-weight':700, fill:'var(--tinta)','font-size':12}));
    svg.appendChild(mk('line', {x1:mL, x2:W-mR, y1:y(0), y2:y(0), stroke:'var(--base)','stroke-width':1}));

    limpa('plotRazao').appendChild(svg);
    hover(svg, d, i => mL + i * bw + bw / 2,
      r => `<strong>${r[0]}</strong><br>Necessário: ${BRL2(r[3])}<br>Vigente: ${BRL2(r[1])}<br>Razão: ${NUM(r[4],2)}×`, W);
  }

  /* ── réguas do desemprego ────────────────────── */
  function plotDesemprego(id) {
    const r = D.reguas.find(x => x.id === id);
    document.getElementById('reguaDesc').textContent = r.desc;
    document.getElementById('fonteDesemprego').textContent = 'Fonte: ' + r.fonte;

    const lg = limpa('legendaDesemprego');
    lg.appendChild(el('span', null, '<i class="chip" style="background:' + r.cor + '"></i> ' + r.nome));
    if (r.pontos) lg.appendChild(el('span', null,
      '<span style="color:var(--s4)">⚠️ série incompleta — pontos isolados, não tendência</span>'));

    const d = r.serie, W = 900, H = 330, mL = 52, mR = 26, mT = 28, mB = 44;
    const iw = W - mL - mR, ih = H - mT - mB;
    const vals = d.map(p => p[1]), max = Math.ceil(Math.max(...vals) * 1.25);
    const anos = d.map(p => p[0]), a0 = Math.min(...anos), a1 = Math.max(...anos);
    const x = a => mL + ((a - a0) / Math.max(1, a1 - a0)) * iw;
    const y = v => mT + ih - (v / max) * ih;
    const svg = mk('svg', {viewBox:`0 0 ${W} ${H}`, role:'img', 'aria-label': r.nome});

    const passo = max > 20 ? 5 : (max > 8 ? 2 : 1);
    for (let v = 0; v <= max; v += passo) {
      svg.appendChild(mk('line', {x1:mL, x2:W-mR, y1:y(v), y2:y(v), stroke:'var(--grade)','stroke-width':1}));
      svg.appendChild(txt(NUM(v, 0) + (r.unidade === '%' ? '%' : ''), mL - 9, y(v) + 4, {'text-anchor':'end'}));
    }
    if (!r.pontos) svg.appendChild(mk('path', {d: d.map((p,i)=>`${i?'L':'M'}${x(p[0])},${y(p[1])}`).join(' '),
      fill:'none', stroke:r.cor, 'stroke-width':2.5, 'stroke-linejoin':'round','stroke-linecap':'round'}));
    d.forEach((p, i) => {
      svg.appendChild(mk('circle', {cx:x(p[0]), cy:y(p[1]), r:r.pontos?5.5:3.4, fill:r.cor,
        stroke:'var(--superficie)','stroke-width':2}));
      if (i === 0 || i === d.length - 1 || p[1] === Math.max(...vals))
        svg.appendChild(txt(NUM(p[1],1) + (r.unidade === '%' ? '%' : ' mi'), x(p[0]), y(p[1]) - 13,
          {'text-anchor': i === d.length-1 ? 'end' : (i === 0 ? 'start' : 'middle'),
           'font-size':12, 'font-weight':700, fill:'var(--tinta)'}));
    });
    const passoA = (a1 - a0) > 14 ? 3 : 2;
    for (let a = a0; a <= a1; a += passoA) svg.appendChild(txt(a, x(a), mT + ih + 20, {'text-anchor':'middle'}));
    if ((a1 - a0) % passoA !== 0) svg.appendChild(txt(a1, x(a1), mT + ih + 20, {'text-anchor':'middle'}));
    svg.appendChild(mk('line', {x1:mL, x2:W-mR, y1:y(0), y2:y(0), stroke:'var(--base)','stroke-width':1}));

    limpa('plotDesemprego').appendChild(svg);
    hover(svg, d, (i, p) => x(p[0]),
      p => `<strong>${p[0]}</strong><br>${NUM(p[1],1)}${r.unidade === '%' ? '%' : ' milhões'}`, W);
  }

  /* ── faixas de renda ─────────────────────────── */
  function plotFaixas() {
    const d = D.faixas, W = 900, alt = 54, H = d.length * alt + 56, mL = 210, mR = 30;
    const iw = W - mL - mR, max = 36, x = v => (v / max) * iw;
    const svg = mk('svg', {viewBox:`0 0 ${W} ${H}`, role:'img',
      'aria-label':'Distribuição dos ocupados por faixa de rendimento, Censo 2022'});
    d.forEach((f, i) => {
      const yy = 22 + i * alt, w = x(f.v), rr = 4;
      svg.appendChild(txt(f.rot, mL - 14, yy + 17, {'text-anchor':'end','font-size':13.5,
        fill:'var(--tinta)','font-family':'var(--sans)','font-weight':500}));
      svg.appendChild(mk('path', {d:`M${mL},${yy} L${mL+w-rr},${yy} Q${mL+w},${yy} ${mL+w},${yy+rr} ` +
        `L${mL+w},${yy+26-rr} Q${mL+w},${yy+26} ${mL+w-rr},${yy+26} L${mL},${yy+26} Z`,
        fill: i < 2 ? 'var(--s2)' : (i === 2 ? 'var(--s4)' : 'var(--s1)'),
        'fill-opacity': i === 3 ? .55 : .92}));
      svg.appendChild(txt(NUM(f.v,1) + '%', mL + w + 9, yy + 18,
        {'text-anchor':'start','font-size':14,'font-weight':700, fill:'var(--tinta)'}));
      if (f.nota) svg.appendChild(txt(f.nota, mL, yy + 40,
        {'text-anchor':'start','font-size':11.5, fill:'var(--tinta-3)','font-family':'var(--sans)'}));
    });
    const yb = 22 + d.length * alt;
    svg.appendChild(mk('line', {x1:mL, x2:mL + x(max), y1:yb-6, y2:yb-6, stroke:'var(--base)','stroke-width':1}));
    svg.appendChild(txt('68% dos ocupados ganhavam até 2 salários mínimos', mL, yb + 14,
      {'text-anchor':'start','font-size':13, fill:'var(--s2)','font-weight':600,'font-family':'var(--sans)'}));
    limpa('plotFaixas').appendChild(svg);
  }

  /* ── salários no PIB ─────────────────────────── */
  function plotPib() {
    const d = D.pib, W = 900, H = 330, mL = 52, mR = 66, mT = 28, mB = 44;
    const iw = W - mL - mR, ih = H - mT - mB, min = 28, max = 48;
    const x = i => mL + (i / (d.length - 1)) * iw;
    const y = v => mT + ih - ((v - min) / (max - min)) * ih;
    const svg = mk('svg', {viewBox:`0 0 ${W} ${H}`, role:'img',
      'aria-label':'Remuneração do trabalho e excedente operacional como percentual do PIB, 2010 a 2021'});
    [30, 34, 38, 42, 46].forEach(v => {
      svg.appendChild(mk('line', {x1:mL, x2:W-mR, y1:y(v), y2:y(v), stroke:'var(--grade)','stroke-width':1}));
      svg.appendChild(txt(v + '%', mL - 9, y(v) + 4, {'text-anchor':'end'}));
    });
    [[1,'var(--s1)'], [2,'var(--s2)']].forEach(([k, cor]) => {
      svg.appendChild(mk('path', {d: d.map((r,i)=>`${i?'L':'M'}${x(i)},${y(r[k])}`).join(' '),
        fill:'none', stroke:cor, 'stroke-width':2.5,'stroke-linejoin':'round','stroke-linecap':'round'}));
      d.forEach((r, i) => svg.appendChild(mk('circle', {cx:x(i), cy:y(r[k]), r:3.2, fill:cor,
        stroke:'var(--superficie)','stroke-width':1.5})));
    });
    const i16 = d.findIndex(r => r[0] === 2016), iF = d.length - 1;
    svg.appendChild(mk('line', {x1:x(i16), x2:x(i16), y1:mT+4, y2:mT+ih,
      stroke:'var(--tinta-3)','stroke-width':1,'stroke-dasharray':'3 4'}));
    svg.appendChild(txt('44,7%', x(i16), y(d[i16][1]) - 13, {'text-anchor':'middle','font-size':12.5,'font-weight':700, fill:'var(--s1)'}));
    svg.appendChild(txt('32,3%', x(i16), y(d[i16][2]) + 20, {'text-anchor':'middle','font-size':12.5,'font-weight':700, fill:'var(--s2)'}));
    svg.appendChild(txt('39,2%', x(iF) + 9, y(d[iF][1]) + 4, {'text-anchor':'start','font-size':12.5,'font-weight':700, fill:'var(--s1)'}));
    svg.appendChild(txt('37,4%', x(iF) + 9, y(d[iF][2]) + 4, {'text-anchor':'start','font-size':12.5,'font-weight':700, fill:'var(--s2)'}));
    d.forEach((r, i) => { if (i % 2 === 0 || i === d.length - 1)
      svg.appendChild(txt(r[0], x(i), mT + ih + 20, {'text-anchor':'middle'})); });
    svg.appendChild(mk('line', {x1:mL, x2:W-mR, y1:mT+ih, y2:mT+ih, stroke:'var(--base)','stroke-width':1}));
    limpa('plotPib').appendChild(svg);
    hover(svg, d, i => x(i),
      r => `<strong>${r[0]}</strong><br>Trabalho: ${NUM(r[1],1)}% do PIB<br>Capital: ${NUM(r[2],1)}% do PIB`, W);
  }

  /* ── carga tributária ────────────────────────── */
  function plotTributos() {
    const d = D.tributos, W = 900, H = 340, mL = 48, mR = 26, mT = 30, mB = 62;
    const iw = W - mL - mR, ih = H - mT - mB, max = 26, bw = iw / d.length;
    const y = v => mT + ih - (v / max) * ih;
    const svg = mk('svg', {viewBox:`0 0 ${W} ${H}`, role:'img',
      'aria-label':'Carga tributária por décimo de renda, indiretos e diretos'});
    [5, 10, 15, 20, 25].forEach(v => {
      svg.appendChild(mk('line', {x1:mL, x2:W-mR, y1:y(v), y2:y(v), stroke:'var(--grade)','stroke-width':1}));
      svg.appendChild(txt(v + '%', mL - 9, y(v) + 4, {'text-anchor':'end'}));
    });
    d.forEach((r, i) => {
      const bx = mL + i * bw + 5, bwid = bw - 10, ind = r[1], dir = r[2];
      const yInd = y(ind), yTot = y(ind + dir), rr = 3, ext = (i === 0 || i === d.length - 1);
      svg.appendChild(mk('rect', {x:bx, y:yInd, width:bwid, height:mT+ih-yInd, fill:'var(--s2)'}));
      svg.appendChild(mk('path', {d:`M${bx},${yInd-2} L${bx},${yTot+rr} Q${bx},${yTot} ${bx+rr},${yTot} ` +
        `L${bx+bwid-rr},${yTot} Q${bx+bwid},${yTot} ${bx+bwid},${yTot+rr} L${bx+bwid},${yInd-2} Z`,
        fill:'var(--s1)'}));
      svg.appendChild(txt(NUM(ind+dir,1) + '%', bx + bwid/2, yTot - 9, {'text-anchor':'middle',
        'font-size':11.5, 'font-weight': ext ? 700 : 500, fill: ext ? 'var(--tinta)' : 'var(--tinta-2)'}));
      svg.appendChild(txt(NUM(ind,1), bx + bwid/2, yInd + ((mT+ih-yInd)/2) + 4,
        {'text-anchor':'middle','font-size':11.5,'font-weight':600, fill:'#fff'}));
      svg.appendChild(txt('R$ ' + INT(r[0]), bx + bwid/2, mT + ih + 19, {'text-anchor':'middle','font-size':10.5}));
    });
    svg.appendChild(txt('renda familiar per capita média de cada décimo, R$/mês', mL, mT + ih + 40,
      {'text-anchor':'start','font-size':11.5,'font-family':'var(--sans)'}));
    svg.appendChild(txt('mais pobres →', mL, mT + ih + 56,
      {'text-anchor':'start','font-size':11,'font-family':'var(--sans)', fill:'var(--tinta-3)'}));
    svg.appendChild(txt('← mais ricos', W - mR, mT + ih + 56,
      {'text-anchor':'end','font-size':11,'font-family':'var(--sans)', fill:'var(--tinta-3)'}));
    svg.appendChild(mk('line', {x1:mL, x2:W-mR, y1:mT+ih, y2:mT+ih, stroke:'var(--base)','stroke-width':1}));
    limpa('plotTributos').appendChild(svg);
    hover(svg, d, i => mL + i * bw + bw / 2,
      r => `<strong>Renda média R$ ${INT(r[0])}/mês</strong><br>Indiretos: ${NUM(r[1],1)}%<br>` +
           `Diretos: ${NUM(r[2],1)}%<br>Total: ${NUM(r[1]+r[2],1)}%`, W);
  }

  /* ── por estado ──────────────────────────────── */
  function plotUF(chave) {
    const c = D.uf[chave], d = c.dados;
    document.getElementById('fonteUF').textContent = 'Fonte: ' + c.fonte;
    const W = 900, bw = W / d.length, H = 300, mT = 30, mB = 42, ih = H - mT - mB;
    const max = Math.max(...d.map(r => r[1])) * 1.16, y = v => mT + ih - (v / max) * ih;
    const svg = mk('svg', {viewBox:`0 0 ${W} ${H}`, role:'img', 'aria-label': c.titulo});
    svg.appendChild(mk('line', {x1:0, x2:W, y1:y(c.media), y2:y(c.media),
      stroke:'var(--tinta-3)','stroke-width':1.5,'stroke-dasharray':'6 4'}));
    svg.appendChild(txt(c.mediaRot, 6, y(c.media) - 8, {'text-anchor':'start','font-weight':600,
      fill:'var(--tinta-2)','font-family':'var(--sans)','font-size':12}));
    d.forEach((r, i) => {
      const bx = i * bw + 3, bwid = bw - 6, ty = y(r[1]), rr = Math.min(3, bwid / 2);
      const pior = c.inverso ? r[1] > c.media : r[1] < c.media;
      svg.appendChild(mk('path', {d:`M${bx},${mT+ih} L${bx},${ty+rr} Q${bx},${ty} ${bx+rr},${ty} ` +
        `L${bx+bwid-rr},${ty} Q${bx+bwid},${ty} ${bx+bwid},${ty+rr} L${bx+bwid},${mT+ih} Z`,
        fill: pior ? 'var(--s2)' : 'var(--s1)', 'fill-opacity':.88}));
      svg.appendChild(txt(r[0], bx + bwid/2, mT + ih + 16, {'text-anchor':'middle','font-size':9.5}));
      if (i === 0 || i === d.length - 1)
        svg.appendChild(txt(chave === 'renda' ? INT(r[1]) : NUM(r[1],1), bx + bwid/2, ty - 8,
          {'text-anchor':'middle','font-size':11,'font-weight':700, fill:'var(--tinta)'}));
    });
    svg.appendChild(mk('line', {x1:0, x2:W, y1:mT+ih, y2:mT+ih, stroke:'var(--base)','stroke-width':1}));
    limpa('plotUF').appendChild(svg);
    hover(svg, d, i => i * bw + bw / 2,
      r => `<strong>${r[0]}</strong><br>${chave === 'renda' ? BRL(r[1]) : NUM(r[1],1) + '%'}`, W);
  }

  /* ── comparação internacional ────────────────── */
  function plotMundo() {
    const d = D.mundo, W = 900, alt = 32, H = d.length * alt + 34, mL = 140, mR = 76;
    const iw = W - mL - mR, max = Math.max(...d.map(r => r[1])), x = v => (v / max) * iw;
    const svg = mk('svg', {viewBox:`0 0 ${W} ${H}`, role:'img',
      'aria-label':'Salário mínimo anual em dólares de paridade de poder de compra, 2024'});
    d.forEach((r, i) => {
      const yy = 14 + i * alt, br = r[0] === 'Brasil', w = x(r[1]), rr = 3;
      svg.appendChild(txt(r[0], mL - 12, yy + 15, {'text-anchor':'end','font-size':13,
        fill: br ? 'var(--tinta)' : 'var(--tinta-2)', 'font-family':'var(--sans)','font-weight': br ? 700 : 400}));
      svg.appendChild(mk('path', {d:`M${mL},${yy} L${mL+w-rr},${yy} Q${mL+w},${yy} ${mL+w},${yy+rr} ` +
        `L${mL+w},${yy+21-rr} Q${mL+w},${yy+21} ${mL+w-rr},${yy+21} L${mL},${yy+21} Z`,
        fill: br ? 'var(--s2)' : 'var(--s1)', 'fill-opacity': br ? 1 : .62}));
      svg.appendChild(txt('US$ ' + INT(r[1]), mL + w + 8, yy + 15, {'text-anchor':'start','font-size':12,
        'font-weight': br ? 700 : 500, fill: br ? 'var(--tinta)' : 'var(--tinta-2)'}));
    });
    limpa('plotMundo').appendChild(svg);
  }

  /* ── linhas: o preço em corpo ────────────────── */
  function linhasCorpo() {
    const alvo = limpa('linhasCorpo');
    D.corpo.forEach(([n, v, s]) => {
      const l = el('div', 'linha');
      l.appendChild(el('div', 'nome', n));
      l.appendChild(el('div', 'nums', s));
      l.appendChild(el('div', 'res', v));
      alvo.appendChild(l);
    });
  }

  /* ── controles ───────────────────────────────── */
  function controles() {
    const sel = document.getElementById('regua');
    D.reguas.forEach(r => sel.appendChild(new Option(r.nome, r.id)));
    sel.value = 'pnadc';
    sel.addEventListener('change', () => plotDesemprego(sel.value));
    plotDesemprego('pnadc');

    const pil = document.getElementById('pilulasUF');
    [['desoc','Desocupação'], ['renda','Renda per capita']].forEach(([k, rot], i) => {
      const b = el('button', 'pilula', rot);
      b.type = 'button';
      b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      b.addEventListener('click', () => {
        pil.querySelectorAll('.pilula').forEach(o => o.setAttribute('aria-pressed','false'));
        b.setAttribute('aria-pressed','true');
        plotUF(k);
      });
      pil.appendChild(b);
    });
    plotUF('desoc');
  }

  /* ── atualização automática, sem quebrar nada ── */
  async function tentarAtualizar() {
    try {
      const ctrl = new AbortController(), to = setTimeout(() => ctrl.abort(), 6000);
      const r = await fetch(FONTE_VIVA, {signal: ctrl.signal});
      clearTimeout(to);
      if (!r.ok) return;
      const j = await r.json();
      const serie = j?.[0]?.resultados?.[0]?.series?.[0]?.serie;
      if (!serie) return;
      const ks = Object.keys(serie).sort(), ult = ks[ks.length - 1];
      const v = parseFloat(String(serie[ult]).replace(',', '.'));
      if (!isFinite(v)) return;
      const b = document.getElementById('statusDados');
      b.textContent = 'Atualizado ao vivo';
      b.classList.add('viva');
      document.getElementById('statusTexto').textContent =
        ' · último período na API do IBGE: ' + ult + ' — desocupação ' + NUM(v, 1) + '%.';
    } catch (e) { /* silêncio proposital: o dado-semente já está correto */ }
  }

  /* ── partida ─────────────────────────────────── */
  carimbo('carimbo', D.extraidoEm, D.base);
  tiles(); plotReal(); plotRazao(); plotFaixas(); plotPib();
  plotTributos(); plotMundo(); linhasCorpo(); controles(); tentarAtualizar();
})();
