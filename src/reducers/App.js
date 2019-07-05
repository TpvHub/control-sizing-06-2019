import * as types from '../constants/ActionTypesApp'

var defaultState = {
    arr: []
};

var app = (state = defaultState, action) => {
    switch (action.type) {
        case types.ADD_COUNTS: {
            const amount = action.amount
            return {
                ...state,
                arr: [
                    ...state.arr,
                    ...Array(amount).fill(0)
                ]
            }
        }

        case types.SUB_COUNTS: {
            const amount = action.amount
            return {
                ...state,
                arr: state.arr.slice(0, amount * -1)
            }
        }

        case types.DELETE_COUNT: {
            console.log(action)
            const _index = action.index
            return {
                ...state,
                arr: state.arr.filter((item, index) => _index !== index)
            }
        }

        case types.UPDATE_COUNT: {
            const _index = action.index
            const newValue = action.newValue
            return {
                ...state,
                arr: state.arr.map((item, index) => _index === index ? newValue : item)
            }
        }

        case types.DELETE_ALL: {
            return {
                ...state,
                arr: [],
            }
        }
        
        default:
            return {
                ...state
        }
    }
}

export default app;