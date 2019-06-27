import React from 'react';
const ControlDiv = ({ up, down, update, count }) => {
    return (
        <div style={{ float: 'left' }}>
            <button onClick={down}>
            -
            </button>
            <input type="text" name="number" value={count} onChange={update} />
            <button onClick={up}>
            +
            </button>
        </div>
    );
}

export default ControlDiv;