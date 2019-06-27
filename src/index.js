import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import { createStore } from 'redux';

//khoi tao state ban dau
const initialState = {
  status: false,
  count: 0,
  counts: []
}

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_COUNT': {
      let newState = { ...state };
      newState.count = state.count + 1;
      newState.counts.push(0);

      return newState;
    };
    case 'DECREASE_COUNT': {
      let newState = { ...state };
      newState.count = state.count - 1;
      if (newState.count < 0) newState.count = 0;
      newState.counts.pop();

      return newState;
    };
    case 'SET_COUNT': {
      let newState = { ...state };
      newState.count = action.count;

      let indexes = Array(newState.count).fill(0);
      if (newState.count < state.count) {
        newState.counts = state.counts.slice(0, newState.count);
      }
      indexes.map((item, i) => {
        if (i >= state.count) {
          newState.counts.push(0);
        }
      });

      return newState;
    };
    case 'SET_SUBCOUNT': {
      return {
        ...state,
        counts: state.counts.map((item, i) => {
          if(i === action.index) return action.input;
          else return item;
        })
      };
    };
    case 'INCREASE_SUBCOUNT': {
      return {
        ...state,
        counts: state.counts.map((item, i) => {
          if(i === action.index) return item + (action.index + 1);
          else return item;
        })
      };
    };
    case 'DECREASE_SUBCOUNT': {
      return {
        ...state,
        counts: state.counts.map((item, i) => {
          if(i === action.index) return item - (action.index + 1);
          else return item;
        })
      };
    };
    case 'DELETE_SUBCOUNT': {
      let newState = { ...state };
      newState.counts.splice(action.index, 1);
      newState.count = state.count - 1;

      return newState;
    }
    default: return state;
  }
}

const store = createStore(myReducer);

class Sample extends React.Component {

  constructor(props) {
    super(props);
  }

  up = (isUp) => {
    return () => {
      if (isUp) {
        store.dispatch({ type: 'INCREASE_COUNT' });
      }
      else {
        store.dispatch({ type: 'DECREASE_COUNT' });
      }
    }
  }

  updateInput = (evt) => {
    let inputNum = isNaN(parseInt(evt.target.value)) ? 0 : parseInt(evt.target.value);
    if (inputNum < 0) inputNum = 0;
    store.dispatch({
      type: 'SET_COUNT',
      count: inputNum
    });
  }

  updateSubInput = (index) => {

    return (evt) => {
      let inputNum = isNaN(parseInt(evt.target.value)) ? 0 : parseInt(evt.target.value);
      store.dispatch({
        type: 'SET_SUBCOUNT',
        index: index,
        input: inputNum
      });
    }
  }

  upSub = (index, isUp) => {
    return () => {
      if (isUp) {
        store.dispatch({
          type: 'INCREASE_SUBCOUNT',
          index: index
        });
      }
      else {
        store.dispatch({
          type: 'DECREASE_SUBCOUNT',
          index: index
        });
      }
    }
  }

  deleteControl = (index) => {
    return () => {
      store.dispatch({
        type: 'DELETE_SUBCOUNT',
        index: index
      });
    }
  }
  display = () => {
    console.log(JSON.stringify(store.getState(), 0, 2));
  }

  getDivList = () => {

    return this.props.counts.map((item, i) => {
      return <div key={i}>
        <ControlDiv
          up={this.upSub(i, true)}
          down={this.upSub(i, false)}
          update={this.updateSubInput(i)}
          count={item}
        />
        <button onClick={this.deleteControl(i)}>x</button>
      </div>
    });
  }

  render() {
    console.log(this.props.counts);
    return (
      <div>
        <ControlDiv
          up={this.up(true)}
          down={this.up(false)}
          update={this.updateInput}
          count={this.props.count}
        />

        <button onClick={this.display}>test</button>
        <div style={{ marginTop: 20 + 'px' }}>
          {this.getDivList()}

        </div>
      </div>
    );
  }
}
const ControlDiv = ({ up, down, update, count }) => {
  return (
    <div style={{ float: 'left' }}>
      <button onClick={down}>
        -
      </button>
      <input type="text" name="number" value={count} onChange={update} />
      <button onClick={up}>
        +
      </button>
    </div>
  );
}
const mapState = state => ({
  count: state.count,
  counts: state.counts
});

const mapDispatch = dispatch => ({});

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