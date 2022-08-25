import { users } from "../test-data";

export const getListOf_Tests = ({ getListOf }: { getListOf: Function }) => {
  describe("getListOf", () => {
    it("should list by a property", () => {
      const listOfNames: string[] = getListOf(users, "name");

      expect(listOfNames.length).toBe(4);
    });

    it("should list with unique values", () => {
      const listOfUniqueNames = getListOf(users, "name", { unique: true });

      expect(listOfUniqueNames.length).toBe(3);
    });

    it("should list with values other than objects", () => {
      const listOfUniqueNames = getListOf(
        ["one", "three", "five", "seven"],
        "length"
      );

      expect(listOfUniqueNames.length).toBe(4);
      expect(listOfUniqueNames[0]).toBe(3);
      expect(listOfUniqueNames[1]).toBe(5);
      expect(listOfUniqueNames[2]).toBe(4);
      expect(listOfUniqueNames[3]).toBe(5);
    });
  });
};
