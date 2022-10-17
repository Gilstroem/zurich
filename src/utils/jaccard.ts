import { removeAt } from "./removeAt";

export function jaccard(a: string[], b: string[]) {
  let distinctBigramsCount = a.concat(b).filter(distinct).length;

  let overlappingBigramsCount = 0;
  for (let i = 0; i < a.length; i++) {
    const letter = a[i];
    const indexInB = b.indexOf(letter);
    if (indexInB !== -1) {
      overlappingBigramsCount += 1;
      b = removeAt(b, indexInB);
    }
  }

  return 1 - overlappingBigramsCount / distinctBigramsCount;
}

function distinct(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index;
}
