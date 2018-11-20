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

    setViewBox(x1, y1, x2, y2) {
        return this.attr('viewBox', [x1, y1, x2, y2].join(' '));
    }

    moveViewBox(dX, dY) {
        this.translate[0] += dX;
        this.translate[1] += dY;
        console.log(this.translate[0], this.translate[1]);
        return this.setViewBox(
            this.translate[0],
            this.translate[1],
            this.translate[0] + this.width,
            this.translate[1] + this.height,
        );
    }
}

export default SvgElement;
