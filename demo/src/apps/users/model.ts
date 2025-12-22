export const takeFirst = <A>(xs: readonly A[], n: number): A[] =>
  xs.slice(0, n);
