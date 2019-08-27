import React from "react";
import "./app.css";
import Counter from "./counter";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      fields: {},
      errors: {}
    };
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }
    if (typeof fields["name"] !== "undefined") {
      // match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
      if (fields["name"].match(/^(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)) {
        formIsValid = false;
        errors["name"] = "Only Number";
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  handleChange = (field, e) => {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    if (this.handleValidation())
      this.setState({ number: Number(fields[field]) });
    this.setState({ fields });
  };

  blurInputNumber = (field, e) => {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    if (this.handleValidation())
      this.setState({ number: Number(fields[field]) });
    this.setState({ fields });
  };

  increaseItem = () => {
    if (this.handleValidation()) {
      this.setState(prevState => {
        return {
          number: prevState.number + 1
        };
      });
    }
  };

  decreaseItem = () => {
    if (this.handleValidation()) {
      this.setState(prevState => {
        return {
          number: prevState.number - 1
        };
      });
    }
  };

  render() {
    return (
      <Counter
        decreaseItem={this.decreaseItem}
        increaseItem={this.increaseItem}
        valueInputNumber={this.state.number}
        handleChangeInput={this.handleChange.bind(this, "name")}
        blurInputNumber={this.blurInputNumber.bind(this, "name")}
        errorMessage={this.state.errors["name"]}
      />
    );
  }
}

export default App;
