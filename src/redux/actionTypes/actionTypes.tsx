import {Product} from '../../types/type';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

interface FetchProductsRequestAction {
  type: typeof FETCH_PRODUCTS_REQUEST;
}

interface FetchProductsSuccessAction {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  payload: Product[];
}

interface FetchProductsFailureAction {
  type: typeof FETCH_PRODUCTS_FAILURE;
  payload: string; // Error message
}

export type ProductActionTypes =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction;

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: CartItem;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: number; // id of the item to remove
}

interface IncreaseQuantityAction {
  type: typeof INCREASE_QUANTITY;
  payload: number; // id of the item to increase quantity
}

interface DecreaseQuantityAction {
  type: typeof DECREASE_QUANTITY;
  payload: number; // id of the item to decrease quantity
}

export type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | IncreaseQuantityAction
  | DecreaseQuantityAction;
