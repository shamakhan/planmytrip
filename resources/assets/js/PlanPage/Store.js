import {applyMiddleware , createStore } from 'redux';

import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import allReducers from './reducers';


const middleware =applyMiddleware(promise(),thunk);

export default createStore(allReducers,middleware);