import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 4};
  }

  onTodoChange(value){
    value = isNaN(parseInt(value)) ? 0 : parseInt(value);
    this.setState({
      value: value
    });
  }
  
  down() {
    this.setState(state => ({
      value: parseInt(state.value) - 1
    }));
  }

  up() {
    this.setState(state => ({
      value: parseInt(state.value) + 1
    }));
  }

  render() {  
    return (
      <div className="form-group">
        <label>Quantity: </label>
        <div className="input-group">
            <div className="input-group-btn">
              <button id="down" className="btn btn-default" onClick={()=>this.down(this.state.value)}>
                <span className="glyphicon glyphicon-minus"></span>
              </button>
            </div>
            <input type="text" id="myNumber" className="form-control input-number" onChange={(e) => this.onTodoChange(e.target.value)} value={this.state.value} />
            <div className="input-group-btn">
              <button id="up" className="btn btn-default" onClick={()=>this.up(this.state.value)}>
                <span className="glyphicon glyphicon-plus"></span>
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