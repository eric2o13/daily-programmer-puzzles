const R = require('ramda');

export const separate = (list: number[]): number[][] | number[] => {
  const n: number = 2;
  const fn = (_v: number, i: number): number =>
    Math.floor((i * n) / list.length);
  return R.values(R.addIndex(R.groupBy)(fn, list));
};

export const interlace = (parts: number[][]): number[][] =>
  R.zip(parts[0], parts[1]);

export const bridge = (cards: number[][]): number[] => R.unnest(cards);

export const shuffle = (cards: number[]): number[] =>
  R.pipe(separate, interlace, bridge)(cards);

export const applyN = R.compose(R.reduceRight(R.compose, R.identity), R.repeat);

export const shuffleTimesN = (cards: number[], n: number): number[] =>
  applyN(shuffle, n)(cards);
