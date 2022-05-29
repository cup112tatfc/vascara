export const percentOff: (price: number, priceOff: number) => number = (price, priceOff) => {
  return parseInt((((price - priceOff) / price) * 100).toFixed());
};
