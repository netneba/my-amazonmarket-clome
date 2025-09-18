export const ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",
  INCREASE_QUANTITY: "INCREASE_QUANTITY",
  DECREASE_QUANTITY: "DECREASE_QUANTITY",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      const item = action.payload;
      const exist = state.cartItems.find((i) => i.id === item.id);
      if (exist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...item, quantity: 1 }],
        };
      }
    }

    case ACTIONS.INCREASE_QUANTITY: {
      return {
        ...state,
        cartItems: state.cartItems.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }

    case ACTIONS.DECREASE_QUANTITY: {
      return {
        ...state,
        cartItems: state.cartItems
          .map((i) =>
            i.id === action.payload
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      };
    }

    case ACTIONS.REMOVE_FROM_CART: {
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.id !== action.payload),
      };
    }

    default:
      return state;
  }
};
