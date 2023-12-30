const initialState = {
  list: [], // [{ product }]
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITES':
      const existingProductIndex = state.list.findIndex(
        item => item.id === action.payload.product.id,
      );

      if (existingProductIndex !== -1) {
        // Product already in favorites, remove it
        return {
          ...state,
          list: state.list.filter(
            item => item.id !== action.payload.product.id,
          ),
        };
      } else {
        // Product not in favorites, add it
        return {
          ...state,
          list: [...state.list, action.payload.product],
        };
      }

    default:
      return state;
  }
};

export default favoritesReducer;
