export const capitalise_Tests = ({ capitalise }: { capitalise: Function }) => {
  describe("capitalize", () => {
    it("should return a string in capital leters", () => {
      expect(capitalise("a")).toBe("A");
      expect(capitalise("a doG")).toBe("A Dog");
      expect(capitalise("a-doG")).toBe("A-dog");
    });
  });
};

export const isEqual_Tests = ({ isEqual }: { isEqual: Function }) => {
  describe("Is Equal", () => {
    it("should return true if a and b are equal else false", () => {
      // truthy
      expect(isEqual(1, 1)).toEqual(true);
      expect(isEqual({}, {})).toEqual(true);
      expect(isEqual([], [])).toEqual(true);
      expect(isEqual([1, "true", [], null], [1, "true", [], null])).toEqual(
        true
      );
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
};

export const useIf_Tests = ({ useIf }: { useIf: Function }) => {
  describe("useIf", () => {
    it("should return a string in capital leters", () => {
      expect(useIf(1, 0)).toBe(1);
      expect(useIf(false, undefined)).toBe(false);
      expect(useIf("It is NaN", "-", isNaN)).toBe("It is NaN");
    });
  });
};
