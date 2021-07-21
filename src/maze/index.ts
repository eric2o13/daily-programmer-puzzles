const R = require('ramda');

export type Coordinates = number[];
export type CoordinatesList = Coordinates[];
export type Matrix = string[][] | CoordinatesList;
export type CardinalPoint = 'North' | 'East' | 'South' | 'West';
export const stringToMatrix = (string: string): Matrix =>
  string
    .trim()
    .split('\n')
    .map(x => x.split(''));
export const maze: Matrix = stringToMatrix(`
#######
O     #
# # ###
# # # #
#X# # #
#     #
#######
`);

export const filterCoordinates = (
  array: Matrix,
  fn: (y: number, x: number) => boolean
): Coordinates[] => {
  const map = [];
  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[y].length; x++) {
      if (fn(y, x)) {
        map.push([y, x]);
      }
    }
  }
  return map;
};

export const findCoordinates = (
  array: Matrix,
  fn: (y: number, x: number) => boolean
): Coordinates => {
  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[y].length; x++) {
      if (fn(y, x)) {
        return [y, x];
      }
    }
  }
  return [];
};

export const distance = (
  [y, x]: Coordinates,
  [row, column]: Coordinates
): number => Math.abs(y - row) + Math.abs(x - column);
const slotExists = ([y, x]: Coordinates, maze: Matrix) =>
  y >= 0 &&
  x >= 0 &&
  y <= maze.length &&
  x < maze[y].length &&
  typeof maze[y][x] !== undefined;

const slotIsEndPoint = ([y, x]: Coordinates, maze: Matrix): boolean =>
  maze[y][x] === 'X' && slotExists([y, x], maze);
const slotIsStartPoint = ([y, x]: Coordinates, maze: Matrix): boolean =>
  maze[y][x] === 'O' && slotExists([y, x], maze);

const markAsTraversed = ([y, x]: Coordinates, maze: Matrix): Coordinates => {
  if (!slotIsStartPoint([y, x], maze) && !slotIsEndPoint([y, x], maze)) {
    maze[y][x] = 'T';
  }
  return [y, x];
};
const slotIsTraversed = ([y, x]: Coordinates, maze: Matrix): boolean =>
  maze[y][x] === 'T';
const slotIsEmpty = ([y, x]: Coordinates, maze: Matrix): boolean =>
  maze[y][x] === ' ' || slotIsEndPoint([y, x], maze);

export const canMoveToSlot = ([y, x]: Coordinates, maze: Matrix): boolean =>
  slotExists([y, x], maze) &&
  slotIsEmpty([y, x], maze) &&
  !slotIsTraversed([y, x], maze);
export const canMoveSouth = ([y, x]: Coordinates, maze: Matrix): boolean =>
  canMoveToSlot([y + 1, x], maze);
export const canMoveNorth = ([y, x]: Coordinates, maze: Matrix): boolean =>
  canMoveToSlot([y - 1, x], maze);
export const canMoveEast = ([y, x]: Coordinates, maze: Matrix): boolean =>
  canMoveToSlot([y, x + 1], maze);
export const canMoveWest = ([y, x]: Coordinates, maze: Matrix): boolean =>
  canMoveToSlot([y, x - 1], maze);
export const moveNorth = ([y, x]: Coordinates): Coordinates => [y - 1, x];
export const moveSouth = ([y, x]: Coordinates): Coordinates => [y + 1, x];
export const moveEast = ([y, x]: Coordinates): Coordinates => [y, x + 1];
export const moveWest = ([y, x]: Coordinates): Coordinates => [y, x - 1];

/**
 * Returns coordinates as long as found.
 * Returns a boolean if no or end result is found.
 * @param Coordinates [row,column]
 * @param Maze maze
 * @returns false | Coordinates
 */
export const moveForward = (
  [y, x]: Coordinates,
  maze: Matrix
): Coordinates | false => {
  if (slotIsEndPoint([y, x], maze)) {
    return [y, x];
  }
  if (canMoveEast([y, x], maze)) {
    return moveEast([y, x]);
  }
  if (canMoveSouth([y, x], maze)) {
    return moveSouth([y, x]);
  }
  if (canMoveWest([y, x], maze)) {
    return moveWest([y, x]);
  }
  if (canMoveNorth([y, x], maze)) {
    return moveNorth([y, x]);
  }
  //we are stuck
  return false;
};

export const traversable = ([y, x]: Coordinates, maze: Matrix): boolean =>
  canMoveSouth([y, x], maze) ||
  canMoveNorth([y, x], maze) ||
  canMoveEast([y, x], maze) ||
  canMoveWest([y, x], maze);

export const traverse = (list: CoordinatesList, maze: Matrix): Coordinates => {
  if (traversable(list[0], maze)) {
    return list[0];
  }
  list.shift();
  return traverse(list, maze);
};

export const findPath = (
  start: Coordinates,
  end: Coordinates,
  maze: Matrix
): CoordinatesList => {
  let traversed: any = [];
  while (!R.flatten(traversed).includes(true)) {
    let position: Coordinates = traversed[traversed.length - 1] || start;
    position = markAsTraversed(position, maze);

    if (moveForward(position, maze) !== false) {
      traversed = [...traversed, moveForward(position, maze)];
    }
    if (moveForward(position, maze) === false) {
      //We are stuck, reverse the traversed path and try again.
      const array = R.reverse(traversed);
      if (array.length) {
        const coordinates = traverse(array, maze);
        traversed = traversed.slice(0, traversed.indexOf(coordinates) + 1);
      }
    }

    if (R.equals(moveForward(position, maze), end)) {
      return traversed;
    }
  }

  return traversed;
};

