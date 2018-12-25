import PropTypes from 'prop-types';
import React from 'react';

export const BrushProps = ({currentProps, updateProps}) => (
    <div id="brushSize" className="form-item">
        <label htmlFor="brushSize">brush size: </label>
        <input
            type="range"
            min="1"
            max="30"
            name="brushSize"
            defaultValue={currentProps.brush.size}
            onChange={e => {
                updateProps('brush', 'size', e.target.value);
            }}
        />
    </div>
);

BrushProps.propTypes = {
    currentProps: PropTypes.object.isRequired,
    updateProps:  PropTypes.func.isRequired
};
