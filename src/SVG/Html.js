import {Element} from './abstract';

export class Html extends Element {
    constructor(x, y, width, height) {
        super('foreignObject');

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.html = document.createElement('html');
        this.html.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
        this.html.style.width = '100%';
        this.html.style.height = '100%';
        this.el.appendChild(this.html);

        this.move(x, y)
            .resize(width, height);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.attr('x', x)
            .attr('y', y);
        return this;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
        this.attr('width', width)
            .attr('height', height);
        return this;
    }

    append(el) {
        this.html.appendChild(el);
    }
}
