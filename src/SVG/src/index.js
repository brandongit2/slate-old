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
     * @param {number} viewportX - The X coordinate of the top left of the viewport.
     * @param {number} viewportY - The Y coordinate of the top left of the viewport.
     * @param {number} viewportWidth - The width of the viewport.
     * @param {number} viewportHeight - The height of the viewport.
     * 
     * @classdesc
     * Represents an &lt;svg&gt; element.
     */
    constructor(width, height, viewportX, viewportY, viewportWidth, viewportHeight) {
        super('svg', width, height);

        this.viewport = {
            viewportWidth,
            viewportHeight,
            viewportX,
            viewportY
        };

        this.el.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        this.el.setAttribute('version', '1.1');
        this.el.setAttribute('baseProfile', 'full');

        this.updateViewport = this.updateViewport.bind(this);
        this.updateViewportSize = this.updateViewportSize.bind(this);
        this.updateViewportPosition = this.updateViewportPosition.bind(this);

        this.updateViewport();
    }

    updateViewportSize(width, height) {
        this.viewport = {
            ...this.viewport,
            viewportWidth:  width,
            viewportHeight: height
        };
        this.updateViewport();
    }

    updateViewportPosition(changeX, changeY) {
        this.viewport = {
            ...this.viewport,
            viewportX: this.viewport.viewportX + changeX,
            viewportY: this.viewport.viewportY + changeY
        };
        this.updateViewport();
    }

    updateViewport() {
        this.el.setAttribute('viewBox', `${this.viewport.viewportX} ${this.viewport.viewportY} ${this.viewport.viewportWidth} ${this.viewport.viewportHeight}`);
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
}

export default SvgElement;
