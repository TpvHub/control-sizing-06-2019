import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      arr: []
    };
  }


  onTodoChange(value){
    value = (isNaN(parseInt(value)) || parseInt(value) < 0) ? 0 : parseInt(value);  
    this.state.arr = [];
    for(let i = 0; i < value; i++) {
      this.state.arr.push(0);
    }
    this.setState({
      value: value,
    });
  }
  
  down(value_down) {
    this.state.arr = [];
    let down = parseInt(value_down) - 1;
    if(value_down > 0){
      for(let i = 0; i < down; i++) {
        this.state.arr.push(0);
      }
      this.setState(() => ({
        value: down,
      }));
    }else{
      this.setState(state => ({
        value: 0,
      }));
    }
  }

  up(value_up) {
    let up = parseInt(value_up) + 1;
    this.setState(() => ({
      value: up,
    }));
    this.state.arr = [];
    for(let i = 0; i < up; i++) {
      this.state.arr.push(0);
    }
    console.log(this.state.arr);
  }

  resetDown(index){
    index = parseInt(index);
    let arrNew = this.state.arr;
    arrNew[index] = 0;
    this.setState(() => ({
      arr: arrNew,
    }));
  }

  setUp(index){
    index = parseInt(index);
    let arrNew = this.state.arr;
    arrNew[index] = index + 1;
    this.setState(() => ({
      arr: arrNew,
    }));    
  }

  render() {  
    return (
      <div className="container">
        <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">
          <div className="form-group">
            <label>Quantity: </label>
            <div className="input-group">
                <div className="input-group-btn">
                  <button id="down" className="btn btn-default" onClick={()=>this.down(this.state.value)}>
                    <span className="glyphicon glyphicon-minus"></span>
                  </button>
                </div>
                <input type="text" id="myNumber" className="form-control input-number" onChange={(e) => this.onTodoChange(e.target.value)} value={this.state.value} />
                <div className="input-group-btn">
                  <button id="up" className="btn btn-default" onClick={()=>this.up(this.state.value)}>
                    <span className="glyphicon glyphicon-plus"></span>
                  </button>
                </div>
            </div>
          </div>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6"> 
        {
          this.state.arr.map((item, index) => (
            <div className="form-group">
              <div className="input-group">
                  <div className="input-group-btn">
                    <button id="down" className="btn btn-default" onClick={()=>this.resetDown(index)}>
                      <span className="glyphicon glyphicon-minus"></span>
                    </button>
                  </div>
                  <input type="text" id="myNumber" className="form-control input-number" value={item} />
                  <div className="input-group-btn">
                    <button id="up" className="btn btn-default" onClick={()=>this.setUp(index)}>
                      <span className="glyphicon glyphicon-plus"></span>
                    </button>
                  </div>
              </div>
            </div> 
          ))
        }
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);