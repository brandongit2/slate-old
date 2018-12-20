import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {windowResize} from './actions';
import config from './config.json';
import {Canvas, Menubar, PropertiesBar, Toolbar} from './panels';

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
                <Menubar height={config.ui.menubar.height}></Menubar>
                <div className="container horizontal grow">
                    <Toolbar
                        currentTool={this.props.currentTool}
                        width={config.ui.toolbar.width}
                    />
                    <Canvas id="main-canvas" grow />
                    <PropertiesBar
                        width={config.ui['properties-bar'].width}
                    />
                </div>
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
