export default class Path {
	constructor() {
	  this.points = [];
		this.floatingPoint = false;
		this.closed = false;
	}

	firstPoint() {
		return this.points[0];
	}

	lastPoint() {
		return this.points[this.points.length - 1];
	}

	prevPoint(index) {
		if (index > 0 || this.closed) {
		  const i = index > 0 ? index - 1 : this.points.length - 1;
			return this.points[i];
		}
	}

	nextPoint(index) {
	  if (index < this.points.length - 1 || this.closed) {
			const i = index < this.points.length - 1 ? index + 1 : 0;
			return this.points[i];
		}
	}

	indexOf(p){
		return this.points.indexOf(p);
	}
	
	confirmFloating(){
		this.points.push(this.floatingPoint);
		this.floatingPoint = false;
	}
}
