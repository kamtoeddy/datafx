import { capitalise, isEqual, useIfFalsy } from "../utils";

describe("Capitalize", () => {
  it("should return a string in capital leters", () => {
    expect(capitalise("a")).toBe("A");
    expect(capitalise("a doG")).toBe("A Dog");
    expect(capitalise("a-doG")).toBe("A-dog");
  });
});

describe("Is Equal", () => {
  it("should return true if a and b are equal else false", () => {
    // truthy
    expect(isEqual(1, 1)).toEqual(true);
    expect(isEqual({}, {})).toEqual(true);
    expect(isEqual([], [])).toEqual(true);
    expect(isEqual([1, "true", [], null], [1, "true", [], null])).toEqual(true);
    expect(isEqual({ name: "James" }, { name: "James" })).toEqual(true);

    // falsy
    expect(isEqual(1, "1")).toEqual(false);
    expect(isEqual({}, "1")).toEqual(false);
    expect(isEqual([1, "true", []], [1, "true", "[]"])).toEqual(false);
    expect(isEqual([1, "true", [], null], [1, "true", null, []])).toEqual(
      false
    );
    expect(isEqual({ name: "James" }, { name: "JameS" })).toEqual(false);
    expect(isEqual({ name: "James" }, { name: "James", age: 17 })).toEqual(
      false
    );
  });
});

describe("Use if falsy", () => {
  it("should return a string in capital leters", () => {
    expect(useIfFalsy(1, 0)).toBe(1);
    expect(useIfFalsy(false, undefined)).toBe(false);
    expect(useIfFalsy("It is NaN", "-", isNaN)).toBe("It is NaN");
  });
});
