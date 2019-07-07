import * as types from '../constants/ActionTypesApp'

var defaultState = {
    arr: []
};

var app = (state = defaultState, action) => {
    switch (action.type) {
        case types.ADD_COUNTS: {
            const obj = action.obj;
            const amount = action.amount;
            return {
                ...state,
                arr: state.arr.concat(Array(amount).fill(obj))
            }
        }

        case types.SUB_COUNTS: {
            const amount = action.amount;
            return {
                ...state,
                arr: state.arr.slice(0, amount * -1)
            }
        }

        case types.DELETE_COUNT: {
            const _id = action.id
            return {
                ...state,
                arr: state.arr.filter((item) => _id !== item.id)
            }
        }

        case types.UPDATE_COUNT: {
            const _id = action.id
            const newValue = action.newValue;
            console.log("id"+newValue);
            return {
                ...state,
                arr: state.arr.map((item, index) => {
                    _id === item.id ? item.value = newValue : item;
                    return item;
                })
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