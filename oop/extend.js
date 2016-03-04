(function() {
	var extend = function(props) {
		var Parent = this,
			Child;

		if (props && props.hasOwnProperty('constructor')) {
			Child = props.constructor;
		} else {
			Child = function() {
				return Parent.apply(this, arguments);
			};
		}

		var F = function() {
			this.constructor = Child;
		};

		F.prototype = Parent.prototype;
		Child.prototype = new F();

		if (props) {
			Object.assign(Child.prototype, props);
		}

		return Child;
	};

	if (!Function.prototype.extend) {
		Function.prototype.extend = extend;
	}
})();