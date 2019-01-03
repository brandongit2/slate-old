import {Element} from './abstract';

export class Text extends Element {
    constructor(x, y, text) {
        super('text');

        this.x = x;
        this.y = y;
        this.text = text;

        this.move(x, y)
            .setText(text);
    }

    move(x, y) {
        this.attr('x', x)
            .attr('y', y);
        return this;
    }

    setText(text) {
        this.el.innerHTML = text;
        return this;
    }
}
