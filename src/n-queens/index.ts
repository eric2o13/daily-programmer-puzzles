type Board = number[][];
const board: Board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export const attackingSquares = (
  row: number,
  column: number
): [number, number][] => {
  let result: [number, number][] = [];
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      if (board[x][y] === 1) {
        break;
      }
      if (row === x && y === column) {
        continue;
      }

      if (
        row === x ||
        y === column ||
        Math.abs(row - x) === Math.abs(column - y)
      ) {
        result = [...result, [x, y]];
      }
    }
  }
  return result;
};
//console.log(attackingSquares(0, 0));
