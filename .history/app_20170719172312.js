import React from 'react';

import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './stores/';

const store = configureStore();

export const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)