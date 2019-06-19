import React from "react";
class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <button onClick={this.props.onClickSub}>-</button>
        <input
          type="text"
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <button onClick={this.props.onClickAdd}>+</button>
      </div>
    );
  }
}
export default Count;
