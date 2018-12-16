import PropTypes from 'prop-types';
import React from 'react';

import './index.css';

export class Menubar extends React.Component {
    constructor(props) {
        super(props);

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
            <div className="menubar" style={{flexBasis: this.props.height}}>
                Temporary menubar
                <button
                    onClick={this.handleDownload}
                    style={{marginLeft: 10}}
                >
                    Download
                </button>
            </div>
        );
    }
}

Menubar.propTypes = {
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired
};
