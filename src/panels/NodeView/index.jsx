import PropTypes from 'prop-types';
import React from 'react';

export const NodeView = ({size}) => (
    <div className="panel node-view" style={{flexBasis: size}}>
        <h2>nodes</h2>
    </div>
);

NodeView.propTypes = {
    size: PropTypes.string.isRequired
};
