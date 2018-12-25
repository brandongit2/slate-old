import PropTypes from 'prop-types';
import React from 'react';

import './index.css';

export const Menubar = ({size}) => (
    <div className="panel menubar" style={{flexBasis: size}}>
        slate
    </div>
);

Menubar.propTypes = {
    size: PropTypes.string.isRequired
};
