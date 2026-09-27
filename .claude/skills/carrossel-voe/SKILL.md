---
name: carrossel-voe
description: Cria carrosséis do Instagram no padrão visual e de copy do perfil Voe Empreendedor (VOE), direto no Canva, sem trabalho manual. Use sempre que o usuário mandar um link de carrossel (Instagram ou Canva) pedindo para replicar, fazer "no mesmo padrão", "igual a esse", ou pedir um carrossel/post/conteúdo para o Voe Empreendedor, VOE Imersão, Voe Gestão ou sobre gestão, liderança, vendas, posicionamento e empreendedorismo para o perfil — mesmo que ele não diga "carrossel" ou "Canva" explicitamente.
---

# Carrossel Voe Empreendedor

Você é, ao mesmo tempo, o copywriter e o designer do Voe Empreendedor. O objetivo é
entregar um carrossel pronto no Canva, idêntico em estilo aos já publicados, a partir
de um link de referência ou de um tema, sem que o usuário precise mexer no Canva.

O padrão visual é fixo e vive em um **carrossel-matriz no Canva**. A regra de ouro é:
**nunca desenhar do zero — sempre montar a partir das páginas da matriz e trocar só
texto e foto.** Assim fontes, grade de fundo, cores, logo e espaçamentos saem exatos.

- Especificações visuais detalhadas: `references/design-spec.md`
- Método de copy, fórmulas e exemplos reais: `references/copy-playbook.md`
- **Hierarquia tipográfica pela proporção áurea** (cabeçalho, subcabeçalho, corpo):
  `references/hierarquia-tipografica.md`

Leia os três antes de escrever a primeira linha de copy. A hierarquia manda no tamanho
e no espaçamento de todo texto. A matriz fornece fontes, cores, grade e logo.

Resumo da escala (φ = 1,618, base 42 px):
**H1 cabeçalho 110 px** · **H2 subcabeçalho 68 px** · **P corpo 42 px** · S apoio 26 px.

## Carrosséis-matriz (Canva)

| ID | Título interno | Uso |
|---|---|---|
| `DAHVQ6x7h9o` | "Como dizer NÃO sem parecer grosseiro" (8 págs) | **Matriz principal** — tem todos os layouts |
| `DAHV8rnoBhU` | "Se eu apagar sua logo" (7 págs) | Matriz de perguntas (1 pergunta por slide) + capa com título dividido |
| `DAHInHG5i2M` | "Liderança / Descanso não é luxo / VOE Imersão" | Capas com foto, versão evento/venda (vagas, data, link na bio) |

Layouts da matriz principal `DAHVQ6x7h9o` (número da página → função):

1. **Capa** — foto do palestrante + degradê azul, título condensado CAIXA ALTA + subtítulo itálico
2. **Afirmação central** — um parágrafo serifado itálico centralizado
3. **Lista / método** — título no topo, lista numerada, fecho em 2 linhas no rodapé
4. **Cenário ❌/✅** — rótulo (ex.: CLIENTE), frase errada ❌, frase certa ✅, lição em negrito
5. Cenário ❌/✅ (cópia)
6. Cenário ❌/✅ (cópia)
7. **Síntese "não é X, é Y"** — frase grande + complemento
8. **Fechamento** — fundo azul royal, frase-assinatura + logo VOE

Da matriz `DAHV8rnoBhU`: página 2 = **"X não é / Y"** (duas linhas, fontes misturadas);
páginas 3–6 = **pergunta única** grande no centro; página 7 = **fechamento com exercício**.

Se algum ID não existir mais (design apagado), procure com `search-designs` por
"Blue and White Modern Grunge" e escolha o mais recente com capa de foto + fundo marinho quadriculado.

## Fluxo

### 1. Entender a referência

- **Link do Canva** (`canva.com/design/...`, `canva.link/...`): resolva shortlink se preciso e leia com
  `read-design` (fields: design_content + thumbnails de todas as páginas).
- **Link do Instagram**: tente `WebFetch`. O Instagram costuma estar bloqueado no ambiente;
  se falhar, (a) procure o original no Canva com `search-designs` usando palavras do tema
  ou ordenando por `modified_descending`, e confirme com o usuário pelo título/miniatura;
  (b) se não achar, peça prints dos slides. Não trave o trabalho por isso.
- **Só um tema** ("faz um sobre delegação"): pule para a copy.

Da referência, extraia: tema, tese, estrutura (quais layouts, em que ordem), quantidade
de slides, e se é conteúdo educativo ou de venda/evento.

"Replicar" significa **mesma estrutura e estilo, conteúdo novo** (a menos que o usuário
peça cópia literal). Se o usuário não deu o tema novo, proponha 3 opções de tema
alinhadas ao público (donos de pequenas e médias empresas) e siga com a melhor se ele
disse para você decidir.

### 2. Escrever a copy (antes de tocar no Canva)

Siga `references/copy-playbook.md`. Entregue ao usuário, no chat, um roteiro assim:

```
TEMA: ...
Slide 1 (Capa) — Título: ... | Subtítulo: ...
Slide 2 (Afirmação) — ...
...
Slide N (Fechamento) — ...
LEGENDA: ...
```

Com o roteiro, mapeie cada slide a um layout da matriz (ex.: `[1,2,3,4,4,4,7,8]`).
Se o usuário pediu para ir direto, não espere aprovação — siga; senão, peça um "ok" rápido.

### 3. Montar no Canva

1. **Criar o design com os layouts na ordem certa** usando `merge-designs`
   (`type: create_new_design`), com operações `insert_pages` apontando para a matriz e
   repetindo páginas quando precisar de mais slides do mesmo layout. Exemplo para
   capa + afirmação + 4 cenários + síntese + fechamento:
   ```json
   {"type":"create_new_design","title":"VOE — <tema>",
    "operations":[{"type":"insert_pages","source":{"type":"design","design_id":"DAHVQ6x7h9o","page_numbers":[1,2,4,4,4,4,7,8]}}]}
   ```
   Para misturar matrizes, faça várias chamadas em sequência, uma `insert_pages` por chamada:
   o `merge-designs` aceita **uma única operação por requisição** (inserir, mover ou apagar).
   Essa ferramenta pede aprovação do usuário — explique em uma linha o que será criado.
   Se falhar, use `copy-design` da matriz e depois `merge-designs` (`modify_existing_design`)
   para apagar/reordenar páginas.
2. `read-design` do novo design com `open_transaction: true` para obter os `locator_id`.
3. `edit-design` página por página (`keep_open`) usando `replace_text` em cada caixa de texto.
   Regras:
   - Antes de editar, classifique cada caixa de texto como H1, H2, P ou S (tabela
     "Mapa por layout" em `references/hierarquia-tipografica.md`).
   - Depois do `replace_text`, aplique o nível com `format_text` (`font_size` e
     `line_height` da escala) e reposicione com `position_element` seguindo o
     espaçamento áureo. Não mude fonte nem cor: elas vêm da matriz.
   - Se o texto não couber no limite de linhas do nível, corte a copy. Não crie
     tamanhos fora da escala.
   - Para destaque em **negrito** dentro de uma frase (como no fechamento), use
     `format_text` apenas se a caixa não preservar a mistura; na dúvida, mantenha simples.
   - Não altere o logo "voe / Empreendedor" nem a grade de fundo.
   - Capa: a foto recortada do palestrante fica em uma camada acima do texto. Limite a
     caixa do título a ~600 px de largura para ele não invadir o rosto.
4. **Foto da capa**: mantenha a foto da matriz, a não ser que o usuário mande outra ou
   peça variação. Para variar, reutilize fotos de palestra/evento de outros carrosséis VOE
   (ex.: mediaIds `MAHV8ofBjeE`, `MAHLi8cw2hw`) via `update_fill`, ou use a que o usuário enviar
   (`upload-asset-from-url`). Nunca use banco de imagens genérico: a capa sempre mostra
   os mentores/eventos reais do VOE.
5. Gere miniaturas de todas as páginas (`read-design` com `transaction_id` + thumbnails)
   e **confira visualmente**: texto cortado, linha órfã, sobreposição com o logo, acento
   quebrado. Corrija antes de mostrar.
6. **Salve (`finalize: "commit"`) assim que a revisão visual estiver ok — sem esperar
   aprovação.** O usuário pediu o carrossel pronto; enquanto a transação está aberta,
   o link mostra os textos antigos da matriz e parece que nada foi feito. Ajustes
   pedidos depois são feitos em uma nova transação (`read-design` com `open_transaction`).
   Só peça aprovação antes de salvar se o usuário disser explicitamente que quer revisar primeiro.

### 4. Entregar

- Link de edição do Canva do novo carrossel.
- Legenda pronta para colar (ver playbook).
- Se pedirem arquivos: `export-design` em PNG (1080×1080, uma imagem por slide).
- Se pedirem para agendar e houver Metricool conectado, ofereça agendar o post.

## Checklist final

- [ ] 1080×1080, 6 a 9 slides
- [ ] Capa com foto real + título condensado CAIXA ALTA + subtítulo itálico
- [ ] Miolo em fundo marinho `#010721` com grade; fechamento em azul royal `#00135e` com logo VOE
- [ ] Cada slide com **uma ideia só**, leitura em menos de 5 segundos
- [ ] Todo texto em um nível da escala áurea (110 / 68 / 42 / 26 px), um H1 por slide,
      no máximo 3 níveis, espaços de 42 e 68 px entre blocos
- [ ] Contraste "não é X, é Y" em algum ponto
- [ ] Último slide com frase-assinatura de empreendedor para empreendedor
- [ ] Sem textos em inglês, placeholders ("123 Anywhere St.") ou emojis soltos no design
- [ ] Português revisado (acentos, crase, concordância)
