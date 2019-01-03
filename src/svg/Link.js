import {Container} from './abstract';

export class Link extends Container {
    constructor(dest) {
        super('a');

        this.props = {
            dest
        };

        this.attr('href', dest);
    }
}
