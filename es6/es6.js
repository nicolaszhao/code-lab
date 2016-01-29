import {Counter} from './lib';
import {Counter as c} from './lib';

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	toString() {
		return '(' + this.x + ',' + this.y + ')';
	}
}

class ColorPoint extends Point {
	constructor(x, y, color) {
		super(x, y);
		this.color = color;
	}

	toString() {
		return this.color + ' ' + super.toString();
	}
}

var o = {
	a: 0
};

Object.defineProperty(o, 'b', {
	set: function(x) {
		this.a = x / 2;
	}
});

o.b = 10;

console.log(Counter.counter);
Counter.incCounter();
console.log(Counter.counter);

console.log(c.counter);
c.incCounter();
console.log(c.counter);
