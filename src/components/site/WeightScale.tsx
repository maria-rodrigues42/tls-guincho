import SectionTitle from "@/components/ui/SectionTitle";

/**
 * As quatro classes que o cliente reboca, do mais leve ao mais pesado.
 *
 * A ordem é informação real, então o marcador de cada estação cresce da
 * esquerda para a direita. Nada de "01 / 02 / 03" — isso seria numerar uma
 * lista que não é uma sequência.
 *
 * As quatro categorias vêm do banner oficial. As descrições são curtas de
 * propósito: só afirmam o escopo da categoria, sem prometer técnica ou
 * equipamento que não foi confirmado com o cliente.
 */
const CLASSES = [
  { nome: "Moto", descricao: "Duas rodas, sobre a plataforma.", altura: "h-4" },
  { nome: "Carro", descricao: "Passeio e SUV.", altura: "h-8" },
  { nome: "Utilitário", descricao: "Vans e veículos de trabalho.", altura: "h-14" },
  { nome: "Pesado", descricao: "Guincho pesado.", altura: "h-24" },
] as const;

export default function WeightScale() {
  return (
    <section id="servicos" aria-labelledby="titulo-servicos" className="bg-marca-bg/40 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          sobrancelha="Do mais leve ao mais pesado"
          titulo="O que rebocamos"
          id="titulo-servicos"
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CLASSES.map((classe) => (
            <li key={classe.nome} className="cartao flex flex-col gap-4 p-6">
              <div className="flex items-end" aria-hidden="true">
                <span className={`${classe.altura} w-1.5 rounded-full bg-marca`} />
              </div>
              <h3 className="display text-2xl text-marca-escura">{classe.nome}</h3>
              <p className="text-sm leading-relaxed text-texto/65">
                {classe.descricao}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
