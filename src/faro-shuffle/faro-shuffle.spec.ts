import {applyN, separate, riffle, shuffle, shuffleTimesN} from './index';

test('Seperate an array in N (sort of) equal parts', () => {
  const integerList: number[] = [1, 2, 3, 4, 5, 6];
  const twoEqualParts: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  const threeEqualParts: number[][] = [
    [1, 2],
    [3, 4],
    [5, 6],
  ];
  expect(separate(integerList)).toEqual(twoEqualParts);
  expect(separate(integerList, 3)).toEqual(threeEqualParts);
  expect(separate([])).toEqual([]);
});

test('Merge 2 arrays maintaining index priority', () => {
  const cardStacks: number[][] = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
  ];
  const paired: number[][] = [
    [1, 6],
    [2, 7],
    [3, 8],
    [4, 9],
    [5, 10],
  ];
  expect(riffle(cardStacks)).toEqual(paired);
});

test('Shuffle an integer array', () => {
  const cards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const shuffled: number[] = [1, 6, 2, 7, 3, 8, 4, 9, 5, 10];
  expect(shuffle(cards)).toEqual(shuffled);
});

test('Apply a function N times', () => {
  expect(applyN((x: number) => x + 1, 5)(1)).toBe(6);
  expect(applyN((x: number) => x * x, 4)(2)).toBe(65536);
});

test('Shuffle a deck of cards N times', () => {
  const cards: number[] = Array(52)
    .fill(0)
    .map((value, index) => index);
  const newDeckOrder = Array(52)
    .fill(0)
    .map((value, index) => index);
  expect(shuffleTimesN(cards, 8)).toEqual(newDeckOrder);
  expect(shuffleTimesN(cards, 1)).not.toEqual(shuffleTimesN(cards, 2));
});
