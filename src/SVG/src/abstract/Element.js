/**
 * @file Describes an SVG element.
 * @author Brandon Tsang
 */

/**
 * An SVG element.
 */
export class Element {
    /**
     * Makes an element.
     * @abstract
     *
     * @param {string} tagName - The name of the tag being created.
     */
    constructor(tagName) {
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
        this.el.setAttributeNS(null, name, value);
        return this;
    }

    /**
     * Set the class name of this element.
     *
     * @param {string} name - The new class name.
     *
     * @returns {Element} This `Element` instance.
     */
    setClass(name) {
        this.attr('class', name);
        return this;
    }

    /**
     * Add a class to the already existing list of class names for this element.
     *
     * @param {string} name - The class name to be added.
     *
     * @returns {Element} This `Element` instance.
     */
    addClass(name) {
        this.attr('class', `${this.el.getAttribute('class')} ${name}`);
        return this;
    }

    /**
     * Set/Change the id for this element.
     *
     * @param {string} id - The new id for this element.
     *
     * @returns {Element} This `Element` instance.
     */
    id(id) {
        this.attr('id', id);
        return this;
    }

    /**
     * Set/Change the language for this element.
     *
     * @param {string} lang - The new langauge for this element.
     *
     * @returns {Element} This `Element` instance.
     */
    lang(lang) {
        this.attr('lang', lang);
        return this;
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

        this.attr('style', str);

        return this;
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

        this.attr('style', `${this.el.getAttribute('class')} ${str}`);

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
        this.attr('tabindex', value);
        return this;
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
