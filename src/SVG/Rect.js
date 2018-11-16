export class Rect {
    constructor(width, height, fill) {
        this.props = {
            width, height, fill
        };

        this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.resize(width, height);
        this.changeFill(fill);
    }

    get el() {
        return this.rect;
    }

    changeFill(color) {
        this.rect.setAttributeNS(null, 'fill', color);
    }

    resize(width, height) {
        this.rect.setAttributeNS(null, 'width', width);
        this.rect.setAttributeNS(null, 'height', height);
    }
}
