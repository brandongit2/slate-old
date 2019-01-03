import {Element} from './abstract';

export class Circle extends Element {
    constructor(cx, cy, r) {
        super('circle');

        this.cx = cx;
        this.cy = cy;
        this.r = r;

        this.move(cx, cy)
            .resize(r);
    }

    move(cx, cy) {
        this.attr('cx', cx)
            .attr('cy', cy);
        return this;
    }

    resize(r) {
        return this.attr('r', r);
    }
}
