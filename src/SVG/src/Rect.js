/**
 * @file Describes a `Rect` class which makes a rectangle.
 * @author Brandon Tsang
 */

import {Element} from './abstract';

export class Rect extends Element {
    /**
     * Makes an SVG &lt;rect&gt; element.
     *
     * @param {number} width - The width of the rectangle.
     * @param {number} height - The height of the rectangle.
     * @param {string} fill - The color of the rectangle fill.
     */
    constructor(width, height, fill) {
        super('rect');

        this.props = {
            width, height, fill
        };

        this.resize(width, height);
        this.changeFill(fill);
    }

    /**
     * Change the fill color of the rectangle.
     *
     * @param {string} color - The new color of the rectangle fill.
     *
     * @returns {Element} This `Element` instance.
     */
    changeFill(color) {
        this.attr('fill', color);
        return this;
    }

    /**
     * Resize the rectangle.
     *
     * @param {number} width - The new width of the rectangle.
     * @param {number} height - The new height of the rectangle.
     *
     * @returns {Element} This `Element` instance.
     */
    resize(width, height) {
        this.attr('width', width);
        this.attr('height', height);
        return this;
    }
}
