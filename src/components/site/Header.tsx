import { Truck } from "lucide-react";
import { LINHAS } from "@/lib/contact";
import BotaoZap from "@/components/ui/BotaoZap";

/**
 * Cabeçalho fino e fixo. Uma única ação, sempre visível: chamar.
 * Não há menu de navegação — a página é curta e quem chega aqui está
 * com pressa.
 */
export default function Header() {
  const principal = LINHAS[0];

  return (
    <header className="sticky top-0 z-50 border-b border-asfalto/10 bg-sinal/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#" className="flex items-center gap-3">
          <Truck className="size-6 text-asfalto" aria-hidden="true" />
          <span className="display text-lg text-asfalto">TLS Auto Guincho</span>
        </a>

        <BotaoZap linha={principal} tamanho="compacto">
          Chamar agora
        </BotaoZap>
      </div>
    </header>
  );
}
