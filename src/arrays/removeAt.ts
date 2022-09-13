export const removeAt = <T>(array: T[], start = 0, deleteCount = 1) => {
  const newList = [...array];
  newList.splice(start, deleteCount);
  return newList;
};
