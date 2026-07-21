# TLS Auto Guincho — redesign da landing page

**Data:** 2026-07-21
**Escopo:** redesenho visual completo da página única, mantendo Next.js 16 + Tailwind 4.

---

## 1. Contexto

TLS Auto Guincho atende Três Lagoas (MS) e região, 24 horas. A página tem um único
trabalho: **fazer quem está parado na beira da estrada tocar num número em poucos
segundos**, provavelmente de noite, no celular, com uma mão só.

O site atual (`src/app/page.tsx`) é branco corporativo com Oswald + Inter e paleta azul
clara. Isso contradiz a identidade real do cliente — o banner oficial e o caminhão são
noturnos, azul elétrico, com cone laranja. O redesign resolve essa tensão a favor da
marca real.

### Erros de conteúdo do site atual, a corrigir

- Lista só um WhatsApp; existem **dois**: (67) 99180-0229 e (67) 99110-6730.
- Lista "leves / pesados / bateria" e **esquece motos e utilitários**, que estão no
  material oficial.
- "Bateria" não aparece em nenhum material do cliente — **remover** até confirmação.
- Afirma "sistemas de roteirização" e "profissionais treinados" sem lastro — remover.

## 2. Fatos confirmados

Só estes entram na página.

| Fato | Fonte |
|---|---|
| Atendimento 24 horas | banner oficial |
| Três Lagoas e região, MS | banner oficial |
| WhatsApp (67) 99180-0229 | banner + adesivo na porta do caminhão |
| WhatsApp (67) 99110-6730 | banner + adesivo na porta do caminhão |
| Guincho leve e pesado, motos, veículos, utilitários | banner oficial |
| Rapidez, segurança, confiança | banner oficial |
| Ford Cargo 815e, plataforma Duricam, cone de sinalização | foto real `truck-side.jpg` |

**A confirmar com o cliente antes do lançamento:**

- Lista de municípios atendidos (e trechos de rodovia, se houver).
- Formas de pagamento aceitas (Pix, cartão na hora, convênio com seguradora).

Enquanto não confirmados, essas seções ficam com conteúdo marcado como pendente no
código e **não** vão para produção com dados inventados.

### Proibido

Sem tempo médio de chegada, sem contador de atendimentos, sem selo ou nota de
avaliação, sem depoimento fabricado. Nenhum número sem origem verificável.

## 3. Direção visual: Retrorrefletivo

O sistema visual deriva de um material real desse mundo: **fita retrorrefletiva de
segurança**. Fundo asfalto, chevron diagonal como estrutura, e uma regra física que
governa todo o resto — *superfícies só brilham quando a luz bate nelas*.

Isso evita o clichê de "fundo preto com um acento neon": o escuro aqui não é vazio, é
material, com luz direcional e um segundo acento (laranja de cone) que impede a leitura
monocromática.

Decisão deliberada: **sem textura de grão no fundo**. Superfícies limpas; a luz faz o
trabalho.

### 3.1 Cor

| Token | Hex | Papel |
|---|---|---|
| `asfalto` | `#0B0E14` | fundo base, quase-preto com viés azul |
| `noite` | `#131A2B` | superfície elevada, cartões, cabeçalho |
| `farol` | `#2F7BFF` | azul elétrico da marca — ações e links |
| `refletivo` | `#7FD4FF` | ciano pálido — o brilho da fita, estados acesos |
| `cone` | `#FF6A1F` | laranja de segurança — alerta; usado com avareza |
| `cal` | `#F2F5F8` | texto sobre escuro (evita o ofuscamento do branco puro) |

Contraste: `cal` sobre `asfalto` ≈ 16:1. `farol` sobre `asfalto` ≈ 5.4:1 — aprovado para
texto grande e elementos de interface, **não** para corpo de texto pequeno.

### 3.2 Tipografia

Três papéis. O par atual (Oswald + Inter) é o default de todo site automotivo e sai.

- **Archivo Expanded**, peso 800 — display. Larga e pesada, lê como letreiro de lataria
  de frota. Escolha oposta ao condensado clichê.
- **Overpass**, 400/600 — corpo. Derivada da Highway Gothic, a tipografia de placa de
  rodovia. Amarra a página ao mundo da estrada sem ilustrar nada.
- **Overpass Mono**, 600 — dados: telefones, cidades, classes de veículo, placa.

Carregar via `next/font/google` em `src/app/layout.tsx`, substituindo Oswald e Inter.

Escala de tipo (mobile → desktop):

| Papel | Tamanho | Face |
|---|---|---|
| Display herói | `clamp(3rem, 12vw, 8rem)` | Archivo Expanded 800 |
| Título de seção | `clamp(2rem, 5vw, 3.5rem)` | Archivo Expanded 800 |
| Corpo | `1.0625rem` / 1.6 | Overpass 400 |
| Sobrancelha / rótulo | `0.75rem`, `letter-spacing: 0.18em`, caixa alta | Overpass Mono 600 |
| Número de telefone | `clamp(1.5rem, 6vw, 2.25rem)` | Overpass Mono 600 |

### 3.3 Estrutura

**Sem marcadores `01 / 02 / 03`.** Os serviços não são uma sequência, então numerá-los
seria decoração. O dispositivo estrutural é honesto: **uma escala de peso ascendente**.
Moto → carro → utilitário → pesado é uma ordem real do mundo do reboque, e o eixo
horizontal codifica essa informação.

Ordem das seções:

1. **Cabeçalho** — fino, fixo, botão de chamada sempre visível.
2. **Herói** — sobrancelha (24 horas · Três Lagoas e região), display, dois blocos de
   telefone.
3. **Faixa chevron** — divisor estrutural.
4. **O que rebocamos** — escala de peso, 4 classes.
5. **O caminhão** — foto real + o que ela prova.
6. **Até onde vamos** — cobertura (pendente de confirmação).
7. **Como pagar** — formas de pagamento (pendente de confirmação).
8. **Rodapé** — nome, cidade, dois números, 24h.
9. **Barra fixa de chamada** no mobile — substitui o botão circular flutuante atual.

### 3.4 Assinatura

**A varredura de farol.**

Uma única passada de luz rasante atravessa o letreiro do herói no carregamento da
página. Depois disso, a mesma física governa toda interação: hover e foco de teclado não
trocam de cor — eles **acendem** o elemento, como um farol batendo em fita refletiva.

Uma ideia só, reaproveitada em todos os estados, em vez de efeitos espalhados. É o único
lugar onde a página gasta ousadia; todo o resto fica quieto.

Com `prefers-reduced-motion: reduce`, a varredura não roda e todos os elementos nascem
no estado aceso.

## 4. Texto

Português, registro direto, voz ativa. Frases curtas — quem lê está sob estresse.

- **Sobrancelha:** `24 HORAS · TRÊS LAGOAS E REGIÃO`
- **Display:** `PAROU?` / `A GENTE VAI.`
- **Apoio:** uma frase sobre reboque de moto a caminhão leve, sem adjetivo de venda.
- **Bloco de telefone 1:** número + `Chamar no WhatsApp`
- **Bloco de telefone 2:** número + `Se a primeira não atender, chame esta.`
  Essa frase existe porque é verdade e é útil — não é enfeite.
- **Seções:** `O QUE REBOCAMOS`, `O CAMINHÃO`, `ATÉ ONDE VAMOS`, `COMO PAGAR`.
  Títulos pelo que a pessoa procura, não pelo nome interno do serviço.

**"Segurança" não é declarada, é provada.** A seção do caminhão mostra a foto real e
nomeia o equipamento concreto — plataforma Duricam, cintas de amarração, sinalização,
cone. A tríade rapidez/segurança/confiança do banner não vira três cartões com ícone;
ela é o que a página demonstra.

## 5. Imagens

- `truck-side.jpg` — **usar**. Foto real, luz do dia, caminhão de verdade. É a prova.
- `hero-banner.jpg` — **não usar** como imagem. Serve como referência de marca e como
  fonte dos fatos.
- `tls-cartoon.jpg` — **não usar**. O mascote com olhos e sorriso destrói o refinamento
  da direção e destoa da foto real.
- `truck-front.jpg` — avaliar na implementação; usar só se acrescentar algo à seção do
  caminhão.

## 6. Arquitetura de código

O `page.tsx` atual tem 205 linhas com todo o markup inline. Isso já está grande demais
para uma página que vai crescer. A implementação quebra em componentes de seção, um por
arquivo, cada um com responsabilidade única:

```
src/
  app/
    layout.tsx        fontes (Archivo, Overpass, Overpass Mono) + metadata
    page.tsx          só compõe as seções, ~30 linhas
    globals.css       tokens @theme + a regra de luz
  components/
    site/
      Header.tsx
      Hero.tsx
      ChevronDivider.tsx
      WeightScale.tsx     "o que rebocamos"
      TruckProof.tsx      "o caminhão"
      Coverage.tsx        "até onde vamos"
      Payment.tsx         "como pagar"
      Footer.tsx
      CallBar.tsx         barra fixa no mobile
    ui/
      PhoneBlock.tsx      bloco de telefone, usado no herói e no rodapé
      LightSweep.tsx      a varredura, isolada
  lib/
    contact.ts        os dois números num só lugar
```

**Fonte única de contato:** `src/lib/contact.ts` exporta os dois números, os links
`wa.me` e o texto pré-preenchido. Nada de string de telefone repetida pelo markup — hoje
o `WHATSAPP_URL` está duplicado dentro do `page.tsx`.

**CSS:** os tokens vivem em `@theme` no `globals.css`. A regra de luz vira uma única
classe utilitária reaproveitada, não estilos ad-hoc por componente. Cuidado explícito com
especificidade: hoje `.clean-card` e `.btn-modern` competem com utilitários Tailwind;
evitar seletores de elemento que briguem com classes de seção.

**`ScrollReveal` e `Carousel`:** o carrossel some (o herói não é mais split com galeria).
O `ScrollReveal` é mantido, mas usado com muito mais parcimônia — hoje envolve quase todo
elemento da página, o que produz a sensação de "gerado por IA". Revelação só onde a
entrada da seção ganha com ela.

## 7. Piso de qualidade

Não negociável, e verificado antes de considerar pronto:

- Responsivo até 360px de largura; nenhum scroll horizontal no corpo.
- Foco de teclado visível em todo elemento interativo — usando a mesma regra de luz.
- `prefers-reduced-motion: reduce` respeitado: sem varredura, elementos acesos.
- Alvos de toque de no mínimo 44×44px, com folga nos blocos de telefone.
- Links de telefone com `tel:` além do `wa.me`, para quem prefere ligar.
- `alt` descritivo nas fotos.
- Contraste conforme a seção 3.1: `farol` não é usado em corpo de texto pequeno.

## 8. Fora de escopo

- Multi-página, blog, área de cliente.
- Formulário de contato — numa emergência, formulário é atrito. WhatsApp e telefone só.
- Mapa interativo. A cobertura é uma lista de cidades em texto.
- Modo claro. A marca é noturna.
- Integração analítica ou pixel de rastreamento.

## 9. Verificação

Ao final da implementação, com `npm run dev` no ar:

1. `npm run build` passa sem erro de tipo.
2. `npm run lint` passa.
3. Screenshot em 360px e em 1440px, conferindo a primeira dobra em ambos.
4. Navegação só por teclado do topo ao rodapé, confirmando foco visível em cada parada.
5. Conferir que nenhum fato não confirmado da seção 2 vazou para o markup.
