import PropTypes from 'prop-types';
import React from 'react';

export const PropertiesBar = ({size}) => (
    <div className="panel properties-bar" style={{flexBasis: size}}>
        <h2>properties bar</h2>
    </div>
);

PropertiesBar.propTypes = {
    size: PropTypes.string.isRequired
};
