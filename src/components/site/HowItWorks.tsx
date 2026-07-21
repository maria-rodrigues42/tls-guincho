import RevealWrapper from "./RevealWrapper";

export default function HowItWorks() {
  return (
    <RevealWrapper className="relative z-10 px-5 pt-[34px] pb-1.5">
      <div className="font-bricolage font-extrabold text-[28px] text-marca-escura tracking-[-0.03em] text-center mb-6">Como funciona</div>
      <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-8">
        <div className="flex gap-[14px] items-baseline md:flex-1">
          <span className="font-zalando font-bold text-[28px] text-marca min-w-[42px] [font-stretch:125%]">1</span>
          <div>
            <div className="font-bricolage font-bold text-[18px] text-marca-escura tracking-[-0.02em]">Você chama no zap</div>
            <div className="font-noto font-normal text-[14px] leading-[1.45] text-[#66757d]">Conta onde está e o que aconteceu.</div>
          </div>
        </div>
        <div className="flex gap-[14px] items-baseline ml-6 md:ml-0 md:flex-1">
          <span className="font-zalando font-bold text-[28px] text-marca min-w-[42px] [font-stretch:125%]">2</span>
          <div>
            <div className="font-bricolage font-bold text-[18px] text-marca-escura tracking-[-0.02em]">A gente combina o preço</div>
            <div className="font-noto font-normal text-[14px] leading-[1.45] text-[#66757d]">Sem susto, sem letra miúda.</div>
          </div>
        </div>
        <div className="flex gap-[14px] items-baseline md:flex-1">
          <span className="font-zalando font-bold text-[28px] text-marca min-w-[42px] [font-stretch:125%]">3</span>
          <div>
            <div className="font-bricolage font-bold text-[18px] text-marca-escura tracking-[-0.02em]">O guincho sai na hora</div>
            <div className="font-noto font-normal text-[14px] leading-[1.45] text-[#66757d]">Plataforma pro seu carro subir seguro.</div>
          </div>
        </div>
      </div>
    </RevealWrapper>
  );
}
