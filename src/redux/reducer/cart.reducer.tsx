import {
  ADD_TO_CART,
  CartActionTypes,
  CartItem,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from '../actionTypes';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartReducer = (
  state = initialState,
  action: CartActionTypes,
): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        // If the same item exists in the cart, update its quantity
        return {
          ...state,
          items: state.items.map(item =>
            item.id === existingItem.id
              ? {...item, quantity: item.quantity + 1}
              : item,
          ),
        };
      } else {
        // If the item doesn't exist in the cart, add it as a new item
        return {
          ...state,
          items: [...state.items, newItem],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case INCREASE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      };
    case DECREASE_QUANTITY:
      const updatedItems = state.items.map(item =>
        item.id === action.payload
          ? {...item, quantity: Math.max(item.quantity - 1, 0)}
          : item,
      );

      return {
        ...state,
        items: updatedItems.filter(item => item.quantity > 0), // Remove items with quantity zero
      };
    default:
      return state;
  }
};

export default cartReducer;
