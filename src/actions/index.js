import callAPI from "./../utils/apiCaller";

export const getData = (data) => ({
    type: 'SELECT_DATA',
    data
})

export const add = data => ({
    type: 'ADD',
    data
})
export const sub = amount => ({
    type: 'SUB',
    amount
})

export const del = id => ({
    type: 'DEL',
    id
})

export const addCount = index => ({
    type: 'ADD_COUNT',
    index
})
export const subCount = index => ({
    type: 'SUB_COUNT',
    index
})
export const changeCount = (data = {}) => ({
    type: 'CHANGE_COUNT',
    id: data.id,
    value: parseInt(data.value)
})

export const getCountRequest = () => {
    return dispatch => {
        callAPI('counts', 'GET', null).then(res => {
            return dispatch(getData(res.data))
        })
    }
}

const createCount = () => {
    return (
        new Promise((resolve, reject) => {
            callAPI('counts', 'POST', {
                value: 0,
                index: 0
            })
                .then(res => {
                    resolve(res.data)
                    //setTimeout(resolve, 100, res.data);
                })
        })
    )
}

export const postCountRequest = amount => {
    return dispatch => {
        let arr = Array(amount).fill(null).map(item => createCount());
        Promise.all(arr).then(values => {
            return dispatch(add(values));
        });
    }

}

export const putCountRequest = (id, value) => {
    return dispatch => {
        callAPI(`counts/${id}`, 'PUT', {
            id: id,
            value: value
        }).then(res => {
            return dispatch(changeCount(res.data))
        })
    }
}

export const delCountRequest = id => {
    return dispatch => {
        callAPI(`counts/${id}`, 'DELETE', null).then(res => {
            return dispatch(del(res.data.id))
        })
    }
}



