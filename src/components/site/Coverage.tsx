import SectionTitle from "@/components/ui/SectionTitle";
import { CIDADES } from "@/lib/coverage";

export default function Coverage() {
  if (CIDADES.length === 0) return null;

  return (
    <section
      aria-labelledby="titulo-cobertura"
      className="mx-auto max-w-6xl px-5 py-24"
    >
      <SectionTitle
        sobrancelha="Cobertura"
        titulo="Até onde vamos"
        id="titulo-cobertura"
      />

      <ul className="flex flex-wrap gap-3">
        {CIDADES.map((cidade) => (
          <li key={cidade} className="luz font-dado px-4 py-3 text-sm text-cal">
            {cidade}
          </li>
        ))}
      </ul>
    </section>
  );
}
