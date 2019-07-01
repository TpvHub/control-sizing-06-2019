import React from "react";
import Count from "./Count";
class CountMain extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  // componentDidMount() {
  //   this.textInput.value = 6;
  //   console.log(this.textInput.value);
  // }

  componentDidUpdate() {
    this.textInput.value = this.props.sumCount;
  }

  render() {
    return (
      <Count
        //defaultValue={this.props.values.length}
        onBlur={event => {
          let value = event.target.value;
          if (!isNaN(value) && parseInt(value) >= 0) {
            let old = this.props.sumOld;
            let amount = value - old;
            amount <= 0
              ? this.props.handleSub(this.props.values.filter((item, i) => i >= value))
              : this.props.handleAdd(amount);
          }
          else{
            this.textInput.value = this.props.sumCount;
          }
        }}
        onClickAdd={() => this.props.handleAdd(1)}
        onClickSub={() => this.props.handleSub(this.props.values.filter((item, i) => i === this.props.sumCount - 1))}
        inputRef={el => this.textInput = el}
      />
    );
  }
}
export default CountMain;
