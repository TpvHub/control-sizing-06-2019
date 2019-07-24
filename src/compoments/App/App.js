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
import FormError from '../FormError/FormError';
import FadeLoader from 'react-spinners/FadeLoader';


class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            inputValue: this.props.count.list.length,
            checkInput: true,
            loading:true,
        }
    }
    
    componentWillMount = async () => {
        await this.props.getCount();  
        this.setState({
            inputValue: this.props.count.list.length,
            loading: false,
        }); 
    }

    handleUpParent = async () => {
        await this.props.addCounts(1);
        this.setState({
            inputValue: this.props.count.list.length
        });
    }

    handleDownParent = async () => {
        await this.props.subCounts(1);
        this.setState({
            inputValue: this.props.count.list.length
        });
    }

    handleDeleteParent = async () => {
        await this.props.subCounts(this.props.count.list.length)
        this.setState({
            inputValue: this.props.count.list.length
        });
    }

    handleBlurParent = async (e) => {
        if((e.target.value != this.props.count.list.length) && this.state.checkInput){
            let distance = e.target.value - this.props.count.list.length
            if (distance > 0) {
                this.setState({
                    loading: true
                });
                await this.props.addCounts(distance)
                this.setState({
                    loading: false
                });
            } else {
                this.props.subCounts(distance * -1)
            }
        }
    }

    handleChangeInput = (e) => {
        let value  = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value);
        this.setState({
            inputValue: value,
            checkInput: value > 100 ? false : true
        });
    }

    handleDeleteChildren = async (id) => {
        await this.props.deleteCount(id);
        this.setState({
            inputValue: this.props.count.list.length
        });
    }

    render() {

        return (
            <div className="container">
                <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">
                    <div className="form-group">
                        <label>Quantity</label> 
                        <ControlSize
                            value={ this.state.inputValue}
                            onTodoChange={this.handleChangeInput}
                            onTodoBlur={this.handleBlurParent}
                            up={this.handleUpParent}
                            down={this.handleDownParent}
                            delete={this.handleDeleteParent}
                            disabled={this.state.loading}
                        />
                        <FormError
                            isHidden = {this.state.checkInput}
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
                                    onTodoBlur={this.handleChangeInput}
                                    onTodoChange={(e) => { this.props.updateCount(item.id, isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)) }}
                                    up={() => { this.props.updateCount(item.id, item.value + index + 1) }}
                                    down={() => { this.props.updateCount(item.id, item.value - index - 1) }}
                                    delete={() => { this.handleDeleteChildren(item.id) }}
                                />
                            </div>
                        ))
                    }
                    <div className={this.state.loading ? 'sweet-loading': 'hidden'}>
                        <FadeLoader
                            sizeUnit={"px"}
                            size={100}
                            color={'red'}
                            loading={this.state.loading}
                        />
                    </div>                    
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
