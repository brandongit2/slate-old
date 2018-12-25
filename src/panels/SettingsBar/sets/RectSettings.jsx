import PropTypes from 'prop-types';
import React from 'react';

export const RectSettings = ({currentSettings, updateSettings}) => (
    <div />
);

RectSettings.propTypes = {
    currentSettings: PropTypes.object.isRequired,
    updateSettings:  PropTypes.func.isRequired
};
