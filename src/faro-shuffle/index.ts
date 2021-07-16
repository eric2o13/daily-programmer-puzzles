/*jshint esversion: 6 */
/*

  Faro Shuffle a deck of cards.
  Faro shuffling is a method of shuffling playing cards, in which two halfs of the deck interleave perfectly.

  A perfect Faro shuffle should do two thing:

  1. seperate(cards) : Split an array of integers in to 2 equal parts.
  2. riffle(cards): Merge the chunked arrays from right to left, while maintaining the original index.
     riffle([[1,2,3],[4,5,6]]) should return [1,4,2,5,3,6]

  Create a function shuffle(cards) that accepts an integer array as a parameter
  and both seperates and riffle shuffles the cards.

  Questions:

  A. How many Faro shuffles does it take to return to the original order of the deck?
  Spoiler alert: every amateur magician knows the answer, show your calculations.

*/

const R = require('ramda');

export const separate = (
  list: number[],
  n: number = 2
): number[][] | number[] => {
  const fn = (_v: number, i: number): number =>
    Math.floor((i * n) / list.length);
  return R.values(R.addIndex(R.groupBy)(fn, list));
};

export const toPairs = (parts: number[][]): number[][] =>
  parts[0].map((c: number, i: number) => [parts[0][i], parts[1][i]]);

export const riffle = (parts: number[][]): number[] => toPairs(parts).flat(1);

export const shuffle = (cards: number[]): number[] =>
  R.pipe(separate, riffle)(cards);

export const applyN = R.compose(R.reduceRight(R.compose, R.identity), R.repeat);

export const shuffleTimesN = (cards: number[], n: number): number[] =>
  applyN(shuffle, n)(cards);
