import { bestObjMatchByKey } from "..";

// These tests should mirror those in bestMatch.test.ts, and use `toEqual` instead of `toEqual`

describe("The 'bestObjMatchByKey' function with bigrams", () => {
  it(`correctly returns null when given an empty input string`, () => {
    const other = [
      { animal: "dog" },
      { animal: "parrot" },
      { animal: "otter" },
    ];
    const match = bestObjMatchByKey("", other, "animal");
    expect(match).toEqual(null);
  });

  it("correctly returns null to when given an empty input array", () => {
    const match = bestObjMatchByKey("dog", [], "animal");
    expect(match).toEqual(null);
  });

  it(`correctly returns the closest match to when given options with different keys`, () => {
    const match = bestObjMatchByKey(
      "dog",
      [{ species: "dog" }, { animal: "hog" }],
      "animal"
    );
    expect(match).toEqual({ animal: "hog" });
  });

  it("correctly returns the closest match", () => {
    const match = bestObjMatchByKey("dog", [{ animal: "dog" }], "animal");
    expect(match).toEqual({ animal: "dog" });
  });

  it(`correctly returns the closest match with multiple valid matches`, () => {
    const match = bestObjMatchByKey(
      "dog",
      [{ animal: "zebras" }, { animal: "hedgehog" }, { animal: "warthog" }],
      "animal"
    );
    expect(match).toEqual({ animal: "warthog" });
  });

  it("correctly returns the first of multiple equally valid matches", () => {
    const match = bestObjMatchByKey(
      "dog",
      [{ animal: "zog" }, { animal: "hog" }, { animal: "bog" }],
      "animal"
    );
    expect(match).toEqual({ animal: "zog" });
  });

  it(`correctly returns the closest case-sensitive match with multiple potential matches`, () => {
    const match = bestObjMatchByKey(
      "HOG",
      [{ animal: "zebras" }, { animal: "hedgehog" }, { animal: "wartHOG" }],
      "animal",
      {
        caseSensitive: true,
      }
    );
    expect(match).toEqual({ animal: "wartHOG" });
  });

  it(`correctly returns the closest case-sensitive match with multiple potential matches`, () => {
    const match = bestObjMatchByKey(
      "DOG",
      [{ animal: "zog" }, { animal: "HOG" }, { animal: "bog" }],
      "animal",
      {
        caseSensitive: true,
      }
    );
    expect(match).toEqual({ animal: "HOG" });
  });
});

describe("The 'bestObjMatchByKey' function with trigrams", () => {
  it(`correctly returns null, when matching an empty input string`, () => {
    const match = bestObjMatchByKey(
      "",
      [{ animal: "dog" }, { animal: "parrot" }, { animal: "otter" }],
      "animal",
      { n: 3 }
    );
    expect(match).toEqual(null);
  });

  it("correctly returns null, when matching an empty input array", () => {
    const match = bestObjMatchByKey("dog", [], "animal", { n: 3 });
    expect(match).toEqual(null);
  });

  it(`correctly returns null, when given an array of no valid matches`, () => {
    const match = bestObjMatchByKey(
      "dog",
      [{ animal: "zog" }, { animal: "hog" }, { animal: "bog" }],
      "animal",
      { n: 3 }
    );
    expect(match).toEqual(null);
  });

  it(`correctly returns the closest match when given a single valid match`, () => {
    const match = bestObjMatchByKey("dog", [{ animal: "dog" }], "animal", {
      n: 3,
    });
    expect(match).toEqual({ animal: "dog" });
  });

  it(`correctly returns the first, closest match with multiple valid matches`, () => {
    const match = bestObjMatchByKey(
      "hog",
      [{ animal: "zebras" }, { animal: "hedgehogs" }, { animal: "hedgehogz" }],
      "animal",
      {
        n: 3,
      }
    );
    expect(match).toEqual({ animal: "hedgehogs" });
  });

  it(`correctly returns the first, closest match with multiple valid matches`, () => {
    const match = bestObjMatchByKey(
      "tigers",
      [{ animal: "liger" }, { animal: "tiger" }, { animal: "tigers" }],
      "animal",
      {
        n: 3,
      }
    );
    expect(match).toEqual({ animal: "tigers" });
  });

  it(`correctly returns the closest case-sensitive match`, () => {
    const match = bestObjMatchByKey(
      "DOG",
      [{ animal: "dog" }, { animal: "DOG" }],
      "animal",
      {
        n: 3,
        caseSensitive: true,
      }
    );
    expect(match).toEqual({ animal: "DOG" });
  });
});

describe("The 'bestObjMatchByKey' function with multiple items returned", () => {
  it(`correctly returns null when given an empty input string`, () => {
    const match = bestObjMatchByKey(
      "",
      [{ animal: "dog" }, { animal: "parrot" }, { animal: "otter" }],
      "animal",
      {
        returnCount: 2,
      }
    );
    expect(match).toEqual(null);
  });

  it("correctly returns null, when given an empty input array", () => {
    const match = bestObjMatchByKey("dog", [], "animal", { returnCount: 2 });
    expect(match).toEqual(null);
  });

  it("correctly returns the closest match with a single valid match", () => {
    const match = bestObjMatchByKey("dog", [{ animal: "dog" }], "animal", {
      returnCount: 2,
    });
    expect(match).toEqual([{ animal: "dog" }]);
  });

  it("correctly returns the ordered closest matches", () => {
    const match = bestObjMatchByKey(
      "dog",
      [{ animal: "bog" }, { animal: "dog" }, { animal: "log" }],
      "animal",
      {
        returnCount: 2,
      }
    );
    expect(match).toEqual([{ animal: "dog" }, { animal: "bog" }]);
  });

  it("correctly returns only a limited ordered set of closest matches when there are fewer valid matches than `returnCount`", () => {
    const match = bestObjMatchByKey(
      "dog",
      [{ animal: "bog" }, { animal: "dog" }, { animal: "log" }],
      "animal",
      {
        returnCount: 5,
      }
    );
    expect(match).toEqual([
      { animal: "dog" },
      { animal: "bog" },
      { animal: "log" },
    ]);
  });
});
