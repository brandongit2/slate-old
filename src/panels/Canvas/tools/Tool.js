/* eslint-disable no-empty-function */

class Tool {
    constructor(canvasInfo) {
        this.updateCanvasInfo(canvasInfo);
        this.touches = {};
    }

    addNode = node => {
        this.canvasInfo.addNode(node);
    }

    stcc = (x, y) => { // "screen to canvas coordinates"
        let canvas = this.canvasInfo.canvas;
        x -= canvas.el.getBoundingClientRect().left;
        y -= canvas.el.getBoundingClientRect().top;
        x -= canvas.el.getBoundingClientRect().width / 2;
        y -= canvas.el.getBoundingClientRect().height / 2;
        x *= canvas.zoom;
        y *= canvas.zoom;
        x += canvas.translate[0];
        y += canvas.translate[1];
        return [x, y];
    }

    updateCanvasInfo = canvasInfo => {
        this.canvasInfo = canvasInfo;
    }

    updateSettings = settings => {
        this.settings = settings;
    }

    /*
     * Make sure then when you implement the below methods, you call
     * super.[method](e) first.
     */

    mouseDown = () => {}

    mouseMove = () => {}

    mouseUp = () => {}

    mouseLeave = () => {}

    touchStart = e => {
        for (let touch of e.changedTouches) {
            this.touches[touch.identifier] = [touch.pageX, touch.pageY];
        }
    }

    touchMove = e => {
        for (let touch of e.changedTouches) {
            this.touches[touch.identifier] = [touch.pageX, touch.pageY];
        }
    }

    touchEnd = e => {
        for (let touch of e.changedTouches) {
            delete this.touches[touch.identifier];
        }
    }
}

export default Tool;
