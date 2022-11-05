// Distance with currying

type DistanceOptions = Partial<Pick<Options, "caseSensitive" | "n">>;

export function distance(
  a: string,
  b: string,
  optionsArg?: DistanceOptions
): number;
export function distance(
  a: string,
  optionsArg?: DistanceOptions
): (b: string, optionsArg?: DistanceOptions) => number;
export function distance(
  a: string,
  bOrOptionsArg?: string | DistanceOptions,
  optionsArg?: DistanceOptions
): ((b: string, optionsArg?: DistanceOptions) => number) | number {
  const options = isOptions(bOrOptionsArg) ? bOrOptionsArg : optionsArg;
  const { n, caseSensitive } = mergeDefaultAndArgOptions(options);

  const aString = caseSensitive ? a : a.toLowerCase();
  const aBigrams = getNGrams(n, aString);

  const b = isString(bOrOptionsArg) ? bOrOptionsArg : undefined;

  // Early return if the function is curried
  if (!b) {
    return (b: string, optionsArg?: DistanceOptions) =>
      distance(a, b, optionsArg ?? options);
  }

  const bString = caseSensitive ? b : b.toLowerCase();
  const bBigrams = getNGrams(n, bString);

  return jaccard(aBigrams, bBigrams);
}

function isOptions(b?: string | DistanceOptions): b is DistanceOptions {
  return typeof b === "object";
}

function isString(b?: string | DistanceOptions): b is string {
  return typeof b === "string";
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

function distinct(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index;
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

type Options = {
  n: 2 | 3;
  caseSensitive: boolean;
  returnCount: number;
};

function getNGrams(n: number, string: string) {
  const grams: string[] = [];
  for (let i = 0; i <= string.length - n; i++) {
    const gram = string.substring(i, n + i);
    grams.push(gram);
  }

  return grams;
}

function removeAt<T>(array: T[], index: number) {
  return array.slice(0, index).concat(array.slice(index + 1));
}
