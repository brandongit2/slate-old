import PropTypes from 'prop-types';
import React from 'react';

import './index.css';

export const Panel = ({children, size}) => {
    let style;

    if (size === 'grow') {
        style = {flexGrow: 1};
    } else {
        style = {flexBasis: size};
    }

    return <div className="panel" style={style}>{children}</div>;
};

Panel.defaultProps = {
    size: 'grow'
};

Panel.propTypes = {
    children: PropTypes.element,
    size:     PropTypes.string
};
