export declare class SortedBucket<T> {
    private bucket;
    constructor();
    insert(index: number, item: T): void;
    get(): T[];
    private getDigitsString;
    private subBucketExistsFor;
    private getSortedKeys;
    private flattenedBucket;
}
