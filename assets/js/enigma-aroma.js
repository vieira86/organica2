/* ============================================================
   enigma-aroma.js — "Enigma: O Aroma dos Deuses"
   Química Orgânica II — Técnico, IFRO Ji-Paraná

   Fluxo (cada etapa só abre depois que a anterior é resolvida):
     0) Gate (nome + turma)
     1) Quais duas moléculas formam o éster (múltipla escolha)
     2) Massa molar da "Essência dos Deuses" (o ácido carboxílico)
     3) Massa molar do "Espírito da Rosa" (o álcool)
     4) Código final de 3 algarismos = soma das duas massas
   Ao abrir o frasco, o site envia ao Apps Script (Code.gs)
   nome, turma, nº de erros em cada etapa e o tempo gasto. Quem
   calcula a POSIÇÃO de chegada (1º, 2º, 3º...) é o servidor.

   Nenhuma resposta fica em texto puro aqui — só o hash SHA-256.
   É uma barreira pedagógica (dá para quebrar por força bruta),
   não uma segurança de verdade.
   O gabarito fica em google-apps-script/aroma-deuses/COMO_CONFIGURAR.md
   (fora da pasta site), para não aparecer no "Ver código-fonte".
   ============================================================ */

const AROMA_HASH_ETAPA1 = "2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6";
const AROMA_HASH_ETAPA2 = "9ae2bdd7beedc2e766c6b76585530e16925115707dc7a06ab5ee4aa2776b2c7b";
const AROMA_HASH_ETAPA3 = "1be00341082e25c4e251ca6713e767f7131a2823b0052caf9c9b006ec512f6cb";
const AROMA_HASH_CODIGO = "1c6c0bb2c7ecdc3be8e134f79b9de45155258c1f554ae7542dce48f5cc8d63f0";

// hashes de erros "clássicos" → dica específica em vez de só "errado"
const H_136 = "36ebe205bcdfc499a25e6923f4450fa8d48196ceb4fa0ce077d9d8ec4a36926d";
const H_254 = "9512d95d00d61bdec03d2b99d6ecc455ee5644ae52d10e7c4a61c93062dc97a3";

const AROMA_DICAS = {
  2: {
    [H_136]: "Quase! Confira a cadeia: quantos CH₂ existem entre o anel e o grupo C=O?",
    [H_254]: "Essa é a massa do próprio aroma (o éster). Aqui queremos só o ácido carboxílico.",
    [AROMA_HASH_ETAPA3]: "Essa é a massa do álcool! Nesta etapa, calcule a do ácido carboxílico."
  },
  3: {
    [H_136]: "Quase! Confira a cadeia do álcool: quantos CH₂ existem entre o anel e o O?",
    [H_254]: "Essa é a massa do próprio aroma (o éster). Aqui queremos só o álcool.",
    [AROMA_HASH_ETAPA2]: "Essa é a massa do ácido, que você já encontrou. Agora calcule a do álcool."
  },
  4: {
    [H_254]: "Esse é o próprio aroma: na esterificação sai uma molécula de H₂O. O código é a soma das duas moléculas ANTES de reagirem.",
    [AROMA_HASH_ETAPA2]: "Esse número é só uma das massas. O código é a SOMA das duas.",
    [AROMA_HASH_ETAPA3]: "Esse número é só uma das massas. O código é a SOMA das duas."
  }
};

const AROMA_CODE_LEN = 3;

let aromaState = {
  name: "", turma: "",
  etapa: 1,
  erros: { 1: 0, 2: 0, 3: 0, 4: 0 },
  inicio: null
};

function initAroma(){ renderAromaGate(); }

async function aromaSha256Hex(message){
  const enc = new TextEncoder().encode(message);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function aromaShake(el){
  el.classList.remove("enig-shake");
  void el.offsetWidth;
  el.classList.add("enig-shake");
}

/* ---------- TELA 1: NOME + TURMA ---------- */
function renderAromaGate(){
  const body = document.getElementById("enig-body");
  body.innerHTML = `
    <div class="enig-card enig-gate">
      <h3>Antes de começar</h3>
      <p class="enig-sub">Digite seu nome e turma. Eles serão registrados junto com a sua ordem de chegada
        quando você abrir o frasco.</p>
      <div class="field">
        <label for="enig-input-name">Nome completo</label>
        <input type="text" id="enig-input-name" placeholder="Seu nome" autocomplete="name">
      </div>
      <div class="field">
        <label for="enig-input-turma">Turma</label>
        <input type="text" id="enig-input-turma" placeholder="Ex.: 3º Técnico em Química" autocomplete="off">
      </div>
      <p class="hint-small" id="enig-gate-error" style="color: var(--danger); display:none;">Preencha os dois campos para continuar.</p>
      <button class="btn btn-primary" id="enig-btn-start" style="width:100%; justify-content:center;">Aceitar a missão →</button>
    </div>
  `;
  const start = () => {
    const name = document.getElementById("enig-input-name").value.trim();
    const turma = document.getElementById("enig-input-turma").value.trim();
    if (!name || !turma){
      document.getElementById("enig-gate-error").style.display = "block";
      return;
    }
    aromaState.name = name;
    aromaState.turma = turma;
    aromaState.inicio = Date.now();
    renderAromaPuzzle();
  };
  document.getElementById("enig-btn-start").addEventListener("click", start);
  document.getElementById("enig-input-turma").addEventListener("keydown", ev => {
    if (ev.key === "Enter") start();
  });
}

/* ---------- TELA 2: O ENIGMA ---------- */
function renderAromaPuzzle(){
  const body = document.getElementById("enig-body");
  body.innerHTML = `
    <div class="enig-card">
      <h3>🏺 A lenda do frasco de ouro</h3>
      <div class="enig-story">
        Conta-se que, no alto do Olimpo, os deuses perfumavam seus banquetes com uma fragrância doce e
        floral que nenhum mortal jamais conseguiu reproduzir: o <em>Aroma dos Deuses</em>. A receita
        foi guardada por Hefesto num frasco de ouro, trancado com um cadeado de três algarismos.
      </div>
      <div class="enig-story">
        Nas paredes da oficina, ele deixou gravado: <em>“O aroma nasce da união de duas moléculas — a
        Essência dos Deuses, um ácido, e o Espírito da Rosa, um álcool. Quem somar o peso das duas
        abrirá o frasco.”</em> Abaixo está a estrutura do aroma.
      </div>
      <div class="enig-mol-frame">
        <img src="aroma_deuses.png" alt="Estrutura do Aroma dos Deuses: um éster com um anel benzênico em cada extremidade">
      </div>
    </div>

    <div class="enig-progress" id="enig-progress">
      <span class="enig-pill" data-p="1">⚗️ 1 · A receita</span>
      <span class="enig-pill" data-p="2">✨ 2 · Essência</span>
      <span class="enig-pill" data-p="3">🌹 3 · Espírito da Rosa</span>
      <span class="enig-pill" data-p="4">🏺 4 · O frasco</span>
    </div>

    <!-- ETAPA 1 -->
    <div class="enig-card enig-stage" id="enig-stage-1">
      <span class="enig-stage-tag">Etapa 1 · Desmonte o aroma</span>
      <div class="enig-stage-body">
        <h3>⚗️ Quais duas moléculas foram combinadas?</h3>
        <p class="enig-sub">O Aroma dos Deuses é um <strong>éster</strong>, formado por esterificação:
          ácido carboxílico + álcool → éster + água. Olhe para a ligação C(=O)–O e descubra de onde
          veio cada metade.</p>
        <div class="enig-options" id="enig-options">
          <button class="enig-opt" data-v="a"><b>a)</b> C₆H₅–CH₂–COOH &nbsp;+&nbsp; C₆H₅–CH₂CH₂CH₂–OH</button>
          <button class="enig-opt" data-v="b"><b>b)</b> C₆H₅–COOH &nbsp;+&nbsp; C₆H₅–CH₂CH₂CH₂CH₂–OH</button>
          <button class="enig-opt" data-v="c"><b>c)</b> C₆H₅–CH₂CH₂–COOH &nbsp;+&nbsp; C₆H₅–CH₂CH₂–OH</button>
          <button class="enig-opt" data-v="d"><b>d)</b> C₆H₅–CH₂CH₂–CHO &nbsp;+&nbsp; C₆H₅–CH₂CH₂–OH</button>
          <button class="enig-opt" data-v="e"><b>e)</b> C₆H₅–CH₂CH₂–COOH &nbsp;+&nbsp; C₆H₅–OH</button>
        </div>
        <div class="enig-msg" id="enig-msg-1"></div>
      </div>
    </div>

    <!-- ETAPA 2 -->
    <div class="enig-card enig-stage locked" id="enig-stage-2">
      <span class="enig-stage-tag">🔒 Etapa 2 · A Essência dos Deuses</span>
      <div class="enig-stage-body">
        <h3>✨ Calcule a massa molar do ácido carboxílico</h3>
        <p class="enig-sub">Monte a fórmula molecular da Essência dos Deuses (conte C, H e O) e some as massas.</p>
        <p class="enig-masses">Massas atômicas: C = 12 · H = 1 · O = 16 (g/mol)</p>
        <div class="enig-row">
          <input type="text" inputmode="decimal" class="enig-input" id="enig-input-2" placeholder="000">
          <span class="enig-unit">g/mol</span>
          <button class="btn btn-primary" id="enig-btn-2">Verificar</button>
        </div>
        <div class="enig-msg" id="enig-msg-2"></div>
      </div>
    </div>

    <!-- ETAPA 3 -->
    <div class="enig-card enig-stage locked" id="enig-stage-3">
      <span class="enig-stage-tag">🔒 Etapa 3 · O Espírito da Rosa</span>
      <div class="enig-stage-body">
        <h3>🌹 Calcule a massa molar do álcool</h3>
        <p class="enig-sub">Esse álcool é o principal responsável pelo cheiro das rosas. Monte sua fórmula
          molecular e some as massas.</p>
        <p class="enig-masses">Massas atômicas: C = 12 · H = 1 · O = 16 (g/mol)</p>
        <div class="enig-row">
          <input type="text" inputmode="decimal" class="enig-input" id="enig-input-3" placeholder="000">
          <span class="enig-unit">g/mol</span>
          <button class="btn btn-primary" id="enig-btn-3">Verificar</button>
        </div>
        <div class="enig-msg" id="enig-msg-3"></div>
      </div>
    </div>

    <!-- ETAPA 4 -->
    <div class="enig-card enig-stage locked" id="enig-stage-4">
      <span class="enig-stage-tag">🔒 Etapa 4 · O frasco de ouro</span>
      <div class="enig-stage-body">
        <h3>🏺 Destrave o Aroma dos Deuses</h3>
        <p class="enig-sub">Lembre-se da inscrição de Hefesto: quem somar o peso das duas moléculas abrirá o frasco.</p>
        <div class="enig-formula">CÓDIGO = massa da Essência dos Deuses + massa do Espírito da Rosa</div>
        <div class="enig-safe" id="enig-safe">
          <div class="enig-lock-icon">🔒</div>
          <div class="enig-digits">
            ${Array.from({length: AROMA_CODE_LEN}, (_, i) =>
              `<input type="tel" inputmode="numeric" maxlength="1" class="enig-digit" data-i="${i}" aria-label="Algarismo ${i + 1}">`).join("")}
          </div>
          <button class="btn btn-primary" id="enig-btn-unlock">Abrir o frasco 🔓</button>
          <div class="enig-msg" id="enig-msg-4"></div>
        </div>
      </div>
    </div>

    <div id="enig-result"></div>
  `;

  // Etapa 1
  document.querySelectorAll(".enig-opt").forEach(btn => {
    btn.addEventListener("click", () => aromaCheckEtapa1(btn));
  });
  // Etapas 2 e 3
  [2, 3].forEach(n => {
    document.getElementById(`enig-btn-${n}`).addEventListener("click", () => aromaCheckMassa(n));
    document.getElementById(`enig-input-${n}`).addEventListener("keydown", ev => {
      if (ev.key === "Enter") aromaCheckMassa(n);
    });
  });
  // Etapa 4
  aromaSetupDigits();
  document.getElementById("enig-btn-unlock").addEventListener("click", aromaCheckCodigo);

  aromaUpdateProgress();
}

function aromaUpdateProgress(){
  document.querySelectorAll(".enig-pill").forEach(p => {
    const n = Number(p.dataset.p);
    p.classList.toggle("done", n < aromaState.etapa);
    p.classList.toggle("on", n === aromaState.etapa);
  });
}

function aromaMarkSolved(n){
  const st = document.getElementById(`enig-stage-${n}`);
  st.classList.add("solved");
  const tag = st.querySelector(".enig-stage-tag");
  tag.textContent = "✅ " + tag.textContent.replace(/^(🔒|🔓)\s*/u, "");
}

function aromaUnlockStage(n){
  aromaMarkSolved(n - 1);
  aromaState.etapa = n;
  const st = document.getElementById(`enig-stage-${n}`);
  st.classList.remove("locked");
  const tag = st.querySelector(".enig-stage-tag");
  tag.textContent = tag.textContent.replace("🔒 ", "🔓 ");
  aromaUpdateProgress();
  setTimeout(() => {
    st.scrollIntoView({ behavior: "smooth", block: "start" });
    const first = st.querySelector("input");
    if (first) first.focus({ preventScroll: true });
  }, 250);
}

/* ---------- ETAPA 1 ---------- */
async function aromaCheckEtapa1(btn){
  const msg = document.getElementById("enig-msg-1");
  const hash = await aromaSha256Hex(btn.dataset.v);
  if (hash === AROMA_HASH_ETAPA1){
    btn.classList.add("right");
    document.querySelectorAll(".enig-opt").forEach(b => b.disabled = true);
    msg.textContent = "✔ Isso! Você separou o ácido e o álcool. A segunda fechadura se abriu.";
    msg.className = "enig-msg ok";
    setTimeout(() => aromaUnlockStage(2), 700);
  } else {
    aromaState.erros[1]++;
    btn.classList.add("wrong");
    btn.disabled = true;
    aromaShake(document.getElementById("enig-options"));
    msg.textContent = aromaState.erros[1] >= 2
      ? "Ainda não. Conte os carbonos de cada lado do O do éster: quantos há entre o anel e a C=O? E entre o O e o outro anel?"
      : "Não é essa. Lembre: a esterificação precisa de um ácido carboxílico e de um álcool — e as cadeias têm que bater com a estrutura.";
    msg.className = "enig-msg err";
  }
}

/* ---------- ETAPAS 2 e 3 (massas molares) ---------- */
async function aromaCheckMassa(n){
  const input = document.getElementById(`enig-input-${n}`);
  const msg = document.getElementById(`enig-msg-${n}`);
  const raw = input.value.trim().replace(",", ".");
  const val = Number(raw);
  if (!raw || !isFinite(val)){
    msg.textContent = "Digite um número (pode usar vírgula).";
    msg.className = "enig-msg warn";
    return;
  }
  // aceita tanto 150 quanto 150,17 (massas com mais casas decimais)
  const hash = await aromaSha256Hex(String(Math.round(val)));
  const alvo = n === 2 ? AROMA_HASH_ETAPA2 : AROMA_HASH_ETAPA3;
  if (hash === alvo){
    input.disabled = true;
    document.getElementById(`enig-btn-${n}`).disabled = true;
    msg.textContent = n === 2
      ? "✔ Massa da Essência dos Deuses correta! Anote esse número."
      : "✔ Massa do Espírito da Rosa correta! Anote esse número também.";
    msg.className = "enig-msg ok";
    setTimeout(() => aromaUnlockStage(n + 1), 700);
  } else {
    aromaState.erros[n]++;
    aromaShake(input);
    const dica = AROMA_DICAS[n][hash];
    msg.textContent = dica || (aromaState.erros[n] >= 2
      ? "Ainda não. Lembre que o anel benzênico monossubstituído (C₆H₅–) tem 6 C e 5 H. Some a cadeia e o grupo funcional."
      : "Valor incorreto. Revise a fórmula molecular e as massas atômicas.");
    msg.className = "enig-msg err";
  }
}

/* ---------- ETAPA 4 ---------- */
function aromaSetupDigits(){
  const inputs = Array.from(document.querySelectorAll(".enig-digit"));
  inputs.forEach((inp, i) => {
    inp.addEventListener("input", () => {
      inp.value = inp.value.replace(/[^0-9]/g, "").slice(0, 1);
      if (inp.value && i < inputs.length - 1) inputs[i + 1].focus();
    });
    inp.addEventListener("keydown", (ev) => {
      if (ev.key === "Backspace" && !inp.value && i > 0) inputs[i - 1].focus();
      if (ev.key === "Enter") aromaCheckCodigo();
    });
  });
}

async function aromaCheckCodigo(){
  const inputs = Array.from(document.querySelectorAll(".enig-digit"));
  const code = inputs.map(i => i.value).join("");
  const msg = document.getElementById("enig-msg-4");
  const safe = document.getElementById("enig-safe");

  if (code.length < AROMA_CODE_LEN){
    msg.textContent = `Digite os ${AROMA_CODE_LEN} algarismos do código.`;
    msg.className = "enig-msg warn";
    return;
  }

  const hash = await aromaSha256Hex(code);
  if (hash === AROMA_HASH_CODIGO){
    safe.classList.add("unlocked");
    safe.querySelector(".enig-lock-icon").textContent = "🔓";
    msg.textContent = "🔓 O frasco se abriu! O Aroma dos Deuses é seu.";
    msg.className = "enig-msg ok";
    inputs.forEach(i => i.disabled = true);
    document.getElementById("enig-btn-unlock").disabled = true;
    aromaMarkSolved(4);
    aromaState.etapa = 5;
    aromaUpdateProgress();
    setTimeout(renderAromaFinal, 900);
  } else {
    aromaState.erros[4]++;
    aromaShake(safe.querySelector(".enig-digits"));
    msg.textContent = AROMA_DICAS[4][hash] || "Código incorreto. Some as duas massas molares que você encontrou.";
    msg.className = "enig-msg err";
    inputs.forEach(i => { i.value = ""; });
    inputs[0].focus();
  }
}

/* ---------- TELA FINAL + REGISTRO ---------- */
function renderAromaFinal(){
  const minutos = ((Date.now() - aromaState.inicio) / 60000).toFixed(1).replace(".", ",");
  const totalErros = aromaState.erros[1] + aromaState.erros[2] + aromaState.erros[3] + aromaState.erros[4];
  const box = document.getElementById("enig-result");
  box.innerHTML = `
    <div class="enig-card">
      <div class="enig-final">
        <span class="big">🏺✨</span>
        <strong>O Olimpo te saúda, ${aromaState.name.split(" ")[0]}!</strong><br>
        <span class="enig-sub">Tempo: ${minutos} min · erros no caminho: ${totalErros}</span>
        <span class="enig-registered" id="enig-reg-status">📝 Registrando na planilha…</span>
      </div>
    </div>`;
  box.scrollIntoView({ behavior: "smooth", block: "start" });

  const statusEl = document.getElementById("enig-reg-status");
  if (typeof AROMA_WEBAPP_URL === "undefined" || !AROMA_WEBAPP_URL){
    statusEl.textContent = "Registro em planilha não configurado — mostre esta tela ao professor.";
    return;
  }

  fetch(AROMA_WEBAPP_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      tipo: "aroma_deuses",
      nome: aromaState.name,
      turma: aromaState.turma,
      dataHora: new Date().toLocaleString("pt-BR"),
      errosEtapa1: aromaState.erros[1],
      errosEtapa2: aromaState.erros[2],
      errosEtapa3: aromaState.erros[3],
      errosCodigo: aromaState.erros[4],
      tempoMin: minutos
    })
  })
    .then(r => r.json())
    .then(data => {
      if (data && data.status === "ok" && data.posicao){
        statusEl.innerHTML = data.repetido
          ? `Você já tinha aberto o frasco antes — sua posição continua sendo <strong>${data.posicao}º</strong>.`
          : `✅ Registrado! Você foi o <strong>${data.posicao}º</strong> a abrir o frasco.`;
      } else {
        statusEl.textContent = "✅ Registrado com seu nome e turma.";
      }
    })
    .catch(() => {
      statusEl.textContent = "Não foi possível confirmar o registro (conexão instável) — mostre esta tela ao professor.";
    });
}

document.addEventListener("DOMContentLoaded", initAroma);
