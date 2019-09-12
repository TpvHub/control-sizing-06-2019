import React from "react";
import "./app.css";
import Counter from "./counter";

class App extends React.Component {
  constructor(props) {
    super(props);
    const initialStateOfList = [
      { id: 0, value: 0 },
      { id: 1, value: 1 },{ id: 2, value: 2 },{ id: 3, value: 3 },{ id: 4, value: 4 },{ id: 5, value: 5 },
      { id: 6, value: 6 },{ id: 7, value: 7 },{ id: 8, value: 8 },{ id: 9, value: 9 },{ id: 10, value: 10 }
    ];
    this.state = {
      counters: initialStateOfList,
      errors: []
    };
  }

  updateValueCounter = (id, value) => {
    const { counters } = this.state;
    if(id<=counters.length-1){
      counters[id].value = value;
      this.setState({
        counters
      });
    }
  };

  handleValidation(index) {
    let counters = this.state.counters;
    let errors = [];
    let formIsValid = true;
    if (!counters[index].value) {
      formIsValid = false;
      errors[index] = "Cannot be empty";
    }
    if (typeof counters[index].value !== "undefined") {
      if (isNaN(counters[index].value)) {
        formIsValid = false;
        errors[index] = "Only Number";
      } else if (index===0 && counters[index].value >= counters.length) {
        errors[index] = "Maximum counter is 10";
        this.updateValueCounter(index,counters.length-1)
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  handleChange = (e, index) => {
    // this.updateValueCounter(index,(e.target.value));
    let counters = this.state.counters;
    counters[index].value = e.target.value;
    if (this.handleValidation(index)) {
      this.updateValueCounter(index, Number(counters[index].value));
    } 
    else this.updateValueCounter(index, 0);
  };

  blurInputNumber=(e, index)=>{
    this.setState({ errors: "" });
  }

  increaseItem = (e, index) => {
    let counters = this.state.counters;
    if (index === 0) {
      this.updateValueCounter(index, counters[index].value + 1);
      this.handleValidation(index)
    }
    this.updateValueCounter(index, counters[index].value + index);
  };

  decreaseItem = (e, index) => {
    let counters = this.state.counters;
    if (index === 0) {
      this.setState({ errors: "" });
      this.updateValueCounter(index, counters[index].value - 1);
    }
    this.updateValueCounter(index, counters[index].value - index);
    this.updateValueCounter(
      this.state.counters[0].value + 1,
      this.state.counters[0].value + 1
    );
  };

  render() {
    const counters = this.state.counters
      .slice(1, this.state.counters[0].value + 1)
      .map((counter, i) => {
        return (
          <Counter
            key={i}
            increaseItem={e => {
              this.increaseItem(e, i + 1);
            }}
            decreaseItem={e => {
              this.decreaseItem(e, i + 1);
            }}
            handleChangeInput={e => {
              this.handleChange(e, i + 1);
            }}
            blurInputNumber={e => {
              this.blurInputNumber(e, i + 1);
            }}
            valueInputNumber={counter.value}
            errorMessage={this.state.errors[i + 1]}
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
