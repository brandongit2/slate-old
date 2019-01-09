import {generate} from 'shortid';

import {Html} from '../../../svg';
import Tool from './Tool';

export class TextTool extends Tool {
    texts = {};

    begin = (source, x, y) => {
        let text = new Html(...this.stcc(x, y), 0, 0).setStyle({
            overflow: 'visible',
        });
        let nodeId = generate();

        let textarea = document.createElement('textarea');
        textarea.setAttribute('id', nodeId);
        textarea.style.width = '100%';
        textarea.style.height = '100%';
        textarea.style.fontSize = `${this.settings.text.fontSize}pt`;
        textarea.style.color = this.settings.text.color;
        textarea.setAttribute('class', 'box');
        text.append(textarea);
        this.canvas.add(text);
        textarea.focus();

        this.texts[source] = {
            obj:      text,
            startPos: this.stcc(x, y),
            textarea, nodeId
        };

        let focus = e => {
            if (e.buttons === 1) {
                e.preventDefault();
                e.stopPropagation();
                e.target.focus();
            }
        };
        text.el.addEventListener('mousedown', focus);
        text.el.addEventListener('touchstart', focus);

        textarea.addEventListener('blur', e => {
            if (e.target.value.length === 0) {
                this.removeThing(e.target.getAttribute('id'));
                this.canvas.el.removeChild(e.target.parentNode.parentNode);
            }
        });
    }

    resize = (source, x, y) => {
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

    end = source => {
        let text = this.texts[source];
        if (text) {
            if (text.obj.width < 20 || text.obj.height < 20) {
                text.obj.resize(128, 20);
                text.textarea.setAttribute('class', 'point');
            }

            this.addNode(this.currentGroup.id, text.nodeId, 'Text', text.obj);
            this.switchNode(text.nodeId);
        }
        delete this.texts[source];
    }

    mouseDown(e) {
        super.mouseDown(e);

        if (e.target.tagName === 'svg' && e.buttons === 1 && !e.ctrlKey) {
            this.begin('mouse', e.pageX, e.pageY);
        }
    }

    mouseMove(e) {
        super.mouseMove(e);

        if (this.texts.mouse) {
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

        if (e.target.tagName === 'svg' && Object.keys(this.touches).length === 1) {
            this.begin('touch', ...this.touches[0]);
        } else {
            this.end('touch');

            if (e.target.tagName === 'TEXTAREA') {
                e.target.focus();
            }
        }
    }

    touchMove(e) {
        super.touchMove(e);

        if (this.texts.touch && Object.keys(this.touches).length === 1) {
            this.resize('touch', ...this.touches[0]);
        }
    }

    touchEnd(e) {
        super.touchEnd(e);

        if (Object.keys(this.touches).length === 0) {
            this.end('touch');
        } else if (Object.keys(this.touches).length === 1) {
            this.begin('touch', ...this.touches[0]);
        }
    }
}
