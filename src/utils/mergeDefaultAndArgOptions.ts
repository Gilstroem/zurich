import { Options } from "../types";

export function mergeDefaultAndArgOptions(options?: Partial<Options>): Options {
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
