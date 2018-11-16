import PropTypes from 'prop-types';
import React from 'react';

import SvgElement, * as SVG from '../SVG';

export class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.parent = React.createRef();

        this.svg = new SvgElement(this.props.width, this.props.height);
    }

    componentDidUpdate() {
        this.svg.changeSize(this.props.width, this.props.height);
        this.svg.add(new SVG.Rect(200, 200, 'red').el);
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
