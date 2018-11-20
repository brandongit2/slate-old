/**
 * @file Describes an SVG element.
 * @author Brandon Tsang
 */

/**
 * An SVG element.
 * @abstract
 */
export class Element {
    /**
     * Makes an element.
     *
     * @param {string} tagName - The name of the tag being created.
     */
    constructor(tagName) {
        /** The element itself. */
        this.el = document.createElementNS('http://www.w3.org/2000/svg', tagName);
    }

    /**
     * Set/Change an attribute for this element.
     *
     * @param {string} name - The name of the attribute to be modified.
     * @param {(string|number)} value - The value of the attribute.
     *
     * @returns {Element} This `Element` instance.
     */
    attr(name, value) {
        if (value === 'unset') {
            this.rmAttr(name);
        } else {
            this.el.setAttributeNS(null, name, value);
        }
        return this;
    }

    /**
     * Removes the specified attribute from the element.
     *
     * @param {string} name - The vame of the attribute to be removed.
     *
     * @returns {Element} This `Element` instance.
     */
    rmAttr(name) {
        this.el.removeAttributeNS(null, name);
        return this;
    }

    /**
     * Set the class name of this element.
     *
     * @param {string} name - The new class name. ('unset' for no value)
     *
     * @returns {Element} This `Element` instance.
     */
    setClass(name) {
        return this.attr('class', name);
    }

    /**
     * Add a class to the already existing list of class names for this element.
     *
     * @param {string} name - The class name to be added.
     *
     * @returns {Element} This `Element` instance.
     */
    addClass(name) {
        return this.attr('class', `${this.el.getAttribute('class')} ${name}`);
    }

    /**
     * Set/Change the id for this element.
     *
     * @param {string} id - The new id for this element. ('unset' for no value)
     *
     * @returns {Element} This `Element` instance.
     */
    id(id) {
        return this.attr('id', id);
    }

    /**
     * Set/Change the language for this element.
     *
     * @param {string} lang - The new langauge for this element. ('unset' for no value)
     *
     * @returns {Element} This `Element` instance.
     */
    lang(lang) {
        return this.attr('lang', lang);
    }

    /**
     * Set a new style for this element (replaces current style).
     *
     * @param {object[]} style - The new style(s) for the element. A list of `object`s, containing property-value pairs for CSS. (e.g. `{fill: red, stroke: black}`)
     *
     * @returns {Element} This `Element` instance.
     */
    setStyle(style) {
        let str = '';

        for (let prop in style) {
            str += `${prop}: ${style[prop]}; `;
        }

        return this.attr('style', str);
    }

    /**
     * Add a style/styles to this element.
     *
     * @param {object[]} style - The new style(s) for the element. A list of `object`s, containing property-value pairs for CSS. (e.g. `{fill: red, stroke: black}`)
     *
     * @returns {Element} This `Element` instance.
     */
    addStyle(style) {
        let str = '';

        for (let prop in style) {
            str += `${prop}: ${style[prop]}; `;
        }

        return this.attr('style', `${this.el.getAttribute('class')} ${str}`);
    }

    /**
     * Moves the element.
     *
     * @param {number} x - The new x position of the element.
     * @param {number} y - The new y position of the element.
     *
     * @returns {Element} This `Element` instance.
     */
    move(x, y) {
        this.attr('x', x)
            .attr('y', y);
        return this;
    }

    /**
     * Sets the tab index for this element.
     *
     * @param {number} value - The tab index for this element.
     *
     * @returns {Element} This `Element` instance.
     */
    tabIndex(value) {
        return this.attr('tabindex', value);
    }

    /**
     * Appends this element to the specified parent element.
     *
     * @param {object} parent - An HTML element to append the &lt;svg&gt; element to.
     */
    render(parent) {
        parent.appendChild(this.el);
    }
}
