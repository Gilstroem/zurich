import { GetOtherFn, Options } from "../types";
import { indexOfBestGramMatch } from "./gramMatching";
import { removeAt } from "./removeAt";

export function handleMultipleReturns<T>(
  str: string,
  other: T[],
  options: Options,
  getOther?: GetOtherFn<T>
): T[] | null {
  let remainingOther = other;
  const results: T[] = [];
  for (let i = 0; i < options.returnCount; i++) {
    const i = indexOfBestGramMatch(str, remainingOther, options, getOther);
    if (i === null || i === -1) continue;
    results.push(remainingOther[i]);
    remainingOther = removeAt(remainingOther, i);
  }

  if (arrIsEmpty(results)) return null;

  return results;
}

function arrIsEmpty<T>(arr: T[]): boolean {
  return arr.length === 0;
}
