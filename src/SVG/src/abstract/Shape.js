/** @file Describes a `Shape` class which represents SVG shapes in general. */

import {Element} from './Element';

/**
 * An abstract shape.
 */
export class Shape extends Element {
    /**
     * @constructor
     * @param {string} type - The name of the shape (i.e. 'rect' for a &lt;rect&gt;).
     * @param {string} [fill='black'] - The fill color of the shape.
     * @param {string} [strokeColor='black'] - The stroke color of the shape.
     * @param {number} [strokeWidth=0] - The stroke width of the shape.
     */
    constructor(type, fill = 'black', strokeColor = 'black', strokeWidth = 0) {
        super(type);

        this.type = type;
        this.fill = fill;

        this.changeFill(fill)
            .changeStroke(strokeColor, strokeWidth);
    }

    /**
     * Change the stroke color of the shape.
     *
     * @param {string} color - The new color of the shape stroke.
     * @param {string} width - The new width of the shape stroke.
     *
     * @returns {Element} This `Element` instance.
     */
    changeStroke(color, width) {
        this.attr('stroke', color)
            .attr('stroke-width', width);
        return this;
    }

    /**
     * Change the fill color of the shape.
     *
     * @param {string} color - The new color of the shape fill.
     *
     * @returns {Element} This `Element` instance.
     */
    changeFill(color) {
        return this.attr('fill', color);
    }
}
