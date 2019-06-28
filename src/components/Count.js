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
          //value={this.props.value}
          onBlur={this.props.onBlur}
        />
        <button onClick={this.props.onClickAdd}>+</button>
      </div>
    );
  }
}
export default Count;
