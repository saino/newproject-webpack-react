export default class Point {
  static get CONTROL1() { return 1; }
  static get CONTROL2() { return 2; }

  constructor(x, y, cx1, cy1, cx2, cy2) {
    this.x = x;
		this.y = y;
    this.radius = 3;
		if( cx1 ){
			this.cx1 = cx1;
			this.cy1 = cy1;
		}
		if( cx2 ){
			this.cx2 = cx2;
			this.cy2 = cy2;
		}
  }

  setControl(type, arr) {
    if( type == Point.CONTROL1 ){
			this.cx1 = arr[0];
			this.cy1 = arr[1];
		} else {
			this.cx2 = arr[0];
			this.cy2 = arr[1];
		}
  }

  getControl(type) {
    return type === Point.CONTROL1 ? [ this.cx1, this.cy1 ] : [ this.cx2, this.cy2 ];
  }

  getOppositeControl(type){
		var x = this.x * 2;
		var y = this.y * 2;

		switch(type){
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
					x -= type[0];
					y -= type[1];
				}
		}

		return [x, y];
	}

  move(dx, dy, movingControl) {
		if(movingControl == Point.CONTROL1 && this.cx1){
			this.cx1 += dx;
			this.cy1 += dy;
		}
		if(movingControl == Point.CONTROL2 && this.cx2){
			this.cx2 += dx;
			this.cy2 += dy;
		}
		if(!movingControl){
			this.x += dx;
			this.y += dy;
		}
	}

  generatePath(moveOnly) {
    if(moveOnly){
      return 'M' + this.x + ' ' + this.y;
    }

    if(this.cx1 && this.cx2){
      return 'C' + this.cx1 + ' ' + this.cy1 + ' ' + this.cx2 + ' ' + this.cy2 + ' ' + this.x + ' ' + this.y;
    } else if(this.cx1 || this.cx2){
      var cx = this.cx1 || this.cx2;
      var cy = this.cy1 || this.cy2;
      return 'Q' + cx + ' ' + cy + ' ' + this.x + ' ' + this.y;
    }

    return 'L' + this.x + ' ' + this.y;
  }

  isInside(x, y) {
		return Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2) < Math.pow(this.radius, 2);
	}

}
