# TLS Auto Guincho — Plano de Implementação do Redesign

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir a landing page atual do TLS Auto Guincho por um redesign na direção "Retrorrefletivo", corrigindo os erros de conteúdo e o débito técnico do código existente.

**Architecture:** O `page.tsx` monolítico de 205 linhas vira um compositor de ~30 linhas sobre componentes de seção, um por arquivo. Os dados de contato saem do markup e passam a viver em `src/lib/contact.ts`, com teste que fixa os dígitos. Seções que dependem de informação ainda não confirmada pelo cliente leem de arrays vazios e se auto-ocultam, tornando impossível publicar dado inventado.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4 (tokens via `@theme`), `next/font/google`, framer-motion (uso reduzido), Vitest.

**Spec:** `docs/superpowers/specs/2026-07-21-tls-guincho-redesign-design.md`

## Global Constraints

Estas regras valem para **toda** tarefa do plano.

- **Idioma:** todo texto visível ao usuário em português do Brasil. Comentários e nomes de código em português também, seguindo o padrão já usado no projeto.
- **Nenhum dado inventado.** Só entram na página os fatos da seção 2 da spec. Proibido: tempo médio de chegada, contador de atendimentos, nota/selo de avaliação, depoimento, nome de seguradora, cidade não confirmada, forma de pagamento não confirmada.
- **Os dois telefones:** `(67) 99180-0229` e `(67) 99110-6730`. Nunca escrever um número de telefone literal fora de `src/lib/contact.ts`.
- **Paleta — apenas estes seis valores:** `asfalto #0B0E14`, `noite #131A2B`, `farol #2F7BFF`, `refletivo #7FD4FF`, `cone #FF6A1F`, `cal #F2F5F8`. Nenhuma outra cor, exceto o verde oficial do WhatsApp se for usado num ícone de marca.
- **`farol` nunca em texto de corpo pequeno** — contraste ≈5.4:1, aprovado só para texto grande e elementos de interface.
- **Sem marcadores `01 / 02 / 03`** em lugar nenhum. Os serviços não são uma sequência.
- **`prefers-reduced-motion: reduce`** respeitado em toda animação introduzida.
- **Foco de teclado visível** em todo elemento interativo, com `outline` real — nunca dependendo apenas de brilho ou sombra.
- **Alvo de toque mínimo 44×44px.**
- Cada tarefa termina com `npx tsc --noEmit` limpo antes do commit.

## Estado inicial conhecido

Verificado em 2026-07-21, antes da primeira tarefa:

- **O projeto não compila.** `npx tsc --noEmit` retorna 2 erros, ambos em `src/app/page.tsx` (linhas 148 e 154): `ScrollReveal` recebe uma prop `as="li"` que não existe na sua interface. Os `<li>` acabam renderizados como `<div>` dentro de um `<ul>`. A Tarefa 8 apaga essas linhas; até lá, os dois erros permanecem em toda verificação e **não** devem ser confundidos com regressão.
- **As fontes estão apelidadas erradas.** `layout.tsx` carrega `Roboto` e `Montserrat`, mas as expõe como `--font-inter` e `--font-oswald`. O `globals.css` referencia esses nomes falsos. A Tarefa 1 desfaz isso por completo.
- `src/components/Carousel.tsx` só é usado pelo herói atual e é removido na Tarefa 8.

## Desvio consciente da spec

A spec (§6) dizia manter o `ScrollReveal` "com muito mais parcimônia". Ao
detalhar as tarefas ficou claro que nenhuma seção nova precisa dele: a
assinatura da página é **uma** passada de luz no herói, e revelações de rolagem
espalhadas por cima disso diluem exatamente o efeito que se quer preservar —
além de ser a marca registrada de página gerada por IA. Parcimônia levada ao
fim, aqui, é zero. O componente é **removido** na Tarefa 8, junto com o
`Carousel`. Manter um arquivo que ninguém importa é pior que apagá-lo: o git
guarda o histórico.

## Estrutura de arquivos alvo

```
src/
  app/
    layout.tsx          MODIFICAR  fontes novas, metadata, classes do body
    page.tsx            REESCREVER só compõe as seções
    globals.css         REESCREVER tokens @theme, regra de luz, chevron, varredura
  components/
    site/
      Header.tsx        CRIAR
      Hero.tsx          CRIAR
      ChevronDivider.tsx CRIAR
      WeightScale.tsx   CRIAR   "o que rebocamos"
      TruckProof.tsx    CRIAR   "o caminhão"
      Coverage.tsx      CRIAR   "até onde vamos"
      Payment.tsx       CRIAR   "como pagar"
      Footer.tsx        CRIAR
      CallBar.tsx       CRIAR   barra fixa no mobile
    ui/
      PhoneBlock.tsx    CRIAR   bloco de telefone reaproveitado
      LightSweep.tsx    CRIAR   a varredura, isolada
      SectionTitle.tsx  CRIAR   sobrancelha + título
    ScrollReveal.tsx    REMOVER  ver "Desvio consciente" abaixo
    Carousel.tsx        REMOVER
  lib/
    contact.ts          CRIAR   fonte única dos dois números
    contact.test.ts     CRIAR
    coverage.ts         CRIAR   cidades — vazio até confirmar
    payment.ts          CRIAR   pagamento — vazio até confirmar
```

---

### Task 1: Fundação — fontes, tokens e a regra de luz

Sem isto nenhuma seção pode ser estilizada. Inclui a limpeza das fontes apelidadas erradas e do `Script` não usado.

**Files:**
- Modify: `src/app/layout.tsx` (arquivo inteiro)
- Rewrite: `src/app/globals.css` (arquivo inteiro)

**Interfaces:**
- Consumes: nada.
- Produces: as classes utilitárias `.luz`, `.varredura`, `.chevron`, `.display`, `.sobrancelha` e os tokens de cor Tailwind `bg-asfalto`, `text-cal`, `border-refletivo`, `bg-farol`, `text-cone`, `bg-noite`.

- [ ] **Step 1: Substituir as fontes no layout**

Reescreva `src/app/layout.tsx` inteiro:

```tsx
import type { Metadata } from "next";
import { Archivo, Overpass, Overpass_Mono } from "next/font/google";
import "./globals.css";

// Os nomes das variáveis do next/font têm que ser DIFERENTES dos tokens
// --font-* do @theme, senão o Tailwind gera --font-display: var(--font-display)
// e a referência vira circular. Por isso o prefixo --fonte-.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--fonte-display",
  display: "swap",
});

const overpass = Overpass({
  subsets: ["latin"],
  variable: "--fonte-corpo",
  display: "swap",
});

const overpassMono = Overpass_Mono({
  subsets: ["latin"],
  variable: "--fonte-dado",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TLS Auto Guincho — 24 horas em Três Lagoas e região",
  description:
    "Guincho 24 horas em Três Lagoas e região. Reboque de moto, carro, utilitário e pesado. Chame pelo WhatsApp: (67) 99180-0229.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${archivo.variable} ${overpass.variable} ${overpassMono.variable} antialiased bg-asfalto text-cal font-corpo selection:bg-refletivo selection:text-asfalto`}
      >
        {children}
      </body>
    </html>
  );
}
```

Três coisas saíram de propósito: o import não usado de `Script`, o bloco comentado de Google Tag Manager (a spec põe rastreamento fora de escopo) e a meta `keywords`, que nenhum buscador usa desde 2009.

- [ ] **Step 2: Reescrever o globals.css**

Substitua `src/app/globals.css` inteiro:

```css
@import "tailwindcss";

@theme {
  --color-asfalto: #0b0e14;
  --color-noite: #131a2b;
  --color-farol: #2f7bff;
  --color-refletivo: #7fd4ff;
  --color-cone: #ff6a1f;
  --color-cal: #f2f5f8;

  --font-display: var(--fonte-display), ui-sans-serif, system-ui, sans-serif;
  --font-corpo: var(--fonte-corpo), ui-sans-serif, system-ui, sans-serif;
  --font-dado: var(--fonte-dado), ui-monospace, monospace;
}

@layer base {
  body {
    margin: 0;
    min-height: 100vh;
  }

  /* Nenhum elemento interativo perde o foco visível. O brilho é estética;
     o outline é a garantia. */
  :focus-visible {
    outline: 2px solid var(--color-refletivo);
    outline-offset: 3px;
  }
}

@layer components {
  /* Display: Archivo no eixo mais largo. Lê como letreiro de lataria. */
  .display {
    font-family: var(--font-display);
    font-weight: 800;
    font-stretch: 125%;
    line-height: 0.88;
    letter-spacing: -0.01em;
    text-transform: uppercase;
  }

  /* Sobrancelha e rótulos de dado. */
  .sobrancelha {
    font-family: var(--font-dado);
    font-weight: 600;
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  /* A ASSINATURA, parte 1: superfícies só brilham quando a luz bate nelas.
     Repouso = fosco. Hover e foco = aceso, como farol em fita refletiva.
     Uma regra só, reaproveitada em toda a página. */
  .luz {
    border: 1px solid rgb(127 212 255 / 0.16);
    transition:
      border-color 300ms ease,
      box-shadow 300ms ease;
  }

  /* Deliberadamente sem background-color: quem pinta o fundo é o markup,
     com bg-noite. Foi essa disputa entre classe e utilitário que fazia
     .clean-card e .btn-modern se anularem no CSS antigo. */

  .luz:hover,
  .luz:focus-within {
    border-color: rgb(127 212 255 / 0.85);
    box-shadow:
      0 0 32px -8px rgb(127 212 255 / 0.5),
      inset 0 0 24px -16px rgb(127 212 255 / 0.9);
  }

  /* Já acesa em repouso. Marca o que é primário sem usar outra cor. */
  .luz-acesa {
    border-color: rgb(127 212 255 / 0.6);
  }

  /* A ASSINATURA, parte 2: uma única passada de luz rasante na abertura. */
  .varredura {
    position: relative;
    display: block;
    overflow: hidden;
  }

  .varredura::after {
    content: "";
    position: absolute;
    inset-block: -20%;
    left: 0;
    width: 38%;
    pointer-events: none;
    mix-blend-mode: screen;
    background: linear-gradient(
      100deg,
      transparent,
      rgb(127 212 255 / 0.28) 45%,
      rgb(255 255 255 / 0.42) 50%,
      rgb(127 212 255 / 0.28) 55%,
      transparent
    );
    animation: varrer 1400ms cubic-bezier(0.4, 0, 0.2, 1) 260ms both;
  }

  @keyframes varrer {
    from {
      transform: translateX(-140%) skewX(-12deg);
    }
    to {
      transform: translateX(320%) skewX(-12deg);
    }
  }

  /* Faixa de sinalização traseira: é aqui que o laranja do cone se justifica. */
  .chevron {
    height: 14px;
    background-color: var(--color-noite);
    background-image: repeating-linear-gradient(
      115deg,
      var(--color-farol) 0 20px,
      var(--color-cone) 20px 40px
    );
    border-top: 1px solid rgb(127 212 255 / 0.35);
    border-bottom: 1px solid rgb(11 14 20 / 0.9);
  }
}

@media (prefers-reduced-motion: reduce) {
  /* A varredura não roda, e nada nasce dependendo dela para ser legível. */
  .varredura::after {
    display: none;
  }

  .luz {
    border-color: rgb(127 212 255 / 0.5);
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Nota sobre especificidade: as classes ficam em `@layer components`, que no Tailwind 4 tem prioridade **menor** que os utilitários. Um `bg-noite` no markup sobrescreve o `background-color` do `.luz` sem `!important`. Era esse conflito que quebrava `.clean-card` e `.btn-modern` no CSS antigo.

- [ ] **Step 3: Verificar que as fontes carregam e o build passa**

Rode:

```bash
npx tsc --noEmit
```

Esperado: ainda os **mesmos 2 erros** em `src/app/page.tsx` (148 e 154), herdados da linha-base. Nenhum erro novo, e nenhum erro em `layout.tsx` ou fora de `page.tsx`. Se aparecer erro dizendo que `axes: ["wdth"]` não é aceito para `Archivo`, troque por `weight: ["800"]` e remova a linha `font-stretch: 125%` do `.display`, registrando a troca no commit.

Depois:

```bash
npm run dev
```

Abra `http://localhost:3000` e confirme no DevTools → Computed que o `<body>` está com `font-family` resolvendo para Overpass. A página ainda está com o layout velho e vai parecer quebrada — isso é esperado, os tokens antigos (`brand-primary` etc.) não existem mais.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "Trocar fontes e tokens para a direção Retrorrefletivo

Roboto/Montserrat saem (estavam apelidados como --font-inter e
--font-oswald, que não correspondiam à fonte carregada). Entram
Archivo, Overpass e Overpass Mono.

Adiciona a regra de luz, a varredura e o chevron.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Fonte única dos contatos, com teste

Os dois telefones são o ativo mais valioso da página. Um dígito errado é uma falha silenciosa que ninguém percebe até o cliente reclamar que não recebe chamada. É a única coisa aqui que merece teste automatizado.

**Files:**
- Create: `src/lib/contact.ts`
- Create: `src/lib/contact.test.ts`
- Modify: `package.json` (dependência e script de teste)

**Interfaces:**
- Consumes: nada.
- Produces:
  - `type Linha = { id: "principal" | "reserva"; rotulo: string; numeroExibido: string; e164: string; nota?: string }`
  - `LINHAS: readonly Linha[]` — exatamente 2 itens, principal primeiro
  - `linkWhatsapp(linha: Linha): string`
  - `linkTelefone(linha: Linha): string`
  - `MENSAGEM_PADRAO: string`

- [ ] **Step 1: Instalar o Vitest**

```bash
npm install --save-dev vitest
```

Adicione o script em `package.json`, dentro de `"scripts"`, logo após `"lint"`:

```json
    "test": "vitest run"
```

O Vitest roda sem arquivo de configuração. O teste importa por caminho relativo (`./contact`), então não precisa do plugin de alias para resolver `@/`.

- [ ] **Step 2: Escrever o teste que falha**

Crie `src/lib/contact.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { LINHAS, linkTelefone, linkWhatsapp } from "./contact";

describe("contatos do TLS", () => {
  it("expõe as duas linhas do cliente, principal primeiro", () => {
    expect(LINHAS.map((linha) => linha.numeroExibido)).toEqual([
      "(67) 99180-0229",
      "(67) 99110-6730",
    ]);
  });

  it("monta o link do WhatsApp só com dígitos, no formato internacional", () => {
    expect(linkWhatsapp(LINHAS[0])).toBe(
      "https://wa.me/5567991800229?text=Ol%C3%A1!%20Preciso%20de%20guincho%20em%20Tr%C3%AAs%20Lagoas.",
    );
  });

  it("monta o link de telefone em E.164", () => {
    expect(linkTelefone(LINHAS[1])).toBe("tel:+5567991106730");
  });

  it("dá uma nota à linha reserva explicando quando usá-la", () => {
    expect(LINHAS[1].nota).toBe("Se a primeira não atender, chame esta.");
  });
});
```

- [ ] **Step 3: Rodar o teste e confirmar que falha**

```bash
npm test
```

Esperado: FAIL, com erro de resolução do módulo `./contact` — o arquivo ainda não existe.

- [ ] **Step 4: Implementar**

Crie `src/lib/contact.ts`:

```ts
/**
 * Fonte única dos contatos do TLS Auto Guincho.
 *
 * Nenhum número de telefone deve ser escrito literalmente em outro arquivo.
 * Os dois números vêm do banner oficial do cliente e do adesivo na porta do
 * caminhão (public/images/truck-side.jpg).
 */

export const MENSAGEM_PADRAO = "Olá! Preciso de guincho em Três Lagoas.";

export type Linha = {
  id: "principal" | "reserva";
  rotulo: string;
  numeroExibido: string;
  /** Formato E.164, usado no link tel: e como base do link do WhatsApp. */
  e164: string;
  /** Explica ao leitor quando recorrer a esta linha. */
  nota?: string;
};

export const LINHAS: readonly Linha[] = [
  {
    id: "principal",
    rotulo: "Linha 1",
    numeroExibido: "(67) 99180-0229",
    e164: "+5567991800229",
  },
  {
    id: "reserva",
    rotulo: "Linha 2",
    numeroExibido: "(67) 99110-6730",
    e164: "+5567991106730",
    nota: "Se a primeira não atender, chame esta.",
  },
];

export function linkWhatsapp(linha: Linha): string {
  const digitos = linha.e164.replace(/\D/g, "");
  return `https://wa.me/${digitos}?text=${encodeURIComponent(MENSAGEM_PADRAO)}`;
}

export function linkTelefone(linha: Linha): string {
  return `tel:${linha.e164}`;
}
```

- [ ] **Step 5: Rodar o teste e confirmar que passa**

```bash
npm test
```

Esperado: PASS, 4 testes.

- [ ] **Step 6: Commit**

```bash
git add src/lib/contact.ts src/lib/contact.test.ts package.json package-lock.json
git commit -m "Centralizar os dois telefones em src/lib/contact.ts

Os números eram literais duplicados dentro de page.tsx, e o site só
expunha um dos dois. Teste fixa os dígitos e o formato dos links.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Blocos de apoio — PhoneBlock, LightSweep, SectionTitle

Três peças pequenas que as seções seguintes consomem. Agrupadas porque nenhuma vale um ciclo de revisão sozinha.

**Files:**
- Create: `src/components/ui/PhoneBlock.tsx`
- Create: `src/components/ui/LightSweep.tsx`
- Create: `src/components/ui/SectionTitle.tsx`

**Interfaces:**
- Consumes: `Linha`, `linkWhatsapp`, `linkTelefone` da Tarefa 2; classes `.luz`, `.varredura`, `.display`, `.sobrancelha` da Tarefa 1.
- Produces:
  - `<PhoneBlock linha={Linha} destaque?: boolean />`
  - `<LightSweep>{children}</LightSweep>`
  - `<SectionTitle sobrancelha={string} titulo={string} id?: string />`

- [ ] **Step 1: Criar o LightSweep**

Crie `src/components/ui/LightSweep.tsx`. É puro CSS — sem `"use client"`, sem JavaScript no cliente:

```tsx
import type { ReactNode } from "react";

/**
 * A assinatura da página: uma única passada de luz rasante na abertura.
 * A animação e o respeito a prefers-reduced-motion vivem na classe
 * .varredura, em globals.css.
 */
export default function LightSweep({ children }: { children: ReactNode }) {
  return <span className="varredura">{children}</span>;
}
```

- [ ] **Step 2: Criar o PhoneBlock**

Crie `src/components/ui/PhoneBlock.tsx`:

```tsx
import { MessageCircle, Phone } from "lucide-react";
import { linkTelefone, linkWhatsapp, type Linha } from "@/lib/contact";

/**
 * Bloco de telefone. Usado no herói e no rodapé.
 *
 * Oferece as duas saídas de propósito: quem está na estrada pode preferir
 * ligar a digitar. O alvo do WhatsApp ocupa o bloco inteiro; o "ligar" é
 * um alvo separado de 44px dentro dele.
 *
 * `destaque` marca a linha principal fazendo-a nascer acesa, em vez de
 * introduzir uma segunda cor.
 */
export default function PhoneBlock({
  linha,
  destaque = false,
}: {
  linha: Linha;
  destaque?: boolean;
}) {
  return (
    <div
      className={`luz bg-noite flex flex-col gap-3 p-5 sm:p-6 ${destaque ? "luz-acesa" : ""}`}
    >
      <span className="sobrancelha text-refletivo/70">{linha.rotulo}</span>

      <a
        href={linkWhatsapp(linha)}
        className="group flex items-center justify-between gap-4"
      >
        <span className="font-dado text-[clamp(1.5rem,6vw,2.25rem)] font-semibold tracking-tight text-cal">
          {linha.numeroExibido}
        </span>
        <MessageCircle
          className="size-7 shrink-0 text-farol transition-colors group-hover:text-refletivo"
          aria-hidden="true"
        />
        <span className="sr-only">Chamar no WhatsApp</span>
      </a>

      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-cal/60">
          {linha.nota ?? "Chamar no WhatsApp"}
        </span>
        <a
          href={linkTelefone(linha)}
          className="sobrancelha flex min-h-11 min-w-11 items-center justify-center gap-2 px-2 text-refletivo"
        >
          <Phone className="size-4" aria-hidden="true" />
          Ligar
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Criar o SectionTitle**

Crie `src/components/ui/SectionTitle.tsx`:

```tsx
/**
 * Sobrancelha + título de seção. O `id` vai no <h2> para servir de alvo
 * de aria-labelledby na <section> que o envolve.
 */
export default function SectionTitle({
  sobrancelha,
  titulo,
  id,
}: {
  sobrancelha: string;
  titulo: string;
  id?: string;
}) {
  return (
    <div className="mb-12 flex flex-col gap-4">
      <span className="sobrancelha text-farol">{sobrancelha}</span>
      <h2 id={id} className="display text-[clamp(2rem,5vw,3.5rem)] text-cal">
        {titulo}
      </h2>
    </div>
  );
}
```

- [ ] **Step 4: Verificar tipos**

```bash
npx tsc --noEmit
```

Esperado: os mesmos 2 erros de `page.tsx` da linha-base. Nenhum erro nos três arquivos novos.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui
git commit -m "Adicionar PhoneBlock, LightSweep e SectionTitle

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Cabeçalho e herói

A primeira dobra. É o que decide se a pessoa chama ou fecha.

**Files:**
- Create: `src/components/site/Header.tsx`
- Create: `src/components/site/Hero.tsx`

**Interfaces:**
- Consumes: `PhoneBlock`, `LightSweep` (Tarefa 3); `LINHAS`, `linkWhatsapp` (Tarefa 2).
- Produces: `<Header />` e `<Hero />`, ambos sem props.

- [ ] **Step 1: Criar o Header**

Crie `src/components/site/Header.tsx`:

```tsx
import { Truck } from "lucide-react";
import { LINHAS, linkWhatsapp } from "@/lib/contact";

/**
 * Cabeçalho fino e fixo. Uma única ação, sempre visível: chamar.
 * Não há menu de navegação — a página é curta e quem chega aqui está
 * com pressa.
 */
export default function Header() {
  const principal = LINHAS[0];

  return (
    <header className="sticky top-0 z-50 border-b border-refletivo/15 bg-asfalto/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#" className="flex items-center gap-3">
          <Truck className="size-6 text-farol" aria-hidden="true" />
          <span className="display text-lg text-cal">TLS Auto Guincho</span>
        </a>

        <a
          href={linkWhatsapp(principal)}
          className="sobrancelha flex min-h-11 items-center bg-farol px-4 text-asfalto transition-colors hover:bg-refletivo"
        >
          Chamar agora
        </a>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Criar o Hero**

Crie `src/components/site/Hero.tsx`:

```tsx
import PhoneBlock from "@/components/ui/PhoneBlock";
import LightSweep from "@/components/ui/LightSweep";
import { LINHAS } from "@/lib/contact";

/**
 * O herói não é uma foto nem um número grande com gradiente. É a chamada.
 * A varredura de luz passa uma vez sobre o letreiro; depois disso a mesma
 * física governa hover e foco no resto da página.
 */
export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pt-24">
      <span className="sobrancelha text-refletivo">
        24 horas · Três Lagoas e região · MS
      </span>

      <h1 className="mt-6 max-w-4xl">
        <LightSweep>
          <span className="display block text-[clamp(3rem,12vw,8rem)] text-cal">
            Parou?
            <br />
            <span className="text-farol">A gente vai.</span>
          </span>
        </LightSweep>
      </h1>

      <p className="mt-8 max-w-md text-lg leading-relaxed text-cal/70">
        Reboque de moto, carro, utilitário e pesado — a qualquer hora, em Três
        Lagoas e região.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {LINHAS.map((linha) => (
          <PhoneBlock
            key={linha.id}
            linha={linha}
            destaque={linha.id === "principal"}
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verificar tipos**

```bash
npx tsc --noEmit
```

Esperado: os mesmos 2 erros de `page.tsx`. Nada novo.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/Header.tsx src/components/site/Hero.tsx
git commit -m "Adicionar cabeçalho e herói

Herói abre com a chamada, não com foto. Os dois números aparecem
lado a lado, com a nota explicando quando usar a linha 2.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 5: Faixa chevron e a escala de peso

O dispositivo estrutural da página. **Não** numerar os itens: a ordem que importa é o peso do veículo, e ela é codificada pelo tamanho crescente dos marcadores.

**Files:**
- Create: `src/components/site/ChevronDivider.tsx`
- Create: `src/components/site/WeightScale.tsx`

**Interfaces:**
- Consumes: `SectionTitle` (Tarefa 3); classe `.chevron` (Tarefa 1).
- Produces: `<ChevronDivider />` e `<WeightScale />`, ambos sem props.

- [ ] **Step 1: Criar o ChevronDivider**

Crie `src/components/site/ChevronDivider.tsx`:

```tsx
/**
 * Faixa de sinalização traseira. Divisor estrutural, e o único lugar onde
 * o laranja do cone aparece em área — é onde ele se justifica.
 */
export default function ChevronDivider() {
  return <div className="chevron" role="presentation" />;
}
```

- [ ] **Step 2: Criar o WeightScale**

Crie `src/components/site/WeightScale.tsx`:

```tsx
import SectionTitle from "@/components/ui/SectionTitle";

/**
 * As quatro classes que o cliente reboca, do mais leve ao mais pesado.
 *
 * A ordem é informação real, então o marcador de cada estação cresce da
 * esquerda para a direita. Nada de "01 / 02 / 03" — isso seria numerar uma
 * lista que não é uma sequência.
 *
 * As quatro categorias vêm do banner oficial. As descrições são curtas de
 * propósito: só afirmam o escopo da categoria, sem prometer técnica ou
 * equipamento que não foi confirmado com o cliente.
 */
const CLASSES = [
  { nome: "Moto", descricao: "Duas rodas, sobre a plataforma.", altura: "h-4" },
  { nome: "Carro", descricao: "Passeio e SUV.", altura: "h-8" },
  { nome: "Utilitário", descricao: "Vans e veículos de trabalho.", altura: "h-14" },
  { nome: "Pesado", descricao: "Guincho pesado.", altura: "h-24" },
] as const;

export default function WeightScale() {
  return (
    <section
      id="servicos"
      aria-labelledby="titulo-servicos"
      className="mx-auto max-w-6xl px-5 py-24"
    >
      <SectionTitle
        sobrancelha="Do mais leve ao mais pesado"
        titulo="O que rebocamos"
        id="titulo-servicos"
      />

      <ul className="grid gap-px border-t border-refletivo/20 sm:grid-cols-2 lg:grid-cols-4">
        {CLASSES.map((classe) => (
          <li key={classe.nome} className="luz flex flex-col gap-4 p-6">
            <div className="flex items-end" aria-hidden="true">
              <span className={`${classe.altura} w-1.5 bg-farol`} />
            </div>
            <h3 className="display text-2xl text-cal">{classe.nome}</h3>
            <p className="text-sm leading-relaxed text-cal/65">
              {classe.descricao}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 3: Verificar tipos**

```bash
npx tsc --noEmit
```

Esperado: os mesmos 2 erros de `page.tsx`. Nada novo.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/ChevronDivider.tsx src/components/site/WeightScale.tsx
git commit -m "Adicionar faixa chevron e a escala de peso

Corrige o conteúdo: motos e utilitários voltam (estavam faltando) e
'bateria' sai, porque não aparece em nenhum material do cliente.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 6: A prova — a seção do caminhão

Aqui "segurança" deixa de ser adjetivo. A foto real e o equipamento nomeado fazem o trabalho que três cartões com ícone não fazem.

**Files:**
- Create: `src/components/site/TruckProof.tsx`

**Interfaces:**
- Consumes: `SectionTitle` (Tarefa 3); `public/images/truck-side.jpg`.
- Produces: `<TruckProof />`, sem props.

- [ ] **Step 1: Criar o TruckProof**

Crie `src/components/site/TruckProof.tsx`:

```tsx
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";

/**
 * Só entram aqui detalhes visíveis na própria foto ou no material oficial
 * do cliente. Nada de "profissionais treinados" ou "sistemas de
 * roteirização", que o site antigo afirmava sem lastro.
 */
const PROVAS = [
  { rotulo: "Veículo", valor: "Ford Cargo 815e" },
  { rotulo: "Plataforma", valor: "Duricam" },
  { rotulo: "Sinalização", valor: "Giroflex e cone" },
  { rotulo: "Disponibilidade", valor: "24 horas" },
] as const;

export default function TruckProof() {
  return (
    <section
      aria-labelledby="titulo-caminhao"
      className="mx-auto max-w-6xl px-5 py-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="luz relative aspect-4/5 overflow-hidden sm:aspect-3/2 lg:aspect-4/5">
          <Image
            src="/images/truck-side.jpg"
            alt="Guincho plataforma da TLS Auto Guincho estacionado em rua de Três Lagoas, com cone de sinalização sobre a plataforma."
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <SectionTitle
            sobrancelha="A prova"
            titulo="O caminhão que chega"
            id="titulo-caminhao"
          />

          <p className="max-w-md text-lg leading-relaxed text-cal/70">
            Seu veículo sobe inteiro na plataforma — não vai puxado, não
            arrasta. É esta a foto do guincho, não um catálogo.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px border-t border-refletivo/20">
            {PROVAS.map((prova) => (
              <div key={prova.rotulo} className="luz p-5">
                <dt className="sobrancelha text-refletivo/70">{prova.rotulo}</dt>
                <dd className="font-dado mt-2 text-base text-cal">
                  {prova.valor}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar tipos e o aspect ratio**

```bash
npx tsc --noEmit
```

Esperado: os mesmos 2 erros de `page.tsx`.

As classes `aspect-4/5` e `aspect-3/2` são sintaxe de razão arbitrária do Tailwind 4. Se não renderizarem, troque por `aspect-[4/5]` e `aspect-[3/2]`.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/TruckProof.tsx
git commit -m "Adicionar a seção do caminhão

Segurança provada pela foto real e pelo equipamento nomeado, em vez
de declarada em cartão com ícone.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 7: Cobertura e pagamento — seções que não podem mentir

As duas leem de módulos de dados e **retornam `null` quando o array está vazio**. Assim é impossível publicar cidade ou forma de pagamento inventada, e a seção aparece sozinha no instante em que o dado real for preenchido.

**Pagamento ships visível:** Pix e cartão de crédito, confirmados com a cliente em 2026-07-21.

**Cobertura ships oculta:** a cliente confirmou "Três Lagoas - MS e região", que é um fato único e já aparece na sobrancelha do herói e no rodapé. Uma seção para repetir isso numa etiqueta só seria enchimento. O componente e o módulo ficam prontos para quando houver a lista de municípios.

**Files:**
- Create: `src/lib/coverage.ts`
- Create: `src/lib/payment.ts`
- Create: `src/components/site/Coverage.tsx`
- Create: `src/components/site/Payment.tsx`

**Interfaces:**
- Consumes: `SectionTitle` (Tarefa 3).
- Produces:
  - `CIDADES: readonly string[]` — vazio por decisão, ver acima
  - `FORMAS_PAGAMENTO: readonly string[]` — `["Pix", "Cartão de crédito"]`
  - `<Coverage />` e `<Payment />`, ambos sem props, ambos renderizando `null` quando o array correspondente está vazio.

- [ ] **Step 1: Criar os dois módulos de dados**

Crie `src/lib/coverage.ts`:

```ts
/**
 * Municípios atendidos, um por item.
 *
 * Intencionalmente vazio. A cliente confirmou apenas "Três Lagoas - MS e
 * região", que é um fato único, não uma lista — e ele já aparece na
 * sobrancelha do herói e no rodapé. Uma seção inteira para repetir isso em
 * uma etiqueta só seria enchimento.
 *
 * Preencha quando houver a lista real de municípios: a seção "Até onde
 * vamos" passa a ser renderizada sozinha. Não preencha com suposição —
 * publicar uma cidade que o cliente não atende gera chamada que ele não
 * pode cumprir.
 */
export const CIDADES: readonly string[] = [];
```

Crie `src/lib/payment.ts`:

```ts
/**
 * Formas de pagamento aceitas. Confirmadas com a cliente em 2026-07-21.
 *
 * Se este array ficar vazio, a seção "Como pagar" deixa de ser renderizada.
 * Não acrescente forma de pagamento sem confirmação — numa emergência, a
 * pessoa decide chamar contando com o que está escrito aqui.
 */
export const FORMAS_PAGAMENTO: readonly string[] = ["Pix", "Cartão de crédito"];
```

- [ ] **Step 2: Criar o Coverage**

Crie `src/components/site/Coverage.tsx`:

```tsx
import SectionTitle from "@/components/ui/SectionTitle";
import { CIDADES } from "@/lib/coverage";

export default function Coverage() {
  if (CIDADES.length === 0) return null;

  return (
    <section
      aria-labelledby="titulo-cobertura"
      className="mx-auto max-w-6xl px-5 py-24"
    >
      <SectionTitle
        sobrancelha="Cobertura"
        titulo="Até onde vamos"
        id="titulo-cobertura"
      />

      <ul className="flex flex-wrap gap-3">
        {CIDADES.map((cidade) => (
          <li key={cidade} className="luz font-dado px-4 py-3 text-sm text-cal">
            {cidade}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 3: Criar o Payment**

Crie `src/components/site/Payment.tsx`:

```tsx
import SectionTitle from "@/components/ui/SectionTitle";
import { FORMAS_PAGAMENTO } from "@/lib/payment";

export default function Payment() {
  if (FORMAS_PAGAMENTO.length === 0) return null;

  return (
    <section
      aria-labelledby="titulo-pagamento"
      className="mx-auto max-w-6xl px-5 py-24"
    >
      <SectionTitle
        sobrancelha="Sem surpresa"
        titulo="Como pagar"
        id="titulo-pagamento"
      />

      <ul className="grid gap-px border-t border-refletivo/20 sm:grid-cols-2">
        {FORMAS_PAGAMENTO.map((forma) => (
          <li key={forma} className="luz p-6">
            <span className="display text-xl text-cal">{forma}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Verificar que as seções somem quando vazias**

```bash
npx tsc --noEmit
```

Esperado: os mesmos 2 erros de `page.tsx`.

O ESLint pode acusar `CIDADES.length === 0` como comparação sempre verdadeira, já que o tipo é um array literal vazio. Se isso acontecer, anote o tipo explicitamente como `readonly string[]` — já está assim nos dois módulos, o que deve bastar.

- [ ] **Step 5: Commit**

```bash
git add src/lib/coverage.ts src/lib/payment.ts src/components/site/Coverage.tsx src/components/site/Payment.tsx
git commit -m "Adicionar cobertura e pagamento, ocultas até haver dado real

As seções retornam null com array vazio. Torna impossível publicar
cidade ou forma de pagamento inventada.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 8: Rodapé, barra de chamada e a montagem da página

A tarefa que apaga o site velho. Depois dela o `tsc` fica limpo pela primeira vez.

**Files:**
- Create: `src/components/site/Footer.tsx`
- Create: `src/components/site/CallBar.tsx`
- Rewrite: `src/app/page.tsx`
- Delete: `src/components/Carousel.tsx`
- Delete: `src/components/ScrollReveal.tsx`

**Interfaces:**
- Consumes: tudo das tarefas 2 a 7.
- Produces: a página completa.

- [ ] **Step 1: Criar o Footer**

Crie `src/components/site/Footer.tsx`:

```tsx
import { Truck } from "lucide-react";
import PhoneBlock from "@/components/ui/PhoneBlock";
import { LINHAS } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="border-t border-refletivo/15 pb-28 pt-20 sm:pb-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <Truck className="size-6 text-farol" aria-hidden="true" />
            <span className="display text-xl text-cal">TLS Auto Guincho</span>
          </div>
          <p className="sobrancelha mt-4 text-cal/50">
            Três Lagoas · MS · 24 horas
          </p>
          <p className="mt-8 text-sm text-cal/40">
            © {new Date().getFullYear()} TLS Auto Guincho
          </p>
        </div>

        <div className="grid gap-4">
          {LINHAS.map((linha) => (
            <PhoneBlock key={linha.id} linha={linha} />
          ))}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Criar o CallBar**

Crie `src/components/site/CallBar.tsx`. Substitui o botão circular flutuante do site antigo, que cobria conteúdo e tinha alvo pequeno:

```tsx
import { MessageCircle } from "lucide-react";
import { LINHAS, linkWhatsapp } from "@/lib/contact";

/**
 * Barra fixa de chamada, só no mobile. No desktop os blocos de telefone
 * do herói e do rodapé já dão conta, e uma barra fixa só rouba altura.
 */
export default function CallBar() {
  const principal = LINHAS[0];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-refletivo/25 bg-asfalto/95 p-3 backdrop-blur sm:hidden">
      <a
        href={linkWhatsapp(principal)}
        className="sobrancelha flex min-h-12 items-center justify-center gap-3 bg-farol text-asfalto"
      >
        <MessageCircle className="size-5" aria-hidden="true" />
        Chamar guincho agora
      </a>
    </div>
  );
}
```

- [ ] **Step 3: Reescrever o page.tsx**

Substitua `src/app/page.tsx` inteiro. Só composição — a página passa de 205 para ~30 linhas:

```tsx
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import ChevronDivider from "@/components/site/ChevronDivider";
import WeightScale from "@/components/site/WeightScale";
import TruckProof from "@/components/site/TruckProof";
import Coverage from "@/components/site/Coverage";
import Payment from "@/components/site/Payment";
import Footer from "@/components/site/Footer";
import CallBar from "@/components/site/CallBar";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ChevronDivider />
        <WeightScale />
        <TruckProof />
        <Coverage />
        <Payment />
      </main>
      <Footer />
      <CallBar />
    </>
  );
}
```

- [ ] **Step 4: Remover o Carousel e o ScrollReveal**

O herói não é mais dividido com galeria, e nenhum componente novo usa revelação de rolagem — ver "Desvio consciente" no topo do plano:

```bash
git rm src/components/Carousel.tsx src/components/ScrollReveal.tsx
grep -rn "Carousel\|ScrollReveal" src/
```

Esperado do `grep`: nenhuma linha. Se aparecer alguma, remova a referência antes de seguir.

Com isso o `framer-motion` fica sem nenhum consumidor. Deixe a dependência no `package.json` por ora — removê-la é uma limpeza separada, e a Tarefa 9 ainda pode motivar uma animação.

- [ ] **Step 5: Verificar que tudo passa**

```bash
npx tsc --noEmit && npm run lint && npm test && npm run build
```

Esperado: `tsc` **sem nenhum erro** — os 2 erros herdados da linha-base desaparecem aqui, porque as linhas que passavam `as="li"` foram apagadas. Lint limpo, 4 testes passando, build concluído.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Montar a página nova e remover o site antigo

page.tsx cai de 205 para ~30 linhas, só compondo seções. Carousel e
ScrollReveal saem. Os 2 erros de tipo herdados (ScrollReveal as='li')
somem junto com o markup velho.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 9: Piso de qualidade

Nada aqui é opcional. A spec chama isto de piso, e piso se verifica olhando, não supondo.

**Files:**
- Modify: qualquer componente que falhe numa das verificações abaixo.

**Interfaces:**
- Consumes: a página completa da Tarefa 8.
- Produces: nada novo.

- [ ] **Step 1: Subir o servidor**

```bash
npm run dev
```

- [ ] **Step 2: Conferir a largura mínima**

No DevTools, ponha a viewport em **360×640**. Percorra a página inteira.

Falha se: houver barra de rolagem horizontal, texto cortado, o letreiro do herói estourar a largura, ou a `CallBar` cobrir conteúdo do rodapé. O `pb-28` no `Footer` existe justamente para dar essa folga — confirme que basta.

- [ ] **Step 3: Percorrer só com o teclado**

Do topo ao rodapé, usando apenas Tab.

Falha se: qualquer parada não mostrar um contorno visível, a ordem de foco pular seções, ou algum link ficar inalcançável. Confirme que cada bloco de telefone dá **duas** paradas: o WhatsApp e o "Ligar".

- [ ] **Step 4: Conferir o reduced-motion**

DevTools → Rendering → **Emulate CSS media feature prefers-reduced-motion: reduce**. Recarregue.

Falha se: a varredura ainda passar pelo letreiro, ou se as bordas dos blocos `.luz` ficarem fracas demais para separar os cartões sem hover.

- [ ] **Step 5: Conferir os links de contato**

Inspecione cada `href` de WhatsApp e de telefone na página.

Falha se: algum apontar para número diferente de `5567991800229` ou `5567991106730`, ou se algum telefone estiver escrito literalmente no markup em vez de vir de `src/lib/contact.ts`.

```bash
grep -rn "99180\|99110\|wa.me" src/ --include=*.tsx
```

Esperado: **nenhuma linha**. Todos os números vivem em `src/lib/contact.ts`.

- [ ] **Step 6: Caçar fato inventado**

Leia todo o texto visível da página. Confronte com a seção 2 da spec.

Falha se: aparecer qualquer tempo de chegada, quantidade de atendimentos, nota de avaliação, nome de seguradora, cidade além de "Três Lagoas e região", ou forma de pagamento.

- [ ] **Step 7: Tirar as duas capturas**

Uma em 360px e uma em 1440px, mostrando a primeira dobra. Guarde para comparar com o site antigo (`git show c82fdbc`) e para mostrar à cliente.

- [ ] **Step 8: Commit de qualquer correção**

```bash
git add -A
git commit -m "Corrigir achados do piso de qualidade

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Pendências para a cliente

Depois da Tarefa 9 o site está publicável. Uma seção segue oculta:

- **Cidades atendidas** → preencher `CIDADES` em `src/lib/coverage.ts` com a lista real de municípios. A seção "Até onde vamos" aparece sozinha. Enquanto não houver lista, "Três Lagoas e região · MS" cobre o assunto no herói e no rodapé.

Vale também confirmar com o cliente, para enriquecer a Tarefa 6: se usam cintas de amarração certificadas, e se atendem recarga de bateria no local — o site antigo afirmava as duas coisas, mas nenhuma aparece no material oficial, então saíram.
