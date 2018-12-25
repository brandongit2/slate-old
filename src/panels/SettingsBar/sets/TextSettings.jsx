import PropTypes from 'prop-types';
import React from 'react';

export const TextSettings = ({currentSettings, updateSettings}) => (
    <div />
);

TextSettings.propTypes = {
    currentSettings: PropTypes.object.isRequired,
    updateSettings:  PropTypes.func.isRequired
};
