import {Container} from './abstract';

export {Circle} from './Circle';
export {Ellipse} from './Ellipse';
export {Html} from './Html';
export {Line} from './Line';
export {Link} from './Link';
export {Path} from './Path';
export {Polygon} from './Polygon';
export {PolyLine} from './PolyLine';
export {Rect} from './Rect';
export {Text} from './Text';

class SvgElement extends Container {
    constructor() {
        super('svg', 100, 100);

        this.translate = [0, 0];
        this.zoom = 1;

        this.el.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        this.el.setAttribute('version', '1.1');
        this.el.setAttribute('baseProfile', 'full');

        this.attr('width', '100%');
        this.attr('height', '100%');

        this.updateSize();
    }

    // Updates the dimensions of the SVG (always same dimensions as parent).
    updateSize() {
        this.width = this.el.clientWidth;
        this.height = this.el.clientHeight;

        this.updateViewBox();
        return this;
    }

    // Replaces the current global CSS.
    css(css) {
        let tag = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        tag.innerHTML = css;
        this.el.appendChild(tag);
        return this;
    }

    setTranslate(x, y) {
        this.translate = [x, y];
        this.updateViewBox();
        return this;
    }

    setZoom(zoom) {
        this.zoom = zoom;
        this.updateViewBox();
        return this;
    }

    zoomBy(factor) {
        return this.setZoom(this.zoom * factor);
    }

    // Updates the translation and zoom of the SVG. For internal use only.
    updateViewBox() {
        this.attr(
            'viewBox',
            `${this.translate[0] - (this.width * this.zoom) / 2} ` +
            `${this.translate[1] - (this.height * this.zoom) / 2} ` +
            `${this.width * this.zoom} ` +
            `${this.height * this.zoom}`
        );
    }
}

export default SvgElement;
