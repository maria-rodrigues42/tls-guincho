import SectionTitle from "@/components/ui/SectionTitle";
import Revelar from "@/components/ui/Revelar";
import { CIDADES } from "@/lib/coverage";

export default function Coverage() {
  if (CIDADES.length === 0) return null;

  return (
    <section aria-labelledby="titulo-cobertura" className="py-20">
      <Revelar className="mx-auto max-w-6xl px-5">
        <SectionTitle
          sobrancelha="Cobertura"
          titulo="Até onde vamos"
          id="titulo-cobertura"
        />

        <ul className="flex flex-wrap gap-3">
          {CIDADES.map((cidade) => (
            <li
              key={cidade}
              className="cartao rounded-full font-dado px-5 py-3 text-sm text-texto"
            >
              {cidade}
            </li>
          ))}
        </ul>
      </Revelar>
    </section>
  );
}
