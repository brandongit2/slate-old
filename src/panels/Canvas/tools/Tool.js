/* eslint-disable no-empty-function */

class Tool {
    constructor(canvasInfo) {
        this.updateCanvasInfo(canvasInfo);
        this.touches = [];
    }

    /*
     * Make sure then when you implement the below methods, you call
     * super.[method](e) first.
     */

    mouseDown() {}

    mouseMove() {}

    mouseUp() {}

    mouseLeave() {}

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
            this.touches.splice(touch.identifier, 1);
        }
    }

    updateCanvasInfo(canvasInfo) {
        this.canvasInfo = canvasInfo;
    }

    updateProps(props) {
        this.props = props;
    }

    stcc(x, y) { // "screen to canvas coordinates"
        let canvas = this.canvasInfo.canvas;
        x -= canvas.el.getBoundingClientRect().left;
        y -= canvas.el.getBoundingClientRect().top;
        x -= canvas.el.clientWidth / 2;
        y -= canvas.el.clientHeight / 2;
        x *= canvas.zoom;
        y *= canvas.zoom;
        x += canvas.translate[0];
        y += canvas.translate[1];
        return [x, y];
    }
}

export default Tool;
