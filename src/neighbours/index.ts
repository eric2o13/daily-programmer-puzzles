/*jshint esversion: 6 */

/*

    Given this matrix that represents a neighbourhood
    where 0 is an empty slot representing space and 1 is an occupied slot representing a house,
    return the coordinates of all empty slots within K distance of each occupied slot, as followed: [rowIndex, columnIndex]
    where K is the number of cell borders one needs to cross.

    0 0 0 0 0 0
    0 1 0 0 1 0
    0 0 0 0 0 0
    0 0 0 0 0 0
    0 0 0 0 0 1
    1 0 0 1 0 0

    Expected result when K = 4
    possibleLocations(4) ➞ [[3,2]]

    0 0 0 0 0 0
    0 1 0 0 1 0
    0 0 0 0 0 0
    0 0 * 0 0 0
    0 0 0 0 0 1
    1 0 0 1 0 0

    Expected result when K = 5
    possibleLocations(5).length ➞ 6

    0 0 0 0 0 0
    0 1 0 0 1 0
    0 0 * 0 0 0
    0 * * * 0 0
    0 0 * * 0 1
    1 0 0 1 0 0

    Note: You can't move diagonal, only in straight lines.
    Note: There is an imaginary border around the matrix. Don't cross these borders.
    Note: You can't walk through an occupied slot.

    Bonus: reduce the number of iterations needed

*/

const R = require('ramda');

export const matrix: number[][] = [
  [0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0],
];

export const filter = (
  array: number[][] | number[][][],
  fn: (y: number, x: number, value: number) => boolean
): number[][] => {
  const map = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (fn(y, x, matrix[y][x])) {
        map.push([y, x]);
      }
    }
  }
  return map;
};

export const distance = ([y, x]: number[], [row, column]: number[]) =>
  Math.abs(y - row) + Math.abs(x - column);
export const coordinatesWithinDistance = (
  [y, x]: number[],
  [row, column]: number[],
  k: number
): boolean => distance([y, x], [row, column]) <= k;
export const coordinatesAreEqual = (
  [y, x]: number[],
  [row, column]: number[]
): boolean => y === row && x === column;
export const slotIsNotOccupied = ([y, x]: number[]): boolean =>
  matrix[y][x] === 0;
export const slotIsOccupied = ([y, x]: number[]): boolean => matrix[y][x] === 1;

export const findSlotsWithinDistance = ([row, column]: number[], k: number) =>
  filter(
    matrix,
    (y, x) =>
      coordinatesWithinDistance([y, x], [row, column], k) &&
      slotIsNotOccupied([y, x]) &&
      !coordinatesAreEqual([y, x], [row, column])
  );

export const possibleLocations = (k: number) => {
  const coordinates = filter(matrix, (y, x) => slotIsOccupied([y, x])).map(
    slot => findSlotsWithinDistance(slot, k)
  );
  return R.uniq(
    filter(coordinates, (y, x) =>
      coordinates.every(list => list.find(c => R.equals([y, x], c)))
    )
  );
};
