/**
 * Sobrancelha + título de seção. O `id` vai no <h2> para servir de alvo
 * de aria-labelledby na <section> que o envolve.
 */
export default function SectionTitle({
  sobrancelha,
  titulo,
  id,
}: {
  sobrancelha: string;
  titulo: string;
  id?: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4">
      <span className="sobrancelha text-marca-escura/60">{sobrancelha}</span>
      <h2 id={id} className="display text-[clamp(2rem,5vw,3.5rem)] text-marca-escura">
        {titulo}
      </h2>
    </div>
  );
}
