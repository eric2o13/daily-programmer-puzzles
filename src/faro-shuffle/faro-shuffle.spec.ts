/*jshint esversion: 6 */
import {applyN, separate, riffle, shuffle} from './index';

test('apply a function N times', () => {
  expect(applyN((x: number) => x + 1, 5)(1)).toBe(6);
  expect(applyN((x: number) => x * x, 4)(2)).toBe(65536);
});

test('seperate an array in N (sort of) equal parts', () => {
  expect(separate(2, [1, 2, 3, 4, 5, 6])).toEqual([
    [1, 2, 3],
    [4, 5, 6],
  ]);
  expect(separate(3, [1, 2, 3, 4, 5, 6])).toEqual([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
});

test('Merge 2 arrays maintaining index priority', () => {
  expect(
    riffle([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
    ])
  ).toEqual([1, 6, 2, 7, 3, 8, 4, 9, 5, 10]);
});

test('Shuffle a deck of cards 8 times', () => {
  const cards: number[] = Array(52)
    .fill(0)
    .map((value, index) => index);
  expect(applyN(shuffle, 8)(cards)).toEqual(
    Array(52)
      .fill(0)
      .map((value, index) => index)
  );
});
