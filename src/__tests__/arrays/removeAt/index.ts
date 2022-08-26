export const removeAt_Tests = ({ removeAt }: { removeAt: Function }) => {
  describe("removeAt", () => {
    const arr = [1, 2, 3, 4, 5, -45];

    it("should remove items at specified indices", () => {
      const values = [
        [[...arr], 0, 1, [2, 3, 4, 5, -45]],
        [[...arr], 1, 3, [1, 5, -45]],
        [[...arr], 4, 5, [1, 2, 3, 4]],
      ];

      for (const [dt, start, count, result] of values) {
        const newArr = removeAt(dt, start, count);
        expect(Array.isArray(newArr)).toBe(true);
        expect(newArr).toEqual(result);
      }
    });
  });
};
