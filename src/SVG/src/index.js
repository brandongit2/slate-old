/**
 * A library for creating and modifying SVGs with JavaScript.
 * @module SVG
 *
 * @file Describes a class `SvgElement` which makes an &lt;svg&gt; tag.
 * @author Brandon Tsang
 */

import {Container} from './abstract';

export {Link} from './Link';
export {Rect} from './Rect';

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

        this.el.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        this.el.setAttribute('version', '1.1');
        this.el.setAttribute('baseProfile', 'full');
        this.changeSize(width, height);
    }
}

export default SvgElement;
