export const convertToCents = (value: string): number => {
  const floatValue = parseFloat(value);
  return isNaN(floatValue) ? 0 : Math.round(floatValue * 100);
};

export const convertFromCents = (value: number): string => {
  return (value / 100).toFixed(2);
};
