// ===== ESTADO GLOBAL =====
const APP = {
  perfil: 'admin',
  usuario: '',
  medicoNome: '',   // nome do médico logado — usado para filtros
  paginaAtual: ''
};

// ===== HELPERS =====
function brl(v) {
  return 'R$ ' + Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

// BUG #1 FIX: Função esc() para prevenir XSS — toda saída em innerHTML passa por aqui
function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// BUG #2 FIX: Conversão de data sem bug de timezone (YYYY-MM-DD → DD/MM)
function isoToBR(isoStr) {
  if (!isoStr) return '—';
  const [y, m, d] = isoStr.split('-');
  return `${d}/${m}`;
}

// BUG #3 FIX: Formato completo sem timezone (YYYY-MM-DD → DD/MM/YYYY)
function isoToBRfull(isoStr) {
  if (!isoStr) return '—';
  const [y, m, d] = isoStr.split('-');
  return `${d}/${m}/${y}`;
}

function calcRep(m) {
  if (m.modelo === 'percentual')    return Math.round(m.prod * m.percentual / 100);
  if (m.modelo === 'fixo_consulta') return Math.round(m.cons * m.vc);
  return m.fixo;
}

function statusBadge(s) {
  const map = {
    confirmado: 'badge-green', aguardando: 'badge-amber', pendente: 'badge-gray',
    cancelado: 'badge-red', ativo: 'badge-green', inativo: 'badge-gray'
  };
  const label = s ? s.charAt(0).toUpperCase() + s.slice(1) : '—';
  return `<span class="badge ${map[s] || 'badge-gray'}">${esc(label)}</span>`;
}

// BUG #4 FIX: Divisão por zero quando min=0
function estoqueStatus(item) {
  if (!item.min || item.min === 0) return { label: 'OK', cls: 'badge-green' };
  const pct = item.atual / item.min;
  if (pct < 0.2) return { label: 'Crítico', cls: 'badge-red' };
  if (pct < 1)   return { label: 'Baixo',   cls: 'badge-amber' };
  return { label: 'OK', cls: 'badge-green' };
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}
function $(id) { return document.getElementById(id); }

// BUG #5 FIX: Toast de feedback — substitui alert() em todos os módulos
function toast(msg, type = 'success') {
  const existing = document.querySelectorAll('.cf-toast');
  existing.forEach(t => t.remove());
  const t = document.createElement('div');
  t.className = 'cf-toast';
  t.textContent = msg;
  const bg = type === 'error' ? '#A32D2D' : type === 'warning' ? '#854F0B' : '#0F6E56';
  t.style.cssText = `position:fixed;bottom:24px;right:24px;padding:12px 20px;border-radius:8px;
    font-size:13px;font-weight:500;color:#fff;background:${bg};z-index:9999;
    box-shadow:0 4px 16px rgba(0,0,0,.18);transition:opacity .3s;max-width:320px;line-height:1.4`;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
}

// BUG #6 FIX: Fechar modal clicando no backdrop
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('open')) {
    e.target.classList.remove('open');
  }
});

// BUG #7 FIX: Fechar modal com Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
});

// ===== DADOS DE DEMONSTRAÇÃO =====
// BUG #8 FIX: Trocado const→let nos arrays mutáveis; adicionado id em todos os items de estoque/lançamentos
let MEDICOS = [
  { id: 1, nome: 'Dr. Costa',  esp: 'Clínica geral', ini: 'DC', av: 'av-green',  modelo: 'percentual',    percentual: 40, fixo: 0, vc: 0,   cons: 18, prod: 4500, pago: false },
  { id: 2, nome: 'Dra. Lima',  esp: 'Pediatria',     ini: 'DL', av: 'av-blue',   modelo: 'percentual',    percentual: 45, fixo: 0, vc: 0,   cons: 16, prod: 5200, pago: true  },
  { id: 3, nome: 'Dr. Santos', esp: 'Ortopedia',     ini: 'DS', av: 'av-amber',  modelo: 'fixo_consulta', percentual: 0,  fixo: 0, vc: 180, cons: 13, prod: 2340, pago: false }
];
let PACIENTES = [
  { id: 1, nome: 'Ana Melo',       ini: 'AM', av: 'av-green', nasc: '12/03/1985', tel: '(21) 99234-5678', conv: 'Particular', medico: 'Dr. Costa',  status: 'ativo'   },
  { id: 2, nome: 'João Silva',     ini: 'JS', av: 'av-blue',  nasc: '07/11/1978', tel: '(21) 98765-4321', conv: 'Unimed',     medico: 'Dra. Lima',  status: 'ativo'   },
  { id: 3, nome: 'Carla Pinto',    ini: 'CP', av: 'av-amber', nasc: '29/06/1992', tel: '(21) 97654-3210', conv: 'Particular', medico: 'Dr. Costa',  status: 'ativo'   },
  { id: 4, nome: 'Rui Faria',      ini: 'RF', av: 'av-coral', nasc: '15/09/1965', tel: '(24) 99123-0000', conv: 'SulAmérica', medico: 'Dr. Santos', status: 'inativo' },
  { id: 5, nome: 'Bia Nunes',      ini: 'BN', av: 'av-green', nasc: '03/01/2000', tel: '(21) 98001-2233', conv: 'Particular', medico: 'Dra. Lima',  status: 'ativo'   },
  { id: 6, nome: 'Maria Ferreira', ini: 'MF', av: 'av-blue',  nasc: '22/07/1955', tel: '(21) 97333-4455', conv: 'Unimed',     medico: 'Dr. Santos', status: 'ativo'   }
];
let CONSULTAS = [
  { id: 1, pac: 'Ana Melo',       data: '14/04', hora: '08:30', medico: 'Dr. Costa',  tipo: 'Particular', status: 'confirmado' },
  { id: 2, pac: 'João Silva',     data: '14/04', hora: '09:00', medico: 'Dra. Lima',  tipo: 'Unimed',     status: 'confirmado' },
  { id: 3, pac: 'Carla Pinto',    data: '14/04', hora: '09:30', medico: 'Dr. Costa',  tipo: 'Particular', status: 'aguardando' },
  { id: 4, pac: 'Rui Faria',      data: '15/04', hora: '09:00', medico: 'Dr. Santos', tipo: 'SulAmérica', status: 'pendente'   },
  { id: 5, pac: 'Bia Nunes',      data: '15/04', hora: '10:00', medico: 'Dra. Lima',  tipo: 'Particular', status: 'confirmado' },
  { id: 6, pac: 'Maria Ferreira', data: '16/04', hora: '08:30', medico: 'Dr. Santos', tipo: 'Unimed',     status: 'confirmado' }
];
let LANCAMENTOS = [
  { id: 1, desc: 'Consulta — Ana Melo',              sub: 'Dr. Costa', data: '14/04', cat: 'Consulta', tipo: 'receita', valor: 250  },
  { id: 2, desc: 'Convênio Unimed — lote abril',      sub: '',          data: '12/04', cat: 'Convênio', tipo: 'receita', valor: 4800 },
  { id: 3, desc: 'Compra de insumos',                 sub: 'Estoque',   data: '10/04', cat: 'Insumos',  tipo: 'despesa', valor: 1200 },
  { id: 4, desc: 'Aluguel clínica',                   sub: '',          data: '05/04', cat: 'Fixo',     tipo: 'despesa', valor: 3500 },
  { id: 5, desc: 'Consultas particulares — semana 1', sub: '',          data: '07/04', cat: 'Consulta', tipo: 'receita', valor: 2100 }
];
let ESTOQUE = [
  { id: 1, nome: 'Luvas descartáveis', cat: 'EPI',         atual: 12,  min: 100, un: 'un.'    },
  { id: 2, nome: 'Álcool 70%',         cat: 'Higiene',     atual: 2,   min: 10,  un: 'frascos'},
  { id: 3, nome: 'Máscaras N95',       cat: 'EPI',         atual: 8,   min: 50,  un: 'un.'    },
  { id: 4, nome: 'Seringas 5ml',       cat: 'Material',    atual: 240, min: 100, un: 'un.'    },
  { id: 5, nome: 'Gazes estéreis',     cat: 'Material',    atual: 150, min: 80,  un: 'pc.'    },
  { id: 6, nome: 'Termômetro digital', cat: 'Equipamento', atual: 5,   min: 3,   un: 'un.'    }
];
let REP_HISTORICO = [
  { med: 'Dra. Lima',  ref: 'Março 2026', valor: 2340, obs: 'Ref. março', data: '05/04/2026', forma: 'PIX' },
  { med: 'Dr. Costa',  ref: 'Março 2026', valor: 1800, obs: '—',          data: '05/04/2026', forma: 'TED' },
  { med: 'Dr. Santos', ref: 'Março 2026', valor: 2340, obs: '—',          data: '06/04/2026', forma: 'PIX' }
];
let LEADS = [
  { id: 0, nome: 'Mariana Oliveira', tel: '(21) 99876-5432', ini: 'MO', av: 'av-green',
    status: 'ia', msgs: [
      { t: 'ia', txt: 'Olá! Sou a assistente da Clínica. Como posso ajudar?',     time: '09:12' },
      { t: 'cl', txt: 'Oi! Quero marcar uma consulta com clínico geral',           time: '09:13' },
      { t: 'ia', txt: 'Temos horários na quarta e quinta. Qual prefere?',          time: '09:13' },
      { t: 'cl', txt: 'Quinta-feira fica ótimo',                                   time: '09:14' },
      { t: 'ia', txt: 'Temos 09h ou 11h com Dr. Santos na quinta. Qual prefere?', time: '09:14' }
    ], agend: { data: '—', hora: '—', med: '—' }, hist: 'Interesse em consulta clínica geral.' },
  { id: 1, nome: 'Carlos Ramos', tel: '(21) 97123-4000', ini: 'CR', av: 'av-coral',
    status: 'human', msgs: [
      { t: 'ia', txt: 'Olá! Como posso ajudar?',                                      time: '08:50' },
      { t: 'cl', txt: 'Preciso de atestado médico urgente!',                           time: '08:51' },
      { t: 'ia', txt: 'Atestados exigem avaliação presencial. Vou chamar nossa equipe.', time: '08:52' },
      { t: 'hu', txt: 'Oi Carlos! Temos consulta às 14h hoje. Confirma?',             time: '08:55' }
    ], agend: { data: '—', hora: '—', med: '—' }, hist: 'Atestado urgente — escalado para humano.' },
  { id: 2, nome: 'Paula Tavares', tel: '(21) 98500-1122', ini: 'PT', av: 'av-blue',
    status: 'agendado', msgs: [
      { t: 'ia', txt: 'Olá! Como posso ajudar?',                          time: '08:10' },
      { t: 'cl', txt: 'Quero marcar retorno com Dra. Lima',                time: '08:11' },
      { t: 'ia', txt: 'Tenho sexta 18/04 às 10h com Dra. Lima. Confirma?', time: '08:12' },
      { t: 'cl', txt: 'Sim, confirmo!',                                    time: '08:12' },
      { t: 'ia', txt: 'Perfeito! Agendado: sexta 18/04 às 10h com Dra. Lima.', time: '08:13' }
    ], agend: { data: '18/04', hora: '10:00', med: 'Dra. Lima' }, hist: 'Retorno agendado com Dra. Lima.' },
  { id: 3, nome: 'Roberto Neves', tel: '(21) 96300-5544', ini: 'RN', av: 'av-amber',
    status: 'ia', msgs: [
      { t: 'ia', txt: 'Olá! Como posso ajudar?',                                 time: '07:45' },
      { t: 'cl', txt: 'Quais convênios vocês aceitam?',                           time: '07:46' },
      { t: 'ia', txt: 'Aceitamos Unimed, SulAmérica, Bradesco Saúde e particular.', time: '07:46' }
    ], agend: { data: '—', hora: '—', med: '—' }, hist: 'Dúvida sobre convênios.' }
];
let USUARIOS = [
  { id: 1, nome: 'Dr. Irmão',    email: 'admin@clinica.com',     perfil: 'admin',    status: 'ativo', ultimo: '23/04/2026' },
  { id: 2, nome: 'Dr. Costa',    email: 'dr.costa@clinica.com',  perfil: 'medico',   status: 'ativo', ultimo: '23/04/2026' },
  { id: 3, nome: 'Dra. Lima',    email: 'dra.lima@clinica.com',  perfil: 'medico',   status: 'ativo', ultimo: '22/04/2026' },
  { id: 4, nome: 'Dr. Santos',   email: 'dr.santos@clinica.com', perfil: 'medico',   status: 'ativo', ultimo: '21/04/2026' },
  { id: 5, nome: 'Ana Recepção', email: 'recepcao@clinica.com',  perfil: 'recepcao', status: 'ativo', ultimo: '23/04/2026' }
];

let curLead    = 0;
let estoqueId  = -1;  // BUG #9 FIX: usar ID em vez de índice de array
let wppConectado = false;

// ===== NAVEGAÇÃO =====
const PERFIS = {
  admin: {
    label: 'Admin', badge: 'badge-admin',
    nav: ['dashboard', 'agenda', 'pacientes', 'financeiro', 'estoque', 'repasse', 'whatsapp', 'usuarios']
  },
  medico: {
    label: 'Médico', badge: 'badge-medico',
    nav: ['agenda', 'pacientes']
  },
  recepcao: {
    label: 'Recepção', badge: 'badge-recepcao',
    nav: ['agenda', 'pacientes', 'financeiro', 'whatsapp']
  }
};
const NAV_LABELS = {
  dashboard: 'Painel geral', agenda: 'Agenda', pacientes: 'Pacientes',
  financeiro: 'Financeiro', estoque: 'Estoque', repasse: 'Repasse médico',
  whatsapp: 'WhatsApp CRM', usuarios: 'Usuários'
};
const NAV_ICONS = {
  dashboard:  '<svg viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".7"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".4"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".4"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".4"/></svg>',
  agenda:     '<svg viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.2"/><path d="M5 1v4M11 1v4M1 7h14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
  pacientes:  '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.2"/><path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
  financeiro: '<svg viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.2"/><path d="M1 7h14" stroke="currentColor" stroke-width="1.2"/><circle cx="5" cy="11" r="1" fill="currentColor"/></svg>',
  estoque:    '<svg viewBox="0 0 16 16" fill="none"><rect x="2" y="8" width="12" height="6" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M5 8V5.5a3 3 0 016 0V8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
  repasse:    '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="currentColor" stroke-width="1.2"/><path d="M2 14c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
  whatsapp:   '<svg viewBox="0 0 16 16" fill="none"><path d="M14 8c0 3.314-2.686 5-6 5a7 7 0 01-3-.67L2 13l.8-2.5A4.9 4.9 0 012 8c0-3.314 2.686-5 6-5s6 1.686 6 5z" stroke="currentColor" stroke-width="1.2"/></svg>',
  usuarios:   '<svg viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5" r="2.5" stroke="currentColor" stroke-width="1.2"/><path d="M1 13c0-2.761 2.239-4 5-4s5 1.239 5 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M11 7.5l1.5 1.5L15 6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

function buildNav() {
  const p = PERFIS[APP.perfil];
  // BUG #10 FIX: APP.usuario agora é preenchido no login; fallback para label do perfil
  $('sb-user').textContent = APP.usuario || p.label;
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

// BUG #11 FIX: switch/case substitui o monkey-patch frágil e os if-chain duplicados
function renderPage(page) {
  switch (page) {
    case 'dashboard':  renderDashboard();  break;
    case 'agenda':     renderAgenda();     break;
    case 'pacientes':  renderPacientes();  break;
    case 'financeiro': renderFinanceiro(); break;
    case 'estoque':    renderEstoque();    break;
    case 'repasse':    renderRepasse();    break;
    case 'whatsapp':
      const blk = $('wpp-config-block');
      if (blk) blk.style.display = APP.perfil === 'admin' ? 'block' : 'none';
      renderWhatsappConfig();
      renderLeads();
      renderChat(curLead);
      break;
    case 'usuarios':
      const el = $('total-usuarios');
      if (el) el.textContent = USUARIOS.length + ' usuário(s) cadastrado(s)';
      renderUsuarios();
      break;
  }
}

// ===== LOGIN (modo demo — sobrescrito por firebase.js quando configurado) =====
// BUG #12 FIX: doLogin agora valida campos e define APP.usuario
function doLogin() {
  const email = $('login-email').value.trim();
  const senha = $('login-senha').value;
  const erro  = $('login-erro');
  if (erro) erro.style.display = 'none';
  if (!email || !senha) {
    if (erro) { erro.textContent = 'Preencha e-mail e senha.'; erro.style.display = 'block'; }
    return;
  }
  const perfilMap = { admin: 'Dr. Irmão (Gestor)', medico: 'Dr. Costa', recepcao: 'Ana Recepção' };
  APP.usuario = perfilMap[APP.perfil] || APP.perfil;
  // BUG #13 FIX: medicoNome dinâmico (não mais hardcoded)
  APP.medicoNome = APP.perfil === 'medico' ? 'Dr. Costa' : '';
  $('pg-login').style.display = 'none';
  $('app-layout').style.display = 'flex';
  buildNav();
  navTo(PERFIS[APP.perfil].nav[0]);
}

function doLogout() {
  $('app-layout').style.display = 'none';
  $('pg-login').style.display = 'flex';
  APP.perfil = 'admin';
  APP.usuario = '';
  APP.medicoNome = '';
  document.querySelectorAll('.perfil-btn').forEach(b => b.classList.remove('selected'));
  document.querySelector('.perfil-btn').classList.add('selected');
  $('login-email').value = 'admin@clinica.com';
  $('login-senha').value = '';
  const erro = $('login-erro');
  if (erro) erro.style.display = 'none';
}

function selectPerfil(el, perfil) {
  document.querySelectorAll('.perfil-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  APP.perfil = perfil;
  const emails = { admin: 'admin@clinica.com', medico: 'dr.costa@clinica.com', recepcao: 'recepcao@clinica.com' };
  $('login-email').value = emails[perfil];
}

// BUG #14 FIX: Enter para fazer login
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const loginPage = $('pg-login');
    if (loginPage && loginPage.style.display !== 'none') {
      doLogin();
    }
  }
});

// ===== DASHBOARD =====
// BUG #15 FIX: Métricas calculadas dinamicamente — não mais hardcoded
function renderDashboard() {
  const isAdmin = APP.perfil === 'admin';
  $('dash-fin').style.display     = isAdmin ? 'block' : 'none';
  $('dash-repasse').style.display = isAdmin ? 'block' : 'none';
  $('dash-crm').style.display     = (isAdmin || APP.perfil === 'recepcao') ? 'block' : 'none';

  const totalPac    = PACIENTES.filter(p => p.status === 'ativo').length;
  const receitaMes  = LANCAMENTOS.filter(l => l.tipo === 'receita').reduce((a, l) => a + l.valor, 0);
  const despesaMes  = LANCAMENTOS.filter(l => l.tipo === 'despesa').reduce((a, l) => a + l.valor, 0);
  const leadsAbertos = LEADS.filter(l => l.status !== 'agendado').length;

  const elPac = $('dash-v-pacientes');
  const elRec = $('dash-v-receita');
  const elLds = $('dash-v-leads');
  const elCons = $('dash-v-consultas');
  if (elPac) elPac.textContent = totalPac;
  if (elRec) elRec.textContent = brl(receitaMes);
  if (elLds) elLds.textContent = leadsAbertos;
  if (elCons) elCons.textContent = CONSULTAS.length;

  $('dash-consultas-body').innerHTML = CONSULTAS.slice(0, 4).map(c => `
    <tr>
      <td>${esc(c.pac)}</td><td>${esc(c.hora)}</td>
      <td>${esc(c.medico)}</td><td>${statusBadge(c.status)}</td>
    </tr>`).join('');

  if (isAdmin) {
    // BUG #16 FIX: pend agora é exibido no dashboard
    let pendente = 0;
    $('dash-repasse-body').innerHTML = MEDICOS.map(m => {
      const v = calcRep(m);
      if (!m.pago) pendente += v;
      return `<div class="fin-row">
        <div class="flex-row"><div class="avatar ${m.av}">${esc(m.ini)}</div>${esc(m.nome)}</div>
        <span style="color:${m.pago ? 'var(--green)' : 'var(--amber)'};font-weight:500">
          ${m.pago ? 'Pago' : brl(v) + ' pendente'}
        </span>
      </div>`;
    }).join('');

    const elSaldo = $('dash-v-saldo');
    const elFinR  = $('dash-v-fin-receita');
    const elFinD  = $('dash-v-fin-despesa');
    const elPend  = $('dash-v-pendente');
    if (elSaldo) elSaldo.textContent = brl(receitaMes - despesaMes);
    if (elFinR)  elFinR.textContent  = '+ ' + brl(receitaMes);
    if (elFinD)  elFinD.textContent  = '− ' + brl(despesaMes);
    if (elPend)  elPend.textContent  = brl(pendente) + ' pendente';
  }
}

// ===== AGENDA =====
function renderAgenda() {
  const isAll   = APP.perfil !== 'medico';
  // BUG #17 FIX: botão Nova consulta visível para recepcao também
  const canAdd  = APP.perfil === 'admin' || APP.perfil === 'recepcao';
  $('agenda-sub').textContent = isAll ? 'Todas as consultas agendadas' : 'Apenas suas consultas';
  $('btn-nova-consulta').style.display = canAdd ? 'inline-block' : 'none';

  // BUG #18 FIX: filtro usa APP.medicoNome (dinâmico) em vez de 'Dr. Costa' hardcoded
  const rows = isAll ? CONSULTAS : CONSULTAS.filter(c => c.medico === APP.medicoNome);

  $('agenda-body').innerHTML = rows.length ? rows.map(c => `
    <tr>
      <td>${esc(c.pac)}</td><td>${esc(c.data)}</td><td>${esc(c.hora)}</td>
      <td>${esc(c.medico)}</td><td>${esc(c.tipo)}</td><td>${statusBadge(c.status)}</td>
      <td>
        <select class="badge badge-gray" style="border:none;background:transparent;cursor:pointer;font-size:11px"
          onchange="mudarStatusConsulta(${c.id}, this.value)">
          <option value="confirmado"  ${c.status==='confirmado' ?'selected':''}>Confirmado</option>
          <option value="aguardando"  ${c.status==='aguardando' ?'selected':''}>Aguardando</option>
          <option value="pendente"    ${c.status==='pendente'   ?'selected':''}>Pendente</option>
          <option value="cancelado"   ${c.status==='cancelado'  ?'selected':''}>Cancelado</option>
        </select>
      </td>
    </tr>`).join('')
    : '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:24px">Nenhuma consulta encontrada.</td></tr>';
}

// BUG #19 FIX: Modal de nova consulta agora tem handler e salva dados
function salvarConsulta() {
  const pac    = $('nc-pac').value.trim();
  const data   = $('nc-data').value;
  const hora   = $('nc-hora').value;
  const medico = $('nc-medico').value;
  const tipo   = $('nc-tipo').value;
  if (!pac || !data || !hora || !medico) {
    toast('Preencha paciente, data, horário e médico.', 'error'); return;
  }
  const newId = CONSULTAS.length ? Math.max(...CONSULTAS.map(c => c.id)) + 1 : 1;
  CONSULTAS.push({ id: newId, pac, data: isoToBR(data), hora, medico, tipo, status: 'confirmado' });
  closeModal('modal-consulta');
  renderAgenda();
  toast('Consulta agendada com sucesso!');
}

function mudarStatusConsulta(id, novoStatus) {
  const c = CONSULTAS.find(x => x.id === id);
  if (c) { c.status = novoStatus; renderAgenda(); }
}

// ===== PACIENTES =====
function renderPacientes() {
  const isAll  = APP.perfil !== 'medico';
  const canAdd = APP.perfil === 'admin' || APP.perfil === 'recepcao';
  $('pacientes-sub').textContent = isAll ? 'Cadastro e histórico' : 'Apenas seus pacientes';
  $('btn-novo-paciente').style.display = canAdd ? 'inline-block' : 'none';
  // BUG #20 FIX: filtro dinâmico
  const rows = isAll ? PACIENTES : PACIENTES.filter(p => p.medico === APP.medicoNome);
  renderPacientesRows(rows);
}

function renderPacientesRows(rows) {
  $('pacientes-body').innerHTML = rows.length ? rows.map(p => `
    <tr>
      <td><div class="flex-row">
        <div class="avatar ${p.av}">${esc(p.ini)}</div>
        <strong>${esc(p.nome)}</strong>
      </div></td>
      <td>${esc(p.nasc)}</td><td>${esc(p.tel)}</td>
      <td>${esc(p.conv)}</td><td>${esc(p.medico)}</td>
      <td>${statusBadge(p.status)}</td>
    </tr>`).join('')
    : '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px">Nenhum paciente encontrado.</td></tr>';
}

// BUG #21 FIX: busca por nome E telefone
function buscarPaciente(q) {
  const isAll = APP.perfil !== 'medico';
  let rows = isAll ? PACIENTES : PACIENTES.filter(p => p.medico === APP.medicoNome);
  if (q) {
    const qLower = q.toLowerCase();
    rows = rows.filter(p =>
      p.nome.toLowerCase().includes(qLower) ||
      (p.tel && p.tel.includes(q))
    );
  }
  renderPacientesRows(rows);
}

// BUG #22 FIX: Modal de novo paciente agora tem handler
function salvarPaciente() {
  const nome   = $('np-nome').value.trim();
  const nasc   = $('np-nasc').value;
  const tel    = $('np-tel').value.trim();
  const conv   = $('np-conv').value;
  const medico = $('np-medico').value;
  if (!nome || !tel) {
    toast('Nome e telefone são obrigatórios.', 'error'); return;
  }
  const ini = nome.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
  const avOptions = ['av-green', 'av-blue', 'av-amber', 'av-coral'];
  const av = avOptions[PACIENTES.length % avOptions.length];
  const newId = PACIENTES.length ? Math.max(...PACIENTES.map(p => p.id)) + 1 : 1;
  PACIENTES.push({ id: newId, nome, ini, av, nasc: nasc ? isoToBRfull(nasc) : '—', tel, conv, medico, status: 'ativo' });
  ['np-nome', 'np-nasc', 'np-tel'].forEach(id => { const el = $(id); if (el) el.value = ''; });
  closeModal('modal-paciente');
  renderPacientes();
  toast(`Paciente ${nome} cadastrado!`);
}

// ===== FINANCEIRO =====
// BUG #23 FIX: métricas calculadas dinamicamente
function renderFinanceiro() {
  const isAdmin = APP.perfil === 'admin';
  $('fin-metrics').style.display = isAdmin ? 'grid' : 'none';
  $('fin-banner').style.display  = isAdmin ? 'none' : 'block';

  if (isAdmin) {
    const rec = LANCAMENTOS.filter(l => l.tipo === 'receita').reduce((a, l) => a + l.valor, 0);
    const des = LANCAMENTOS.filter(l => l.tipo === 'despesa').reduce((a, l) => a + l.valor, 0);
    const elR = $('fin-v-receita');
    const elD = $('fin-v-despesa');
    const elS = $('fin-v-saldo');
    if (elR) elR.textContent = brl(rec);
    if (elD) elD.textContent = brl(des);
    if (elS) elS.textContent = brl(rec - des);
  }

  // BUG #24 FIX: botão excluir no lançamento
  $('fin-body').innerHTML = LANCAMENTOS.map(l => `
    <tr>
      <td>
        <div class="fin-desc">${esc(l.desc)}</div>
        <div class="fin-sub">${esc(l.sub || l.data)}</div>
      </td>
      <td>${esc(l.data)}</td>
      <td><span class="badge badge-gray">${esc(l.cat)}</span></td>
      <td style="font-weight:600;color:${l.tipo === 'receita' ? 'var(--green)' : 'var(--red)'}">
        ${l.tipo === 'receita' ? '+' : '−'} ${brl(l.valor)}
      </td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="excluirLancamento(${l.id})" title="Excluir">×</button>
      </td>
    </tr>`).join('');
}

function salvarLancamento() {
  const desc  = $('lan-desc').value.trim();
  const valor = parseFloat($('lan-valor').value) || 0;
  const tipo  = $('lan-tipo').value;
  const data  = $('lan-data').value;
  const cat   = $('lan-cat').value;

  // BUG #25 FIX: validação completa do formulário
  if (!desc)           { toast('Informe a descrição.', 'error'); return; }
  if (valor <= 0)      { toast('Informe um valor válido.', 'error'); return; }
  if (!data)           { toast('Informe a data do lançamento.', 'error'); return; }

  const newId = LANCAMENTOS.length ? Math.max(...LANCAMENTOS.map(l => l.id)) + 1 : 1;
  // BUG #26 FIX: conversão de data sem bug de timezone
  LANCAMENTOS.unshift({ id: newId, desc, sub: '', data: isoToBR(data), cat, tipo, valor });
  ['lan-desc', 'lan-valor', 'lan-data'].forEach(id => { const el = $(id); if (el) el.value = ''; });
  closeModal('modal-lancamento');
  renderFinanceiro();
  toast('Lançamento registrado!');
}

function excluirLancamento(id) {
  if (!confirm('Confirma a exclusão deste lançamento?')) return;
  const idx = LANCAMENTOS.findIndex(l => l.id === id);
  if (idx >= 0) LANCAMENTOS.splice(idx, 1);
  renderFinanceiro();
  toast('Lançamento excluído.');
}

// ===== ESTOQUE =====
function renderEstoque() {
  const criticos = ESTOQUE.filter(i => estoqueStatus(i).label !== 'OK').length;
  const alerta = $('estoque-alerta');
  if (alerta) {
    alerta.style.display = criticos > 0 ? 'block' : 'none';
    alerta.textContent = `⚠ ${criticos} item(s) com nível baixo ou crítico — atenção recomendada.`;
  }

  $('estoque-body').innerHTML = ESTOQUE.map(item => {
    const st  = estoqueStatus(item);
    const pct = item.min > 0 ? Math.min(100, Math.round((item.atual / item.min) * 100)) : 100;
    const barColor = pct < 20 ? 'var(--red)' : pct < 100 ? 'var(--amber)' : 'var(--green)';
    return `<tr>
      <td><strong>${esc(item.nome)}</strong></td>
      <td><span class="badge badge-blue">${esc(item.cat)}</span></td>
      <td>${item.atual} ${esc(item.un)}</td>
      <td>${item.min}</td>
      <td>
        <span class="badge ${st.cls}">${st.label}</span>
        <div class="progress-bar" style="width:72px;display:inline-block;vertical-align:middle;margin-left:6px">
          <div class="progress-fill" style="width:${pct}%;background:${barColor}"></div>
        </div>
      </td>
      <td>
        <button class="btn btn-sm" onclick="abrirReposicao(${item.id})">Repor</button>
        <button class="btn btn-sm btn-danger" onclick="excluirItem(${item.id})" style="margin-left:4px" title="Remover">×</button>
      </td>
    </tr>`;
  }).join('');
}

// BUG #27 FIX: usa ID do item (não índice de array) para segurança
function abrirReposicao(itemId) {
  const item = ESTOQUE.find(i => i.id === itemId);
  if (!item) return;
  estoqueId = itemId;
  $('rep-item-nome').textContent = item.nome;
  $('rep-quantidade').value = '';
  openModal('modal-reposicao');
}
function salvarReposicao() {
  const qtd  = parseInt($('rep-quantidade').value) || 0;
  if (qtd <= 0) { toast('Informe uma quantidade válida.', 'error'); return; }
  const item = ESTOQUE.find(i => i.id === estoqueId);
  if (item) item.atual += qtd;
  closeModal('modal-reposicao');
  renderEstoque();
  toast('Estoque atualizado!');
}
function excluirItem(itemId) {
  if (!confirm('Remover este item do estoque?')) return;
  const idx = ESTOQUE.findIndex(i => i.id === itemId);
  if (idx >= 0) ESTOQUE.splice(idx, 1);
  renderEstoque();
}

// BUG #28 FIX: Modal "Novo item" agora tem handler funcional
function salvarNovoItem() {
  const nome  = $('ni-nome').value.trim();
  const cat   = $('ni-cat').value;
  const un    = $('ni-un').value;
  const atual = parseInt($('ni-atual').value) || 0;
  const min   = parseInt($('ni-min').value) || 0;
  if (!nome) { toast('Informe o nome do item.', 'error'); return; }
  const newId = ESTOQUE.length ? Math.max(...ESTOQUE.map(i => i.id)) + 1 : 1;
  ESTOQUE.push({ id: newId, nome, cat, atual, min, un });
  ['ni-nome', 'ni-atual', 'ni-min'].forEach(id => { const el = $(id); if (el) el.value = ''; });
  closeModal('modal-novoitem');
  renderEstoque();
  toast(`Item "${nome}" adicionado ao estoque!`);
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
  $('rep-total').textContent    = brl(total);
  $('rep-pago').textContent     = brl(pago);
  $('rep-pendente').textContent = brl(total - pago);
}
function renderRepBody() {
  const mlabel = m =>
    m.modelo === 'percentual'    ? `${m.percentual}% produção` :
    m.modelo === 'fixo_consulta' ? `${brl(m.vc)}/consulta`    : 'Fixo mensal';
  $('rep-body').innerHTML = MEDICOS.map((m, i) => {
    const v = calcRep(m);
    return `<tr>
      <td><div class="flex-row"><div class="avatar ${m.av}">${esc(m.ini)}</div><strong>${esc(m.nome)}</strong></div></td>
      <td style="color:var(--text-muted)">${esc(m.esp)}</td>
      <td>${m.cons}</td>
      <td><span class="badge badge-gray">${mlabel(m)}</span></td>
      <td style="font-weight:600;color:var(--green)">${brl(v)}</td>
      <td><span class="badge ${m.pago ? 'badge-green' : 'badge-amber'}">${m.pago ? 'Pago' : 'Pendente'}</span></td>
      <td>${m.pago ? '—' : `<button class="btn btn-primary btn-sm" onclick="pagarDireto(${i})">Pagar</button>`}</td>
    </tr>`;
  }).join('');
}
function renderCfgCards() {
  $('cfg-cards').innerHTML = MEDICOS.map((m, i) => {
    const v = calcRep(m);
    const inps =
      m.modelo === 'percentual'
        ? `<div class="cfg-row"><span class="cfg-label">Percentual (%)</span><input class="cfg-input" type="number" min="0" max="100" value="${m.percentual}" oninput="upPct(${i},this.value)"><span style="font-size:11px;color:var(--text-muted)">sobre produção bruta</span></div>`
      : m.modelo === 'fixo_consulta'
        ? `<div class="cfg-row"><span class="cfg-label">Valor por consulta (R$)</span><input class="cfg-input" type="number" min="0" value="${m.vc}" oninput="upVC(${i},this.value)"><span style="font-size:11px;color:var(--text-muted)">× ${m.cons} consultas</span></div>`
        : `<div class="cfg-row"><span class="cfg-label">Valor fixo mensal (R$)</span><input class="cfg-input" type="number" min="0" value="${m.fixo}" oninput="upFx(${i},this.value)"></div>`;
    return `<div class="cfg-card">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:13px">
        <div class="flex-row">
          <div class="avatar ${m.av}" style="width:36px;height:36px;font-size:13px">${esc(m.ini)}</div>
          <div><strong>${esc(m.nome)}</strong><div style="font-size:12px;color:var(--text-muted)">${esc(m.esp)}</div></div>
        </div>
        <span class="badge badge-teal">A pagar: <span id="cv-${i}">${brl(v)}</span></span>
      </div>
      <div class="cfg-row"><span class="cfg-label">Modelo de repasse</span>
        <select class="cfg-select" onchange="chMod(${i},this.value)">
          <option value="percentual"    ${m.modelo === 'percentual'    ? 'selected' : ''}>% da produção</option>
          <option value="fixo_consulta" ${m.modelo === 'fixo_consulta' ? 'selected' : ''}>Fixo por consulta</option>
          <option value="fixo_mensal"   ${m.modelo === 'fixo_mensal'   ? 'selected' : ''}>Fixo mensal</option>
        </select>
      </div>
      ${inps}
      <div class="stats-row">
        <div class="stat-box"><div class="stat-label">Consultas</div><div class="stat-val">${m.cons}</div></div>
        <div class="stat-box"><div class="stat-label">Produção bruta</div><div class="stat-val" style="font-size:12px">${brl(m.prod)}</div></div>
        <div class="stat-box"><div class="stat-label">A pagar</div><div class="stat-val" style="color:var(--green);font-size:12px" id="cs-${i}">${brl(v)}</div></div>
      </div>
    </div>`;
  }).join('');
}
function renderRepHist() {
  $('rep-hist-body').innerHTML = REP_HISTORICO.length
    ? REP_HISTORICO.map(h => `
      <tr>
        <td><strong>${esc(h.med)}</strong></td><td>${esc(h.ref)}</td>
        <td style="color:var(--green);font-weight:600">${brl(h.valor)}</td>
        <td style="color:var(--text-muted)">${esc(h.obs)}</td>
        <td>${esc(h.data)}</td>
        <td><span class="badge badge-blue">${esc(h.forma)}</span></td>
      </tr>`).join('')
    : '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:20px">Nenhum pagamento registrado.</td></tr>';
}
function updCfg(i) {
  const v = calcRep(MEDICOS[i]);
  [$(`cv-${i}`), $(`cs-${i}`)].forEach(el => { if (el) el.textContent = brl(v); });
  renderRepMetrics(); renderRepBody();
}
function chMod(i, v)  { MEDICOS[i].modelo = v; renderCfgCards(); renderRepBody(); renderRepMetrics(); }
function upPct(i, v)  { MEDICOS[i].percentual = parseInt(v) || 0; updCfg(i); }
function upVC(i, v)   { MEDICOS[i].vc = parseInt(v) || 0; updCfg(i); }
function upFx(i, v)   { MEDICOS[i].fixo = parseInt(v) || 0; updCfg(i); }

function selRepTab(id, el) {
  document.querySelectorAll('.rep-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.rep-section').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  $('rep-sec-' + id).classList.add('active');
}

function abrirModalPagamento() {
  const sel = $('rm-medico');
  sel.innerHTML = '<option value="">Selecione...</option>' +
    MEDICOS.map((m, i) => `<option value="${i}">${esc(m.nome)}</option>`).join('');
  $('rm-data').value  = new Date().toISOString().split('T')[0];
  $('rm-valor').value = '';
  $('rm-obs').value   = '';
  openModal('modal-pagamento');
}

// BUG #29 FIX: pagarDireto(i) usa índice de array diretamente (não mais m.id - 1)
function pagarDireto(i) {
  abrirModalPagamento();
  setTimeout(() => {
    $('rm-medico').value = i;
    $('rm-valor').value  = calcRep(MEDICOS[i]);
  }, 0);
}
function preencherValorRep() {
  const i = parseInt($('rm-medico').value);
  if (!isNaN(i) && MEDICOS[i]) $('rm-valor').value = calcRep(MEDICOS[i]);
}
function confirmarPagamento() {
  const i = parseInt($('rm-medico').value);
  if (isNaN(i) || !MEDICOS[i]) { toast('Selecione um médico.', 'error'); return; }
  const v   = parseFloat($('rm-valor').value) || 0;
  const ref = $('rm-ref').value.trim() || 'Sem referência';
  const dataVal = $('rm-data').value;
  if (!dataVal) { toast('Informe a data do pagamento.', 'error'); return; }
  if (v <= 0)   { toast('Informe um valor válido.', 'error'); return; }
  // BUG #30 FIX: parse manual evita bug de timezone (new Date('YYYY-MM-DD') → UTC)
  const [y, m, d] = dataVal.split('-');
  const data  = `${d}/${m}/${y}`;
  const forma = $('rm-forma').value;
  const obs   = $('rm-obs').value.trim() || '—';
  MEDICOS[i].pago = true;
  REP_HISTORICO.unshift({ med: MEDICOS[i].nome, ref, valor: v, obs, data, forma });
  closeModal('modal-pagamento');
  renderRepasse();
  toast(`Pagamento de ${brl(v)} registrado para ${MEDICOS[i].nome}!`);
}

// ===== WHATSAPP CRM =====
const DOT_COLORS = { ia: '#1D9E75', human: '#E24B4A', agendado: '#378ADD' };

// BUG #31 FIX: busca de lead funcional
function renderLeads(filtro) {
  let lista = LEADS;
  if (filtro) {
    const f = filtro.toLowerCase();
    lista = LEADS.filter(l => l.nome.toLowerCase().includes(f) || l.tel.includes(filtro));
  }
  $('leads-list').innerHTML = lista.map(l => {
    const idx = LEADS.indexOf(l);
    return `<div class="lead-item ${idx === curLead ? 'active' : ''}" onclick="selLead(${idx})">
      <div class="lead-dot" style="background:${DOT_COLORS[l.status] || '#888'}"></div>
      <div style="flex:1;min-width:0">
        <div class="lead-name">${esc(l.nome)}</div>
        <div class="lead-preview">${esc(l.msgs[l.msgs.length - 1].txt)}</div>
      </div>
      <div style="font-size:10px;color:var(--text-muted)">${l.msgs[l.msgs.length - 1].time}</div>
    </div>`;
  }).join('');
}

function selLead(i) { curLead = i; renderLeads(); renderChat(i); }

function renderChat(i) {
  if (!LEADS[i]) return;
  const l = LEADS[i];
  $('chat-avatar').textContent = l.ini;
  $('chat-avatar').className   = 'avatar ' + l.av;
  $('chat-name').textContent   = l.nome;
  $('chat-phone').textContent  = l.tel;
  $('i-nome').textContent  = l.nome.split(' ').slice(0, 2).join(' ');
  $('i-tel').textContent   = l.tel;
  $('i-data').textContent  = l.agend.data;
  $('i-hora').textContent  = l.agend.hora;
  $('i-med').textContent   = l.agend.med;
  $('i-hist').textContent  = l.hist;

  const pill   = $('chat-status-pill');
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
    if (m.t === 'cl') return `<div style="display:flex;flex-direction:column;align-items:flex-end"><div class="msg msg-client">${esc(m.txt)}<div class="msg-time">${m.time}</div></div></div>`;
    if (m.t === 'hu') return `<div><div class="msg-label">Recepção</div><div class="msg msg-human">${esc(m.txt)}<div class="msg-time">${m.time}</div></div></div>`;
    return `<div><div class="msg-label">IA</div><div class="msg msg-ia">${esc(m.txt)}<div class="msg-time">${m.time}</div></div></div>`;
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
  const now  = new Date();
  const time = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  LEADS[curLead].msgs.push({ t: 'hu', txt, time });
  LEADS[curLead].status = 'human';
  inp.value = '';
  renderLeads(); renderChat(curLead);
}

// BUG #32 FIX: Enter envia mensagem; Shift+Enter quebra linha
document.addEventListener('keydown', e => {
  const inp = $('chat-input-field');
  if (e.key === 'Enter' && !e.shiftKey && inp && document.activeElement === inp) {
    e.preventDefault();
    sendHumanMsg();
  }
});

// ===== WHATSAPP CONFIG =====
function renderWhatsappConfig() {
  const box = $('wpp-status-box');
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
  const inst  = $('zapi-instance');
  const token = $('zapi-token');
  if (!inst?.value.trim() || !token?.value.trim()) {
    toast('Preencha o Instance ID e o Token da Z-API.', 'error'); return;
  }
  wppConectado = true;
  renderWhatsappConfig();
  toast('WhatsApp conectado!');
}
function desconectarWpp() { wppConectado = false; renderWhatsappConfig(); }

// ===== USUÁRIOS =====
const PERFIL_LABELS = { admin: 'Admin', medico: 'Médico', recepcao: 'Recepção' };
const PERFIL_BADGE  = { admin: 'badge-teal', medico: 'badge-blue', recepcao: 'badge-amber' };

function renderUsuarios() {
  const el = $('usuarios-body');
  if (!el) return;
  el.innerHTML = USUARIOS.map(u => `
    <tr>
      <td><div class="flex-row">
        <div class="avatar ${u.perfil === 'admin' ? 'av-green' : u.perfil === 'medico' ? 'av-blue' : 'av-amber'}">
          ${u.nome.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <div>
          <strong>${esc(u.nome)}</strong>
          <div style="font-size:11px;color:var(--text-muted)">${esc(u.email)}</div>
        </div>
      </div></td>
      <td><span class="badge ${PERFIL_BADGE[u.perfil]}">${PERFIL_LABELS[u.perfil]}</span></td>
      <td>${esc(u.ultimo)}</td>
      <td><span class="badge ${u.status === 'ativo' ? 'badge-green' : 'badge-gray'}">${u.status === 'ativo' ? 'Ativo' : 'Inativo'}</span></td>
      <td>
        ${u.id === 1
          ? '<span style="font-size:12px;color:var(--text-muted)">Admin principal</span>'
          : `<button class="btn btn-sm" onclick="toggleUsuario(${u.id})">${u.status === 'ativo' ? 'Desativar' : 'Ativar'}</button>`}
      </td>
    </tr>`).join('');
}

// BUG #33 FIX: protege admin principal de ser desativado
function toggleUsuario(id) {
  const u = USUARIOS.find(x => x.id === id);
  if (!u) return;
  if (u.id === 1) { toast('O admin principal não pode ser desativado.', 'error'); return; }
  u.status = u.status === 'ativo' ? 'inativo' : 'ativo';
  renderUsuarios();
  toast(`Usuário ${u.nome} ${u.status === 'ativo' ? 'ativado' : 'desativado'}.`);
}

// BUG #34 FIX: validação de e-mail duplicado + senha mínima
function salvarNovoUsuario() {
  const nome   = $('nu-nome').value.trim();
  const email  = $('nu-email').value.trim();
  const perfil = $('nu-perfil').value;
  const senha  = $('nu-senha').value;
  const erro   = $('nu-erro');
  if (erro) erro.style.display = 'none';

  if (!nome || !email || !senha) {
    if (erro) { erro.textContent = 'Preencha todos os campos.'; erro.style.display = 'block'; } return;
  }
  if (senha.length < 6) {
    if (erro) { erro.textContent = 'Senha deve ter pelo menos 6 caracteres.'; erro.style.display = 'block'; } return;
  }
  if (USUARIOS.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    if (erro) { erro.textContent = 'Este e-mail já está cadastrado.'; erro.style.display = 'block'; } return;
  }
  const newId = USUARIOS.length ? Math.max(...USUARIOS.map(u => u.id)) + 1 : 1;
  USUARIOS.push({ id: newId, nome, email, perfil, status: 'ativo', ultimo: '—' });
  ['nu-nome', 'nu-email', 'nu-senha'].forEach(id => { const el = $(id); if (el) el.value = ''; });
  closeModal('modal-novo-usuario');
  const elTotal = $('total-usuarios');
  if (elTotal) elTotal.textContent = USUARIOS.length + ' usuário(s) cadastrado(s)';
  renderUsuarios();
  toast(`Usuário ${nome} criado com sucesso!`);
}
