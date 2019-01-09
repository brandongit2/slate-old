import PropTypes from 'prop-types';
import React from 'react';

import './index.css';

export const Panel = ({children, parentDirection, size, panelStyle}) => {
    let style;

    if (size === 'grow') {
        style = {flexGrow: 1};
    } else {
        style = {flexBasis: size};
        if (parentDirection === 'horizontal') {
            style.width = size;
        } else {
            style.height = size;
        }
    }

    return (
        <div className="panel" style={Object.assign(style, panelStyle)}>
            {children}
        </div>
    );
};

Panel.defaultProps = {
    size:       'grow',
    panelStyle: {}
};

Panel.propTypes = {
    children:        PropTypes.element,
    parentDirection: PropTypes.string.isRequired,
    size:            PropTypes.string,
    panelStyle:      PropTypes.object
};
