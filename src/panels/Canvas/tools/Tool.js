/* eslint-disable no-empty-function */

class Tool {
    touches = {};

    constructor() {
        // These functions cannot be arrow functions as you can't access `super`
        // from arrow functions.
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    addNode = node => {
        this.addNode(node);
    }

    stcc = (x, y) => { // "screen to canvas coordinates"
        x -= this.canvas.el.getBoundingClientRect().left;
        y -= this.canvas.el.getBoundingClientRect().top;
        x -= this.canvas.el.getBoundingClientRect().width / 2;
        y -= this.canvas.el.getBoundingClientRect().height / 2;
        x *= this.canvas.zoom;
        y *= this.canvas.zoom;
        x += this.canvas.translate[0];
        y += this.canvas.translate[1];
        return [x, y];
    }

    updateProps = props => {
        Object.assign(this, props);
    }

    updateSettings = settings => {
        this.settings = settings;
    }

    /*
     * Make sure then when you implement the below methods, you call
     * super.[method](e) first.
     */

    mouseDown() {}

    mouseMove() {}

    mouseUp() {}

    mouseLeave() {}

    mouseWheel() {}

    touchStart(e) {
        for (let touch of e.changedTouches) {
            this.touches[touch.identifier] = [touch.pageX, touch.pageY];
        }
    }

    touchMove(e) {
        for (let touch of e.changedTouches) {
            this.touches[touch.identifier] = [touch.pageX, touch.pageY];
        }
    }

    touchEnd(e) {
        for (let touch of e.changedTouches) {
            delete this.touches[touch.identifier];
        }
    }
}

export default Tool;
