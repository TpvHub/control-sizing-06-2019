import React from 'react';
import  {ControlDiv} from './index';
class Sample extends React.Component {

    constructor(props) {
      super(props);
    }
  
    componentDidMount = () => {
      this.props.getall()
    }

    up = (isUp) => {
      return () => {
        if (isUp) {
          this.props.add(1);
        }
        else {
          let length = this.props.counts.length
          let id = this.props.counts[length-1]._id
          let ids = new Array(1).fill().map((item, index) => {
            return id
          })
          this.props.sub(ids);
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
      else {
        let amount = currentCount - inputNum
        const idOfCounts = this.props.counts.map((item, index) => {
          return item._id
        })
        const ids = idOfCounts.slice(-amount)
        this.props.sub(ids);
      }
    }
  
    updateSubInput = (index) => {
  
      return (evt) => {
        let inputNum = isNaN(parseInt(evt.target.value)) ? 0 : parseInt(evt.target.value);
        let id = this.props.counts[index]._id
        this.props.update(inputNum, id);
      }
    }
  
    upSub = (index, isUp) => {
      let id = this.props.counts[index]._id
      return () => {
        if (isUp) {
          this.props.update(this.props.counts[index].value + index+1, id);
        }
        else {
          this.props.update(this.props.counts[index].value - (index+1), id);
        }
      }
    }
  
    deleteControl = (index) => {
      return () => {
        let id = this.props.counts[index]._id
        let ids = new Array(1).fill().map((item, index) => {
          return id
        })
        this.props.delete(ids, index);
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
            count={item.value}
          />
          <button onClick={this.deleteControl(i)}>x</button>
        </div>
      });
    }
  
    // callAPI = ()=> {
    //     fetch("http://localhost:9000/api/count?id=5d15970f309322306ee00418")
    //         .then(res => {
    //           console.log(res.text())
    //         })
    // }
    
    // componentWillMount() {
    //     this.callAPI();
    // }

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