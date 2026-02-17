export const strSlice = (value: string): string => {
  if (!value || value.length <= 8) return value;
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
};
