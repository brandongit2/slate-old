/**
 * @file Describes a `Ellipse` class which makes an ellipse.
 * @author Brandon Tsang
 */

import {Shape} from './abstract';

/** Represents an SVG ellipse. */
export class Ellipse extends Shape {
    /**
     * Makes an SVG &lt;ellipse&gt; element.
     *
     * @param {number} cx - The x position of the center of the ellipse.
     * @param {number} cy - The y position of the center of the ellipse.
     * @param {number} rx - The x radius of the ellipse.
     * @param {number} ry - The y radius of the ellipse.
     * @param {string} fill - The color of the ellipse's fill.
     * @param {string} strokeColor - The color of the ellipse's stroke.
     * @param {number} strokeWidth - The width of the ellipse's stroke.
     */
    constructor(cx, cy, rx, ry, fill, strokeColor = 'black', strokeWidth = 0) {
        super('ellipse', fill, strokeColor, strokeWidth);

        /** The x position of the center of the ellipse. */
        this.cx = cx;
        /** The y position of the center of the ellipse. */
        this.cy = cy;
        /** The x radius of the ellipse. */
        this.rx = rx;
        /** The y radius of the ellipse. */
        this.ry = ry;

        this.move(cx, cy)
            .resize(rx, ry);
    }

    /**
     * Moves the ellipse.
     *
     * @param {number} cx - The new x position of the center of the ellipse.
     * @param {number} cy - The new y position of the center of the ellipse.
     *
     * @returns {Shape} This `Shape` instance.
     */
    move(cx, cy) {
        this.attr('cx', cx)
            .attr('cy', cy);
        return this;
    }

    /**
     * Resize the rectangle.
     *
     * @param {number} rx - The new x radius of the ellipse.
     * @param {number} ry - The new y radius of the ellipse.
     *
     * @returns {Shape} This `Shape` instance.
     */
    resize(rx, ry) {
        this.attr('rx', rx)
            .attr('ry', ry);
        return this;
    }
}
