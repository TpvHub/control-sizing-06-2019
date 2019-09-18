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

  addCounter = value => {
    const new_counter = {
      id: uuidv4(),
      value: value
    };
    this.setState(prevState => ({
      counters: [...prevState.counters, new_counter]
    }));
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
          if (counter.id === 0 && counter.value < 0) {
            errors[id] = "Cannot Negative Number";
            this.updateValueCounter(id, 0);
          }
        }
      }
      return counter;
    });
    this.setState({ errors: errors });
  }

  handleChange = (e, id) => {
    this.state.counters.map(async counter => {
      if (counter.id === id) {
        if (id === 0) {
          await this.updateValueCounter(id, Number(e.target.value));
          this.handleValidation(id);
          if (this.state.counters[0].value <= MAX_COUNTERS) {
            this.state.counters.splice(1, this.state.counters.length);
            for (let i = 1; i <= this.state.counters[0].value; i++) {
              this.addCounter(i);
            }
          }
        } else {
          await this.updateValueCounter(id, Number(e.target.value));
          this.handleValidation(id);
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
          if (this.state.counters[0].value < MAX_COUNTERS) {
            this.updateValueCounter(id, this.state.counters[0].value + 1);
            this.addCounter(this.state.counters[0].value + 1);
          } else {
            this.handleValidation(id);
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
            this.handleValidation(id);
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
      .slice(0, this.state.counters[0].value + 1)
      .map((counter, i) => {
        return (
          <Counter
            key={i}
            active={i === 0 ? true : false}
            increaseItem={e => {this.increaseItem(e, counter.id);}}
            decreaseItem={e => {this.decreaseItem(e, counter.id);}}
            handleChangeInput={e => {this.handleChange(e, counter.id);}}
            blurInputNumber={e => {this.blurInputNumber(e, counter.id);}}
            valueInputNumber={counter.value}
            errorMessage={this.state.errors[counter.id]}
          />
        );
      });
    return <div>{counters}</div>;
  }
}

export default App;
