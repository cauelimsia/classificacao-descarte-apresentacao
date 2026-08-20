/* Deck data-driven: cada slide é um objeto, o resto é derivado. */

function ativo(rotulo, pergunta, nivel, corNivel, justificativa, descarte) {
  return `
    <p class="kicker">Ativo · ${rotulo}</p>
    <h2>${pergunta}</h2>
    <p class="grande">Pública, Interna ou Confidencial? <span class="destaque">O que acontece se vazar?</span></p>
    <div class="veredito oculto">
      <div class="selo ${corNivel}">${nivel}</div>
      <p><b>Por quê:</b> ${justificativa}</p>
      <p><b>Descarte seguro:</b> ${descarte}</p>
    </div>
    <p class="hint-revelar">aperte → para revelar</p>`;
}

const SLIDES = [
  {
    tema: "escuro",
    nota: "Abertura: 20s. Somos os gestores de segurança da TechNova.",
    html: `
      <p class="kicker">Introdução à Segurança da Informação · Prof. Ranyere Lima</p>
      <h1>CLASSIFICAÇÃO<br>E DESCARTE</h1>
      <p class="grande">Cenário <span class="destaque">TechNova Solutions</span>: classificar os ativos de
      informação e decidir como eles morrem no fim do ciclo de vida.</p>
      <p class="assinatura"><b>Cauê Lima · Juan Valente · Felipe Costa · Jefferson</b><br>
      Turma 3001 · Martha Falcão Wyden</p>`
  },
  {
    tema: "claro",
    nota: "Critério de decisão: o nível vem do impacto do vazamento, e o descarte vem do nível.",
    html: `
      <p class="kicker">Nosso critério</p>
      <h2>O nível vem do impacto. O descarte vem do nível.</h2>
      <div class="cartoes">
        <div class="cartao"><b>Pública</b> vazou, ninguém se importa. Pode circular livre, descarte simples</div>
        <div class="cartao"><b>Interna</b> vazou, constrange. Só colaboradores, exclusão normal já resolve</div>
        <div class="cartao"><b>Confidencial</b> vazou, dói no caixa e na LGPD. Acesso mínimo e descarte irreversível</div>
      </div>`
  },
  {
    tema: "escuro",
    nota: "Interação: perguntar pra turma antes de revelar. Folha de pagamento = Confidencial.",
    html: ativo(
      "1 de 3",
      "Folha de Pagamento dos Sócios",
      "CONFIDENCIAL",
      "selo-vermelho",
      "dados pessoais e financeiros dos sócios, vazamento gera dano legal (LGPD), conflito societário e exposição da remuneração.",
      "wiping (sobrescrita) nos arquivos digitais e trituração das cópias em papel, com registro do descarte."
    )
  },
  {
    tema: "escuro",
    nota: "Manual de integração = Interna. Pegadinha: nem tudo é confidencial.",
    html: ativo(
      "2 de 3",
      "Manual de Integração do Colaborador",
      "INTERNA",
      "selo-laranja",
      "material operacional de uso interno, sem dado pessoal nem valor estratégico. Se vazar o impacto é baixo.",
      "exclusão normal dos sistemas e reciclagem do papel, sem necessidade de destruição especializada."
    )
  },
  {
    tema: "escuro",
    nota: "Plano estratégico = Confidencial. Valor competitivo, não dado pessoal.",
    html: ativo(
      "3 de 3",
      "Plano Estratégico de Expansão 2027",
      "CONFIDENCIAL",
      "selo-vermelho",
      "é a estratégia da empresa. Vazou, o concorrente sabe os próximos passos da TechNova antes do mercado.",
      "wiping das cópias digitais e trituração das impressas, seguindo o prazo da política de retenção."
    )
  },
  {
    tema: "claro",
    nota: "Amarrar com o ciclo de vida: descarte é fase de segurança, não faxina.",
    html: `
      <p class="kicker">Onde isso encaixa</p>
      <h2>Descarte é a última fase do ciclo de vida, não é faxina</h2>
      <div class="cartoes">
        <div class="cartao"><b>Informação mal descartada continua vazável</b> lixo corporativo e HD vendido em leilão são fontes clássicas de vazamento</div>
        <div class="cartao"><b>Deletar não é destruir</b> arquivo apagado se recupera, sobrescrita e destruição física não</div>
        <div class="cartao"><b>Confidencialidade até o fim</b> a Tríade CID vale da criação ao descarte do dado</div>
      </div>`
  },
  {
    tema: "escuro",
    nota: "Fechamento com a pergunta do critério. Agradecimento.",
    html: `
      <p class="kicker">Fechando</p>
      <h2>Classificar é decidir quanto custa perder</h2>
      <p class="grande">O rótulo do ativo define quem acessa, como protege e como descarta.
      <span class="destaque">Proteção proporcional ao impacto</span>, nem paranoia, nem descuido.</p>
      <p class="assinatura"><b>Cauê Lima · Juan Valente · Felipe Costa · Jefferson</b><br>
      Obrigado! · Classificação e Descarte · Introdução à Segurança da Informação</p>`
  }
];

/* ---------- engine ---------- */

const deck = document.getElementById("deck");
const bar = document.getElementById("bar");
const counter = document.getElementById("counter");
const notes = document.getElementById("notes");
let atual = -1;
let notasVisiveis = false;

SLIDES.forEach((s, i) => {
  const sec = document.createElement("section");
  sec.className = "slide " + (s.tema === "claro" ? "claro" : "");
  sec.dataset.i = i;
  sec.innerHTML = s.html;
  deck.appendChild(sec);
});

const els = [...deck.children];

function irPara(i) {
  i = Math.max(0, Math.min(SLIDES.length - 1, i));
  if (i === atual) return;
  const anterior = atual;
  atual = i;
  els.forEach((el, j) => {
    el.classList.toggle("ativo", j === i);
    el.classList.toggle("saindo", j === anterior && anterior < i);
  });
  document.body.dataset.slide = i;
  document.body.dataset.tema = SLIDES[i].tema === "claro" ? "claro" : "escuro";
  counter.textContent = (i + 1) + " / " + SLIDES.length;
  bar.style.width = ((i + 1) / SLIDES.length * 100) + "%";
  location.hash = "/" + (i + 1);
  if (notasVisiveis) notes.textContent = SLIDES[i].nota;
  avisaMudanca();
}

// o controle remoto escuta isto para espelhar o slide atual no celular
function avisaMudanca() {
  document.dispatchEvent(new CustomEvent("deck:mudou"));
}

function proximo() {
  const slideEl = els[atual];
  const oculto = slideEl && slideEl.querySelector(".veredito.oculto");
  if (oculto) {
    oculto.classList.remove("oculto");
    const hint = slideEl.querySelector(".hint-revelar");
    if (hint) hint.remove();
    avisaMudanca();
    return;
  }
  irPara(atual + 1);
}
function anterior() { irPara(atual - 1); }

document.getElementById("next").addEventListener("click", proximo);
document.getElementById("prev").addEventListener("click", anterior);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") proximo();
  else if (e.key === "ArrowLeft" || e.key === "PageUp") anterior();
  else if (e.key === "Home") irPara(0);
  else if (e.key === "End") irPara(SLIDES.length - 1);
  else if (e.key.toLowerCase() === "n") {
    notasVisiveis = !notasVisiveis;
    notes.hidden = !notasVisiveis;
    if (notasVisiveis) notes.textContent = SLIDES[atual].nota;
  }
});

let toqueX = null;
document.addEventListener("touchstart", (e) => { toqueX = e.touches[0].clientX; }, { passive: true });
document.addEventListener("touchend", (e) => {
  if (toqueX === null) return;
  const dx = e.changedTouches[0].clientX - toqueX;
  if (Math.abs(dx) > 50) (dx < 0 ? proximo : anterior)();
  toqueX = null;
}, { passive: true });

window.addEventListener("hashchange", () => {
  const n = parseInt(location.hash.replace("#/", ""), 10);
  if (!isNaN(n)) irPara(n - 1);
});

const inicial = parseInt(location.hash.replace("#/", ""), 10);
irPara(isNaN(inicial) ? 0 : inicial - 1);

/* ---------- api pública, usada pelo controle remoto ---------- */

function tituloDe(i) {
  const provisorio = document.createElement("div");
  provisorio.innerHTML = SLIDES[i].html;
  const titulo = provisorio.querySelector("h1, h2");
  if (!titulo) return "Slide " + (i + 1);
  titulo.querySelectorAll("br").forEach((br) => br.replaceWith(" "));
  return titulo.textContent.trim();
}

window.DECK = {
  total: SLIDES.length,
  proximo,
  anterior,
  irPara,
  titulo: tituloDe,
  // o celular precisa saber se a seta vai revelar o veredito ou pular de slide
  estado() {
    const el = els[atual];
    const revela = !!(el && el.querySelector(".veredito.oculto"));
    return {
      i: atual,
      total: SLIDES.length,
      titulo: tituloDe(atual),
      nota: SLIDES[atual].nota,
      proximoTitulo: atual + 1 < SLIDES.length ? tituloDe(atual + 1) : null,
      revela,
      // rótulo pronto: o celular não precisa saber as regras deste deck
      dica: revela ? "revela a classificação" : "próximo slide"
    };
  }
};

/* ---------- partículas da capa (nas cores wyden) ---------- */

const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");
let pontos = [];

function dimensiona() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
dimensiona();
window.addEventListener("resize", dimensiona);

const CORES = ["#f26f21", "#b01e77", "#e9a6cf"];
for (let i = 0; i < 70; i++) {
  pontos.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - .5) * .4,
    vy: (Math.random() - .5) * .4,
    r: Math.random() * 2 + .8,
    cor: CORES[i % CORES.length]
  });
}

(function anima() {
  requestAnimationFrame(anima);
  if (document.body.dataset.slide !== "0") return;
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const p of pontos) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
    ctx.globalAlpha = .8;
    ctx.fillStyle = p.cor;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = .12;
  ctx.strokeStyle = "#f26f21";
  for (let i = 0; i < pontos.length; i++) {
    for (let j = i + 1; j < pontos.length; j++) {
      const a = pontos[i], b = pontos[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
})();
