/*jshint esversion: 6 */
import {applyN, separate, riffle, shuffle, shuffleTimesN} from './index';

test('Seperate an array in N (sort of) equal parts', () => {
  expect(separate([1, 2, 3, 4, 5, 6])).toEqual([
    [1, 2, 3],
    [4, 5, 6],
  ]);
  expect(separate([1, 2, 3, 4, 5, 6], 3)).toEqual([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
  expect(separate([])).toEqual([]);
});

test('Merge 2 arrays maintaining index priority', () => {
  expect(
    riffle([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
    ])
  ).toEqual([1, 6, 2, 7, 3, 8, 4, 9, 5, 10]);
});

test('Shuffle an integer array', () => {
  expect(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([
    1, 6, 2, 7, 3, 8, 4, 9, 5, 10,
  ]);
});

test('Apply a function N times', () => {
    expect(applyN((x: number) => x + 1, 5)(1)).toBe(6);
    expect(applyN((x: number) => x * x, 4)(2)).toBe(65536);
});
  
test('Shuffle a deck of cards 8 times', () => {
  const cards: number[] = Array(52)
    .fill(0)
    .map((value, index) => index);
  const newDeckOrder = Array(52)
    .fill(0)
    .map((value, index) => index);
  expect(shuffleTimesN(cards, 8)).toEqual(newDeckOrder);
});
