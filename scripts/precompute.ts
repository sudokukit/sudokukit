import * as fs from 'node:fs';

function getRow(row: number): number[] {
  const indices: number[] = new Array(9);
  for (let index: number = 0; index < 9; index++) {
    indices[index] = row * 9 + index;
  }
  return indices;
}
function getColumn(column: number): number[] {
  const indices: number[] = new Array(9);
  for (let index: number = 0; index < 9; index++) {
    indices[index] = index * 9 + column;
  }
  return indices;
}

function getBox(boxRow: number, boxColumn: number): number[] {
  const startRow: number = boxRow * 3;
  const startColumn: number = boxColumn * 3;

  const indices: number[] = [];
  for (let row: number = 0; row < 3; row++) {
    for (let column: number = 0; column < 3; column++) {
      const rowIndex: number = startRow + row;
      const columnIndex: number = startColumn + column;
      const index: number = rowIndex * 9 + columnIndex;
      indices.push(index);
    }
  }
  return indices;
}

function removeDuplicates(array: number[]): number[] {
  return [...new Set(array)];
}

function getAffectedIndices(index: number): number[] {
  const row: number = Math.floor(index / 9);
  const rowIndices: number[] = getRow(row);

  const column: number = index % 9;
  const columnIndices: number[] = getColumn(column);

  const boxRow: number = Math.floor(row / 3);
  const boxColumn: number = Math.floor(column / 3);
  const boxIndices: number[] = getBox(boxRow, boxColumn);

  let affectedIndices: number[] = [...rowIndices, ...columnIndices, ...boxIndices];

  affectedIndices = removeDuplicates(affectedIndices);
  affectedIndices = affectedIndices.filter((affectedIndex: number) => affectedIndex > index);

  return affectedIndices;
}

function generateLut(): number[][] {
  const lut: number[][] = new Array(81);

  for (let index: number = 0; index < 81; index++) {
    lut[index] = getAffectedIndices(index);
  }
  return lut;
}

function createJson(filename: string): void {
  fs.writeFileSync(filename, JSON.stringify(lut, null, 2));
}

const lut: number[][] = generateLut();
createJson('generated/lut.json');
