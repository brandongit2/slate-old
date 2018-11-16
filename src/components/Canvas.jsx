import PropTypes from 'prop-types';
import React from 'react';

import SvgElement, * as SVG from '../SVG/src';

export class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.parent = React.createRef();

        this.svg = new SvgElement(this.props.width, this.props.height);

        let link = new SVG.Link('https://google.com');
        link.add(new SVG.Rect(200, 200, 'red'));
        this.svg.add(link);
    }

    componentDidUpdate() {
        this.svg.changeSize(this.props.width, this.props.height);
        this.svg.render(this.parent.current);
    }

    render() {
        return (
            <div className="component canvas" ref={this.parent} />
        );
    }
}

Canvas.propTypes = {
    width:  PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};
