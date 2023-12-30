export const increaseQuantity = product => ({
  type: 'INCREASE_QUANTITY',
  payload: {product},
});

export const decreaseQuantity = product => ({
  type: 'DECREASE_QUANTITY',
  payload: {product},
});
