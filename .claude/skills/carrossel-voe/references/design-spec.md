# Design — padrão Voe Empreendedor

Valores extraídos dos carrosséis publicados (Canva `DAHVQ6x7h9o`, `DAHV8rnoBhU`, `DAHInHG5i2M`).
Servem para conferir o resultado e para reconstruir um elemento se ele se perder. No fluxo
normal, esses valores vêm prontos das páginas da matriz.

## Formato
- Quadrado **1080 × 1080 px**
- Margem lateral útil: ~55–110 px; conteúdo sempre centralizado no eixo vertical do slide

## Paleta
| Uso | Cor |
|---|---|
| Fundo dos slides internos | `#010721` (azul-marinho quase preto) |
| Fundo do slide de fechamento | `#00135e` (azul royal escuro) |
| Grade quadriculada | imagem `MAFokHvNPTs` cobrindo 1080×1080, opacidade 5% (1% na capa) |
| Texto | `#ffffff` em tudo |
| Destaque em capas de evento | azul vivo (ex.: "5 VAGAS", "NO VOE IMERSÃO" com fundo azul) |

## Tipografia (fontRef do Canva)

> Os tamanhos abaixo são os dos carrosséis antigos. **Para carrosséis novos, os tamanhos,
> entrelinhas e espaçamentos seguem `hierarquia-tipografica.md` (escala áurea 110 / 68 / 42 / 26 px).**
> Esta tabela descreve os carrosséis ANTIGOS. As fontes atuais estão em `hierarquia-tipografica.md`
> (só Bebas + Raleway), e a matriz atual é `DAHWakYlTq4`.

| Papel | fontRef | Aparência | Tamanho típico |
|---|---|---|---|
| Título da capa | `YAD1bzJCL-s,0` | sans condensada, pesada, CAIXA ALTA (estilo Bebas) | 85–105 px, entrelinha 0,84 |
| Subtítulo da capa / logo "voe" | `YAFdJhmxbVQ,1` | sans geométrica; itálico no subtítulo | subtítulo 52 px itálico, justificado |
| Texto corrido / perguntas / rótulos | `YAEkCPhb2OU,0` | serifada humanista com cara de itálico caligráfico | 69 px (corpo), 101 px (frase grande/rótulo) |
| Títulos de apoio / fecho / assinatura | `YAFdJnPX3ZE,0` | serifada de alto contraste (estilo Didot) | 53–69 px; negrito para a lição |

Combinação característica: **uma linha em serifada Didot + a linha seguinte em serifada
itálica maior** (ex.: "Posicionamento não é" / "*identidade visual*"; "Descanso não é luxo." /
"*é ferramenta de gestão.*").

## Layouts

### Capa (página 1)
- Foto real de palestra/evento do VOE ocupando o slide (mentor em pé, público, luz de palco)
- Sobreposição de degradê azul (imagem `MAF4CHaM4bQ`, opacidade 0,83–0,93) escurecendo a
  metade de baixo ou o lado esquerdo, para o texto ler bem
- Bloco de texto alinhado à **esquerda**, no terço inferior ou no centro-esquerdo:
  - Título condensado CAIXA ALTA, 1–2 linhas
  - Subtítulo itálico branco, 1–3 linhas, logo abaixo
- Variação: palavra final do título em contorno/transparente (ex.: "SE EU APAGAR SUA ~~LOGO~~",
  com "logo" a 76% de opacidade)
- Variação evento: foto P&B, texto centralizado, número/palavra-chave em azul grande

### Afirmação central (página 2)
- Fundo marinho + grade
- 1 bloco centralizado, serifada 69 px, entrelinha 1,4, largura ~750 px
- 2 frases: a crença comum + a virada ("Na prática, ...")

### Lista / método (página 3)
- Título no topo (y≈108), Didot 69 px, centralizado, termina em ":"
- Lista numerada alinhada à esquerda (x≈108, largura 864), serifada 69 px, entrelinha 1,4
- Fecho no rodapé (y≈800), Didot 69 px, 2 linhas curtas e paralelas

### Cenário ❌/✅ (páginas 4–6)
- Rótulo no topo (y≈108), serifada 101 px, CAIXA ALTA (CLIENTE / FUNCIONÁRIO / FORNECEDOR)
- Grupo central: ícone ❌ + frase ruim entre aspas; 2 linhas abaixo, ícone ✅ + frase boa
  (serifada 69 px, entrelinha 0,79)
- Lição no rodapé (y≈860), Didot 53 px **negrito**, 2 linhas: "Você não X. Você Y."

### Pergunta única (matriz 2, páginas 3–6)
- Só uma pergunta, serifada 101 px, centralizada, 2 linhas

### Síntese (página 7)
- Frase grande (serifada 101 px) no terço superior: "X não é Y."
- Complemento (69 px) abaixo, 2–3 linhas

### Fechamento (página 8)
- Fundo `#00135e` + grade
- Frase-assinatura centralizada (Didot 69 px), com trechos-chave em **negrito**
  ou "Faça esse exercício:" + modelo para preencher com [colchetes]
- Logo abaixo: "voe" (`YAFdJhmxbVQ,1`, ~82 px) + "Empreendedor" (~20 px, espaçamento -0,077),
  centralizado, y≈745–870
