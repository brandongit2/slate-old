import PropTypes from 'prop-types';
import React from 'react';

export const PropertiesBar = ({size}) => (
    <div className="panel-container properties-bar" style={{flexBasis: size}}>
        <div className="panel">
            <h2>properties bar</h2>
        </div>
    </div>
);

PropertiesBar.propTypes = {
    size: PropTypes.string.isRequired
};
