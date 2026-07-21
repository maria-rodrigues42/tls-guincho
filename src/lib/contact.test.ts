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
