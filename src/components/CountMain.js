import React from "react";
import Count from "./Count";
class CountMain extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  handleChange = event => {
    //this.props.sumCount = event.target.value
    console.log(event.target.value);
    //this.textInput.current.focus();
    // this.setState({ value: event.target.value });
  }

  render() {
    return (
      <Count
        onBlur={this.handleChange}
        onClickAdd={() => this.props.handleAdd(1)}
        onClickSub={() => this.props.handleSub(1)}
        // value={this.props.sumCount}
        ref={this.textInput}
      />
    );
  }
}
export default CountMain;
