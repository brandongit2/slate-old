import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {changeToolSetting} from '../../actions';
import config from '../../config.json';
import {BrushSettings, RectSettings, TextSettings} from './sets';
import './index.css';

let toolNameToComponent = {
    brush:     BrushSettings,
    rectangle: RectSettings,
    text:      TextSettings
};

export class SettingsBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSettings: config.tools
        };

        this.updateSettings = this.updateSettings.bind(this);
    }

    updateSettings(tool, prop, value) {
        this.setState({
            currentSettings: {
                ...this.state.currentSettings,
                [tool]: {
                    ...this.state.currentSettings[tool],
                    [prop]: value
                }
            }
        });
        this.props.updateSettings(tool, prop, value);
    }

    render() {
        let {currentTool, size} = this.props;
        let P = toolNameToComponent[currentTool];

        return (
            <div className="panel settings-bar" style={{flexBasis: size}}>
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                <h2>settings: {currentTool} tool</h2>
                <P
                    currentSettings={this.state.currentSettings}
                    updateSettings={this.updateSettings}
                />
            </div>
        );
    }
}

SettingsBar.propTypes = {
    currentTool:    PropTypes.string.isRequired,
    updateSettings: PropTypes.func.isRequired,
    size:           PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    currentTool: state.currentTool
});

const mapDispatchToProps = dispatch => ({
    updateSettings: (tool, prop, value) => {
        dispatch(changeToolSetting(tool, prop, value));
    }
});

/* eslint-disable-next-line no-class-assign */
SettingsBar = connect(mapStateToProps, mapDispatchToProps)(SettingsBar);
