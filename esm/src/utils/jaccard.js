import { removeAt } from "./removeAt";
export function jaccard(a, b) {
    var distinctBigramsCount = a.concat(b).filter(distinct).length;
    var overlappingBigramsCount = 0;
    for (var i = 0; i < a.length; i++) {
        var letter = a[i];
        var indexInB = b.indexOf(letter);
        if (indexInB !== -1) {
            overlappingBigramsCount += 1;
            b = removeAt(b, indexInB);
        }
    }
    return 1 - overlappingBigramsCount / distinctBigramsCount;
}
function distinct(value, index, self) {
    return self.indexOf(value) === index;
}
