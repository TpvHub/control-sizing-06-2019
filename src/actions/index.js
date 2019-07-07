import * as types from '../constants/ActionTypesApp';

export const addCounts = (amount, obj) => ({
    type: types.ADD_COUNTS,
    amount,
    obj 
})

export const subCounts = (amount) => ({
    type: types.SUB_COUNTS,
    amount
})

export const deleteCount = (id) => ({
    type: types.DELETE_COUNT,
    id
})

export const updateCount = (id, newValue) => ({
    type: types.UPDATE_COUNT,
    id,
    newValue
})

export const deleteAll = () => ({
    type: types.DELETE_ALL,
})
