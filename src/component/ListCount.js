import React from "react";
import Count from "./Count";
import Del from "./Del";
const ListCount = ({ onChange, values, handleDelete, handleAdd, handleSub }) =>
    values.map((item, i) => {
        return (
            <div key={i} className="App3">
                <Del onDelete={() => handleDelete(i)} />
                <Count
                    onChange={event => {
                        if (checkInput(event.target.value))
                            onChange(i,event.target.value)
                    }}
                    onClickAdd={() => {
                        if (checkInput(item + i + 1))
                            onChange(i,item + i + 1)
                    }}
                    onClickSub={() => {
                        if (checkInput(item - i - 1))
                            onChange(i,item - i - 1)
                    }}
                    value={item}
                />
            </div>
        );
    });

const checkInput = (value) => {
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

export default ListCount;
