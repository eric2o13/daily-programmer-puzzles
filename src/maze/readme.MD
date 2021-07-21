# Find path through maze

Find path through maze (Bread First Search with traversing)

```
#######
O     #
# # # #
### # #
# # # #
#X    #
#######

You may produce additional output if you desire, but the solution as described above must be included.

A. Find a path to the end
B. Get the number of steps in your fasted way to X
```

## Usage

```
const start: Coordinates = findCoordinates(maze, (y, x) =>
  slotIsStartPoint([y, x], maze)
);
const end: Coordinates = findCoordinates(maze, (y, x) =>
  slotIsEndPoint([y, x], maze)
);
console.log(findPath(start,end,maze))
```