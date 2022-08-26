import { users } from "../test-data";

export const filterBy_Tests = ({ filterBy }: { filterBy: Function }) => {
  describe("filterBy", () => {
    it("should return same array if no determinant is specified", () => {
      expect(filterBy(users)).toEqual(users);
    });

    it("should filter by object", () => {
      expect(filterBy(users, { name: "James" }).length).toBe(2);
      expect(filterBy(users, { age: 10, name: "James" }).length).toBe(1);
      expect(
        filterBy(users, { "bio.facebook.displayName": "james-1" }).length
      ).toBe(1);
      expect(
        filterBy(users, {
          id: 1,
          age: 10,
          "bio.facebook.displayName": "james-1",
        }).length
      ).toBe(1);
    });

    it("should filter by function (exclude option should be ignored here)", () => {
      expect(filterBy(users, (dt: any) => dt.id === 2).length).toBe(1);
      expect(
        filterBy(users, (dt: any) => dt.id === 2, { exclude: true }).length
      ).toBe(1);
      expect(filterBy(users, (dt: any) => dt.id !== 2).length).toBe(3);
      expect(filterBy(users, (dt: any) => dt.id === 1).length).toBe(2);
    });

    it("should filter by array of [key, value]", () => {
      expect(filterBy(users, ["name", "James"]).length).toBe(2);
      expect(
        filterBy(users, ["bio.facebook.displayName", "james-2"]).length
      ).toBe(1);
      expect(
        filterBy(users, ["bio.facebook.displayName", "james-2"], {
          exclude: true,
        }).length
      ).toBe(3);
    });

    it("should respect the exclude option ", () => {
      expect(
        filterBy(users, { age: 10, name: "James" }, { exclude: true }).length
      ).toBe(3);
    });
  });
};
