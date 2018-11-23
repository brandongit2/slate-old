import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {newTouch} from '../actions';
import SvgElement, * as SVG from '../SVG/src';

export class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.parent = React.createRef();

        this.svg = new SvgElement(props.width, props.height);

        this.svg.add(new SVG.Rect(20, 20, 100, 100).attrs({
            fill:        'red',
            stroke:      'black',
            strokeWidth: 3
        }));
        this.svg.add(new SVG.Rect(140, 20, 100, 100).attrs({
            fill:        'orange',
            stroke:      'black',
            strokeWidth: 3
        }));
        this.svg.add(new SVG.Circle(310, 70, 50).attrs({
            fill:        'yellow',
            stroke:      'black',
            strokeWidth: 3
        }));
        this.svg.add(new SVG.Ellipse(410, 70, 30, 50).attrs({
            fill:        'green',
            stroke:      'black',
            strokeWidth: 3
        }));
        this.svg.add(new SVG.Line(20, 140, 120, 240).attrs({
            fill:        'blue',
            stroke:      'black',
            strokeWidth: 3
        }));
        this.svg.add(new SVG.PolyLine([[140, 140], [240, 240], [240, 140], [140, 240]]).attrs({
            fill:        'none',
            stroke:      'purple',
            strokeWidth: 3
        }));
        this.svg.add(new SVG.Polygon([[293, 140], [326, 140], [360, 173], [360, 206], [326, 240], [293, 240], [260, 206], [260, 173]]).attrs({
            fill:        'grey',
            stroke:      'black',
            strokeWidth: 3
        }));
        this.svg.add(new SVG.Path('M 380 140 v 100 q 100 0, 100 -100').attrs({
            fill:        'none',
            stroke:      'black',
            strokeWidth: 3
        }));

        for (let i = 0; i < 1; i += 0.1) {
            this.svg.add(new SVG.Line(i * 200 + 20, 260, i * 200 + 20, 360).attrs({
                fill:          'green',
                stroke:        'black',
                strokeWidth:   3,
                strokeOpacity: i
            }));
        }

        this.svg.add(new SVG.Line(20, 380, 20, 480).attrs({
            stroke:        'red',
            strokeWidth:   10,
            strokeLinecap: 'butt'
        }));
        this.svg.add(new SVG.Line(40, 380, 40, 480).attrs({
            stroke:        'red',
            strokeWidth:   10,
            strokeLinecap: 'square'
        }));
        this.svg.add(new SVG.Line(60, 380, 60, 480).attrs({
            stroke:        'red',
            strokeWidth:   10,
            strokeLinecap: 'round'
        }));

        this.svg.add(new SVG.PolyLine([[20, 550], [70, 500], [120, 550]]).attrs({
            fill:           'none',
            stroke:         'orange',
            strokeWidth:    10,
            strokeLinejoin: 'miter'
        }));
        this.svg.add(new SVG.PolyLine([[140, 550], [190, 500], [240, 550]]).attrs({
            fill:           'none',
            stroke:         'orange',
            strokeWidth:    10,
            strokeLinejoin: 'round'
        }));
        this.svg.add(new SVG.PolyLine([[260, 550], [310, 500], [360, 550]]).attrs({
            fill:           'none',
            stroke:         'orange',
            strokeWidth:    10,
            strokeLinejoin: 'bevel'
        }));

        this.svg.add(new SVG.Line(20, 570, 20, 670).attrs({
            stroke:          'green',
            strokeWidth:     3,
            strokeLinecap:   'round',
            strokeDasharray: '10'
        }));
        this.svg.add(new SVG.Line(40, 570, 40, 670).attrs({
            stroke:          'green',
            strokeWidth:     3,
            strokeLinecap:   'round',
            strokeDasharray: '20, 10'
        }));
        this.svg.add(new SVG.Line(60, 570, 60, 670).attrs({
            stroke:          'green',
            strokeWidth:     3,
            strokeLinecap:   'round',
            strokeDasharray: '20, 10, 1, 10'
        }));

        this.svg.add(new SVG.Polygon([[20, 790], [120, 690], [120, 790]]));

        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
        this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
        this.handleTouch = this.handleTouch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidUpdate() {
        console.log(this.props.height);
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
        this.parent.current.onmouseup = this.handleOnMouseUp;
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

    handleTouch(e) {
        this.props.dispatch(newTouch(
            e.touches.length - 1,
            e.touches[e.touches.length - 1].screenX,
            e.touches[e.touches.length - 1].screenY
        ));
    }

    handleTouchMove(e) {
        console.log(e.touches);
    }

    handleKeyPress(e) {
        console.log(e);
    }

    render() {
        return (
            <div
                className="component canvas"
                style={{display: 'block', lineHeight: 0}}
                onMouseDown={this.handleOnMouseDown}
                onTouchStart={this.handleTouch}
                onTouchMove={this.handleTouchMove}
                onKeyPress={this.handleKeyPress}
                ref={this.parent}
            />
        );
    }
}

Canvas = connect(null)(Canvas); // eslint-disable-line no-class-assign

Canvas.propTypes = {
    dispatch: PropTypes.func.isRequired,
    width:    PropTypes.number.isRequired,
    height:   PropTypes.number.isRequired
};
