import {Element} from './Element';

/**
 * An SVG element which contains other elements.
 */
export class Container extends Element {
    /**
     * @constructor
     * @param {string} tagName - The name of the container tag (i.e. 'g' for a &lt;g&gt; tag).
     * @param {number} [width=0] - The width of the container.
     * @param {number} [height=0] - The height of the container.
     */
    constructor(tagName, width = 0, height = 0) {
        super(tagName);

        this.props = {
            width, height
        };
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
     * @param {number} width - The width of the container.
     * @param {number} height - The height of the container.
     *
     * @returns {Element} This `Element` instance.
     */
    changeSize(width, height) {
        this.attr('width', width);
        this.attr('height', height);
        return this;
    }

    /**
     * Unsets the dimensions of the container.
     *
     * @returns {Element} This `Element` instance.
     */
    unsetSize() {
        this.removeAttribute('width');
        this.removeAttribute('height');
        return this;
    }
}
