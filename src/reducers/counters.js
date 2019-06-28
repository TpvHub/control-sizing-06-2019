const counter = (state = { values: [] }, action) => {
  switch (action.type) {
    case "SELECT_DATA":
      return {
        ...state,
        values: action.data
      };
    case "ADD":
      return {
        ...state,
        // values: [...state.values, ...Array(action.data.length)
        //   .fill({
        //     value: 0,
        //     index: 0
        //   })]
        values: [...state.values,...action.data]
      };
    case "SUB":
      return {
        ...state,
        values: [...state.values.slice(0, -action.amount)]
      };
    case "DEL":
      return {
        ...state,
        values: state.values.filter((item, i) => action.id !== item.id)
      };
    case "CHANGE_COUNT":
      return {
        ...state,
        values: state.values.map((item, i) =>
          item.id === action.id ? { ...item, value: action.value } : item
        )
      };
    default:
      return state;
  }
};
export default counter;
