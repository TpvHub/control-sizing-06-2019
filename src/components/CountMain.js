import React from "react";
import Count from "./Count";
class CountMain extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    //this.textInput.current.focusTextInput();
  }
  
  render() {
    return (
      <Count
        onChange={event => {
          let value = event.target.value;
          if (!isNaN(value) && parseInt(value) >= 0) {
            let old = this.props.sumOld;
            let amount = value - old;
            amount <= 0
              ? this.props.handleSub(Math.abs(amount))
              : this.props.handleAdd(amount);
          }
        }
        }
        onBlur={this.handleChange}
        onClickAdd={() => this.props.handleAdd(1)}
        onClickSub={() => this.props.handleSub(1)}
        value={this.props.sumCount}
        ref={this.textInput}
      />
    );
  }
}
export default CountMain;
