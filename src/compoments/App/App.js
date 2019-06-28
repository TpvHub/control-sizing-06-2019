import React, { Component } from 'react';
import './App.css';
import ControlSize from '../ControlSize/ControlSize';
import '../../reducers/index.js';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';


class App extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">
          <div className="form-group">
            <label>Quantity</label>
            <ControlSize
              value={this.props.todos.arr.length}
              onTodoChange={this.props.changeTodo}
              up={this.props.upTodo}
              down={this.props.downTodo }
              delete={this.props.deleteItemAll}
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
                  onTodoChange={(e)=>{this.props.changeItemToDo(e.target.value,index)}}
                  up={()=>{this.props.setUP(index)}}
                  down={()=>{this.props.resetDown(index)}}
                  delete={()=>{this.props.deleteItem(index)}}
                />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch,props) => ({
    upTodo: () => {
      dispatch(actions.upTodo());
    },
    downTodo: () => {
      dispatch(actions.downTodo());
    },
    deleteItemAll: () => {
      dispatch(actions.deleteItemAll());
    },
    changeTodo:(e) => {
      let newValue = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value); 
      dispatch(actions.changeTodo(newValue));
    },
    setUP:(index) => {
      dispatch(actions.setUP(index))
    },
    resetDown:(index) => {
      dispatch(actions.resetDown(index))
    },
    deleteItem:(index) => {
      dispatch(actions.deleteItem(index))
    },
    changeItemToDo:(value,index) => {
      value = isNaN(parseInt(value)) ? 0 : parseInt(value); 
      dispatch(actions.changeItemToDo(value,index))
  }
})

const mapStateToProps = (state) => ({
  todos: state.app
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
