import Path from './Path';

export default class PathList {
	constructor(){
		this.list = [];
	}
	addPath(){
		const path = new Path();
		this.list.push(path);
		return path;
	}
	delPath(path){
		if( path ){
			const index = this.list.indexOf(path);
			this.list.splice(index, 1);
		}
	}
	lastEmpty(){
		const last = this.list[this.list.length - 1];
		if( last && last.points.length == 0 ){
			return last;
		}
		return this.addPath();
	}
	findByPoint(point){
		for( const path of this.list ){
			if( path.indexOf(point) !== -1 ){
				return path;
			}
		}
		return false;
	}
	findInside(x, y, startPath){
		const from = this.list.indexOf(startPath);
		let i = from, looped = 0, path;
		do {
			++ i;
			if( i >= this.list.length ){
				i -= this.list.length;
				++ looped;
			}
			path = this.list[i];
			if( Snap.path.isPointInside(path.svgStr(), x, y) ){
				return path;
			}
		} while( i != from || looped < 2 );	// 从 startPath 后面开始找一个循环
		return false;
	}
}
