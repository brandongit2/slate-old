import PropTypes from 'prop-types';
import React from 'react';
import {ColourSetting} from '../components/ColourSetting';

export const RectSettings = ({currentSettings, updateSettings}) => (
    <div>
        <ColourSetting
            currentSettings={currentSettings}
            updateSettings={updateSettings}
            tool="rect"
        />
    </div>
);

RectSettings.propTypes = {
    currentSettings: PropTypes.object.isRequired,
    updateSettings:  PropTypes.func.isRequired
};
