import { GetOtherFn, Options } from "../../types";
import { baseBestGramMatch } from "./baseBestGramMatch";

export function bestGramMatch<T>(
  str: string,
  other: T[],
  options: Options,
  getOther?: GetOtherFn<T>
): T | null {
  return baseBestGramMatch(str, other, options, false, getOther);
}
