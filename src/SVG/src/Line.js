/**
 * @file Describes a `Line` class which makes a line.
 * @author Brandon Tsang
 */

import {Shape} from './abstract';

/** Represents an SVG line. */
export class Line extends Shape {
    /**
     * Makes an SVG &lt;line&gt; element.
     *
     * @param {number} x1 - The x position of the beginning of the line.
     * @param {number} y1 - The y position of the beginning of the line.
     * @param {number} x2 - The x position of the end of the line.
     * @param {number} y2 - The y position of the end of the line.
     * @param {string} [strokeColor='black'] - The color of the line.
     * @param {number} [strokeWidth=0] - The width of the line.
     */
    constructor(x1, y1, x2, y2, strokeColor = 'black', strokeWidth = 0) {
        super('line', 'none', strokeColor, strokeWidth);

        /** The x position of the end of the line. */
        this.x1 = x1;
        /** The y position of the end of the line. */
        this.y1 = y1;
        /** The x position of the end of the line. */
        this.x2 = x2;
        /** The y position of the end of the line. */
        this.y2 = y2;

        this.beginning(x1, y1)
            .end(x2, y2);
    }

    /**
     * Moves the beginning of the line.
     *
     * @param {number} x - The new x position of the beginning of the line.
     * @param {number} y - The new y position of the beginning of the line.
     *
     * @returns {Shape} This `Shape` instance.
     */
    beginning(x, y) {
        this.attr('x1', x)
            .attr('y1', y);
        return this;
    }

    /**
     * Moves the end of the line.
     *
     * @param {number} x - The new x position of the end of the line.
     * @param {number} y - The new y position of the end of the line.
     *
     * @returns {Shape} This `Shape` instance.
     */
    end(x, y) {
        this.attr('x2', x)
            .attr('y2', y);
        return this;
    }
}