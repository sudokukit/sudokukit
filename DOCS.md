# SudokuKit Documentation

## Types

### Grid
The `Grid` is a flat array of cell objects: `Cell[]`.

### Cell
The `Cell` Interface is a working-memory node.

```typescript
export interface Cell {
  // The actual value (0 if empty)
  value: number;

  // A randomized array of candidates
  candidates: number[];

  // A bitmask with all the possible values checked on/off
  options: Bitmask;

  // A list of grid indices that were affected by setting this value
  affected: number[];
  
  // If this value was originally given or not
  given: boolean; 
}
```

### SudokuString
`SudokuString` is just a `string`. It's added for readability (which is scarce anyway with most of the code being optimized and hard to read)

### Bitmask
`Bitmask` is just a `number`. It's added to indicate the number is used as a bitmask. 
Mostly this is used to maintain a list of `candidates` per cell.

The bitmask is set as `0b1111111110` with the last 0 being value 0 and the first 1 being the value 9.
This means they are directly indexed. `bitmask[1]` is about the value `1`.

## Converting Types

### Grid to SudokuString
To export your grid to use as a string.

```typescript
import { convertFromGrid, SudokuString } from '@sudokukit/core';

const sudoku: SudokuString = convertFromGrid(grid);
```

### SudokuString to Grid
To convert your string into a working `Grid` of `Cell[]`.

```typescript
import { convertToGrid, SudokuString } from '@sudokukit/core';

const grid: Grid = convertFromGrid(sudoku);
```

## Difficulty

| Level      | string       | constant                | `holes` | `minBound` |
|------------|--------------|-------------------------|---------|------------|
| Very Easy  | 'very-easy'  | `Difficulty.VeryEasy`   | 24      | 5          |
| Easy       | 'easy'       | `Difficulty.Easy`       | 34      | 4          |
| Medium     | 'medium'     | `Difficulty.Medium`     | 43      | 3          |
| Hard       | 'hard'       | `Difficulty.Hard`       | 51      | 2          |
| Very Hard  | 'very-hard'  | `Difficulty.VeryHard`   | 58      | 1          |
| Impossible | 'impossible' | `Difficulty.Impossible` | 64      | 0          |

## Utility Functions

> Not Yet Implemented

## Has Multiple Solutions
Sometimes you just want to know if a puzzle has multiple solutions or not.

```typescript
const hasMultipleSolutions: boolean = hasMultipleSolutions(sudoku);
```
