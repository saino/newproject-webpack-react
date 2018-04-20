export default class Timer {
	isOn(params){
		return this.timer && this.params == params;
	}
	turnOn(params, time){
		clearTimeout(this.timer);
		this.params = params;
		time = time || 500;
		let self = this;
		return this.timer = setTimeout(this.turnOff.bind(self), time);
	}
	turnOff(){
		clearTimeout(this.timer);
		this.timer = undefined;
	}
}
