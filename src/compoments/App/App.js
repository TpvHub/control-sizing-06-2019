import React from 'react';
import './App.css';
import ControlSize from '../ControlSize/ControlSize';
import '../../reducers/index.js';
import { connect } from 'react-redux';
import {
  addCounts,
  subCounts,
  deleteCount,
  updateCount,
  deleteAll,
} from '../../actions/index';


class App extends React.Component {

  createObj = (value) => {
    const uuidv4 = require('uuid/v4');
    let id = uuidv4();
    let obj = { id: id, value: value};
    return obj;
  }

  handleUpParent = () => {
    this.props.addCounts(1,this.createObj(0))
  }

  handleDownParent = () => {
    this.props.subCounts(1)
  }

  handleDeleteParent = () => {
    this.props.deleteAll()
  }

  handleChangeParent = (e) => {
    let distance = e.target.value - this.props.todos.arr.length
    if (distance > 0) {
      this.props.addCounts(distance,this.createObj(0))
    } else {
      this.props.subCounts(distance * -1)
    }
  }

  render() {
    return (
      <div className="container">
        <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">
          <div className="form-group">
            <label>Quantity</label>
            <ControlSize
              value        = { this.props.todos.arr.length }
              onTodoChange = { this.handleChangeParent }
              up           = { this.handleUpParent }
              down         = { this.handleDownParent }
              delete       = { this.handleDeleteParent }
            />
          </div>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">
          {
            this.props.todos.arr.map((item, index) => (
              <div className="form-group" key={ index }>
                <label>Index { index }</label>
                <ControlSize key = { item.value } 
                  value          = { item.value }
                  onTodoChange   = {(e) => { this.props.updateCount(item.id, e.target.value) }}
                  up             = {() => { this.props.updateCount(item.id, item.value + index + 1) }}
                  down           = {() => { this.props.updateCount(item.id, item.value - index -1) }}
                  delete         = {() => { this.props.deleteCount(item.id) }}
                />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addCounts,
  subCounts,
  deleteCount,
  updateCount,
  deleteAll,
}

const mapStateToProps = (state) => ({
  todos: state.app
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
