export {Rect} from './Rect';

class SvgElement {
    constructor(width, height) {
        this.props = {
            width,
            height
        };

        this.root = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.root.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        this.root.setAttribute('version', '1.1');
        this.root.setAttribute('baseProfile', 'full');
        this.changeSize(width, height);
    }

    changeSize(width, height) {
        this.root.setAttribute('width', width);
        this.root.setAttribute('height', height);
    }

    add(element) {
        this.root.appendChild(element);
    }

    render(parent) {
        parent.appendChild(this.root);
    }
}

export default SvgElement;
