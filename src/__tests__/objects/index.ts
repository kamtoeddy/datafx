export const assignDeep_Tests = ({ assignDeep }: { assignDeep: Function }) => {
  describe("assignDeep", () => {
    it("should do nothing with empty key", () => {
      const values = [{}, { age: 17 }];

      for (const value of values)
        expect(assignDeep(value, "", "James")).toEqual(value);
    });

    it("should assign a value by simple key", () => {
      expect(assignDeep({}, "name", "James")).toEqual({
        name: "James",
      });

      expect(assignDeep({ age: 17, name: "Paul" }, "name", "James")).toEqual({
        age: 17,
        name: "James",
      });
    });

    it("should assign a value by nested key", () => {
      let dt = assignDeep({}, "bio.facebook.displayName", "james-1");

      assignDeep(dt, "bio.facebook.followers", "12.7k");

      expect(dt).toEqual({
        bio: { facebook: { displayName: "james-1", followers: "12.7k" } },
      });

      let dt2 = assignDeep(
        { name: "James" },
        "bio.facebook.displayName",
        "james-1"
      );
      assignDeep(dt2, "bio.facebook.followers", "13.7k");

      expect(dt2).toEqual({
        name: "James",
        bio: { facebook: { displayName: "james-1", followers: "13.7k" } },
      });
    });
  });
};

export const getDeepValue_Tests = ({
  getDeepValue,
}: {
  getDeepValue: Function;
}) => {
  describe("getDeepValue", () => {
    let person = {
      name: "James",
      age: 20,
      bio: {
        joinDate: "today",
        facebook: { link: "/facebook/james", likes: 1700 },
      },
    };

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
        followers: 200,
        link: "/facebook/james",
      },
      instagram: {
        displayName: "jamezz",
        followers: 500,
        link: "/instagram/jamezz",
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
          "bio.facebook.displayName",
          { bio: { facebook: { displayName: "james-1" } } },
        ],
        ["bio.facebook", { bio: { facebook: user.bio.facebook } }],
        ["bio", { bio: user.bio }],
      ];

      for (const [det, value] of values)
        expect(getSubObject(user, det)).toEqual(value);
    });
  });
};

export const hasDeepKey_Tests = ({ hasDeepKey }: { hasDeepKey: Function }) => {
  describe("hasDeepKey", () => {
    const user = {
      name: "James",
      bio: {
        facebook: { displayName: "james-1" },
        twitter: { followers: "25k" },
      },
    };

    it("should tell if an object has simple key", () => {
      expect(hasDeepKey(user, "name")).toBe(true);
      expect(hasDeepKey(user, "age")).toBe(false);
    });

    it("should tell if an object has nested key", () => {
      const values = [
        ["address.street.name", false],
        ["address.street", false],
        ["bio.facebook", true],
        ["bio.facebook.displayName", true],
        ["bio.twitter.followers", true],
        ["bio.twitter.displayName", false],
      ];

      for (const [key, value] of values)
        expect(hasDeepKey(user, key)).toBe(value);
    });
  });
};

export const removeDeep_Tests = ({ removeDeep }: { removeDeep: Function }) => {
  describe("removeDeep", () => {
    let user: any;

    beforeEach(() => {
      user = {
        name: "James",
        bio: {
          facebook: { displayName: "james-1" },
          twitter: { followers: "25k" },
        },
      };
    });

    it("should do nothing with empty key", () => {
      const values = [{}, { age: 17 }];

      for (const value of values) expect(removeDeep(value, "")).toEqual(value);
    });

    it("should not modify object if key is missing", () => {
      removeDeep(user, "age");
      removeDeep(user, "bio.instagram");
      expect(user).toMatchObject(user);
    });

    it("should remove a simple key", () => {
      removeDeep(user, "age");
      expect(user).toMatchObject(user);
      expect(user).toMatchObject({
        bio: {
          facebook: { displayName: "james-1" },
          twitter: { followers: "25k" },
        },
      });
    });

    it("should remove a nested key", () => {
      removeDeep(user, "bio.facebook.displayName");
      removeDeep(user, "bio.twitter");
      expect(user).toMatchObject({ bio: { facebook: {} } });
    });
  });
};
