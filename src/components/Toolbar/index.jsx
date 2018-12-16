import PropTypes from 'prop-types';
import React from 'react';

import './index.css';

export const Toolbar = ({width}) => (
    <div className="toolbar" style={{flexBasis: width}} />
);

Toolbar.propTypes = {
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired
};
