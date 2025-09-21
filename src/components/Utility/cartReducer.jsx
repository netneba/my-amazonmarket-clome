import { ACTIONS } from "./actions";

export const initialState = {
  cartItems: [],
  selectedItems: {},
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

    case ACTIONS.INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };

    case ACTIONS.DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems
          .map((i) =>
            i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      };
    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.id !== action.payload),
      };

    case ACTIONS.REMOVE_ALL_CART:
      return {
        ...state,
        cartItems: [],
        selectedItems: {},
      };

    case ACTIONS.SELECT_ITEMS:
      return {
        ...state,
        selectedItems: action.payload,
      };

    default:
      return state;
  }
};
