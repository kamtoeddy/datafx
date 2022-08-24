const a = { name: "Joe" },
  b = { name: "Jo", age: 12 },
  c = { name: "Jo", age: 13 };

export const getDifference_Tests = ({
  getDifference,
}: {
  getDifference: Function;
}) => {
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
