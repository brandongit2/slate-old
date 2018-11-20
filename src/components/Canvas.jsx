import PropTypes from 'prop-types';
import React from 'react';

import SvgElement, * as SVG from '../SVG/src';

export class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.parent = React.createRef();

        this.svg = new SvgElement(this.props.width, this.props.height);

        this.svg.add(new SVG.Rect(20, 20, 100, 100, 'red', 0, 0, 'black', 3));
        this.svg.add(new SVG.Rect(140, 20, 100, 100, 'orange', 10, 10, 'black', 3));
        this.svg.add(new SVG.Circle(310, 70, 50, 'yellow', 'black', 3));
        this.svg.add(new SVG.Ellipse(410, 70, 30, 50, 'green', 'black', 3));
        this.svg.add(new SVG.Line(20, 140, 120, 240, 'blue', 3));
        this.svg.add(new SVG.PolyLine([[140, 140], [240, 240], [240, 140], [140, 240]], 'purple', 3));
        this.svg.add(new SVG.Polygon([[293, 140], [326, 140], [360, 173], [360, 206], [326, 240], [293, 240], [260, 206], [260, 173]], 'grey', 'black', 3));
        this.svg.add(new SVG.Path('M 380 140 v 100 q 100 0, 100 -100', 'black', 3));

        for (let i = 0; i < 1; i += 0.1) {
            this.svg.add(new SVG.Line(i * 200 + 20, 260, i * 200 + 20, 360, 'black', 3).strokeOpacity(i));
        }

        this.svg.add(new SVG.Line(20, 380, 20, 480, 'red', 10).strokeLineCap('butt'));
        this.svg.add(new SVG.Line(40, 380, 40, 480, 'red', 10).strokeLineCap('square'));
        this.svg.add(new SVG.Line(60, 380, 60, 480, 'red', 10).strokeLineCap('round'));

        this.svg.add(new SVG.PolyLine([[20, 550], [70, 500], [120, 550]], 'orange', 10).strokeLineJoin('miter'));
        this.svg.add(new SVG.PolyLine([[140, 550], [190, 500], [240, 550]], 'orange', 10).strokeLineJoin('round'));
        this.svg.add(new SVG.PolyLine([[260, 550], [310, 500], [360, 550]], 'orange', 10).strokeLineJoin('bevel'));

        this.svg.add(new SVG.Line(20, 570, 20, 670, 'green', 3).strokeLineCap('round').strokeDashArray(10));
        this.svg.add(new SVG.Line(40, 570, 40, 670, 'green', 3).strokeLineCap('round').strokeDashArray(20, 10));
        this.svg.add(new SVG.Line(60, 570, 60, 670, 'green', 3).strokeLineCap('round').strokeDashArray(20, 10, 1, 10));

        this.svg.add(new SVG.Polygon([[20, 790], [120, 690], [120, 790]]));

        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
        this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
    }

    componentDidUpdate() {
        this.svg.changeSize(this.props.width, this.props.height);
        this.svg.render(this.parent.current);
    }

    handleOnMouseDown(e) {
        this.mouse = {
            mouseX:    e.screenX,
            mouseY:    e.screenY,
            mouseDown: true
        };
        this.parent.current.onmousemove = this.handleOnMouseMove;
        this.parent.current.ontouchmove = this.handleOnMouseMove;
        this.parent.current.onmouseup = this.handleOnMouseUp;
        this.parent.current.ontouchend = this.handleOnMouseUp;
    }

    handleOnMouseMove(e) {
        let deltaX =  this.mouse.mouseX - e.screenX;
        let deltaY = this.mouse.mouseY - e.screenY;

        this.svg.moveViewBox(deltaX, deltaY);
        this.mouse = {
            ...this.state,
            mouseX: e.screenX,
            mouseY: e.screenY,
        };
    }

    handleOnMouseUp(e) {
        this.mouse = {
            mouseX: e.screenX,
            mouseY: e.screenY,
        };
        this.parent.current.onmousemove = null;
        this.parent.current.onmouseup = null;
    }

    render() {
        return (
            <div className="component canvas" onMouseDown={this.handleOnMouseDown} onTouchStart={this.handleOnMouseDown} ref={this.parent} />
        );
    }
}

Canvas.propTypes = {
    width:  PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};
