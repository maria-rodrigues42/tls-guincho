import PhoneBlock from "@/components/ui/PhoneBlock";
import LightSweep from "@/components/ui/LightSweep";
import { LINHAS } from "@/lib/contact";

/**
 * O herói não é uma foto nem um número grande com gradiente. É a chamada.
 * A varredura de luz passa uma vez sobre o letreiro; depois disso a mesma
 * física governa hover e foco no resto da página.
 */
export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pt-24">
      <span className="sobrancelha text-refletivo">
        24 horas · Três Lagoas e região · MS
      </span>

      <h1 className="mt-6 max-w-4xl">
        <LightSweep>
          <span className="display block text-[clamp(3rem,12vw,8rem)] text-cal">
            Parou?
            <br />
            <span className="text-farol">A gente vai.</span>
          </span>
        </LightSweep>
      </h1>

      <p className="mt-8 max-w-md text-lg leading-relaxed text-cal/70">
        Reboque de moto, carro, utilitário e pesado — a qualquer hora, em Três
        Lagoas e região.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {LINHAS.map((linha) => (
          <PhoneBlock
            key={linha.id}
            linha={linha}
            destaque={linha.id === "principal"}
          />
        ))}
      </div>
    </section>
  );
}
