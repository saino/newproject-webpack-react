export default class VideoFrame {

	constructor(options = {}) {
	  this.duration = options.duration || 0;
		this.frames = options.frames || 0;
	}

	getFrameRate() {
	  return Number((this.frames / this.duration).toFixed(5));
	}

	forward(currFrame, step = 1) {
	  return this.toTime(currFrame + step);
	}

	backward(currFrame, step = 1) {
	  return this.toTime(currFrame - step);
	}

	toTime(frame) {
	  return Number((frame / this.getFrameRate() + 0.00001).toFixed(5))
	}

}
