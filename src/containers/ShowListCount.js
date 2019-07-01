import ListCount from "../components/ListCount";
import { connect } from "react-redux";
import { getCountRequest, putCountRequest,delCountRequest } from "../actions/index";


const mapStateToProps = (state, ownProps) => ({
    values: state.counter.values
});

// const mapDispatchToProps = dispatch => ({
//     handleDelete: i => dispatch(del(i)),
//     onChange: (value, i) => dispatch(changeCount(i, value))
// });

const mapDispatchToProps = {
    getAllData: getCountRequest,
    handleDelete: delCountRequest,
    onChange: putCountRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCount);
