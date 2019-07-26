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
    deleteCount,
    changeCount,
} from "../../actions/count";
import FormError from '../FormError/FormError';
import FadeLoader from 'react-spinners/FadeLoader';


class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            list: [],
            inputValue: 0,
            checkInput: true,
            loading: true,
        }
    }
    
    componentWillMount = async () => {
        await this.props.getCount();  
        this.setState({
            list: this.props.count.list,
            inputValue: this.props.count.list.length,
            loading: false,
        }); 
    }

    handleUpParent = async () => {
        this.setState({
            loading: true,
        });
        await this.props.addCounts(1);
        this.setState({
            list: this.props.count.list,
            inputValue: this.props.count.list.length,
            loading: false,
        });
    }

    handleDownParent = async () => {
        this.setState({
            loading: true,
        });
        await this.props.subCounts(1);
        this.setState({
            list: this.props.count.list,
            inputValue: this.props.count.list.length,
            loading: false,
        });
    }

    handleDeleteParent = async () => {
        this.setState({
            loading: true,
        });
        await this.props.subCounts(this.props.count.list.length)
        this.setState({
            inputValue: this.props.count.list.length,
            list: this.props.count.list,
            loading: false,
        });
    }

    handleBlurParent = async (e) => {
        if((e.target.value != this.props.count.list.length) && this.state.checkInput){
            let distance = e.target.value - this.props.count.list.length
            if (distance > 0) {
                this.setState({
                    list: this.props.count.list,
                    loading: true
                });
                await this.props.addCounts(distance)
                this.setState({
                    list: this.props.count.list,
                    loading: false
                });
            } else {
                this.setState({
                    loading: true
                });
                await this.props.subCounts(distance * -1)
                this.setState({
                    list: this.props.count.list,
                    loading: false
                })
            }
        }
    }

    handleChangeInputParent = (e) => {
        let value  = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value);
        this.setState({
            inputValue: value,
            checkInput: value > 100 ? false : true,
        });
    }

    handleDeleteChildren = (id) => {
        return async() => {
            this.setState({
                loading: true,
            });
            await this.props.deleteCount(id);
            this.setState({
                inputValue: this.props.count.list.length,
                loading: false,
                list: this.props.count.list,
            });
        }
    }

    handleChangeInputChild = (_id) => {
        return async(e) => {
            let _value = e.target.value;
            console.log(e);
            _value  = isNaN(parseInt(_value)) ? 0 : parseInt(_value);
            let data = {
                id: _id,
                value: _value,
            }
            console.log(_value);
            await this.props.changeCount(data);
        }
    }
    
    handleBlurInputChild = (_id) => {
        return (e) => {
            let _value = e.target.value;
            _value  = isNaN(parseInt(_value)) ? 0 : parseInt(_value);
            this.props.updateCount(_id,_value);
        }
    }

    handUpChild = (_id, _value) => {
        return async()=>{
            this.setState({
                loading: true,
            });
            await this.props.updateCount(_id, _value);
            this.setState({
                loading: false,
                list: this.props.count.list,
            });
        }
    }

    handDownChild = (_id, _value) => {
        return async () =>{
            this.setState({
                loading: true,
            });
            await this.props.updateCount(_id, _value);
            this.setState({
                loading: false,
                list: this.props.count.list,
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">
                    <div className="form-group">
                        <label>Quantity</label> 
                        <ControlSize
                            value={ this.state.inputValue }
                            onTodoChange={ this.handleChangeInputParent }
                            onTodoBlur={ this.handleBlurParent }
                            up={ this.handleUpParent }
                            down={ this.handleDownParent }
                            delete={ this.handleDeleteParent }
                            disabled={ this.state.loading }
                        />
                        <FormError
                            isHidden = { this.state.checkInput }
                        />

                    </div>
                </div>
  
                <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6">
 
                    {
                        this.props.count.list.map((item, index) => (
                            <div className="form-group" key={index}>
                                <label>index: {index}</label>
                                <ControlSize key={item.id}
                                    value={item.value}
                                    onTodoChange={ this.handleChangeInputChild(item.id) }
                                    onTodoBlur={ this.handleBlurInputChild(item.id) }
                                    up={ this.handUpChild(item.id, item.value + index + 1) }
                                    down={ this.handDownChild(item.id, item.value - index - 1) }
                                    delete={ this.handleDeleteChildren(item.id) }
                                    disabled={this.state.loading}
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
    changeCount,
}

const mapStateToProps = (store) => {
    return {
        count: store.count,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
