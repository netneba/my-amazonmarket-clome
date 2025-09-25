import { ACTIONS } from "./actions";

export const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  selectedItems: JSON.parse(localStorage.getItem("selectedItems")) || {},
  user: JSON.parse(localStorage.getItem("user")) || null,
  orders: JSON.parse(localStorage.getItem("orders")) || [],
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      return { ...state, cartItems: [...state.cartItems, action.payload] };

    case ACTIONS.REMOVE_FROM_CART:
      return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.payload) };

    case ACTIONS.SELECT_ITEMS:
      return { ...state, selectedItems: action.payload };

    case ACTIONS.INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case ACTIONS.DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        ),
      };

    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };

    case ACTIONS.LOGOUT_USER: 
      return { ...state, user: null };

    case ACTIONS.ADD_ORDER:
      return { ...state, orders: [...state.orders, action.payload] };

    default:
      return state;
  }
};
