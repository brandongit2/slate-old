import PropTypes from 'prop-types';
import React from 'react';

import './index.css';

export const Menubar = ({height}) => (
    <div className="menubar" style={{flexBasis: height}}>
        slate
    </div>
);

Menubar.propTypes = {
    height: PropTypes.string.isRequired
};
