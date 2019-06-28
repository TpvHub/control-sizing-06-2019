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

        case types.UPDATE_COUNT_PARENT: {
            const newValue = action.newValue;
            console.log("newValue: " +state.arr.length);
            if(newValue <= state.arr.length){
                return {
                    ...state,
                    arr: state.arr.filter((item,index) => index < newValue)
                }               
            }else{
                return {
                    ...state,
                    arr: [
                        ...state.arr,
                        ...Array(newValue - state.arr.length).fill(0)
                    ]
                }
            }
        }

        case types.RESET_DOWN: {
            let _index = action.index;
            return {
                ...state,
                arr: state.arr.map((item,index) => index === _index ? item - index - 1 : item)
            };            
        }

        case types.SET_UP: {
            let _index = action.index;
            return {
                ...state,
                arr: state.arr.map((item,index) => index === _index ? index + item + 1 : item)
            };            
        }

        case types.DELETE_ALL:{
            return {
                ...state,
                arr: []
            };          
        }
        
        default:
            return {
                ...state
        }
    }
}

export default app;