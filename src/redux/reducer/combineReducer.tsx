import {combineReducers} from 'redux';
import productReducer from './product.reducer';
import cartReducer from './cart.reducer';

export const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
