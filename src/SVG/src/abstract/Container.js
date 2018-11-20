/**
 * @file Describes a `Container` class which represents an SVG element which holds other elements.
 * @author Brandon Tsang
 **/

import {Element} from './Element';

/**
 * An SVG element which contains other elements.
 * @abstract
 */
export class Container extends Element {
    /**
     * @param {string} tagName - The name of the container tag (i.e. 'g' for a &lt;g&gt; tag).
     * @param {(number|string)} [width='unset'] - The width of the container. ('unset' for no value)
     * @param {(number|string)} [height='unset'] - The height of the container. ('unset' for no value)
     */
    constructor(tagName, width = 'unset', height = 'unset') {
        super(tagName);

        this.width = width;
        this.height = height;
    }

    /**
     * Add a child element to the container.
     *
     * @param {Element} element - An element to be added.
     *
     * @returns {Element} This `Element` instance.
     */
    add(element) {
        this.el.appendChild(element.el);
        return this;
    }

    /**
     * Changes the dimensions of the container.
     *
     * @param {(number|string)} width - The width of the container. ('unset' for no value)
     * @param {(number|string)} height - The height of the container. ('unset' for no value)
     *
     * @returns {Element} This `Element` instance.
     */
    changeSize(width, height) {
        this.width = width;
        this.height = height;

        this.attr('width', width);
        this.attr('height', height);
        return this;
    }
}
