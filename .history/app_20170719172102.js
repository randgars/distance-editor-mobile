import React from 'react';

import { Provider } from 'react-redux';
import App from './components/app';
import configureStore from './stores/';

const store = configureStore();

export const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)