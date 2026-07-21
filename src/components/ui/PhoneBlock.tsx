import { Phone } from "lucide-react";
import { linkTelefone, linkWhatsapp, type Linha } from "@/lib/contact";

function IconeWhatsapp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.44 5.13L2 22l5.13-1.55a9.87 9.87 0 0 0 4.9 1.28h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.1.11-1.78-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.09-4.85-4.28-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.09 1-2.37.24-.28.53-.35.71-.35.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.57.8 1.98.87 2.12.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.28.71 1.17 1.52 1.9 1.04.94 1.92 1.23 2.19 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.87.27.13.45.2.51.31.07.12.07.68-.17 1.35Z" />
    </svg>
  );
}

/**
 * Ticket de referência — usado no rodapé, onde as duas linhas aparecem
 * lado a lado com peso igual. Não é o CTA de conversão principal (esse é
 * o BotaoZap, no herói/CallBar/rodapé); aqui é "como falar com a gente
 * de novo", pra quem rolou a página até o fim.
 */
export default function PhoneBlock({ linha }: { linha: Linha }) {
  return (
    <div className="cartao flex flex-col gap-3 border-cal/15 bg-cal/[0.04] p-5">
      <span className="sobrancelha text-cal/60">{linha.rotulo}</span>

      <span className="font-dado text-2xl font-semibold tracking-tight text-cal">
        {linha.numeroExibido}
      </span>

      {linha.nota ? <p className="text-sm text-cal/70">{linha.nota}</p> : null}

      <div className="mt-1 flex items-center gap-5">
        <a
          href={linkWhatsapp(linha)}
          className="sobrancelha flex min-h-11 items-center gap-2 text-zap"
        >
          <IconeWhatsapp className="size-4" />
          WhatsApp
        </a>
        <a
          href={linkTelefone(linha)}
          className="sobrancelha flex min-h-11 items-center gap-2 text-cal/70"
        >
          <Phone className="size-4" aria-hidden="true" />
          Ligar
        </a>
      </div>
    </div>
  );
}
