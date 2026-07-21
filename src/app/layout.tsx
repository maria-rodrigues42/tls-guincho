import type { Metadata } from "next";
import { Archivo, Overpass, Overpass_Mono } from "next/font/google";
import "./globals.css";

// Os nomes das variáveis do next/font têm que ser DIFERENTES dos tokens
// --font-* do @theme, senão o Tailwind gera --font-display: var(--font-display)
// e a referência vira circular. Por isso o prefixo --fonte-.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--fonte-display",
  display: "swap",
});

const overpass = Overpass({
  subsets: ["latin"],
  variable: "--fonte-corpo",
  display: "swap",
});

const overpassMono = Overpass_Mono({
  subsets: ["latin"],
  variable: "--fonte-dado",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TLS Auto Guincho — 24 horas em Três Lagoas e região",
  description:
    "Guincho 24 horas em Três Lagoas e região. Reboque de moto, carro, utilitário e pesado. Chame agora pelo WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${archivo.variable} ${overpass.variable} ${overpassMono.variable} antialiased bg-sinal text-asfalto font-corpo selection:bg-perigo/70 selection:text-asfalto`}
      >
        {children}
      </body>
    </html>
  );
}
