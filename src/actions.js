
export const SUB = 'SUB'
export const UPDATE = 'UPDATE'
export const DELETE = 'DELETE'
export const GETALL = 'GETALL'

  export const sub = amount => ({
    type: SUB,
    amount: amount
  });
export const update = (amount, id) => ({
    type: UPDATE,
    amount: amount,
    id: id
});

export const deleteItem = (index) => ({
    type: DELETE,
    index: index
})

export const getall = (data) => ({
  type: GETALL,
  data: data
})