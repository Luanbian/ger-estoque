export const convertToCents = (value: string): number => {
  const normalized = value.includes(",")
    ? value.replace(/\./g, "").replace(",", ".")
    : value;
  const floatValue = parseFloat(normalized);
  return isNaN(floatValue) ? 0 : Math.round(floatValue * 100);
};

export const convertFromCents = (value: number): string => {
  return (value / 100).toFixed(2);
};
