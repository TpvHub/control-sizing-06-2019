import {
    SUB,
    UPDATE,
    DELETE,
    GETALL
} from './actions'

const initialState = {
    counts: []
}

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETALL: {
            return {
                ...state,
                counts: action.data                                                                                              
            }
        }
        case SUB: {
            const amount = action.amount;
            return {
                ...state,
                counts: state.counts.slice(0, amount * (-1))
            }
        }
        case UPDATE: {
            const amount = action.amount;
            const id = action.id;
            return {
                ...state,
                counts: state.counts.map((item, i) => {
                    if (item._id === id) return {
                        ...item,
                        value: amount
                    }
                    else return item;
                })
            }
        }
        case DELETE: {
            const index = action.index;
            return {
                ...state,
                counts: state.counts.slice(0, index).concat(state.counts.slice(index + 1))
            }
        }
        default:
            return state;
    }
}

export default myReducer