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
