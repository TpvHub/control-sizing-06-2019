import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { createStore } from 'redux';
import myReducer from './reducers';
import {Sample} from './Components/index';
import {add, sub, update, deleteItem} from './actions';

const store = createStore(myReducer);

const mapState = state => ({
  counts: state.counts
});

const mapDispatch = dispatch => ({
  add: (amount) => {
    dispatch(add(amount))
  },
  sub: (amount) => {
    dispatch(sub(amount))
  },
  update: (amount, index) => {
    dispatch(update(amount, index))
  },
  delete: (index) => {
    dispatch(deleteItem(index))
  }
})

const App = connect(
  mapState,
  mapDispatch
)(Sample);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();