import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // To check the state using Redux DevTools extensions
import thunk from 'redux-thunk'; //Redux Thunk middleware allows you to write action creators that return a function instead of an action
import { rootReducer } from './reducers';

const configureStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default configureStore;

