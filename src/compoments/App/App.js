import React from 'react';
import './App.css';
import ControlSize from '../ControlSize/ControlSize';
import '../../reducers/index.js';
import { connect } from 'react-redux';
import { 
    addCounts, 
    getCount,
    subCounts,
    updateCount,
    deleteCount
} from "../../actions/count";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentWillMount = () => {
        this.props.getCount();    
    }

    handleUpParent = () => {
        this.props.addCounts(1)
    }

    handleDownParent = () => {
        this.props.subCounts(1)
    }

    handleDeleteParent = () => {
        this.props.subCounts(this.props.count.list.length)
    }

    handleChangeParent = (e) => {
        let distance = e.target.value - this.props.count.list.length
        if (distance > 0) {
            this.props.addCounts(distance)
        } else {
            this.props.subCounts(distance * -1)
        }
    }

    render() {
        return (
            <div className="container">
                <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">
                    <div className="form-group">
                        <label>Quantity</label> 
                        <ControlSize
                            value={this.props.count.list.length}
                            onTodoChange={this.handleChangeParent}
                            up={this.handleUpParent}
                            down={this.handleDownParent}
                            delete={this.handleDeleteParent}
                        />
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">
                    {
                        this.props.count.list.map((item, index) => (
                            <div className="form-group" key={index}>
                                <label>Index {index}</label>
                                <ControlSize key={item.value}
                                    value={item.value}
                                    onTodoChange={(e) => { this.props.updateCount(item.id, isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)) }}
                                    up={() => { this.props.updateCount(item.id, item.value + index + 1) }}
                                    down={() => { this.props.updateCount(item.id, item.value - index - 1) }}
                                    delete={() => { this.props.deleteCount(item.id) }}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    addCounts,
    getCount,
    subCounts,
    updateCount,
    deleteCount,
}

const mapStateToProps = (store) => {
    return {
        count: store.count,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
