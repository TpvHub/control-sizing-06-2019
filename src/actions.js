
export const ADD = 'ADD'
export const SUB = 'SUB'
export const UPDATE = 'UPDATE'
export const DELETE = 'DELETE'

export const add = amount => ({
    type: ADD,
    amount: amount
  });

  export const sub = amount => ({
    type: SUB,
    amount: amount
  });
export const update = (amount, index) => ({
    type: UPDATE,
    amount: amount,
    index: index
});

export const deleteItem = (index) => ({
    type: DELETE,
    index: index
})