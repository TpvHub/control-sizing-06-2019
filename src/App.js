import React from "react";
import "./App.css";
import Count from "./component/count";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      values: []
    };
  }

  handleInput = event => {
    let value = event.target.value;
    if (isNaN(value) || parseInt(value) < 0) {
      this.setState({
        count: this.state.count
      });
    } else {
      this.state.values = [];
      for (let i = 0; i < value; i++) {
          this.state.values.push(0);
      }
      this.setState({ count: parseInt(event.target.value), values: this.state.values });
    }
  };

  handleAdd = () => {
    this.setState({
      count: this.state.count + 1,
      values: [...this.state.values, 0]
    });
  };

  handleSub = () => {
    this.setState(state => {
      state.count = state.count - 1;
      state.values = state.values.filter((item, i) => state.count !== i);
      return state;
    });
  };

  handleChildInput = (id, event) => {
    let temp = event.target.value;
    if (isNaN(temp)) {
      this.setState(state => {
        state.values = state.values.map((item, i) => {
          return item;
        });
        return state;
      });
    } else
      this.setState(state => {
        state.values = state.values.map((item, i) => {
          if (i === id) {
            return parseInt(temp);
          } else {
            return item;
          }
        });
        return state;
      });
  };

  handleChildAdd = id => {
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

  handleChildSub = id => {
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
          <Count
            onChange={this.handleInput}
            onClickAdd={this.handleAdd}
            onClickSub={this.handleSub}
            value={this.state.count}
          />
        </div>
        <div className="App2">
          {this.state.values.map((item, i) => {
            return (
              <div key={i}>
                <Count
                  onChange={this.handleChildInput.bind(this, i)}
                  onClickAdd={this.handleChildAdd.bind(this, i)}
                  onClickSub={this.handleChildSub.bind(this, i)}
                  value={item}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
