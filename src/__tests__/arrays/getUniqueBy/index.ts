export const getUnique_Tests = ({ getUnique }: { getUnique: Function }) => {
  describe("getUnique", () => {
    it("should return an array of unique values", () => {
      const values = [
        11,
        1,
        { name: "James" },
        { name: "Mary" },
        2,
        { name: "James" },
        1,
      ];

      expect(getUnique([]).length).toBe(0);
      expect(getUnique(values).length).toBe(5);
    });
  });
};

export const getUniqueBy_Tests = ({
  getUniqueBy,
}: {
  getUniqueBy: Function;
}) => {
  describe("getUniqueBy", () => {
    it("should return an array of unique values without a key", () => {
      const values = [
        11,
        1,
        { name: "James" },
        { name: "Mary" },
        2,
        { name: "James" },
        1,
      ];

      expect(getUniqueBy([]).length).toBe(0);
      expect(getUniqueBy(values).length).toBe(5);
    });

    it("should return an array of unique values with a key", () => {
      const values = [{ name: "James" }, { name: "Mary" }, { name: "James" }];

      expect(getUniqueBy(values, "name").length).toBe(2);
      expect(getUniqueBy(values, "age").length).toBe(1);
    });

    it("should respect the backwards option", () => {
      const values = [1, 2, 4, 74, 40, -34, 0, 10];

      expect(getUniqueBy(values, undefined, { backwards: true })).toEqual(
        [...values].reverse()
      );
    });
  });
};

export const serialize_Tests = ({ serialize }: { serialize: Function }) => {
  describe("serialize", () => {
    it("should convert values to json strings", () => {
      const truthy = [
        ["1", '"1"'],
        [1, "1"],
        [{}, "{}"],
        [[], "[]"],
      ];

      for (const [key, value] of truthy) {
        expect(serialize(key)).toBe(value);
      }
    });

    it("should convert json values their original types", () => {
      const truthy = [
        ['"1"', "1"],
        ["1", 1],
      ];

      for (const [key, value] of truthy) {
        expect(serialize(key, true)).toBe(value);
      }
    });

    it("should not serialize nor deserialise undefined", () => {
      expect(serialize(undefined)).toBe(serialize(undefined, true));
    });
  });
};
