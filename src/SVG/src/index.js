/**
 * A library for creating and modifying SVGs with JavaScript.
 * @module SVG
 *
 * @file Describes a class `SvgElement` which makes a root (&lt;svg&gt;) tag.
 * @author Brandon Tsang
 */

import {Container} from './abstract';

export {Circle} from './Circle';
export {Ellipse} from './Ellipse';
export {Line} from './Line';
export {Link} from './Link';
export {Path} from './Path';
export {Polygon} from './Polygon';
export {PolyLine} from './PolyLine';
export {Rect} from './Rect';

/**
 * Represents the SVG container tag.
 */
class SvgElement extends Container {
    /**
     * Make an SVG element. Has the ability to contain child elements.
     * @constructor
     * @param {number} width - The width of the SVG element.
     * @param {number} height - The height of the SVG element.
     *
     * @classdesc
     * Represents an &lt;svg&gt; element.
     */
    constructor(width, height) {
        super('svg', width, height);

        this.translate = [0, 0];
        this.zoom = 1;

        this.el.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        this.el.setAttribute('version', '1.1');
        this.el.setAttribute('baseProfile', 'full');
        this.changeSize(width, height);
    }

    /**
     * Changes the dimensions of the SVG.
     * @override
     *
     * @param {(number|string)} width - The width of the container. ('unset' for no value)
     * @param {(number|string)} height - The height of the container. ('unset' for no value)
     *
     * @returns {SvgElement} This `SvgElement` instance.
     */
    changeSize(width, height) {
        this.width = width;
        this.height = height;

        this.attr('width', width);
        this.attr('height', height);
        this.updateViewBox();
        return this;
    }

    /**
     * Replaces the current global CSS.
     *
     * @param {string} css - The new CSS.
     *
     * @returns {Container} This `Container` element.
     */
    css(css) {
        let tag = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        tag.innerHTML = css;
        this.el.appendChild(tag);
        return this;
    }

    /**
     * Sets the translation of the SVG element. (For panning)
     *
     * @param {number} x - The new x coordinate of the origin, relative to the center of the SVG.
     * @param {number} y - The new y coordinate of the origin, relative to the center of the SVG.
     *
     * @returns {SvgElement} This `SvgElement` element.
     */
    setTranslate(x, y) {
        this.translate = [x, y];
        this.updateViewBox();
        return this;
    }

    /**
     * Sets the zoom of the SVG element.
     *
     * @param {number} zoom - The new x coordinate of the origin, relative to the center of the SVG.
     *
     * @returns {SvgElement} This `SvgElement` element.
     */
    setZoom(zoom) {
        this.zoom = zoom;
        this.updateViewBox();
        return this;
    }

    zoomBy(factor) {
        return this.setZoom(this.zoom * factor);
    }

    /**
     * Updates the translation and zoom of the SVG. For internal use only.
     */
    updateViewBox() {
        this.attr(
            'viewBox',
            `${this.translate[0]} ` +
            `${this.translate[1]} ` +
            `${this.width * this.zoom} ` +
            `${this.height * this.zoom}`
        );
    }
}

export default SvgElement;
