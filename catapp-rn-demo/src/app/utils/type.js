var plain = {},
	toString = plain.toString,
	class2type = {};

'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function(name) {
	class2type['[object ' + name + ']'] = name.toLowerCase();
});

export default function type(obj) {
	return class2type[toString.call(obj)] || 'object';
};