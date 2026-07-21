import RevealWrapper from "./RevealWrapper";

export default function Coverage() {
  return (
    <RevealWrapper className="relative z-10 px-5 pt-[34px] pb-2">
      <div className="font-bricolage font-extrabold text-[28px] text-marca-escura tracking-[-0.03em] text-center mb-[10px]">Área de atendimento</div>
      <p className="mx-auto mb-2 max-w-[290px] font-noto font-normal text-[15px] leading-[1.45] text-[#66757d] text-center">
        Atendemos Três Lagoas e região. Na dúvida se a gente chega até você, é só perguntar no zap.
      </p>
      <div className="pt-4 md:pt-8 w-full">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59683.11888422288!2d-51.699534199999995!3d-20.78340035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94909866a1f06f3d%3A0xeb11fc7873829cf9!2sTr%C3%AAs%20Lagoas%2C%20State%20of%20Mato%20Grosso%20do%20Sul%2C%20Brazil!5e0!3m2!1sen!2suk!4v1784665012073!5m2!1sen!2suk" 
          className="w-full h-[350px] md:h-[450px] border-0 rounded-2xl shadow-lg" 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </RevealWrapper>
  );
}
