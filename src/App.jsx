import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {windowResize} from './actions';
import {Dialog} from './components';
import {
    Canvas,
    MenuBar,
    NodeView,
    PanelContainer,
    PropertiesBar,
    SettingsBar,
    Toolbar
} from './panels';

class App extends React.Component {
    componentDidMount = () => {
        this.props.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', () => {
            this.props.resize(window.innerWidth, window.innerHeight);
        });
    };

    render = () => (
        <div id="app-container">
            <PanelContainer direction="vertical" size="grow">
                <MenuBar size="40px" panelStyle={{padding: '0px'}} />
                <PanelContainer direction="horizontal" size="grow">
                    <PanelContainer direction="vertical"
                                    size="17rem">
                        <Toolbar size="20%" />
                        <SettingsBar size="grow" />
                    </PanelContainer>
                    <Canvas size="grow" panelStyle={{padding: '0px'}} />
                    <PanelContainer direction="vertical"
                                    size="23rem">
                        <NodeView size="40%" />
                        <PropertiesBar size="grow" />
                    </PanelContainer>
                </PanelContainer>
            </PanelContainer>
            <Dialog />
            <div id="dummyContainer" />
        </div>
    );
}

App.propTypes = {
    resize: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    resize: (width, height) => { dispatch(windowResize(width, height)); }
});

export default connect(null, mapDispatchToProps)(App);
