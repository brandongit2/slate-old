/**
 * @file Describes a `Path` class which makes a path.
 * @author Brandon Tsang
 */

import {Element} from './abstract';

/** Represents an SVG path. */
export class Path extends Element {
    /**
     * Makes an SVG &lt;path&gt; element.
     *
     * @param {number} path - The commands for the path.
     */
    constructor(path) {
        super('path');

        /** The commands for the path. */
        this.path = path;

        this.setPath(path);
    }

    /**
     * Sets the commands for the path.
     *
     * @param {string} path - The commands for the path.
     *
     * @returns {Path} This `Path` instance.
     */
    setPath(path) {
        return this.attr('d', path);
    }
}
