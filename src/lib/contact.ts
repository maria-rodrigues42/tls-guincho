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
