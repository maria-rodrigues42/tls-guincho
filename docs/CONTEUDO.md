# Conteúdo do site — TLS Auto Guincho

Este documento lista **tudo que aparece publicado no site hoje**: todo texto,
todo dado, toda imagem, e o que ainda depende de confirmação da cliente. É um
inventário de conteúdo, não de código — para isso, ver `CLAUDE.md`.

Gerado a partir dos arquivos-fonte em 2026-07-21. Se o site mudar depois
disso, este documento pode ficar desatualizado — em caso de dúvida, o código
é a fonte da verdade.

---

## 1. Identidade e metadados

| Campo | Valor |
|---|---|
| Nome da empresa | TLS Auto Guincho |
| Cidade base | Três Lagoas — MS |
| Título da aba do navegador | `TLS Auto Guincho — 24 horas em Três Lagoas e região` |
| Descrição (meta, usada por buscadores) | `Guincho 24 horas em Três Lagoas e região. Reboque de moto, carro, utilitário e pesado. Chame agora pelo WhatsApp.` |
| Idioma da página | Português do Brasil (`pt-BR`) |

## 2. Contatos — fonte: `src/lib/contact.ts`

| | Linha 1 (principal) | Linha 2 (reserva) |
|---|---|---|
| Número exibido | (67) 99180-0229 | (67) 99110-6730 |
| Formato internacional | +55 67 99180-0229 | +55 67 99110-6730 |
| Observação exibida no site | — | "Se a primeira não atender, chame esta." |

Mensagem padrão enviada ao abrir o WhatsApp: **"Olá! Preciso de guincho em
Três Lagoas."**

Origem dos números: banner oficial da empresa e adesivo na porta do
caminhão (foto em `public/images/truck-side.jpg`).

**Regra em vigor:** esses dois números só existem neste arquivo do código.
Qualquer alteração de número deve ser feita ali, e em nenhum outro lugar.

## 3. Cabeçalho

- Logo/nome: "TLS Auto Guincho" com ícone de caminhão.
- Botão único: **"Chamar agora"** → abre WhatsApp na linha principal.
- Fixo no topo da página, sem menu de navegação.

## 4. Herói (primeira dobra)

- Sobrancelha (rótulo pequeno acima do título): **"24 horas · Três Lagoas e
  região · MS"**
- Título: **"Parou? / A gente vai."**
- Parágrafo de apoio: "Reboque de moto, carro, utilitário e pesado — a
  qualquer hora, em Três Lagoas e região."
- Botão principal (com uma animação sutil de destaque, único da página):
  **"Chamar no WhatsApp agora"** → linha principal.
- Link secundário, discreto: **"Linha principal não atendeu? Chame (67)
  99110-6730"** → abre WhatsApp na linha reserva.

## 5. "O que rebocamos" (escala de peso)

Sobrancelha: "Do mais leve ao mais pesado". Título: **"O que rebocamos"**.

As quatro categorias, na ordem exibida (do mais leve ao mais pesado — a
ordem em si é informação, por isso não é embaralhada):

| Categoria | Descrição exibida |
|---|---|
| Moto | Duas rodas, sobre a plataforma. |
| Carro | Passeio e SUV. |
| Utilitário | Vans e veículos de trabalho. |
| Pesado | Guincho pesado. |

## 6. "O caminhão que chega" (prova / seção do caminhão)

Sobrancelha: "A prova". Título: **"O caminhão que chega"**.

Parágrafo: "Seu veículo sobe inteiro na plataforma — não vai puxado, não
arrasta. É esta a foto do guincho, não um catálogo."

Foto usada: `public/images/truck-side.jpg` (foto real do caminhão, luz do
dia, com cone de sinalização sobre a plataforma). Texto alternativo da
imagem: "Guincho plataforma da TLS Auto Guincho, com cone de sinalização
sobre a plataforma."

Quatro dados de prova, exibidos como ficha técnica:

| Rótulo | Valor |
|---|---|
| Veículo | Ford Cargo 815e |
| Plataforma | Duricam |
| Sinalização | Giroflex e cone |
| Disponibilidade | 24 horas |

Botão ao final da seção: **"Chamar este guincho agora"** → linha principal.

**Nota de conteúdo:** essa seção só afirma o que é visível na foto ou
confirmado no material oficial da cliente. Frases como "profissionais
treinados" ou "sistemas de roteirização" existiam no site antigo e foram
removidas por não terem confirmação.

## 7. "Até onde vamos" (cobertura) — fonte: `src/lib/coverage.ts`

Sobrancelha: "Cobertura". Título: **"Até onde vamos"**.

Cidades exibidas atualmente (5):

1. Três Lagoas
2. Água Clara
3. Brasilândia
4. Inocência
5. Selvíria

**⚠️ Pendência de conteúdo:** essas quatro cidades além de Três Lagoas foram
incluídas porque **fazem divisa geográfica** com Três Lagoas (Água Clara a
oeste, Brasilândia ao sul, Inocência e Selvíria ao norte) — isso é fato
geográfico confirmado, **não é confirmação de que o guincho atende essas
cidades**. Antes de considerar esse conteúdo definitivo, a cliente precisa
revisar a lista e remover qualquer uma que não atenda de fato.

Também ainda não decidido: se cidades do lado paulista da ponte (Castilho,
Andradina, Ilha Solteira — mais perto que algumas cidades de MS) devem
entrar, caso a cliente atenda esse lado.

Se este array ficar vazio, a seção inteira desaparece do site — é assim
que o código impede publicar cidade não confirmada por engano.

## 8. "Como pagar" — fonte: `src/lib/payment.ts`

Sobrancelha: "Sem surpresa". Título: **"Como pagar"**.

Formas de pagamento exibidas (confirmadas com a cliente em 2026-07-21):

- Pix
- Cartão de crédito

## 9. Rodapé

- Botão: **"Chamar no WhatsApp agora"** → linha principal (repetição do CTA
  para quem rolou a página até o fim).
- Nome da empresa + ícone de caminhão.
- Linha de identificação: "Três Lagoas · MS · 24 horas".
- Copyright: "© [ano atual] TLS Auto Guincho".
- As duas linhas de telefone, lado a lado, cada uma com botão de WhatsApp e
  de ligação direta.

## 10. Barra fixa (só no celular)

Visível apenas em telas pequenas, sempre grudada na parte de baixo da tela,
em qualquer ponto da rolagem: botão **"Chamar guincho agora"** → linha
principal.

## 11. Imagens usadas e não usadas

| Arquivo | Uso |
|---|---|
| `public/images/truck-side.jpg` | **Usada** — seção "O caminhão que chega" |
| `public/images/hero-banner.jpg` | Não usada na página — serviu de referência para os fatos (números, categorias, tríade rapidez/segurança/confiança) durante o design |
| `public/images/tls-cartoon.jpg` | Não usada — mascote de caminhão com rosto, decidido não entrar por destoar do restante do site |
| `public/images/truck-front.jpg` | Não usada atualmente |

## 12. O que nunca aparece no site (decisão deliberada)

Por não haver confirmação verificável, o conteúdo abaixo foi
propositalmente deixado de fora, mesmo que ajudasse a conversão:

- Tempo médio de chegada
- Contador de atendimentos realizados
- Nota ou selo de avaliação de clientes
- Depoimentos
- Nome de seguradora conveniada
- "Profissionais treinados" / "sistemas de roteirização" (afirmações do
  site antigo, sem lastro)
- Recarga de bateria no local (o site antigo oferecia; não confirmado no
  material atual da cliente)
- Cintas de amarração certificadas (mesma situação — vale perguntar à
  cliente se quer confirmar e incluir)

## 13. Pendências abertas com a cliente

1. Confirmar/ajustar a lista de cidades da seção 7.
2. Decidir se cidades do lado de São Paulo (Castilho, Andradina, Ilha
   Solteira) entram na cobertura.
3. Confirmar se usa cintas de amarração certificadas (entraria na seção 6).
4. Confirmar se faz recarga de bateria no local (viraria uma quinta
   categoria na seção 5, se confirmado).
