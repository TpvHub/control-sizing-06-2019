export const add = amount => ({
    type: 'ADD',
    amount
})
export const sub = amount => ({
    type: 'SUB',
    amount
})

export const del = index => ({
    type: 'DEL',
    index
})

export const addCount = index => ({
    type: 'ADD_COUNT',
    index
})
export const subCount = index => ({
    type: 'SUB_COUNT',
    index
})
export const changeCount = (index, value) => ({
    type: 'CHANGE_COUNT',
    index:index,
    value: parseInt(value)
})
