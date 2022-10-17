import { bestMatch } from "..";

describe("The 'bestMatch' function with bigrams", () => {
  it("correctly returns null to with an empty input string", () => {
    const match = bestMatch("", ["dog", "parrot", "otter"]);
    expect(match).toEqual(null);
  });

  it("correctly returns null to an empty input array", () => {
    const match = bestMatch("dog", []);
    expect(match).toEqual(null);
  });

  it("correctly returns the closest match with only one valid options", () => {
    const match = bestMatch("dog", ["dog"]);
    expect(match).toEqual("dog");
  });

  it("correctly returns the closest match with multiple valid matches", () => {
    const match = bestMatch("dog", ["zebras", "hedgehog", "warthog"]);
    expect(match).toEqual("warthog");
  });

  it("correctly returns the first of equally close matches", () => {
    const match = bestMatch("dog", ["zog", "hog", "bog"]);
    expect(match).toEqual("zog");
  });

  it("correctly returns the only valid case-sensitive match", () => {
    const match = bestMatch("HOG", ["zebras", "hedgehog", "wartHOG"], {
      caseSensitive: true,
    });
    expect(match).toEqual("wartHOG");
  });

  it("correctly returns the closest case-sensitive match", () => {
    const match = bestMatch("DOG", ["zog", "HOG", "bog"], {
      caseSensitive: true,
    });
    expect(match).toEqual("HOG");
  });
});

describe("The 'bestMatch' function with trigrams", () => {
  it("correctly returns null when the input string is empty", () => {
    const match = bestMatch("", ["dog", "parrot", "otter"], { n: 3 });
    expect(match).toEqual(null);
  });

  it("correctly returns null, when the input array is empty", () => {
    const match = bestMatch("dog", [], { n: 3 });
    expect(match).toEqual(null);
  });

  it("correctly returns null, when there is no valid match", () => {
    const match = bestMatch("dog", ["zog", "hog", "bog"], { n: 3 });
    expect(match).toEqual(null);
  });

  it("correctly returns the closest match when there is one valid match", () => {
    const match = bestMatch("dog", ["dog"], { n: 3 });
    expect(match).toEqual("dog");
  });

  it("correctly returns the first, closest match with multiple valid matches", () => {
    const match = bestMatch("hog", ["zebras", "hedgehogs", "hedgehogz"], {
      n: 3,
    });
    expect(match).toEqual("hedgehogs");
  });

  it("correctly returns the first, closest match with multiple matches", () => {
    const match = bestMatch("tigers", ["liger", "tiger", "tigers"], {
      n: 3,
    });
    expect(match).toEqual("tigers");
  });

  it("correctly returns the closest case-sensitive match", () => {
    const match = bestMatch("DOG", ["dog", "DOG"], {
      n: 3,
      caseSensitive: true,
    });
    expect(match).toEqual("DOG");
  });
});

describe("The 'bestMatch' function with multiple items returned", () => {
  it("correctly returns null, when the input string is empty", () => {
    const match = bestMatch("", ["dog", "parrot", "otter"], {
      returnCount: 2,
    });
    expect(match).toEqual(null);
  });

  it("correctly returns null, when matching 'dog', in []", () => {
    const match = bestMatch("dog", [], { returnCount: 2 });
    expect(match).toEqual(null);
  });

  it("correctly returns a single closest match when there is only one valid match", () => {
    const match = bestMatch("dog", ["dog"], { returnCount: 2 });
    expect(match).toEqual(["dog"]);
  });

  it("correctly returns a limited set of ordered closest matches with multiple valid matches", () => {
    const match = bestMatch("dog", ["bog", "dog", "log"], { returnCount: 2 });
    expect(match).toEqual(["dog", "bog"]);
  });

  it("correctly returns only a limited set of ordered closest matches", () => {
    const match = bestMatch("dog", ["bog", "dog", "log"], { returnCount: 5 });
    expect(match).toEqual(["dog", "bog", "log"]);
  });
});
