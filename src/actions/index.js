import * as types from '../constants/ActionTypesApp';

export const upTodo = () => ({
    type: types.UP_TODO
})

export const downTodo = () => ({
    type: types.DOWN_TODO
})

export const changeTodo = () => ({
    type: types.CHANGE_TODO,
    value: e.target.value
})

export const resetDown = (index,item) => ({
    type: types.RESET_DOWN,
    index: index,
    item: item
})

export const setUP = (index,item) => ({
    type: types.SET_UP,
    index: index,
    item: item
})

export const changeItemToDo = (item) => ({
    type: types.CHANGE_ITEM_TODO,
    value: e.target.value,
    item: item
})

export const deleteItem = (index) => ({
    type: types.DELETE_ITEM,
    index: index
})

export const deleteItemAll = () => ({
    type: types.DELETE_ALL,
    index: index
})