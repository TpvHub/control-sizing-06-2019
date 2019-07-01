import React from "react";
class Count extends React.Component {

  // componentDidMount() {
  //   const { dispatch} = this.props
  //   dispatch()
  // }

  render() {
    return (
      <div>
        <button onClick={this.props.onClickSub}>-</button>
        <input
          type="text"
          onBlur={this.props.onBlur}
          ref={this.props.inputRef}
          defaultValue={this.props.defaultValue}
          onChange={this.props.onChange}
          value={this.props.value}
        />
        <button onClick={this.props.onClickAdd}>+</button>
      </div>
    );
  }
}
export default Count;
