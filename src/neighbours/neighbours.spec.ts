import {distance, findSlotsWithinDistance, possibleLocations} from './index';

test('distance (K) between 2 coordinates', () => {
  expect(distance([0, 0], [0, 1])).toBe(1);
  expect(distance([5, 0], [0, 0])).toBe(5);
  expect(distance([5, 0], [0, 5])).toBe(10);
});

test('get the possible slots within for a set of coordinates within K distance', () => {
  expect(findSlotsWithinDistance([5, 0], 1)).toEqual(
    [
      [4, 0],
      [5, 1],
    ].sort()
  );
  expect(findSlotsWithinDistance([0, 5], 2)).toEqual(
    [
      [0, 4],
      [0, 3],
      [1, 5],
      [2, 5],
    ].sort()
  );
  expect(findSlotsWithinDistance([2, 2], 1)).toEqual(
    [
      [1, 2],
      [2, 3],
      [3, 2],
      [2, 1],
    ].sort()
  );
});

test('possible locations return expected result', () => {
  expect(possibleLocations(3)).toEqual([]);
  expect(possibleLocations(4)).toEqual([[3, 2]]);
  expect(possibleLocations(5)).toEqual([
    [2, 2],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 2],
    [4, 3],
  ]);
});
