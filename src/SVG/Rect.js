import {Element} from './abstract';

export class Rect extends Element {
    constructor(x, y, width, height, rx = 0, ry = 0) {
        super('rect');

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rx = rx;
        this.ry = ry;

        this.move(x, y)
            .resize(width, height)
            .round(rx, ry);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.attr('x', x)
            .attr('y', y);
        return this;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
        this.attr('width', width)
            .attr('height', height);
        return this;
    }

    round(rx, ry) {
        this.attr('rx', rx)
            .attr('ry', ry);
        return this;
    }
}
