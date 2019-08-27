import React from "react";

// class Counter extends React.Component {
//     render() {
//         return (
//           <div>
//             <button className="btn-sub" onClick={this.props.decreaseItem}>-</button>
//             <input
//               placeholder="Please input Number"
//               className="input-number"
//               value={this.props.value}
//               type='text'
//               onChange={this.props.handleChangeInput}
//             />
//             <button className="btn-add" onClick={this.props.increaseItem}>+</button>
//             <br/>
//             <span className="errorMessage">{this.props.errorMessage}</span>
//           </div>
//         );
//       }
// }

function Counter(props) {
    return (
      <div>
        <button className="btn-counter" onClick={props.decreaseItem}>-</button>
        <input
          type='text'
          placeholder="Please input Number"
          className="input-number"
          value={props.valueInputNumber}
          onChange={props.handleChangeInput}
          onBlur={props.blurInputNumber}
        />
        <button className="btn-counter" onClick={props.increaseItem}>+</button>
        <br/>
        <span className="errorMessage">{props.errorMessage}</span>
      </div>
    );
}

export default Counter;