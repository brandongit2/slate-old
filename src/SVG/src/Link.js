/**
 * @file Describes a `Link` class, equivalent to an SVG &lt;a&gt; tag.
 * @author Brandon Tsang
 */

import {Container} from './abstract';

export class Link extends Container {
    /**
     * Makes an &lt;a&gt; element.
     *
     * @param {string} dest - The destination of the link.
     */
    constructor(dest) {
        super('a');

        this.props = {
            dest
        };

        this.attr('href', dest);
    }
}
