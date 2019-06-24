import React from "react";
import Count from "./Count";
class CountMain extends React.Component {
    render() {
        return (
            <Count
                onChange={event => this.props.onChange(event.target.value)}
                onClickAdd={this.props.handleAdd}
                onClickSub={this.props.handleSub}
                value={this.props.sumCount} />
        );
    }
}
export default CountMain;
