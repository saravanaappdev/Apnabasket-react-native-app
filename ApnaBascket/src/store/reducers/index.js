import { combineReducers } from 'redux';
import userDataReducer from './userDataReducer';

// Reducers
export const rootReducer = combineReducers({
    // Added the user Data reducer for sample
    userData: userDataReducer,
})
