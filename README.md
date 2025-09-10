![NPM License](https://img.shields.io/npm/l/%40sudokukit%2Fcore)
![NPM Version](https://img.shields.io/npm/v/%40sudokukit%2Fcore)
![NPM Last Update](https://img.shields.io/npm/last-update/%40sudokukit%2Fcore)
![NPM Downloads](https://img.shields.io/npm/dm/%40sudokukit%2Fcore)
![GitHub Repo stars](https://img.shields.io/github/stars/sudokukit/sudokukit?style=flat)
![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/sudokukit_sudokukit?server=https%3A%2F%2Fsonarcloud.io)
![Sonar Violations](https://img.shields.io/sonar/violations/sudokukit_sudokukit?server=https%3A%2F%2Fsonarcloud.io)

# SudokuKit
Generate, Validate & Solve Sudoku. Simple. Fast. Zero Dependencies.

## Installation

```bash
npm install @sudokukit/core
```

## Basic Usage

> [!WARNING] Current documentation does not reflect the codebase. 
> Consult the npm package readme for docs for that version.

### Input & Output
A sudoku is represented as an 81-length string, with dots for empty cells.

```ts // Example Sudoku
const sudoku = '.8..13..26.....4.8...8.5.1.........9...264...4...7...5.21...9.4.....1.5.3....7...';
```

### Generate Puzzle
Generates an uniquely solvable puzzle.

```typescript
import { generatePuzzle } from '@sudokukit/core';

const puzzle = generatePuzzle();
```

#### Difficulty

There are three ways of setting the difficulty:
- string-based (e.g. `medium`)
- constant-based (e.g. `Difficulty.Medium`)
- object-based (`holes` and/or `minBound`)

```typescript
import { Difficulty, generatePuzzle } from '@sudokukit/core';

generatePuzzle('medium');
generatePuzzle(Difficulty.Medium);
generatePuzzle({ holes: 30, minBound: 3 });
```

By default it creates a `medium` puzzle.

##### Notes
> The minimum number of givens of any Sudoku is 17. 

> To remain uniquely solvable, the number of holes can't be guaranteed.

Check [Docs - Difficulty](https://github.com/sudokukit/sudokukit/blob/main/DOCS.md#difficulty) for more information.


### Solve
Solves any (multi-)solvable puzzle.
```typescript
import { solve } from '@sudokukit/core';

const sudoku = solve(puzzle);
```

### Validate

Check if the supplied sudoku is valid & uniquely solvable.
```typescript
import { isValid } from '@sudokukit/core';

const isValid = isValid(sudoku);
```

## Advanced Usage

### Generate Solution
Generates a fully solved & valid sudoku.
```typescript
import { generateSolution } from '@sudokukit/core';

const sudoku = generateSolution();
```

### Find Multiple Solutions
Solves a puzzle and returns all possible solutions.

```typescript
import { multisolve } from './multisolve';

const solutions = findSolutions(puzzle);
```

## Documentation
Need more details? Check out the [Docs](https://github.com/sudokukit/sudokukit/blob/main/DOCS.md) for more information. 

## Performance
Check [Performance](https://github.com/sudokukit/sudokukit/blob/main/PERFORMANCE.md) 
if you want to read more about the algorithms used, learn about optimization strategies, or view benchmark results.

## Roadmap
For version `1.0` the aim is to create a polished set of base features. 
Topics for upcoming releases are: Hints, Grading & Techniques. 
Suggestions are welcome.

## Contributing
Contributions in any form are welcome! Please create an issue or submit a pull request on 
[GitHub](https://github.com/sudokukit/sudokukit).

## License
Sudokukit is licensed under [The Unlicense](https://unlicense.org/). 
Free to use, modify, or distribute without restrictions.

---

[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](#)
[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=fff)](#)
[![Codecov](https://img.shields.io/badge/Codecov-F01F7A?logo=codecov&logoColor=fff)](#)
[![SonarQube Cloud](https://img.shields.io/badge/SonarQube%20Cloud-126ED3?logo=sonarqubecloud&logoColor=fff)](#)
