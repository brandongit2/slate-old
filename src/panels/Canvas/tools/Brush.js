import {PolyLine} from '../../../SVG/src';
import Tool from './Tool';

export class Brush extends Tool {
    constructor(canvasInfo) {
        super(canvasInfo);

        this.strokes = {};

        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    addStroke(source, x, y) {
        let stroke = new PolyLine(
            [this.stcc(x, y), this.stcc(x, y)] // Repeated so that it's possible to draw dots
        ).attrs({
            stroke:         'black',
            strokeWidth:    this.props.brush.size,
            fill:           'none',
            strokeLinecap:  'round',
            strokeLinejoin: 'round'
        });
        this.strokes[source] = stroke;
        this.canvasInfo.canvas.add(stroke);
    }

    addToStroke(source, x, y) {
        if (this.strokes[source]) this.strokes[source].addPoint(this.stcc(x, y));
    }

    endStroke(source) {
        delete this.strokes[source];
    }

    cancelStroke(source) {
        this.canvasInfo.canvas.remove(this.strokes[source]);
        delete this.strokes[source];
    }

    mouseDown(e) {
        super.mouseDown(e);

        if (e.buttons === 1 && !e.ctrlKey) {
            this.addStroke('mouse', e.pageX, e.pageY);
        }
    }

    mouseMove(e) {
        super.mouseMove(e);

        if (this.strokes.mouse) {
            this.addToStroke('mouse', e.pageX, e.pageY);
        }
    }

    mouseUp(e) {
        super.mouseUp(e);

        this.endStroke('mouse');
    }

    mouseLeave(e) {
        super.mouseLeave(e);

        if (this.strokes.mouse) {
            this.addToStroke('mouse', e.pageX, e.pageY);
            this.endStroke('mouse');
        }
    }

    touchStart(e) {
        super.touchStart(e);

        if (this.touches.length === 1) {
            this.addStroke('touch', ...this.touches[0]);
        }

        setTimeout(() => {
            // if (this.touches.length > 1) this.cancelStroke('touch');
        }, 100);
    }

    touchMove(e) {
        super.touchMove(e);

        if (this.touches.length === 1) {
            this.addToStroke('touch', ...this.touches[0]);
        }
    }

    touchEnd(e) {
        super.touchEnd(e);

        this.endStroke('touch');

        this.numTouches = 0;
    }
}
