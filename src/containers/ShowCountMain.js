import Count from "../component/CountMain";
import { connect } from "react-redux";
import { add, sub } from "../actions/index";
const mapStateToProps = (state, ownProps) => ({
  values: state.counter.values,
  sumCount: state.counter.values.length,
  sumOld: (ownProps.sumOld = state.counter.values.length)
});
// const mapDispatchToProps = (dispatch, ownProps) => ({
//   handleAdd: amount => dispatch(add(amount)),
//   handleSub: amount => dispatch(sub(amount))
// });

const mapDispatchToProps = {
    handleAdd: add,
    handleSub: sub
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Count);
