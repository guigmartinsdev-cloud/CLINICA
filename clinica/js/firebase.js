// ============================================================
//  ClinicaFácil — Firebase + Firestore
//  Banco de dados completo — tudo criado pelo próprio app
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, collection, doc, setDoc,
  getDocs, getDoc, addDoc, updateDoc,
  onSnapshot, query, orderBy, where, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ── CONFIGURAÇÃO ─────────────────────────────────────────────
// ⚠️ Cole aqui as credenciais do seu projeto Firebase
// Firebase Console → Configurações → Seus apps → SDK Web
const firebaseConfig = {
  apiKey:            "AIzaSyD3r6kYys07WgQTY-m2YLAozu-Fl5eg4HI",
  authDomain:        "clinica-e66b7.firebaseapp.com",
  projectId:         "clinica-e66b7",
  storageBucket:     "clinica-e66b7.firebasestorage.app",
  messagingSenderId: "227309900692",
  appId:             "1:227309900692:web:c7a06f363f980378f23581"
};

const firebaseApp = initializeApp(firebaseConfig);
const db   = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
window._db   = db;
window._auth = auth;

const COLS = {
  usuarios:   'usuarios',
  pacientes:  'pacientes',
  consultas:  'consultas',
  financeiro: 'financeiro',
  estoque:    'estoque',
  repasses:   'repasses',
  leads:      'leads_crm',
  mensagens:  'mensagens_crm',
};

window.USUARIO_ATUAL = null;

// ============================================================
//  PRIMEIRO ACESSO
//  Verifica se já existe admin. Se não, mostra tela de setup.
// ============================================================

window.verificarPrimeiroAcesso = async function() {
  try {
    const q    = query(collection(db, COLS.usuarios), where('perfil', '==', 'admin'));
    const snap = await getDocs(q);
    return snap.empty;
  } catch(e) {
    console.error('Erro ao verificar primeiro acesso:', e);
    return false;
  }
};

window.criarPrimeiroAdmin = async function({ nome, email, senha, nomeClinica }) {
  const cred = await createUserWithEmailAndPassword(auth, email, senha);
  const uid  = cred.user.uid;
  await setDoc(doc(db, COLS.usuarios, uid), {
    nome, email, perfil: 'admin', status: 'ativo',
    nomeClinica: nomeClinica || 'ClinicaFácil',
    criadoEm: serverTimestamp(), ultimoAcesso: serverTimestamp(),
  });
  await setDoc(doc(db, 'configuracoes', 'clinica'), {
    nome: nomeClinica || 'ClinicaFácil', criadoEm: serverTimestamp(),
  });
  window.USUARIO_ATUAL = { uid, nome, email, perfil: 'admin', nomeClinica };
  return window.USUARIO_ATUAL;
};

// ============================================================
//  AUTENTICAÇÃO
// ============================================================

window.fbLogin = async function(email, senha) {
  const cred = await signInWithEmailAndPassword(auth, email, senha);
  const uid  = cred.user.uid;
  const snap = await getDoc(doc(db, COLS.usuarios, uid));
  if (!snap.exists()) throw new Error('Usuário não encontrado.');
  if (snap.data().status === 'inativo') throw new Error('Usuário inativo. Fale com o administrador.');
  await updateDoc(doc(db, COLS.usuarios, uid), { ultimoAcesso: serverTimestamp() });
  window.USUARIO_ATUAL = { uid, ...snap.data() };
  return window.USUARIO_ATUAL;
};

window.fbLogout = async function() {
  await signOut(auth);
  window.USUARIO_ATUAL = null;
};

window.fbOnAuth = function(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) { callback(null); return; }
    const snap = await getDoc(doc(db, COLS.usuarios, user.uid));
    if (snap.exists()) {
      window.USUARIO_ATUAL = { uid: user.uid, ...snap.data() };
      callback(window.USUARIO_ATUAL);
    } else {
      callback(null);
    }
  });
};

// ============================================================
//  GESTÃO DE USUÁRIOS
//  Admin cria usuários direto pelo app — sem precisar do console Firebase
// ============================================================

window.fbGetUsuarios = async function() {
  const snap = await getDocs(query(collection(db, COLS.usuarios), orderBy('criadoEm')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

/**
 * Cria novo usuário no Firebase Auth + Firestore.
 * Depois faz re-login do admin automaticamente.
 */
window.fbCriarUsuario = async function({ nome, email, senha, perfil, medicoId }) {
  const adminEmail = window.USUARIO_ATUAL.email;
  const adminUid   = window.USUARIO_ATUAL.uid;

  // Salva senha do admin em memória para relogar depois
  const _adminSenha = window._adminSenha;
  if (!_adminSenha) throw new Error('Sessão do admin expirada. Faça login novamente.');

  // Cria o novo usuário
  const cred = await createUserWithEmailAndPassword(auth, email, senha);
  const uid  = cred.user.uid;

  // Salva perfil no Firestore
  await setDoc(doc(db, COLS.usuarios, uid), {
    nome, email, perfil,
    medicoId: medicoId || null,
    status: 'ativo',
    criadoEm: serverTimestamp(),
    ultimoAcesso: null,
    remuneracao: perfil === 'medico'
      ? { modelo: 'percentual', percentual: 40, valorConsulta: 0, fixoMensal: 0 }
      : null,
  });

  // Re-loga o admin (createUser troca a sessão automaticamente)
  await signOut(auth);
  await signInWithEmailAndPassword(auth, adminEmail, _adminSenha);

  return { uid, nome, email, perfil };
};

window.fbToggleUsuario = async function(uid, novoStatus) {
  await updateDoc(doc(db, COLS.usuarios, uid), { status: novoStatus });
};

window.fbTrocarSenha = async function(senhaAtual, novaSenha) {
  const user = auth.currentUser;
  const cred = EmailAuthProvider.credential(user.email, senhaAtual);
  await reauthenticateWithCredential(user, cred);
  await updatePassword(user, novaSenha);
  window._adminSenha = novaSenha;
};

// ============================================================
//  PACIENTES
// ============================================================

window.fbGetPacientes = async function(medicoId = null) {
  const q = medicoId
    ? query(collection(db, COLS.pacientes), where('medicoId', '==', medicoId), orderBy('nome'))
    : query(collection(db, COLS.pacientes), orderBy('nome'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

window.fbCriarPaciente = async function({ nome, cpf, nascimento, telefone, email, convenio, medicoId }) {
  return await addDoc(collection(db, COLS.pacientes), {
    nome, cpf: cpf||'', nascimento, telefone, email: email||'',
    convenio, medicoId, status: 'ativo', criadoEm: serverTimestamp(),
  });
};

window.fbAtualizarPaciente = async function(id, dados) {
  await updateDoc(doc(db, COLS.pacientes, id), dados);
};

// ============================================================
//  AGENDA
// ============================================================

window.fbOnConsultas = function(medicoId, callback) {
  const q = medicoId
    ? query(collection(db, COLS.consultas), where('medicoId','==',medicoId), orderBy('data'), orderBy('hora'))
    : query(collection(db, COLS.consultas), orderBy('data'), orderBy('hora'));
  return onSnapshot(q, snap => callback(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
};

window.fbCriarConsulta = async function({ pacienteId, pacienteNome, medicoId, medicoNome, data, hora, tipo, observacoes }) {
  return await addDoc(collection(db, COLS.consultas), {
    pacienteId, pacienteNome, medicoId, medicoNome,
    data, hora, tipo, observacoes: observacoes||'',
    status: 'pendente', criadoEm: serverTimestamp(),
  });
};

window.fbAtualizarStatusConsulta = async function(id, status) {
  await updateDoc(doc(db, COLS.consultas, id), { status });
};

// ============================================================
//  FINANCEIRO
// ============================================================

window.fbGetLancamentos = async function() {
  const snap = await getDocs(query(collection(db, COLS.financeiro), orderBy('criadoEm','desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

window.fbCriarLancamento = async function({ tipo, valor, descricao, data, categoria, observacao }) {
  return await addDoc(collection(db, COLS.financeiro), {
    tipo, valor: Number(valor), descricao, data, categoria,
    observacao: observacao||'',
    usuarioId: window.USUARIO_ATUAL?.uid||'',
    criadoEm: serverTimestamp(),
  });
};

// ============================================================
//  ESTOQUE
// ============================================================

window.fbOnEstoque = function(callback) {
  return onSnapshot(
    query(collection(db, COLS.estoque), orderBy('nome')),
    snap => callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  );
};

window.fbCriarItemEstoque = async function({ nome, categoria, unidade, quantidadeAtual, quantidadeMinima }) {
  return await addDoc(collection(db, COLS.estoque), {
    nome, categoria, unidade,
    quantidadeAtual: Number(quantidadeAtual),
    quantidadeMinima: Number(quantidadeMinima),
    criadoEm: serverTimestamp(),
  });
};

window.fbReporEstoque = async function(id, qtd) {
  const snap = await getDoc(doc(db, COLS.estoque, id));
  if (!snap.exists()) return;
  await updateDoc(doc(db, COLS.estoque, id), {
    quantidadeAtual: (snap.data().quantidadeAtual||0) + Number(qtd)
  });
};

// ============================================================
//  REPASSE MÉDICO
// ============================================================

window.fbGetMedicos = async function() {
  const snap = await getDocs(query(collection(db, COLS.usuarios), where('perfil','==','medico')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

window.fbAtualizarRemuneracao = async function(uid, dados) {
  await updateDoc(doc(db, COLS.usuarios, uid), { remuneracao: dados });
};

window.fbGetRepasses = async function(medicoId = null) {
  const q = medicoId
    ? query(collection(db, COLS.repasses), where('medicoId','==',medicoId), orderBy('criadoEm','desc'))
    : query(collection(db, COLS.repasses), orderBy('criadoEm','desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

window.fbRegistrarRepasse = async function({ medicoId, medicoNome, referencia, valor, dataPagamento, formaPagamento, observacao }) {
  await updateDoc(doc(db, COLS.usuarios, medicoId), { pagamentoMesAtual: true });
  return await addDoc(collection(db, COLS.repasses), {
    medicoId, medicoNome, referencia,
    valor: Number(valor), dataPagamento, formaPagamento,
    observacao: observacao||'',
    criadoEm: serverTimestamp(),
  });
};

// ============================================================
//  WHATSAPP CRM
// ============================================================

window.fbOnLeads = function(callback) {
  return onSnapshot(
    query(collection(db, COLS.leads), orderBy('ultimaMensagem','desc')),
    snap => callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  );
};

window.fbOnMensagens = function(leadId, callback) {
  return onSnapshot(
    query(collection(db, COLS.mensagens), where('leadId','==',leadId), orderBy('criadoEm')),
    snap => callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  );
};

window.fbEnviarMensagem = async function(leadId, { tipo, texto }) {
  const now = serverTimestamp();
  await addDoc(collection(db, COLS.mensagens), {
    leadId, tipo, texto,
    autorNome: window.USUARIO_ATUAL?.nome||'',
    criadoEm: now,
  });
  await updateDoc(doc(db, COLS.leads, leadId), { ultimaMensagem: now, ultimoTexto: texto });
};

window.fbAtualizarStatusLead = async function(leadId, status, agendamento = null) {
  const dados = { status };
  if (agendamento) dados.agendamento = agendamento;
  await updateDoc(doc(db, COLS.leads, leadId), dados);
};
