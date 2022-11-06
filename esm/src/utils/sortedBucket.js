var SortedBucket = /** @class */ (function () {
    function SortedBucket() {
        this.bucket = {};
    }
    SortedBucket.prototype.insert = function (index, item) {
        var digits = this.getDigitsString(index);
        if (this.subBucketExistsFor(digits)) {
            this.bucket[digits].push(item);
        }
        else {
            this.bucket[digits] = [item];
        }
    };
    SortedBucket.prototype.get = function () {
        return this.flattenedBucket(this.getSortedKeys());
    };
    SortedBucket.prototype.getDigitsString = function (n) {
        var _a;
        return ((_a = Math.floor(n * 1000)) !== null && _a !== void 0 ? _a : 1000).toString();
    };
    SortedBucket.prototype.subBucketExistsFor = function (digits) {
        return this.bucket[digits] !== undefined;
    };
    SortedBucket.prototype.getSortedKeys = function () {
        return Object.keys(this.bucket).sort(function (a, b) {
            return Number(a) > Number(b) ? 1 : -1;
        });
    };
    SortedBucket.prototype.flattenedBucket = function (keys) {
        var result = [];
        for (var i = 0; i < keys.length; i++) {
            var subBucket = this.bucket[keys[i]];
            for (var j = 0; j < subBucket.length; j++) {
                result.push(subBucket[j]);
            }
        }
        return result;
    };
    return SortedBucket;
}());
export { SortedBucket };
