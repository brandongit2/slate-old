import {generate} from 'shortid';

import {PolyLine} from '../../../svg';
import Tool from './Tool';

export class BrushTool extends Tool {
    strokes = {};

    addStroke = (source, x, y) => {
        let nodeId = generate();
        let stroke = new PolyLine(
            [this.stcc(x, y), this.stcc(x, y)] // Repeated so that it's possible to draw dots
        ).attrs({
            id:             nodeId,
            fill:           'none',
            stroke:         this.settings.brush.color,
            strokeWidth:    this.settings.brush.size,
            strokeLinecap:  'round',
            strokeLinejoin: 'round'
        });
        this.strokes[source] = stroke;

        if (this.currentGroup.type === 'draw') {
            this.addNode(this.currentGroup.id, nodeId, 'Stroke', stroke);
        } else {
            let newGroupId = generate();
            this.addGroup(this.currentGroup.id, newGroupId, 'Drawing', 'draw', false);
            this.addNode(newGroupId, nodeId, 'Stroke', stroke);
        }
        this.switchNode(nodeId);
    }

    addToStroke = (source, x, y) => {
        if (this.strokes[source]) this.strokes[source].addPoint(this.stcc(x, y));
    }

    endStroke = source => {
        delete this.strokes[source];
    }

    cancelStroke = source => {
        this.canvas.remove(this.strokes[source]);
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
