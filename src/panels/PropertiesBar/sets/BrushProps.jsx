import PropTypes from 'prop-types';
import React from 'react';

import config from '../../../config.json';

export const BrushProps = ({updateProps}) => (
    <div id="brushSize" className="form-item">
        <label htmlFor="brushSize">Brush size: </label>
        <input
            type="range"
            min="1"
            max="30"
            name="brushSize"
            defaultValue={config.tools.brush.size}
            onChange={e => {
                updateProps('brush', 'size', e.target.value);
            }}
        />
    </div>
);

BrushProps.propTypes = {
    updateProps: PropTypes.func.isRequired
};
