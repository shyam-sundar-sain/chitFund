import {combineReducers} from 'redux';
import {ApiReducer} from '../ComponentsRedux/Reducer';
import {visitorTypeReducer} from '../ComponentsRedux/Reducer';
import {configureStore} from '@reduxjs/toolkit';
const rootReducer = combineReducers({
  ApiReducer,
  visitorTypeReducer,
});

export const myStore = configureStore({
  reducer: rootReducer,
  // Other options if needed
});
