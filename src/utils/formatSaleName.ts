export const formatSaleName = (products: string[]): string => {
  if (!products || products.length === 0) return "";

  if (products.length <= 2) return products.join(", ");

  return `${products[0]} ... ${products[products.length - 1]}`;
};
