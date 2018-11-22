/**
 * @file Describes a `Ellipse` class which makes an ellipse.
 * @author Brandon Tsang
 */

import {Element} from './abstract';

/** Represents an SVG ellipse. */
export class Ellipse extends Element {
    /**
     * Makes an SVG &lt;ellipse&gt; element.
     *
     * @param {number} cx - The x position of the center of the ellipse.
     * @param {number} cy - The y position of the center of the ellipse.
     * @param {number} rx - The x radius of the ellipse.
     * @param {number} ry - The y radius of the ellipse.
     */
    constructor(cx, cy, rx, ry) {
        super('ellipse');

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
     * @returns {Ellipse} This `Ellipse` instance.
     */
    move(cx, cy) {
        this.attr('cx', cx)
            .attr('cy', cy);
        return this;
    }

    /**
     * Resize the ellipse.
     *
     * @param {number} rx - The new x radius of the ellipse.
     * @param {number} ry - The new y radius of the ellipse.
     *
     * @returns {Ellipse} This `Ellipse` instance.
     */
    resize(rx, ry) {
        this.attr('rx', rx)
            .attr('ry', ry);
        return this;
    }
}
