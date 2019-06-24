import Count from "../component/CountMain";
import { connect } from "react-redux";
import { add, sub } from "../actions/index"
const mapStateToProps = (state, ownProps) => ({
    values: state.values,
    sumCount: state.values.length,
    own: ownProps.sumOld = state.values.length
})
const mapDispatchToProps = (dispatch, ownProps) => ({
    handleAdd: () => {
        //dispatch({ type: 'ADD', amount: 1 })
        dispatch(add(1))
    },
    onChange: value => {
        if (!isNaN(value) && parseInt(value) >= 0) {
            let old = ownProps.sumOld;
            let amount = value - old;
            amount <= 0 ? dispatch(sub(Math.abs(amount))) : dispatch(add(amount));
        }
    },
    handleSub: () => dispatch(sub(1))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Count)