import React from "react";
import Count from "./Count";
import Del from "./Del";
const ListCount = ({ onChange, values, handleDelete, handleAdd, handleSub }) => (
    values.map((item, i) => {
        return (
            <div key={i} className="App3" >
                <Del onDelete={() => handleDelete(i)} />
                <Count
                    onChange={event => onChange(event.target.value, i)}
                    onClickAdd={() => handleAdd(i)}
                    onClickSub={() => handleSub(i)}
                    value={item} />
            </div>
        );
    })
)

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
