import b from "benny";
import { distance } from "./implementations/base";
import { distance as distanceWithCurrying } from "./implementations/withCurrying";

export function benchmarks({
  baseName,
  query,
  otherQuery,
  data,
}: {
  baseName: string;
  query: string;
  otherQuery: string;
  data: string[];
}) {
  const folder = `${__dirname}/result`;

  const name = `${baseName}-${query}`;

  // Single call
  b.suite(
    name,

    b.add("base distance", () => {
      distance(query, otherQuery);
    }),

    b.add("distance with currying, uncurried", () => {
      distanceWithCurrying(query, otherQuery);
    }),

    b.add("distance with currying, curried", () => {
      distanceWithCurrying(query)(otherQuery);
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: name, version: "1.0.0", folder })
  );

  // 100 iterations
  const hundredIterationsName = `${name}-100-iterations`;
  b.suite(
    hundredIterationsName,

    b.add("base distance", () => {
      data.slice(0, 100).forEach((str) => distance(query, str));
    }),

    b.add("distance with currying, uncurried", () => {
      data.slice(0, 100).forEach((str) => distanceWithCurrying(query, str));
    }),

    b.add("distance with currying, curried", () => {
      const curried = distanceWithCurrying(query);
      data.slice(0, 100).forEach((str) => curried(str));
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: hundredIterationsName, version: "1.0.0", folder })
  );

  // All data
  const allDataName = `${name}-all-data`;
  b.suite(
    allDataName,

    b.add("base distance", () => {
      data.forEach((str) => distance(query, str));
    }),

    b.add("distance with currying, uncurried", () => {
      data.forEach((str) => distanceWithCurrying(query, str));
    }),

    b.add("distance with currying, curried", () => {
      const curried = distanceWithCurrying(query);
      data.forEach((str) => curried(str));
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: allDataName, version: "1.0.0", folder })
  );
}
