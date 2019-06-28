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
        values: [...state.values, ...Array(action.amount)
          .fill({
            value: 0,
            index: 0
          })]
      };
    case "SUB":
      return {
        ...state,
        values: [...state.values.slice(0, -action.amount)]
      };
    case "DEL":
      return {
        ...state,
        values: state.values.filter((item, i) => action.index !== i)
      };
    case "CHANGE_COUNT":
      return {
        ...state,
        values: state.values.map((item, i) =>
          i === action.index ? action.value : item
        )
      };
    default:
      return state;
  }
};
export default counter;
