// src/store/actions/cartActions.ts
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CartActionTypes,
  CartItem,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from '../actionTypes/actionTypes';

export const addToCart = (item: CartItem) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId: number) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const increaseQuantity = (itemId: number) => ({
  type: INCREASE_QUANTITY,
  payload: itemId,
});

export const decreaseQuantity = (itemId: number) => ({
  type: DECREASE_QUANTITY,
  payload: itemId,
});
