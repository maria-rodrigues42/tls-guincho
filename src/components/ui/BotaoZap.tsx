"use client";

import { useEffect, useRef } from "react";
import { animate, type JSAnimation } from "animejs";
import { linkWhatsapp, type Linha } from "@/lib/contact";

function IconeWhatsapp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.44 5.13L2 22l5.13-1.55a9.87 9.87 0 0 0 4.9 1.28h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.1.11-1.78-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.09-4.85-4.28-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.09 1-2.37.24-.28.53-.35.71-.35.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.57.8 1.98.87 2.12.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.28.71 1.17 1.52 1.9 1.04.94 1.92 1.23 2.19 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.87.27.13.45.2.51.31.07.12.07.68-.17 1.35Z" />
    </svg>
  );
}

const TAMANHOS = {
  grande: "min-h-16 px-8 text-base gap-3",
  compacto: "min-h-11 px-4 text-sm gap-2",
} as const;

/**
 * O único botão verde da página inteira — é assim que ele fica impossível
 * de não ver. Texto escuro sobre o verde, não branco: branco sobre
 * #25D366 dá contraste 1.8:1 (reprovado); texto escuro sobre o mesmo
 * verde dá 9:1. Sem estado de hover — o repouso é o único estado.
 *
 * `destaque` liga uma respiração ambiente (escala sutil, em loop lento) —
 * reservada para o CTA principal do herói. É a única animação contínua
 * da página; os outros botões (cabeçalho, rodapé, seção do caminhão)
 * ficam parados, para não competir com ela.
 */
export default function BotaoZap({
  linha,
  children,
  tamanho = "grande",
  destaque = false,
  className = "",
}: {
  linha: Linha;
  children: React.ReactNode;
  tamanho?: keyof typeof TAMANHOS;
  destaque?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento || !destaque) return;

    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzido) return;

    const respiracao: JSAnimation = animate(elemento, {
      scale: [1, 1.035, 1],
      duration: 1800,
      loop: true,
      easing: "easeInOutSine",
    });

    return () => {
      respiracao.revert();
    };
  }, [destaque]);

  return (
    <a
      ref={ref}
      href={linkWhatsapp(linha)}
      className={`flex items-center justify-center rounded-full bg-zap font-corpo font-bold uppercase tracking-wide text-texto ${TAMANHOS[tamanho]} ${className}`}
    >
      <IconeWhatsapp className="size-5 shrink-0 sm:size-6" />
      {children}
    </a>
  );
}
