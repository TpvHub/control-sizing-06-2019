import React from "react";
import "./app.css";
import Counter from "./counter";

class App extends React.Component {
  constructor(props) {
    super(props);
    const initialStateOfList = [
      { id: 0, value: 0 },
      { id: 1, value: 1 },
      { id: 2, value: 2 },
      { id: 3, value: 3 },
      { id: 4, value: 4 },
      { id: 5, value: 5 },
      { id: 6, value: 6 },
      { id: 7, value: 7 }
    ];
    this.state = {
      counters: initialStateOfList,
      fields: {},
      errors: {}
    };
  }

  updateValueCounter = (index, value) => {
    const counters = this.state.counters;
    counters[index].value = value;
    this.setState({
      counters
    });
  };

  handleValidation(index) {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields[index]) {
      formIsValid = false;
      errors[index] = "Cannot be empty";
    }
    if (typeof fields[index] !== "undefined") {
      // match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
      if (fields[index].match(/^(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)) {
        formIsValid = false;
        errors[index] = "Only Number";
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  handleChange = (e, index) => {
    // this.updateValueCounter(index,e.target.value);
    let fields = this.state.fields;
    fields[index] = e.target.value;
    if (this.handleValidation(index))
      this.updateValueCounter(index, Number(fields[index]));
    else this.updateValueCounter(index, 0);
  };

  blurInputNumber = (e, index) => {
    let fields = this.state.fields;
    fields[index] = e.target.value;
    if (this.handleValidation(index))
      this.updateValueCounter(index, Number(fields[index]));
    else this.updateValueCounter(index, 0);
  };

  increaseItem = (e, index) => {
    const counters = this.state.counters;
    if (index === 0) this.updateValueCounter(index, counters[index].value + 1);
    this.updateValueCounter(index, counters[index].value + index);
  };

  decreaseItem = (e, index) => {
    const counters = this.state.counters;
    if (index === 0) {
      this.updateValueCounter(index, counters[index].value - 1);
      this.updateValueCounter(
        this.state.counters[0].value + 1,
        this.state.counters[0].value + 1
      );
    }
    this.updateValueCounter(index, counters[index].value - index);
  };

  render() {
    const counter = this.state.counters
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
        {counter}
      </div>
    );
  }
}

export default App;

// import React from "react";
// import "./app.css";
// import Counter from "./counter";

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       counters: [{ id: 0, value: 13 },{ id: 1, value: 3 },{ id: 2, value: 1 },{ id: 3, value: 10 }],
//       fields: {},
//       errors: {}
//     };
//   }

//   updateValueCounter = (index,value) => {
//     const counters = this.state.counters;
//     counters[index].value = value;
//     this.setState({
//       counters
//     });
//   }

//   handleValidation(index) {
//     let fields = this.state.fields;
//     let errors = {};
//     let formIsValid = true;
//     if (!fields[index]) {
//       formIsValid = false;
//       errors[index] = "Cannot be empty";
//     }
//     if (typeof fields[index] !== "undefined") {
//       // match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
//       if (fields[index].match(/^(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)) {
//         formIsValid = false;
//         errors[index] = "Only Number";
//       }
//     }
//     this.setState({ errors: errors });
//     return formIsValid;
//   }

//   handleChange = (e, index) => {
//     this.updateValueCounter(index,e.target.value)
//   };

//   blurInputNumber = (e, index) => {
//     let fields = this.state.fields;
//     fields[index] = e.target.value;
//     if (this.handleValidation(index))
//       this.updateValueCounter(index, Number(fields[index]))
//     else this.updateValueCounter(index, 0);
//   };

//   increaseItem = (e, index) => {
//     const counter = this.state.counters;
//     this.updateValueCounter(index,counter[index].value + 1)
//   };

//   decreaseItem = (e, index) => {
//     const counter = this.state.counters;
//     this.updateValueCounter(index,counter[index].value - 1)
//   };

//   render() {
//     return (
// <div>
//   {this.state.counters.map((counter, i) => {
//     return (
//       <Counter key={i}
//         increaseItem={e => {this.increaseItem(e, i);}}
//         decreaseItem={e => {this.decreaseItem(e, i);}}
//         handleChangeInput={e => {this.handleChange(e, i);}}
//         blurInputNumber={e => {this.blurInputNumber(e, i);}}
//         valueInputNumber={counter.value}
//         errorMessage={this.state.errors[i]}
//       />
//     );
//   })}
// </div>
//     );
//   }
// }

// export default App;

// import React from "react";
// import "./app.css";
// import Counter from "./counter";

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       number: 0,
//       fields: {},
//       errors: {}
//     };
//   }

//   handleValidation() {
//     let fields = this.state.fields;
//     let errors = {};
//     let formIsValid = true;
//     if (!fields["name"]) {
//       formIsValid = false;
//       errors["name"] = "Cannot be empty";
//     }
//     if (typeof fields["name"] !== "undefined") {
//       // match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
//       if (fields["name"].match(/^(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)) {
//         formIsValid = false;
//         errors["name"] = "Only Number";
//         this.setState({ number: "" });
//       }
//     }
//     this.setState({ errors: errors });
//     return formIsValid;
//   }

//   handleChange = (field, e) => {
//     this.setState({ number: e.target.value });
//   };

//   blurInputNumber = (field, e) => {
//     let fields = this.state.fields;
//     fields[field] = e.target.value;
//     if (this.handleValidation())
//       this.setState({ number: Number(fields[field]) });
//     else this.setState({ number: 0 });
//   };

//   increaseItem = () => {
//     this.setState(prevState => {
//       return {
//         number: prevState.number + 1
//       };
//     });
//   };

//   decreaseItem = () => {
//     this.setState(prevState => {
//       return {
//         number: prevState.number - 1
//       };
//     });
//   };

//   render() {
//     return (
//       <Counter
//         decreaseItem={this.decreaseItem}
//         increaseItem={this.increaseItem}
//         valueInputNumber={this.state.number}
//         handleChangeInput={this.handleChange.bind(this, "name")}
//         blurInputNumber={this.blurInputNumber.bind(this, "name")}
//         errorMessage={this.state.errors["name"]}
//       />
//     );
//   }
// }

// export default App;

// import React from "react";
// import "./app.css";
// import Counter from "./counter";

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       counters: [{ id: 0, value: 13 }, { id: 1, value: 19 },{ id: 1, value: 19 },{ id: 1, value: 19 }],
//       fields: {},
//       errors: {}
//     };
//   }

//   updateValueCounter = (id, value) => {
//     this.setState(prevState => {
//       prevState.counters = prevState.counters.map(counter => {
//         if (counter.id === id) {
//           return {
//             ...counter,
//             value: value
//           };
//         }
//         return counter;
//       });
//     });
//   };

//   handleValidation() {
//     let fields = this.state.fields;
//     let errors = {};
//     let formIsValid = true;
//     if (!fields["name"]) {
//       formIsValid = false;
//       errors["name"] = "Cannot be empty";
//       this.updateValueCounter(0, 0);
//     }
//     if (typeof fields["name"] !== "undefined") {
//       // match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
//       if (fields["name"].match(/^(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)) {
//         formIsValid = false;
//         errors["name"] = "Only Number";
//         this.updateValueCounter(0, 0);
//       }
//     }
//     this.setState({ errors: errors });
//     return formIsValid;
//   }

//   handleChange = (e, index) => {
//     const counter = this.state.counters;
//     counter[index].value = e.target.value;
//     this.setState({
//       counter
//     });
//   };

//   blurInputNumber = (field, e) => {
//     let fields = this.state.fields;
//     fields[field] = e.target.value;
//     if (this.handleValidation())
//       this.updateValueCounter(0, Number(fields[field]));
//     else this.updateValueCounter(0, 0);
//   };

//   increaseItem = (e, index) => {
//     const counter = this.state.counters;
//     counter[index].value = counter[index].value + 1;
//     this.setState({
//       counter
//     });
//   };

//   decreaseItem = (e, index) => {
//     const counter = this.state.counters;
//     counter[index].value = counter[index].value - 1;
//     this.setState({
//       counter
//     });
//   };

//   render() {
//     return (
//       <div>
//         {this.state.counters.map((counter, i) => {
//           return (
//             <Counter
//               increaseItem={e => {this.increaseItem(e, i);}}
//               decreaseItem={e => {this.decreaseItem(e, i);}}
//               handleChangeInput={e => {this.handleChange(e, i);}}
//               blurInputNumber={this.blurInputNumber.bind(this, "name")}
//               valueInputNumber={this.state.counters[i].value}
//               errorMessage={this.state.errors["name"]}
//             />
//           );
//         })}
//       </div>
//     );
//   }
// }

// export default App;
