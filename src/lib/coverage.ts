/**
 * Municípios atendidos, base primeiro e o resto em ordem alfabética.
 *
 * Os quatro além de Três Lagoas são exatamente os municípios que fazem
 * divisa com ela: Água Clara (oeste), Brasilândia (sul), Inocência (norte)
 * e Selvíria (norte).
 *
 * Se este array ficar vazio, a seção "Até onde vamos" deixa de ser
 * renderizada. Não acrescente cidade sem o cliente confirmar que atende:
 * publicar uma cidade que ele não cobre gera chamada que ele não pode
 * cumprir, e quem ligou perde tempo que não tem.
 */
export const CIDADES: readonly string[] = [
  "Três Lagoas",
  "Água Clara",
  "Brasilândia",
  "Inocência",
  "Selvíria",
];
