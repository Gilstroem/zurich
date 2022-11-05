# Currying the `distance` function

TLDR

> - There is not generally a statistically significant improvement when currying `distance` before applying it many times with the same first parameter.
> - Under certain circumstances, the curried version significantly slower.

## Background

The `distance` function splits two strings into n-grams, and calculates and index based on how many n-grams there are in total, and how much overlap there is between two sets of n-grams.

## Hypothesis

Allowing the n-grams for the first string to be calculated, before running many iterations of `distance` would make it faster. This could be achieved by currying the function with the first argument.

## Results

- The base version is fast (~1.000.000 ops/s),
- The results generally vary by less than 0.5% (i.e the real-life difference might be milli- or nano-seconds),
- The curry-capable version is not statistically significantly less or more performant than the base version, when not currying,
- The curry-capable version is not generally statistically significantly less or more performant than the base version, when currying,
- The curry-capable versions are significantly slower under certain rare circumstances, with low iterations (7-14% slower),
- Even when stacking the odds in the curried version's favour, by comparing a very long string (curried), with a single word, the difference is insignificant.

Based on these results, I have decided not to update `distance` to allow currying.

However, implementations may vary, and if you want to try to create a _significantly_ faster curried version, please feel free to submit a PR with this (`distance-currying`) folder copied, renamed, and showing reproducable statistically significantly faster results.

The exact results can be found in the `./results`-folder.
