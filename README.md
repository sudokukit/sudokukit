# SudokuKit
Generate & Solve Sudoku's

## Introduction
SudokuKit is a fast and correct Sudoku Validator, Solver, and Generator written in Typescript.

Because of performance optimizations the code is not as readable as you would normally expect.

## Installation

```bash
npm i @sudokukit/core
```

## Usage

## Features
This library is fully written in Typescript. Which means Webassembly with Rust or C is off the table.

### Implemented
- Generate Solution

### Not Yet Implemented
- Solve Puzzle
- Generate Puzzle
- Difficulty Assessment
- Solve for Cell
- Find Hints
- etc.

## Benchmarks
All benchmarks were done on a 10-core M1 Max Mac Studio.

Results vary a bit depending on what tests are running. Below table are the fastest stable observed results.

| Benchmark     | puzzle     | per second | per iteration |
|---------------|------------|------------|---------------|
| solveEmpty()  | empty grid | 66k        | 15µs          |
| solve()       | empty grid | 66k        | 15µs          |
| solve()       | 17 givens  | -          | 3s-20s        |

> The 17 givens puzzle time has a range because of its nondeterministic nature 

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
