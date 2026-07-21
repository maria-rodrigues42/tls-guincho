import { LINHAS } from "@/lib/contact";
import BotaoZap from "@/components/ui/BotaoZap";

/**
 * Barra fixa de chamada, só no mobile — 98% do tráfego é celular, então
 * o botão de WhatsApp fica sempre alcançável, em qualquer ponto da
 * rolagem. No desktop os CTAs do herói/rodapé já dão conta.
 */
export default function CallBar() {
  const principal = LINHAS[0];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-asfalto/10 bg-sinal/95 p-3 backdrop-blur sm:hidden">
      <BotaoZap linha={principal} className="w-full">
        Chamar guincho agora
      </BotaoZap>
    </div>
  );
}
