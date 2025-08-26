// Variável global para armazenar os dados do roteiro
let roteiroData = null;
let currentRoteiro = 'paris2025';

// Lista de roteiros disponíveis para navegação
const roteiros = {
    'paris2025': { 
        nome: 'Paris', 
        arquivo: 'paris2025.json',
        url: 'index.html' 
    },
    'chamonix2025': { 
        nome: 'Chamonix', 
        arquivo: 'chamonix2025.json',
        url: 'chamonix.html' 
    },
    'florenca2024': { 
        nome: 'Florença', 
        arquivo: 'florenca2024.json',
        url: 'florenca.html' 
    },
    'roma2024': { 
        nome: 'Roma', 
        arquivo: 'roma2024.json',
        url: 'roma.html' 
    },
    'barcelona2024': { 
        nome: 'Barcelona', 
        arquivo: 'barcelona2024.json',
        url: 'barcelona.html' 
    }
};

// Função para determinar o roteiro atual baseado na URL
function getCurrentRoteiro() {
    const page = window.location.pathname.split('/').pop();
    for (const [key, value] of Object.entries(roteiros)) {
        if (value.url === page || (page === '' && key === 'paris2025')) {
            return key;
        }
    }
    return 'paris2025'; // default
}

// Função para carregar dados do JSON
async function carregarRoteiro(roteiroId = null) {
    if (!roteiroId) {
        roteiroId = getCurrentRoteiro();
    }
    
    try {
        const response = await fetch(`assets/roteiros/${roteiros[roteiroId].arquivo}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        roteiroData = await response.json();
        currentRoteiro = roteiroId;
        renderizarPagina();
    } catch (error) {
        console.error('Erro ao carregar roteiro:', error);
        // Fallback para dados estáticos se JSON não existir
        carregarDadosEstaticos();
    }
}

// Fallback para dados estáticos (apenas Paris por enquanto)
function carregarDadosEstaticos() {
    roteiroData = {
        meta: {
            titulo: "Roteiro Paris 2025",
            subtitulo: "24 a 30 de Setembro • Checklist Prática",
            icone: "fas fa-map-marked-alt",
            cidade: "Paris"
        },
        estatisticas: [
            { numero: "7", label: "Dias em Paris" },
            { numero: "8", label: "Agendamentos" },
            { numero: "€400", label: "Orçamento Estimado" },
            { numero: "25+", label: "Atrações" }
        ]
    };
    renderizarPagina();
}

// Função para renderizar toda a página
function renderizarPagina() {
    if (!roteiroData) return;
    
    renderizarNavegacao();
    renderizarHeader();
    renderizarEstatisticas();
    renderizarLegenda();
    renderizarDias();
    renderizarOrcamento();
    renderizarDicas();
    
    // Inicializar funcionalidades
    inicializarCheckboxes();
    inicializarModais();
}

// Função para renderizar navegação
function renderizarNavegacao() {
    const nav = document.querySelector('.navigation');
    if (!nav) return;
    
    let html = '<div class="nav-links">';
    
    for (const [key, roteiro] of Object.entries(roteiros)) {
        const activeClass = key === currentRoteiro ? 'active' : '';
        html += `<a href="${roteiro.url}" class="nav-btn ${activeClass}">${roteiro.nome}</a>`;
    }
    
    html += '</div>';
    nav.innerHTML = html;
}

// Função para renderizar header
function renderizarHeader() {
    const header = document.querySelector('.header');
    if (!header || !roteiroData.meta) return;
    
    header.innerHTML = `
        <h1><i class="${roteiroData.meta.icone}"></i> ${roteiroData.meta.titulo}</h1>
        <p>${roteiroData.meta.subtitulo}</p>
    `;
}

// Função para renderizar estatísticas
function renderizarEstatisticas() {
    const statsContainer = document.querySelector('.summary-stats');
    if (!statsContainer || !roteiroData.estatisticas) return;
    
    let html = '';
    roteiroData.estatisticas.forEach(stat => {
        html += `
            <div class="stat-card">
                <div class="stat-number">${stat.numero}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `;
    });
    
    statsContainer.innerHTML = html;
}

// Função para renderizar legenda
function renderizarLegenda() {
    const legendContainer = document.querySelector('.legend');
    if (!legendContainer || !roteiroData.legenda) return;
    
    let html = `
        <h3><i class="fas fa-info-circle"></i> Legenda</h3>
        <div class="legend-grid">
    `;
    
    roteiroData.legenda.forEach(item => {
        html += `
            <div class="legend-item">
                <i class="${item.icone}"></i> ${item.texto}
            </div>
        `;
    });
    
    html += '</div>';
    legendContainer.innerHTML = html;
}

// Função para renderizar dias
function renderizarDias() {
    const diasContainer = document.querySelector('.dias-container');
    if (!diasContainer || !roteiroData.dias) return;
    
    let html = '';
    
    roteiroData.dias.forEach(dia => {
        html += `
            <div class="day-card">
                <div class="day-header">
                    <h2>Dia ${dia.numero} - ${dia.titulo}</h2>
                    <div class="date-info">${dia.data} • ${dia.diaSemana}</div>
                </div>
                <div class="activities">
        `;
        
        dia.atividades.forEach(atividade => {
            html += renderizarAtividade(atividade);
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    diasContainer.innerHTML = html;
}

// Função para renderizar uma atividade
function renderizarAtividade(atividade) {
    let detailsHtml = '';
    
    // Adicionar duração
    if (atividade.duracao) {
        detailsHtml += `<span class="activity-duration">${atividade.duracao}</span>`;
    }
    
    // Adicionar preço
    if (atividade.preco) {
        detailsHtml += `<span class="price">${atividade.preco}</span>`;
    }
    
    // Adicionar reserva
    if (atividade.reservado && atividade.reservaLink) {
        detailsHtml += `<a href="${atividade.reservaLink}" target="_blank" class="reserved-btn">✓ Reservado</a>`;
    }
    
    // Adicionar reserva obrigatória
    if (atividade.reservaObrigatoria) {
        detailsHtml += `<span class="booking-required">⏰ Reservar</span>`;
    }
    
    // Adicionar aviso especial
    if (atividade.avisoEspecial) {
        detailsHtml += `<span class="booking-required">${atividade.avisoEspecial}</span>`;
    }
    
    // Adicionar botão info
    if (atividade.infoId) {
        detailsHtml += `<button class="info-btn" onclick="showInfo('${atividade.infoId}')">Info</button>`;
    } else {
        detailsHtml += `<button class="info-btn" disabled>Info</button>`;
    }
    
    return `
        <div class="activity">
            <input type="checkbox" class="activity-checkbox">
            <span class="activity-time">${atividade.horario}</span>
            <span class="activity-icon">${atividade.icone}</span>
            <span class="activity-text">${atividade.texto}</span>
            <div class="activity-details">
                ${detailsHtml}
            </div>
        </div>
    `;
}

// Função para renderizar orçamento
function renderizarOrcamento() {
    const budgetContainer = document.querySelector('.budget-section');
    if (!budgetContainer || !roteiroData.orcamento) return;
    
    // Para simplificar, vamos apenas mostrar os totais por enquanto
    const totalPessoa = roteiroData.orcamento.pessoa?.totalGeral || '€0';
    const totalCasal = roteiroData.orcamento.casal?.totalGeral || '€0';
    
    let html = `
        <h3><i class="fas fa-calculator"></i> Orçamento Detalhado</h3>
        
        <div class="budget-toggle">
            <button class="toggle-btn active" onclick="toggleBudget('pessoa')">Por Pessoa</button>
            <button class="toggle-btn" onclick="toggleBudget('casal')">Para Casal</button>
        </div>

        <div style="text-align: center; margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #2c3e50, #34495e); color: white; border-radius: 15px;">
            <h4 style="margin-bottom: 10px;">
                <i class="fas fa-calculator"></i> 
                <span id="total-label">Total por Pessoa</span>
            </h4>
            <div style="font-size: 2rem; font-weight: bold;" id="total-amount">${totalPessoa}</div>
            <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">*Valores estimados, sem hospedagem</div>
        </div>
    `;
    
    budgetContainer.innerHTML = html;
}

// Função para renderizar dicas
function renderizarDicas() {
    const dicasContainer = document.querySelector('.dicas-container');
    if (!dicasContainer || !roteiroData.dicas) return;
    
    let html = `
        <div class="legend">
            <h3><i class="fas fa-lightbulb"></i> Dicas Importantes</h3>
            <div style="margin-top: 15px; text-align: left;">
    `;
    
    roteiroData.dicas.forEach(dica => {
        html += `<p><strong>${dica}</strong></p>`;
    });
    
    html += `
            </div>
        </div>
    `;
    
    dicasContainer.innerHTML = html;
}

// Função para inicializar checkboxes
function inicializarCheckboxes() {
    const checkboxes = document.querySelectorAll('.activity-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const activity = this.closest('.activity');
            if (this.checked) {
                activity.classList.add('completed');
            } else {
                activity.classList.remove('completed');
            }
            
            // Salvar estado no localStorage
            saveProgress();
        });
    });
    
    // Carregar progresso salvo
    loadProgress();
}

// Função para salvar progresso
function saveProgress() {
    const checkboxes = document.querySelectorAll('.activity-checkbox');
    const progress = [];
    
    checkboxes.forEach((checkbox, index) => {
        progress[index] = checkbox.checked;
    });
    
    localStorage.setItem(`roteiro_${currentRoteiro}`, JSON.stringify(progress));
}

// Função para carregar progresso
function loadProgress() {
    const saved = localStorage.getItem(`roteiro_${currentRoteiro}`);
    if (saved) {
        const progress = JSON.parse(saved);
        const checkboxes = document.querySelectorAll('.activity-checkbox');
        
        checkboxes.forEach((checkbox, index) => {
            if (progress[index]) {
                checkbox.checked = true;
                checkbox.closest('.activity').classList.add('completed');
            }
        });
    }
}

// Função para toggle do orçamento
function toggleBudget(type) {
    const totalLabel = document.getElementById('total-label');
    const totalAmount = document.getElementById('total-amount');
    const buttons = document.querySelectorAll('.toggle-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (type === 'pessoa') {
        totalLabel.textContent = 'Total por Pessoa';
        totalAmount.textContent = roteiroData.orcamento.pessoa?.totalGeral || '€0';
        buttons[0].classList.add('active');
    } else {
        totalLabel.textContent = 'Total para Casal';
        totalAmount.textContent = roteiroData.orcamento.casal?.totalGeral || '€0';
        buttons[1].classList.add('active');
    }
}

// Função para inicializar modais
function inicializarModais() {
    const modal = document.getElementById('infoModal');
    const span = document.getElementsByClassName('close')[0];

    if (span) {
        span.onclick = function() {
            modal.style.display = 'none';
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Função para mostrar informações no modal
function showInfo(infoId) {
    const modal = document.getElementById('infoModal');
    const modalContent = document.getElementById('modalContent');
    
    if (!roteiroData.informacoes || !roteiroData.informacoes[infoId]) {
        modalContent.innerHTML = `
            <h3>Informação não disponível</h3>
            <p>Desculpe, as informações detalhadas para este local ainda não estão disponíveis.</p>
        `;
    } else {
        const info = roteiroData.informacoes[infoId];
        modalContent.innerHTML = formatarInformacao(info);
    }
    
    modal.style.display = 'block';
}

// Função para formatar informação do modal
function formatarInformacao(info) {
    let html = `<h3><i class="${info.icone}"></i> ${info.titulo}</h3>`;
    
    if (info.endereco) {
        html += `<p><strong>Endereço:</strong> ${info.endereco}</p>`;
    }
    
    if (info.metro) {
        html += `<p><strong>Metrô:</strong> ${info.metro}</p>`;
    }
    
    if (info.dicas && Array.isArray(info.dicas)) {
        html += `<p><strong>Dicas:</strong></p><ul>`;
        info.dicas.forEach(dica => {
            html += `<li>${dica}</li>`;
        });
        html += `</ul>`;
    }
    
    return html;
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    carregarRoteiro();
});