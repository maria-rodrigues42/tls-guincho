import RevealWrapper from "./RevealWrapper";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <RevealWrapper className="relative z-10 overflow-hidden md:rounded-xl md:mx-5">
        <div className="relative min-h-[390px] md:min-h-[450px] flex flex-col justify-end px-5 pt-[26px] pb-7 md:px-10 md:pb-12">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
            style={{backgroundImage: "url('/images/truck-front.jpg')"}}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(28,40,48,0.32)] via-[rgba(28,40,48,0.4)] to-[rgba(28,40,48,0.92)]"></div>
          <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#101e6f] to-transparent"></div>
          <div className="relative z-10">
            <h1 className="m-0 font-bricolage font-extrabold text-[52px] md:text-[64px] leading-[0.92] text-fundo tracking-[-0.04em]">Não fica na mão.</h1>
            <div className="mt-1.5 font-zalando font-bold text-[38px] md:text-[44px] leading-none text-marca-clara tracking-[-0.01em] [font-stretch:125%]">a gente te tira daí.</div>
            <p className="mt-4 font-noto font-normal text-base md:text-lg leading-[1.55] text-[rgba(247,248,240,0.92)] max-w-[300px] md:max-w-[400px]">
              Guincho 24 horas em Três Lagoas. Chama no WhatsApp, combina o preço na hora e relaxa — o resto é com a gente.
            </p>
          </div>
        </div>
      </RevealWrapper>
      
      <RevealWrapper className="relative z-10 px-4 pt-[30px] pb-1.5 flex flex-col items-center">
        <a href="#" className="inline-flex items-center gap-3 no-underline bg-zap text-white font-bricolage font-extrabold text-[19px] px-8 py-4 rounded-2xl shadow-[0_4px_24px_rgba(37,211,102,0.4)] transition-transform hover:scale-105 active:scale-95">
          <Image 
            src="/images/image-removebg-preview.png" 
            alt="WhatsApp" 
            width={32} 
            height={32} 
            className="brightness-0 invert drop-shadow-sm"
          />
          Entre em Contato
        </a>
        <div className="mt-[11px] text-center font-noto font-medium text-[13px] text-[#7a8991]">
          Você fala com gente de verdade — não com robô.
        </div>
      </RevealWrapper>
    </>
  );
}
