# ClinicaFácil — Sistema de Gestão

Sistema completo de gestão para clínica médica com login por perfil, agenda, pacientes, financeiro, estoque, repasse médico e WhatsApp CRM.

## Como publicar no Netlify (sem instalar nada)

### Opção 1 — Arrastar e soltar (mais rápido)

1. Acesse **netlify.com** e crie uma conta gratuita
2. No painel, clique em **"Add new site"** → **"Deploy manually"**
3. Selecione a pasta `clinica` inteira e arraste para a área indicada
4. Aguarde alguns segundos — seu site estará no ar com um link automático!

### Opção 2 — Via GitHub

1. Crie uma conta em **github.com**
2. Clique em **"New repository"** → dê um nome → clique em **"Create"**
3. Faça upload de todos os arquivos desta pasta
4. Acesse **netlify.com** → **"Add new site"** → **"Import from Git"**
5. Conecte sua conta GitHub e selecione o repositório
6. Clique em **"Deploy"** — pronto!

## Estrutura de arquivos

```
clinica/
├── index.html        ← página principal (tudo em um arquivo)
├── css/
│   └── style.css     ← estilos do sistema
├── js/
│   └── app.js        ← lógica, dados e renderização
└── README.md         ← este arquivo
```

## Perfis de acesso (demonstração)

| Perfil    | E-mail                    | Senha  | Acesso |
|-----------|---------------------------|--------|--------|
| Admin     | admin@clinica.com         | 123456 | Tudo   |
| Médico    | dr.costa@clinica.com      | 123456 | Agenda e pacientes próprios |
| Recepção  | recepcao@clinica.com      | 123456 | Agenda, pacientes, lançamentos, CRM |

## Módulos incluídos

- **Painel geral** — resumo do dia com consultas, financeiro e leads
- **Agenda** — visualização semanal, filtrada por perfil
- **Pacientes** — cadastro com busca por nome
- **Financeiro** — lançamentos (painel completo só para admin)
- **Estoque** — alertas automáticos de nível crítico/baixo
- **Repasse médico** — 3 modelos de remuneração (% produção, fixo/consulta, fixo mensal)
- **WhatsApp CRM** — atendimento IA com escalada para humano

## Próximos passos para ter banco de dados real

Atualmente o sistema roda com dados de demonstração em memória.
Para salvar dados de verdade, conecte ao Supabase:

1. Crie conta em **supabase.com**
2. Crie um novo projeto
3. Use o SQL do arquivo `schema.sql` (solicite ao desenvolvedor) para criar as tabelas
4. Substitua as constantes de dados no `app.js` por chamadas à API do Supabase
