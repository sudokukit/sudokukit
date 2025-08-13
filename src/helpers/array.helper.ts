export const ArrayHelper = {
  shuffle<T>(array: T[]): void {
    for (let index: number = array.length - 1; index > 0; index--) {
      const newIndex: number = Math.floor(Math.random() * (index + 1));
      [array[index], array[newIndex]] = [array[newIndex], array[index]];
    }
  },
};
