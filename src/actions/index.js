import callAPI from "./../utils/apiCaller";

export const getData = (data) => ({
    type: 'SELECT_DATA',
    data
})

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
    index: index,
    value: parseInt(value)
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
            return dispatch(add(amount));
        });
    }

}

export const delCountRequest = value => {
    return dispatch => {
        let arr = Array[value].fill();
        Promise.all(arr).then(values => {
            console.log(values);
        });
        // for (let i = 0; i < value; i++) {
        //     callAPI('counts', 'DELETE', {
        //         id: 0,
        //     })
        //         .then(
        //             res => {
        //                 return dispatch(sub(1));
        //             }
        //         )
        // }
    }

}



