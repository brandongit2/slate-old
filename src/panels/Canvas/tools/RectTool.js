import {generate} from 'shortid';

import {Rect} from '../../../svg';
import Tool from './Tool';

export class RectTool extends Tool {
    rects = {};

    begin = (source, x, y) => {
        let nodeId = generate();
        let rect = new Rect(...this.stcc(x, y), 0, 0)
            .attrs({
                id:          nodeId,
                strokeWidth: this.settings.rect.strokeWidth,
                stroke:      this.settings.rect.stroke,
                fill:        this.settings.rect.fill
            });
        this.rects[source] = {
            obj:      rect,
            startPos: this.stcc(x, y),
            nodeId
        };
        this.canvas.add(rect);
    }

    resize = (source, x, y) => {
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

    end = source => {
        let rect = this.rects[source];
        if (rect) {
            if (rect.obj.width === 0 && rect.obj.height === 0) {
                this.canvas.remove(rect.obj);
            } else {
                if (this.currentGroup.type === 'draw') {
                    this.addNode(this.currentGroup.id, rect.nodeId, 'Rect', rect.obj);
                } else {
                    let newGroupId = generate();
                    this.addGroup(this.currentGroup.id, newGroupId, 'Drawing', 'draw', false);
                    this.addNode(newGroupId, rect.nodeId, 'Rect', rect.obj);
                }
                this.switchNode(rect.nodeId);
            }
        }

        delete this.rects[source];
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

        if (Object.keys(this.touches).length === 1) {
            try {
                this.begin('touch', ...this.touches[0]);
            } catch {
                this.end('touch');
            }
        } else {
            this.end('touch');
        }
    }

    touchMove(e) {
        super.touchMove(e);

        if (
            Object.keys(this.touches).length === 1
            && this.rects != null
            && this.rects.touch != null
        ) {
            this.resize('touch', ...this.touches[0]);
        }
    }

    touchEnd(e) {
        super.touchEnd(e);

        if (Object.keys(this.touches).length === 0) {
            this.end('touch');
        } else if (Object.keys(this.touches).length === 1) {
            try {
                this.begin('touch', ...this.touches[0]);
            } catch {
                this.end('touch');
            }
        }
    }
}
