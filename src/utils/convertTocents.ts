export const convertToCents = (value: string): number => {
  const floatValue = parseFloat(value);
  return isNaN(floatValue) ? 0 : Math.round(floatValue * 100);
};
