import * as types from '../constants/ActionTypesApp'

var defaultState = {
    arr: []
};

var app = (state = defaultState, action) => {
    switch (action.type) {
        case types.UP_TODO:
            const value_up = state.arr.length;
            let up = value_up + 1;
            let arrNew = [];
            let arrOld = state.arr;
            arrNew = [
                ...arrOld,
                ...Array(up-arrOld.length).fill(0)
            ]; 
            return {
                ...state,
                arr: arrNew
            }
        
        case types.DOWN_TODO:{
            const value_down = state.arr.length;
            let arrNew = [];
            let down = value_down - 1;
            let arrOld = state.arr;
            if (down > 0) {
                arrNew = arrOld.filter((item, index) => index < down);
                return {
                    ...state,
                    arr: arrNew
                }
            } else {
                return {
                    ...state,
                    arr: []
                }
            }
        }

        case types.CHANGE_TODO:{
            let value = action.value;
            value = (isNaN(parseInt(value)) || parseInt(value) < 0) ? 0 : parseInt(value);
            let arrOld = state.arr;
            arrNew = [];
            if(value <= state.arr.length)
              arrNew = arrOld.filter((item,index) => index < value)
            else
            arrNew = [
                ...state.arr, 
                ...Array(value - state.arr.length).fill(0)
            ];
            return {
                ...state,
                arr: arrNew
            };
        }

        case types.RESET_DOWN: {
            let index = action.index;
            let item = action.item;
            let arrNew = state.arr;
            arrNew[index] = item - index - 1;        
            return {
                ...state,
                arr: arrNew
            };            
        }

        case types.SET_UP: {
            let index = action.index;
            let item = action.item;
            let arrNew = state.arr;
            arrNew[index] = index + item + 1;
            return {
                ...state,
                arr: arrNew
            };            
        }

        case types.CHANGE_ITEM_TODO: {
            let value = action.value;
            value = (isNaN(parseInt(value)) || parseInt(value) < 0) ? 0 : parseInt(value);  
            let index = action.index;
            let arrNew = state.arr;
            arrNew[index] = value;
            return {
                ...state,
                arr: arrNew
            };            
        }

        case types.DELETE_ITEM: {
            let arrNew = [];
            arrNew = state.arr.filter( (item,i) =>  i !== action.index);
            state.arr = arrNew;
            return {
                ...state
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