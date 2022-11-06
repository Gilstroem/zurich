# Bucket sorting the `bestMatch` (and `bestObjMatch`) function

TLDR

## Background

The `bestMatch` function uses what is effectively a selection sort, to determine which item(s) are the best match; this is fine for a single match (`O(n)`). But, since it allows returning multiple (1..n) results, it becomes `O(n^2)` as it continously _selects_ the next, best match from the remaining elements.

## Hypothesis

- Inserting calculated distances into a bucket sort structure will improve performance, when returning multiple results.
- It will not severely impact performance when returning a best match, since all elements must be considered regardless.

## Results

- The base version is relatively fast, at ~8.6k ops/s for n = 1, 134 ops/s for n = 100, and 1 op/s for n = 1000,
- The bucket sorted version equals that of the base for n = 1, but is a significant improvement at n = 100 (~50 times faster), and n = 1000 (~600-700 times faster); it can return an array of 100 items sorted by their similarity to a string, in ~150μs, or an array of 1.000 items in ~1.3ms.

Based on these results, the library will be updated to bucket sort matches when `returnCount > 0`. Based on the results, this will not adversely affect returning a single result; if anything, the API will be simplified, potentially leading to insignificant performance gains.

Feel free to experiment with your own performance improvement to returning sorted matches.
