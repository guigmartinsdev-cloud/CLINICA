# Configurando o Firebase — Guia passo a passo

Sem SQL, sem instalação. Tudo pelo navegador.

---

## Passo 1 — Criar o projeto no Firebase

1. Acesse **console.firebase.google.com**
2. Clique em **"Criar um projeto"**
3. Dê o nome **ClinicaFácil**
4. Desative o Google Analytics (não precisa) → clique em **Criar projeto**
5. Aguarde ~30 segundos

---

## Passo 2 — Ativar o banco de dados (Firestore)

1. No menu lateral, clique em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. Selecione **"Iniciar no modo de teste"** (libera acesso por 30 dias para você testar)
4. Escolha a região **southamerica-east1 (São Paulo)** → clique em **Ativar**

---

## Passo 3 — Ativar autenticação por e-mail

1. No menu lateral, clique em **"Authentication"**
2. Clique em **"Primeiros passos"**
3. Em **"Provedores de login"**, clique em **"E-mail/senha"**
4. Ative a primeira opção → **Salvar**

---

## Passo 4 — Criar os usuários do sistema

1. Ainda em **Authentication**, clique em **"Usuários"** → **"Adicionar usuário"**
2. Crie os 3 usuários abaixo:

| E-mail                    | Senha sugerida  |
|---------------------------|-----------------|
| admin@clinica.com         | Admin@2026      |
| dr.costa@clinica.com      | Medico@2026     |
| recepcao@clinica.com      | Recep@2026      |

3. Após criar cada um, copie o **UID** mostrado na tabela

---

## Passo 5 — Criar os perfis no Firestore

1. Vá em **Firestore Database** → clique em **"+ Iniciar coleção"**
2. Nome da coleção: `usuarios`
3. Para cada usuário, crie um documento com o **UID** como ID e estes campos:

**Admin:**
```
nome:    "Dr. Irmão"
email:   "admin@clinica.com"
perfil:  "admin"
status:  "ativo"
```

**Dr. Costa:**
```
nome:    "Dr. Costa"
email:   "dr.costa@clinica.com"
perfil:  "medico"
status:  "ativo"
medicoId: "dr-costa"
```

**Recepção:**
```
nome:    "Ana Recepção"
email:   "recepcao@clinica.com"
perfil:  "recepcao"
status:  "ativo"
```

---

## Passo 6 — Pegar as credenciais do projeto

1. Clique no ícone de engrenagem ⚙️ → **"Configurações do projeto"**
2. Role até **"Seus apps"** → clique em **"</>  Web"**
3. Dê um apelido (ex: clinicafacil-web) → clique em **Registrar app**
4. O Firebase vai mostrar um bloco assim:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "clinicafacil.firebaseapp.com",
  projectId: "clinicafacil-xxxxx",
  storageBucket: "clinicafacil.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456:web:abcdef"
};
```

5. Copie esse bloco inteiro

---

## Passo 7 — Colar as credenciais no sistema

1. Abra o arquivo `clinica/js/firebase.js`
2. Localize o trecho `const firebaseConfig = { ... }`
3. Substitua pelos valores copiados no passo anterior
4. Salve o arquivo

---

## Passo 8 — Adicionar o firebase.js no index.html

Abra o `index.html` e, antes do `</body>`, adicione:

```html
<script type="module" src="js/firebase.js"></script>
```

---

## Passo 9 — Popular com dados de exemplo (opcional)

1. Abra o sistema no navegador
2. Faça login como admin
3. Abra o console do navegador (F12 → aba "Console")
4. Digite: `seed()` e pressione Enter
5. Aguarde a mensagem "✅ Seed concluído!"

---

## Passo 10 — Regras de segurança (antes de publicar)

Antes de publicar para uso real, vá em:
**Firestore → Regras** e substitua o conteúdo por:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Usuários: só o próprio usuário lê o próprio doc
    match /usuarios/{uid} {
      allow read: if request.auth.uid == uid;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.perfil == 'admin';
    }

    // Demais coleções: só usuários autenticados
    match /{collection}/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Clique em **Publicar**.

---

## Estrutura de coleções criadas automaticamente

```
Firestore
├── usuarios          ← perfis e permissões
├── pacientes         ← cadastro de pacientes
├── consultas         ← agenda
├── financeiro        ← lançamentos
├── estoque           ← itens e quantidades
├── repasses          ← histórico de pagamentos
├── leads_crm         ← conversas WhatsApp
└── mensagens_crm     ← mensagens por lead
```

---

## Custo

O Firebase tem plano **Spark (gratuito)** que inclui:
- 1 GB de armazenamento no Firestore
- 50.000 leituras/dia
- 20.000 escritas/dia
- Autenticação ilimitada

Para uma clínica pequena, o plano gratuito é mais do que suficiente.
