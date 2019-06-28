import React from "react";
import Count from "./Count";
import Del from "./Del";

class ListCount extends React.Component {

    componentDidMount() {
        this.props.getAllData();
    }

    render() {
        const { onChange, values, handleDelete } = this.props;
        return (
            values.map((item, i) => {
                return (
                    <div key={i} className="App3">
                        <Del onDelete={() => handleDelete(item.id)} />
                        <Count
                            onChange={event => {
                                if (this.checkInput(event.target.value))
                                    onChange(item.id, event.target.value)
                            }}
                            onClickAdd={() => {
                                if (this.checkInput(item.value + i + 1))
                                    onChange(item.id, item.value + i + 1)
                            }}
                            onClickSub={() => {
                                if (this.checkInput(item.value - i - 1))
                                    onChange(item.id, item.value - i - 1)
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
