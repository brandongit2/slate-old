/**
 * @file Describes a `Circle` class which makes a circle.
 * @author Brandon Tsang
 */

import {Element} from './abstract';

/** Represents an SVG circle. */
export class Circle extends Element {
    /**
     * Makes an SVG &lt;circle&gt; element.
     *
     * @param {number} cx - The x position of the center of the circle.
     * @param {number} cy - The y position of the center of the circle.
     * @param {number} r - The radius of the circle.
     */
    constructor(cx, cy, r) {
        super('circle');

        /** The x position of the center of the circle. */
        this.cx = cx;
        /** The y position of the center of the circle. */
        this.cy = cy;
        /** The radius of the circle. */
        this.r = r;

        this.move(cx, cy)
            .resize(r);
    }

    /**
     * Moves the circle.
     *
     * @param {number} cx - The new x position of the center of the circle.
     * @param {number} cy - The new y position of the center of the circle.
     *
     * @returns {Circle} This `Circle` instance.
     */
    move(cx, cy) {
        this.attr('cx', cx)
            .attr('cy', cy);
        return this;
    }

    /**
     * Resize the circle.
     *
     * @param {number} r - The new radius of the circle.
     *
     * @returns {Circle} This `Circle` instance.
     */
    resize(r) {
        return this.attr('r', r);
    }
}
