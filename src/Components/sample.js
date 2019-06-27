import React from 'react';
import  {ControlDiv} from './index';
class Sample extends React.Component {

    constructor(props) {
      super(props);
    }
  
    up = (isUp) => {
      return () => {
        if (isUp) {
          this.props.add(1);
        }
        else {
          this.props.sub(1);
        }
      }
    }
  
    updateInput = (evt) => {
      let inputNum = isNaN(parseInt(evt.target.value)) ? 0 : parseInt(evt.target.value);
      if (inputNum < 0) inputNum = 0;
      const currentCount = this.props.counts.length;
      if(inputNum > currentCount) {
        this.props.add(inputNum - currentCount);
      }
      else this.props.sub(currentCount - inputNum);
      }
  
    updateSubInput = (index) => {
  
      return (evt) => {
        let inputNum = isNaN(parseInt(evt.target.value)) ? 0 : parseInt(evt.target.value);
        this.props.update(inputNum, index);
      }
    }
  
    upSub = (index, isUp) => {
      return () => {
        if (isUp) {
          this.props.update(this.props.counts[index] + index+1, index);
        }
        else {
          this.props.update(this.props.counts[index] - (index+1), index);
        }
      }
    }
  
    deleteControl = (index) => {
      return () => {
        this.props.delete(index);
      }
    }
    display = () => {
      console.log(JSON.stringify(this.props, 0, 2));
    }
  
    getDivList = () => {
  
      return this.props.counts.map((item, i) => {
        return <div key={i}>
          <ControlDiv
            up={this.upSub(i, true)}
            down={this.upSub(i, false)}
            update={this.updateSubInput(i)}
            count={item}
          />
          <button onClick={this.deleteControl(i)}>x</button>
        </div>
      });
    }
  
    render() {
      return (
        <div>
          <ControlDiv
            up={this.up(true)}
            down={this.up(false)}
            update={this.updateInput}
            count={this.props.counts.length}
          />
  
          <button onClick={this.display}>test</button>
          <div style={{ marginTop: 20 + 'px' }}>
            {this.getDivList()}
  
          </div>
        </div>
      );
    }
  }

  export default Sample