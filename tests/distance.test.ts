import { distance } from "..";

describe("The 'distance' function with bigrams", () => {
  it("correctly identifies the distance between the same string", () => {
    const d = distance("dog", "dog");
    expect(d).toBe(0);
  });

  it("correctly identifies the same case-insensitive distance between the same string", () => {
    const sameCaseDistance = distance("dog", "dog");
    const differentCaseDistance = distance("dog", "DOG");
    expect(sameCaseDistance).toBe(differentCaseDistance);
  });

  it("correctly identifies the distance between slightly different strings", () => {
    const d = distance("dog", "dogs");
    expect(d).toBe(0.33333333333333337);
  });

  it("correctly identifies the distance between semi-different strings", () => {
    const d = distance("toad", "road");
    expect(d).toBe(0.5);
  });

  it("correctly identifies the same case-insensitive distance two sets of the same strings", () => {
    const sameCaseDistance = distance("toad", "road");
    const differenceCaseDistance = distance("toad", "ROAD");
    expect(sameCaseDistance).toBe(differenceCaseDistance);
  });

  it("correctly identifies the distance between somewhat similar strings", () => {
    const d = distance("dog", "bog");
    expect(d).toBe(0.6666666666666667);
  });

  it("correctly identifies the distance between dissimilar strings", () => {
    const d = distance("jaguar", "februar");
    expect(d).toBe(0.7777777777777778);
  });

  it("correctly identifies the distance between completely different strings (no common bigrams)", () => {
    const d = distance("dog", "monkey");
    expect(d).toBe(1);
  });

  it("correctly identifies the distance between a string and a > 2 length string (no common bigrams)", () => {
    const d = distance("dog", "d");
    expect(d).toBe(1);
  });

  it("correctly identifies the case-sensitive distance between two strings (no common bigrams)", () => {
    const d = distance("jaguar", "FEBRUAR", { caseSensitive: true });
    expect(d).toBe(1);
  });
});

describe("The 'distance' function with trigrams", () => {
  it("correctly identifies the case-insensitive distance between the same string", () => {
    const d = distance("dog", "dog", { n: 3 });
    expect(d).toBe(0);
  });

  it("correctly identifies the same case-insensitive distance between two sets of the same string", () => {
    const sameCaseDistance = distance("dog", "dog", { n: 3 });
    const differentCaseDistance = distance("dog", "DOG", { n: 3 });
    expect(sameCaseDistance).toBe(differentCaseDistance);
  });

  it("correctly identifies the distance between semi-different strings", () => {
    const d = distance("dog", "dogs", { n: 3 });
    expect(d).toBe(0.5);
  });

  it("correctly identifies the distance between fairly different strings", () => {
    const d = distance("toad", "road", { n: 3 });
    expect(d).toBe(0.6666666666666667);
  });

  it("correctly identifies the distance between dissimilar strings", () => {
    const d = distance("dog", "bog", { n: 3 });
    expect(d).toBe(1);
  });

  it("correctly identifies the distance between fairly dissimilar strings", () => {
    const d = distance("jaguar", "februar", { n: 3 });
    expect(d).toBe(0.875);
  });

  it("correctly identifies the distance between dissimilar (no common trigrams)", () => {
    const d = distance("dog", "monkey", { n: 3 });
    expect(d).toBe(1);
  });

  it("correctly identifies the distance between dissimilar strings (no common trigrams)", () => {
    const d = distance("dog", "do", { n: 3 });
    expect(d).toBe(1);
  });

  it("correctly identifies the case-sensitive distance fairly dissimilar strings (no common trigrams)", () => {
    const d = distance("jaguar", "FEBRUAR", { n: 3, caseSensitive: true });
    expect(d).toBe(1);
  });
});
