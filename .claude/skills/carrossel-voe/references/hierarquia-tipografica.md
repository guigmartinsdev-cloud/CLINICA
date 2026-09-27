# Hierarquia tipográfica — proporção áurea (φ = 1,618)

Todo texto do carrossel pertence a **um de quatro níveis**, e cada nível é o anterior
multiplicado por φ. Isso garante que o olho sempre saiba o que ler primeiro, segundo e
terceiro, e que todos os slides tenham o mesmo ritmo visual.

Base: **corpo = 42 px** (legível no celular em um slide de 1080 px).

| Nível | Nome | Cálculo | Tamanho | Entrelinha | Uso |
|---|---|---|---|---|---|
| H1 | **Cabeçalho** | 42 × φ² | **110 px** | 1,0 | A ideia do slide. Uma por slide. |
| H2 | **Subcabeçalho** | 42 × φ | **68 px** | 1,3 (1,2 no itálico da capa) | Complemento, virada, pergunta, lição. |
| P | **Corpo** | base | **42 px** | 1,6 (≈ φ) | Explicação, lista, exemplo, fala entre aspas. |
| S | **Apoio** | 42 ÷ φ | **26 px** | 1,3 | Rótulos pequenos, numeração "01/05", crédito. Raro. |

Arredonde sempre para esses valores; não invente tamanhos intermediários.
O logo "voe / Empreendedor" fica fora da escala, no rodapé de todo slide interno e do
fechamento, e não deve ser alterado nem apagado.

## Fontes: só duas

| Família | Papel | fontRef | Onde |
|---|---|---|---|
| **Bebas** (condensada, só maiúsculas) | Títulos, impacto | `YAD1bzJCL-s,0` | H1 de todos os slides (capa, internos, fechamento) |
| **Raleway** | Texto, leitura | `YAFdJhmxbVQ,1` | H2 e corpo. Itálico só no subtítulo da capa |

| Nível | Capa | Slides internos | Fechamento |
|---|---|---|---|
| H1 | Bebas, à esquerda | Bebas, centralizado | Bebas, centralizado |
| H2 | Raleway itálico | Raleway regular | — |
| P | — | Raleway regular 42 px (raro) | — |
| Logo | — | "voe / Empreendedor" no rodapé | "voe / Empreendedor" no rodapé |

Nenhuma outra fonte (Didot, caligráfica, sans padrão do Canva) entra no carrossel.
A caixa do logo força caixa alta e não deve ser reaproveitada para outro texto.

Cor: tudo branco `#ffffff`. A hierarquia vem de **tamanho e família** (Bebas × Raleway).

## Maiúsculas × minúsculas

| Onde | Caixa | Tamanho do texto |
|---|---|---|
| Bebas (H1) | Maiúsculas (a fonte já força) | Rótulo curto: até ~4 palavras, até 2 linhas |
| Raleway (H2/P) | Caixa de frase: maiúscula só no início, após ponto, em nomes próprios e siglas | Frase completa, até 3 linhas de ~22 caracteres |

- Frase longa em maiúsculas é lida devagar. Se o H1 tem verbo e passa de ~5 palavras,
  corte para um rótulo e leve a frase para a Raleway.
- Quebre linhas à mão (`\n`) para não deixar palavra sozinha na última linha.
- Números em Bebas: o "1" parece "I". Evite numerar itens no H1.

## Regras

1. **Máximo de 3 níveis por slide.** O normal é H1 + H2, ou H1 + P. Os três juntos só
   em slides de método/lista (H1 título, P lista, H2 fecho).
2. **Um H1 por slide.** Se duas frases disputam o topo, uma delas é H2.
3. **Não pule níveis de forma invertida:** nunca coloque um texto maior abaixo de um
   menor com a mesma função (ex.: o complemento nunca é maior que o cabeçalho).
4. **Linhas por nível:** H1 até 2 linhas (3 só na capa) · H2 até 3 linhas · P até 6 linhas.
   Se não couber, corte a copy — não reduza a fonte fora da escala.
   Exceção: um H1 longo (título da capa com mais de 7 palavras, ou H1 interno que passaria
   de 3 linhas) pode descer **um** degrau intermediário: 88 px (110 ÷ √φ). É o único
   ajuste permitido. A Bebas é condensada: com 110 px cabem ~19 caracteres por linha em 880 px. A Raleway a 68 px cabe ~24.

## Espaçamento áureo

Os espaços também seguem a escala, usando o corpo (42 px) como unidade:

| Espaço | Valor |
|---|---|
| Entre H1 e H2 / H1 e P | 42 px (1 × corpo) |
| Entre blocos distintos (ex.: lista e fecho) | 68 px (φ × corpo) |
| Margem lateral | 100 px (largura útil 880 px) |
| Margem superior/inferior mínima | 110 px |

## Posição vertical

- Slides internos e fechamento: o logo ocupa y ≈ 881–972. Centralize o bloco
  (H1 + 42 px + H2) na área 0–860. Tabela pronta:

  | H1 × H2 (linhas) | topo H1 | topo H2 |
  |---|---|---|
  | 1 × 2 | 268 | 442 |
  | 1 × 3 | 225 | 399 |
  | 2 × 2 | 214 | 498 |
  | 2 × 3 | 170 | 454 |
- Capa: texto alinhado à esquerda (x = 60), bloco começando na linha áurea inferior
  (y ≈ 668, 1080 × 0,618) quando a foto deixa o rosto no alto; se o rosto estiver
  na metade de baixo, suba o bloco para começar em y ≈ 170.
- Fechamento: mesma tabela; o logo fica fixo (não mova).

## Mapa por layout da matriz

| Layout | H1 | H2 | P |
|---|---|---|---|
| Capa | Título | Subtítulo | — |
| Afirmação central | Frase de crença | Virada ("Na prática, ...") | — |
| Lista / método | Título ("Quando precisar ...:") | Fecho no rodapé | Itens numerados |
| Cenário ❌/✅ | Rótulo (CLIENTE) | Lição em negrito | Falas ❌ e ✅ |
| Pergunta única | Pergunta | — | — |
| Síntese / item de lista | Frase ou nome do item | Complemento ("Responde: ...") | — |
| Fechamento | Frase-assinatura | — | Exercício, se houver |

## Como aplicar no Canva

Depois de `replace_text`, aplique o nível com `format_text` em cada caixa, por exemplo:

```json
{"type":"format_text","locator_id":"<id>","formatting":{"font_size":110,"line_height":1.0}}
{"type":"format_text","locator_id":"<id>","formatting":{"font_size":68,"line_height":1.3}}
{"type":"format_text","locator_id":"<id>","formatting":{"font_size":42,"line_height":1.6}}
```

A fonte já vem da matriz. Troque só tamanho, entrelinha e, na lição, `font_weight: bold`.
Então reposicione com `position_element` seguindo o espaçamento acima e confira na miniatura.
