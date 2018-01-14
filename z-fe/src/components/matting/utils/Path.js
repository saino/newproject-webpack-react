import Point from './Point';

export default class Path {
	constructor(points) {
	  this.points = points;
		this.controls = [];
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
		//if (index > 0 || this.closed) {
	  const i = index > 0 ? index - 1 : this.points.length - 1;

		return this.points[i];
		//}
	}

	nextPoint(index) {
	  if (index < this.points.length - 1 || this.closed) {
			const i = index < this.points.length - 1 ? index + 1 : 0;
			return this.points[i];
		}
	}

	insertPoint(index, p) {
		this.points.splice(index, 0, p);
	}

	addPoint(index, p) {
	  this.points[index] = p;
	}

	removePoint(p){
		var i = this.points.indexOf(p);
		this.points.splice(i, 1);
	}

	movePoint(p, dx, dy, movingControl){
		var i = this.indexOf(p);
		try {	// 对面控制点不存在就忽略
			switch( movingControl ){
				case Point.CONTROL1:
					p.move(dx, dy, movingControl);
					this.prevPoint(i).setControl(Point.CONTROL2, this.prevPoint(i).getOppositeControl([p.cx1, p.cy1]));
					break;
				case Point.CONTROL2:
					p.move(dx, dy, movingControl);
					this.nextPoint(i).setControl(Point.CONTROL1, p.getOppositeControl(Point.CONTROL2));
					break;
				default:
					p.move(dx, dy);
					p.move(dx, dy, Point.CONTROL2);
					this.nextPoint(i).move(dx, dy, Point.CONTROL1);
			}
		} catch(e) {}
	}

	indexOf(p) {
		return this.points.indexOf(p);
	}

	confirmFloating() {
		this.points.push(this.floatingPoint);
		this.floatingPoint = false;
	}
}
