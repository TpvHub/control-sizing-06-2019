import ListCount from "../component/ListCount";
import { connect } from "react-redux";
import { del, changeCount } from "../actions/index";

const mapStateToProps = (state, ownProps) => ({
    values: state.counter.values
});

// const mapDispatchToProps = dispatch => ({
//     handleDelete: i => dispatch(del(i)),
//     onChange: (value, i) => dispatch(changeCount(i, value))
// });

const mapDispatchToProps = {
    handleDelete: del,
    onChange: changeCount
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCount);
