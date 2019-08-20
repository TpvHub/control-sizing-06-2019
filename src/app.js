import React from "react";
import './app.css'

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        number: 50

      };
    }
  
    IncrementItem = () => {
        this.setState(prevState => {
          if(prevState.number >=0) {
            return {
              number: Number( prevState.number) + 1
            }
          } else {
            return null;
          }
        });
    }
    DecreaseItem = () => {
      this.setState(prevState => {
        if(prevState.number > 0) {
          return {
            number: prevState.number - 1
          }
        } else {
          return null;
        }
      });
    }
 
    handleChange = (event) => {
      // if(parseInt(event.target.value)==="NaN")
      // console.log("q")
      // if(parseInt(event.target.value)!=='NaN')
      // console.log(  parseInt(event.target.value))
      this.setState({number:(event.target.value) });
    }
  
    render() {
      return ( 
      <div>
        <button className="Add" onClick={this.IncrementItem}>+</button>
        <input className="input_number" type='number'  value={this.state.number} onChange={this.handleChange}/>
        <button className="Sub" onClick = {this.DecreaseItem}>-</button>
      </div>
     
      );
    }
  }
  
  export default App;