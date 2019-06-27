import {
    ADD,
    SUB,
    UPDATE,
    DELETE
} from './actions'

const initialState = {
    status: false,
    counts: []
}

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD: {
            const amount = action.amount;
            return {
                ...state,
                counts: [
                    ...state.counts,
                    ...Array(amount).fill(0)
                ]
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
            const index = action.index;
            return {
                ...state,
                counts: state.counts.map((item, i) => {
                    if (index === i) return amount;
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