import {Text} from '../../../SVG/src';
import Tool from './Tool';

export class TextTool extends Tool {
    constructor(canvasInfo) {
        super(canvasInfo);

        this.mouseDown = this.mouseDown.bind(this);
        this.touchStart = this.touchStart.bind(this);
    }

    makeText(x, y) {
        this.canvasInfo.canvas.add(new Text(...this.stcc(x, y), 'fuck you'));
    }

    mouseDown(e) {
        super.mouseDown(e);

        if (e.buttons === 1 && !e.ctrlKey) {
            this.makeText(e.pageX, e.pageY);
        }
    }

    touchStart(e) {
        super.touchStart(e);

        if (this.touches.length === 1) {
            this.makeText(...this.touches[0]);
        }
    }
}
