import {generate} from 'shortid';

import {Html} from '../../../SVG';
import Tool from './Tool';

export class TextTool extends Tool {
    constructor(canvasInfo) {
        super(canvasInfo);

        this.texts = {};

        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    begin(source, x, y) {
        let text = new Html(...this.stcc(x, y), 0, 0).setStyle({
            overflow: 'visible'
        });
        let textarea = document.createElement('textarea');
        textarea.style.width = '100%';
        textarea.style.height = '100%';
        textarea.setAttribute('class', 'box');
        text.append(textarea);
        this.canvasInfo.canvas.add(text);
        textarea.focus();
        let nodeId = generate();
        let layerId = generate();
        this.texts[source] = {
            obj:      text,
            startPos: this.stcc(x, y),
            textarea, nodeId
        };

        let focus = e => {
            e.preventDefault();
            e.stopPropagation();
            e.target.focus();
        };
        text.el.addEventListener('mousedown', focus);
        text.el.addEventListener('touchstart', focus);

        textarea.addEventListener('blur', e => {
            if (e.target.value.length === 0) {
                this.canvasInfo.removeLayer(layerId);
                this.canvasInfo.removeNode(nodeId);
                this.canvasInfo.canvas.remove(text);
            }
        });

        this.canvasInfo.addNode(nodeId, text);
        this.canvasInfo.addLayer(layerId, 'text', 'Text', nodeId);
    }

    resize(source, x, y) {
        let pos = this.texts[source].startPos.slice(); // .slice() copies array

        let width = this.stcc(x, y)[0] - this.texts[source].startPos[0];
        if (width < 0) {
            width *= -1;
            pos[0] -= width;
        }

        let height = this.stcc(x, y)[1] - this.texts[source].startPos[1];
        if (height < 0) {
            height *= -1;
            pos[1] -= height;
        }

        this.texts[source].obj.move(...pos);
        this.texts[source].obj.resize(width, height);
    }

    end(source) {
        if (this.texts[source] && this.texts[source] !== null) {
            if (this.texts[source].obj.width < 20 || this.texts[source].obj.height < 20) {
                this.texts[source].obj.resize(128, 20);
                this.texts[source].textarea.setAttribute('class', 'point');
            }
        }
        this.texts[source] = null;
    }

    mouseDown(e) {
        super.mouseDown(e);

        if (e.target.tagName === 'svg' && e.buttons === 1 && !e.ctrlKey) {
            e.preventDefault();
            this.begin('mouse', e.pageX, e.pageY);
        }
    }

    mouseMove(e) {
        super.mouseMove(e);

        if (this.texts.mouse && this.texts.mouse !== null) {
            this.resize('mouse', e.pageX, e.pageY);
        }
    }

    mouseUp(e) {
        super.mouseUp(e);

        this.end('mouse');
    }

    mouseLeave(e) {
        super.mouseLeave(e);

        if (this.texts.mouse) {
            this.resize('mouse', e.pageX, e.pageY);
            this.end('mouse');
        }
    }

    touchStart(e) {
        super.touchStart(e);

        if (e.target.tagName === 'svg' && this.touches.length === 1) {
            this.begin('touch', ...this.touches[0]);
        } else {
            this.end('touch');
        }
    }

    touchMove(e) {
        super.touchMove(e);

        if (this.texts.touch !== null && this.touches.length === 1) {
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
