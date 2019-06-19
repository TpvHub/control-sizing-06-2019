import React from "react";
class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <button onClick={this.props.handleClickSub}>-</button>
        <input
          type="text"
          value={this.props.value}
          onChange={this.props.handleChange}
        />
        <button onClick={this.props.handleClickAdd}>+</button>
      </div>
    );
  }
}
export default Count;
