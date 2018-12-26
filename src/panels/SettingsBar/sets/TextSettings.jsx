import PropTypes from 'prop-types';
import React from 'react';
import {ColourSetting} from '../components/ColourSetting';

export const TextSettings = ({currentSettings, updateSettings}) => (
    <div>
        <ColourSetting
            currentSettings={currentSettings}
            updateSettings={updateSettings}
            tool="text"
        />
    </div>
);

TextSettings.propTypes = {
    currentSettings: PropTypes.object.isRequired,
    updateSettings:  PropTypes.func.isRequired
};
