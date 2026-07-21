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
