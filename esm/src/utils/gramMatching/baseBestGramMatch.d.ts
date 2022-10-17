import { Options } from "../../types";
declare function baseBestGramMatch<T>(str: string, other: T[], options: Options, returnsIndex: true, getOther?: (other: T) => string): number | null;
declare function baseBestGramMatch<T>(str: string, other: T[], options: Options, returnsIndex: false, getOther?: (other: T) => string): T | null;
export { baseBestGramMatch };
