import { sortBy } from "../../arrays";

const arrays = [
  [11, 4, 6, 3, 7],
  ["2", "4t", "hey"],
  [{ name: "James" }, { name: "Mary" }, { name: "Bob" }, { name: "Doe" }],
];

type Person = {
  name: string;
};

const sortPersonsByName = (a: Person, b: Person) => (a.name < b.name ? -1 : 1);

describe("sortBy", () => {
  it("should return an array of same size", () => {
    for (let arr of arrays) expect(sortBy<any>(arr).length).toBe(arr.length);
  });

  it("should apply ascending order for sorting by default", () => {
    expect(sortBy(arrays[0] as number[])).toStrictEqual([3, 4, 6, 7, 11]);
  });

  it("should sort by descending order when specified", () => {
    expect(sortBy(arrays[0] as number[], null, "desc")).toStrictEqual(
      arrays[0].reverse()
    );
  });

  it("should sort by custom determinant function", () => {
    const sorted = sortBy<Person>(arrays[2] as Person[], sortPersonsByName);

    expect(sorted[0]).toStrictEqual({ name: "Bob" });
    expect(sorted[1]).toStrictEqual({ name: "Doe" });
    expect(sorted[2]).toStrictEqual({ name: "James" });
    expect(sorted[3]).toStrictEqual({ name: "Mary" });
  });
});
