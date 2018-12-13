import PropTypes from 'prop-types';
import React from 'react';

import SvgElement, * as SVG from '../SVG/src';
import {distance, log_b, midpoint} from '../utils';

export class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.parent = React.createRef();

        this.prevTouches = {};
        this.touches = {};
        this.prevTouchCenter = [null, null];
        this.touchCenter = [null, null];
        this.initialTouchDistance = null;
        this.touchDistance = null;
        this.initialZoom = 1;
        this.totalTrackpadMovement = 0;
        this.zoomFactor = 400; // Lower for longer zooming distance, and vice versa
        this.touchZoomFactor = 237; // Same as zoomFactor, but for touches
        this.zoomAnimation = null;
        this.lastScrollTime = 0;
        this.scrollMode = 'mouse wheel';
        this.lastDeltaY = null;
        this.scrollTimeout = null;
        this.isScrolling = false;
        this.numScrollsAfterScrollStarted = 0;
        this.state = {
            canvas: {
                translate: [0, 0],
                zoom:      1
            }
        };
        this.zoomAnimation = null;
        this.curDrawObject = null;

        this.svg = new SvgElement(props.width, props.height);

        this.svg.add(new SVG.Rect(20, 20, 100, 100).attrs({
            fill:        'red',
            stroke:      'black',
            strokeWidth: 3
        }));
        this.svg.add(new SVG.Rect(140, 20, 100, 100, 20, 20).attrs({
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
        this.touchChange = this.touchChange.bind(this);
        this.handleMouseWheel = this.handleMouseWheel.bind(this);
        this.zoomToPoint = this.zoomToPoint.bind(this);
        this.handleOnMouseMoveDraw = this.handleOnMouseMoveDraw.bind(this);
        this.handleOnMouseUpDraw = this.handleOnMouseUpDraw.bind(this);
    }

    componentDidMount() {
        let handleTouches = e => {
            this.prevTouches = this.touches;
            for (let touch of e.changedTouches) {
                this.touches[touch.identifier] = [touch.pageX, touch.pageY];
            }
        };

        let removeTouches = e => {
            e.preventDefault();
            this.prevTouches = this.touches;
            this.touchCenter = [null, null];
            this.prevTouchCenter = [null, null];
            for (let touch of e.changedTouches) {
                delete this.touches[touch.identifier];
            }
        };

        this.parent.current.addEventListener('touchstart', e => {
            e.preventDefault();
            handleTouches(e);
            if (Object.keys(this.touches).length === 2) {
                this.initialZoom = this.state.canvas.zoom;
                this.initialTouchDistance = distance(this.touches[0], this.touches[1]);
            }
            this.touchChange();
        });
        this.parent.current.addEventListener('touchmove', e => {
            e.preventDefault();
            handleTouches(e);
            this.touchChange();
        });

        this.parent.current.addEventListener('touchend', removeTouches);

        this.svg.render(this.parent.current);
    }

    componentDidUpdate() {
        this.svg.changeSize(this.props.width, this.props.height);
        this.svg.setZoom(this.state.canvas.zoom);
        this.svg.setTranslate(...this.state.canvas.translate);
    }

    moveCanvas(x, y) {
        this.setState({
            ...this.state,
            canvas: {
                ...this.state.canvas,
                translate: [x, y]
            }
        });
    }

    /**
     * Zooms the canvas in to a point.
     *
     * @param {number} focusX - The x-coordinate (screen-space) of the point to zoom in to.
     * @param {number} focusY - The y-coordinate (screen-space) of the point to zoom in to.
     * @param {number} newZoom - The new `this.state.canvas.zoom` value.
     */
    zoomToPoint(focusX, focusY, newZoom) {
        if (newZoom < this.state.canvas.zoom) {
            document.body.style.cursor = 'zoom-in';
        } else if (newZoom > this.state.canvas.zoom) {
            document.body.style.cursor = 'zoom-out';
        }

        // newCanvasTranslate = [
        //     this.state.canvas.translate[0] + ((scrollMousePos[0] * prevState.canvas.zoom) * zoom),
        //     this.state.canvas.translate[1] + ((scrollMousePos[1] * prevState.canvas.zoom) * zoom)
        // ];

        this.setState({
            ...this.state,
            canvas: {
                ...this.state.canvas,
                translate: this.state.canvas.translate,
                zoom:      newZoom
            }
        });

        document.body.style.cursor = 'default';
    }

    handleMouseWheel(e) {
        e.preventDefault();
        e.persist();

        this.zoomToPoint(
            e.pageX,
            e.pageY,
            2 ** (log_b(this.state.canvas.zoom, 2) + e.deltaY / this.zoomFactor)
        );
    }

    handleOnMouseDown(e) {
        if (e.buttons === 4 || (e.buttons === 1 && e.ctrlKey)) {
            e.preventDefault();
            document.body.style.cursor = 'move';
            this.mouse = {
                mouseX:    e.pageX,
                mouseY:    e.pageY,
                mouseDown: true
            };

            this.parent.current.onmousemove = this.handleOnMouseMove;
            this.parent.current.onmouseup = this.handleOnMouseUp;
            this.parent.current.onmouseleave = e => {
                this.handleOnMouseUp(e, true);
            };
            this.parent.current.onmouseleave = e => { this.handleOnMouseUp(e, true); };
        } else if (e.buttons === 1) {
            let target = e.currentTarget;
            let boundingRect = target.getBoundingClientRect();
            const mousePosX = this.state.canvas.translate[0] + ((e.clientX - boundingRect.left) - (this.props.width / 2)) * this.state.canvas.zoom;
            const mousePosY = this.state.canvas.translate[1] + ((e.clientY - boundingRect.top) - (this.props.height / 2)) * this.state.canvas.zoom;

            console.log(mousePosX, mousePosY);
            this.curDrawObject = new SVG.Line(mousePosX, mousePosY, mousePosX, mousePosY).attrs({
                fill:        'black',
                stroke:      'black',
                strokeWidth: 3
            });
            this.svg.add(this.curDrawObject);
            this.parent.current.onmousemove = this.handleOnMouseMoveDraw;
            this.parent.current.onmouseup = this.handleOnMouseUpDraw;
        }
    }

    handleOnMouseMove(e) {
        let deltaX = (this.mouse.mouseX - e.pageX) * this.state.canvas.zoom;
        let deltaY = (this.mouse.mouseY - e.pageY) * this.state.canvas.zoom;

        this.moveCanvas(
            this.state.canvas.translate[0] + deltaX,
            this.state.canvas.translate[1] + deltaY
        );

        this.mouse = {
            ...this.state,
            mouseX: e.pageX,
            mouseY: e.pageY,
        };
    }

    handleOnMouseMoveDraw(e) {
        let target = e.currentTarget;
        let boundingRect = target.getBoundingClientRect();
        const mousePosX = this.state.canvas.translate[0] + ((e.clientX - boundingRect.left) - (this.props.width / 2)) * this.state.canvas.zoom;
        const mousePosY = this.state.canvas.translate[1] + ((e.clientY - boundingRect.top) - (this.props.height / 2)) * this.state.canvas.zoom;

        this.curDrawObject.end(mousePosX, mousePosY);
    }

    handleOnMouseUpDraw(e) {
        this.handleOnMouseMoveDraw(e);
        this.curDrawObject = null;
        this.parent.current.onmousemove = null;
        this.parent.current.onmouseup = null;
    }

    handleOnMouseUp(e, force = false) {
        if (e.buttons === 0 || force) {
            e.preventDefault();
            document.body.style.cursor = 'default';
            this.mouse = {
                mouseX: e.pageX,
                mouseY: e.pageY,
            };

            this.parent.current.onmousemove = null;
            this.parent.current.onmouseup = null;
            this.parent.current.onmouseleave = null;
        }
    }

    touchChange() {
        if (Object.keys(this.touches).length === 2) {
            let newState = this.state.canvas;

            this.prevTouchCenter = this.touchCenter;
            this.touchCenter = midpoint(this.touches[0], this.touches[1]);
            this.touchDistance = distance(this.touches[0], this.touches[1]);
            if (this.prevTouchCenter[0] !== null && this.touchCenter[0] !== null) {
                let dTouchCenter = [
                    this.prevTouchCenter[0] - this.touchCenter[0],
                    this.prevTouchCenter[1] - this.touchCenter[1]
                ];
                newState.translate = [
                    this.state.canvas.translate[0] + dTouchCenter[0] * this.state.canvas.zoom,
                    this.state.canvas.translate[1] + dTouchCenter[1] * this.state.canvas.zoom
                ];
            }

            if (this.initialTouchDistance !== null && this.touchDistance !== null) {
                let dTouchDistance = this.initialTouchDistance / this.touchDistance;
                newState.zoom = this.initialZoom * dTouchDistance;
            }

            this.setState({
                ...this.state,
                canvas: {
                    ...this.state.canvas,
                    ...newState
                }
            });
        }
    }

    render() {
        return (
            <div
                className="component canvas"
                style={{display: 'block', lineHeight: 0}}
                onMouseDown={this.handleOnMouseDown}
                onKeyPress={this.handleKeyPress}
                onWheel={this.handleMouseWheel}
                ref={this.parent}
            />
        );
    }
}

Canvas.propTypes = {
    width:  PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};
