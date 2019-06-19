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
    this.setState(state => ({
      value: value,
    }));
  }
  
  down(value_down) {
    let arrNew = [];
    let down = parseInt(value_down) - 1;
    let arrOld = this.state.arr;
    if(down > 0){
      for(let i = 0; i < down; i++) {
        arrNew[i] = arrOld[i];
      }
      this.setState(() => ({
        value: down,
        arr:arrNew
      }));
    }else{
      this.setState(state => ({
        value: 0,
        arr:arrNew
      }));
    }
  }

  up(value_up) {
    let up = parseInt(value_up) + 1;
    let arrNew = [];
    let arrOld = this.state.arr;
    for(let i = 0; i < up; i++) {
      if(i>=arrOld.length){
        arrNew.push(0);
      }else{
        arrNew[i] = arrOld[i];
      }
    }
    this.setState(state => ({
      value: up,
      arr:arrNew
    }));
  }

  resetDown(index,item){
    index = parseInt(index);
    item = parseInt(item);
    let arrNew = this.state.arr;
    arrNew[index] = item - index - 1;
    this.setState(() => ({
      arr: arrNew,
    })); 
  }

  setUp(index,item){
    index = parseInt(index);
    item = parseInt(item);
    let arrNew = this.state.arr;
    arrNew[index] = index + item + 1;
    console.log(arrNew);
    this.setState(() => ({
      arr: arrNew,
    }));    
  }

  onTodoChangeItem(value,index){
    value = (isNaN(parseInt(value)) || parseInt(value) < 0) ? 0 : parseInt(value);  
    index = parseInt(index);
    let arrNew = this.state.arr;
    arrNew[index] = value;
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
                    <button id="down" className="btn btn-default" onClick={()=>this.resetDown(index,item)}>
                      <span className="glyphicon glyphicon-minus"></span>
                    </button>
                  </div>
                  <input type="text" id="myNumber" className="form-control input-number" value={item} onChange={(e) => this.onTodoChangeItem(e.target.value,index)}/>
                  <div className="input-group-btn">
                    <button id="up" className="btn btn-default" onClick={()=>this.setUp(index,item)}>
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