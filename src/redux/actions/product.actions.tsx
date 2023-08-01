import {Dispatch} from 'redux';
import axios from 'axios';
import {Product} from '../../types/type';
import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  ProductActionTypes,
} from '../actionTypes';

export const fetchProductsRequest = (): ProductActionTypes => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (
  products: Product[],
): ProductActionTypes => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error: string): ProductActionTypes => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchProducts = () => {
  return (dispatch: Dispatch<ProductActionTypes>) => {
    dispatch(fetchProductsRequest());
    axios
      .get('https://my-json-server.typicode.com/benirvingplt/products/products')
      .then(response => {
        console.log('response', response);
        dispatch(fetchProductsSuccess(response?.data));
      })
      .catch(error => {
        console.log('error', error);
        dispatch(fetchProductsFailure(error.message));
      });
  };
};
