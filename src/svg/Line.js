import {Element} from './abstract';

export class Line extends Element {
    constructor(x1, y1, x2, y2) {
        super('line');

        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.beginning(x1, y1)
            .end(x2, y2);
    }

    // Moves the beginning of the line.
    beginning(x, y) {
        this.attr('x1', x)
            .attr('y1', y);
        return this;
    }

    // Moves the end of the line.
    end(x, y) {
        this.attr('x2', x)
            .attr('y2', y);
        return this;
    }
}
