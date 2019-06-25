import { combineReducers } from 'redux'
import counter from './counters'

const rootReducer = combineReducers({
  counter
})

export default rootReducer