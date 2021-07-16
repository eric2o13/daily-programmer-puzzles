/*jshint esversion: 6 */

/* 
  Do a faro shuffle times 8 
  Faro shuffle.
*/

const R = require('ramda');

export const applyN = R.compose(R.reduceRight(R.compose, R.identity), R.repeat);

export const separate = (n: number, list: number[]): number[][] => {
  const length = list.length;
  const fn = (_v: number, idx: number) => Math.floor((idx * n) / length);
  return R.values(R.addIndex(R.groupBy)(fn, list));
};

export const riffle = (parts: number[][]): number[] => parts[0].map((c: number, i: number) => [parts[0][i], parts[1][i]]).flat(1);

export const shuffle = (cards: number[]): number[] | number[][] => {
  const parts = separate(2, cards);
  cards = riffle(parts);
  return cards;
};
