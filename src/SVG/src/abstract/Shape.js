/** @file Describes a `Shape` class which represents SVG shapes in general. */

import {Element} from './Element';

/**
 * An abstract shape.
 */
export class Shape extends Element {
    /**
     * @constructor
     * @param {string} type - The name of the shape (i.e. 'rect' for a &lt;rect&gt;).
     * @param {string} [fill='black'] - The fill color of the shape.
     * @param {string} [strokeColor='black'] - The stroke color of the shape.
     * @param {number} [strokeWidth=0] - The stroke width of the shape.
     */
    constructor(type, fill = 'black', strokeColor = 'black', strokeWidth = 0) {
        super(type);

        this.type = type;
        this.fill = fill;

        this.changeFill(fill)
            .changeStroke(strokeColor, strokeWidth);
    }

    /**
     * Change the stroke color of the shape.
     *
     * @param {string} color - The new color of the shape stroke.
     * @param {string} width - The new width of the shape stroke.
     *
     * @returns {Shape} This `Shape` instance.
     */
    changeStroke(color, width) {
        this.attr('stroke', color)
            .attr('stroke-width', width);
        return this;
    }

    /**
     * Change the fill color of the shape.
     *
     * @param {string} color - The new color of the shape fill.
     *
     * @returns {Shape} This `Shape` instance.
     */
    changeFill(color) {
        return this.attr('fill', color);
    }

    /**
     * Determines how shapes are filled. If set to 'nonzero', all space within a shape will be filled. If set to 'evenodd', only areas filled an even amount of times are shown filled. See {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-rule} for more details.
     *
     * @param {string} rule - Either 'nonzero' or 'evenodd'.
     *
     * @returns {Shape} This `Shape` instance.
     */
    fillRule(rule) {
        return this.attr('fill-rule', rule);
    }

    /**
     * Change the fill opacity of the shape.
     *
     * @param {number} opacity - A number from 0 to 1 which represents the opacity of the fill.
     *
     * @returns {Shape} This `Shape` instance.
     */
    fillOpacity(opacity) {
        return this.attr('fill-opacity', opacity);
    }

    /**
     * Change the dash type of the shape's stroke.
     *
     * @param {...number} dashArray - A list of numbers representing the dash array of the shape's stroke.
     *
     * @returns {Shape} This `Shape` instance.
     */
    strokeDashArray(...dashArray) {
        let str = '';

        for (let x of dashArray) {
            str += `${x}, `;
        }
        return this.attr('stroke-dasharray', str.slice(0, -2));
    }

    /**
     * Change the offset of the dash of the shape's stroke.
     *
     * @param {number} offset - The offset of the dash of the shape's stroke.
     *
     * @returns {Shape} This `Shape` instance.
     */
    strokeDashOffset(offset) {
        return this.attr('stroke-dashoffset', offset);
    }

    /**
     * Change the linecap type of the shape's stroke.
     *
     * @param {string} type - Either 'butt', 'square', or 'round'.
     *
     * @returns {Shape} This `Shape` instance.
     */
    strokeLineCap(type) {
        return this.attr('stroke-linecap', type);
    }

    /**
     * Change the linejoin type of the shape's stroke.
     *
     * @param {string} type - Either 'miter', 'round', or 'bevel'.
     *
     * @returns {Shape} This `Shape` instance.
     */
    strokeLineJoin(type) {
        return this.attr('stroke-linejoin', type);
    }

    /**
     * Change the miter limit of the shape's stroke.
     *
     * @param {number} limit - The miter limit of the shape's stroke.
     *
     * @returns {Shape} This `Shape` instance.
     */
    strokeMiterLimit(limit) {
        return this.attr('stroke-miterlimit', limit);
    }

    /**
     * Change the stroke opacity of the shape.
     *
     * @param {number} opacity - A number from 0 to 1 which represents the opacity of the stroke.
     *
     * @returns {Shape} This `Shape` instance.
     */
    strokeOpacity(opacity) {
        return this.attr('stroke-opacity', opacity);
    }
}
