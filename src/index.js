import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';

//khoi tao state ban dau
const initialState = {
    status : false,
    count: 0,
    counts: []
}

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_COUNT': {
        let newState = {...state};
        newState.count = state.count+1;
        newState.counts.push(0);

        return newState;
    };
    case 'DECREASE_COUNT': {
        let newState = {...state};
        newState.count = state.count-1;
        if(newState.count < 0) newState.count = 0;
        newState.counts.pop();

        return newState;
    };
    case 'SET_COUNT': {
        let newState = {...state};
        newState.count = action.count;

        let indexes = Array(newState.count).fill(0);
        if(newState.count < state.count) {
          newState.counts = state.counts.slice(0, newState.count);
        }
        indexes.map((item, i) => {
          if(i>=state.count) {
            newState.counts.push(0);
          }
        });

        return newState;
    };
    case 'SET_SUBCOUNT': {
        let newState = {...state};
        newState.counts[action.index] = action.input;

        return newState;
    };
    case 'INCREASE_SUBCOUNT': {
        let newState = {...state};
        newState.counts[action.index] = state.counts[action.index] + (action.index+1);

        return newState;
    };
    case 'DECREASE_SUBCOUNT': {
        let newState = {...state};
        newState.counts[action.index] = state.counts[action.index] - (action.index+1);

        return newState;
    };
    case 'DELETE_SUBCOUNT': {
        let newState = {...state};
        newState.counts.splice(action.index, 1);
        newState.count = state.count-1;

        return newState;
    }
    default: return state;
  }    
}

const store = createStore(myReducer);

// console.log('Default:', store.getState());

class Sample extends React.Component {

  constructor() {
      super();
      this.state = {
        count: 0,
        counts: []
      }
  }

  componentDidMount() {
    store.subscribe(()=> {
      
      this.setState(state => ({
        count: store.getState().count,
        counts: store.getState().counts
      }))
    })
  }
  
  up = (isUp) => {
    return () => {
      if(isUp) {
        store.dispatch({type: 'INCREASE_COUNT'});
      }
      else {
        store.dispatch({type: 'DECREASE_COUNT'});
      }
    }
  }

  updateInput = (evt) => {
    let inputNum = isNaN(parseInt(evt.target.value))? 0 : parseInt(evt.target.value);
    if(inputNum < 0) inputNum = 0;
    store.dispatch({
      type: 'SET_COUNT',
      count: inputNum
    });
  }

  updateSubInput = (index) => {
    
    return (evt) => {
      let inputNum = isNaN(parseInt(evt.target.value))? 0 : parseInt(evt.target.value);
      store.dispatch({
        type: 'SET_SUBCOUNT',
        index: index,
        input: inputNum
      });
    }
  }

  upSub = (index, isUp) => {
    return() => {
      if(isUp) {
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
    console.log(JSON.stringify(store.getState(),0,2));
    console.log(JSON.stringify(this.state,0,2));
  }

  getDivList= ()=> {
    const indexes = Array(this.state.count).fill(0);
    return indexes.map((item, i) => {
      return <div key={i}>
        <ControlDiv
        up = {this.upSub(i, true)}
        down = {this.upSub(i, false)}
        update = {this.updateSubInput(i)}
        count = {this.state.counts[i]}
      />
      <button onClick={this.deleteControl(i)}>x</button>
      </div>
    });
  }

  render() {
      return (
        <div>
          <ControlDiv 
            up = {this.up(true)}
            down = {this.up(false)}
            update = {this.updateInput}
            count = {this.state.count}
          />
          
          <button onClick={this.display}>test</button>
          <div style={{marginTop: 20+'px'}}>
              { this.getDivList() }
              
          </div>
        </div>
      );
  }
}
const ControlDiv = ({up, down, update, count}) => {
  return (
    <div style={{float: 'left'}}>
      <button onClick={down}>
        -
      </button>
      <input type="text" name="number" value={count} onChange={update}/>
      <button onClick={up}>
        +
      </button>
    </div>
  );
}

ReactDOM.render(
  <Sample />,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
