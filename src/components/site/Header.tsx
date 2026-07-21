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
