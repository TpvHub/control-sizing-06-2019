import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      temp : 0
    }
  }

  onClickASC = () => {
    this.setState({
      temp : this.state.temp +1,
    })
  }

  onClickDESC= () =>{
    this.setState({
      temp : this.state.temp - 1,
    })
  }

  render() {
    return (
      <div className="App">
          <button onClick={ this.onClickDESC }>-</button>
          <input type = "text" value ={this.state.temp}></input>
          <button onClick={ this.onClickASC }>+</button>
      </div>
    );
  }
  
}

export default App;
