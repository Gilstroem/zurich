export function bestMatch(
  str: string,
  other: string[],
  optionsArg?: { returnCount: 1 } & Partial<Options>
): string | null;
export function bestMatch(
  str: string,
  other: string[],
  optionsArg?: Partial<Options>
): string[] | null;
export function bestMatch(
  str: string,
  other: string[],
  optionsArg?: Partial<Options>
): string | string[] | null {
  const options = mergeDefaultAndArgOptions(optionsArg);

  if (options.returnCount > 1)
    return getMultipleGramMatches(str, other, options);

  return bestGramMatch(str, other, options);
}

type GetOtherFn<T> = (other: T) => string;

function bestGramMatch<T>(
  str: string,
  other: T[],
  options: Options,
  getOther?: GetOtherFn<T>
): T | null {
  return baseBestGramMatch(str, other, options, false, getOther);
}

function baseBestGramMatch<T>(
  str: string,
  other: T[],
  options: Options,
  returnsIndex: true,
  getOther?: (other: T) => string
): number | null;
function baseBestGramMatch<T>(
  str: string,
  other: T[],
  options: Options,
  returnsIndex: false,
  getOther?: (other: T) => string
): T | null;
function baseBestGramMatch<T>(
  str: string,
  other: T[],
  options: Options,
  returnsIndex: boolean,
  getOther?: (other: T) => string
): T | number | null {
  if (str.length === 0 || other.length === 0) return null;
  const { n, caseSensitive } = options;

  const aString = caseSensitive ? str : str.toLowerCase();
  const aGrams = getNGrams(n, aString);

  let closestIndex: number | null = null;
  let closestDistance = 1;

  for (let i = 0; i < other.length; i++) {
    const b = getOther?.(other[i]) ?? other[i];
    if (!b || typeof b !== "string") continue;
    const bString = caseSensitive ? b : b.toLowerCase();
    const bGrams = getNGrams(n, bString);
    const distance = jaccard(aGrams, bGrams);
    if (distance < closestDistance) {
      closestIndex = i;
      closestDistance = distance;
    }
  }

  if (returnsIndex) {
    return closestIndex;
  }

  return closestIndex === null ? null : other[closestIndex];
}

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

// CHANGES HERE

export class SortedBucket<T> {
  private bucket: T[][];

  constructor() {
    this.bucket = Array.from(Array(1001)).map((_) => []);
  }

  insert(index: number, item: T) {
    const digits = Math.floor(index * 1000) ?? 1000;
    this.bucket[digits].push(item);
  }

  get(): T[] {
    return this.bucket.flat();
  }
}

export function getMultipleGramMatches<T>(
  str: string,
  other: T[],
  options: Options,
  getOther?: GetOtherFn<T>
): T[] | null {
  const bucket = new SortedBucket<T>();

  for (let i = 0; i < other.length; i++) {
    const b = getOther?.(other[i]) ?? other[i];
    if (!b || typeof b !== "string") continue;

    bucket.insert(distance(str, b, options), other[i]);
  }

  const results = bucket.get();

  if (arrayIsEmpty(results)) return null;

  if (options?.returnCount) return results.slice(0, options.returnCount);

  return results;
}

function arrayIsEmpty<T>(arr: T[]): boolean {
  return arr.length === 0;
}
