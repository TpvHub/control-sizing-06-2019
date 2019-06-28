import Count from "../components/CountMain";
import { connect } from "react-redux";
import { postCountRequest, sub } from "../actions/index";
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
    handleAdd: postCountRequest,
    handleSub: sub
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Count);
