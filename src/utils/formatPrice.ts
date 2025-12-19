export const formatPrice = (price: number | null) => {
  if (price === null) return "-";
  return `R$ ${price}`;
};
