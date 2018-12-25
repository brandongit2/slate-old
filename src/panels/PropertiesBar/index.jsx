import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {changeProperty} from '../../actions';
import config from '../../config.json';
import {BrushProps, RectProps, TextProps} from './sets';
import './index.css';

let toolNameToComponent = {
    brush:     BrushProps,
    rectangle: RectProps,
    text:      TextProps
};

export class PropertiesBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentProps: config.tools
        };

        this.updateProps = this.updateProps.bind(this);
    }

    updateProps(tool, prop, value) {
        this.setState({
            currentProps: {
                ...this.state.currentProps,
                [tool]: {
                    ...this.state.currentProps[tool],
                    [prop]: value
                }
            }
        });
        this.props.updateProps(tool, prop, value);
    }

    render() {
        let {currentTool, size} = this.props;
        let P = toolNameToComponent[currentTool];

        return (
            <div className="panel properties-bar" style={{flexBasis: size}}>
                <h2>properties: {currentTool} tool</h2> {/* eslint-disable-line react/jsx-one-expression-per-line */}
                <P
                    currentProps={this.state.currentProps}
                    updateProps={this.updateProps}
                />
            </div>
        );
    }
}

PropertiesBar.propTypes = {
    currentTool: PropTypes.string.isRequired,
    updateProps: PropTypes.func.isRequired,
    size:        PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    currentTool: state.currentTool
});

const mapDispatchToProps = dispatch => ({
    updateProps: (tool, prop, value) => {
        dispatch(changeProperty(tool, prop, value));
    }
});

/* eslint-disable-next-line no-class-assign */
PropertiesBar = connect(mapStateToProps, mapDispatchToProps)(PropertiesBar);
