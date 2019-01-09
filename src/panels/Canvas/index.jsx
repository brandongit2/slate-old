import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {
    showDialog,
    addGroup,
    addNode,
    removeGroup,
    removeNode,
    moveNode,
    switchNode
} from '../../actions';
import SvgElement from '../../svg';
import {distance, log_b, midpoint} from '../../utils';
import {BrushTool, RectTool, TextTool} from './tools';
import './index.css';

const ZOOM_FACTOR = 400; // Lower for longer zooming distance, and vice versa
const toolNameToClass = {
    brush:     BrushTool,
    rectangle: RectTool,
    text:      TextTool
};

export class Canvas extends React.Component {
    mouse = {
        x:      null,
        y:      null,
        isDown: false
    };
    touches = {
        list:            {},
        prev:            {},
        center:          [null, null],
        prevCenter:      [null, null],
        initialDistance: null,
        distance:        null
    };
    initialZoom = 1; // Stores zoom at moment two fingers touch the screen. Used for touch zooming.

    constructor(props) {
        super(props);

        this.state = {
            canvas: {
                translate: [0, 0],
                zoom:      1
            }
        };

        this.parent = React.createRef();
        this.svg = new SvgElement();

        this.updateTool();
    }

    /**************************** LIFECYCLE METHODS *****************************/

    componentDidMount = () => {
        this.svg.render(this.parent.current);
        this.svg.updateSize();

        // These event listeners must be added to the ref in order to make them
        // non-passive.
        this.parent.current.addEventListener(
            'touchstart', this.handleTouchStart, {passive: false}
        );
        this.parent.current.addEventListener(
            'touchmove', this.handleTouchMove, {passive: false}
        );
        this.parent.current.addEventListener(
            'touchend', this.handleTouchEnd, {passive: false}
        );
    }

    componentDidUpdate = () => {
        this.svg.updateSize();
        this.svg.setZoom(this.state.canvas.zoom);
        this.svg.setTranslate(...this.state.canvas.translate);

        this.updateTool();
    }

    /****************************** EVENT HANDLERS ******************************/

    handleMouseDown = e => {
        e.preventDefault();

        if (e.buttons === 4 || (e.buttons === 1 && e.ctrlKey)) {
            this.mouse = {
                x:      e.pageX,
                y:      e.pageY,
                isDown: true
            };
        }

        this.currentTool.mouseDown(e);
    }

    handleMouseMove = e => {
        e.preventDefault();

        if (this.mouse.isDown) {
            let deltaX = (this.mouse.x - e.pageX) * this.state.canvas.zoom;
            let deltaY = (this.mouse.y - e.pageY) * this.state.canvas.zoom;

            this.moveCanvas(
                this.state.canvas.translate[0] + deltaX,
                this.state.canvas.translate[1] + deltaY
            );

            this.mouse = {
                x:      e.pageX,
                y:      e.pageY,
                isDown: true
            };
        }

        this.currentTool.mouseMove(e);
    }

    handleMouseUp = e => {
        e.preventDefault();

        if (e.buttons === 0) {
            this.mouse = {
                x:      e.pageX,
                y:      e.pageY,
                isDown: false
            };
        }

        this.currentTool.mouseUp(e);
    }

    handleMouseWheel = e => {
        e.preventDefault();
        e.persist();

        this.setState({
            canvas: {
                ...this.state.canvas,
                translate: this.state.canvas.translate,
                zoom:      2 ** (log_b(this.state.canvas.zoom, 2) + e.deltaY / ZOOM_FACTOR)
            }
        });

        this.currentTool.mouseWheel(e);
    }

    handleTouchStart = e => {
        e.preventDefault();

        this.updateTouches(e);
        if (Object.keys(this.touches.list).length === 2) {
            this.initialZoom = this.state.canvas.zoom;
            this.touches.initialDistance = distance(
                ...Object.values(this.touches.list)
            );
        }
        this.touchChange();

        this.currentTool.touchStart(e);
    };

    handleTouchMove = e => {
        e.preventDefault();

        this.updateTouches(e);
        this.touchChange();

        this.currentTool.touchMove(e);
    };

    handleTouchEnd = e => {
        e.preventDefault();

        this.touches.prev = this.touches.list;
        this.touches.center = [null, null];
        this.touches.prevCenter = [null, null];
        for (let touch of e.changedTouches) {
            delete this.touches.list[touch.identifier];
        }

        this.currentTool.touchEnd(e);
    };

    /****************************** OTHER METHODS *******************************/

    moveCanvas = (x, y) => {
        this.setState({
            canvas: {
                ...this.state.canvas,
                translate: [x, y]
            }
        });
    }

    touchChange = () => { // For when a touch is added or moved
        if (Object.keys(this.touches.list).length === 2) {
            let newState = this.state.canvas;

            this.touches.prevCenter = this.touches.center;
            this.touches.center = midpoint(...Object.values(this.touches.list));
            this.touches.distance = distance(...Object.values(this.touches.list));

            if (this.touches.prevCenter[0] !== null && this.touches.center[0] !== null) {
                let dTouchCenter = [
                    this.touches.prevCenter[0] - this.touches.center[0],
                    this.touches.prevCenter[1] - this.touches.center[1]
                ];
                newState.translate = [
                    this.state.canvas.translate[0] + dTouchCenter[0] * this.state.canvas.zoom,
                    this.state.canvas.translate[1] + dTouchCenter[1] * this.state.canvas.zoom
                ];
            }

            if (this.touches.initialDistance !== null && this.touches.distance !== null) {
                let dTouchDistance = this.touches.initialDistance / this.touches.distance;
                newState.zoom = this.initialZoom * dTouchDistance;
            }

            this.setState({
                canvas: {
                    ...this.state.canvas,
                    ...newState
                }
            });
        }
    }

    updateTool = () => {
        this.currentTool = new toolNameToClass[this.props.currentToolName]();

        this.currentTool.updateProps({
            width:  this.svg.el.getBoundingClientRect().width,
            height: this.svg.el.getBoundingClientRect().height,
            canvas: this.svg,

            currentGroup: this.props.currentGroup,
            currentNode:  this.props.currentNode,

            addGroup:    this.props.addGroup,
            addNode:     this.props.addNode,
            removeGroup: this.props.removeGroup,
            removeNode:  this.props.removeNode,
            showDialog:  this.props.showDialog,
            switchNode:  this.props.switchNode,
        });
        this.currentTool.updateSettings(this.props.toolSettings);
    }

    updateTouches = e => {
        this.touches.prev = this.touches.list;
        for (let touch of e.changedTouches) {
            this.touches.list[touch.identifier] = [touch.pageX, touch.pageY];
        }
    }

    render = () => {
        return (
            <div className="canvas"
                 ref={this.parent}
                 onWheel={this.handleMouseWheel}
                 onMouseDown={this.handleMouseDown}
                 onMouseMove={this.handleMouseMove}
                 onMouseUp={this.handleMouseUp}
                 onMouseLeave={this.handleMouseLeave} />
        );
    }
}

Canvas.propTypes = {
    showDialog:      PropTypes.func.isRequired,
    addGroup:        PropTypes.func.isRequired,
    addNode:         PropTypes.func.isRequired,
    removeGroup:     PropTypes.func.isRequired,
    removeNode:      PropTypes.func.isRequired,
    switchNode:      PropTypes.func.isRequired,
    groups:          PropTypes.object.isRequired,
    currentGroup:    PropTypes.object.isRequired,
    currentNode:     PropTypes.object.isRequired,
    currentToolName: PropTypes.string.isRequired,
    toolSettings:    PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    groups:       state.groups,
    currentGroup: (() => {
        if (state.currentNode === 'none') {
            return {id: 'root', ...state.groups.root};
        } else {
            let currentGroup;
            for (let groupId of Object.keys(state.groups)) {
                if (state.groups[groupId].nodes.indexOf(state.currentNode) !== -1) {
                    currentGroup = {
                        id: groupId,
                        ...state.groups[groupId]
                    };
                }
            }
            return currentGroup;
        }
    })(),
    currentNode: state.nodes[state.currentNode]
        ? state.nodes[state.currentNode]
        : {id: 'none', displayName: ''},
    currentToolName: state.currentTool,
    toolSettings:    state.toolSettings
});

const mapDispatchToProps = dispatch => ({
    showDialog: (title, content) => { dispatch(showDialog(title, content)); },
    addGroup:   (parentGroup, id, displayName, groupType) => {
        dispatch(addGroup(parentGroup, id, displayName, groupType));
    },
    addNode: (parentGroup, id, displayName, svgObject) => {
        dispatch(addNode(parentGroup, id, displayName, svgObject));
    },
    removeGroup: id => { dispatch(removeGroup(id)); },
    removeNode:  id => { dispatch(removeNode(id)); },
    moveNode:    (nodeId, parent, index) => { dispatch(moveNode(nodeId, parent, index)); },
    switchNode:  id => { dispatch(switchNode(id)); }
});

Canvas = connect(mapStateToProps, mapDispatchToProps)(Canvas); /* eslint-disable-line no-class-assign */
