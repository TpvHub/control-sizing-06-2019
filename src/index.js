import React from 'react';
import ReactDOM from 'react-dom';
import App from './compoments/App/App';
import { createStore } from 'redux';
import rootReducer from './reducers/index'
import { Provider } from 'react-redux'
import './index.css';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);