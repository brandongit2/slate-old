import {generate} from 'shortid';

import {Rect} from '../../../SVG';
import Tool from './Tool';

export class RectTool extends Tool {
    constructor(canvasInfo) {
        super(canvasInfo);

        this.rects = {};

        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    begin(source, x, y) {
        console.log(this.canvasInfo.currentLayer);
        if (this.canvasInfo.currentLayer != null && this.canvasInfo.currentLayer.type === 'draw') {
            let rect = new Rect(...this.stcc(x, y), 0, 0)
                .attrs({
                    strokeWidth: this.props.rect.strokeWidth,
                    stroke:      this.props.rect.stroke,
                    fill:        this.props.rect.fill
                });
            let nodeId = generate();
            this.rects[source] = {
                obj:      rect,
                startPos: this.stcc(x, y),
                nodeId
            };
            this.canvasInfo.canvas.add(rect);
        } else {
            this.canvasInfo.showDialog(
                'Cannot begin drawing.',
                'You must be on a drawing layer in order to draw.'
            );
        }
    }

    resize(source, x, y) {
        let pos = this.rects[source].startPos.slice(); // .slice() copies array

        let width = this.stcc(x, y)[0] - this.rects[source].startPos[0];
        if (width < 0) {
            width *= -1;
            pos[0] -= width;
        }

        let height = this.stcc(x, y)[1] - this.rects[source].startPos[1];
        if (height < 0) {
            height *= -1;
            pos[1] -= height;
        }

        this.rects[source].obj.move(...pos);
        this.rects[source].obj.resize(width, height);
    }

    end(source) {
        let rect = this.rects[source];
        if (rect != null) {
            if (rect.obj.width === 0 && rect.obj.height === 0) {
                this.canvasInfo.canvas.remove(rect.obj);
            } else {
                this.canvasInfo.addNode(rect.nodeId, rect);
                this.canvasInfo.addToLayer(this.canvasInfo.currentLayer.id, rect.nodeId);
                this.canvasInfo.switchLayer(this.canvasInfo.currentLayer.id);
            }
        }
        this.rects[source] = null;
    }

    mouseDown(e) {
        super.mouseDown(e);

        if (e.buttons === 1 && !e.ctrlKey) this.begin('mouse', e.pageX, e.pageY);
    }

    mouseMove(e) {
        super.mouseMove(e);

        if (this.rects != null && this.rects.mouse != null) { /* eslint-disable-line no-eq-null */
            this.resize('mouse', e.pageX, e.pageY);
        }
    }

    mouseUp(e) {
        super.mouseUp(e);

        this.end('mouse');
    }

    mouseLeave(e) {
        super.mouseLeave(e);

        /* eslint-disable-next-line no-eq-null */
        if (this.rects != null && this.rects.mouse != null) {
            this.resize('mouse', e.pageX, e.pageY);
            this.end('mouse');
        }
    }

    touchStart(e) {
        super.touchStart(e);

        if (this.touches.length === 1) {
            this.begin('touch', ...this.touches[0]);
        } else {
            this.end('touch');
        }
    }

    touchMove(e) {
        super.touchMove(e);

        /* eslint-disable-next-line no-eq-null */
        if (this.touches.length === 1 && this.rects != null && this.rects.touch != null) {
            this.resize('touch', ...this.touches[0]);
        }
    }

    touchEnd(e) {
        super.touchEnd(e);

        if (this.touches.length === 0) {
            this.end('touch');
        } else if (this.touches.length === 1) {
            this.begin('touch', ...this.touches[0]);
        }
    }
}
