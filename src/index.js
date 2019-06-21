import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class Sample extends React.Component {

  constructor() {
      super();
      this.state = {
          count: 0,
          counts: []
      }
  }
  
  up = (isUp) => {
    return () => {
      let currentNumber;
      if(isUp) {
        currentNumber = this.state.count+1
        this.state.counts.push(0);
      }
      else {
        currentNumber = this.state.count-1
        if(currentNumber < 0) currentNumber = 0;
        this.state.counts.pop();
      }
      this.setState({
        count:  currentNumber
      });
    }
    
  }

  updateInput = (evt) => {
    let currentNumber = this.state.count;
    let inputNum = isNaN(parseInt(evt.target.value))? 0 : parseInt(evt.target.value);
    if(inputNum < 0) inputNum = 0;
    let indexes = Array(inputNum).fill(0);
    if(inputNum < currentNumber) {
      this.state.counts = this.state.counts.slice(0,inputNum);
    }
    indexes.map((item, i) => {
      i=i+1;
      if(i>currentNumber) {
        this.state.counts.push(0);
      }
    });
    this.setState({
      count:  inputNum
    });
  }

  updateSubInput = (index) => {
    
    return (evt) => {
      let inputNum = isNaN(parseInt(evt.target.value))? 0 : parseInt(evt.target.value);
      this.state.counts[index-1] = inputNum;
      this.setState(state => ({
      }))
    }
  }

  upSub = (index, isUp) => {
    return() => {
      let inputNum;
      if(isUp) {
        inputNum = this.state.counts[index-1]+index;
      }
      else {
        inputNum = this.state.counts[index-1]-index;
      }
      this.state.counts[index-1] = inputNum;
      this.setState(state => ({
      }))
    }
  }

  deleteControl = (index) => {
    return () => {
      this.state.counts.splice(index-1, 1);
      this.setState(state => ({
        count: state.count-1
      }))
    }
  }
  display = () => {
    console.log(JSON.stringify(this.state,0,2))
  }

  getDivList= ()=> {
    const indexes = Array(this.state.count).fill(0);
    return indexes.map((item, i) => {
      i = i+1;
      
      return <div key={i}>
        <ControlDiv
        up = {this.upSub(i, true)}
        down = {this.upSub(i, false)}
        update = {this.updateSubInput(i)}
        count = {this.state.counts[i-1]}
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

// ReactDOM.render(<Test />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
