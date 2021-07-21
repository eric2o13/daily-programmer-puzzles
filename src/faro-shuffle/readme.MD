# Faro Shuffle a deck of cards.

Ramda excercise.

Faro shuffling is a method of shuffling playing cards, in which two halfs of the deck interleave perfectly.

A perfect Faro shuffle should do two thing:

1. seperate(cards) : Split an array of integers in to 2 equal parts.
2. riffle(cards): Merge the chunked arrays from right to left, while maintaining the original index.
    riffle([[1,2,3],[4,5,6]]) should return [1,4,2,5,3,6]

Create a function shuffle(cards) that accepts an integer array as a parameter
and both seperates and riffle shuffles the cards.

Questions:
A. How many Faro shuffles does it take to return to the original order of the deck?
Spoiler alert: every amateur magician knows the answer, show your calculations.

## Usage

```
    // Perform a shuffle
    const cards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    shuffle(cards); // -> [1, 6, 2, 7, 3, 8, 4, 9, 5, 10]
```

```
    // Perform a shuffle N times
    shuffleTimesN(cards, 8);
```
