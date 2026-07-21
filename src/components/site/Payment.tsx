import SectionTitle from "@/components/ui/SectionTitle";
import { FORMAS_PAGAMENTO } from "@/lib/payment";

export default function Payment() {
  if (FORMAS_PAGAMENTO.length === 0) return null;

  return (
    <section
      aria-labelledby="titulo-pagamento"
      className="mx-auto max-w-6xl px-5 py-24"
    >
      <SectionTitle
        sobrancelha="Sem surpresa"
        titulo="Como pagar"
        id="titulo-pagamento"
      />

      <ul className="grid gap-px border-t border-refletivo/20 sm:grid-cols-2">
        {FORMAS_PAGAMENTO.map((forma) => (
          <li key={forma} className="luz p-6">
            <span className="display text-xl text-cal">{forma}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
