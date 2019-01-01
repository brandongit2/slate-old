import PropTypes from 'prop-types';
import React from 'react';
import {generate} from 'shortid';

import {Panel} from '../';
import './index.css';

export const PanelContainer = ({children, direction, size}) => {
    let style = {flexDirection: direction === 'horizontal' ? 'row' : 'column'};

    if (size === 'grow') {
        Object.assign(style, {flexGrow: 1});
    } else {
        Object.assign(style, {flexBasis: size});
    }

    return (
        <div className="panel-container" style={style}>
            {children.map(child => {
                if (child.type.name === 'PanelContainer') {
                    return child;
                } else {
                    return (
                        <Panel key={generate()} size={child.props.size}>
                            {child}
                        </Panel>
                    );
                }
            })}
        </div>
    );
};

PanelContainer.defaultProps = {
    size: 'grow'
};

PanelContainer.propTypes = {
    children:  PropTypes.arrayOf(PropTypes.element),
    direction: PropTypes.string.isRequired,
    size:      PropTypes.string
};
