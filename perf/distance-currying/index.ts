import { benchmarks } from "./benchmarks";
import rawData from "./data.json";

const data = Object.keys(rawData);

function singleWord() {
  const baseName = `currying-single-word`;
  const queryIndex = Math.floor(Math.random() * (data.length + 1)); // TODO FIX
  const query = data[queryIndex];
  const otherIndex = Math.floor(Math.random() * (data.length + 1)); // TODO FIX (might overflow)
  const otherQuery = data[otherIndex];

  benchmarks({ baseName, query, otherQuery, data });
}

function multipleWords(n: number) {
  const baseName = `currying-single-word`;
  const queryIndices: number[] = Array.from(Array(n)).map((_) =>
    Math.floor(Math.random() * (data.length + 1))
  );
  const query = queryIndices.map((i) => data[i]).join("-");
  const otherIndex = Math.floor(Math.random() * (data.length + 1));
  const otherQuery = data[otherIndex];

  benchmarks({ baseName, query, otherQuery, data });
}

singleWord();
singleWord();

multipleWords(5);
multipleWords(10);
