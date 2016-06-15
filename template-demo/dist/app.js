/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _view = __webpack_require__(1);

	var _view2 = _interopRequireDefault(_view);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var view = new _view2.default();

	view.render(document.getElementById('demo-1'), {
		name: 'Nicolas',
		age: '34',
		experience: ['ctrip', 'baidu', 'perfect world']
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _type = __webpack_require__(2);

	var _type2 = _interopRequireDefault(_type);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var arr = [],
	    slice = arr.slice;

	var rexpression = /{{((?:(?!(?:\}\})).)*)}}/g,
	    rrepeat = /\s*([a-zA-Z]\w*)\s+in\s+([a-zA-Z][a-zA-Z0-9_.]*)\s*/;

	var plain = {},
	    toString = plain.toString,
	    class2type = {};

	var View = function () {
		function View() {
			_classCallCheck(this, View);
		}

		_createClass(View, [{
			key: 'render',
			value: function render(el, data) {
				this.data = data;
				this._compile(el);
			}
		}, {
			key: '_compile',
			value: function _compile(el) {
				var nodes = el.childNodes,
				    that = this;

				this._replaceAttr(el);

				if (!nodes.length) {
					return;
				}

				nodes = slice.call(nodes);

				nodes.forEach(function (el) {
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
		}, {
			key: '_replaceText',
			value: function _replaceText(el, data) {
				var content = el.textContent,
				    match = rexpression.exec(content),
				    node;

				if (match && match[1]) {
					el.textContent = this._parse(content, data);
				}
			}
		}, {
			key: '_replaceAttr',
			value: function _replaceAttr(el) {
				var attrs = this._attrs(el),
				    fragment = document.createDocumentFragment(),
				    repeatMatch,
				    item;
				for (var attr in attrs) {
					if (attr === 'repeat') {
						repeatMatch = rrepeat.exec(attrs[attr]);
						if (repeatMatch && (0, _type2.default)(this.data[repeatMatch[2]]) === 'array') {
							for (var i = 0, len = this.data[repeatMatch[2]].length; i < len; i++) {
								item = el.cloneNode(true);
								this._replaceText(item, _defineProperty({}, repeatMatch[1], this.data[repeatMatch[2]][i]));
								fragment.appendChild(item);
							}
							el.parentNode.replaceChild(fragment, el);
						}
					}
				}
			}
		}, {
			key: '_parse',
			value: function _parse(text, data) {
				var that = this;

				return text.replace(rexpression, function (m, val) {
					return data ? data[val] : that.data[val];
				});
			}
		}, {
			key: '_attrs',
			value: function _attrs(el) {
				var pairs = {},
				    attr,
				    attrName,
				    attrValue,
				    i,
				    len;

				for (i = 0, len = el.attributes.length; i < len; i++) {
					attr = el.attributes[i];

					attrName = attr.nodeName;
					attrValue = attr.nodeValue;
					if (attr.specified) {
						pairs[attrName] = attrValue;
					}
				}

				return pairs;
			}
		}]);

		return View;
	}();

	exports.default = View;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = type;
	var plain = {},
	    toString = plain.toString,
	    class2type = {};

	'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function (name) {
		class2type['[object ' + name + ']'] = name.toLowerCase();
	});

	function type(obj) {
		return class2type[toString.call(obj)] || 'object';
	};

/***/ }
/******/ ]);