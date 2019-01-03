import {Element} from './abstract';

export class Ellipse extends Element {
    constructor(cx, cy, rx, ry) {
        super('ellipse');

        this.cx = cx;
        this.cy = cy;
        this.rx = rx;
        this.ry = ry;

        this.move(cx, cy)
            .resize(rx, ry);
    }

    move(cx, cy) {
        this.attr('cx', cx)
            .attr('cy', cy);
        return this;
    }

    resize(rx, ry) {
        this.attr('rx', rx)
            .attr('ry', ry);
        return this;
    }
}
