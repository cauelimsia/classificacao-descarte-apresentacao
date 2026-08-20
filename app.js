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

/* Questão discursiva do simulado: pergunta à esquerda, resposta à direita.
   A resposta entra escondida e a seta revela, igual ao veredito dos ativos. */
function questao(q, n) {
  return `
    <p class="kicker">Simulado ENADE · questão ${String(n).padStart(2, "0")} de 10 · ${q.foco}</p>
    <h2>${q.titulo}</h2>
    <div class="questao">
      <div class="pergunta"><p>${q.pergunta}</p></div>
      <div class="veredito resposta oculto">
        <p class="tese">${q.tese}</p>
        ${q.corpo.map((p) => "<p>" + p + "</p>").join("")}
        <p class="fundamento">${q.fundamento}</p>
      </div>
    </div>
    <p class="hint-revelar">aperte → para responder</p>`;
}

const QUESTOES = [
  {
    titulo: "Cenário hospitalar",
    foco: "Disponibilidade e continuidade",
    nota: "Q1. Deixar a turma responder antes. O erro comum é dizer Confidencialidade.",
    pergunta: `Um hospital sofre um ataque onde prontuários são criptografados e o acesso é
      bloqueado. Qual princípio da Tríade CID foi o alvo direto e qual a implicação imediata
      para o atendimento?`,
    tese: "Disponibilidade.",
    corpo: [
      `O dado não vazou e não foi alterado: ele continua lá, íntegro e secreto. O que o ransomware
       fez foi trancar a porta. Confidencialidade e Integridade seguem de pé, quem caiu foi a
       Disponibilidade.`,
      `Na prática o hospital volta para o papel. O médico atende sem histórico, sem alergia
       registrada e sem saber a medicação em uso. Aqui indisponibilidade não é prejuízo de caixa,
       é <b>risco clínico</b>: cirurgia adiada e paciente transferido.`,
      `Ressalva: se houve exfiltração antes da criptografia, o clássico da dupla extorsão, aí a
       Confidencialidade cai junto. Mas o alvo do bloqueio é a Disponibilidade.`
    ],
    fundamento: "ISO/IEC 27001 · A.5.29 segurança durante disrupção · A.5.30 prontidão de TIC para continuidade"
  },
  {
    titulo: "LGPD e consentimento",
    foco: "Transparência e finalidade",
    nota: "Q2. Puxar o gancho: compartilhar é tratamento novo, precisa de base legal própria.",
    pergunta: `Uma empresa compartilha dados de clientes com parceiros sem aviso prévio. Segundo a
      LGPD, quais direitos do titular foram violados e qual a base legal necessária para tal ação?`,
    tese: "Violou a transparência: o titular tinha direito de saber com quem seus dados iam parar.",
    corpo: [
      `Direitos atropelados: o de <b>informação sobre o uso compartilhado</b> (art. 18, VII), o de
       livre acesso e o de se opor ao tratamento. Junto caem os princípios da finalidade e da
       transparência do art. 6º — compartilhar com parceiro é tratamento novo, não é extensão
       automática do que o cliente autorizou lá atrás.`,
      `Base legal necessária: <b>consentimento específico e destacado</b> para aquele
       compartilhamento (art. 7º, I combinado com o art. 8º). Legítimo interesse (art. 7º, IX) até
       cabe em alguns casos, mas exige teste de balanceamento e transparência mesmo assim. E se o
       dado for sensível não tem conversa: só consentimento específico (art. 11).`
    ],
    fundamento: "LGPD · art. 6º, 7º, 8º, 11 e 18, VII · ISO/IEC 27002 · 5.34 privacidade e proteção de dados pessoais"
  },
  {
    titulo: "Engenharia social",
    foco: "Fator humano e treinamento",
    nota: "Q3. Bater na tecla: nenhum controle técnico falhou. Por isso o pedido é medida não tecnológica.",
    pergunta: `Um funcionário fornece sua senha por telefone a um suposto técnico de TI. Analise a
      falha sob a ótica do elo mais fraco da segurança e proponha uma medida preventiva não
      tecnológica.`,
    tese: "Nenhum controle técnico falhou. Falhou a pessoa — e é por isso que ela é o elo mais fraco.",
    corpo: [
      `O firewall, o antivírus e a criptografia continuaram funcionando perfeitamente. O invasor
       não quebrou nada: ele pediu, e entrou pela porta da frente com credencial válida. Manipular
       gente sai mais barato que tentar quebrar AES.`,
      `Medida preventiva não tecnológica: <b>treinamento periódico de conscientização</b>, apoiado
       numa política escrita e repetida de que a TI nunca pede senha, mais o procedimento de
       desligar e retornar pelo ramal oficial antes de passar qualquer informação.`,
      `E um detalhe que muita empresa erra: não punir quem reporta. Funcionário com medo esconde o
       incidente, e incidente escondido vira incidente grande.`
    ],
    fundamento: "ISO/IEC 27002 · 6.3 conscientização e treinamento · 5.1 políticas de segurança · 6.8 relato de eventos"
  },
  {
    titulo: "Hash e integridade",
    foco: "Verificação de integridade",
    nota: "Q4. Se sobrar tempo, citar o efeito avalanche. Fechar com a ressalva da autenticidade.",
    pergunta: `Ao baixar um software, o site fornece um "hash" (SHA-256). Explique como o uso desse
      hash garante a integridade do arquivo e o que um hash diferente indicaria ao usuário.`,
    tese: "O hash é a impressão digital do arquivo. Bateu, é bit a bit o que o autor publicou.",
    corpo: [
      `Baixo o arquivo, calculo o SHA-256 na minha máquina e comparo com o publicado. A função é
       determinística e tem <b>efeito avalanche</b>: muda um único bit do arquivo e o hash inteiro
       muda. Não existe "quase igual".`,
      `Hash diferente quer dizer que o arquivo que chegou não é o que saiu. Pode ser download
       corrompido ou pode ser adulteração, alguém trocou o instalador por um com backdoor. Nos dois
       casos a decisão é a mesma: não instala.`,
      `Ressalva importante: hash sozinho garante <b>integridade, não autenticidade</b>. Se o
       atacante domina o site, ele troca o arquivo e o hash junto. Por isso o hash precisa vir por
       canal confiável, e o ideal é assinatura digital.`
    ],
    fundamento: "ISO/IEC 27002 · 8.24 uso de criptografia · Tríade CID · Integridade"
  },
  {
    titulo: "Classificação de informação",
    foco: "Gestão de ativos e impacto",
    nota: "Q5. É o tema da nossa apresentação. Amarrar com os três ativos da TechNova.",
    pergunta: `Uma empresa classifica seus dados em: Público, Interno e Confidencial. Relacione essa
      classificação com o controle de acesso e o impacto de um vazamento em cada nível.`,
    tese: "O nível vem do impacto do vazamento, e o controle de acesso vem do nível.",
    corpo: [
      `<b>Público:</b> circula livre, sem controle de acesso, porque já nasceu para ser visto.
       Vazou, não acontece nada.`,
      `<b>Interno:</b> só colaborador autenticado. Vazou, constrange e expõe processo, mas não gera
       multa nem perde contrato.`,
      `<b>Confidencial:</b> acesso mínimo, need to know, registro de quem abriu e criptografia.
       Vazou, dói no caixa, na LGPD e na imagem. E o descarte muda junto: aqui não basta apagar,
       tem que sobrescrever ou triturar.`,
      `Rotular é decidir de antemão quanto custa perder aquele ativo. Proteção proporcional ao
       impacto, nem paranoia, nem descuido.`
    ],
    fundamento: "ISO/IEC 27002 · 5.12 classificação · 5.13 rotulagem · 5.15 controle de acesso · 8.10 exclusão de informações"
  },
  {
    titulo: "Ameaça, vulnerabilidade e risco",
    foco: "Mitigação e controles",
    nota: "Q6. A frase que resolve: ameaça eu não controlo, vulnerabilidade eu controlo.",
    pergunta: `Diferencie os conceitos de Ameaça, Vulnerabilidade e Risco. Como a implementação de um
      firewall atua sobre esses elementos em um cenário de invasão externa?`,
    tese: "Ameaça eu não controlo. Vulnerabilidade eu controlo. Risco é o encontro dos dois.",
    corpo: [
      `<b>Ameaça</b> é o agente ou evento que pode causar dano: o invasor existe querendo eu ou não.
       <b>Vulnerabilidade</b> é a minha fraqueza que ele explora, tipo uma porta de administração
       remota aberta para a internet. <b>Risco</b> é probabilidade vezes impacto — sem
       vulnerabilidade para explorar, a ameaça fica só ameaça.`,
      `O firewall não age na ameaça, age na vulnerabilidade: fecha porta, filtra serviço exposto e
       encolhe a superfície de ataque. Isso derruba a probabilidade, e derrubando probabilidade
       derruba o risco.`,
      `O invasor continua lá tentando. O que sobra depois do controle é o <b>risco residual</b>, que
       a empresa aceita formalmente ou trata de novo.`
    ],
    fundamento: "ISO/IEC 27001 · 6.1.2 avaliação e 6.1.3 tratamento de riscos · ISO/IEC 27005 · 27002 · 8.20 segurança de redes"
  },
  {
    titulo: "RTO e RPO",
    foco: "Resiliência e recuperação",
    nota: "Q7. Truque de memória: RTO conta para frente (tempo), RPO conta para trás (dado).",
    pergunta: `Após um incêndio no datacenter, a empresa ativa seu site de backup. Explique a
      importância do RTO (Recovery Time Objective) e do RPO (Recovery Point Objective) neste processo.`,
    tese: "RTO é quanto tempo eu aguento parado. RPO é quanto dado eu aceito perder.",
    corpo: [
      `O <b>RTO</b> conta para frente a partir do desastre e define quanto investir em
       infraestrutura: site quente sobe em minutos e custa caro, site frio é barato e demora dias.
       O <b>RPO</b> conta para trás e define a frequência de backup ou replicação — RPO de uma hora
       significa cópia de hora em hora, no mínimo.`,
      `Sem esses dois números definidos antes, o plano de continuidade é achismo: não dá para dizer
       se o site de backup atende. Um banco trabalha com RPO perto de zero porque não pode perder
       transação; uma papelaria sobrevive com RTO de dois dias.`
    ],
    fundamento: "ISO/IEC 27001 · A.5.29 e A.5.30 · ISO 22301 continuidade de negócio"
  },
  {
    titulo: "Backup que ninguém testou",
    foco: "Confiabilidade dos processos",
    nota: "Q8. A frase de efeito abre a resposta. Fechar pedindo teste cronometrado.",
    pergunta: `Uma empresa realiza backups diários, mas nunca testou a restauração. Analise o risco
      envolvido e como isso impacta a garantia do princípio da Disponibilidade.`,
    tese: "Backup que nunca foi restaurado não é backup, é esperança.",
    corpo: [
      `Você só descobre que a cópia está corrompida na hora do desastre, que é exatamente o pior
       momento para descobrir. E as formas de falhar são banais: job falhando em silêncio há meses,
       base que ficou fora do escopo, mídia degradada, backup criptografado com uma chave que
       ninguém sabe onde está.`,
      `A Disponibilidade não é garantida pelo backup existir, é garantida pela restauração
       funcionar. Enquanto ninguém restaurou, o controle existe no papel e não existe na prática —
       e ainda cria falsa sensação de segurança, que é pior do que não ter.`,
      `Correção: <b>teste de restauração periódico, documentado e cronometrado</b>. O cronômetro
       mede o RTO real e diz se ele bate com o que foi prometido.`
    ],
    fundamento: "ISO/IEC 27002 · 8.13 backup de informações · 5.29 segurança durante disrupção"
  },
  {
    titulo: "Auditoria interna e PDCA",
    foco: "Melhoria contínua",
    nota: "Q9. Encaixar auditoria no C do PDCA e mostrar o ciclo fechando.",
    pergunta: `Qual o papel da auditoria interna na manutenção da certificação ISO 27001? Explique
      como o ciclo PDCA (Plan-Do-Check-Act) se aplica à Segurança da Informação.`,
    tese: "A auditoria interna é o C do PDCA: a empresa se olhando no espelho antes do auditor externo olhar.",
    corpo: [
      `Ela confere se o que está escrito na política é o que acontece no dia a dia. Certificação não
       se ganha uma vez e pendura na parede: ela é mantida, e é auditada de novo periodicamente.`,
      `No ciclo: <b>Plan</b> define escopo, analisa risco, escolhe controles e assina a Declaração de
       Aplicabilidade. <b>Do</b> implementa e opera. <b>Check</b> monitora, mede e audita.
       <b>Act</b> corrige a não conformidade, e a correção vira entrada do próximo Plan.`,
      `Sem o Check o SGSI vira documento morto. O achado da auditoria é o combustível do Act — é o
       que faz aquilo girar como ciclo em vez de virar linha reta.`
    ],
    fundamento: "ISO/IEC 27001 · 9.2 auditoria interna · 9.3 análise crítica pela direção · 10 melhoria"
  },
  {
    titulo: "Governança e alta gestão",
    foco: "Visão estratégica",
    nota: "Q10. Fechamento do simulado. A ideia-chave: quem aceita risco tem que ter autoridade para aceitar.",
    pergunta: `Relacione a Segurança da Informação com a Governança Corporativa. Por que a segurança
      deve ser uma preocupação da alta gestão e não apenas do departamento de TI?`,
    tese: "Segurança é decisão de risco de negócio. E risco de negócio é da diretoria, não do analista.",
    corpo: [
      `Quem aceita risco precisa ter autoridade para aceitar. Nenhum analista decide sozinho que a
       empresa vai conviver com o risco de uma multa de LGPD — isso é assinatura de quem responde
       pela empresa.`,
      `Tem o lado prático: sem patrocínio da alta gestão, segurança perde toda disputa por orçamento
       e vira o setor que atrasa projeto. E tem o lado legal: a LGPD responsabiliza o
       <b>controlador</b>, ou seja a empresa e seus dirigentes, não o técnico que configurou o
       servidor.`,
      `Fora que segurança atravessa RH (admissão e desligamento), Jurídico (contrato e cláusula) e
       Financeiro. Só a alta gestão tem alcance para atravessar área — por isso a ISO 27001 põe o
       comprometimento da Alta Direção como <b>requisito</b>, não como sugestão.`
    ],
    fundamento: "ISO/IEC 27001 · 5.1 liderança e comprometimento · LGPD art. 42 a 45 · ISO/IEC 27002 · 5.4 responsabilidades da direção"
  }
];

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
    tema: "magenta",
    nota: "Virada para a atividade avaliativa. Avisar que a turma responde antes da gente revelar.",
    html: `
      <p class="kicker">Parte 2 · Atividade avaliativa</p>
      <h1>SIMULADO<br>ENADE</h1>
      <p class="grande">Dez questões discursivas. Primeiro a sala responde,
      <span class="destaque">depois a gente abre a nossa resposta</span> e compara.</p>
      <div class="cartoes">
        <div class="cartao"><b>Questões 1 a 5</b> cenários, legislação e LGPD</div>
        <div class="cartao"><b>Questões 6 a 10</b> risco, continuidade e governança</div>
        <div class="cartao"><b>Regra do professor</b> justificativa fundamentada em norma técnica e lei vale 50% da nota</div>
      </div>`
  },
  ...QUESTOES.map((q, i) => ({
    tema: "escuro",
    classe: "q",
    revelar: "a resposta",
    nota: q.nota,
    html: questao(q, i + 1)
  })),
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
  sec.className = "slide " + (s.tema === "claro" ? "claro " : s.tema === "magenta" ? "magenta " : "") + (s.classe || "");
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
      dica: revela ? "revela " + (SLIDES[atual].revelar || "a classificação") : "próximo slide"
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
