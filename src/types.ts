export type Options = {
  n: 2 | 3;
  caseSensitive: boolean;
  returnCount: number;
};

export type GetOtherFn<T> = (other: T) => string;
