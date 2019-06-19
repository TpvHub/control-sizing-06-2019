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
    let valueNew = event.target.value;
    if (isNaN(valueNew) || parseInt(valueNew) < 0) {
      this.setState({
        count: this.state.count
      });
    } else {
      let old = this.state.count;
      let amout =  valueNew - old;
      amout <=0 ? this.handleSub(Math.abs(amout)):this.handleAdd(amout);     
    }
  };

  handleAdd = amount => {
    this.setState({
      count: this.state.count + amount,
      values: [...this.state.values, ...Array(amount).fill(0)]
    });
  };

  handleSub = (amount) => {
    this.setState(state => {
      state.count = state.count - amount;
      //state.values = state.values.filter((item, i) => state.count !== i);
      state.values = state.values.slice(0,-amount)
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
            onClickAdd={this.handleAdd.bind(this,1)}
            onClickSub={this.handleSub.bind(this,1)}
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
