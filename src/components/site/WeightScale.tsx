import RevealWrapper from "./RevealWrapper";

export default function WeightScale() {
  return (
    <RevealWrapper className="relative z-10 px-5 pt-[30px] pb-1.5">
      <div className="font-bricolage font-extrabold text-[28px] text-marca-escura tracking-[-0.03em] text-center mb-[18px]">O que rebocamos</div>
      <div className="md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-4">
        <div className="py-[14px] border-b border-[#e2e8e4] md:border-b-0 md:border-b md:border-[#e2e8e4] flex justify-between items-baseline">
          <span className="font-bricolage font-bold text-[21px] text-marca-escura tracking-[-0.02em]">Moto</span>
          <span className="font-noto font-normal text-[13px] text-[#93a2aa]">até 300 kg</span>
        </div>
        <div className="py-[14px] border-b border-[#e2e8e4] md:border-b-0 md:border-b md:border-[#e2e8e4] flex justify-between items-baseline">
          <span className="font-bricolage font-bold text-[21px] text-marca-escura tracking-[-0.02em]">Carro de passeio</span>
          <span className="font-noto font-normal text-[13px] text-[#93a2aa]">hatch e sedan</span>
        </div>
        <div className="py-[14px] border-b border-[#e2e8e4] md:border-b-0 md:border-b md:border-[#e2e8e4] flex justify-between items-baseline">
          <span className="font-bricolage font-bold text-[21px] text-marca-escura tracking-[-0.02em]">SUV e caminhonete</span>
          <span className="font-noto font-normal text-[13px] text-[#93a2aa]">até 3,5 t</span>
        </div>
        <div className="py-[14px] flex justify-between items-baseline md:border-b md:border-[#e2e8e4]">
          <span className="font-bricolage font-bold text-[21px] text-marca-escura tracking-[-0.02em]">Van e utilitário</span>
          <span className="font-noto font-normal text-[13px] text-[#93a2aa]">sob consulta</span>
        </div>
      </div>
    </RevealWrapper>
  );
}
