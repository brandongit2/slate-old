class Animation {
    /**
     * @callback updateCallback
     * @param {array} newValue - New animated values
     */

    /**
     * @callback onCompleteCallback
     * @param {array} finalValue - Final animated values
     */

    /**
    * @param {number} length - Length of the animation in milliseconds
    * @param {array} startValues - Array of values at the start of the animation
    * @param {array} endValues - Array of values at the end of the animation
    * @param {updateCallback} updateCallback - Callback for updating value when animation
    * @param {onCompleteCallback} onCompleteCallback - Callback when animation is complete
    */
    constructor(length, startValues, endValues, updateCallback, onCompleteCallback) {
        const curTime = Date.now();
        const interval = 1000 / Animation.framesPerSecond;
        this.props = {
            startTime:         curTime,
            endTime:           curTime + length,
            animationInterval: setInterval(() => {
                this.animate();
            }, interval),
            interval,
            startValues,
            endValues,
            updateCallback,
            onCompleteCallback,
        };
    }

    animate() {
        const curTime = Date.now();
        const timeLeft = this.props.endTime - curTime;
        let newValues = [];
        if (timeLeft <= 0) {
            newValues = this.props.endValues;
            clearInterval(this.props.animationInterval);
            this.props.onCompleteCallback(newValues);
        } else {
            const elapsedPart = 1 - (timeLeft / (this.props.endTime - this.props.startTime));
            for (let i = 0; i < this.props.startValues.length; i++) {
                newValues.push(((this.props.endValues[i] - this.props.startValues[i]) * elapsedPart) + this.props.startValues[i]);
            }
        }
        this.props.updateCallback(newValues);
    }
}

Animation.defaults = {
    framesPerSecond: 60
};

export default Animation;
