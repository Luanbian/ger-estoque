export const getValueByPath = (obj: any, path: string): string => {
  if (!path || !obj) return "";

  return path.split(".").reduce((acc, key) => {
    const arrayMatch = key.match(/^(\w+)\[(\d+)\]$/);

    if (arrayMatch) {
      const [, arrayName, index] = arrayMatch;
      return acc?.[arrayName]?.[parseInt(index)];
    }

    return acc?.[key];
  }, obj);
};
