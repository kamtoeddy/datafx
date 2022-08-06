type UpdateByDeterminant = <T>(value: T, index: number, array: T[]) => T;

export const updateBy = <T>(list: T[], determinant: UpdateByDeterminant) => {
  return list.map(determinant);
};
