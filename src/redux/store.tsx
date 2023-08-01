import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './reducer/combineReducer';

const middleware = applyMiddleware(thunk);
export const store = createStore(rootReducer, middleware);
