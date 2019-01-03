import {Element} from './abstract';

export class Path extends Element {
    constructor(path) {
        super('path');

        /** The commands for the path. */
        this.path = path;

        this.setPath(path);
    }

    // Sets the commands for the path.
    setPath(path) {
        return this.attr('d', path);
    }
}
