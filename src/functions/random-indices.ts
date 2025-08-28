import { randomIndex } from './random-index';

export function randomIndices(amount: number): number[] {
  const indices: number[] = [];

  while (indices.length < amount) {
    const index: number = randomIndex();

    if (indices.includes(index)) continue;

    indices.push(index);
  }

  return indices;
}
