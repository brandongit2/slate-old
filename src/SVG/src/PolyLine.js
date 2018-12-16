/**
 * @file Describes a `PolyLine` class which makes a polyline.
 * @author Brandon Tsang
 */

import {Element} from './abstract';

/** Represents an SVG line. */
export class PolyLine extends Element {
    /**
     * Makes an SVG &lt;polyline&gt; element.
     *
     * @param {Array.<number[]>} points - The points that make up the polyline. In the format of [[x1, y1], [x2, y2], ...]
     */
    constructor(points) {
        super('polyline');

        /** The points that make up the polyline. */
        this.points = points;

        this.setPoints(points);
    }

    /**
     * Sets the points of the polyline.
     *
     * @param {object[]} points - The points that make up the polyline.
     *
     * @returns {PolyLine} This `PolyLine` instance.
     */
    setPoints(points) {
        let str = '';

        for (let point of points) {
            str += `${point[0]} ${point[1]}, `;
        }
        str = str.slice(0, -2);

        return this.attr('points', str);
    }

    /**
     * Adds a point to the polyline.
     *
     * @param {number[]} point - The points to add to the polyline.
     *
     * @returns {PolyLine} This `PolyLine` instance.
     */
    addPoint(point) {
        return this.attr(
            'points',
            this.el.getAttribute('points').length > 0 ?
                this.el.getAttribute('points') + `, ${point[0]} ${point[1]}` :
                `${point[0]} ${point[1]}`
        );
    }
}
