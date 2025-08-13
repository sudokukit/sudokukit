import { Bitmask } from './bitmask.type';

export type Cell = [value: number, candidates: Bitmask, options: Bitmask, affected: number[], given: boolean];
