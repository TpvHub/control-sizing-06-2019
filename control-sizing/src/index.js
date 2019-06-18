import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 4.5};
  }

  down() {
    this.setState(state => ({
      value: state.value -1
    }));
  }

  up() {
    this.setState(state => ({
      value: state.value + 1
    }));
  }

  render() {
  
    return (
      <div class="form-group">
        <label>Quantity: </label>
        <div class="input-group">
            <div class="input-group-btn">
              <button id="down" class="btn btn-default" onClick={()=>this.down(this.state.value)}>
                <span class="glyphicon glyphicon-minus"></span>
              </button>
            </div>
            <input type="text" id="myNumber" class="form-control input-number" value={this.state.value} />
            <div class="input-group-btn">
              <button id="up" class="btn btn-default" onClick={()=>this.up(this.state.value)}>
                <span class="glyphicon glyphicon-plus"></span>
              </button>
            </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);