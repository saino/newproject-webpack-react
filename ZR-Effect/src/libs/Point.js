export default class Point {
	static get CONTROL1() { return 1; }	// 控制点类型1，实际是上一个点的后控制点
	static get CONTROL2() { return 2; }	// 控制点类型2

	constructor(x, y, cx1, cy1, cx2, cy2){
		this.id = +Math.random().toFixed(7);
		this.isSelected = false;
		this.radius = 3;
		this.type = null;
		this.x = x;
		this.y = y;
		if( cx1 ){
			this.cx1 = cx1;
			this.cy1 = cy1;
		}
		if( cx2 ){
			this.cx2 = cx2;
			this.cy2 = cy2;
		}
	}
	setControl(type, arr){
		if( type == Point.CONTROL1 ){
			this.cx1 = arr[0];
			this.cy1 = arr[1];
		} else {
			this.cx2 = arr[0];
			this.cy2 = arr[1];
		}
	}
	removeControl(type){
		if( type == Point.CONTROL1 ){
			delete this.cx1;
			delete this.cy1;
		} else {
			delete this.cx2;
			delete this.cy2;
		}
	}
	getControl(type){
		return type == Point.CONTROL1 ? [this.cx1, this.cy1] : [this.cx2, this.cy2];
	}
	hasControl(type){
		switch(type){
			case Point.CONTROL1 : return Number.isFinite(this.cx1);
			case Point.CONTROL2 : return Number.isFinite(this.cx2);
			// both
			case Point.CONTROL1 + Point.CONTROL2 : return Number.isFinite(this.cx1) && Number.isFinite(this.cx2);
			default: return Number.isFinite(this.cx1) || Number.isFinite(this.cx2);
		}
	}
	getOppositeControl(type, isCtrl1){
		let x = this.x * 2;
		let y = this.y * 2;
		switch( type ){
			case Point.CONTROL1:
				x -= this.cx1;
				y -= this.cy1;
				break;
			case Point.CONTROL2:
				x -= this.cx2;
				y -= this.cy2;
				break;
			default:
				if( type instanceof Array ){
					if (isCtrl1) {
						x -= type[ 0 ];
						y = (y - type[1]) * 2;
						// y = -(y - type[ 1 ]);
					} else {
						x -= type[0];
						y -= type[1];
					}
				}
		}
		console.log(x, y)
		return [x, y];
	}
	move(dx, dy, type){
		if( type & Point.CONTROL1){
			const [ x, y ] = this.getOppositeControl(Point.CONTROL2);
			//!isNaN(this.cx1) || (this.cx1 = )
			//console.log(x, y, 'didi');
			!isNaN(this.cx1) || (this.cx1 = x);
			!isNaN(this.cy1) || (this.cy1 = y);

			this.cx1 += dx;
			this.cy1 -= dy;
		}
		if( type & Point.CONTROL2 && this.hasControl(Point.CONTROL2) ){
			console.log(2);
			this.cx2 += dx;
			this.cy2 += dy;
		}
		if( !type ){
			this.x += dx;
			this.y += dy;
		}
	}
	generatePath(moveOnly){
		if( moveOnly ){
			return 'M' + this.x + ' ' + this.y;
		}
		if( this.hasControl(Point.CONTROL1 | Point.CONTROL2) ){
			return 'C' + this.cx1 + ' ' + this.cy1 + ' ' + this.cx2 + ' ' + this.cy2 + ' ' + this.x + ' ' + this.y;
		} else if( this.hasControl() ){
			const cx = this.cx1 || this.cx2;
			const cy = this.cy1 || this.cy2;
			return 'Q' + cx + ' ' + cy + ' ' + this.x + ' ' + this.y;
		}
		return 'L' + this.x + ' ' + this.y;
	}
	isInside(x, y){
		return Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2) < this.radius * this.radius;
	}
	add(p){
		return new Point(this.x + p.x, this.y + p.y);
	}
	subtract(p){
		return new Point(this.x - p.x, this.y - p.y);
	}
	length(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	normalize(newLen){
		const l = this.length() / (newLen || 1);
		return new Point(this.x / l, this.y / l);
	}
}
