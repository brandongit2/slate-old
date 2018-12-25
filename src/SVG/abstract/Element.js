export class Element {
    constructor(tagName) {
        this.el = document.createElementNS('http://www.w3.org/2000/svg', tagName);
    }

    attr(name, value) {
        if (value === 'unset') {
            this.rmAttr(name);
        }

        switch (name) {
            case 'gradient':
                this.el.setAttributeNS(null, 'fill', `url(#${value.name})`);
                break;
            default:
                this.el.setAttributeNS(null, name, value);
        }

        return this;
    }

    rmAttr(name) {
        /* eslint-disable no-fallthrough */
        switch (name) {
            case 'gradient':
                if (!this.el.getAttribute('fill').match(/^url\(#.+\)$/u)) return;
            default:
        }
        /* eslint-enable no-fallthrough */
        this.el.removeAttributeNS(null, name);
        return this;
    }

    attrs(attrs) {
        for (let attr in attrs) {
            let newAttrName = attr.replace(/([A-Z])/gu, $1 => `-${$1.toLowerCase()}`);
            this.attr(newAttrName, attrs[attr]);
        }

        return this;
    }

    setClass(name) {
        return this.attr('class', name);
    }

    addClass(name) {
        return this.attr('class', `${this.el.getAttribute('class')} ${name}`);
    }

    id(id) {
        return this.attr('id', id);
    }

    setStyle(style) {
        let str = '';

        for (let prop in style) {
            str += `${prop}: ${style[prop]}; `;
        }

        return this.attr('style', str);
    }

    addStyle(style) {
        let str = '';

        for (let prop in style) {
            str += `${prop}: ${style[prop]}; `;
        }

        return this.attr('style', `${this.el.getAttribute('class')} ${str}`);
    }

    move(x, y) {
        this.attr('x', x)
            .attr('y', y);
        return this;
    }

    tabIndex(value) {
        return this.attr('tabindex', value);
    }

    render(parent) {
        parent.appendChild(this.el);
    }
}
