import * as types from '../constants/ActionTypesApp';

export const addCounts = (amount) => ({
    type: types.ADD_COUNTS,
    amount 
})

export const subCounts = (amount) => ({
    type: types.SUB_COUNTS,
    amount 
})

export const deleteCount = (index) => ({
    type: types.DELETE_COUNT,
    index
})

export const updateCount = (index, newValue) => ({
    type: types.UPDATE_COUNT,
    index,
    newValue
})

export const deleteAll = () => ({
    type: types.DELETE_ALL,
})
