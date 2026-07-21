import { Truck } from "lucide-react";
import PhoneBlock from "@/components/ui/PhoneBlock";
import BotaoZap from "@/components/ui/BotaoZap";
import { LINHAS } from "@/lib/contact";

/**
 * Faixa escura só no rodapé — contraste deliberado de página impressa,
 * não o fundo escuro da página inteira que estamos evitando. Repete o
 * CTA principal para quem rolou até o fim (terceiro ponto de conversão,
 * depois do herói e da seção do caminhão).
 */
export default function Footer() {
  const principal = LINHAS[0];

  return (
    <footer className="bg-asfalto pb-28 pt-16 sm:pb-16">
      <div className="mx-auto max-w-6xl px-5">
        <BotaoZap linha={principal} className="w-full sm:w-auto">
          Chamar no WhatsApp agora
        </BotaoZap>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <Truck className="size-6 text-cal" aria-hidden="true" />
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
      </div>
    </footer>
  );
}
