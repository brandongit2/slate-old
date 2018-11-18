/**
 * @file Describes a `Path` class which makes a path.
 * @author Brandon Tsang
 */

import {Shape} from './abstract';

/** Represents an SVG path. */
export class Path extends Shape {
    /**
     * Makes an SVG &lt;path&gt; element.
     *
     * @param {number} path - The commands for the path.
     * @param {string} [strokeColor='black'] - The color of the line.
     * @param {number} [strokeWidth=0] - The width of the line.
     */
    constructor(path, strokeColor = 'black', strokeWidth = 0) {
        super('path', 'none', strokeColor, strokeWidth);

        /** The commands for the path. */
        this.path = path;

        this.setPath(path);
    }

    /**
     * Sets the commands for the path.
     *
     * @param {string} path - The commands for the path.
     *
     * @returns {Shape} This `Shape` instance.
     */
    setPath(path) {
        return this.attr('d', path);
    }
}
