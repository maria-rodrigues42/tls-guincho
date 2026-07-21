# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é este projeto

Landing page única (Next.js 16, App Router) para a **TLS Auto Guincho**, empresa de guincho/reboque 24h em Três Lagoas (MS). ~98% do tráfego é mobile, geralmente vindo de tráfego pago, de alguém parado na estrada. **O único objetivo da página é levar essa pessoa a chamar no WhatsApp o mais rápido possível.** Toda decisão de código e design se subordina a isso — performance mobile e clareza do CTA vêm antes de qualquer efeito visual.

## Comandos

```bash
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção (roda tsc como parte do build)
npm run lint     # eslint
npm test         # vitest run — só src/lib/contact.test.ts tem testes hoje
npx tsc --noEmit # typecheck isolado, mais rápido que o build completo
```

Não há flag de teste único configurada; `vitest run <caminho>` funciona diretamente.

## Arquitetura

### Composição da página

`src/app/page.tsx` só compõe seções, nesta ordem: `Header` → `Hero` → `ChevronDivider` → `WeightScale` → `TruckProof` → `Coverage` → `Payment` → `Footer` → `CallBar`. Cada seção é um componente de `src/components/site/`, com responsabilidade única. Componentes reutilizáveis entre seções vivem em `src/components/ui/`.

### Fonte única de contato — `src/lib/contact.ts`

Os dois números de telefone da cliente (linha principal e linha reserva) existem **só** neste arquivo, como `LINHAS: readonly Linha[]`. Nenhum outro arquivo deve conter um número de telefone literal — sempre importar `LINHAS`, `linkWhatsapp()` ou `linkTelefone()`. Isso já foi violado uma vez por engano (um número vazou para `metadata.description` em `layout.tsx`) e pego só na revisão — ao adicionar qualquer coisa relacionada a contato, rodar `grep -rn "99180\|99110" src/` antes de considerar terminado.

### Dados que dependem de confirmação da cliente

`src/lib/coverage.ts` (cidades atendidas) e `src/lib/payment.ts` (formas de pagamento) exportam arrays. Os componentes `Coverage` e `Payment` **retornam `null` se o array estiver vazio** — isso é proteção estrutural deliberada, não bug: é estruturalmente impossível publicar uma cidade ou forma de pagamento que a cliente não confirmou. Nunca preencher esses arrays com suposição; nunca remover a guarda `if (X.length === 0) return null`.

### Sistema de design — `src/app/globals.css`

Tokens de cor em `@theme`, todos com papel único:
- `fundo` (branco), `texto` (quase-preto) — base neutra
- `marca-escura` (#293681), `marca` (#4274D9), `marca-clara` (#95CCDD), `marca-bg` (#D0E7E6) — **a paleta azul original da cliente**, não inventar paleta nova sem pedido explícito dela
- `zap` (#25D366) — **verde do WhatsApp, exclusivo aos botões que abrem WhatsApp**. Nenhum outro elemento da página usa verde; é assim que o CTA fica impossível de não ver.

Classes utilitárias: `.cartao` (cartão arredondado, sem estado de hover — a cliente pediu explicitamente para remover hover), `.risco` (faixa divisória diagonal nos tons de marca), `.display`/`.sobrancelha` (papéis tipográficos). `.cartao` não define hover states de propósito.

Fontes carregadas via `next/font` em `layout.tsx` com variáveis `--fonte-*` (não `--font-*`) — os dois nomes precisam ser diferentes ou o Tailwind gera uma referência circular (`--font-display: var(--font-display)`).

### `BotaoZap` — o CTA

`src/components/ui/BotaoZap.tsx` é o único botão verde do site. Usa texto escuro sobre o verde (não branco — branco sobre `#25D366` dá contraste 1.8:1, reprovado; texto escuro dá ~9:1). Prop `destaque` liga uma animação de "respiração" ambiente (anime.js, loop lento de escala) — reservada **só** para o CTA principal do herói. Os demais `BotaoZap` (cabeçalho, rodapé, seção do caminhão) ficam parados, para não competir com o único ponto de movimento contínuo da página.

### `Revelar` — animação de entrada ao rolar

`src/components/ui/Revelar.tsx` (anime.js `onScroll`) revela o bloco inteiro de uma seção quando ela entra na tela — **uma vez por seção, nunca item por item dentro dela**. A primeira versão da página tinha reveal item a item e isso foi apontado pela cliente como "cara de IA"; não reintroduzir esse padrão. Toda animação de `Revelar` e do `BotaoZap` respeita `prefers-reduced-motion` e degrada para conteúdo totalmente visível se o JS falhar (nunca depende de opacidade-zero via CSS puro).

### Dependências instaladas mas não usadas

`three.js` está instalado a pedido da cliente mas **nenhum componente o usa ainda** — não construir nada com ele sem antes confirmar qual efeito 3D específico ela quer, dado o custo de performance em mobile.

## Decisões de direção já tomadas (não reabrir sem pedido explícito)

- **Paleta:** só a paleta azul da cliente (ver tokens acima). Já tentamos uma paleta "assinatura" própria (fundo escuro + acento neon) e foi rejeitada como "cara de IA".
- **Sem hover:** removido a pedido da cliente. Só `:focus-visible` (foco de teclado) permanece, por ser requisito de acessibilidade.
- **Cantos arredondados:** referência explícita da cliente foi o site da Honda — cartões com raio generoso, botões em pílula (`rounded-full`).
- **Mobile-first / conversão:** um único CTA dominante por seção-chave (herói, seção do caminhão, rodapé) mais barra fixa no mobile (`CallBar`). Nunca dois CTAs de peso igual competindo na mesma tela.
