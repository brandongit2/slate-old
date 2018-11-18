/**
 * @file Describes a `Polygon` class which makes a polygon.
 * @author Brandon Tsang
 */

import {Shape} from './abstract';

/** Represents an SVG polygon. */
export class Polygon extends Shape {
    /**
     * Makes an SVG &lt;polygon&gt; element.
     *
     * @param {object[]} points - The points that make up the polygon. In the format of [[x1, y1], [x2, y2], ...]
     * @param {string} fill - The fill color of the polygon.
     * @param {string} [strokeColor='black'] - The color of the polygon.
     * @param {number} [strokeWidth=0] - The width of the polygon.
     */
    constructor(points, fill, strokeColor = 'black', strokeWidth = 0) {
        super('polygon', fill, strokeColor, strokeWidth);

        /** The points that make up the polygon. */
        this.points = points;

        this.setPoints(points);
    }

    /**
     * Sets the points of the polygon.
     *
     * @param {object[]} points - The points that make up the polygon.
     *
     * @returns {Shape} This `Shape` instance.
     */
    setPoints(points) {
        let str = '';

        for (let point of points) {
            str += `${point[0]} ${point[1]}, `;
        }
        str = str.slice(0, -2);

        return this.attr('points', str);
    }
}
