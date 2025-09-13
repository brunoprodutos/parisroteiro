// Roteiro Engine - Sistema unificado para todos os roteiros
let ROTEIRO_DATA = null;

// Função para inicializar com dados embutidos
function inicializarComDados() {
    // Usar dados embutidos se disponíveis
    if (typeof window !== 'undefined' && window.ROTEIRO_DATA) {
        console.log('Carregando dados embutidos no HTML');
        ROTEIRO_DATA = window.ROTEIRO_DATA;
        inicializarInterface();
        return ROTEIRO_DATA;
    }
    
    // Se não encontrar dados, mostrar erro
    console.error('Variável ROTEIRO_DATA não encontrada no HTML');
    document.getElementById('roteiro-titulo').textContent = 'Erro: Dados não encontrados';
    document.getElementById('roteiro-subtitulo').textContent = 'A variável ROTEIRO_DATA deve estar definida no HTML';
    return null;
}

// Função para inicializar toda a interface
function inicializarInterface() {
    if (!ROTEIRO_DATA) {
        console.error('Dados do roteiro não carregados');
        return;
    }
    
    inicializarElementosDinamicos();
    renderizarEstatisticas();
    renderizarLegenda();
    renderizarDias();
    renderizarOrcamento();
    renderizarDicas();
    inicializarCheckboxes();
    configurarModal();
    configurarNavegacao();
}

// Função para inicializar elementos dinâmicos da página
function inicializarElementosDinamicos() {
    // Atualizar título da página
    document.title = ROTEIRO_DATA.meta.titulo + ' - Checklist Prático';
    
    // Atualizar header
    document.getElementById('roteiro-icone').className = ROTEIRO_DATA.meta.icone;
    document.getElementById('roteiro-titulo').textContent = ROTEIRO_DATA.meta.titulo;
    document.getElementById('roteiro-subtitulo').textContent = ROTEIRO_DATA.meta.subtitulo;
}

// Função para configurar navegação ativa
function configurarNavegacao() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-btn');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Função para renderizar estatísticas
function renderizarEstatisticas() {
    const container = document.getElementById('estatisticas-container');
    let html = '';
    ROTEIRO_DATA.estatisticas.forEach(stat => {
        html += `
            <div class="stat-card">
                <div class="stat-number">${stat.numero}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Função para renderizar legenda
function renderizarLegenda() {
    const container = document.getElementById('legenda-container');
    let html = `
        <h3><i class="fas fa-info-circle"></i> Legenda</h3>
        <div class="legend-grid">
    `;
    ROTEIRO_DATA.legenda.forEach(item => {
        html += `
            <div class="legend-item">
                <i class="${item.icone}"></i> ${item.texto}
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

// Função para renderizar dias
function renderizarDias() {
    const container = document.getElementById('dias-container');
    let html = '';
    
    ROTEIRO_DATA.dias.forEach(dia => {
        html += `
            <div class="day-card">
                <div class="day-header">
                    <h2>Dia ${dia.numero} - ${dia.titulo}</h2>
                    <div class="date-info">${dia.data} • ${dia.diaSemana}</div>
                </div>
                <div class="activities">
        `;
        
        dia.atividades.forEach((atividade, atividadeIndex) => {
            let detailsHtml = '';
            
            if (atividade.duracao) {
                detailsHtml += `<span class="activity-duration">${atividade.duracao}</span>`;
            }
            
            if (atividade.preco) {
                detailsHtml += `<span class="price">${atividade.preco}</span>`;
            }
            
            if (atividade.reservado === true && atividade.reservaLink) {
                detailsHtml += `<a href="${atividade.reservaLink}" target="_blank" class="reserved-btn">✓ Reservado</a>`;
            } else if (atividade.reservado === false) {
                detailsHtml += `<button class="pending-btn">⚠ Reservar</button>`;
            }
            
            if (atividade.info) {
                const diaIndex = ROTEIRO_DATA.dias.findIndex(d => d.numero === dia.numero);
                detailsHtml += `<button class="info-btn" onclick="showInfoByIndex(${diaIndex}, ${atividadeIndex})">Info</button>`;
            } else {
                detailsHtml += `<button class="info-btn" disabled>Info</button>`;
            }
            
            html += `
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
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Função para renderizar orçamento
function renderizarOrcamento() {
    const container = document.getElementById('orcamento-container');
    container.innerHTML = `
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
            <div style="font-size: 2rem; font-weight: bold;" id="total-amount">${ROTEIRO_DATA.orcamento.pessoa.totalGeral}</div>
            <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">*Valores estimados, sem hospedagem</div>
        </div>
    `;
}

// Função para renderizar dicas
function renderizarDicas() {
    const container = document.getElementById('dicas-container');
    let html = `
        <div class="legend">
            <h3><i class="fas fa-lightbulb"></i> Dicas Importantes</h3>
            <div style="margin-top: 15px; text-align: left;">
    `;
    ROTEIRO_DATA.dicas.forEach(dica => {
        html += `<p><strong>${dica}</strong></p>`;
    });
    html += `</div></div>`;
    container.innerHTML = html;
}

// Função para toggle do orçamento
function toggleBudget(type) {
    const totalLabel = document.getElementById('total-label');
    const totalAmount = document.getElementById('total-amount');
    const buttons = document.querySelectorAll('.toggle-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (type === 'pessoa') {
        totalLabel.textContent = 'Total por Pessoa';
        totalAmount.textContent = ROTEIRO_DATA.orcamento.pessoa.totalGeral;
        buttons[0].classList.add('active');
    } else {
        totalLabel.textContent = 'Total para Casal';
        totalAmount.textContent = ROTEIRO_DATA.orcamento.casal.totalGeral;
        buttons[1].classList.add('active');
    }
}

// Função para checkboxes
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
            saveProgress();
        });
    });
    
    loadProgress();
}

function saveProgress() {
    const checkboxes = document.querySelectorAll('.activity-checkbox');
    const progress = Array.from(checkboxes).map(cb => cb.checked);
    const storageKey = 'roteiro_' + ROTEIRO_DATA.meta.titulo.toLowerCase().replace(/[^a-z0-9]/g, '_');
    localStorage.setItem(storageKey, JSON.stringify(progress));
}

function loadProgress() {
    const storageKey = 'roteiro_' + ROTEIRO_DATA.meta.titulo.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const saved = localStorage.getItem(storageKey);
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

// Função helper para acessar informações por índice
function showInfoByIndex(diaIndex, atividadeIndex) {
    const infoData = ROTEIRO_DATA.dias[diaIndex].atividades[atividadeIndex].info;
    showInfo(infoData);
}

// Função para exibir informações no modal
function showInfo(infoData) {
    const modalContent = document.getElementById('modalContent');
    const modal = document.getElementById('infoModal');
    
    // Construir HTML das informações
    let html = `<h3>${infoData.titulo}</h3>`;
    
    // Adicionar informações básicas se existirem
    if (infoData.endereco) html += `<p><strong>Endereço:</strong> ${infoData.endereco}</p>`;
    if (infoData.metro) html += `<p><strong>Metrô:</strong> ${infoData.metro}</p>`;
    if (infoData.especialidade) html += `<p><strong>Especialidade:</strong> ${infoData.especialidade}</p>`;
    if (infoData.precoMedio) html += `<p><strong>Preço médio:</strong> ${infoData.precoMedio}</p>`;
    if (infoData.entrada) html += `<p><strong>Entrada:</strong> ${infoData.entrada}</p>`;
    if (infoData.horarios) html += `<p><strong>Horários:</strong> ${infoData.horarios}</p>`;
    if (infoData.ingresso) html += `<p><strong>Ingresso:</strong> ${infoData.ingresso}</p>`;
    if (infoData.acesso) html += `<p><strong>Acesso:</strong> ${infoData.acesso}</p>`;
    if (infoData.estrategia) html += `<p><strong>Estratégia:</strong> ${infoData.estrategia}</p>`;
    if (infoData.objetivo) html += `<p><strong>Objetivo:</strong> ${infoData.objetivo}</p>`;
    if (infoData.orcamento) html += `<p><strong>Orçamento:</strong> ${infoData.orcamento}</p>`;
    if (infoData.terraco) html += `<p><strong>Terraço:</strong> ${infoData.terraco}</p>`;
    if (infoData.visita) html += `<p><strong>Visita:</strong> ${infoData.visita}</p>`;
    if (infoData.petitTrain) html += `<p><strong>Petit Train:</strong> ${infoData.petitTrain}</p>`;
    if (infoData.dica) html += `<p><strong>Dica:</strong> ${infoData.dica}</p>`;
    
    // Adicionar listas se existirem
    if (infoData.dicas && infoData.dicas.length > 0) {
        html += `<p><strong>Dicas:</strong></p><ul>`;
        infoData.dicas.forEach(dica => html += `<li>${dica}</li>`);
        html += `</ul>`;
    }
    
    if (infoData.pontosFoto && infoData.pontosFoto.length > 0) {
        html += `<p><strong>Pontos de foto:</strong></p><ul>`;
        infoData.pontosFoto.forEach(ponto => html += `<li>${ponto}</li>`);
        html += `</ul>`;
    }
    
    if (infoData.destaques && infoData.destaques.length > 0) {
        html += `<p><strong>Destaques:</strong></p><ul>`;
        infoData.destaques.forEach(destaque => html += `<li>${destaque}</li>`);
        html += `</ul>`;
    }
    
    if (infoData.vantagens && infoData.vantagens.length > 0) {
        html += `<p><strong>Vantagens:</strong></p><ul>`;
        infoData.vantagens.forEach(vantagem => html += `<li>${vantagem}</li>`);
        html += `</ul>`;
    }
    
    if (infoData.opcoes && infoData.opcoes.length > 0) {
        html += `<p><strong>Opções:</strong></p><ul>`;
        infoData.opcoes.forEach(opcao => html += `<li>${opcao}</li>`);
        html += `</ul>`;
    }
    
    if (infoData.atividades && infoData.atividades.length > 0) {
        html += `<p><strong>Atividades:</strong></p><ul>`;
        infoData.atividades.forEach(atividade => html += `<li>${atividade}</li>`);
        html += `</ul>`;
    }

    if (infoData.pontos && infoData.pontos.length > 0) {
        html += `<p><strong>Pontos:</strong></p><ul>`;
        infoData.pontos.forEach(ponto => html += `<li>${ponto}</li>`);
        html += `</ul>`;
    }
    
    // Inserir o HTML no modal e exibir
    modalContent.innerHTML = html;
    modal.style.display = 'block';
}

// Configuração do modal
function configurarModal() {
    const modal = document.getElementById('infoModal');
    const span = document.getElementsByClassName('close')[0];

    // Quando o usuário clica no X, fecha o modal
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // Quando o usuário clica fora do modal, fecha ele
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Auto-inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    inicializarComDados();
});