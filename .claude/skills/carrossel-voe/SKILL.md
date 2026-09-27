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

### Matriz principal — use sempre: `DAHWamUxqas` ("VOE — Matriz v4 (Bebas + Raleway + logo)")

**Só duas fontes: Bebas (títulos) e Raleway (texto). O logo "voe / Empreendedor" aparece em
todos os slides internos e no fechamento — nunca apague.**

| Pág. | Layout | Caixas de texto |
|---|---|---|
| 1 | **Capa**: foto + degradê azul (a foto é **uma** camada só) | Título em **Bebas** (H1) · subtítulo em **Raleway itálico** (H2) |
| 2 | **Interno**: fundo marinho `#010721` + grade + logo no rodapé | Cabeçalho em **Bebas** (H1 110 px, centralizado) · frase em **Raleway** (H2 68 px, entrelinha 1,3) |
| 3 | **Fechamento**: fundo royal `#00135e` + grade + logo no rodapé | Chamada em **Bebas** (H1 110 px) · frase ou exercício em **Raleway** (H2 68 px) |

A página 2 serve para **todos** os slides internos. Repita-a quantas vezes precisar.
Exemplo de 10 slides: `page_numbers: [1,2,2,2,2,2,2,2,2,3]`.

### Maiúsculas e minúsculas (legibilidade)

A Bebas só tem maiúsculas. Texto longo todo em caixa alta cansa e se lê devagar. Por isso:

- **Bebas = rótulo curto**: até ~4 palavras e no máximo 2 linhas ("Faturamento",
  "Não administre / no escuro", "Escolher não / é recusar"). Escreva em caixa normal no
  `replace_text`; a fonte já mostra em maiúsculas.
- **Raleway = frase completa**, em caixa de frase: maiúscula só no início da frase, depois de
  ponto e em nomes próprios e siglas (VOE, ICP). Nunca escreva uma frase inteira em maiúsculas.
- Toda ideia com verbo e mais de ~5 palavras vai para a Raleway, não para a Bebas.
- Quebre as linhas da Raleway à mão com `\n` (até ~22 caracteres por linha a 68 px) para
  não sobrar palavra sozinha na última linha. Faça o mesmo na Bebas com 2 linhas.
- Não comece a Raleway com "Responde:" ou rótulos parecidos; escreva direto a pergunta.
- Evite números na Bebas em listas: o "1" dela parece "I" ("01" vira "OI"). A ordem fica
  implícita, ou vai na Raleway.

### Posição dos blocos (escala áurea, acima do logo)

O logo ocupa y ≈ 881–972. O bloco H1 + 42 px + H2 fica centralizado na área 0–860.
Alturas: Bebas 1 linha ≈ 132, 2 linhas ≈ 242; Raleway 68/1,3 com 2 linhas ≈ 169, 3 linhas ≈ 257.

| H1 × H2 | topo H1 | topo H2 |
|---|---|---|
| 1 linha × 2 linhas | 268 | 442 |
| 1 × 3 | 225 | 399 |
| 2 × 2 | 214 | 498 |
| 2 × 3 | 170 | 454 |

Capa: título a partir de y 230 (x 60, largura 600), subtítulo 42 px abaixo do título.

### Limitações técnicas do Canva (importante)
- **A API não troca a fonte de uma caixa.** A fonte vem da caixa copiada da matriz. Por
  isso, use sempre as caixas da matriz v4. Nunca use caixas de outras matrizes, nem crie caixas
  com `add_text`: elas trazem fontes fora do padrão (Didot, caligráfica, sans padrão do Canva).
- As caixas do logo ("voe" / "Empreendedor") forçam CAIXA ALTA. Não as reaproveite para texto
  e **não as apague nem mova**: o logo fica em todo slide interno e no fechamento.
- `add_text` cria uma caixa com a sans padrão do Canva, que **não** é Raleway. Não use.
- A cor de fundo da página muda com `recolor_element` usando o `locator_id` da página.

### Matrizes antigas (só referência de estrutura e copy, não de fonte)
`DAHVQ6x7h9o` ("Como dizer NÃO", layouts de cenário ❌/✅ e lista), `DAHV8rnoBhU`
("Se eu apagar sua logo", perguntas), `DAHInHG5i2M` (capas de evento: vagas, data, link na bio).

Se a matriz v4 não existir mais, procure com `search-designs` por "Matriz v4".

`DAHWakYlTq4` (v3) está descontinuada: não tem o logo.

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

Com o roteiro, mapeie cada slide a uma página da matriz v4 (ex.: `[1,2,2,2,2,2,3]`).
Se o usuário pediu para ir direto, não espere aprovação — siga; senão, peça um "ok" rápido.

### 3. Montar no Canva

1. **Criar o design com os layouts na ordem certa** usando `merge-designs`
   (`type: create_new_design`), com operações `insert_pages` apontando para a matriz e
   repetindo páginas quando precisar de mais slides do mesmo layout. Exemplo para
   capa + afirmação + 4 cenários + síntese + fechamento (todos os internos usam a pág. 2):
   ```json
   {"type":"create_new_design","title":"VOE — <tema>",
    "operations":[{"type":"insert_pages","source":{"type":"design","design_id":"DAHWamUxqas","page_numbers":[1,2,2,2,2,2,2,3]}}]}
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
   - Não altere, mova ou apague o logo "voe / Empreendedor" nem a grade de fundo.
   - Capa: a foto recortada do palestrante fica em uma camada acima do texto. Limite a
     caixa do título a ~600 px de largura para ele não invadir o rosto.
4. **Foto da capa: nunca repita a mesma foto em carrosséis seguidos.**
   - Banco de fotos: pasta do Canva **"VOE — Fotos capa"** (procure com `search-folders`
     e liste com `list-folder-items`, `item_types: ["image"]`). Se o usuário mandar fotos no
     chat, peça que ele suba no Canva (**Uploads**) e mova para essa pasta. O upload direto
     pelo `create-upload-url` depende do domínio `www.canva.com` estar liberado na rede do ambiente.
   - Antes de escolher, leia as capas dos 5 carrosséis VOE mais recentes (`search-designs`
     "VOE" por `modified_descending`, depois `read-design` na página 1) e **descarte os
     `mediaId` já usados**.
   - Critérios, em ordem:
     1. **Composição:** o palestrante fica na metade direita e o lado esquerdo fica livre para o título.
        Uma foto com a pessoa à esquerda serve se você espelhar a imagem (`flip_media` horizontal),
        desde que não haja texto legível no fundo.
     2. **Olhar e gesto combinando com o tema:** contando nos dedos → listas e números;
        falando para a plateia → liderança e opinião; postura firme, de pé, mão no bolso → autoridade;
        olhando para o lado do título → puxa a leitura (ideal).
     3. **Rosto nítido, olhos abertos, boca em posição natural.** Descarte fotos com olhos fechados.
     4. **Resolução alta**, porque a foto cobre 1080 px.
   - A capa da matriz v4 tem **uma** camada de foto (a primeira `rect`, 1722×1147). Troque com
     `update_fill`. Se o rosto ficar cortado ou atrás do título, ajuste o enquadramento com
     `crop_media` na mesma rect (ex.: `top` -120, `left` 262 empurra a pessoa para a direita e
     mostra a cabeça). Confira na miniatura antes de salvar.
   - Nunca use banco de imagens genérico: a capa sempre mostra os mentores e eventos reais do VOE.
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
- [ ] Capa com foto real + título curto em Bebas + subtítulo em Raleway itálico
- [ ] Logo VOE presente em todos os slides internos e no fechamento
- [ ] Bebas só em rótulos curtos (até ~4 palavras); frases em Raleway, caixa de frase, sem palavra órfã
- [ ] Miolo em fundo marinho `#010721` com grade; fechamento em azul royal `#00135e` com logo VOE
- [ ] Cada slide com **uma ideia só**, leitura em menos de 5 segundos
- [ ] Todo texto em um nível da escala áurea (110 / 68 / 42 / 26 px), um H1 por slide,
      no máximo 3 níveis, espaços de 42 e 68 px entre blocos
- [ ] Contraste "não é X, é Y" em algum ponto
- [ ] Último slide com frase-assinatura de empreendedor para empreendedor
- [ ] Sem textos em inglês, placeholders ("123 Anywhere St.") ou emojis soltos no design
- [ ] Português revisado (acentos, crase, concordância)
