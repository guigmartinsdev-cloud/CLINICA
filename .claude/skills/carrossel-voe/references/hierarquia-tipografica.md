# Hierarquia tipográfica — proporção áurea (φ = 1,618)

Todo texto do carrossel pertence a **um de quatro níveis**, e cada nível é o anterior
multiplicado por φ. Isso garante que o olho sempre saiba o que ler primeiro, segundo e
terceiro, e que todos os slides tenham o mesmo ritmo visual.

Base: **corpo = 42 px** (legível no celular em um slide de 1080 px).

| Nível | Nome | Cálculo | Tamanho | Entrelinha | Uso |
|---|---|---|---|---|---|
| H1 | **Cabeçalho** | 42 × φ² | **110 px** | 1,0 | A ideia do slide. Uma por slide. |
| H2 | **Subcabeçalho** | 42 × φ | **68 px** | 1,2 | Complemento, virada, pergunta, lição. |
| P | **Corpo** | base | **42 px** | 1,6 (≈ φ) | Explicação, lista, exemplo, fala entre aspas. |
| S | **Apoio** | 42 ÷ φ | **26 px** | 1,3 | Rótulos pequenos, numeração "01/05", crédito. Raro. |

Arredonde sempre para esses valores; não invente tamanhos intermediários.
O logo "voe / Empreendedor" fica fora da escala e não deve ser alterado.

## Fonte e estilo por nível: 3 famílias, cada uma com um papel fixo

| Família | Papel | fontRef | Onde |
|---|---|---|---|
| **Bebas Neue** (condensada, CAIXA ALTA) | Impacto, para o scroll | `YAD1bzJCL-s,0` | Só no título da capa |
| **Didot** (serifada de alto contraste) | Autoridade, elegância | `YAFdJnPX3ZE,0` | H1 de todos os slides internos e do fechamento |
| **Sans** (limpa e legível) | Leitura | `YACgEZ1cb1Q,0` (padrão do Canva) · na capa, Raleway itálico `YAFdJhmxbVQ,1` | H2 e corpo |

| Nível | Capa (pág. 1) | Slides internos (pág. 2) | Fechamento (pág. 3) |
|---|---|---|---|
| H1 | Bebas | Didot | Didot |
| H2 | Raleway itálico | Sans | — |
| P | — | Sans | — |

Não misture outras fontes. A serifada caligráfica dos carrosséis antigos (`YAEkCPhb2OU`)
foi **descontinuada**: tem baixa legibilidade no celular e tira autoridade da marca.

Cor: tudo branco `#ffffff`. A hierarquia vem de **tamanho, fonte e peso**, não de cor.

## Regras

1. **Máximo de 3 níveis por slide.** O normal é H1 + H2, ou H1 + P. Os três juntos só
   em slides de método/lista (H1 título, P lista, H2 fecho).
2. **Um H1 por slide.** Se duas frases disputam o topo, uma delas é H2.
3. **Não pule níveis de forma invertida:** nunca coloque um texto maior abaixo de um
   menor com a mesma função (ex.: o complemento nunca é maior que o cabeçalho).
4. **Linhas por nível:** H1 até 3 linhas · H2 até 3 linhas · P até 6 linhas.
   Se não couber, corte a copy — não reduza a fonte fora da escala.
   Exceção: um H1 longo (título da capa com mais de 7 palavras, ou H1 interno que passaria
   de 3 linhas) pode descer **um** degrau intermediário: 88 px (110 ÷ √φ). É o único
   ajuste permitido. A Didot é larga: com 110 px cabem ~16 caracteres por linha em 880 px.

## Espaçamento áureo

Os espaços também seguem a escala, usando o corpo (42 px) como unidade:

| Espaço | Valor |
|---|---|
| Entre H1 e H2 / H1 e P | 42 px (1 × corpo) |
| Entre blocos distintos (ex.: lista e fecho) | 68 px (φ × corpo) |
| Margem lateral | 100 px (largura útil 880 px) |
| Margem superior/inferior mínima | 110 px |

## Posição vertical

- Divida a altura pelo ponto áureo: **1080 × 0,382 ≈ 412 px**.
- Bloco curto (H1 + H2 com até 4 linhas no total): o **topo do H1 fica em y ≈ 412 − altura do H1**,
  de modo que o cabeçalho "pouse" na linha áurea e o complemento fique logo abaixo dela.
- Bloco longo: centralize o conjunto em y = 540, mas o topo nunca acima de y = 255
  (1080 × 0,236).
- Capa: texto alinhado à esquerda (x = 60), bloco começando na linha áurea inferior
  (y ≈ 668, 1080 × 0,618) quando a foto deixa o rosto no alto; se o rosto estiver
  na metade de baixo, suba o bloco para começar em y ≈ 170.
- Fechamento: frase centralizada com o topo em y ≈ 255; o logo fica fixo (não mova).

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
{"type":"format_text","locator_id":"<id>","formatting":{"font_size":68,"line_height":1.2}}
{"type":"format_text","locator_id":"<id>","formatting":{"font_size":42,"line_height":1.6}}
```

A fonte já vem da matriz. Troque só tamanho, entrelinha e, na lição, `font_weight: bold`.
Então reposicione com `position_element` seguindo o espaçamento acima e confira na miniatura.
