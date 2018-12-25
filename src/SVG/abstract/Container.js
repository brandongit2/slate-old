import {Element} from './Element';

export class Container extends Element {
    constructor(tagName, width = 'unset', height = 'unset') {
        super(tagName);

        this.width = width;
        this.height = height;
    }

    add(element) {
        this.el.appendChild(element.el);
        return this;
    }

    remove(element) {
        this.el.removeChild(element.el);
        return this;
    }

    addHTML(element) {
        this.el.appendChild(element.el);
        return this;
    }

    changeSize(width, height) {
        this.width = width;
        this.height = height;

        this.attr('width', width);
        this.attr('height', height);
        return this;
    }
}
