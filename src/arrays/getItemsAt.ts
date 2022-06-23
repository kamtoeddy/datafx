export const getItemsAt = (
  list: any[],
  start = 0,
  end?: number | undefined
) => {
  return [...list].slice(start, end);
};
