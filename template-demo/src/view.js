import type from './type.js';

var arr = [],
	slice = arr.slice;

var rexpression = /{{((?:(?!(?:\}\})).)*)}}/g,
	rrepeat = /\s*([a-zA-Z]\w*)\s+in\s+([a-zA-Z][a-zA-Z0-9_.]*)\s*/;

var plain = {},
	toString = plain.toString,
	class2type = {};

class View {
	render(el, data) {
		this.data = data;
		this._compile(el);
	}

	_compile(el) {
		var nodes = el.childNodes,
			that = this;

		this._replaceAttr(el);

		if (!nodes.length) {
			return;
		}

		nodes = slice.call(nodes);

		nodes.forEach(function(el) {
			switch (el.nodeType) {
				case 1:
					that._compile(el);
					break;
				case 3:
					that._replaceText(el);
					break;
			}
		});
	}

	_replaceText(el, data) {
		var content = el.textContent,
			match = rexpression.exec(content),
			node;

		if (match && match[1]) {
			el.textContent = this._parse(content, data);
		}
	}

	_replaceAttr(el) {
		var attrs = this._attrs(el),
			fragment = document.createDocumentFragment(),
			repeatMatch, item;
		for (var attr in attrs) {
			if (attr === 'repeat') {
				repeatMatch = rrepeat.exec(attrs[attr]);
				if (repeatMatch && type(this.data[repeatMatch[2]]) === 'array') {
					for (var i = 0, len = this.data[repeatMatch[2]].length; i < len; i++) {
						item = el.cloneNode(true);
						this._replaceText(item, {
							[repeatMatch[1]]: this.data[repeatMatch[2]][i]
						});
						fragment.appendChild(item);
					}
					el.parentNode.replaceChild(fragment, el);
				}
			}
		}
	}

	_parse(text, data) {
		var that = this;

		return text.replace(rexpression, function(m, val) {
			return data ? data[val] : that.data[val];
		});
	}

	_attrs(el) {
		var pairs = {}, attr, attrName, attrValue, i, len;

		for ( i = 0, len = el.attributes.length; i < len; i++) {
			attr = el.attributes[i];

			attrName = attr.nodeName;
			attrValue = attr.nodeValue;
			if (attr.specified) {
				pairs[attrName] = attrValue;
			}
		}

		return pairs;
	}
}

export default View;