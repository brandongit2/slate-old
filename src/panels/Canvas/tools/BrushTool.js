import {generate} from 'shortid';

import {PolyLine} from '../../../svg';
import Tool from './Tool';

export class BrushTool extends Tool {
    strokes = {};

    addStroke = (source, x, y) => {
        if (this.canvasInfo.currentLayer != null && this.canvasInfo.currentLayer.type === 'draw') {
            let stroke = new PolyLine(
                [this.stcc(x, y), this.stcc(x, y)] // Repeated so that it's possible to draw dots
            ).attrs({
                stroke:         this.settings.brush.color,
                strokeWidth:    this.settings.brush.size,
                fill:           'none',
                strokeLinecap:  'round',
                strokeLinejoin: 'round'
            });
            this.strokes[source] = stroke;
            this.canvasInfo.canvas.add(stroke);
        } else {
            this.canvasInfo.showDialog(
                'Cannot begin drawing.',
                'You must be on a drawing layer in order to draw.'
            );
        }
    }

    addToStroke = (source, x, y) => {
        if (this.strokes[source]) this.strokes[source].addPoint(this.stcc(x, y));
    }

    endStroke = source => {
        if (this.strokes[source] != null) {
            let nodeId = generate();
            this.canvasInfo.addNode(nodeId, this.strokes[source]);
            this.canvasInfo.addToLayer(this.canvasInfo.currentLayer.id, nodeId);
            this.canvasInfo.switchLayer(this.canvasInfo.currentLayer.id);
        }
        delete this.strokes[source];
    }

    cancelStroke = source => {
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
        if (Object.keys(this.touches).length === 1) {
            this.addStroke('touch', ...Object.values(this.touches)[0]);
        }
    }

    touchMove(e) {
        super.touchMove(e);

        if (Object.keys(this.touches).length === 1) {
            this.addToStroke('touch', ...Object.values(this.touches)[0]);
        }
    }

    touchEnd(e) {
        super.touchEnd(e);

        this.endStroke('touch');
        this.numTouches = 0;
    }
}
