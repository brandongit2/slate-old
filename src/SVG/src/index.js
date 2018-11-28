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

    changeSize(width, height) {
        super.changeSize(width, height);
    }

    setViewBox(x, y) {
        return this.attr('viewBox', [
            x - (this.width * this.zoom) / 2,
            y - (this.height * this.zoom) / 2,
            this.width * this.zoom,
            this.height * this.zoom
        ].join(' '));
    }

    setZoom(zoom) {
        this.zoom = zoom;
        return this;
    }
}

export default SvgElement;
