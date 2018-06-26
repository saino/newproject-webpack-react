import Point from './Point';

export default class Path {
	constructor() {
		this.clear();
	}
	clear(){
		this.id = +Math.random().toFixed(7);
		this.isSelected = false;
		this.points = [];
		this.floatingPoint = false;
		this.closed = false;
	}
	firstPoint(){
		return this.points[0];
	}
	lastPoint(){
		return this.points[this.points.length - 1];
	}
	prevPoint(index){
		if( index > 0 || this.closed ){
			const i = index > 0 ? index - 1 : this.points.length - 1;
			return this.points[i];
		}
	}
	nextPoint(index){
		if( index < this.points.length - 1 || this.closed ){
			const i = index < this.points.length - 1 ? index + 1 : 0;
			return this.points[i];
		}
	}
	indexOf(p){
		return this.points.indexOf(p);
	}
	prevPointByPoint(point){
		return this.prevPoint(this.indexOf(point));
	}
	// 真实选中的点和它后面的点
	realSelected(selected, ctrlType){
		const i = this.indexOf(selected);
		if( ctrlType == Point.CONTROL1 ){
			return [this.prevPoint(i), selected];
		}
		return [selected, this.nextPoint(i)];
	}
	confirmFloating(){
		this.points.push(this.floatingPoint);
		this.floatingPoint = false;
	}
	removePoint(p){
		const i = this.points.indexOf(p);
		this.points.splice(i, 1);
	}
	insertPoint(index, p){
		this.points.splice(index, 0, p);
	}
	movePoint(p, dx, dy, movingControl){
		const i = this.indexOf(p);

		try {	// 对面控制点不存在就忽略
			switch( movingControl ){
				case Point.CONTROL1:
					p.move(dx, dy, movingControl);
					// 不联动
					// this.prevPoint(i).setControl(Point.CONTROL2, this.prevPoint(i).getOppositeControl([p.cx1, p.cy1]));
					break;
				case Point.CONTROL2:
					p.move(dx, dy, movingControl);
					// 不联动
					// this.nextPoint(i).setControl(Point.CONTROL1, p.getOppositeControl(Point.CONTROL2));
					break;
				default:
					p.move(dx, dy);
					p.move(dx, dy, Point.CONTROL2);
					this.nextPoint(i).move(dx, dy, Point.CONTROL1);
			}
		} catch(e) {}
	}
	move(dx, dy){
		for(const p of this.points ){
			p.move(dx, dy);
			p.move(dx, dy, Point.CONTROL1 | Point.CONTROL2);
		}
	}
	closePath(){
		if( !this.closed ){
			if( this.floatingPoint && this.points.length > 1 ){
				this.closed = true;
				this.firstPoint().setControl(Point.CONTROL1, this.floatingPoint.getControl(Point.CONTROL1));
				this.floatingPoint = false;
				return true;
			} else {
				// 点数不足 2 自动删除
				this.clear();
				return false;
			}
		}
		// 已闭合的返回 true
		return true;
	}
	// 仅已闭合曲线的 svg string
	svgStr(){
		let pathStr = '', p;

		for( const i in this.points ){
			p = this.points[i];
			pathStr += p.generatePath(i == 0);
		}

		if( this.floatingPoint ){
			if( this.points.length > 0 ){	// 只有有固定点的情况浮动点 path 才有效
				pathStr += this.floatingPoint.generatePath();
			}
		}

		if( this.closed ){
			pathStr += this.firstPoint().generatePath();
			pathStr += 'Z';
		}
		return pathStr;
	}
}
