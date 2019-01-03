import {Element} from './abstract';

export class PolyLine extends Element {
    constructor(points) {
        super('polyline');

        // In the format [[x1, y1], [x2, y2], ...]
        this.points = points;

        this.setPoints(points);
    }

    setPoints(points) {
        let str = '';

        for (let point of points) {
            str += `${point[0]} ${point[1]}, `;
        }
        str = str.slice(0, -2);

        return this.attr('points', str);
    }

    addPoint(point) {
        return this.attr(
            'points',
            this.el.getAttribute('points').length > 0 ?
                this.el.getAttribute('points') + `, ${point[0]} ${point[1]}` :
                `${point[0]} ${point[1]}`
        );
    }
}
