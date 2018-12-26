import PropTypes from 'prop-types';
import React from 'react';
import {ColourSetting} from '../components/ColourSetting';

export const BrushSettings = ({currentSettings, updateSettings}) => (
    <div>
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
        <ColourSetting
            currentSettings={currentSettings}
            updateSettings={updateSettings}
            tool="brush"
        />
    </div>
);

BrushSettings.propTypes = {
    currentSettings: PropTypes.object.isRequired,
    updateSettings:  PropTypes.func.isRequired
};
