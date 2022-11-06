import b from "benny";
import { bestMatch } from "./implementations/base";
import { bestMatch as bestMatchBucketSort } from "./implementations/withBucketSort";
import { bestMatch as bestMatchBucketSortArray } from "./implementations/withArrayBucketSort";
import rawData from "./data.json";
import { pickRandomFrom } from "../utils/pickRandomFrom";

const data = Object.keys(rawData);
const data100 = pickRandomFrom(data, 100);
const data1000 = pickRandomFrom(data, 1000);

const query = pickRandomFrom(data)[0];

const name = `best-match-bucket-sort-${query}`;

b.suite(
  name,

  b.add("base bestMatch", () => {
    bestMatch(query, data100);
  }),

  b.add("bucket sort bestMatch", () => {
    bestMatchBucketSort(query, data100);
  }),

  b.add("bucket sort (array) bestMatch", () => {
    bestMatchBucketSortArray(query, data100);
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: name, version: "1.0.0", folder: `${__dirname}/result` })
);

b.suite(
  `${name}-100-return-100`,

  b.add("base bestMatch, all items", () => {
    bestMatch(query, data100, { returnCount: 100 });
  }),

  b.add("bucket sort bestMatch, all items", () => {
    bestMatchBucketSort(query, data100, { returnCount: 100 });
  }),

  b.add("bucket sort (array) bestMatch", () => {
    bestMatchBucketSortArray(query, data100, { returnCount: 100 });
  }),

  b.cycle(),
  b.complete(),
  b.save({
    file: `${name}-100-return-100`,
    version: "1.0.0",
    folder: `${__dirname}/result`,
  })
);

b.suite(
  `${name}-1000-return-1000`,

  b.add("base bestMatch, all items", () => {
    bestMatch(query, data1000, { returnCount: 1000 });
  }),

  b.add("bucket sort bestMatch, all items", () => {
    bestMatchBucketSort(query, data1000, { returnCount: 1000 });
  }),

  b.add("bucket sort (array) bestMatch", () => {
    bestMatchBucketSortArray(query, data1000, { returnCount: 1000 });
  }),

  b.cycle(),
  b.complete(),
  b.save({
    file: `${name}-1000-return-1000`,
    version: "1.0.0",
    folder: `${__dirname}/result`,
  })
);
