import React, { Component } from 'react';
import './App.css';
import ControlSize from '../ControlSize/ControlSize';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      arr: []
    };
  }

  onTodoChange = (value) => {
    value = (isNaN(parseInt(value)) || parseInt(value) < 0) ? 0 : parseInt(value);  
    let arrOld = this.state.arr;
    let arrNew = [];
    if(value <= this.state.value){
      arrNew = arrOld.filter((item, index) => index < value);
    }else{
      arrNew = this.state.arr;
      for(let i = 0; i < (value - this.state.value); i++) {
        arrNew.push(0);
      }
    }
    this.setState(state => ({
      value: value,
      arr:arrNew
    }));
  }
  
  down = (value_down) => {
    let arrNew = [];
    let down = parseInt(value_down) - 1;
    let arrOld = this.state.arr;
    if(down > 0){
      arrNew = arrOld.filter((item,index) => index < down);
      this.setState(() => ({
        value: down,
        arr:arrNew
      }));
    }else{
      this.setState(state => ({
        value: 0,
        arr:arrNew
      }));
    }
  }

  up(value_up) {
    let up = parseInt(value_up) + 1;
    let arrNew = [];
    let arrOld = this.state.arr;

    for(let i = 0; i < up; i++) {
      if(i>=arrOld.length){
        arrNew.push(0);
      }else{
        arrNew[i] = arrOld[i];
      }
    }

    this.setState(state => ({
      value: up,
      arr:arrNew
    }));
  }

  resetDown = (index,item) => {
    index = parseInt(index);
    item = parseInt(item);
    let arrNew = this.state.arr;
    arrNew[index] = item - index - 1;
    this.setState(() => ({
      arr: arrNew,
    })); 
  }

  setUp = (index,item) => {
    index = parseInt(index);
    item = parseInt(item);
    let arrNew = this.state.arr;
    arrNew[index] = index + item + 1;
    this.setState(() => ({
      arr: arrNew,
    }));    
  }

  onTodoChangeItem = (value,index) => {
    value = (isNaN(parseInt(value)) || parseInt(value) < 0) ? 0 : parseInt(value);  
    index = parseInt(index);
    let arrNew = this.state.arr;
    arrNew[index] = value;
    this.setState(() => ({
      arr: arrNew,
    })); 
  }
  

  render() {  
    return (
      <div className="container">
        <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">
          <div className="form-group">
            <label>Quantity: </label>
            <ControlSize
              up={()=>this.up(this.state.value)}
              value={this.state.value}
              onTodoChange={(e) => this.onTodoChange(e.target.value)}
              down={()=>this.down(this.state.value)}
            />
          </div>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6"> 
        {
          this.state.arr.map((item, index) => (
            <ControlSize
              down={()=>this.resetDown(index,item)}
              value={item}
              onTodoChange={(e) => this.onTodoChangeItem(e.target.value,index)}
              up={()=>this.setUp(index,item)}
            />
          ))
        }
        </div>
      </div>
    );
  }
}

export default App;
