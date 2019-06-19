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
    if (isNaN(event.target.value)) {
      this.setState({
        count: 0
      });
    } else this.setState({ count: parseInt(event.target.value) });
  };

  onClickAdd = () => {
    this.setState({
      count: this.state.count + 1,
      values: [...this.state.values, 0]
    });
  };

  onClickSub = () => {
    this.setState(state => {
      state.count = state.count - 1;
      state.values = state.values.filter((item, i) => state.count !== i);
      return state;
    });
  };

  onClickChildAdd = id => {
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

  onClickChildSub = id => {
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
            handleChange={this.handleInput}
            handleClickAdd={this.onClickAdd}
            handleClickSub={this.onClickSub}
            value={this.state.count}
          />
        </div>
        <div className="App2">
          {this.state.values.map((item, i) => {
            return (
              <div key={i}>
                <Count
                  handleClickAdd={this.onClickChildAdd.bind(this,i)}
                  handleClickSub={this.onClickChildSub.bind(this,i)}
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
