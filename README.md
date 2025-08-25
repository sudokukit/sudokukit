# SudokuKit
Generate & Solve Sudoku's

## Introduction
SudokuKit is a fast and correct Sudoku Validator, Solver, and Generator written in Typescript.

Because of performance optimizations the code is not as readable as you would normally expect.

## Installation

```bash
npm install @sudokukit/core
```

## Usage

There are two ways of accessing SudokuKit.
1. Easy Access
2. Performance


### Easy Access

> [!NOTE]
> The type `SudokuString` is just a `string` that is assumed to contain a Sudoku.
> Any string that is not length 81 or contains something other than '.' or '1-9' can & will trigger unwanted behaviour.

```ts
import { SudokuKit, SudokuString } from '@sudokukit/core';

/** Easy Access Features */

// Generate Solution
const generatedSolution: SudokuString = SudokuKit.generateSolution();
// e.g. '589716342634259817721843956856324179412697583397581264273168495968435721145972638'

// Generate Multiple Solutions
const generatedSolutions: SudokuString[] = SudokuKit.generateSolutions(10);
// e.g. ['123...', '456...', ...]

// Solve Sudoku
const mediumPuzzle: SudokuString = '.8..13..26.....4.8...8.5.1.........9...264...4...7...5.21...9.4.....1.5.3....7...';
const solvedSudoku: SudokuString = SudokuKit.solve(mediumPuzzle);
// result: '493251786856743291172698534715429368248367159639815472561972843324586917987134625'
```


### Default Sudoku Representation
To offer a uniform interface, most sudoku will be represented as a string with length 81, and dots for empty cells. 
```ts // Example Sudoku
const sudoku = '.8..13..26.....4.8...8.5.1.........9...264...4...7...5.21...9.4.....1.5.3....7...';
```


#### Generate Puzzle
#### Solve Puzzle
#### Validate Puzzle
#### Get Hints


### Performance
To access all optimized features, SudokuKit exports a number of functions. 
Function arguments & response types are explicitly particular. 
To help you with that, we also export conversion functions. 
You could of course write it yourself using the included types. 



> [!IMPORTANT]
> Library is currently 'Early Access', interface will change and easy access features are on the roadmap.

### Solve

```ts
import { convertGrid, convertToGrid, Grid, solve, SudokuString } from '@sudokukit/core';

const unsolvedSudoku: SudokuString = '.8..13..26.....4.8...8.5.1.........9...264...4...7...5.21...9.4.....1.5.3....7...';
const grid: Grid = convertToGrid(sudokuString);

solve(grid); // By reference for performance

const solvedSudoku: SudokuString = convertGrid(grid);
```

### Multi Solve

```ts
import { convertToGrid, Grid, solve, SudokuString } from '@sudokukit/core';

const sudokuString: SudokuString = '.8..16..26342.9.1....8..95.8..32417.4.2.9.5833975812.4....6849596..3....1..972.38';
const grid: Grid = convertToGrid(sudokuString);

const results: SudokuString[] = multisolve(grid);
```

> [!WARNING]
> Multisolve will keep going. Adding a limit is a feature on the roadmap

## Features
This library is fully written in Typescript. Which means Webassembly with Rust or C is off the table.

### Implemented
- Generate Solution
- Solve
- Multisolve
- Convert Grid Utility

### Not Yet Implemented
- Generate Puzzle
- Difficulty Assessment
- Solve for Cell
- Find Hints
- Easy Access
- Multisolve limit
- etc.

## Benchmarks
All benchmarks were done on a 10-core M1 Max Mac Studio.

Results vary a bit depending on what tests are running. Below table are the fastest stable observed results.

| Benchmark    | puzzle                  | per second | per iteration |
|--------------|-------------------------|------------|---------------|
| solveEmpty() | empty grid              | 66k        | 15µs          |
| solve()      | empty grid              | 66k        | 15µs          |
| solve()      | 17 givens               | -          | 3s-20s        |
| multisolve() | 47 givens / 2 solutions | 81k        | 12µs          |

> [!NOTE]
> The 17 givens puzzle time has a wide range because of its nondeterministic nature 

## Optimization Strategy
The strategies used to optimize are:
- Bitmasks over arrays for cell option state
- Hardcoded values over constants (e.g. `9` or `81`)
- Inlining reusable code (e.g. bitmask operations)
- basic for loops over `for...of` & `forEach`
- precomputed lookup table (LUT) for grid indices
- Lookahead invalidating to avoid cycles
- Trial & error benchmarking

### Further Optimization
#### Candidates
- Recursive lookahead
- more inlining
- UInt32Array

## Contributing

## License

Sudokukit is licensed under the Unlicense.

Basically do whatever you want.
