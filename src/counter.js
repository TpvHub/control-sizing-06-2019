import React from "react";
import PropTypes from 'prop-types';

function Counter(props) {
    return (
      <div>
        <button className={props.active ? 'btn-counter active' : 'btn-counter'} onClick={props.decreaseItem}>-</button>
        <input
          type='text'
          placeholder="Please input Number"
          className="input-number"
          value={props.valueInputNumber}
          onChange={props.handleChangeInput}
          onBlur={props.blurInputNumber}
        />
        <button className={props.active ? 'btn-counter active' : 'btn-counter'} onClick={props.increaseItem}>+</button>
        <br/>
        <span className="errorMessage">{props.errorMessage}</span>
        <br/>
      </div>
    );
}

Counter.propTypes = {
  decreaseItem: PropTypes.func,
  increaseItem: PropTypes.func,
  handleChangeInput: PropTypes.func,
  blurInputNumber: PropTypes.func,
  valueInputNumber: PropTypes.number,
  errorMessage: PropTypes.string
};

export default Counter;

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