import PropTypes from 'prop-types';
import React from 'react';
import {generate} from 'shortid';

import {Panel} from '../';
import './index.css';

export const PanelContainer = ({children, direction, size}) => {
    let style = {flexDirection: direction === 'horizontal' ? 'row' : 'column'};

    if (size === 'grow') {
        Object.assign(style, {flexBasis: '0px', flexGrow: 1});
    } else {
        Object.assign(style, {flexBasis: size});
    }

    return (
        <div className="panel-container" style={style}>
            {children.map(child => {
                if (child.type.isPanelContainer) {
                    return child;
                } else {
                    return (
                        <Panel key={generate()}
                               parentDirection={direction}
                               size={child.props.size}
                               panelStyle={child.props.panelStyle}>
                            {child}
                        </Panel>
                    );
                }
            })}
        </div>
    );
};

// For identification, even in uglified production builds
PanelContainer.isPanelContainer = true;

PanelContainer.defaultProps = {
    size: 'grow'
};

PanelContainer.propTypes = {
    children:  PropTypes.arrayOf(PropTypes.element),
    direction: PropTypes.string.isRequired,
    size:      PropTypes.string
};
