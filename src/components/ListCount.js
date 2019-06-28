import React from "react";
import Count from "./Count";
import Del from "./Del";
// import callAPI from "./../utils/apiCaller";
// import { getData} from "../actions/index";


class ListCount extends React.Component {

    componentDidMount() {
        // callAPI('counts', 'GET', null).then(res => {
        //     this.props.getAllData(res.data)
        //     console.log(res.data)
        // })
        this.props.getAllData();
    }

    render() {
        const { onChange, values, handleDelete } = this.props;
        return (
            values.map((item, i) => {
                return (
                    <div key={i} className="App3">
                        <Del onDelete={() => handleDelete(i)} />
                        <Count
                            onChange={event => {
                                if (this.checkInput(event.target.value))
                                    onChange(i, event.target.value)
                            }}
                            onClickAdd={() => {
                                if (this.checkInput(item + i + 1))
                                    onChange(i, item + i + 1)
                            }}
                            onClickSub={() => {
                                if (this.checkInput(item - i - 1))
                                    onChange(i, item - i - 1)
                            }}
                            value={item.value}
                        />
                    </div>
                );
            })
        );
    }


    checkInput = (value) => {
        if (!isNaN(value) && parseInt(value) >= 0)
            return true;
        else return false
    }

    // TodoList.propTypes = {
    //     todos: PropTypes.arrayOf(
    //       PropTypes.shape({
    //         id: PropTypes.number.isRequired,
    //         completed: PropTypes.bool.isRequired,
    //         text: PropTypes.string.isRequired
    //       }).isRequired
    //     ).isRequired,
    //     toggleTodo: PropTypes.func.isRequired
    //   }
}
export default ListCount;
