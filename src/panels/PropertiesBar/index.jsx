import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {changeProperty} from '../../actions';
import {BrushProps, RectProps} from './sets';
import './index.css';

let toolNameToComponent = {
    brush:     BrushProps,
    rectangle: RectProps
};

export let PropertiesBar = ({currentTool, updateProps, width}) => {
    let P = toolNameToComponent[currentTool];

    return (
        <div className="properties-bar" style={{flexBasis: width}}>
            <h2>properties: {currentTool}</h2> {/* eslint-disable-line react/jsx-one-expression-per-line */}
            <P updateProps={updateProps} />
        </div>
    );
};

PropertiesBar.propTypes = {
    currentTool: PropTypes.string.isRequired,
    updateProps: PropTypes.func.isRequired,
    width:       PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    currentTool: state.currentTool
});

const mapDispatchToProps = dispatch => ({
    updateProps: (tool, prop, value) => {
        dispatch(changeProperty(tool, prop, value));
    }
});

PropertiesBar = connect(mapStateToProps, mapDispatchToProps)(PropertiesBar);
