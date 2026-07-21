import { Phone, Truck, ShieldAlert, Zap, Wrench, Clock, MapPin, CheckCircle2, MessageCircle } from "lucide-react";
import Carousel from "@/components/Carousel";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  const WHATSAPP_URL = "https://wa.me/5567991800229?text=Ol%C3%A1%2C%20preciso%20de%20guincho%20com%20urg%C3%AAncia";

  return (
    <main className="flex flex-col relative w-full overflow-hidden bg-white">

      {/* TWO-TIER CORPORATE HEADER */}
      <header className="relative z-50 w-full flex flex-col">
        {/* Top Bar - Very thin, dark */}
        <div className="w-full bg-[#0a0f25] py-2 px-6 hidden sm:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-white/70 font-sans tracking-[0.2em] uppercase">
            <span>Atendimento 24 Horas em Três Lagoas e Região</span>
            <span className="flex items-center gap-2">
              <Phone className="w-3 h-3" /> Assistência Imediata: (67) 99180-0229
            </span>
          </div>
        </div>

        {/* Main Header - Clean White */}
        <div className="w-full bg-white border-b-4 border-brand-primary sticky top-0 shadow-xl">
          <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
            <ScrollReveal direction="down" delay={0.1} className="flex items-center gap-4">
              <div className="w-14 h-14 bg-brand-dark flex items-center justify-center rounded-none">
                <Truck className="text-white w-8 h-8" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <h1 className="font-heading font-black text-3xl tracking-widest uppercase text-brand-dark m-0 leading-none">TLS Guincho</h1>
                <span className="font-heading font-bold text-[10px] text-brand-primary tracking-[0.4em] uppercase mt-1">Resgate Automotivo</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="down" delay={0.2} className="hidden lg:flex items-center gap-12">
              <a href="#servicos" className="font-heading font-black text-sm text-brand-dark tracking-widest uppercase hover:text-brand-primary transition-colors">Serviços</a>
              <a href="#diferenciais" className="font-heading font-black text-sm text-brand-dark tracking-widest uppercase hover:text-brand-primary transition-colors">Diferenciais</a>
            </ScrollReveal>
            
            <ScrollReveal direction="down" delay={0.3}>
              <a href={WHATSAPP_URL} className="hidden md:flex items-center gap-3 bg-brand-primary text-white font-heading font-bold text-sm tracking-widest uppercase px-6 py-4 hover:bg-brand-dark transition-colors">
                Chamar Agora
                <MessageCircle className="w-5 h-5" />
              </a>
            </ScrollReveal>
          </div>
        </div>
      </header>

      {/* HERO SECTION - Edge to edge split layout */}
      <section className="relative w-full flex flex-col lg:flex-row min-h-[85vh] bg-brand-dark">
        {/* Left Side: Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative z-10">
          <div className="max-w-xl w-full flex flex-col items-start gap-8">
            <ScrollReveal delay={0.2}>
              <div className="inline-flex items-center gap-3 text-brand-light font-heading font-bold text-sm tracking-[0.2em] uppercase">
                <span className="w-2 h-2 bg-brand-light animate-pulse rounded-none"></span>
                Prontidão Imediata
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <h2 className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl leading-[0.9] text-white uppercase">
                Resgate<br/>
                <span className="text-brand-primary">
                  Imediato
                </span><br/>
                24 Horas
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <p className="text-lg text-white/80 font-sans font-light leading-relaxed max-w-md">
                Chegamos rápido com equipamentos modernos para resgate de veículos leves e pesados em Três Lagoas e região.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5} className="w-full mt-4">
              <a href={WHATSAPP_URL} className="btn-modern btn-primary w-full sm:w-auto text-lg">
                Solicitar Guincho
                <MessageCircle className="ml-3 w-6 h-6" />
              </a>
            </ScrollReveal>
          </div>
        </div>

        {/* Right Side: Carousel (Edge to edge) */}
        <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-full">
          <ScrollReveal direction="left" delay={0.4} className="absolute inset-0 w-full h-full">
            {/* The carousel wrapper needs to be absolute inset-0 to fill the flex half */}
            <div className="w-full h-full">
               <Carousel />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* NOSSOS SERVIÇOS - Stark white background, black text */}
      <section id="servicos" className="relative z-10 w-full py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="mb-20 text-center flex flex-col items-center">
            <span className="font-heading font-bold text-brand-primary uppercase tracking-[0.2em] text-sm mb-4">Portfólio</span>
            <h2 className="font-heading font-black text-5xl sm:text-6xl text-[#111] uppercase">Nossos Serviços</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-12">
            <ScrollReveal delay={0.2} className="clean-card p-12 group flex flex-col items-center text-center">
              <h3 className="font-heading font-black text-3xl text-[#111] uppercase mb-6 tracking-wide">Leves</h3>
              <p className="text-[#444] font-light leading-relaxed text-lg mb-12">
                Reboque seguro para carros de passeio, SUVs e caminhonetes. Plataforma hidráulica que não danifica o veículo.
              </p>
              <Truck className="w-20 h-20 text-brand-primary mt-auto" strokeWidth={1} />
            </ScrollReveal>

            <ScrollReveal delay={0.4} className="clean-card p-12 group flex flex-col items-center text-center">
              <h3 className="font-heading font-black text-3xl text-[#111] uppercase mb-6 tracking-wide">Pesados</h3>
              <p className="text-[#444] font-light leading-relaxed text-lg mb-12">
                Estrutura robusta para remoção de vans, micro-ônibus e caminhões leves. Profissionais treinados para resgates.
              </p>
              <Wrench className="w-20 h-20 text-brand-primary mt-auto" strokeWidth={1} />
            </ScrollReveal>

            <ScrollReveal delay={0.6} className="clean-card p-12 group flex flex-col items-center text-center">
              <h3 className="font-heading font-black text-3xl text-[#111] uppercase mb-6 tracking-wide">Bateria</h3>
              <p className="text-[#444] font-light leading-relaxed text-lg mb-12">
                Fazemos a recarga de bateria no local para você voltar a rodar imediatamente sem precisar de reboque.
              </p>
              <Zap className="w-20 h-20 text-brand-primary mt-auto" strokeWidth={1} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS - Bold Brand Primary background */}
      <section id="diferenciais" className="relative z-10 w-full py-32 bg-brand-primary">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <ScrollReveal>
              <span className="font-heading font-bold text-white uppercase tracking-[0.2em] text-sm mb-4 block">Excelência Operacional</span>
              <h2 className="font-heading font-black text-5xl sm:text-7xl text-white uppercase leading-[0.9] mb-16">
                Padrão de<br/>
                Qualidade
              </h2>
            </ScrollReveal>
            
            <ul className="flex flex-col gap-12">
              <ScrollReveal delay={0.2} as="li" className="flex flex-col items-start gap-4">
                <h4 className="font-heading font-bold text-3xl text-white uppercase tracking-wide">Plantão 24/7</h4>
                <p className="text-white/90 font-light leading-relaxed text-lg">Acidentes e imprevistos não têm hora. Nossa frota está pronta de madrugada, finais de semana e feriados com resposta imediata.</p>
                <CheckCircle2 className="w-16 h-16 text-brand-dark mt-4" strokeWidth={1} />
              </ScrollReveal>
              
              <ScrollReveal delay={0.4} as="li" className="flex flex-col items-start gap-4 mt-8">
                <h4 className="font-heading font-bold text-3xl text-white uppercase tracking-wide">Logística Ágil</h4>
                <p className="text-white/90 font-light leading-relaxed text-lg">Conhecemos Três Lagoas e região como ninguém. Utilizamos sistemas de roteirização para que o resgate chegue no menor tempo possível.</p>
                <MapPin className="w-16 h-16 text-brand-dark mt-4" strokeWidth={1} />
              </ScrollReveal>
            </ul>
          </div>
          
          <ScrollReveal direction="up" delay={0.4} className="relative">
             <div className="bg-brand-dark w-full p-16 relative flex flex-col items-start">
               <ShieldAlert className="w-24 h-24 text-brand-primary mb-12" strokeWidth={1} />
               <h3 className="font-heading font-black text-5xl text-white uppercase leading-none mb-8">Segurança<br/>Absoluta</h3>
               <p className="text-white/80 font-light text-lg mb-12">Seu patrimônio é tratado com respeito. Utilizamos cintas de amarração certificadas e plataformas modernas que garantem a integridade do seu veículo durante todo o transporte.</p>
               <a href={WHATSAPP_URL} className="btn-modern btn-primary w-full text-center">
                 Acionar Agora
               </a>
             </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER - Pure black */}
      <footer className="relative z-10 bg-[#000000] py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-brand-primary flex items-center justify-center rounded-none">
              <Truck className="text-white w-8 h-8" />
            </div>
            <div>
              <h4 className="font-heading font-black text-3xl tracking-widest uppercase text-white m-0 leading-none">TLS Guincho</h4>
              <span className="font-sans font-medium text-white/50 text-xs tracking-[0.3em] uppercase mt-2 block">Três Lagoas - MS</span>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-white/60 text-sm font-light">© {new Date().getFullYear()} TLS Auto Guincho.</p>
            <p className="text-white/40 text-xs mt-2 font-light tracking-widest uppercase">Excelência em Resgate 24h</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP CTA - SQUARE AND BOLD */}
      <a 
        href={WHATSAPP_URL} 
        className="fixed bottom-8 right-8 z-[100] flex items-center justify-center w-16 h-16 bg-[#25D366] text-white hover:bg-[#1DA851] transition-all duration-300 rounded-none shadow-xl"
        aria-label="Chamar WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>
    </main>
  );
}
