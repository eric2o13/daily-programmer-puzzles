export type Matrix = number[][];
export type Coordinates = number[];

export const findShortestPath = (
  position: Coordinates,
  end: Coordinates,
  matrix: Matrix
) => {
  let queue: Coordinates[][] | any[] = [];
  matrix[position[0]][position[1]] = 1; //mark current position as traversed
  queue = [...queue, [position]];

  while (queue.length > 0) {
    const path: Coordinates[] = queue.shift(), // get the last path from the queue
      coordinates: Coordinates = path[path.length - 1], // and get it's last item
      x: number = coordinates[0],
      y: number = coordinates[1],
      north: Coordinates = [x + 1, y],
      east: Coordinates = [x, y + 1],
      south: Coordinates = [x - 1, y],
      west: Coordinates = [x, y - 1],
      directions: Coordinates[] = [north, east, south, west];

    for (const direction of directions) {
      const row = direction[0],
        column = direction[1];

      if (row === end[0] && column === end[1]) {
        return [...path, end];
      }

      if (
        row < 0 ||
        row >= matrix.length ||
        column < 0 ||
        column >= matrix[row].length ||
        matrix[row][column] !== 0
      ) {
        continue;
      }

      matrix[row][column] = 1; //mark searched direction as traversed
      queue = [...queue, [...path, direction]]; // push the path to the queue
    }
  }
};