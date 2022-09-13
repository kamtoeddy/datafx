export const getItemsAt = <T>(array: T[], start = 0, end?: number) => {
  return [...array].slice(start, end ? end + 1 : end);
};
