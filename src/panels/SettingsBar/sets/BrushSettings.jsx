import PropTypes from 'prop-types';
import React from 'react';

export const BrushSettings = ({currentSettings, updateSettings}) => (
    <div id="brushSize" className="form-item">
        <label htmlFor="brushSize">brush size: </label>
        <input
            type="range"
            min="1"
            max="30"
            name="brushSize"
            defaultValue={currentSettings.brush.size}
            onChange={e => {
                updateSettings('brush', 'size', e.target.value);
            }}
        />
    </div>
);

BrushSettings.propTypes = {
    currentSettings: PropTypes.object.isRequired,
    updateSettings:  PropTypes.func.isRequired
};
