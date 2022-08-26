import { users } from "../test-data";

export const groupBy_Tests = ({ groupBy }: { groupBy: Function }) => {
  describe("groupBy", () => {
    it("should return an empty object with no array", () => {
      expect(groupBy()).toMatchObject({});
    });

    it("should group with a string property", () => {
      const groupedByName = groupBy(users, "name");

      expect(groupedByName).toMatchObject({});

      expect(groupedByName["James"].length).toBe(2);
      expect(groupedByName["Mary"].length).toBe(1);
      expect(groupedByName["Peter"].length).toBe(1);
    });

    it("should group with a numeric property", () => {
      const groupedByName = groupBy(users, "age");

      expect(groupedByName).toMatchObject({});

      expect(groupedByName[10].length).toBe(1);
      expect(groupedByName[11].length).toBe(1);
      expect(groupedByName[15].length).toBe(2);
    });

    it("should group with a nested property", () => {
      const groupedByName = groupBy(users, "bio.facebook.displayName");

      expect(groupedByName).toMatchObject({});

      expect(groupedByName["james-1"].length).toBe(1);
      expect(groupedByName["james-2"].length).toBe(1);
      expect(groupedByName["mary-jane"].length).toBe(1);
      expect(groupedByName["mr_p"].length).toBe(1);
    });

    it("should group with a function", () => {
      const byFx = groupBy([6.1, 4.2, 6.3], Math.floor);
      // { '4': [4.2], '6': [6.1, 6.3] }

      expect(byFx).toMatchObject({});

      expect(byFx["4"].length).toBe(1);
      expect(byFx["6"].length).toBe(2);
    });

    it("should group strings by length", () => {
      const byLength = groupBy(["one", "two", "three"], "length");

      expect(byLength).toMatchObject({});

      expect(byLength[3].length).toBe(2);
      expect(byLength[5].length).toBe(1);
    });
  });
};
