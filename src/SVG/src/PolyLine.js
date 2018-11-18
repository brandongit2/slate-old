/**
 * @file Describes a `PolyLine` class which makes a polyline.
 * @author Brandon Tsang
 */

import {Shape} from './abstract';

/** Represents an SVG line. */
export class PolyLine extends Shape {
    /**
     * Makes an SVG &lt;polyline&gt; element.
     *
     * @param {object[]} points - The points that make up the polyline. In the format of [[x1, y1], [x2, y2], ...]
     * @param {string} [strokeColor='black'] - The color of the polyline.
     * @param {number} [strokeWidth=0] - The width of the polyline.
     */
    constructor(points, strokeColor = 'black', strokeWidth = 0) {
        super('polyline', 'none', strokeColor, strokeWidth);

        /** The points that make up the polyline. */
        this.points = points;

        this.setPoints(points);
    }

    /**
     * Sets the points of the polyline.
     *
     * @param {object[]} points - The points that make up the polyline.
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
