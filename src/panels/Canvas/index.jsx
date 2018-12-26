import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {
    addLayer,
    addToLayer,
    addNode,
    removeLayer,
    removeFromLayer,
    removeNode,
    addSelection,
    removeSelection
} from '../../actions';
import SvgElement from '../../SVG';
import {distance, log_b, midpoint} from '../../utils';
import {Brush, RectTool, TextTool} from './tools';
import './index.css';

export class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
        this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
        this.handleMouseWheel = this.handleMouseWheel.bind(this);
        this.touchChange = this.touchChange.bind(this);
        this.updateTool = this.updateTool.bind(this);

        this.parent = React.createRef();
        this.svg = new SvgElement();
        this.touches = {}; // A list of all fingers on the screen.
        this.prevTouches = {};
        this.prevTouchCenter = [null, null];
        this.touchCenter = [null, null];
        this.initialTouchDistance = null;
        this.touchDistance = null;
        this.initialZoom = 1; // Stores zoom at moment two fingers touch the screen. Used for touch zooming.
        this.zoomFactor = 400; // Lower for longer zooming distance, and vice versa
        this.canvasInfo = { // For passing on to tool
            width:           this.svg.el.clientWidth,
            height:          this.svg.el.clientHeight,
            canvas:          this.svg,
            addLayer:        this.props.addLayer,
            addToLayer:      this.props.addToLayer,
            addNode:         this.props.addNode,
            removeLayer:     this.props.removeLayer,
            removeFromLayer: this.props.removeFromLayer,
            removeNode:      this.props.removeNode,
            addSelection:    this.props.addSelection,
            removeSelection: this.props.removeSelection
        };

        this.updateTool();

        this.state = {
            canvas: {
                translate: [0, 0],
                zoom:      1
            }
        };
    }

    componentDidMount() {
        let handleTouches = e => {
            this.prevTouches = this.touches;
            for (let touch of e.changedTouches) {
                this.touches[touch.identifier] = [touch.pageX, touch.pageY];
            }
        };

        this.parent.current.addEventListener('touchstart', e => {
            e.preventDefault();
            handleTouches(e);
            if (Object.keys(this.touches).length === 2) {
                this.initialZoom = this.state.canvas.zoom;
                this.initialTouchDistance = distance(
                    Object.values(this.touches)[0],
                    Object.values(this.touches)[1]
                );
            }
            this.touchChange();
        });
        this.parent.current.addEventListener('touchmove', e => {
            e.preventDefault();
            handleTouches(e);
            this.touchChange();
        });

        this.parent.current.addEventListener('touchend', e => {
            e.preventDefault();
            this.prevTouches = this.touches;
            this.touchCenter = [null, null];
            this.prevTouchCenter = [null, null];
            for (let touch of e.changedTouches) {
                delete this.touches[touch.identifier];
            }
        });

        this.svg.render(this.parent.current);
        this.svg.updateSize();
    }

    componentDidUpdate() {
        this.svg.updateSize();
        this.svg.setZoom(this.state.canvas.zoom);
        this.svg.setTranslate(...this.state.canvas.translate);

        this.canvasInfo.width = this.svg.el.getBoundingClientRect().width;
        this.canvasInfo.height = this.svg.el.getBoundingClientRect().height;
        this.currentTool.updateCanvasInfo(this.canvasInfo);

        this.updateTool();
    }

    updateTool() {
        switch (this.props.currentTool) {
            case 'brush':
                this.currentTool = new Brush(this.canvasInfo);
                break;
            case 'rectangle':
                this.currentTool = new RectTool(this.canvasInfo);
                break;
            case 'text':
                this.currentTool = new TextTool(this.canvasInfo);
                break;
            default:
        }

        this.currentTool.updateProps(this.props.toolSettings);
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

    handleMouseWheel(e) {
        e.preventDefault();
        e.persist();

        this.setState({
            ...this.state,
            canvas: {
                ...this.state.canvas,
                translate: this.state.canvas.translate,
                zoom:      2 ** (log_b(this.state.canvas.zoom, 2) + e.deltaY / this.zoomFactor)
            }
        });
    }

    handleOnMouseDown(e) {
        if (e.buttons === 4 || (e.buttons === 1 && e.ctrlKey)) {
            e.preventDefault();
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

    handleOnMouseUp(e, force = false) {
        if (e.buttons === 0 || force) {
            e.preventDefault();
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
            this.touchCenter = midpoint(
                Object.values(this.touches)[0], Object.values(this.touches)[1]
            );
            this.touchDistance = distance(
                Object.values(this.touches)[0], Object.values(this.touches)[1]
            );
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
                className={
                    `panel-container canvas${this.props.grow ? ' grow' : ''}`
                }
                onMouseDown={e => {
                    e.preventDefault();
                    this.handleOnMouseDown(e);
                    this.currentTool.mouseDown(e);
                }}
                onMouseMove={e => { this.currentTool.mouseMove(e); }}
                onMouseUp={e => { this.currentTool.mouseUp(e); }}
                onMouseLeave={e => { this.currentTool.mouseLeave(e); }}
                onTouchStart={e => { this.currentTool.touchStart(e); }}
                onTouchMove={e => { this.currentTool.touchMove(e); }}
                onTouchEnd={e => { this.currentTool.touchEnd(e); }}
                onKeyPress={this.handleKeyPress}
                onWheel={this.handleMouseWheel}
                ref={this.parent}
            />
        );
    }
}

Canvas.propTypes = {
    addLayer:        PropTypes.func.isRequired,
    addToLayer:      PropTypes.func.isRequired,
    addNode:         PropTypes.func.isRequired,
    removeLayer:     PropTypes.func.isRequired,
    removeFromLayer: PropTypes.func.isRequired,
    removeNode:      PropTypes.func.isRequired,
    addSelection:    PropTypes.func.isRequired,
    removeSelection: PropTypes.func.isRequired,
    grow:            PropTypes.bool.isRequired,
    currentTool:     PropTypes.string.isRequired,
    toolSettings:    PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    currentTool:  state.currentTool,
    toolSettings: state.toolSettings
});

const mapDispatchToProps = dispatch => ({
    addLayer:        (id, name, nodes) => { dispatch(addLayer(id, name, nodes)); },
    addToLayer:      (id, node) => { dispatch(addToLayer(id, node)); },
    addNode:         (id, node) => { dispatch(addNode(id, node)); },
    removeNode:      id => { dispatch(removeNode(id)); },
    removeLayer:     id => { dispatch(removeLayer(id)); },
    removeFromLayer: (id, node) => { dispatch(removeFromLayer(id, node)); },
    addSelection:    id => { dispatch(addSelection(id)); },
    removeSelection: id => { dispatch(removeSelection(id)); }
});

Canvas = connect(mapStateToProps, mapDispatchToProps)(Canvas); /* eslint-disable-line no-class-assign */
