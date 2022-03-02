import { createStore, applyMiddleware, compose } from 'redux';
import root from './reducers/index'

//set code to using redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(root, /* preloadedState, */ composeEnhancers());
//const store = createStore(root)

export default store