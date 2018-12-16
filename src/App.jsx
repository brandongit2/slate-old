import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {windowResize} from './actions';
import {Canvas, Menubar, Toolbar} from './components';
import config from './config.json';

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(
            windowResize(window.innerWidth, window.innerHeight)
        );

        window.addEventListener('resize', () => {
            this.props.dispatch(
                windowResize(window.innerWidth, window.innerHeight)
            );
        });
    }

    render() {
        return (
            <div id="app-container" className="container vertical">
                <Menubar height={config.ui.menubar.height}></Menubar>
                <div className="container horizontal grow">
                    <Toolbar currentTool={this.props.currentTool} width={config.ui.toolbar.width} />
                    <Canvas id="main-canvas" grow />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    dispatch:    PropTypes.func.isRequired,
    currentTool: PropTypes.string.isRequired,
    width:       PropTypes.number.isRequired,
    height:      PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    currentTool: state.currentTool,
    width:       state.window.width,
    height:      state.window.height
});

export default connect(mapStateToProps)(App);
