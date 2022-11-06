export function getNGrams(n, string) {
    var grams = [];
    for (var i = 0; i <= string.length - n; i++) {
        var gram = string.substring(i, n + i);
        grams.push(gram);
    }
    return grams;
}
