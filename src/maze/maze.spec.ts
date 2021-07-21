import {
  canMoveEast,
  canMoveNorth,
  stringToMatrix,
  Matrix,
  findPath,
} from './index';

const maze: Matrix = stringToMatrix(`
#######
O     #
# # ###
### # #
#X# # #
#     #
#######
`);

test('moving in matrix', () => {
  expect(canMoveEast([1, 0], maze)).toBe(true);
  expect(canMoveEast([1, 6], maze)).toBe(false);
  expect(canMoveNorth([1, 6], maze)).toBe(false);
});

test('find path through maze', () => {
  const path = findPath([1, 0], [4, 1], maze);
  expect(path[path.length - 1]).toEqual([4, 1]);
});
