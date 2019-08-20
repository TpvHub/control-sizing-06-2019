import React from "react";
import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 50
    };
  }

  increaseItem = () => {
    this.setState(prevState => {
      if (prevState.number >= 0) {
        return {
          number: prevState.number + 1
        };
      } else {
        return null;
      }
    });
  };
  
  decreaseItem = () => {
    this.setState(prevState => {
      if (prevState.number > 0) {
        return {
          number: prevState.number - 1
        };
      } else {
        return null;
      }
    });
  };

  handleChange = event => {
    this.setState({ number: Number(event.target.value) });
  };

  render() {
    return (
      <div>
        <button className="add" onClick={this.increaseItem}>+</button>
        <input
          className="input_number"
          type="number"
          value={this.state.number}
          onChange={this.handleChange}
        />
        <button className="sub" onClick={this.decreaseItem}>-</button>
      </div>
    );
  }
}

export default App;
