import PropTypes from 'prop-types';
import React from 'react';

export const ColourSetting = ({currentSettings, updateSettings, tool}) => {
    if (!currentSettings[tool]) {
        updateSettings(tool, 'colour', currentSettings.commonDefaults.colour);
    }
    return (
        <div id="colourSelected" className="form-item">
            <label htmlFor="colourSelected">colour: </label>
            <input
                type="color"
                name="colourSelected"
                defaultValue={currentSettings.commonDefaults.colour}
                onChange={e => {
                    updateSettings(tool, 'colour', e.target.value);
                }}
            />
        </div>
    );
};

ColourSetting.propTypes = {
    currentSettings: PropTypes.object.isRequired,
    updateSettings:  PropTypes.func.isRequired,
    tool:            PropTypes.string.isRequired
};
