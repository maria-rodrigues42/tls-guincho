import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";

/**
 * Só entram aqui detalhes visíveis na própria foto ou no material oficial
 * do cliente. Nada de "profissionais treinados" ou "sistemas de
 * roteirização", que o site antigo afirmava sem lastro.
 */
const PROVAS = [
  { rotulo: "Veículo", valor: "Ford Cargo 815e" },
  { rotulo: "Plataforma", valor: "Duricam" },
  { rotulo: "Sinalização", valor: "Giroflex e cone" },
  { rotulo: "Disponibilidade", valor: "24 horas" },
] as const;

export default function TruckProof() {
  return (
    <section
      aria-labelledby="titulo-caminhao"
      className="mx-auto max-w-6xl px-5 py-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="luz relative aspect-4/5 overflow-hidden sm:aspect-3/2 lg:aspect-4/5">
          <Image
            src="/images/truck-side.jpg"
            alt="Guincho plataforma da TLS Auto Guincho estacionado em rua de Três Lagoas, com cone de sinalização sobre a plataforma."
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <SectionTitle
            sobrancelha="A prova"
            titulo="O caminhão que chega"
            id="titulo-caminhao"
          />

          <p className="max-w-md text-lg leading-relaxed text-cal/70">
            Seu veículo sobe inteiro na plataforma — não vai puxado, não
            arrasta. É esta a foto do guincho, não um catálogo.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px border-t border-refletivo/20">
            {PROVAS.map((prova) => (
              <div key={prova.rotulo} className="luz p-5">
                <dt className="sobrancelha text-refletivo/70">{prova.rotulo}</dt>
                <dd className="font-dado mt-2 text-base text-cal">
                  {prova.valor}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
