import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {windowResize} from './actions';
import config from './config.json';
import {
    Canvas,
    LayerView,
    Menubar,
    PropertiesBar,
    SettingsBar,
    Toolbar
} from './panels';

class App extends React.Component {
    componentDidMount() {
        windowResize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', () => {
            windowResize(window.innerWidth, window.innerHeight);
        });
    }

    render() {
        return (
            <div id="app-container" className="container vertical">
                <Menubar size={config.ui.menubar.size}></Menubar>
                <div className="container horizontal grow">
                    <div
                        className="container vertical"
                        style={{flexBasis: config.ui.leftPanel.size}}
                    >
                        <Toolbar
                            currentTool={this.props.currentTool}
                            size={config.ui.toolbar.size}
                        />
                        <SettingsBar size={config.ui.settingsBar.size} />
                    </div>
                    <Canvas id="main-canvas" grow />
                    <div
                        className="container vertical"
                        style={{flexBasis: config.ui.rightPanel.size}}
                    >
                        <LayerView size={config.ui.layerView.size} />
                        <PropertiesBar size={config.ui.propertiesBar.size} />
                    </div>
                </div>
                <div id="dummyContainer" />
            </div>
        );
    }
}

App.propTypes = {
    windowResize: PropTypes.func.isRequired,
    currentTool:  PropTypes.string.isRequired,
    width:        PropTypes.number.isRequired,
    height:       PropTypes.number.isRequired
};

const mapDispatchToProps = dispatch => ({
    windowResize: (width, height) => {
        dispatch(windowResize(width, height));
    }
});

const mapStateToProps = state => ({
    currentTool: state.currentTool,
    width:       state.window.width,
    height:      state.window.height
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
