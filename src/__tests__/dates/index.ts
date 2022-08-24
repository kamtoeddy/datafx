export const isAfter_Tests = ({ isAfter }: { isAfter: Function }) => {
  describe("isAfter", () => {
    it("should tell if a date is after another", () => {
      expect(isAfter("06-07-2021", "05-07-2020")).toBe(true);
      expect(isAfter("06-07-2021", "07-07-2021")).toBe(false);

      expect(isAfter("07-08-2021", "07-07-2021")).toBe(true);
      expect(isAfter("12-08-2021", "12-07-2021", 23, "m")).toBe(true);
      expect(isAfter("12-08-2021", "12-07-2021", 24, "m")).toBe(true);
      expect(isAfter("12-08-2021", "12-07-2021", 23, "h")).toBe(true);
      expect(isAfter("12-08-2021", "12-07-2021", [23, "h"], [5, "m"])).toBe(
        true
      );
      expect(isAfter("12-08-2021", "12-07-2021", [23, "h"], [60, "m"])).toBe(
        false
      );
      expect(isAfter("12-08-2021", "12-07-2021", 24, "h")).toBe(false);
    });
  });
};

export const isBefore_Tests = ({ isBefore }: { isBefore: Function }) => {
  describe("isBefore", () => {
    it("should tell if a date is before another", () => {
      expect(isBefore("06-07-2000", "06-07-2020")).toBe(true);
      expect(isBefore("05-07-2021", "05-07-2020")).toBe(false);
      expect(isBefore("05-08-2020", "05-07-2020")).toBe(false);
      expect(isBefore("05-07-2020", "05-07-1934")).toBe(false);
    });
  });
};
