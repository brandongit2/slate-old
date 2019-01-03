import PropTypes from 'prop-types';
import React from 'react';

import './index.css';

export const Panel = ({children, size, panelStyle}) => {
    let style;

    if (size === 'grow') {
        style = {flexGrow: 1};
    } else {
        style = {flexBasis: size};
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
    children:   PropTypes.element,
    size:       PropTypes.string,
    panelStyle: PropTypes.object
};
