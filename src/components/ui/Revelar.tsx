"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, createScope, onScroll, type Scope } from "animejs";

/**
 * Revela o bloco inteiro quando ele entra na tela ao rolar — uma vez por
 * seção, não item por item dentro dela. Reveal item a item foi o que deu
 * a sensação de "gerado por IA" na primeira versão desta página.
 *
 * Se `prefers-reduced-motion` estiver ativo, ou se o JavaScript não
 * carregar, o conteúdo permanece com a opacidade normal do CSS (1) —
 * nunca fica invisível por falha.
 */
export default function Revelar({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elemento = raiz.current;
    if (!elemento) return;

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzido) return;

    const escopo: Scope = createScope({ root: raiz }).add(() => {
      animate(elemento, {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 700,
        easing: "easeOutQuad",
        autoplay: onScroll({ target: elemento }),
      });
    });

    return () => escopo.revert();
  }, []);

  return (
    <div ref={raiz} className={className}>
      {children}
    </div>
  );
}
