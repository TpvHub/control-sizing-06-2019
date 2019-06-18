import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class ChangeNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {a: ''};

    // This binding is necessary to make `this` work in the callback
    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  up() {
    this.setState(state => ({
      a: state.a+1
    }));
  }

  down() {
    this.setState(state => ({
      a: state.a-1
    }));
  }

  updateInput(evt) {
    this.setState({
      a: isNaN(parseInt(evt.target.value)) ? 0 : parseInt(evt.target.value)
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.down}>
          -
        </button>
        <input type="text" name="number" value={this.state.a} onChange={this.updateInput}/>
        <button onClick={this.up}>
          +
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <ChangeNumber />,
  document.getElementById('root')
);
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
