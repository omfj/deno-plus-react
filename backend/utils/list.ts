export const createUnique = <T>(arr: Array<T>) => {
  const set = new Set(arr);
  return Array.from(set);
};
