// Dados das Babás Cadastradas
const babas = [
  {
    id: 1,
    nome: "Ana Carolina Santos",
    foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
    avaliacao: "5.0 (42 avaliações)",
    precoHora: 35,
    bairro: "Centro / Jardins",
    tags: ["Pedagogia", "Primeiros Socorros", "Bebês"],
    descricao: "Formada em Pedagogia com 6 anos de experiência com crianças de 0 a 6 anos. Calma, carinhosa e focada em atividades lúdicas."
  },
  {
    id: 2,
    nome: "Beatriz Lima",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    avaliacao: "4.9 (35 avaliações)",
    precoHora: 45,
    bairro: "Moema / Vila Mariana",
    tags: ["Primeiros Socorros", "Inglês Básico", "Bebês"],
    descricao: "Certificada em Primeiros Socorros Pediátricos. Especialista em rotina de bebês, introdução alimentar e estimulação motora."
  },
  {
    id: 3,
    nome: "Juliana Mendes",
    foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
    avaliacao: "4.8 (28 avaliações)",
    precoHora: 30,
    bairro: "Pinheiros / Perdizes",
    tags: ["Pedagogia", "Apoio Escolar"],
    descricao: "Estudante do último ano de Pedagogia. Excelente apoio para lição de casa, leitura, brincadeiras educativas e rotina diária."
  },
  {
    id: 4,
    nome: "Fernanda Costa",
    foto: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=500&q=80",
    avaliacao: "5.0 (56 avaliações)",
    precoHora: 55,
    bairro: "Itaim Bibi / Morumbi",
    tags: ["Enfermagem", "Primeiros Socorros", "Bebês"],
    descricao: "Técnica em Enfermagem com especialização neonatal. Cuidado seguro para recém-nascidos e acompanhamento noturno."
  }
];

let babaSelecionada = null;

// Renderizar cards das babás
function renderizarBabas(lista) {
  const container = document.getElementById("babas-container");
  if (!container) return;

  if (lista.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #718096;">
        <p style="font-size: 1.2rem;">Nenhuma babá encontrada com esses critérios.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = lista.map(baba => `
    <div class="baba-card">
      <div class="baba-img-wrapper">
        <img src="${baba.foto}" alt="${baba.nome}" class="baba-img">
        <div class="baba-price-tag">R$ ${baba.precoHora}/h</div>
      </div>
      <div class="baba-info">
        <div class="baba-header">
          <h3 class="baba-nome">${baba.nome}</h3>
          <span class="baba-rating">⭐ ${baba.avaliacao}</span>
        </div>
        <div class="baba-local">📍 ${baba.bairro}</div>
        <p class="baba-desc">${baba.descricao}</p>
        <div class="baba-tags">
          ${baba.tags.map(tag => `<span class="tag-badge">${tag}</span>`).join("")}
        </div>
        <button class="btn btn-primary btn-block" onclick="abrirModal(${baba.id})">
          Solicitar Agendamento
        </button>
      </div>
    </div>
  `).join("");
}

// Filtragem rápida do Hero
function filtrarBabas() {
  const cidade = document.getElementById("filtro-cidade").value.toLowerCase().trim();
  const preco = document.getElementById("filtro-preco").value;

  const filtradas = babas.filter(baba => {
    const matchCidade = !cidade || baba.bairro.toLowerCase().includes(cidade);
    const matchPreco = preco === "todos" || baba.precoHora <= parseInt(preco);
    return matchCidade && matchPreco;
  });

  renderizarBabas(filtradas);
  document.getElementById("babas").scrollIntoView({ behavior: "smooth" });
}

// Filtro por Tags (Pills)
function filtrarPorTag(tag, botao) {
  document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
  botao.classList.add("active");

  if (tag === "todos") {
    renderizarBabas(babas);
  } else {
    const filtradas = babas.filter(baba => baba.tags.includes(tag));
    renderizarBabas(filtradas);
  }
}

// Modal de Agendamento
function abrirModal(id) {
  babaSelecionada = babas.find(b => b.id === id);
  if (!babaSelecionada) return;

  const modal = document.getElementById("modal-agendamento");
  const sub = document.getElementById("modal-subtitulo");
  sub.innerHTML = `Você está agendando com <strong>${babaSelecionada.nome}</strong> (R$ ${babaSelecionada.precoHora}/h).`;
  
  modal.classList.add("ativo");
}

function fecharModal() {
  const modal = document.getElementById("modal-agendamento");
  modal.classList.remove("ativo");
}

function confirmarAgendamento(event) {
  event.preventDefault();
  const nome = document.getElementById("ag-nome").value;
  const data = document.getElementById("ag-data").value;
  const hora = document.getElementById("ag-hora").value;

  alert(`Obrigado(a), ${nome}! Sua solicitação com ${babaSelecionada.nome} para o dia ${data} às ${hora} foi enviada com sucesso! Entraremos em contato pelo WhatsApp.`);
  fecharModal();
  document.getElementById("form-agendamento").reset();
}

// Inicialização ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  renderizarBabas(babas);
});

