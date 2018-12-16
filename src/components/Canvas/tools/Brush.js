import {PolyLine} from '../../../SVG/src';
import Tool from './Tool';

export class Brush extends Tool {
    constructor(canvasInfo) {
        super(canvasInfo);

        // strokes[0] - mouse strokes
        // strokes[1] - touch strokes
        this.strokes = [];

        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    addStroke(id, x, y) {
        let stroke = new PolyLine(
            [this.stcc(x, y), this.stcc(x, y)] // Repeated so that it's possible to draw dots
        ).attrs({
            stroke:        'black',
            strokeWidth:   3,
            fill:          'none',
            strokeLinecap: 'round'
        });
        this.strokes[id] = stroke;
        this.canvasInfo.canvas.add(stroke);
    }

    addToStroke(id, x, y) {
        this.strokes[id].addPoint(this.stcc(x, y));
    }

    endStroke(id) {
        delete this.strokes[id];
    }

    mouseDown(e) {
        super.mouseDown(e);

        this.addStroke(0, e.pageX, e.pageY);
    }

    mouseMove(e) {
        super.mouseMove(e);

        console.log('brush');
        if (this.strokes[0]) {
            this.addToStroke(0, e.pageX, e.pageY);
        }
    }

    mouseUp(e) {
        super.mouseUp(e);

        this.endStroke(0);
    }

    mouseLeave(e) {
        super.mouseLeave(e);

        if (this.strokes[0]) {
            this.addToStroke(0, e.pageX, e.pageY);
            this.endStroke(0);
        }
    }

    touchStart(e) {
        super.touchStart(e);

        if (this.touches.length === 1) {
            this.addStroke(1, ...this.touches[0]);
        } else {
            this.endStroke(1);
        }
    }

    touchMove(e) {
        super.touchMove(e);

        if (this.touches.length === 1) {
            this.addToStroke(1, ...this.touches[0]);
        }
    }

    touchEnd(e) {
        super.touchEnd(e);

        if (this.touches.length === 0) {
            this.endStroke(1);
        } else if (this.touches.length === 1) {
            this.addStroke(1, ...this.touches[0]);
        }
    }
}
