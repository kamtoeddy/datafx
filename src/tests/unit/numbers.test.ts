import { getOrdinalPosition } from "../../numbers";

describe("Ordinal Position", () => {
  it("should return the ordinal position of any number", () => {
    // truthy
    expect(getOrdinalPosition(1)).toBe("st");
    expect(getOrdinalPosition(11)).toBe("th");
    expect(getOrdinalPosition(21)).toBe("st");
    expect(getOrdinalPosition(2)).toBe("nd");
    expect(getOrdinalPosition(12)).toBe("th");
    expect(getOrdinalPosition(22)).toBe("nd");
    expect(getOrdinalPosition(3)).toBe("rd");
    expect(getOrdinalPosition(13)).toBe("th");
    expect(getOrdinalPosition(23)).toBe("rd");

    // falsy
    expect(getOrdinalPosition(NaN)).toBe("");
    expect(getOrdinalPosition(parseInt("hahaha"))).toBe("");
  });
});
