export const getDifference_Tests = ({
  getDifference,
}: {
  getDifference: Function;
}) => {
  const a = { name: "Joe" },
    b = { name: "Jo", age: 12 },
    c = { name: "Jo", age: 13 };

  describe("getDifference", () => {
    it("should give differenc btw 2 objects wrt their properties", () => {
      expect(getDifference(a, a)).toMatchObject({});
      expect(getDifference(a, b)).toMatchObject({ name: "Joe" });
      expect(getDifference(b, a)).toMatchObject({ name: "Jo", age: 12 });
      expect(getDifference(b, c)).toMatchObject({ age: 12 });
      expect(getDifference(c, b)).toMatchObject({ age: 13 });
    });
  });
};

export const getDeepValue_Tests = ({
  getDeepValue,
}: {
  getDeepValue: Function;
}) => {
  describe("getDeepValue", () => {
    let person: any;

    beforeAll(() => {
      person = {
        name: "James",
        age: 20,
        bio: {
          joinDate: "today",
          facebook: { link: "/facebook/james", likes: 1700 },
        },
      };
    });

    it("should give value with simple keys", () => {
      const truthy: [string, any][] = [
        ["name", "James"],
        ["age", 20],
      ];

      for (const [key, value] of truthy) {
        expect(getDeepValue(person, key)).toBe(value);
      }
    });

    it("should give value with nested keys", () => {
      const truthy: [string, any][] = [
        ["bio.joinDate", "today"],
        ["bio.facebook.link", "/facebook/james"],
        ["bio.facebook.likes", 1700],
      ];

      for (const [key, value] of truthy) {
        expect(getDeepValue(person, key)).toBe(value);
      }
    });

    it("should give undefined if simple key is not set", () => {
      expect(getDeepValue(person, "dob")).toBe(undefined);
    });

    it("should give undefined if nested key is not set", () => {
      expect(getDeepValue(person, "address.streetName")).toBe(undefined);
    });
  });
};

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
