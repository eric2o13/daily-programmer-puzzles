# Find the shortest path through a maze.

Depth first search to find the shortest path.

## Usage
```
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
  console.log(path); // -> [[0, 0],[0, 1],[1, 1],[2, 1],[2, 2],[3, 2],[4, 2]]
```