import React from "react";
import "./App.css";
import $ from "jquery";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      values: []
    };
  }

  handleInput = event => {
    if (isNaN(event.target.value)) {
      this.setState({
        count: 0
      });
    } else this.setState({ count: parseInt(event.target.value) });
  };

  onClickASC = () => {
    this.setState({
      count: this.state.count + 1,
      values: [...this.state.values, 0]
    });
    console.log(this.state.values);
  };

  onClickDESC = () => {
    this.setState(state => {
      state.count = state.count - 1;
      state.values = state.values.filter((item, i) => state.count !== i);
      return state;
    });
  };

  onClickChildASC = id => {
    this.setState(
      state => {
        state.values = state.values.map((item, i) => {
          if (i === id) {
            return item + id + 1;
          } else {
            return item;
          }
        });
        return state;
      },
      () => {
        console.log(this.state.values);
      }
    );
  };

  onClickChildDESC = id => {
    this.setState(state => {
      state.values = state.values.map((item, i) => {
        if (i === id) {
          return item - (id + 1);
        } else {
          return item;
        }
      });
      return state;
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App1">
          <button onClick={this.onClickDESC}>-</button>
          <input
            type="text"
            value={this.state.count}
            onChange={this.handleInput}
          />
          <button onClick={this.onClickASC}>+</button>
        </div>
        <div className="App2">
          {this.state.values.map((item, i) => {
            return (
              <div key={i}>
                <button onClick={this.onClickChildDESC.bind(this, i)}>-</button>
                <input type="text" value={item} />
                <button onClick={this.onClickChildASC.bind(this, i)}>+</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
