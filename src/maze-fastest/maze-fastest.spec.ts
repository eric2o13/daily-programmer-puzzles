import {findShortestPath, Matrix, Coordinates} from './index';

test('Find the fastest way through a maze', () => {
  const matrix: Matrix = [
    [0, 0, 0, 0, 0],
    [1, 0, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0],
  ];
  const start: Coordinates = [0, 0];
  const end: Coordinates = [4, 2];
  const path: Coordinates[] | undefined = findShortestPath(start, end, matrix);

  expect(path).toEqual([
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [2, 2],
    [3, 2],
    [4, 2],
  ]);
});

test('Find the fastest way through a maze', () => {
  const matrix: Matrix = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0],
  ];
  const start: Coordinates = [0, 0];
  const end: Coordinates = [2, 7];
  const path: Coordinates[] | undefined = findShortestPath(start, end, matrix);

  expect(path).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 4],
    [2, 4],
    [2, 5],
    [2, 6],
    [2, 7],
  ]);
});
