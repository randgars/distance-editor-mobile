import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import reduxLogger from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore() {

  const store = createStore(combineReducers(reducers), compose(
    applyMiddleware(reduxLogger),
    applyMiddleware(thunk)
  ));
  return store
}