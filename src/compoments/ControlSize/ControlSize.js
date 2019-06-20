import React, { Component } from 'react';
// import './ControlSize.css';

class ControlSize extends React.Component {
    constructor(props) {
        super(props);
    }
      
    render() {  
        return (
            <div className="input-group">
                <div className="input-group-btn">
                  <button id="down" className="btn btn-default" onClick={this.props.down}>
                    <span className="glyphicon glyphicon-minus"></span>
                  </button>
                </div>
                <input type="text" id="myNumber" onChange={this.props.onTodoChange} className="form-control input-number"  value={this.props.value}/>
                <div className="input-group-btn">
                  <button id="up" className="btn btn-default" onClick={this.props.up}>
                    <span className="glyphicon glyphicon-plus"></span>
                  </button>
                  <button type="button" class="btn btn-danger" onClick={this.props.delete}>Delete</button>
                </div>
            </div>
        );
    }
}

export default ControlSize;
