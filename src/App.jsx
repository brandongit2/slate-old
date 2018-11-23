import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {windowResize} from './actions';
import {Canvas} from './components';
import ui from './ui.json';

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

        this.handleDownload = this.handleDownload.bind(this);
    }

    handleDownload() {
        const svgElement = document.getElementsByClassName('canvas')[0];
        const fileName = 'canvas.svg';
        const blob = new Blob([svgElement.innerHTML], {
            type: 'image/svg+xml;charset=utf-8'
        });
        const url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    render() {
        return (
            <div id="app-container">
                <div style={{backgroundColor: '#dddddd', height: ui['toolbar']['height'], alignItems: 'center', display: 'flex'}}>
                    <div style={{padding: 5}}>
                        Temporary Toolbar
                        <button onClick={this.handleDownload} style={{marginLeft: 10}}>Download</button>
                    </div>
                </div>
                <Canvas
                    width={this.props.width}
                    height={Math.max(this.props.height - ui['toolbar']['height'], 0)}
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
