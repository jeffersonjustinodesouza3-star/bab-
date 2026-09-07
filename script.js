/* eslint-env browser */
// ===============================================
// CONFIGURAÇÃO DO SEU WHATSAPP
// Troque pelo seu número com DDD (ex: 5511987654321)
// ===============================================
const WHATSAPP_NUMERO = "5511987654321";

// ===============================================
// DADOS DAS BABÁS
// ===============================================
const babas = [
  {
    id: 1,
    nome: "Ana Carolina Santos",
    idade: 28,
    foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
    avaliacao: "5.0 (42 avaliações)",
    precoHora: 35,
    bairro: "Centro / Jardins",
    tags: ["Pedagogia", "Primeiros Socorros", "Bebês"],
    descricao: "Formada em Pedagogia com 6 anos de experiência. Carinhosa, atenta a rotinas lúdicas, contação de histórias e apoio pedagógico.",
    certificacoes: [
      "Graduada em Pedagogia (USP)",
      "Certificado em Primeiros Socorros Pediátricos",
      "Curso de Estimulação Precoce (0 a 3 anos)",
      "Antecedentes Criminais 100% Verificados"
    ],
    disponibilidade: "Segunda a Sexta (Manhã e Tarde) e Pernoites ocasionais"
  },
  {
    id: 2,
    nome: "Beatriz Lima",
    idade: 25,
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    avaliacao: "4.9 (35 avaliações)",
    precoHora: 45,
    bairro: "Moema / Vila Mariana",
    tags: ["Primeiros Socorros", "Bebês", "Inglês Básico"],
    descricao: "Especialista em bebês recém-nascidos e rotina do sono. Treinada em introdução alimentar e desengasgo.",
    certificacoes: [
      "Curso Avançado de Cuidados Neonatais",
      "Suporte Básico de Vida Infantil",
      "Capacitação em Introdução Alimentar BLW",
      "Antecedentes Criminais 100% Verificados"
    ],
    disponibilidade: "Terça a Sábado (Período Integral)"
  },
  {
    id: 3,
    nome: "Juliana Mendes",
    idade: 23,
    foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
    avaliacao: "4.8 (28 avaliações)",
    precoHora: 30,
    bairro: "Pinheiros / Perdizes",
    tags: ["Pedagogia", "Apoio Escolar"],
    descricao: "Estudante do último ano de Pedagogia. Foco em lição de casa, brincadeiras criativas ao ar livre e organização da rotina infantil.",
    certificacoes: [
      "Graduanda em Pedagogia (PUC)",
      "Oficinas de Recreação Infantil",
      "Curso de Musicalização para Crianças",
      "Antecedentes Criminais 100% Verificados"
    ],
    disponibilidade: "Segunda a Quinta (Tarde e Noite)"
  },
  {
    id: 4,
    nome: "Fernanda Costa",
    idade: 32,
    foto: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=500&q=80",
    avaliacao: "5.0 (56 avaliações)",
    precoHora: 55,
    bairro: "Itaim Bibi / Morumbi",
    tags: ["Enfermagem", "Primeiros Socorros", "Bebês"],
    descricao: "Técnica em Enfermagem com especialização neonatal. Cuidado seguro para bebês prematuros, gêmeos e acompanhamento noturno.",
    certificacoes: [
      "Técnica em Enfermagem (COREN ativo)",
      "Pós-Técnico em UTI Neonatal e Pediátrica",
      "Curso Avançado de Primeiros Socorros (Cruz Vermelha)",
      "Antecedentes Criminais 100% Verificados"
    ],
    disponibilidade: "Plantões Noturnos e Finais de Semana"
  }
];

let babaSelecionada = null;

// ===============================================
// RENDERIZAÇÃO DOS CARDS
// ===============================================
function renderizarBabas(lista) {
  const container = document.getElementById("babas-container");
  if (!container) return;

  if (!lista || lista.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #718096;">
        <p style="font-size: 1.2rem;">Nenhuma babá encontrada com esses filtros.</p>
        <button class="btn btn-outline" style="margin-top: 15px;" onclick="resetarFiltros()">Limpar Filtros</button>
      </div>
    `;
    return;
  }

  container.innerHTML = lista.map(baba => `
    <div class="baba-card">
      <div class="baba-img-wrapper">
        <img src="${baba.foto}" alt="${baba.nome}" class="baba-img" loading="lazy">
        <span class="baba-verificado-badge">✓ Verificada</span>
        <div class="baba-price-tag">R$ ${baba.precoHora}/h</div>
      </div>
      <div class="baba-info">
        <div class="baba-header">
          <h3 class="baba-nome">${baba.nome}</h3>
          <span class="baba-rating">⭐ ${baba.avaliacao}</span>
        </div>
        <div class="baba-local">📍 ${baba.bairro} • ${baba.idade} anos</div>
        <p class="baba-desc">${baba.descricao}</p>
        <div class="baba-tags">
          ${baba.tags.map(tag => `<span class="tag-badge">${tag}</span>`).join("")}
        </div>
        <div class="baba-card-actions">
          <button class="btn btn-secondary-soft" onclick="abrirModalPerfil(${baba.id})">
            Ver Perfil
          </button>
          <button class="btn btn-primary" onclick="abrirModalAgendamento(${baba.id})">
            Agendar
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

// ===============================================
// FILTROS DE BUSCA
// ===============================================
function filtrarBabas() {
  const inputCidade = document.getElementById("filtro-cidade");
  const selectPreco = document.getElementById("filtro-preco");

  const cidade = inputCidade ? inputCidade.value.toLowerCase().trim() : "";
  const preco = selectPreco ? selectPreco.value : "todos";

  const filtradas = babas.filter(baba => {
    const matchCidade = !cidade || baba.bairro.toLowerCase().includes(cidade);
    const matchPreco = preco === "todos" || baba.precoHora <= parseInt(preco, 10);
    return matchCidade && matchPreco;
  });

  renderizarBabas(filtradas);

  const secaoBabas = document.getElementById("babas");
  if (secaoBabas) {
    secaoBabas.scrollIntoView({ behavior: "smooth" });
  }
}

function filtrarPorTag(tag, botao) {
  document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
  if (botao) {
    botao.classList.add("active");
  }

  if (tag === "todos") {
    renderizarBabas(babas);
  } else {
    const filtradas = babas.filter(baba => baba.tags.includes(tag));
    renderizarBabas(filtradas);
  }
}

function resetarFiltros() {
  const inputCidade = document.getElementById("filtro-cidade");
  const selectPreco = document.getElementById("filtro-preco");

  if (inputCidade) inputCidade.value = "";
  if (selectPreco) selectPreco.value = "todos";

  renderizarBabas(babas);
}

// ===============================================
// CALCULADORA DE ORÇAMENTO
// ===============================================
function inicializarCalculadora() {
  const select = document.getElementById("calc-baba");
  if (!select) return;

  select.innerHTML = babas.map(b => `
    <option value="${b.id}">${b.nome} - R$ ${b.precoHora}/h</option>
  `).join("");

  atualizarCalculo();
}

function atualizarCalculo() {
  const selectBaba = document.getElementById("calc-baba");
  const inputHoras = document.getElementById("calc-horas");
  const checkExtra = document.getElementById("calc-extra-crianca");
  const checkFds = document.getElementById("calc-fim-semana");
  const labelHoras = document.getElementById("calc-horas-label");
  const resultado = document.getElementById("calc-resultado");
  const detalhe = document.getElementById("calc-detalhe");

  if (!selectBaba || !inputHoras) return;

  const babaId = parseInt(selectBaba.value, 10) || 1;
  const horas = parseInt(inputHoras.value, 10) || 4;
  const extraCrianca = checkExtra ? checkExtra.checked : false;
  const fimSemana = checkFds ? checkFds.checked : false;

  if (labelHoras) {
    labelHoras.textContent = `${horas} horas`;
  }

  const baba = babas.find(b => b.id === babaId) || babas[0];
  let valorHora = baba.precoHora;
  if (extraCrianca) valorHora += 10;

  let total = valorHora * horas;
  if (fimSemana) total += 15;

  if (resultado) {
    resultado.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
  }

  if (detalhe) {
    detalhe.textContent = `${horas}h com ${baba.nome} ${extraCrianca ? "(+ 1 criança)" : ""} ${fimSemana ? "(com taxa de fds)" : ""}`;
  }
}

function agendarViaCalculadora() {
  const selectBaba = document.getElementById("calc-baba");
  const inputHoras = document.getElementById("calc-horas");

  if (selectBaba) {
    const babaId = parseInt(selectBaba.value, 10);
    abrirModalAgendamento(babaId);
  }

  if (inputHoras) {
    const agDuracao = document.getElementById("ag-duracao");
    if (agDuracao) {
      agDuracao.value = `${inputHoras.value} horas`;
    }
  }
}

// ===============================================
// MODAIS E AÇÕES
// ===============================================
function fecharModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.classList.remove("ativo");
  }
}

// Fechar ao clicar fora do conteúdo
window.addEventListener("click", (e) => {
  const target = e.target;
  if (target && target.classList && target.classList.contains("modal")) {
    target.classList.remove("ativo");
  }
});

function abrirModalAgendamento(id) {
  babaSelecionada = babas.find(b => b.id === id);
  if (!babaSelecionada) return;

  const sub = document.getElementById("modal-subtitulo");
  if (sub) {
    sub.innerHTML = `Solicitando agendamento com <strong>${babaSelecionada.nome}</strong> (R$ ${babaSelecionada.precoHora}/h).`;
  }

  const modal = document.getElementById("modal-agendamento");
  if (modal) {
    modal.classList.add("ativo");
  }
}

function abrirModalPerfil(id) {
  const baba = babas.find(b => b.id === id);
  if (!baba) return;

  const corpo = document.getElementById("perfil-detalhes-corpo");
  if (!corpo) return;

  corpo.innerHTML = `
    <div class="perfil-modal-header">
      <img src="${baba.foto}" alt="${baba.nome}" class="perfil-modal-avatar">
      <div>
        <h2>${baba.nome}</h2>
        <p style="color: #718096; font-size: 0.9rem;">📍 ${baba.bairro} • ${baba.idade} anos • ⭐ ${baba.avaliacao}</p>
        <span style="font-size: 1.2rem; font-weight: 700; color: #ff6584;">R$ ${baba.precoHora}/hora</span>
      </div>
    </div>

    <div style="margin-bottom: 20px;">
      <h4 style="margin-bottom: 8px;">Sobre a Profissional:</h4>
      <p style="color: #4a5568; font-size: 0.95rem; line-height: 1.6;">${baba.descricao}</p>
    </div>

    <div class="perfil-certificacoes">
      <h4 style="margin-bottom: 10px;">Certificações & Verificações:</h4>
      <ul>
        ${baba.certificacoes.map(c => `<li>✅ ${c}</li>`).join("")}
      </ul>
    </div>

    <div style="margin-bottom: 25px;">
      <h4 style="margin-bottom: 6px;">Disponibilidade Geral:</h4>
      <p style="color: #4a5568; font-size: 0.9rem;">🕒 ${baba.disponibilidade}</p>
    </div>

    <button class="btn btn-whatsapp btn-block" onclick="fecharModal('modal-perfil'); abrirModalAgendamento(${baba.id});">
      💬 Solicitar Agendamento com ${baba.nome}
    </button>
  `;

  const modal = document.getElementById("modal-perfil");
  if (modal) {
    modal.classList.add("ativo");
  }
}

function abrirModalCadastroBaba() {
  const modal = document.getElementById("modal-cadastro-baba");
  if (modal) {
    modal.classList.add("ativo");
  }
}

// ===============================================
// ENVIO PARA O WHATSAPP
// ===============================================
function enviarParaWhatsApp(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  }

  const inputNome = document.getElementById("ag-nome");
  const inputBairro = document.getElementById("ag-bairro");
  const inputData = document.getElementById("ag-data");
  const inputHora = document.getElementById("ag-hora");
  const selectDuracao = document.getElementById("ag-duracao");
  const selectCriancas = document.getElementById("ag-criancas");
  const textareaObs = document.getElementById("ag-obs");

  const nome = inputNome ? inputNome.value : "";
  const bairro = inputBairro ? inputBairro.value : "";
  const data = inputData ? inputData.value : "";
  const hora = inputHora ? inputHora.value : "";
  const duracao = selectDuracao ? selectDuracao.value : "4 horas";
  const criancas = selectCriancas ? selectCriancas.value : "1 criança";
  const obs = textareaObs && textareaObs.value ? textareaObs.value : "Nenhuma";

  const dataFormatada = data ? data.split("-").reverse().join("/") : "A combinar";

  const texto = `👋 Olá! Gostaria de agendar um atendimento na *BabáConecta*:\n\n` +
    `👤 *Cliente:* ${nome}\n` +
    `📍 *Local/Bairro:* ${bairro}\n` +
    `👩‍🍼 *Babá Escolhida:* ${babaSelecionada ? babaSelecionada.nome : "A combinar"}\n` +
    `📅 *Data:* ${dataFormatada}\n` +
    `⏰ *Horário:* ${hora} (${duracao})\n` +
    `👶 *Crianças:* ${criancas}\n` +
    `📝 *Observações:* ${obs}\n\n` +
    `Poderia confirmar a disponibilidade? Obrigado!`;

  const link = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
  window.open(link, "_blank");

  fecharModal("modal-agendamento");
  const form = document.getElementById("form-agendamento");
  if (form) {
    form.reset();
  }
}

function enviarCandidatura(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  }

  const inputNome = document.getElementById("cad-nome");
  const inputTel = document.getElementById("cad-tel");
  const inputCidade = document.getElementById("cad-cidade");
  const inputPreco = document.getElementById("cad-preco");
  const selectExp = document.getElementById("cad-exp");
  const textareaBio = document.getElementById("cad-bio");

  const nome = inputNome ? inputNome.value : "";
  const tel = inputTel ? inputTel.value : "";
  const cidade = inputCidade ? inputCidade.value : "";
  const preco = inputPreco ? inputPreco.value : "";
  const exp = selectExp ? selectExp.value : "";
  const bio = textareaBio ? textareaBio.value : "";

  const selecionados = Array.from(document.querySelectorAll(".cad-habilidade:checked")).map(c => c.value);
  const habilidades = selecionados.length > 0 ? selecionados.join(", ") : "Geral";

  const texto = `👋 Olá! Gostaria de me cadastrar como *Babá* na *BabáConecta*:\n\n` +
    `👤 *Nome:* ${nome}\n` +
    `📱 *WhatsApp:* ${tel}\n` +
    `📍 *Região:* ${cidade}\n` +
    `💰 *Valor Pretendido:* R$ ${preco}/h\n` +
    `⏳ *Experiência:* ${exp}\n` +
    `🎓 *Especialidades:* ${habilidades}\n` +
    `📖 *Sobre mim:* ${bio}\n\n` +
    `Gostaria de saber quais são os próximos passos da verificação!`;

  const link = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
  window.open(link, "_blank");

  fecharModal("modal-cadastro-baba");
  const form = document.getElementById("form-cadastro-baba");
  if (form) {
    form.reset();
  }
}

// ===============================================
// FAQ ACCORDION
// ===============================================
function toggleFaq(elemento) {
  if (!elemento) return;
  const aberto = elemento.classList.contains("aberto");
  document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("aberto"));
  if (!aberto) {
    elemento.classList.add("aberto");
  }
}

// ===============================================
// EXPORTAÇÃO GLOBAL (EVITA AVISOS DE NÃO UTILIZADO NO VS CODE)
// ===============================================
window.filtrarBabas = filtrarBabas;
window.filtrarPorTag = filtrarPorTag;
window.resetarFiltros = resetarFiltros;
window.atualizarCalculo = atualizarCalculo;
window.agendarViaCalculadora = agendarViaCalculadora;
window.fecharModal = fecharModal;
window.abrirModalAgendamento = abrirModalAgendamento;
window.abrirModalPerfil = abrirModalPerfil;
window.abrirModalCadastroBaba = abrirModalCadastroBaba;
window.enviarParaWhatsApp = enviarParaWhatsApp;
window.enviarCandidatura = enviarCandidatura;
window.toggleFaq = toggleFaq;

// ===============================================
// INICIALIZAÇÃO
// ===============================================
document.addEventListener("DOMContentLoaded", () => {
  renderizarBabas(babas);
  inicializarCalculadora();
});
