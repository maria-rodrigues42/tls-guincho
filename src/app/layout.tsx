import type { Metadata } from "next";
import { Bricolage_Grotesque, Noto_Sans, IBM_Plex_Mono, Archivo } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

// Since Zalando Sans Expanded is not in Google Fonts, we use Archivo Expanded as a fallback
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-zalando",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TLS Auto Guincho",
  description: "Guincho 24 horas em Três Lagoas e região.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${bricolage.variable} ${noto.variable} ${ibmMono.variable} ${archivo.variable} antialiased text-texto selection:bg-marca-clara/70 selection:text-marca-escura relative overflow-x-hidden`}
      >
        <div className="absolute inset-0 pointer-events-none z-5 opacity-5 mix-blend-multiply" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"}}></div>
        {children}
      </body>
    </html>
  );
}
