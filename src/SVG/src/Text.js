/**
 * @file Describes a `Text` class which makes a text node.
 * @author Brandon Tsang
 */

import {Element} from './abstract';

/** Represents an SVG text node. */
export class Text extends Element {
    /**
     * Makes an SVG &lt;text&gt; element.
     *
     * @param {number} x - The x position of the text node.
     * @param {number} y - The y position of the text node.
     * @param {string} text - The text to be rendered.
     */
    constructor(x, y, text) {
        super('text');

        /** The x position of the text node. */
        this.x = x;
        /** The y position of the text node. */
        this.y = y;
        /** The text to be rendered. */
        this.text = text;

        this.move(x, y)
            .setText(text);
    }

    /**
     * Moves the text node.
     *
     * @param {number} x - The new x position of the text node.
     * @param {number} y - The new y position of the text node.
     *
     * @returns {Text} This `Text` instance.
     */
    move(x, y) {
        this.attr('x', x)
            .attr('y', y);
        return this;
    }

    /**
     * Moves the text node.
     *
     * @param {string} text - The text to be rendered.
     *
     * @returns {Text} This `Text` instance.
     */
    setText(text) {
        this.el.innerHTML = text;
        return this;
    }
}
