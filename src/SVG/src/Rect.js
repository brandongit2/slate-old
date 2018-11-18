/**
 * @file Describes a `Rect` class which makes a rectangle.
 * @author Brandon Tsang
 */

import {Shape} from './abstract';

/** Represents an SVG rectangle. */
export class Rect extends Shape {
    /**
     * Makes an SVG &lt;rect&gt; element.
     *
     * @param {number} x - The x position of the rectangle.
     * @param {number} y - The y position of the rectangle.
     * @param {number} width - The width of the rectangle.
     * @param {number} height - The height of the rectangle.
     * @param {string} fill - The color of the rectangle's fill.
     * @param {number} [rx=0] - The horizontal aspect of the rectangle's corner roundness.
     * @param {number} [ry=0] - The vertical aspect of the rectangle's corner roundness.
     * @param {string} [strokeColor='black'] - The color of the rectangle's stroke.
     * @param {number} [strokeWidth=0] - The width of the rectangle's stroke.
     */
    constructor(x, y, width, height, fill, rx = 0, ry = 0, strokeColor = 'black', strokeWidth = 0) {
        super('rect', fill, strokeColor, strokeWidth);

        /** The x position of the rectangle. */
        this.x = x;
        /** The y position of the rectangle. */
        this.y = y;
        /** The width of the rectangle. */
        this.width = width;
        /** The height of the rectangle. */
        this.height = height;
        /** The horizontal corner roundness of the rectangle. */
        this.rx = rx;
        /** The vertical corner roundness of the rectangle. */
        this.ry = ry;

        this.move(x, y)
            .resize(width, height)
            .round(rx, ry);
    }

    /**
     * Moves the rectangle.
     *
     * @param {number} x - The new x position of the rectangle.
     * @param {number} y - The new y position of the rectangle.
     *
     * @returns {Shape} This `Shape` instance.
     */
    move(x, y) {
        this.attr('x', x)
            .attr('y', y);
        return this;
    }

    /**
     * Resize the rectangle.
     *
     * @param {number} width - The new width of the rectangle.
     * @param {number} height - The new height of the rectangle.
     *
     * @returns {Shape} This `Shape` instance.
     */
    resize(width, height) {
        this.attr('width', width)
            .attr('height', height);
        return this;
    }

    /**
     * Set the roundness of the corners of the rectangle.
     *
     * @param {number} rx - The horizontal aspect of the corner roundness.
     * @param {number} ry - The vertical aspect of the corner roundness.
     *
     * @returns {Shape} This `Shape` instance.
     */
    round(rx, ry) {
        this.attr('rx', rx)
            .attr('ry', ry);
        return this;
    }
}
