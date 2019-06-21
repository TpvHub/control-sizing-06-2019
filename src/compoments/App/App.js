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

  onTodoChange = (e) => {
    let value = e.target.value
    value = (isNaN(parseInt(value)) || parseInt(value) < 0) ? 0 : parseInt(value);
    let arrOld = this.state.arr;
    let arrNew = [];
    if(value <= this.state.value)
      arrNew = arrOld.filter((item,index) => index < value)
    else
      arrNew = [
        ...this.state.arr, 
        ...Array(value - this.state.value).fill(0)
      ];
    this.setState(state => ({
      value: value,
      arr: arrNew
    }));
  }

  down = () => {
    const value_down = this.state.value
    let arrNew = [];
    let down = parseInt(value_down) - 1;
    let arrOld = this.state.arr;
    if (down > 0) {
      arrNew = arrOld.filter((item, index) => index < down);
      this.setState(() => ({
        value: down,
        arr: arrNew
      }));
    } else {
      this.setState(state => ({
        value: 0,
        arr: arrNew
      }));
    }
  }

  up = () => {
    const value_up = this.state.value;
    let up = parseInt(value_up) + 1;
    let arrNew = [];
    let arrOld = this.state.arr;
    arrNew = [
      ...arrOld,
      ...Array(up-arrOld.length).fill(0)
    ]; 
    this.setState(state => ({
      value: up,
      arr: arrNew
    }));
  }

  resetDown = (index, item) => {
    return () => {
      index = parseInt(index);
      item = parseInt(item);
      let arrNew = this.state.arr;
      arrNew[index] = item - index - 1;
      this.setState(() => ({
        arr: arrNew,
      }));
    }
  }

  setUp = (index, item) => {
    return () => {
      index = parseInt(index);
      item = parseInt(item);
      let arrNew = this.state.arr;
      arrNew[index] = index + item + 1;
      this.setState(() => ({
        arr: arrNew,
      }));
    }
  }

  onTodoChangeItem = (index) => {
    return (e) => {
      let value = e.target.value
      value = (isNaN(parseInt(value)) || parseInt(value) < 0) ? 0 : parseInt(value);  
      index = parseInt(index);
      let arrNew = this.state.arr;
      arrNew[index] = value;
      this.setState(() => ({
        arr: arrNew,
      })); 
    }
  }

  deleteAll = () => {
    this.setState(() => ({
      value: 0,
      arr: [],
    }));
  }

  deleteItem = (index) =>{
    return () => {
      let arrNew = [];
      arrNew = this.state.arr.filter( (item,i) =>  i !== index);
      this.setState((state) => ({
        value: this.state.value - 1,
        arr: arrNew,
      })); 
    }
  } 

  render() {
    return (
      <div className="container">
        <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">
          <div className="form-group">
            <label>Quantity: </label>
            <ControlSize
              value={this.state.value}
              onTodoChange={this.onTodoChange}
              up={this.up}
              down={this.down}
              delete={this.deleteAll}
            />
          </div>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">
          {
            this.state.arr.map((item, index) => (
              <div className="form-group" key={index}>
                <label>Index {index}</label>
                <ControlSize key={index}
                  value={item}
                  onTodoChange={this.onTodoChangeItem(index)}
                  up={this.setUp(index, item)}
                  down={this.resetDown(index, item)}
                  delete={this.deleteItem(index)}
                />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
