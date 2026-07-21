import SectionTitle from "@/components/ui/SectionTitle";
import Revelar from "@/components/ui/Revelar";
import { FORMAS_PAGAMENTO } from "@/lib/payment";

export default function Payment() {
  if (FORMAS_PAGAMENTO.length === 0) return null;

  return (
    <section aria-labelledby="titulo-pagamento" className="py-20">
      <Revelar className="mx-auto max-w-6xl px-5">
        <SectionTitle
          sobrancelha="Sem surpresa"
          titulo="Como pagar"
          id="titulo-pagamento"
        />

        <ul className="grid gap-4 sm:grid-cols-2">
          {FORMAS_PAGAMENTO.map((forma) => (
            <li key={forma} className="cartao p-6">
              <span className="display text-xl text-marca-escura">{forma}</span>
            </li>
          ))}
        </ul>
      </Revelar>
    </section>
  );
}
