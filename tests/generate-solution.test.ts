import { generateSolution } from '@sudokukit/generators';
import { describe, expect, test } from 'vitest';

describe('GenerateSolution', () => {
  test(`should generate a solution of length 81`, () => {
    const solution: string = generateSolution();

    expect(solution.length).toBe(81);
  });

  test(`measures average performance of generate over 50000 calls`, () => {
    const numberOfIterations = 50000;
    let totalTime: number = 0;
    for (let i: number = 0; i < numberOfIterations; i++) {
      const start: number = performance.now();
      generateSolution();
      const end: number = performance.now();
      totalTime += end - start;
    }
    const average: number = totalTime / numberOfIterations;
    const microseconds: number = Math.round(average * 1000);
    console.log(`Average time: ${microseconds} µs`);

    expect(microseconds).toBeLessThan(25);
  });
});
