# SudokuKit
Generate, validate & solve Sudoku. Fast and easy.

---

![NPM License](https://img.shields.io/npm/l/%40sudokukit%2Fcore)
![NPM Version](https://img.shields.io/npm/v/%40sudokukit%2Fcore)
![NPM Last Update](https://img.shields.io/npm/last-update/%40sudokukit%2Fcore)
![NPM Downloads](https://img.shields.io/npm/dm/%40sudokukit%2Fcore)
![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/sudokukit_sudokukit?server=https%3A%2F%2Fsonarcloud.io)
![Sonar Violations](https://img.shields.io/sonar/violations/sudokukit_sudokukit?server=https%3A%2F%2Fsonarcloud.io)

[//]: # (TODO - Code Coverage Badge)


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
const mediumPuzzle: SudokuString = '..32....6....4..9.1.2...5..7...29....4.3.7.5....81...2..1...8.3.2..8....9....46..';
const solvedSudoku: SudokuString = SudokuKit.solve(mediumPuzzle);
// result: '493251786856743291172698534715429368248367159639815472561972843324586917987134625'

// Generate Puzzle
const puzzle: SudokuString = SudokuKit.generatePuzzle();
// e.g. '..32....6....4..9.1.2...5..7...29....4.3.7.5....81...2..1...8.3.2..8....9....46..'
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
- Generate Puzzle
- Easy Access
- 
### Not Yet Implemented
- Out-of-the-box Difficulty Configurations
- Solve for Cell
- Find Hints
- Multisolve limit
- Graded Difficulty Assessment
- Generate Puzzles based on graded difficulty
- etc.

## Benchmarks
All benchmarks were done on a 10-core M1 Max Mac Studio.

Results vary a bit depending on what tests are running. Below table are the fastest stable observed results.

| Benchmark                  | puzzle                  | per second | per iteration |
|----------------------------|-------------------------|------------|---------------|
| solveEmpty()               | empty grid              | 66k        | 15µs          |
| solve()                    | empty grid              | 66k        | 15µs          |
| solve()                    | 17 givens               | -          | 3s-20s        |
| solve()                    | World's Hardest Sudoku  | 475        | 2ms           |
| multisolve()               | 47 givens / 2 solutions | 81k        | 12µs          |
| SudokuKit.generatePuzzle() | 30 holes, minBound: 3   | 8k         | 126µs         |

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

---

[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](#)
[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=fff)](#)
[![Codecov](https://img.shields.io/badge/Codecov-F01F7A?logo=codecov&logoColor=fff)](#)
[![SonarQube Cloud](https://img.shields.io/badge/SonarQube%20Cloud-126ED3?logo=sonarqubecloud&logoColor=fff)](#)
