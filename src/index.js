import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// class ChangeNumber extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentNumber: 0
//     };
//   }

//   anElement = () => {
//     return (
//       <div>
//         <button onClick={this.down}>
//           -
//         </button>
//         <input type="text" name="number" value={this.state.currentNumber} onChange={this.updateInput} />
//         <button onClick={this.up}>
//           +
//         </button>
//         <button onClick={this.create}>
//           Create
//         </button>

//       </div>
//     );
//   }

//   up = () => {
//     this.setState(state => ({
//       currentNumber: state.currentNumber + 1
//     }));
//   }

//   down = () => {
//     this.setState(state => ({
//       currentNumber: state.currentNumber - 1
//     }));
//   }

//   updateInput = (evt) => {
//     this.setState({
//       currentNumber: isNaN(parseInt(evt.target.value)) ? 0 : parseInt(evt.target.value)
//     })
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           <button onClick={this.down}>
//             -
//           </button>
//           <input type="text" name="number" value={this.state.currentNumber} onChange={this.updateInput} />
//           <button onClick={this.up}>
//             +
//           </button>
//           <button onClick={this.create}>
//             Create
//           </button>
//         </div>

//         <div id="my-content">{this.anElement()}</div>
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <ChangeNumber />,
//   document.getElementById('root')
// );

class Sample extends React.Component {

  constructor() {
      super();
      this.state = {
          count: 0
      }
  }
  
  getrDivList= ()=> {
      var divList = [];
      for (var i = 1; i <= this.state.count; i++) {
          divList.push(<div key={i.toString()}>
            <button onClick={this.downSub(i)}>
              -
            </button>
            <input type="text" name="number" value={this.state.counts[`count_${i}`]} onChange={this.updateSubInput(i)}/>
            <button onClick={this.upSub(i)}>
              +
            </button>
          </div>);
      }
      return divList;
  }
//start
  up = () => {
    let inputNum = this.state.count+1
    let counts = {}
    for (var i = 1; i <= inputNum; i++) {
      let oldCountObj = counts;
      counts = {...oldCountObj, [`count_${i}`]: 0}
    }
    this.setState({
      count:  inputNum,
      counts
    });
  }

  down = () => {
    let inputNum = this.state.count-1
    let counts = {}
    for (var i = 1; i <= inputNum; i++) {
      let oldCountObj = counts;
      counts = {...oldCountObj, [`count_${i}`]: 0}
    }
    this.setState({
      count:  inputNum,
      counts
    });
  }

  updateInput = (evt) => {
    let inputNum = isNaN(parseInt(evt.target.value))? 0 : parseInt(evt.target.value);
    let counts = {}
    for (var i = 1; i <= inputNum; i++) {
      let oldCountObj = counts;
      counts = {...oldCountObj, [`count_${i}`]: 0}
    }
    this.setState({
      count:  inputNum,
      counts
    });
  }

  updateSubInput = (index) => {
    
    return (evt) => {
      let inputNum = isNaN(parseInt(evt.target.value))? 0 : parseInt(evt.target.value);
      console.log(index)
      this.setState(state => ({
        count: state.count,
        counts: {...state.counts, [`count_${index}`]:inputNum}
      }))
    }
  }

  upSub = (index) => {
    return() => {
      let inputNum = this.state.counts[`count_${index}`]+1;
      this.setState(state => ({
        count: state.count,
        counts: {...state.counts, [`count_${index}`]:inputNum}
      }))
    }
  }

  downSub = (index) => {
    return() => {
      let inputNum = this.state.counts[`count_${index}`]-1;
      this.setState(state => ({
        count: state.count,
        counts: {...state.counts, [`count_${index}`]:inputNum}
      }))
    }
  }

  display = () => {
    console.log(JSON.stringify(this.state,0,2))
  }
//end
  render() {
      return (
        <div>
          <div>
            <button onClick={this.down}>
              -
            </button>
            <input type="text" name="number" value={this.state.count} onChange={this.updateInput} />
            <button onClick={this.up}>
              +
            </button>
          </div>
          <button onClick={this.display}>test</button>
          <div style={{marginTop: 20+'px'}}>
              { this.getrDivList() }
              
          </div>
        </div>
      );
  }
}
ReactDOM.render(
  <Sample />,
  document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
