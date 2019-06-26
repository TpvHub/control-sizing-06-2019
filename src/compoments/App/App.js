import React, { Component } from 'react';
import './App.css';
import ControlSize from '../ControlSize/ControlSize';
import '../../reducers/index.js';
import { connect } from 'react-redux'

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">
          <div className="form-group">
            <label>Quantity</label>
            <ControlSize
              value={this.props.todos.value}
              onTodoChange={(e)=>this.props.dispatch({type:'CHANGE_TODO',value:e.target.value})}
              up={()=>{this.props.dispatch({type:'UP_TODO'})}}
              down={()=>{this.props.dispatch({type:'DOWN_TODO'})}}
              delete={()=>{this.props.dispatch({type:'DELETE_ALL'})}}
            />
          </div>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">
          {
            this.props.todos.arr.map((item, index) => (
              <div className="form-group" key={index}>
                <label>Index {index}</label>
                <ControlSize key={index}
                  value={item}
                  onTodoChange={(e)=>{this.props.dispatch({type:'CHANGE_ITEM_TODO',value:e.target.value,index:index})}}
                  up={()=>{this.props.dispatch({type:'SET_UP',index:index,item:item})}}
                  down={()=>{this.props.dispatch({type:'RESET_DOWN',index:index,item:item})}}
                  delete={()=>{this.props.dispatch({type:'DELETE_ITEM',index:index})}}
                />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.app
  }
}

export default connect(mapStateToProps)(App);
