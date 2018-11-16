import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {windowResize} from './actions';
import {Canvas} from './components';

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
            <div id="app-container">
                <Canvas
                    width={this.props.width}
                    height={this.props.height}
                />
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    width:    PropTypes.number.isRequired,
    height:   PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    width:  state.window.width,
    height: state.window.height
});

export default connect(mapStateToProps)(App);
