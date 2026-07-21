import type { ReactNode } from "react";

/**
 * A assinatura da página: uma única passada de luz rasante na abertura.
 * A animação e o respeito a prefers-reduced-motion vivem na classe
 * .varredura, em globals.css.
 */
export default function LightSweep({ children }: { children: ReactNode }) {
  return <span className="varredura">{children}</span>;
}
