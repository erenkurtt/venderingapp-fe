import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productReducer';
import processReducer from './processReducer';
import systemReducer from './systemReducer';
import demandReducer from './demandReducer';

const rootReducer = combineReducers({
  product: productReducer,
  process: processReducer,
  system: systemReducer,
  demands: demandReducer
});

export default rootReducer;