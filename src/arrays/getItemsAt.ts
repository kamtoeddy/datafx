export const getItemsAt = <T>(list: T[], start = 0, end?: number) => {
  return [...list].slice(start, end ? end + 1 : end);
};
