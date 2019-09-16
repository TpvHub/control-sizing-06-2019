import React from "react";
import "./app.css";
import Counter from "./counter";
const uuidv4 = require("uuid/v4");
const MAX_COUNTERS = 20;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: [{ id: 0, value: 0 }],
      errors: []
    };
  }

  updateValueCounter = (id, value) => {
    this.setState(prevState => {
      prevState.counters = prevState.counters.map(counter => {
        if (counter.id === id) {
          return {
            ...counter,
            value: value
          };
        }
        return counter;
      });
    });
  };

  handleValidation(id) {
    let errors = [];
    this.state.counters.map(counter => {
      if (counter.id === id) {
        if (!counter.value) {
          errors[id] = "Cannot be empty";
        }
        if (typeof counter.value !== "undefined") {
          if (isNaN(counter.value)) {
            errors[id] = "Only Number";
            this.updateValueCounter(id, 0);
          } else if (counter.id === 0 && counter.value > MAX_COUNTERS) {
            errors[id] = `Maximum Number is ${MAX_COUNTERS}`;
          }
        }
        this.setState({ errors: errors });
      }
      return counter;
    });
  }

  handleChange = (e, id) => {
    this.state.counters.map(async counter => {
      if (counter.id === id) {
        if (id === 0) {
          await this.updateValueCounter(id, Number(e.target.value));
          this.handleValidation(id);
          this.state.counters.splice(1, this.state.counters.length);
          if (this.state.counters[0].value <= MAX_COUNTERS) {
            for (let i = 1; i <= this.state.counters[0].value; i++) {
              const new_value = {
                id: uuidv4(),
                value: i
              };
              this.setState(prevState => ({
                counters: [...prevState.counters, new_value]
              }));
            }
          }
        } else {
          await this.updateValueCounter(id, Number(e.target.value));
          this.handleValidation(id);
          this.setState(prevState => ({
            counters: [...prevState.counters]
          }));
        }
      }
      return counter;
    });
  };

  blurInputNumber = (e, id) => {
    this.setState({ errors: "" });
  };

  increaseItem = (e, id) => {
    this.state.counters.map(counter => {
      if (counter.id === id) {
        if (id === 0) {
          if (this.state.counters.length <= MAX_COUNTERS) {
            this.updateValueCounter(id, this.state.counters[0].value + 1);
            const new_value = {
              id: uuidv4(),
              value: this.state.counters[0].value + 1
            };
            this.setState(prevState => ({
              counters: [...prevState.counters, new_value]
            }));
          } else {
            let errors = [];
            errors[id] = `Maximum Number is ${MAX_COUNTERS}`;
            this.setState({ errors: errors });
            this.updateValueCounter(0, MAX_COUNTERS);
          }
        } else {
          let index = this.state.counters.findIndex(x => x.id === id);
          this.updateValueCounter(id, counter.value + index);
          this.setState(prevState => ({
            counters: [...prevState.counters]
          }));
        }
      }
      return counter;
    });
  };

  decreaseItem = (e, id) => {
    this.state.counters.map(counter => {
      if (counter.id === id) {
        if (id === 0) {
          if (counter.value === 0) this.updateValueCounter(0, 0);
          else {
            this.updateValueCounter(id, counter.value - 1);
            this.state.counters.splice(this.state.counters[0].value, 1);
            this.setState(prevState => ({
              counters: [...prevState.counters]
            }));
          }
        } else {
          let index = this.state.counters.findIndex(x => x.id === id);
          this.updateValueCounter(id, counter.value - index);
          this.setState(prevState => ({
            counters: [...prevState.counters]
          }));
        }
      }
      return counter;
    });
  };

  render() {
    const counters = this.state.counters
      .slice(1, this.state.counters[0].value + 1)
      .map((counter, i) => {
        return (
          <Counter
            key={i}
            increaseItem={e => {
              this.increaseItem(e, counter.id);
            }}
            decreaseItem={e => {
              this.decreaseItem(e, counter.id);
            }}
            handleChangeInput={e => {
              this.handleChange(e, counter.id);
            }}
            blurInputNumber={e => {
              this.blurInputNumber(e, counter.id);
            }}
            valueInputNumber={counter.value}
            errorMessage={this.state.errors[counter.id]}
          />
        );
      });

    return (
      <div>
        <Counter
          active={true}
          increaseItem={e => {
            this.increaseItem(e, 0);
          }}
          decreaseItem={e => {
            this.decreaseItem(e, 0);
          }}
          handleChangeInput={e => {
            this.handleChange(e, 0);
          }}
          blurInputNumber={e => {
            this.blurInputNumber(e, 0);
          }}
          valueInputNumber={this.state.counters[0].value}
          errorMessage={this.state.errors[0]}
        />
        {counters}
      </div>
    );
  }
}

export default App;
