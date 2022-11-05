// Base implementation

export function distance(
  a: string,
  b: string,
  optionsArg?: Partial<Pick<Options, "caseSensitive" | "n">>
): number {
  const { n, caseSensitive } = mergeDefaultAndArgOptions(optionsArg);

  const aString = caseSensitive ? a : a.toLowerCase();
  const bString = caseSensitive ? b : b.toLowerCase();

  const aBigrams = getNGrams(n, aString);
  const bBigrams = getNGrams(n, bString);
  return jaccard(aBigrams, bBigrams);
}

function jaccard(a: string[], b: string[]) {
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

function mergeDefaultAndArgOptions(options?: Partial<Options>): Options {
  const defaultOptions: Options = {
    n: 2,
    caseSensitive: false,
    returnCount: 1,
  };
  return {
    ...defaultOptions,
    ...(options ?? {}),
  };
}

function distinct(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index;
}

function removeAt<T>(array: T[], index: number) {
  return array.slice(0, index).concat(array.slice(index + 1));
}

function getNGrams(n: number, string: string) {
  const grams: string[] = [];
  for (let i = 0; i <= string.length - n; i++) {
    const gram = string.substring(i, n + i);
    grams.push(gram);
  }

  return grams;
}

type Options = {
  n: 2 | 3;
  caseSensitive: boolean;
  returnCount: number;
};
