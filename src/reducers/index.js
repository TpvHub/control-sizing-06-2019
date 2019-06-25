import { createStore,compose } from 'redux'
let defaultState = {
  values: []
}
function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, values: [...state.values, ...Array(action.amount).fill(0)] }
    case 'SUB':
      return { ...state, values: [...state.values.slice(0, -action.amount)] }
    case 'DEL':
      return { ...state, values: state.values.filter((item, i) => action.index !== i) }
    case 'EDIT':
      return { ...state, values: state.values.filter((item, i) => action.index !== i) }
    case 'ADD_COUNT':
      return {
        ...state, values: state.values.map((item, i) =>
          i === action.index ? item + action.index + 1 : item
        )
      }
    case 'SUB_COUNT':
      return {
        ...state, values: state.values.map((item, i) =>
          i === action.index ? item - action.index - 1 : item
        )
      }
    case 'CHANGE_COUNT':
      return {
        ...state, values: state.values.map((item, i) =>
          i === action.index ? action.value : item
        )
      }
    default:
      return state
  }
}

let store = createStore(reducer, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// store.subscribe(() => console.log(store.getState()))

export default store;
