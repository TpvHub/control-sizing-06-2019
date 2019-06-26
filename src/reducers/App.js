import * as types from '../constants/ActionTypesApp'

var defaultState = {
    value: 0,
    arr: [],
};

var app = (state = defaultState, action) => {
    switch (action.type) {
        case types.UP_TODO:
            const value_up = state.value;
            let up = value_up + 1;
            let arrNew = [];
            let arrOld = state.arr;
            arrNew = [
                ...arrOld,
                ...Array(up-arrOld.length).fill(0)
            ]; 
            state.value = up;
            state.arr = arrNew;
            return {
                ...state
            }
        
        case types.DOWN_TODO:{
            const value_down = state.value
            let arrNew = [];
            let down = value_down - 1;
            let arrOld = state.arr;
            if (down > 0) {
                arrNew = arrOld.filter((item, index) => index < down);
                state.value = down;
                state.arr = arrNew;
            } else {
                state.value = 0;
                state.arr = [];
            }
            return {
                ...state
            };
        }

        case types.CHANGE_TODO:{
            let value = action.value;
            value = (isNaN(parseInt(value)) || parseInt(value) < 0) ? 0 : parseInt(value);
            let arrOld = state.arr;
            arrNew = [];
            if(value <= state.value)
              arrNew = arrOld.filter((item,index) => index < value)
            else
              arrNew = [
                ...state.arr, 
                ...Array(value - state.value).fill(0)
              ];
            state.arr = arrNew;
            state.value = value;           
            return {
                ...state
            };
        }

        case types.RESET_DOWN: {
            let index = parseInt(action.index);
            let item = parseInt(action.item);
            let arrNew = state.arr;
            arrNew[index] = item - index - 1;
            state.arr = arrNew;
            state.value = state.value;           
            return {
                ...state
            };            
        }

        case types.SET_UP: {
            let index = action.index;
            let item = action.item;
            console.log(action);
            let arrNew = state.arr;
            arrNew[index] = index + item + 1;
            state.arr = arrNew;
            state.value = state.value;           
            return {
                ...state
            };            
        }

        case types.CHANGE_ITEM_TODO: {
            let value = action.value;
            console.log(value);
            value = (isNaN(parseInt(value)) || parseInt(value) < 0) ? 0 : parseInt(value);  
            let index = action.index;
            let arrNew = state.arr;
            arrNew[index] = value;
            state.arr = arrNew;
            state.value = state.value;           
            return {
                ...state
            };            
        }

        case types.DELETE_ITEM: {
            let arrNew = [];
            arrNew = state.arr.filter( (item,i) =>  i !== action.index);
            state.arr = arrNew;
            state.value = state.value - 1;           
            return {
                ...state
            };
        }
        
        case types.DELETE_ALL:{
            state.arr = [];
            state.value = 0;           
            return {
                ...state
            };          
        }
        
        default:
            return {
                ...state
        }
    }
}

export default app;