import { MessageCircle } from "lucide-react";
import { LINHAS, linkWhatsapp } from "@/lib/contact";

/**
 * Barra fixa de chamada, só no mobile. No desktop os blocos de telefone
 * do herói e do rodapé já dão conta, e uma barra fixa só rouba altura.
 */
export default function CallBar() {
  const principal = LINHAS[0];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-refletivo/25 bg-asfalto/95 p-3 backdrop-blur sm:hidden">
      <a
        href={linkWhatsapp(principal)}
        className="sobrancelha flex min-h-12 items-center justify-center gap-3 bg-farol text-asfalto"
      >
        <MessageCircle className="size-5" aria-hidden="true" />
        Chamar guincho agora
      </a>
    </div>
  );
}
