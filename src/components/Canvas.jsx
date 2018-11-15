import PropTypes from 'prop-types';
import React from 'react';

export const Canvas = ({width, height}) => (
    <div className="component canvas" style={{width, height}}>
        canvas
    </div>
);

Canvas.propTypes = {
    width:  PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
