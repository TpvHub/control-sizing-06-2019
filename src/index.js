import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import myReducer from './reducers';
import {Sample} from './Components/index';
import { sub, update, deleteItem, getall} from './actions';
const axios = require('axios');

const store = createStore(myReducer,applyMiddleware(thunk));

const mapState = state => ({
  counts: state.counts
});

const thunkAdd = (amount) => {
  let inputArr = new Array(amount).fill().map((item, index) => {
    return {value: 0}
  })
  return (dispatch) => {
    axios.post('http://localhost:9000/api/count',inputArr)
    .then(response => {
      axios.get('http://localhost:9000/api/counts')
      .then(response => {
        dispatch(getall(response.data))
      })
      .catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  }
}
const thunkSub = (ids) => {
  return (dispatch) => {
    axios.post('http://localhost:9000/api/delete/count', ids)
    .then(response => {
      console.log(response)
      dispatch(sub(ids.length))
    }).catch(err => {
      console.log(err)
    })
  }
}
const thunkUpdate = (amount, id) => {
  return (dispatch) => {
    axios.put('http://localhost:9000/api/count', {
      id: id,
      value: amount
    }).then(response => {
      console.log(response)
      dispatch(update(amount, id))
    }).catch(err => {
      console.log(err)
    })
  }
}
const thunkDelete = (ids, index) => {
  return (dispatch) => {
    axios.post(`http://localhost:9000/api/delete/count`, ids)
    .then(response => {
      console.log(response)
      dispatch(deleteItem(index))
    }).catch(err => {
      console.log(err)
    })
  }
}
const thunkGetAll = () => {
  return (dispatch) => {
    axios.get('http://localhost:9000/api/counts')
    .then(response => {
      console.log(response.data)
      dispatch(getall(response.data))
    }).catch(err => {
      console.log(err)
    })
  }
}
const mapDispatch = {
  add: thunkAdd,
  sub: thunkSub,
  update: thunkUpdate,
  delete: thunkDelete,
  getall: thunkGetAll
}

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