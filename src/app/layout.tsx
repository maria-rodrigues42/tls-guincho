import type { Metadata } from "next";
import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const roboto = Roboto({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "TLS Auto Guincho | Resgate 24h em Três Lagoas",
  description: "Guincho rápido e seguro 24 horas. Resgate imediato de carros, motos e caminhões leves. Socorro automotivo de confiança.",
  keywords: "guincho, reboque, três lagoas, guincho 24h, socorro mecânico, resgate automotivo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Placeholder for Google Tag Manager or Pixel for Paid Traffic */}
        {/* <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `}
        </Script> */}
      </head>
      <body
        className={`${roboto.variable} ${montserrat.variable} antialiased bg-brand-dark text-white font-sans selection:bg-brand-light selection:text-brand-dark`}
      >
        {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style={{display:"none", visibility:"hidden"}}></iframe></noscript> */}
        {children}
      </body>
    </html>
  );
}
