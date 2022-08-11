import { add, isAfter, isBefore } from "../../dates";

describe("isAfter", () => {
  it("should tell if a date is after another", () => {
    expect(isAfter("06-07-2021", "05-07-2020")).toBe(true);
    expect(isAfter("06-07-2021", "07-07-2021")).toBe(false);

    console.log(add("08-10-2021 10:30:00", -1, "y"));

    expect(isAfter("07-08-2021", "07-07-2021")).toBe(true);
    expect(isAfter("12-08-2021", "12-07-2021", 23 * 60)).toBe(true);
    expect(isAfter("12-08-2021", "12-07-2021", 24 * 60)).toBe(false);
  });
});

describe("isBefore", () => {
  it("should tell if a date is before another", () => {
    expect(isBefore("06-07-2000", "06-07-2020")).toBe(true);
    expect(isBefore("05-07-2021", "05-07-2020")).toBe(false);
    expect(isBefore("05-08-2020", "05-07-2020")).toBe(false);
    expect(isBefore("05-07-2020", "05-07-1934")).toBe(false);
  });
});
