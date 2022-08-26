import { users } from "../test-data";

export const countBy_Tests = ({ countBy }: { countBy: Function }) => {
  describe("countBy", () => {
    it("should return an empty array if no list is provided", () => {
      expect(countBy()).toMatchObject([]);
    });

    it("should count with any type", () => {
      const counted = countBy([
        null,
        "a",
        null,
        1,
        2,
        1,
        "a",
        null,
        undefined,
        null,
      ]);

      expect(counted).toMatchObject({
        null: 4,
        a: 2,
        1: 2,
        2: 1,
        undefined: 1,
      });
    });

    it("should count objects by properties", () => {
      const counted = countBy(users, "name");

      expect(counted).toMatchObject({ James: 2, Mary: 1, Peter: 1 });
    });

    it("should count objects by nested properties", () => {
      const counted = countBy(users, "bio.facebook.link");

      expect(counted).toMatchObject({
        "/facebook/james": 2,
        "/facebook/mary": 1,
        "/facebook/peter": 1,
      });
    });
  });
};
