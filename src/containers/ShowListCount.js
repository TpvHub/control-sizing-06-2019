import ListCount from "../component/ListCount";
import { connect } from "react-redux";
import { del,addCount,subCount,changeCount } from "../actions/index"

const mapStateToProps = (state, ownProps) => ({
    values: state.values
})

const mapDispatchToProps = dispatch => ({
    handleDelete: i =>  dispatch(del(i)),
    handleAdd: (i) => {
        // dispatch({ type: 'ADD_COUNT', index: i })
        dispatch(addCount(i))
    },
    onChange: (value, i) => {
        if (!isNaN(value) && parseInt(value) >= 0) {
            dispatch(changeCount(i,value))
        }
    },
    handleSub: (i) =>  dispatch(subCount(i))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCount)