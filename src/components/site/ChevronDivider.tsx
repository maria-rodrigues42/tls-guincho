/**
 * Faixa divisória diagonal, nos dois tons de azul da marca. Contida na
 * mesma largura das seções (não de borda a borda), para as pontas
 * arredondadas aparecerem.
 */
export default function ChevronDivider() {
  return (
    <div className="mx-auto max-w-6xl px-5">
      <div className="risco" role="presentation" />
    </div>
  );
}
