export const getTotalCost = (cartItems: any[]) => {
  return cartItems.reduce(
    (total: number, item: {price: number; quantity: number}) =>
      total + item.price * item.quantity,
    0,
  );
};
