export const formatPrice = (price: number) =>
  price === 0 ? "Gratis" : `Rp${price.toLocaleString("id-ID")}`;
