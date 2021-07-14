/*jshint esversion: 6 */

/*

    Given this matrix that represents a neighbourhood
    where 0 is an empty slot representing space and 1 is an occuppied slot representing a house,
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
const test = require('tape');

const matrix = [
    [ 0, 0, 0, 0, 0, 0],
    [ 0, 1, 0, 0, 1, 0],
    [ 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 1],
    [ 1, 0, 0, 1, 0, 0],
];

const filter = ( array, fn ) => {
    let map = [];
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (fn(y,x, matrix[y][x])) {
                map.push([y,x]);
            }
        }
    }
    return map;
};

const distance = ([y, x], [row, column]) => Math.abs(y - row) + Math.abs(x - column);
const coordinatesWithinDistance = ([y,x],[row,column],k) => distance([y,x],[row,column]) <= k;
const coordinatesAreEqual = ([y,x], [row, column]) => y === row && x === column;
const slotIsNotOccupied = ([y,x]) => matrix[y][x] === 0;
const slotIsOccupied = ([y,x]) => matrix[y][x] === 1;

test('distance (K) between 2 coordinates', (t) => {
    t.equals(distance([0,0], [0,1]), 1);
    t.equals(distance([5,0], [0,0]), 5);
    t.equals(distance([5,0], [0,5]), 10);
    t.end();
});

const findSlotsWithinDistance = ([row, column], k) => 
     filter(matrix, (y,x,value) => 
        coordinatesWithinDistance([y,x],[row,column],k) && 
        slotIsNotOccupied([y,x]) &&
        !coordinatesAreEqual([y,x],[row,column]));

test('get the possible slots within for a set of coordinates within K distance', (t) => {

    t.deepEquals(
        findSlotsWithinDistance([5,0],1),
        [[4,0],[5,1]].sort()
    );
    t.deepEquals(
        findSlotsWithinDistance([0,5],2),
        [[0,4],[0,3],[1,5],[2,5]].sort()
    );
    t.deepEquals(
        findSlotsWithinDistance([2,2],1),
        [[1,2], [2,3], [3,2], [2,1]].sort()
    );
    
    t.end();
});


const possibleLocations = (k) => {
    const coordinates = filter(matrix, (y,x) => slotIsOccupied([y,x])).map((slot) => findSlotsWithinDistance(slot, k));
    return R.uniq(filter(coordinates, (y,x,value) => coordinates.every((list) => list.find((c) => R.equals([y,x], c)))));
};

test('possible locations return expected result', (t) => {
    t.deepEquals(possibleLocations(3), []);
    t.deepEquals(possibleLocations(4), [ [ 3, 2 ] ]);
    t.deepEquals(possibleLocations(5), [ [ 2, 2 ], [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 4, 2 ], [ 4, 3 ] ]);
    t.equal(possibleLocations(12).length, 31);
    t.end();
});
