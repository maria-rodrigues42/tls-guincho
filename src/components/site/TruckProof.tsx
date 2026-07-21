import RevealWrapper from "./RevealWrapper";

export default function TruckProof() {
  return (
    <RevealWrapper className="relative z-10 px-5 pt-[30px] pb-1.5">
      <div className="font-bricolage font-extrabold text-[28px] text-marca-escura tracking-[-0.03em] text-center mb-[18px]">Nosso guincho</div>
      <div className="grid grid-cols-[1.4fr_1fr] md:grid-cols-3 gap-[9px] md:gap-4 md:h-[300px]">
        <div 
          className="row-span-2 md:col-span-2 rounded-lg overflow-hidden min-h-[196px] bg-cover bg-center" 
          style={{backgroundImage: "url('/images/truck-front.jpg')"}}
        ></div>
        <div 
          className="rounded-lg overflow-hidden min-h-[93px] md:min-h-0 bg-cover bg-center" 
          style={{backgroundImage: "url('/images/tls-cartoon.jpg')"}}
        ></div>
        <div 
          className="rounded-lg overflow-hidden min-h-[93px] md:min-h-0 bg-cover bg-center" 
          style={{backgroundImage: "url('/images/truck-front.jpg')"}}
        ></div>
      </div>
    </RevealWrapper>
  );
}
