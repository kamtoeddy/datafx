export const assignDeep_Tests = ({ assignDeep }: { assignDeep: Function }) => {
  describe("assignDeep", () => {
    it("should assign a value to a simple key", () => {
      expect(assignDeep({}, { key: "name", value: "James" })).toEqual({
        name: "James",
      });

      expect(
        assignDeep({ age: 17, name: "Paul" }, { key: "name", value: "James" })
      ).toEqual({ age: 17, name: "James" });
    });

    it("should assign a value to a nested key", () => {
      let dt = assignDeep(
        {},
        { key: "bio.facebook.displayName", value: "james-1" }
      );
      assignDeep(dt, { key: "bio.facebook.followers", value: "12.7k" });

      expect(dt).toEqual({
        bio: { facebook: { displayName: "james-1", followers: "12.7k" } },
      });

      let dt2 = assignDeep(
        { name: "James" },
        { key: "bio.facebook.displayName", value: "james-1" }
      );
      assignDeep(dt2, { key: "bio.facebook.followers", value: "13.7k" });

      expect(dt2).toEqual({
        name: "James",
        bio: { facebook: { displayName: "james-1", followers: "13.7k" } },
      });
    });
  });
};

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

export const getSubObject_Tests = ({
  getSubObject,
}: {
  getSubObject: Function;
}) => {
  const user = {
    id: 1,
    name: "James",
    age: 10,
    bio: {
      facebook: {
        displayName: "james-1",
        followers: 0,
        link: "/facebook/james",
      },
    },
  };

  describe("getSubObject", () => {
    it("should return a sub version of an object with properties requested", () => {
      const values = [
        ["name", { name: "James" }],
        [["name"], { name: "James" }],
        [["age", "name"], { age: 10, name: "James" }],
      ];

      for (const [det, value] of values)
        expect(getSubObject(user, det)).toEqual(value);
    });

    it("should return a sub version of an object with nested properties requested", () => {
      const values = [
        [
          "bio.facebook",
          {
            displayName: "james-1",
            followers: 0,
            link: "/facebook/james",
          },
        ],
        // [["name"], { name: "James" }],
        // [["age", "name"], { age: 10, name: "James" }],
      ];

      // for (const [det, value] of values)
      //   expect(getSubObject(user, det)).toEqual(value);
    });
  });
};
