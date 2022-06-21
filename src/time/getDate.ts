export const getDateString = (value = new Date()) =>
  new Date(value).toISOString().substring(0, 10);
