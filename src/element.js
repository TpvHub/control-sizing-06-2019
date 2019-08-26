import React from "react";

class Element extends React.Component {
    render() {
        return (
          <div>
            <button className="btn-sub" onClick={this.props.decreaseItem}>-</button>
            <input
              ref="name"
              placeholder="Please input Number"
              className="input-number"
              value={this.props.value}
              type='text'
              onChange={this.props.handle}
            />
            <button className="btn-add" onClick={this.props.increaseItem}>+</button>
            <br/>
            <span className="error">{this.props.errors}</span>
          </div>
        );
      }
}

export default Element;