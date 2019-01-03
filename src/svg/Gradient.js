// UNFINISHED - DO NOT USE

import {Element} from './abstract';

export class Gradient extends Element {
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
        this.attr('x', x)
            .attr('y', y);
        return this;
    }

    resize(width, height) {
        this.attr('width', width)
            .attr('height', height);
        return this;
    }
}
