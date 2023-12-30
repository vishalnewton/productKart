const initialState = {
  items: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_QUANTITY':
      const increasedProduct = state.items[action.payload.product.id];
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.product.id]: {
            product: increasedProduct
              ? increasedProduct.product
              : action.payload.product,
            count: (increasedProduct ? increasedProduct.count : 0) + 1,
          },
        },
      };

    case 'DECREASE_QUANTITY':
      const decreasedProduct = state.items[action.payload.product.id];
      const newCount = Math.max(
        (decreasedProduct ? decreasedProduct.count : 0) - 1,
        0,
      );

      if (newCount === 0) {
        // If count becomes 0, remove the product
        const {[action.payload.product.id]: _, ...restItems} = state.items;
        return {
          ...state,
          items: restItems,
        };
      }

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.product.id]: {
            product: decreasedProduct
              ? decreasedProduct.product
              : action.payload.product,
            count: newCount,
          },
        },
      };

    default:
      return state;
  }
};

export default cartReducer;
