/* ============================================================
   enigma-perfumista.js — "Enigma: O Caderno do Perfumista"
   Química Orgânica II — Técnico, IFRO Ji-Paraná

   Seis páginas trancadas + o cofre final. Cada página é uma reação:
     1) Aromaticidade (Hückel)
     2) Adição de HBr (Markovnikov)
     3) Hidratação de alceno (Markovnikov)
     4) Eliminação (Zaitsev)
     5) Substituição nucleofílica SN2
     6) Esterificação de Fischer (acetato de benzila — aroma de jasmim)
     7) Cofre: soma das massas molares dos produtos 2–6 + elétrons π
   Em toda página o aluno precisa DESENHAR no caderno, indicando
   quantos H tem cada carbono, e responder uma contagem de H.

   Ao abrir o cofre, o site envia ao Apps Script
   (google-apps-script/caderno-perfumista/Code.gs) nome, turma,
   nº de erros por página e o tempo gasto. A POSIÇÃO de chegada
   é calculada no servidor.

   Nenhuma resposta fica em texto puro aqui — só o hash SHA-256
   de "<chave>:<resposta>". É uma barreira pedagógica, não uma
   segurança de verdade. O gabarito está em
   google-apps-script/caderno-perfumista/COMO_CONFIGURAR.md.
   ============================================================ */

const PERF_HASH = {
  p1c: "a25823e31047461f496c1c39e230f67932bb41a96b7caf3f340c0dbbd77c5c0f",
  p1n: "15e47c3723fc33a46b3ad6786be946ec791c751c93c50fd8153408dcee5a091d",
  p1h: "85a96396a44a95ac8aeacee8f783f33539227b466f2da6409ca7c0285879c6cb",
  p2x: "938a1d9b87e521ec50e2aac90967fb5a6935dd261d83d3112bae725a034c06a1",
  p2h: "127f02927eae52962f0c6f9ecaddec7706060597e36733e28b25658072b0e8af",
  p2m: "c255340c4f87f1d16f0ec2159b72cc00abe8eb28aad76b4c5fadf905ce44c5d4",
  p3x: "ed939a997aba07eb8d2aa2e684ae8f692eb33b9c27177df7a9f3c6589b93e873",
  p3h: "0bd135d67a912a3f94802809742b1423f97b11e682ab3968ad30563e33958128",
  p3m: "9607b7cd395623a1016df6777f0e531884c0e28945066803f21f14a331187f03",
  p4x: "f4be2e34caef89579b576a31fde538fe7f36b0e48686c87e9a9d7239b0eaf636",
  p4h: "5489f8e38df4dacd961457e166cf94a29829ab575809c493c6a66b96ac8318a6",
  p4m: "fe7334dee7a7ffef8815e1f9e1982b58bbf30672180150e85e1f1f5b0698994c",
  p5q: "c1d9ad75ec4cc1f3b9544c95741725396c8c87afa403148a8505adf98a3c5be2",
  p5x: "3acfe52cfa64ea261109a476c0be9690692f79af739361ea50ac4f293598c872",
  p5h: "1ddcf33f743aa630f0450164beb477847b9de2f20ab3ec2e377c414ff279907e",
  p5m: "cc2de73a4cb6cd74a908a4b2d027ca5919a9af54bd351ef05a70822b3ddb546f",
  p6x: "4415b057df0e34faf161c4d8209495ab767695df979e4782d74aa9bc73c03c74",
  p6h: "7037210dfe29c2ffd899606a959e6bef67a6f8e4eb600359a9ef1e8a8e75f33a",
  p6m: "cc5bdd56b55c7d9d5fc436aaa27dd37978414711b6d88c78a0eee3dc3684f5d6",
  cod: "d4dce9711fa8f7df1756457b4cd453e6c07d79b599b86d7a34b8e56fb426af70"
};

const PERF_CODE_LEN = 3;
const PERF_IMG = id => `estruturas/perfumista/${id}.svg`;
const PERF_MASSAS = "Massas atômicas: C = 12 · H = 1 · O = 16 · Cl = 35,5 · Br = 80 (g/mol)";

function perfMol(id, legenda){
  return `<figure class="perf-mol"><img src="${PERF_IMG(id)}" alt="${legenda || "estrutura"}">${legenda ? `<figcaption>${legenda}</figcaption>` : ""}</figure>`;
}
function perfScheme(reagentes, condicoes){
  const r = reagentes.map(x => typeof x === "string" ? `<span class="perf-plus-txt">${x}</span>` : perfMol(x[0], x[1]))
    .join(`<span class="perf-plus">+</span>`);
  return `<div class="perf-scheme">${r}
    <span class="perf-arrow"><small>${condicoes}</small><span>⟶</span></span>
    <span class="perf-q">?</span></div>`;
}
function perfDraw(texto){
  return { type: "draw", texto };
}

/* ---------------- AS PÁGINAS DO CADERNO ---------------- */
const PERF_PAGES = [
  {
    pill: "💠 1 · Aromaticidade",
    tag: "Página 1 · Aromaticidade",
    titulo: "💠 O selo dos anéis",
    intro: `<p class="enig-sub">Na primeira página, o perfumista desenhou seis anéis e escreveu: <em>“Só os
      aromáticos merecem perfumar.”</em> Um composto é aromático quando é <strong>cíclico, plano,
      totalmente conjugado</strong> e tem <strong>4n + 2 elétrons π</strong> (regra de Hückel: 2, 6, 10, 14…).</p>`,
    steps: [
      perfDraw("Desenhe no caderno as seis estruturas abaixo e escreva, ao lado de cada carbono, quantos hidrogênios ele tem (inclusive <strong>0</strong>, quando não tiver nenhum)."),
      {
        type: "checks", key: "p1c",
        prompt: "Marque TODOS os compostos aromáticos",
        items: [
          ["benzeno", "Benzeno"], ["ciclo-hexeno", "Ciclo-hexeno"], ["naftaleno", "Naftaleno"],
          ["ciclooctatetraeno", "Ciclo-octatetraeno"], ["tolueno", "Tolueno"], ["ciclo-hexano", "Ciclo-hexano"]
        ],
        dicasItem: {
          "ciclo-hexeno": "Ciclo-hexeno: tem só uma ligação dupla — o anel não é totalmente conjugado.",
          "ciclo-hexano": "Ciclo-hexano: não tem nenhuma ligação dupla, logo nenhum elétron π.",
          "ciclooctatetraeno": "Ciclo-octatetraeno: tem 8 elétrons π (4n, não 4n + 2) e não é plano."
        },
        geral: "Conte os elétrons π de cada anel (2 por ligação dupla) e confira se o anel inteiro é conjugado."
      },
      {
        type: "num", key: "p1n", unit: "elétrons π",
        prompt: "Quantos elétrons π tem o naftaleno?",
        dicas: { "6": "6 é o benzeno. O naftaleno tem dois anéis fundidos — conte todas as ligações duplas.",
                 "8": "Quase: conte de novo as ligações duplas do naftaleno (são 5)." },
        geral: "Cada ligação dupla C=C contribui com 2 elétrons π."
      },
      {
        type: "num", key: "p1h", unit: "carbonos",
        prompt: "No seu desenho do naftaleno: quantos carbonos NÃO têm nenhum hidrogênio?",
        sub: "O naftaleno é C₁₀H₈ — 10 carbonos, mas só 8 hidrogênios. Onde estão os carbonos “sem H”?",
        geral: "Olhe os carbonos compartilhados pelos dois anéis: eles já fazem 3 ligações com outros carbonos (mais a dupla)."
      }
    ]
  },
  {
    pill: "➕ 2 · Adição de HBr",
    tag: "Página 2 · Adição",
    titulo: "➕ A gota de bromo",
    intro: `<p class="enig-sub">Na segunda página, o perfumista adicionou HBr a um alceno. Em uma adição, a
      ligação π se rompe e cada carbono da dupla ganha um novo átomo. Pela <strong>regra de Markovnikov</strong>,
      o H entra no carbono da dupla que <strong>já tem mais hidrogênios</strong>.</p>`,
    scheme: perfScheme([["propeno", "propeno"], "HBr"], ""),
    steps: [
      perfDraw("Desenhe no caderno o propeno e o produto da reação, indicando quantos H tem cada carbono."),
      {
        type: "mc", key: "p2x", prompt: "Qual é o produto principal?",
        options: [["a", "1-bromopropano"], ["b", "propano"], ["c", "12-dibromopropano"], ["d", "2-bromopropano"]],
        porque: {
          a: "Esse seria o produto anti-Markovnikov: o Br entrou no carbono que tinha mais H.",
          b: "Esse seria o produto da adição de H₂ (hidrogenação), não de HBr.",
          c: "Esse seria o produto da adição de Br₂, não de HBr."
        }
      },
      {
        type: "num", key: "p2h", unit: "H",
        prompt: "No produto: quantos hidrogênios estão ligados ao carbono que carrega o Br?",
        geral: "Esse carbono faz 4 ligações: conte quantas vão para C e para Br — o que sobra é H."
      },
      {
        type: "num", key: "p2m", unit: "g/mol", masses: true,
        prompt: "Calcule a massa molar do produto",
        dicas: { "42": "Essa é a massa do propeno. Some o HBr que entrou na molécula.",
                 "81": "Essa é a massa do HBr. O produto é propeno + HBr." },
        geral: "Monte a fórmula molecular do produto (C, H e Br) e some as massas."
      }
    ]
  },
  {
    pill: "💧 3 · Hidratação",
    tag: "Página 3 · Adição de água",
    titulo: "💧 A água que vira álcool",
    intro: `<p class="enig-sub">Agora o alceno recebe <strong>água</strong>, com ácido como catalisador
      (hidratação). Também segue Markovnikov: o H vai para o carbono da dupla com mais H, e o
      <strong>OH</strong> vai para o outro.</p>`,
    scheme: perfScheme([["2-metilpropeno", "2-metilpropeno"], "H₂O"], "H⁺"),
    steps: [
      perfDraw("Desenhe no caderno o 2-metilpropeno e o álcool formado, indicando quantos H tem cada carbono."),
      {
        type: "mc", key: "p3x", prompt: "Qual álcool se forma (produto principal)?",
        options: [["a", "2-metilpropan-1-ol"], ["b", "2-metilpropan-2-ol"], ["c", "butan-2-ol"], ["d", "2-metilpropano"]],
        porque: {
          a: "Esse é o produto anti-Markovnikov: o OH foi para o carbono que tinha mais H.",
          c: "Confira a cadeia: o 2-metilpropeno é ramificado — a adição não muda o esqueleto de carbonos.",
          d: "Esse é um alcano (adição de H₂). Na hidratação, entra H e OH."
        }
      },
      {
        type: "num", key: "p3h", unit: "H",
        prompt: "No álcool formado: quantos hidrogênios estão ligados ao carbono que carrega o OH?",
        dicas: { "1": "Confira: esse carbono está ligado a 3 grupos CH₃ e ao OH. Sobra alguma ligação para H?" },
        geral: "Conte as ligações desse carbono: 4 no total."
      },
      {
        type: "num", key: "p3m", unit: "g/mol", masses: true,
        prompt: "Calcule a massa molar do álcool formado",
        dicas: { "56": "Essa é a massa do alceno. Some a água que entrou.",
                 "18": "Essa é a massa da água. O produto é alceno + água." },
        geral: "Monte a fórmula molecular (C, H e O) e some as massas."
      }
    ]
  },
  {
    pill: "➖ 4 · Eliminação",
    tag: "Página 4 · Eliminação",
    titulo: "➖ O caminho de volta",
    intro: `<p class="enig-sub">A eliminação é o caminho inverso da adição: uma base forte, com aquecimento,
      arranca um H e o haleto sai, formando uma <strong>ligação dupla</strong>. Pela <strong>regra de
      Zaitsev</strong>, o produto principal é o alceno <strong>mais substituído</strong> (a dupla
      com menos H).</p>`,
    scheme: perfScheme([["2-bromo-2-metilbutano", "2-bromo-2-metilbutano"]], "KOH / etanol, Δ"),
    steps: [
      perfDraw("Desenhe no caderno o haleto e o alceno principal, indicando quantos H tem cada carbono — inclusive os carbonos da dupla."),
      {
        type: "mc", key: "p4x", prompt: "Qual é o produto principal da eliminação?",
        options: [["a", "2-metilbut-1-eno"], ["b", "2-metilbutan-2-ol"], ["c", "2-metilbut-2-eno"], ["d", "3-metilbut-1-eno"]],
        porque: {
          a: "Esse alceno se forma, mas é o MENOS substituído (produto de Hofmann, minoritário).",
          b: "Esse é o produto de substituição (SN1), não de eliminação. Com KOH em etanol e calor, predomina a eliminação.",
          d: "A dupla não pode aparecer ali: o H eliminado precisa estar num carbono vizinho ao carbono do Br."
        }
      },
      {
        type: "num", key: "p4h", unit: "H",
        prompt: "No alceno principal: quantos hidrogênios há, ao todo, nos DOIS carbonos da ligação dupla?",
        geral: "Um dos carbonos da dupla está ligado a dois CH₃ — ele ainda tem H?"
      },
      {
        type: "num", key: "p4m", unit: "g/mol", masses: true,
        prompt: "Calcule a massa molar do alceno principal",
        dicas: { "151": "Essa é a massa do haleto (reagente). Na eliminação, sai HBr.",
                 "88": "Essa é a massa do álcool (produto de substituição)." },
        geral: "Monte a fórmula molecular (C e H) e some as massas."
      }
    ]
  },
  {
    pill: "🔄 5 · SN2",
    tag: "Página 5 · Substituição nucleofílica",
    titulo: "🔄 A troca pelas costas",
    intro: `<p class="enig-sub">Para o perfume, o perfumista precisava de um álcool aromático. Ele partiu do
      cloreto de benzila e usou o íon hidróxido como <strong>nucleófilo</strong>, numa substituição SN2.</p>`,
    scheme: perfScheme([["cloreto-de-benzila", "cloreto de benzila"], "NaOH (aq)"], ""),
    steps: [
      {
        type: "mc", key: "p5q", text: true, prompt: "Qual afirmação descreve o mecanismo SN2?",
        options: [
          ["a", "Ocorre em duas etapas: primeiro o Cl sai e forma um carbocátion, depois o OH⁻ entra."],
          ["b", "O OH⁻ arranca um H do carbono vizinho e forma uma ligação dupla."],
          ["c", "Ocorre em uma única etapa: o OH⁻ ataca o carbono pelo lado oposto ao Cl, enquanto o Cl⁻ sai."],
          ["d", "O OH⁻ substitui um dos hidrogênios do anel aromático."]
        ],
        porque: {
          a: "Isso descreve o SN1 (duas etapas, com carbocátion).",
          b: "Isso descreve uma eliminação (E2), como na página 4.",
          d: "No SN2 o grupo que sai é o haleto, não um H do anel."
        }
      },
      perfDraw("Desenhe no caderno o cloreto de benzila e o produto, indicando quantos H tem cada carbono (no anel também!)."),
      {
        type: "mc", key: "p5x", prompt: "Qual é o produto orgânico?",
        options: [["a", "alcool-benzilico"], ["b", "fenol"], ["c", "benzaldeido"], ["d", "tolueno"]],
        porque: {
          b: "Esse é o fenol: o OH está no anel. Mas o Cl do reagente estava no CH₂, fora do anel.",
          c: "Esse é um aldeído — exigiria oxidação. Na SN2 só o Cl é trocado por OH.",
          d: "Aqui o Cl foi trocado por H, não por OH."
        }
      },
      {
        type: "num", key: "p5h", unit: "carbonos",
        prompt: "No produto: quantos carbonos NÃO têm nenhum hidrogênio?",
        geral: "Olhe o carbono do anel que está ligado ao CH₂OH."
      },
      {
        type: "num", key: "p5m", unit: "g/mol", masses: true,
        prompt: "Calcule a massa molar do produto",
        dicas: { "127": "Essa é a massa do cloreto de benzila (reagente). O Cl saiu e entrou OH.",
                 "126": "Essa é a massa do cloreto de benzila (reagente). O Cl saiu e entrou OH.",
                 "94": "Essa é a massa do fenol — confira a estrutura do produto." },
        geral: "Monte a fórmula molecular (C, H e O) e some as massas."
      }
    ]
  },
  {
    pill: "🌼 6 · Esterificação",
    tag: "Página 6 · Esterificação",
    titulo: "🌼 A essência de jasmim",
    intro: `<p class="enig-sub">Última página. O álcool da página 5 reage com ácido acético, com ácido
      sulfúrico como catalisador (esterificação de Fischer): <strong>ácido + álcool ⇌ éster + água</strong>.
      O éster formado é o principal responsável pelo perfume do <em>jasmim</em>.</p>`,
    scheme: perfScheme([["alcool-benzilico", "álcool benzílico"], ["acido-acetico", "ácido acético"]], "H₂SO₄"),
    steps: [
      perfDraw("Desenhe no caderno a equação completa (reagentes, éster e água), indicando quantos H tem cada carbono."),
      {
        type: "mc", key: "p6x", prompt: "Qual é o éster formado?",
        options: [["a", "fenilacetato-de-metila"], ["b", "benzoato-de-metila"], ["c", "acetato-de-benzila"], ["d", "acetato-de-fenila"]],
        porque: {
          a: "Mesma fórmula (C₉H₁₀O₂), mas a C=O está do lado errado: aqui o ácido teria o anel e o álcool seria o metanol.",
          b: "Aqui o ácido seria o ácido benzoico e o álcool o metanol.",
          d: "Aqui o O está ligado direto ao anel: o álcool teria sido o fenol, não o álcool benzílico."
        }
      },
      {
        type: "num", key: "p6h", unit: "carbonos",
        prompt: "No éster: quantos carbonos NÃO têm nenhum hidrogênio?",
        geral: "Confira o carbono da C=O e o carbono do anel que está ligado ao CH₂. Quantas ligações cada um já faz?"
      },
      {
        type: "num", key: "p6m", unit: "g/mol", masses: true,
        prompt: "Calcule a massa molar do éster",
        dicas: { "168": "Você somou álcool + ácido. Lembre que na esterificação sai uma molécula de H₂O!",
                 "108": "Essa é a massa do álcool. Queremos o éster.",
                 "60": "Essa é a massa do ácido acético. Queremos o éster." },
        geral: "Monte a fórmula molecular do éster (C, H e O) e some as massas."
      }
    ]
  }
];

const PERF_CODIGO_DICAS = {
  "525": "Quase! Faltou somar os elétrons π do naftaleno (página 1).",
  "531": "Quase! Você usou os elétrons π do benzeno. A fórmula pede os do naftaleno."
};

/* ---------------- ESTADO ---------------- */
let perfState = {
  name: "", turma: "",
  pagina: 1,
  erros: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
  inicio: null
};

function initPerfumista(){ renderPerfGate(); }

async function perfSha(message){
  const enc = new TextEncoder().encode(message);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function perfShake(el){
  el.classList.remove("enig-shake");
  void el.offsetWidth;
  el.classList.add("enig-shake");
}

const PERF_ALERTA = `
  <div class="enig-ava">
    <strong class="ava-title">⚠️ ATENÇÃO: PARA SER COMPUTADO</strong>
    <p>Todas as estruturas precisarão ser desenhadas no caderno, <strong>MOSTRANDO A CONTAGEM DE
      HIDROGÊNIOS</strong> de cada carbono — inclusive os carbonos que não têm nenhum H (escreva “0”).</p>
  </div>`;

/* ---------------- TELA 1: NOME + TURMA ---------------- */
function renderPerfGate(){
  const body = document.getElementById("enig-body");
  body.innerHTML = `
    <div class="enig-card enig-gate">
      <h3>Antes de começar</h3>
      <p class="enig-sub">Digite seu nome e turma. Eles serão registrados junto com a sua ordem de chegada
        quando você abrir o cofre.</p>
      <div class="field">
        <label for="enig-input-name">Nome completo</label>
        <input type="text" id="enig-input-name" placeholder="Seu nome" autocomplete="name">
      </div>
      <div class="field">
        <label for="enig-input-turma">Turma</label>
        <input type="text" id="enig-input-turma" placeholder="Ex.: 3º Técnico em Química" autocomplete="off">
      </div>
      <div style="margin:4px 0 18px;">${PERF_ALERTA}</div>
      <p class="hint-small" id="enig-gate-error" style="color: var(--danger); display:none;">Preencha os dois campos para continuar.</p>
      <button class="btn btn-primary" id="enig-btn-start" style="width:100%; justify-content:center;">Abrir o caderno →</button>
    </div>
  `;
  const start = () => {
    const name = document.getElementById("enig-input-name").value.trim();
    const turma = document.getElementById("enig-input-turma").value.trim();
    if (!name || !turma){
      document.getElementById("enig-gate-error").style.display = "block";
      return;
    }
    perfState.name = name;
    perfState.turma = turma;
    perfState.inicio = Date.now();
    renderPerfPuzzle();
  };
  document.getElementById("enig-btn-start").addEventListener("click", start);
  document.getElementById("enig-input-turma").addEventListener("keydown", ev => {
    if (ev.key === "Enter") start();
  });
}

/* ---------------- RENDERIZAÇÃO DOS PASSOS ---------------- */
function perfStepHTML(p, s, i){
  const id = `perf-s${p}-${i}`;
  const hidden = i === 0 ? "" : " hidden";
  if (s.type === "draw"){
    return `<div class="perf-step perf-draw${hidden}" id="${id}">
      <label class="perf-draw-box">
        <input type="checkbox" data-step="${id}">
        <span><strong>✍️ No caderno:</strong> ${s.texto}<br><small>Marque quando terminar o desenho.</small></span>
      </label>
    </div>`;
  }
  let inner = "";
  if (s.type === "checks"){
    inner = `<div class="perf-checks">${s.items.map(([v, label]) => `
      <label class="perf-check" data-v="${v}">
        <input type="checkbox" value="${v}">
        ${perfMol(v, label)}
      </label>`).join("")}</div>
      <button class="btn btn-primary perf-btn">Verificar</button>`;
  } else if (s.type === "mc"){
    inner = `<div class="${s.text ? "enig-options" : "perf-opts"}">${s.options.map(([v, c]) => s.text
      ? `<button class="enig-opt" data-v="${v}"><b>${v})</b> ${c}</button>`
      : `<button class="enig-opt perf-opt" data-v="${v}"><b>${v})</b>${perfMol(c)}</button>`).join("")}</div>`;
  } else if (s.type === "num"){
    inner = `${s.masses ? `<p class="enig-masses">${PERF_MASSAS}</p>` : ""}
      <div class="enig-row">
        <input type="text" inputmode="decimal" class="enig-input" placeholder="0">
        <span class="enig-unit">${s.unit}</span>
        <button class="btn btn-primary perf-btn">Verificar</button>
      </div>`;
  }
  return `<div class="perf-step${hidden}" id="${id}">
    <h4>${s.prompt}</h4>
    ${s.sub ? `<p class="enig-sub">${s.sub}</p>` : ""}
    ${inner}
    <div class="enig-msg"></div>
  </div>`;
}

function renderPerfPuzzle(){
  const body = document.getElementById("enig-body");
  const pages = PERF_PAGES.map((pg, idx) => {
    const n = idx + 1;
    return `
    <div class="enig-card enig-stage${n === 1 ? "" : " locked"}" id="enig-stage-${n}">
      <span class="enig-stage-tag">${n === 1 ? "" : "🔒 "}${pg.tag}</span>
      <div class="enig-stage-body">
        <h3>${pg.titulo}</h3>
        ${pg.intro}
        ${pg.scheme || ""}
        ${pg.steps.map((s, i) => perfStepHTML(n, s, i)).join("")}
      </div>
    </div>`;
  }).join("");

  body.innerHTML = `
    <div class="enig-card">
      <h3>📔 O caderno trancado</h3>
      <div class="enig-story">
        Num sótão em Grasse, a cidade dos perfumes, foi encontrado o caderno de um velho perfumista.
        Na capa, a inscrição: <em>“Só quem dominar as seis reações abrirá o cofre onde guardei a minha
        essência de jasmim.”</em>
      </div>
      <div class="enig-story">
        Cada página está selada e só se abre quando a anterior é resolvida. Em todas elas, o perfumista
        exige o mesmo ritual: <em>desenhar cada molécula à mão, contando os hidrogênios de cada carbono</em>
        — porque um perfumista que não sabe onde estão os seus H não sabe o que está cheirando.
      </div>
      ${PERF_ALERTA}
    </div>

    <div class="enig-progress" id="enig-progress">
      ${PERF_PAGES.map((pg, i) => `<span class="enig-pill" data-p="${i + 1}">${pg.pill}</span>`).join("")}
      <span class="enig-pill" data-p="7">🔐 7 · O cofre</span>
    </div>

    ${pages}

    <div class="enig-card enig-stage locked" id="enig-stage-7">
      <span class="enig-stage-tag">🔒 Página 7 · O cofre</span>
      <div class="enig-stage-body">
        <h3>🔐 Abra o cofre do perfumista</h3>
        <p class="enig-sub">Na contracapa, a última instrução do perfumista. Use os valores que você anotou no caderno.</p>
        <div class="enig-formula">CÓDIGO = M(pág. 2) + M(pág. 3) + M(pág. 4) + M(pág. 5) + M(pág. 6) + elétrons π do naftaleno</div>
        <p class="enig-masses" style="text-align:center;">M = massa molar do produto de cada página (g/mol)</p>
        <div class="enig-safe" id="enig-safe">
          <div class="enig-lock-icon">🔒</div>
          <div class="enig-digits">
            ${Array.from({length: PERF_CODE_LEN}, (_, i) =>
              `<input type="tel" inputmode="numeric" maxlength="1" class="enig-digit" data-i="${i}" aria-label="Algarismo ${i + 1}">`).join("")}
          </div>
          <button class="btn btn-primary" id="enig-btn-unlock">Abrir o cofre 🔓</button>
          <div class="enig-msg" id="enig-msg-cod"></div>
        </div>
      </div>
    </div>

    <div id="enig-result"></div>
  `;

  PERF_PAGES.forEach((pg, idx) => {
    const n = idx + 1;
    pg.steps.forEach((s, i) => perfWireStep(n, s, i));
  });
  perfSetupDigits();
  document.getElementById("enig-btn-unlock").addEventListener("click", perfCheckCodigo);
  perfUpdateProgress();
}

function perfWireStep(n, s, i){
  const el = document.getElementById(`perf-s${n}-${i}`);
  if (s.type === "draw"){
    const cb = el.querySelector("input");
    cb.addEventListener("change", () => {
      if (cb.checked){
        cb.disabled = true;
        el.classList.add("done");
        perfStepSolved(n, i);
      }
    });
  } else if (s.type === "checks"){
    el.querySelectorAll(".perf-check input").forEach(cb => {
      cb.addEventListener("change", () => cb.closest(".perf-check").classList.toggle("sel", cb.checked));
    });
    el.querySelector(".perf-btn").addEventListener("click", () => perfCheckChecks(n, s, i, el));
  } else if (s.type === "mc"){
    el.querySelectorAll(".enig-opt").forEach(btn => {
      btn.addEventListener("click", () => perfCheckMC(n, s, i, el, btn));
    });
  } else if (s.type === "num"){
    const go = () => perfCheckNum(n, s, i, el);
    el.querySelector(".perf-btn").addEventListener("click", go);
    el.querySelector(".enig-input").addEventListener("keydown", ev => { if (ev.key === "Enter") go(); });
  }
}

function perfMsg(el, texto, tipo){
  const m = el.querySelector(".enig-msg");
  m.textContent = texto;
  m.className = "enig-msg " + tipo;
}

/* passo resolvido → mostra o próximo, ou abre a próxima página */
function perfStepSolved(n, i){
  const steps = PERF_PAGES[n - 1].steps;
  if (i + 1 < steps.length){
    const next = document.getElementById(`perf-s${n}-${i + 1}`);
    setTimeout(() => {
      next.classList.remove("hidden");
      const inp = next.querySelector(".enig-input");
      if (inp) inp.focus({ preventScroll: true });
      next.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 450);
  } else {
    setTimeout(() => perfUnlockStage(n + 1), 700);
  }
}

function perfUpdateProgress(){
  document.querySelectorAll(".enig-pill").forEach(p => {
    const k = Number(p.dataset.p);
    p.classList.toggle("done", k < perfState.pagina);
    p.classList.toggle("on", k === perfState.pagina);
  });
}

function perfMarkSolved(n){
  const st = document.getElementById(`enig-stage-${n}`);
  st.classList.add("solved");
  const tag = st.querySelector(".enig-stage-tag");
  tag.textContent = "✅ " + tag.textContent.replace(/^(🔒|🔓)\s*/u, "");
}

function perfUnlockStage(n){
  perfMarkSolved(n - 1);
  perfState.pagina = n;
  const st = document.getElementById(`enig-stage-${n}`);
  st.classList.remove("locked");
  const tag = st.querySelector(".enig-stage-tag");
  tag.textContent = tag.textContent.replace("🔒 ", "🔓 ");
  perfUpdateProgress();
  setTimeout(() => {
    st.scrollIntoView({ behavior: "smooth", block: "start" });
    const first = st.querySelector(".enig-digit");
    if (first) first.focus({ preventScroll: true });
  }, 250);
}

/* ---------------- VERIFICAÇÕES ---------------- */
async function perfCheckChecks(n, s, i, el){
  const sel = Array.from(el.querySelectorAll(".perf-check input:checked")).map(c => c.value).sort();
  if (!sel.length){ perfMsg(el, "Marque pelo menos um composto.", "warn"); return; }
  const hash = await perfSha(`${s.key}:${sel.join(",")}`);
  if (hash === PERF_HASH[s.key]){
    el.querySelector(".perf-checks").classList.add("done");
    el.querySelectorAll("input").forEach(c => c.disabled = true);
    el.querySelector(".perf-btn").disabled = true;
    perfMsg(el, "✔ Isso! Esses três são aromáticos.", "ok");
    perfStepSolved(n, i);
  } else {
    perfState.erros[n]++;
    perfShake(el.querySelector(".perf-checks"));
    const errados = sel.filter(v => s.dicasItem[v]);
    if (perfState.erros[n] >= 2 && errados.length){
      perfMsg(el, s.dicasItem[errados[0]], "err");
    } else {
      perfMsg(el, perfState.erros[n] >= 2
        ? "Ainda falta algum composto aromático. " + s.geral
        : "Ainda não. " + s.geral, "err");
    }
  }
}

async function perfCheckMC(n, s, i, el, btn){
  const v = btn.dataset.v;
  const hash = await perfSha(`${s.key}:${v}`);
  if (hash === PERF_HASH[s.key]){
    btn.classList.add("right");
    el.querySelectorAll(".enig-opt").forEach(b => b.disabled = true);
    perfMsg(el, "✔ Correto!", "ok");
    perfStepSolved(n, i);
  } else {
    perfState.erros[n]++;
    btn.classList.add("wrong");
    btn.disabled = true;
    perfShake(btn.parentElement);
    perfMsg(el, (s.porque && s.porque[v]) || "Não é essa. Releia a introdução da página.", "err");
  }
}

async function perfCheckNum(n, s, i, el){
  const input = el.querySelector(".enig-input");
  const raw = input.value.trim().replace(",", ".");
  const val = Number(raw);
  if (!raw || !isFinite(val)){
    perfMsg(el, "Digite um número (pode usar vírgula).", "warn");
    return;
  }
  // massas: aceita 123 ou 122,99 (arredonda); contagens: inteiro
  const chave = String(Math.round(val));
  const hash = await perfSha(`${s.key}:${chave}`);
  if (hash === PERF_HASH[s.key]){
    input.disabled = true;
    input.classList.add("ok");
    el.querySelector(".perf-btn").disabled = true;
    perfMsg(el, s.masses ? "✔ Massa correta! Anote esse valor no caderno — você vai precisar dele no cofre." : "✔ Correto!", "ok");
    perfStepSolved(n, i);
  } else {
    perfState.erros[n]++;
    perfShake(input);
    const dica = s.dicas && s.dicas[chave];
    perfMsg(el, dica || (perfState.erros[n] >= 2 && s.geral ? "Ainda não. " + s.geral : "Valor incorreto. Confira no seu desenho."), "err");
  }
}

/* ---------------- O COFRE ---------------- */
function perfSetupDigits(){
  const inputs = Array.from(document.querySelectorAll(".enig-digit"));
  inputs.forEach((inp, i) => {
    inp.addEventListener("input", () => {
      inp.value = inp.value.replace(/[^0-9]/g, "").slice(0, 1);
      if (inp.value && i < inputs.length - 1) inputs[i + 1].focus();
    });
    inp.addEventListener("keydown", (ev) => {
      if (ev.key === "Backspace" && !inp.value && i > 0) inputs[i - 1].focus();
      if (ev.key === "Enter") perfCheckCodigo();
    });
  });
}

async function perfCheckCodigo(){
  const inputs = Array.from(document.querySelectorAll(".enig-digit"));
  const code = inputs.map(i => i.value).join("");
  const msg = document.getElementById("enig-msg-cod");
  const safe = document.getElementById("enig-safe");

  if (code.length < PERF_CODE_LEN){
    msg.textContent = `Digite os ${PERF_CODE_LEN} algarismos do código.`;
    msg.className = "enig-msg warn";
    return;
  }

  const hash = await perfSha(`cod:${code}`);
  if (hash === PERF_HASH.cod){
    safe.classList.add("unlocked");
    safe.querySelector(".enig-lock-icon").textContent = "🔓";
    msg.textContent = "🔓 O cofre se abriu! A essência de jasmim é sua.";
    msg.className = "enig-msg ok";
    inputs.forEach(i => i.disabled = true);
    document.getElementById("enig-btn-unlock").disabled = true;
    perfMarkSolved(7);
    perfState.pagina = 8;
    perfUpdateProgress();
    setTimeout(renderPerfFinal, 900);
  } else {
    perfState.erros[7]++;
    perfShake(safe.querySelector(".enig-digits"));
    msg.textContent = PERF_CODIGO_DICAS[code] || "Código incorreto. Confira as cinco massas molares e os elétrons π que você anotou.";
    msg.className = "enig-msg err";
    inputs.forEach(i => { i.value = ""; });
    inputs[0].focus();
  }
}

/* ---------------- TELA FINAL + REGISTRO ---------------- */
function renderPerfFinal(){
  const minutos = ((Date.now() - perfState.inicio) / 60000).toFixed(1).replace(".", ",");
  const e = perfState.erros;
  const totalErros = Object.values(e).reduce((a, b) => a + b, 0);
  const box = document.getElementById("enig-result");
  box.innerHTML = `
    <div class="enig-card">
      <div class="enig-final">
        <span class="big">🌼📔</span>
        <strong>Você é um(a) perfumista, ${perfState.name.split(" ")[0]}!</strong><br>
        <span class="enig-sub">Tempo: ${minutos} min · erros no caminho: ${totalErros}</span>
        <span class="enig-registered" id="enig-reg-status">📝 Registrando na planilha…</span>
      </div>
      ${PERF_ALERTA}
    </div>`;
  box.scrollIntoView({ behavior: "smooth", block: "start" });

  const statusEl = document.getElementById("enig-reg-status");
  if (typeof PERFUMISTA_WEBAPP_URL === "undefined" || !PERFUMISTA_WEBAPP_URL){
    statusEl.textContent = "Registro em planilha não configurado — mostre esta tela ao professor.";
    return;
  }

  fetch(PERFUMISTA_WEBAPP_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      tipo: "caderno_perfumista",
      nome: perfState.name,
      turma: perfState.turma,
      dataHora: new Date().toLocaleString("pt-BR"),
      errosP1: e[1], errosP2: e[2], errosP3: e[3],
      errosP4: e[4], errosP5: e[5], errosP6: e[6],
      errosCodigo: e[7],
      tempoMin: minutos
    })
  })
    .then(r => r.json())
    .then(data => {
      if (data && data.status === "ok" && data.posicao){
        statusEl.innerHTML = data.repetido
          ? `Você já tinha aberto o cofre antes — sua posição continua sendo <strong>${data.posicao}º</strong>.`
          : `✅ Registrado! Você foi o <strong>${data.posicao}º</strong> a abrir o cofre.`;
      } else {
        statusEl.textContent = "✅ Registrado com seu nome e turma.";
      }
    })
    .catch(() => {
      statusEl.textContent = "Não foi possível confirmar o registro (conexão instável) — mostre esta tela ao professor.";
    });
}

document.addEventListener("DOMContentLoaded", initPerfumista);
