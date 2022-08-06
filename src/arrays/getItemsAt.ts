export const getItemsAt = <T>(
  list: T[],
  start = 0,
  end?: number | undefined
) => {
  return [...list].slice(start, end);
};
