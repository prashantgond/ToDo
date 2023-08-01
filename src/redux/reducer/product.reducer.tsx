import {Product} from '../../types/type';
import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  ProductActionTypes,
} from '../actionTypes';

interface ProductState {
  loading: boolean;
  products: Product[];
  error: string | null;
}

const initialState: ProductState = {
  loading: false,
  products: [],
  error: null,
};

const productReducer = (
  state = initialState,
  action: ProductActionTypes,
): ProductState => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
