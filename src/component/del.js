import React from "react";
class Del extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <button onClick={this.props.onDelete}>X</button>
      </div>
    );
  }
}
export default Del;
