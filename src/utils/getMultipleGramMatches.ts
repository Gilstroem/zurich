import { distance } from "../distance";
import { GetOtherFn, Options } from "../types";
import { SortedBucket } from "./sortedBucket";

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

  return results.slice(0, options.returnCount);
}

function arrayIsEmpty<T>(arr: T[]): boolean {
  return arr.length === 0;
}
