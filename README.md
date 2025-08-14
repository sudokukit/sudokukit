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

## Benchmarks
All benchmarks were done on a 10-core M1 Max Mac Studio.

| Benchmark      | per second | per iteration |
|----------------|------------|---------------|
| Full Solutions | 50.000     | 20µs          |

## Optimization Strategy
The strategies used to optimize are:
- Bitmasks over arrays for cell option state
- Hardcoded values over constants (e.g. `9` or `81`)
- Inlining reusable code (e.g. bitmask operations)
- basic for loops over `for...of` & `forEach`
- precomputed lookup tables (luts) for grid positions
- Lookahead invalidating to avoid cycles
- Trial & error benchmarking

### Further Optimization
- One big LUT to rule them all of affected indices per index
- Optimistic LUT tables, only worry about empty cells
- Recursive lookahead
- inlining even more

## Contributing

## License

Sudokukit is licensed under the Unlicense.

Basically do whatever you want.
