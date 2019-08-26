import React from "react";
import "./app.css";
import Element from "./element";

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
      if (fields["name"].match(/^[a-zA-Z]+$/)) {
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
      <Element
        decreaseItem={this.decreaseItem}
        increaseItem={this.increaseItem}
        value={this.state.number}
        handle={this.handleChange.bind(this, "name")}
        errors={this.state.errors["name"]}
      />
    );
  }
}

export default App;
