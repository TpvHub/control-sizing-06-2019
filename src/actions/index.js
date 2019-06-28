import * as types from '../constants/ActionTypesApp';

export const upTodo = () => ({
    type: types.ADD_COUNTS,
    amount: 1,
})

export const downTodo = () => ({
    type: types.SUB_COUNTS,
    amount: 1,
})

export const changeTodo = (newValue) => ({
    type: types.UPDATE_COUNT_PARENT,
    newValue: newValue
})

export const resetDown = (index) => ({
    type: types.RESET_DOWN,
    index: index,
})

export const setUP = (index) => ({
    type: types.SET_UP,
    index: index,
})

export const changeItemToDo = (newValue,index) => ({
    type: types.UPDATE_COUNT,
    newValue: newValue,
    index: index
})

export const deleteItem = (index) => ({
    type: types.DELETE_COUNT,
    index: index
})

export const deleteItemAll = () => ({
    type: types.DELETE_ALL,
})