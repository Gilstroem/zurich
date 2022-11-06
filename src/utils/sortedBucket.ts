export class SortedBucket<T> {
  private bucket: Record<string, T[]>;

  constructor() {
    this.bucket = {};
  }

  insert(index: number, item: T) {
    const digits = this.getDigitsString(index);
    if (this.subBucketExistsFor(digits)) {
      this.bucket[digits].push(item);
    } else {
      this.bucket[digits] = [item];
    }
  }

  get(): T[] {
    return this.flattenedBucket(this.getSortedKeys());
  }

  private getDigitsString(n: number) {
    return (Math.floor(n * 1000) ?? 1000).toString();
  }

  private subBucketExistsFor(digits: string) {
    return this.bucket[digits] !== undefined;
  }

  private getSortedKeys() {
    return Object.keys(this.bucket).sort((a, b) =>
      Number(a) > Number(b) ? 1 : -1
    );
  }

  private flattenedBucket(keys: string[]): T[] {
    let result: T[] = [];

    for (let i = 0; i < keys.length; i++) {
      const subBucket = this.bucket[keys[i]];
      for (let j = 0; j < subBucket.length; j++) {
        result.push(subBucket[j]);
      }
    }

    return result;
  }
}
