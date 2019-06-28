import React from "react";
class Del extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onDelete}>X</button>
      </div>
    );
  }
}
export default Del;
