import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reducers from '../reducers';
import reduxLogger from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore() {

  const store = createStore(combineReducers(reducers), applyMiddleware(
    thunk,
    reduxLogger
  ));
  return store
}