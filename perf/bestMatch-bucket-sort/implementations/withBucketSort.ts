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
  return baseBestGramMatch(str, other, options, getOther);
}
function baseBestGramMatch<T>(
  str: string,
  other: T[],
  options: Options,
  getOther?: (other: T) => string
): T | null {
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
  private bucket: Record<string, T[]>;

  constructor() {
    this.bucket = {};
  }

  insert(index: number, item: T) {
    const digits = (Math.floor(index * 1000) ?? 1000).toString();
    if (this.bucket[digits]) {
      this.bucket[digits].push(item);
    } else {
      this.bucket[digits] = [item];
    }
  }

  get(): T[] {
    let result: T[] = [];
    const sortedKeys = this.getSortedKeys();

    for (let i = 0; i < sortedKeys.length; i++) {
      const subBucket = this.bucket[sortedKeys[i]];
      for (let j = 0; j < subBucket.length; j++) {
        result.push(subBucket[j]);
      }
    }

    return result;
  }

  private getSortedKeys() {
    return Object.keys(this.bucket).sort((a, b) =>
      Number(a) > Number(b) ? 1 : -1
    );
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
