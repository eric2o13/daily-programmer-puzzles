import {attackingSquares} from './index';

test('Test potential queen moves for a given coordinate', () => {
  expect(true).toBe(true);

  expect(attackingSquares(0, 0).sort()).toEqual(
    [
      //top left to top right
      [0, 1],
      [0, 2],
      [0, 3],
      //top left to bottom left
      [1, 0],
      [2, 0],
      [3, 0],
      //top left diagonal to bottom right
      [1, 1],
      [2, 2],
      [3, 3],
    ].sort()
  );
});
