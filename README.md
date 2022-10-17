# Zurich 🏔

> [Jaccard Index](https://en.wikipedia.org/wiki/Jaccard_index)-based string distance TS library.<br/>
> Simple API, precise, helpful types.

## TODO

- Package and publish

---

## `distance` - getting the distance between two strings

Get the (bigram or trigram) distance between two strings (measured by jaccard index)

### Signature

```typescript
distance(
    a: string,
    b: string,
    options?: {
        n?: number = 2,
        caseSensitive?: boolean = false
    }
): number
```

### Usage

#### Basic

The `options` object is optional, and the function defaults the using bi-grams.

```typescript
import { distance } from "zurich";

const d1 = distance("dog", "dog"); // 0
const d2 = distance("toad", "road"); // 0.5
const d3 = distance("dog", "monkey"); // 1
```

#### Trigrams

Get distance using trigrams, with the `{n: 3}` option

```typescript
const d = distance("toad", "road", { n: 3 }); // 0.6666666666666667
```

#### Case sensitive (`caseSensitive = true`)

```typescript
const d1 = distance("dog", "dog", { caseSensitive: true }); // 0
const d2 = distance("dog", "DOG", { caseSensitive: true }); // 1
```

---

## `bestMatch` - getting the closest string in an array of strings

Get the string(s) matching closest to a another string, from an array of strings

### Signature

```typescript
bestMatch(
    str: string,
    other: string[],
    options?: {
        n?: number = 2,
        caseSensitive?: boolean = false,
        returnCount?: number = 1
    }
): string
```

### Usage

#### Basic

```typescript
import { bestMatch } from "zurich";

const match1 = bestMatch("dog", ["zog", "hog", "bog"]); // 'zog'
const match2 = bestMatch("dog", ["zebras", "hedgehog", "warthog"]); // 'warthog'
const match3 = bestMatch("dog", []); // null
```

#### Trigrams

```typescript
const match = bestMatch("tigers", ["liger", "tiger", "tigers"], { n: 3 }); // 'tigers'
```

#### Case sensitive

```typescript
const match = bestMatch("DOG", ["dog", "DOG"], { n: 3, caseSensitive: true }); // 'DOG'
```

#### Returning multiple ordered matches

```typescript
const match1 = bestMatch("dog", ["zog", "hog", "dog"], { returnCount: 2 }); // ['dog', 'zog']
const match2 = bestMatch("dog", ["zog", "hog", "dog"], { returnCount: 5 }); // ['dog', 'zog', 'hog']
const match3 = bestMatch("dog", ["zog", "hog", "dog"], { returnCount: 2 }); // ['dog']
```

**NB:** The `bestMatch` (and the `bestObjMatchByKey`) functions have appropriate return-types, dependant on `returnCount`; if `returnCount == 1`, the return-type is `string | null`, else it is `string[] | null`

---

## `bestObjMatchByKey` - getting the closest object in an array

Get the object(s) matching closest to a string for a given key, from an array of objects

### Signature

```typescript
bestObjMatchByKey<T extends object>(
    str: string,
    other: T[],
    key: keyof T,
    options?: {
        n?: number = 2,
        caseSensitive?: boolean = false,
        returnCount?: number = 1
    }
): string
```

### Usage

```typescript
import { bestObjMatchByKey } from "zurich";

const match1 = bestObjMatchByKey("dog", [{ animal: "dog" }], "animal"); // '{ animal: 'dog' }
const match2 = bestObjMatchByKey(
  "dog",
  [{ animal: "hog" }, { species: "dog" }],
  "animal"
); // '{ animal: 'hog' }
const match3 = bestObjMatchByKey(
  "dog",
  [{ thing: "log" }, { species: "dog" }],
  "animal"
); // null
```

**NB:** The `n`, `caseSensitive`, and `returnCount` options for `bestObjMatchByKey`, work the same as for `distance` and `bestMatch`
