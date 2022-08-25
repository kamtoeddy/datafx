export const getItemsAt_Tests = ({ getItemsAt }: { getItemsAt: Function }) => {
  describe("getItemsAt", () => {
    it("should always return an array", () => {
      const startEnd = [[], [0, 1], [4, 5]];

      for (const [start, end] of startEnd)
        expect(Array.isArray(getItemsAt([], start, end))).toBe(true);
    });

    it("should return original array if no start nor end", () => {
      const values = getItemsAt([1, 2, 56, -2]);
      expect(values).toEqual(values);
    });

    it("should return desired values", () => {
      const values = [1, 2, 56, -2];
      expect(getItemsAt(values, 1)).toEqual([2, 56, -2]);
      expect(getItemsAt(values, 1, 2)).toEqual([2, 56]);
      expect(getItemsAt(values, 1, 3)).toEqual([2, 56, -2]);
      expect(getItemsAt(values, 1, -3)).toEqual([2]);
      expect(getItemsAt(values, 1, -2)).toEqual([2, 56]);
    });
  });
};
