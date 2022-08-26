import { users } from "../test-data";

export const findBy_Tests = ({ findBy }: { findBy: Function }) => {
  describe("findBy", () => {
    it("should find with an object determinant", () => {
      const determinants = [{ age: 10 }, { id: 1 }, { name: "James" }];
      for (const determinant of determinants)
        expect(findBy(users, determinant)).toMatchObject(users[0]);

      expect(findBy(users, { age: 11, id: 2, name: "Mary" })).toMatchObject(
        users[1]
      );
    });

    // it("should find with an object determinant with nested keys", () => {
    //   const determinants = [
    //     {"bio.facebook.displayName": "mary-jane"},
    //     { age: 10, "bio.facebook.displayName": "mary-jane" },
    //   ];

    //   for (const determinant of determinants)
    //     expect(findBy(users, determinant)).toMatchObject(users[1]);
    // });

    it("should find with an array determinant", () => {
      const determinants = [
        ["age", 11],
        ["id", 2],
        ["name", "Mary"],
        ["bio.facebook.displayName", "mary-jane"],
      ];

      for (const determinant of determinants)
        expect(findBy(users, determinant)).toMatchObject(users[1]);
    });
  });
};
