# Zurich 🏔

<a href="https://bundlephobia.com/package/zurich" alt="Bundlephobia">
        <img src="https://badgen.net/bundlephobia/minzip/zurich@1.0.2" /></a>
<a href="https://bundlephobia.com/package/zurich" alt="Bundlephobia">
        <img src="https://badgen.net/bundlephobia/dependency-count/zurich@1.0.2" /></a>
<a href="https://bundlephobia.com/package/zurich" alt="Bundlephobia">
        <img src="https://badgen.net/bundlephobia/tree-shaking/zurich@1.0.2" /></a>

> [Jaccard Index](https://en.wikipedia.org/wiki/Jaccard_index)-based string distance TS library, for fuzzy search and more.<br/>
> Simple API, precise, helpful types.

---

<br/>

## Installation

Using `npm`:

```bash
npm i zurich
```

---

<br/>

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

#### Case sensitive

Take casing into account when calculating distance, by setting `{ caseSensitive: true }` in options

```typescript
const d1 = distance("dog", "dog", { caseSensitive: true }); // 0
const d2 = distance("dog", "DOG", { caseSensitive: true }); // 1
```

---

<br/>

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
): (string | null) | (string[] | null)
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

Return an ordered array of closest matches. The return type of `bestMatch` adapts to `returnCount`; `returnCount == 1` returns a `string`, `returnCount > 1` returns `string[]`.

```typescript
const match1 = bestMatch("dog", ["zog", "hog", "dog"], { returnCount: 2 }); // ['dog', 'zog']
const match2 = bestMatch("dog", ["zog", "hog", "dog"], { returnCount: 5 }); // ['dog', 'zog', 'hog']
const match3 = bestMatch("dog", ["zog", "hog", "dog"], { returnCount: 2 }); // ['dog']
```

---

<br/>

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
): (T | null) | (T[] | null)
```

### Usage

The `n`, `caseSensitive`, and `returnCount` options for `bestObjMatchByKey`, work the same as for `distance` and `bestMatch`

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

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
