import { Options } from "../../types";
import { baseBestGramMatch } from "./baseBestGramMatch";

export function indexOfBestGramMatch<T>(
  str: string,
  other: T[],
  options: Options,
  getOther?: (other: T) => string
): number | null {
  return baseBestGramMatch(str, other, options, true, getOther);
}
