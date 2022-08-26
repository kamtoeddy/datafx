export const removeAt = <T>(list: T[], start = 0, deleteCount = 1) => {
  const newList = [...list];
  newList.splice(start, deleteCount);
  return newList;
};
