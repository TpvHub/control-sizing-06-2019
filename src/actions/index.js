import callAPI from "./../utils/apiCaller";
// import uuidv1 from "uuid/v1";

export const getData = (data) => ({
    type: 'SELECT_DATA',
    data
})

export const add = data => ({
    type: 'ADD',
    data
})
export const sub = data => ({
    type: 'SUB',
    data
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
            //console.log(res)
        })
    }
}

const createCount = () => {
    return (
        new Promise((resolve, reject) => {
            callAPI('counts', 'POST', {
                // id: uuidv1(),
                value: 0,
                //index: 0
            })
                .then(res => {
                    // console.log(res.data)
                    resolve(res.data)
                    //setTimeout(resolve, 200, res.data);
                })
        })
    )
}
export const postCountRequest = amount => {
    return dispatch => {
        let arr = Array(amount).fill(null).map(item => createCount());
        //console.log(arr)
        Promise.all(arr).then(values => {
            return dispatch(add(values));
        }).catch(err => console.log(err));
    }
}

export const putCountRequest = (id, value) => {
    return dispatch => {
        callAPI(`counts/${id}`, 'PUT', {
            id: id,
            value: value
        }).then(res => {
            //console.log(res);
            return dispatch(changeCount(res.data))
        })
    }
}

const delCount = id => {
    return (
        new Promise((resolve, reject) => {
            callAPI(`counts/${id}`, 'DELETE', null).then(res => {
                resolve(res.data)
            })
        })
    )
}

export const delMulCountRequest = data => {
    return dispatch => {
        let arr = data.map((item, i) =>
            delCount(item.id)
        )
        //console.log(arr)
        Promise.all(arr).then(results => {
            return dispatch(sub(results.length));
        });
    }
}


export const delCountRequest = id => {
    return dispatch => {
        callAPI(`counts/${id}`, 'DELETE', null).then(res => {
            // eslint-disable-next-line no-unused-expressions
            if (res.status === 200) {
                return dispatch(del(id))
            }
        })
    }
}



