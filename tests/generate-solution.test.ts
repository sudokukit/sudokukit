import { GRID_SIZE } from '@sudokukit/constants';
import { generateSolution } from '@sudokukit/generators';
import { describe, expect, test } from 'vitest';

describe('GenerateSolution', () => {
  test(`should generate a solution of length ${GRID_SIZE}`, () => {
    const solution: string = generateSolution();

    expect(solution.length).toBe(GRID_SIZE);
  });

  test(`measures average performance of generate over 1000 calls`, () => {
    const numberOfIterations = 1000;
    let totalTime: number = 0;
    for (let i: number = 0; i < numberOfIterations; i++) {
      const start: number = performance.now();
      generateSolution();
      const end: number = performance.now();
      totalTime += end - start;
    }
    const average: number = totalTime / numberOfIterations;
    console.log(`Average time: ${Math.round(average * 1000)} µs`);

    expect(average).toBeLessThan(1); // 1ms
  });
});
