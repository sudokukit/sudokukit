# SudokuKit Performance
To access all optimized features, SudokuKit exports a number of specialized functions.
Function arguments & response types are explicitly particular.
There are some conversion functions & the types are available.

## Solve

```ts
import { convertGrid, convertToGrid, Grid, solve, SudokuString } from '@sudokukit/core';

const puzzle: SudokuString = '.8..13..26.....4.8...8.5.1.........9...264...4...7...5.21...9.4.....1.5.3....7...';
const grid: Grid = convertToGrid(puzzle);

solveGrid(grid); // Grid is passed by reference for performance purposes

const solvedSudoku: SudokuString = convertGrid(grid);
```

## Multi-Solve

```ts
import { convertToGrid, Grid, solve, SudokuString } from '@sudokukit/core';

const sudokuString: SudokuString = '.8..16..26342.9.1....8..95.8..32417.4.2.9.5833975812.4....6849596..3....1..972.38';
const grid: Grid = convertToGrid(sudokuString);

const results: SudokuString[] = multisolveGrid(grid);
```

### Multi-Solve Limit

Multisolve will keep going. This can cause a crash if you feed it an empty sudoku for instance. 
The algorithm is pretty performant, but not so good that it can create all possible solutions.
For that reason, a limit is implemented, by default 100. Mostly the limit is there.

```typescript
multisolveGrid(grid, 100); // 100 is the default
```

If you're feeling confident (or lucky), you could always pass `0` and it will just keep going.

## Architecture
This library is fully written in Typescript. Which means Webassembly with Rust or C is off the table.

## Benchmarks
All benchmarks were done on a 10-core M1 Max Mac Studio.

Results vary a bit depending on what tests are running. Below table are the fastest stable observed results.

| Benchmark          | puzzle                  | per second | per iteration |
|--------------------|-------------------------|------------|---------------|
| solveEmpty()       | empty grid              | 66k        | 15µs          |
| solveGrid()        | empty grid              | 66k        | 15µs          |
| solveGrid()        | 17 givens               | -          | 3s-20s        |
| solveGrid()        | World's Hardest Sudoku  | 475        | 2ms           |
| multisolveGrid()   | 47 givens / 2 solutions | 81k        | 12µs          |
| generatePuzzle()   | 30 holes, minBound: 3   | 8k         | 126µs         |

> [!NOTE]
> The 17 givens puzzle time has a wide range because of its nondeterministic nature

## Optimization Strategies
The strategies used to optimize are:
- Bitmasks over arrays for cell option state
- Hardcoded values over constants (e.g. `9` or `81`)
- Inlining reusable code (e.g. bitmask operations)
- basic for loops over `for...of` (when applicable) & `forEach` (always)
- precomputed lookup table (LUT) for grid indices
- Lookahead invalidating to avoid cycles
- Trial & error benchmarking

### Further Optimization Candidates
- Recursive lookahead
- Grading approach
- more inlining
- UInt32Array
