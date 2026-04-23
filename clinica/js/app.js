// ===== ESTADO GLOBAL =====
const APP = {
  perfil: 'admin',
  usuario: '',
  paginaAtual: ''
};

// ===== DADOS =====
const MEDICOS = [
  { id: 1, nome: 'Dr. Costa', esp: 'Clínica geral', ini: 'DC', av: 'av-green', modelo: 'percentual', percentual: 40, fixo: 0, vc: 0, cons: 18, prod: 4500, pago: false },
  { id: 2, nome: 'Dra. Lima', esp: 'Pediatria', ini: 'DL', av: 'av-blue', modelo: 'percentual', percentual: 45, fixo: 0, vc: 0, cons: 16, prod: 5200, pago: true },
  { id: 3, nome: 'Dr. Santos', esp: 'Ortopedia', ini: 'DS', av: 'av-amber', modelo: 'fixo_consulta', percentual: 0, fixo: 0, vc: 180, cons: 13, prod: 2340, pago: false }
];

const PACIENTES = [
  { id: 1, nome: 'Ana Melo', ini: 'AM', av: 'av-green', nasc: '12/03/1985', tel: '(21) 99234-5678', conv: 'Particular', medico: 'Dr. Costa', status: 'ativo' },
  { id: 2, nome: 'João Silva', ini: 'JS', av: 'av-blue', nasc: '07/11/1978', tel: '(21) 98765-4321', conv: 'Unimed', medico: 'Dra. Lima', status: 'ativo' },
  { id: 3, nome: 'Carla Pinto', ini: 'CP', av: 'av-amber', nasc: '29/06/1992', tel: '(21) 97654-3210', conv: 'Particular', medico: 'Dr. Costa', status: 'ativo' },
  { id: 4, nome: 'Rui Faria', ini: 'RF', av: 'av-coral', nasc: '15/09/1965', tel: '(24) 99123-0000', conv: 'SulAmérica', medico: 'Dr. Santos', status: 'inativo' },
  { id: 5, nome: 'Bia Nunes', ini: 'BN', av: 'av-green', nasc: '03/01/2000', tel: '(21) 98001-2233', conv: 'Particular', medico: 'Dra. Lima', status: 'ativo' },
  { id: 6, nome: 'Maria Ferreira', ini: 'MF', av: 'av-blue', nasc: '22/07/1955', tel: '(21) 97333-4455', conv: 'Unimed', medico: 'Dr. Santos', status: 'ativo' }
];

const CONSULTAS = [
  { id: 1, pac: 'Ana Melo', data: '14/04', hora: '08:30', medico: 'Dr. Costa', tipo: 'Particular', status: 'confirmado' },
  { id: 2, pac: 'João Silva', data: '14/04', hora: '09:00', medico: 'Dra. Lima', tipo: 'Unimed', status: 'confirmado' },
  { id: 3, pac: 'Carla Pinto', data: '14/04', hora: '09:30', medico: 'Dr. Costa', tipo: 'Particular', status: 'aguardando' },
  { id: 4, pac: 'Rui Faria', data: '15/04', hora: '09:00', medico: 'Dr. Santos', tipo: 'SulAmérica', status: 'pendente' },
  { id: 5, pac: 'Bia Nunes', data: '15/04', hora: '10:00', medico: 'Dra. Lima', tipo: 'Particular', status: 'confirmado' },
  { id: 6, pac: 'Maria Ferreira', data: '16/04', hora: '08:30', medico: 'Dr. Santos', tipo: 'Unimed', status: 'confirmado' }
];

const LANCAMENTOS = [
  { desc: 'Consulta — Ana Melo', sub: 'Dr. Costa', data: '14/04', cat: 'Consulta', tipo: 'receita', valor: 250 },
  { desc: 'Convênio Unimed — lote abril', sub: '', data: '12/04', cat: 'Convênio', tipo: 'receita', valor: 4800 },
  { desc: 'Compra de insumos', sub: 'Estoque', data: '10/04', cat: 'Insumos', tipo: 'despesa', valor: 1200 },
  { desc: 'Aluguel clínica', sub: '', data: '05/04', cat: 'Fixo', tipo: 'despesa', valor: 3500 },
  { desc: 'Consultas particulares — semana 1', sub: '', data: '07/04', cat: 'Consulta', tipo: 'receita', valor: 2100 }
];

const ESTOQUE = [
  { nome: 'Luvas descartáveis', cat: 'EPI', atual: 12, min: 100, un: 'un.' },
  { nome: 'Álcool 70%', cat: 'Higiene', atual: 2, min: 10, un: 'frascos' },
  { nome: 'Máscaras N95', cat: 'EPI', atual: 8, min: 50, un: 'un.' },
  { nome: 'Seringas 5ml', cat: 'Material', atual: 240, min: 100, un: 'un.' },
  { nome: 'Gazes estéreis', cat: 'Material', atual: 150, min: 80, un: 'pc.' },
  { nome: 'Termômetro digital', cat: 'Equipamento', atual: 5, min: 3, un: 'un.' }
];

let REP_HISTORICO = [
  { med: 'Dra. Lima', ref: 'Março 2026', valor: 2340, obs: 'Ref. março', data: '05/04/2026', forma: 'PIX' },
  { med: 'Dr. Costa', ref: 'Março 2026', valor: 1800, obs: '—', data: '05/04/2026', forma: 'TED' },
  { med: 'Dr. Santos', ref: 'Março 2026', valor: 2340, obs: '—', data: '06/04/2026', forma: 'PIX' }
];

const LEADS = [
  { id: 0, nome: 'Mariana Oliveira', tel: '(21) 99876-5432', ini: 'MO', av: 'av-green', status: 'ia',
    msgs: [
      { t: 'ia', txt: 'Olá! Sou a assistente da Clínica. Como posso ajudar?', time: '09:12' },
      { t: 'cl', txt: 'Oi! Quero marcar uma consulta com clínico geral', time: '09:13' },
      { t: 'ia', txt: 'Temos horários na quarta e quinta. Qual prefere?', time: '09:13' },
      { t: 'cl', txt: 'Quinta-feira fica ótimo', time: '09:14' },
      { t: 'ia', txt: 'Temos 09h ou 11h com Dr. Santos na quinta. Qual prefere?', time: '09:14' }
    ],
    agend: { data: '—', hora: '—', med: '—' }, hist: 'Interesse em consulta clínica geral.' },
  { id: 1, nome: 'Carlos Ramos', tel: '(21) 97123-4000', ini: 'CR', av: 'av-coral', status: 'human',
    msgs: [
      { t: 'ia', txt: 'Olá! Como posso ajudar?', time: '08:50' },
      { t: 'cl', txt: 'Preciso de atestado médico urgente!', time: '08:51' },
      { t: 'ia', txt: 'Atestados exigem avaliação presencial. Vou chamar nossa equipe.', time: '08:52' },
      { t: 'hu', txt: 'Oi Carlos! Temos consulta às 14h hoje. Confirma?', time: '08:55' }
    ],
    agend: { data: '—', hora: '—', med: '—' }, hist: 'Atestado urgente — escalado para humano.' },
  { id: 2, nome: 'Paula Tavares', tel: '(21) 98500-1122', ini: 'PT', av: 'av-blue', status: 'agendado',
    msgs: [
      { t: 'ia', txt: 'Olá! Como posso ajudar?', time: '08:10' },
      { t: 'cl', txt: 'Quero marcar retorno com Dra. Lima', time: '08:11' },
      { t: 'ia', txt: 'Tenho sexta 18/04 às 10h com Dra. Lima. Confirma?', time: '08:12' },
      { t: 'cl', txt: 'Sim, confirmo!', time: '08:12' },
      { t: 'ia', txt: 'Perfeito! Agendado: sexta 18/04 às 10h com Dra. Lima.', time: '08:13' }
    ],
    agend: { data: '18/04', hora: '10:00', med: 'Dra. Lima' }, hist: 'Retorno agendado com Dra. Lima.' },
  { id: 3, nome: 'Roberto Neves', tel: '(21) 96300-5544', ini: 'RN', av: 'av-amber', status: 'ia',
    msgs: [
      { t: 'ia', txt: 'Olá! Como posso ajudar?', time: '07:45' },
      { t: 'cl', txt: 'Quais convênios vocês aceitam?', time: '07:46' },
      { t: 'ia', txt: 'Aceitamos Unimed, SulAmérica, Bradesco Saúde e particular.', time: '07:46' }
    ],
    agend: { data: '—', hora: '—', med: '—' }, hist: 'Dúvida sobre convênios.' }
];

let curLead = 0;

// ===== HELPERS =====
function brl(v) { return 'R$ ' + Number(v).toLocaleString('pt-BR'); }
function calcRep(m) {
  if (m.modelo === 'percentual') return Math.round(m.prod * m.percentual / 100);
  if (m.modelo === 'fixo_consulta') return Math.round(m.cons * m.vc);
  return m.fixo;
}
function statusBadge(s) {
  const map = {
    confirmado: 'badge-green', aguardando: 'badge-amber', pendente: 'badge-gray',
    cancelado: 'badge-red', ativo: 'badge-green', inativo: 'badge-gray'
  };
  return `<span class="badge ${map[s] || 'badge-gray'}">${s.charAt(0).toUpperCase() + s.slice(1)}</span>`;
}
function estoqueStatus(item) {
  const pct = item.atual / item.min;
  if (pct < 0.2) return { label: 'Crítico', cls: 'badge-red' };
  if (pct < 1) return { label: 'Baixo', cls: 'badge-amber' };
  return { label: 'OK', cls: 'badge-green' };
}
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function $(id) { return document.getElementById(id); }

// ===== NAVEGAÇÃO =====
const PERFIS = {
  admin: {
    label: 'Admin', badge: 'badge-admin', user: 'Dr. Irmão (Gestor)',
    nav: ['dashboard', 'agenda', 'pacientes', 'financeiro', 'estoque', 'repasse', 'whatsapp', 'usuarios']
  },
  medico: {
    label: 'Médico', badge: 'badge-medico', user: 'Dr. Costa',
    nav: ['agenda', 'pacientes']
  },
  recepcao: {
    label: 'Recepção', badge: 'badge-recepcao', user: 'Recepção',
    nav: ['agenda', 'pacientes', 'financeiro', 'whatsapp']
  }
};

const NAV_LABELS = {
  dashboard: 'Painel geral', agenda: 'Agenda', pacientes: 'Pacientes',
  financeiro: 'Financeiro', estoque: 'Estoque', repasse: 'Repasse médico',
  whatsapp: 'WhatsApp CRM', usuarios: 'Usuários'
};

const NAV_ICONS = {
  dashboard: '<svg viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".7"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".4"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".4"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".4"/></svg>',
  agenda: '<svg viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.2"/><path d="M5 1v4M11 1v4M1 7h14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
  pacientes: '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.2"/><path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
  financeiro: '<svg viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.2"/><path d="M1 7h14" stroke="currentColor" stroke-width="1.2"/><circle cx="5" cy="11" r="1" fill="currentColor"/></svg>',
  estoque: '<svg viewBox="0 0 16 16" fill="none"><rect x="2" y="8" width="12" height="6" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M5 8V5.5a3 3 0 016 0V8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
  repasse: '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="currentColor" stroke-width="1.2"/><path d="M2 14c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
  whatsapp: '<svg viewBox="0 0 16 16" fill="none"><path d="M14 8c0 3.314-2.686 5-6 5a7 7 0 01-3-.67L2 13l.8-2.5A4.9 4.9 0 012 8c0-3.314 2.686-5 6-5s6 1.686 6 5z" stroke="currentColor" stroke-width="1.2"/></svg>',
  usuarios: '<svg viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5" r="2.5" stroke="currentColor" stroke-width="1.2"/><path d="M1 13c0-2.761 2.239-4 5-4s5 1.239 5 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M11 7.5l1.5 1.5L15 6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

function buildNav() {
  const p = PERFIS[APP.perfil];
  $('sb-user').textContent = p.user;
  const badge = $('sb-badge');
  badge.textContent = p.label;
  badge.className = 'sb-badge ' + p.badge;
  $('nav-list').innerHTML = p.nav.map(id => `
    <div class="nav-item" id="ni-${id}" onclick="navTo('${id}')">
      ${NAV_ICONS[id]} ${NAV_LABELS[id]}
    </div>`).join('');
}

function navTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const pg = $('pg-' + page);
  if (pg) pg.classList.add('active');
  const ni = $('ni-' + page);
  if (ni) ni.classList.add('active');
  APP.paginaAtual = page;
  renderPage(page);
}

function renderPage(page) {
  if (page === 'dashboard') renderDashboard();
  if (page === 'agenda') renderAgenda();
  if (page === 'pacientes') renderPacientes();
  if (page === 'financeiro') renderFinanceiro();
  if (page === 'estoque') renderEstoque();
  if (page === 'repasse') renderRepasse();
  if (page === 'whatsapp') { renderLeads(); renderChat(curLead); }
  if (page === 'usuarios') renderUsuarios();
}

// ===== LOGIN =====
function selectPerfil(el, perfil) {
  document.querySelectorAll('.perfil-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  APP.perfil = perfil;
  const emails = { admin: 'admin@clinica.com', medico: 'dr.costa@clinica.com', recepcao: 'recepcao@clinica.com' };
  $('login-email').value = emails[perfil];
}

function doLogin() {
  $('pg-login').style.display = 'none';
  $('app-layout').style.display = 'flex';
  buildNav();
  const firstPage = PERFIS[APP.perfil].nav[0];
  navTo(firstPage);
}

function doLogout() {
  $('app-layout').style.display = 'none';
  $('pg-login').style.display = 'flex';
  APP.perfil = 'admin';
  document.querySelectorAll('.perfil-btn').forEach(b => b.classList.remove('selected'));
  document.querySelector('.perfil-btn').classList.add('selected');
  $('login-email').value = 'admin@clinica.com';
}

// ===== DASHBOARD =====
function renderDashboard() {
  const isAdmin = APP.perfil === 'admin';
  $('dash-fin').style.display = isAdmin ? 'block' : 'none';
  $('dash-repasse').style.display = isAdmin ? 'block' : 'none';
  $('dash-crm').style.display = (isAdmin || APP.perfil === 'recepcao') ? 'block' : 'none';

  $('dash-consultas-body').innerHTML = CONSULTAS.slice(0, 4).map(c => `
    <tr><td>${c.pac}</td><td>${c.hora}</td><td>${c.medico}</td><td>${statusBadge(c.status)}</td></tr>`).join('');

  if (isAdmin) {
    let pend = 0;
    $('dash-repasse-body').innerHTML = MEDICOS.map(m => {
      const v = calcRep(m);
      if (!m.pago) pend += v;
      return `<div class="fin-row">
        <div class="flex-row"><div class="avatar ${m.av}">${m.ini}</div>${m.nome}</div>
        <span style="color:${m.pago ? 'var(--green)' : 'var(--amber)'}; font-weight:500">${m.pago ? 'Pago' : brl(v) + ' pendente'}</span>
      </div>`;
    }).join('');
  }
}

// ===== AGENDA =====
function renderAgenda() {
  const isAll = APP.perfil !== 'medico';
  const isAdmin = APP.perfil === 'admin';
  $('agenda-sub').textContent = isAll ? 'Todas as consultas agendadas' : 'Apenas suas consultas';
  // Botão nova consulta: só admin
  $('btn-nova-consulta').style.display = isAdmin ? 'inline-block' : 'none';
  const rows = isAll ? CONSULTAS : CONSULTAS.filter(c => c.medico === 'Dr. Costa');
  $('agenda-body').innerHTML = rows.map(c => `
    <tr>
      <td>${c.pac}</td><td>${c.data}</td><td>${c.hora}</td>
      <td>${c.medico}</td><td>${c.tipo}</td><td>${statusBadge(c.status)}</td>
    </tr>`).join('');
}

// ===== PACIENTES =====
function renderPacientes() {
  const isAll = APP.perfil !== 'medico';
  const isAdmin = APP.perfil === 'admin';
  $('pacientes-sub').textContent = isAll ? 'Cadastro e histórico' : 'Apenas seus pacientes';
  $('btn-novo-paciente').style.display = isAdmin ? 'inline-block' : 'none';
  const rows = isAll ? PACIENTES : PACIENTES.filter(p => p.medico === 'Dr. Costa');
  renderPacientesRows(rows);
}

function renderPacientesRows(rows) {
  $('pacientes-body').innerHTML = rows.map(p => `
    <tr>
      <td><div class="flex-row"><div class="avatar ${p.av}">${p.ini}</div><strong>${p.nome}</strong></div></td>
      <td>${p.nasc}</td><td>${p.tel}</td><td>${p.conv}</td><td>${p.medico}</td>
      <td>${statusBadge(p.status)}</td>
    </tr>`).join('');
}

function buscarPaciente(q) {
  const isAll = APP.perfil !== 'medico';
  let rows = isAll ? PACIENTES : PACIENTES.filter(p => p.medico === 'Dr. Costa');
  if (q) rows = rows.filter(p => p.nome.toLowerCase().includes(q.toLowerCase()));
  renderPacientesRows(rows);
}

// ===== FINANCEIRO =====
function renderFinanceiro() {
  const isAdmin = APP.perfil === 'admin';
  $('fin-metrics').style.display = isAdmin ? 'grid' : 'none';
  $('fin-banner').style.display = isAdmin ? 'none' : 'block';
  $('fin-body').innerHTML = LANCAMENTOS.map(l => `
    <tr>
      <td><div class="fin-desc">${l.desc}</div><div class="fin-sub">${l.sub || l.data}</div></td>
      <td>${l.data}</td>
      <td><span class="badge badge-gray">${l.cat}</span></td>
      <td style="font-weight:600;color:${l.tipo === 'receita' ? 'var(--green)' : 'var(--red)'}">
        ${l.tipo === 'receita' ? '+' : '−'} ${brl(l.valor)}
      </td>
    </tr>`).join('');
}

function salvarLancamento() {
  const desc = $('lan-desc').value;
  const valor = parseFloat($('lan-valor').value) || 0;
  const tipo = $('lan-tipo').value;
  const data = $('lan-data').value;
  const cat = $('lan-cat').value;
  if (!desc || !valor) return;
  LANCAMENTOS.unshift({ desc, sub: '', data: new Date(data).toLocaleDateString('pt-BR').slice(0, 5), cat, tipo, valor });
  closeModal('modal-lancamento');
  renderFinanceiro();
}

// ===== ESTOQUE =====
function renderEstoque() {
  $('estoque-body').innerHTML = ESTOQUE.map((item, i) => {
    const st = estoqueStatus(item);
    const pct = Math.min(100, Math.round((item.atual / item.min) * 100));
    return `<tr>
      <td><strong>${item.nome}</strong></td>
      <td><span class="badge badge-blue">${item.cat}</span></td>
      <td>${item.atual} ${item.un}</td>
      <td>${item.min}</td>
      <td>
        <span class="badge ${st.cls}">${st.label}</span>
        <div class="progress-bar" style="width:80px"><div class="progress-fill" style="width:${pct}%;background:${pct < 20 ? 'var(--red)' : pct < 100 ? 'var(--amber)' : 'var(--green)'}"></div></div>
      </td>
      <td><button class="btn btn-sm" onclick="abrirReposicao(${i})">Repor</button></td>
    </tr>`;
  }).join('');
}

let estoqueIdx = -1;
function abrirReposicao(i) {
  estoqueIdx = i;
  $('rep-item-nome').textContent = ESTOQUE[i].nome;
  $('rep-quantidade').value = '';
  openModal('modal-reposicao');
}
function salvarReposicao() {
  const qtd = parseInt($('rep-quantidade').value) || 0;
  if (estoqueIdx >= 0 && qtd > 0) ESTOQUE[estoqueIdx].atual += qtd;
  closeModal('modal-reposicao');
  renderEstoque();
}

// ===== REPASSE =====
function renderRepasse() {
  renderRepMetrics();
  renderRepBody();
  renderCfgCards();
  renderRepHist();
}

function renderRepMetrics() {
  let total = 0, pago = 0;
  MEDICOS.forEach(m => { const v = calcRep(m); total += v; if (m.pago) pago += v; });
  $('rep-total').textContent = brl(total);
  $('rep-pago').textContent = brl(pago);
  $('rep-pendente').textContent = brl(total - pago);
}

function renderRepBody() {
  const mlabel = m => m.modelo === 'percentual' ? `${m.percentual}% produção` : m.modelo === 'fixo_consulta' ? `${brl(m.vc)}/consulta` : 'Fixo mensal';
  $('rep-body').innerHTML = MEDICOS.map(m => {
    const v = calcRep(m);
    return `<tr>
      <td><div class="flex-row"><div class="avatar ${m.av}">${m.ini}</div><strong>${m.nome}</strong></div></td>
      <td style="color:var(--text-muted)">${m.esp}</td>
      <td>${m.cons}</td>
      <td><span class="badge badge-gray">${mlabel(m)}</span></td>
      <td style="font-weight:600;color:var(--green)">${brl(v)}</td>
      <td><span class="badge ${m.pago ? 'badge-green' : 'badge-amber'}">${m.pago ? 'Pago' : 'Pendente'}</span></td>
      <td>${m.pago ? '—' : `<button class="btn btn-primary btn-sm" onclick="pagarDireto(${m.id - 1})">Pagar</button>`}</td>
    </tr>`;
  }).join('');
}

function renderCfgCards() {
  $('cfg-cards').innerHTML = MEDICOS.map((m, i) => {
    const v = calcRep(m);
    const inps = m.modelo === 'percentual'
      ? `<div class="cfg-row"><span class="cfg-label">Percentual (%)</span><input class="cfg-input" type="number" min="0" max="100" value="${m.percentual}" oninput="upPct(${i},this.value)"><span style="font-size:11px;color:var(--text-muted)">sobre produção bruta</span></div>`
      : m.modelo === 'fixo_consulta'
      ? `<div class="cfg-row"><span class="cfg-label">Valor por consulta (R$)</span><input class="cfg-input" type="number" min="0" value="${m.vc}" oninput="upVC(${i},this.value)"><span style="font-size:11px;color:var(--text-muted)">× ${m.cons} consultas</span></div>`
      : `<div class="cfg-row"><span class="cfg-label">Valor fixo mensal (R$)</span><input class="cfg-input" type="number" min="0" value="${m.fixo}" oninput="upFx(${i},this.value)"></div>`;
    return `<div class="cfg-card">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:13px">
        <div class="flex-row"><div class="avatar ${m.av}" style="width:36px;height:36px;font-size:13px">${m.ini}</div>
          <div><strong>${m.nome}</strong><div style="font-size:12px;color:var(--text-muted)">${m.esp}</div></div></div>
        <span class="badge badge-teal">A pagar: <span id="cv-${i}">${brl(v)}</span></span>
      </div>
      <div class="cfg-row"><span class="cfg-label">Modelo</span>
        <select class="cfg-select" onchange="chMod(${i},this.value)">
          <option value="percentual" ${m.modelo === 'percentual' ? 'selected' : ''}>% da produção</option>
          <option value="fixo_consulta" ${m.modelo === 'fixo_consulta' ? 'selected' : ''}>Fixo por consulta</option>
          <option value="fixo_mensal" ${m.modelo === 'fixo_mensal' ? 'selected' : ''}>Fixo mensal</option>
        </select></div>
      ${inps}
      <div class="stats-row">
        <div class="stat-box"><div class="stat-label">Consultas</div><div class="stat-val">${m.cons}</div></div>
        <div class="stat-box"><div class="stat-label">Produção bruta</div><div class="stat-val" style="font-size:12px">${brl(m.prod)}</div></div>
        <div class="stat-box"><div class="stat-label">A pagar</div><div class="stat-val" style="color:var(--green);font-size:12px" id="cs-${i}">${brl(v)}</div></div>
      </div></div>`;
  }).join('');
}

function renderRepHist() {
  $('rep-hist-body').innerHTML = REP_HISTORICO.map(h => `
    <tr>
      <td><strong>${h.med}</strong></td><td>${h.ref}</td>
      <td style="color:var(--green);font-weight:600">${brl(h.valor)}</td>
      <td style="color:var(--text-muted)">${h.obs}</td>
      <td>${h.data}</td>
      <td><span class="badge badge-blue">${h.forma}</span></td>
    </tr>`).join('');
}

function updCfg(i) {
  const v = calcRep(MEDICOS[i]);
  [$(`cv-${i}`),$(`cs-${i}`)].forEach(el => { if(el) el.textContent = brl(v); });
  renderRepMetrics(); renderRepBody();
}
function chMod(i, v) { MEDICOS[i].modelo = v; renderCfgCards(); renderRepBody(); renderRepMetrics(); }
function upPct(i, v) { MEDICOS[i].percentual = parseInt(v) || 0; updCfg(i); }
function upVC(i, v) { MEDICOS[i].vc = parseInt(v) || 0; updCfg(i); }
function upFx(i, v) { MEDICOS[i].fixo = parseInt(v) || 0; updCfg(i); }

function selRepTab(id, el) {
  document.querySelectorAll('.rep-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.rep-section').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  $('rep-sec-' + id).classList.add('active');
}

function abrirModalPagamento() {
  const sel = $('rm-medico');
  sel.innerHTML = '<option value="">Selecione...</option>' + MEDICOS.map((m, i) => `<option value="${i}">${m.nome}</option>`).join('');
  $('rm-data').value = new Date().toISOString().split('T')[0];
  $('rm-valor').value = '';
  $('rm-obs').value = '';
  openModal('modal-pagamento');
}
function pagarDireto(i) {
  const sel = $('rm-medico');
  sel.innerHTML = '<option value="">Selecione...</option>' + MEDICOS.map((m, j) => `<option value="${j}">${m.nome}</option>`).join('');
  sel.value = i;
  $('rm-valor').value = calcRep(MEDICOS[i]);
  $('rm-data').value = new Date().toISOString().split('T')[0];
  $('rm-obs').value = '';
  openModal('modal-pagamento');
}
function preencherValorRep() {
  const i = parseInt($('rm-medico').value);
  if (!isNaN(i)) $('rm-valor').value = calcRep(MEDICOS[i]);
}
function confirmarPagamento() {
  const i = parseInt($('rm-medico').value);
  if (isNaN(i)) return;
  const v = parseFloat($('rm-valor').value) || 0;
  const ref = $('rm-ref').value;
  const data = new Date($('rm-data').value).toLocaleDateString('pt-BR');
  const forma = $('rm-forma').value;
  const obs = $('rm-obs').value || '—';
  MEDICOS[i].pago = true;
  REP_HISTORICO.unshift({ med: MEDICOS[i].nome, ref, valor: v, obs, data, forma });
  closeModal('modal-pagamento');
  renderRepasse();
}

// ===== WHATSAPP CRM =====
const DOT_COLORS = { ia: '#1D9E75', human: '#E24B4A', agendado: '#378ADD' };

function renderLeads() {
  $('leads-list').innerHTML = LEADS.map((l, i) => `
    <div class="lead-item ${i === curLead ? 'active' : ''}" onclick="selLead(${i})">
      <div class="lead-dot" style="background:${DOT_COLORS[l.status] || '#888'}"></div>
      <div style="flex:1;min-width:0">
        <div class="lead-name">${l.nome}</div>
        <div class="lead-preview">${l.msgs[l.msgs.length - 1].txt}</div>
      </div>
      <div style="font-size:10px;color:var(--text-muted)">${l.msgs[l.msgs.length - 1].time}</div>
    </div>`).join('');
}

function selLead(i) { curLead = i; renderLeads(); renderChat(i); }

function renderChat(i) {
  const l = LEADS[i];
  $('chat-avatar').textContent = l.ini;
  $('chat-avatar').className = 'avatar ' + l.av;
  $('chat-name').textContent = l.nome;
  $('chat-phone').textContent = l.tel;
  $('i-nome').textContent = l.nome.split(' ').slice(0, 2).join(' ');
  $('i-tel').textContent = l.tel;
  $('i-data').textContent = l.agend.data;
  $('i-hora').textContent = l.agend.hora;
  $('i-med').textContent = l.agend.med;
  $('i-hist').textContent = l.hist;
  const pill = $('chat-status-pill');
  const escBtn = $('btn-escalate');
  if (l.status === 'human') {
    pill.textContent = 'Humano ativo'; pill.className = 'status-pill pill-human';
    escBtn.textContent = 'Devolver à IA'; escBtn.style.cssText = 'border-color:var(--green);color:var(--green-dark)';
  } else if (l.status === 'agendado') {
    pill.textContent = 'Agendado'; pill.className = 'status-pill pill-agendado';
    escBtn.textContent = 'Assumir'; escBtn.style.cssText = '';
  } else {
    pill.textContent = 'IA ativa'; pill.className = 'status-pill pill-ia';
    escBtn.textContent = 'Assumir'; escBtn.style.cssText = '';
  }
  const msgs = $('chat-msgs');
  msgs.innerHTML = l.msgs.map(m => {
    if (m.t === 'cl') return `<div style="display:flex;flex-direction:column;align-items:flex-end"><div class="msg msg-client">${m.txt}<div class="msg-time">${m.time}</div></div></div>`;
    if (m.t === 'hu') return `<div><div class="msg-label">Recepção</div><div class="msg msg-human">${m.txt}<div class="msg-time">${m.time}</div></div></div>`;
    return `<div><div class="msg-label">IA</div><div class="msg msg-ia">${m.txt}<div class="msg-time">${m.time}</div></div></div>`;
  }).join('');
  msgs.scrollTop = msgs.scrollHeight;
}

function escalateChat() {
  const l = LEADS[curLead];
  l.status = l.status === 'human' ? 'ia' : 'human';
  renderLeads(); renderChat(curLead);
}

function sendHumanMsg() {
  const inp = $('chat-input-field');
  const txt = inp.value.trim();
  if (!txt) return;
  const now = new Date();
  const time = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
  LEADS[curLead].msgs.push({ t: 'hu', txt, time });
  LEADS[curLead].status = 'human';
  inp.value = '';
  renderLeads(); renderChat(curLead);
}

// ===== USUÁRIOS (só admin) =====
let USUARIOS = [
  { id: 1, nome: 'Dr. Irmão', email: 'admin@clinica.com', perfil: 'admin', status: 'ativo', ultimo: '19/04/2026' },
  { id: 2, nome: 'Dr. Costa', email: 'dr.costa@clinica.com', perfil: 'medico', status: 'ativo', ultimo: '19/04/2026' },
  { id: 3, nome: 'Dra. Lima', email: 'dra.lima@clinica.com', perfil: 'medico', status: 'ativo', ultimo: '18/04/2026' },
  { id: 4, nome: 'Dr. Santos', email: 'dr.santos@clinica.com', perfil: 'medico', status: 'ativo', ultimo: '17/04/2026' },
  { id: 5, nome: 'Ana Recepção', email: 'recepcao@clinica.com', perfil: 'recepcao', status: 'ativo', ultimo: '19/04/2026' },
];
const PERFIL_LABELS = { admin: 'Admin', medico: 'Médico', recepcao: 'Recepção' };
const PERFIL_BADGE  = { admin: 'badge-teal', medico: 'badge-blue', recepcao: 'badge-amber' };

function renderUsuarios() {
  const el = document.getElementById('usuarios-body');
  if (!el) return;
  el.innerHTML = USUARIOS.map(u => `
    <tr>
      <td><div class="flex-row">
        <div class="avatar ${u.perfil==='admin'?'av-green':u.perfil==='medico'?'av-blue':'av-amber'}">
          ${u.nome.split(' ').map(p=>p[0]).join('').slice(0,2).toUpperCase()}
        </div>
        <div><strong>${u.nome}</strong><div style="font-size:11px;color:var(--text-muted)">${u.email}</div></div>
      </div></td>
      <td><span class="badge ${PERFIL_BADGE[u.perfil]}">${PERFIL_LABELS[u.perfil]}</span></td>
      <td>${u.ultimo}</td>
      <td><span class="badge ${u.status==='ativo'?'badge-green':'badge-gray'}">${u.status==='ativo'?'Ativo':'Inativo'}</span></td>
      <td><button class="btn btn-sm" onclick="toggleUsuario(${u.id})">${u.status==='ativo'?'Desativar':'Ativar'}</button></td>
    </tr>`).join('');
}

function toggleUsuario(id) {
  const u = USUARIOS.find(x => x.id === id);
  if (u) u.status = u.status === 'ativo' ? 'inativo' : 'ativo';
  renderUsuarios();
}

function salvarNovoUsuario() {
  const nome   = document.getElementById('nu-nome').value.trim();
  const email  = document.getElementById('nu-email').value.trim();
  const perfil = document.getElementById('nu-perfil').value;
  const senha  = document.getElementById('nu-senha').value;
  if (!nome || !email || !senha) { alert('Preencha todos os campos.'); return; }
  USUARIOS.push({ id: USUARIOS.length + 1, nome, email, perfil, status: 'ativo', ultimo: '—' });
  ['nu-nome','nu-email','nu-senha'].forEach(id => document.getElementById(id).value = '');
  closeModal('modal-novo-usuario');
  renderUsuarios();
}

// ===== WHATSAPP CONFIGURAÇÃO =====
let wppConectado = false;

function renderWhatsappConfig() {
  const box = document.getElementById('wpp-status-box');
  if (!box) return;
  if (wppConectado) {
    box.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <div style="width:10px;height:10px;border-radius:50%;background:var(--green)"></div>
        <span style="font-weight:600;color:var(--green)">WhatsApp conectado</span>
      </div>
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">Número: <strong>(21) 99999-0000</strong></p>
      <button class="btn btn-danger btn-sm" onclick="desconectarWpp()">Desconectar</button>`;
  } else {
    box.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <div style="width:10px;height:10px;border-radius:50%;background:var(--red)"></div>
        <span style="font-weight:600;color:var(--text-muted)">Não conectado</span>
      </div>
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:14px">
        Cadastre-se em <strong>z-api.io</strong>, crie uma instância e cole as credenciais abaixo.
      </p>
      <div class="form-group"><label class="form-label">Instance ID (Z-API)</label>
        <input class="form-input" id="zapi-instance" placeholder="Ex: 3C5F2A..."></div>
      <div class="form-group"><label class="form-label">Token Z-API</label>
        <input class="form-input" id="zapi-token" placeholder="Cole o token aqui" type="password"></div>
      <button class="btn btn-primary" style="margin-top:4px" onclick="conectarWpp()">Conectar WhatsApp</button>`;
  }
}

function conectarWpp() {
  const inst  = document.getElementById('zapi-instance');
  const token = document.getElementById('zapi-token');
  if (!inst || !inst.value.trim() || !token || !token.value.trim()) {
    alert('Preencha o Instance ID e o Token da Z-API.'); return;
  }
  wppConectado = true;
  renderWhatsappConfig();
}

function desconectarWpp() {
  wppConectado = false;
  renderWhatsappConfig();
}

// Patch: chamar config WhatsApp ao abrir página
const _origRenderPage = renderPage;
renderPage = function(page) {
  _origRenderPage(page);
  if (page === 'whatsapp') {
    const blk = document.getElementById('wpp-config-block');
    if (blk) blk.style.display = APP.perfil === 'admin' ? 'block' : 'none';
    renderWhatsappConfig();
  }
  if (page === 'usuarios') {
    const el = document.getElementById('total-usuarios');
    if (el) el.textContent = USUARIOS.length + ' usuário(s) cadastrado(s)';
    renderUsuarios();
  }
};
